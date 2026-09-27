import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
import { initialProjects, initialSkills, initialExperiences, initialGuestbookEntries } from "./mockData";

const databaseUrl = process.env.DATABASE_URL?.trim();

// Check if a real DATABASE_URL is provided
export const isConfigured = Boolean(databaseUrl && databaseUrl.startsWith("postgres"));

// Export Drizzle client if configured
export const db = isConfigured
  ? drizzle(neon(databaseUrl!), { schema })
  : null;

// In-memory runtime state for development fallback
const fallbackState = {
  projects: initialProjects.map((p, idx) => ({ ...p, id: idx + 1, createdAt: new Date() })),
  skills: initialSkills.map((s, idx) => ({ ...s, id: idx + 1 })),
  experiences: initialExperiences.map((e, idx) => ({ ...e, id: idx + 1 })),
  guestbook: [...initialGuestbookEntries],
  messages: [] as schema.Message[],
};

export async function getProjects() {
  if (db) {
    try {
      const results = await db.select().from(schema.projects).orderBy(schema.projects.sortOrder);
      if (results.length > 0) return results;
    } catch (err) {
      console.warn("NeonDB query failed, falling back to cached data:", err);
    }
  }
  return fallbackState.projects;
}

export async function getSkills() {
  if (db) {
    try {
      const results = await db.select().from(schema.skills).orderBy(schema.skills.sortOrder);
      if (results.length > 0) return results;
    } catch (err) {
      console.warn("NeonDB skills query failed, using fallback:", err);
    }
  }
  return fallbackState.skills;
}

export async function getExperiences() {
  if (db) {
    try {
      const results = await db.select().from(schema.experiences).orderBy(schema.experiences.sortOrder);
      if (results.length > 0) return results;
    } catch (err) {
      console.warn("NeonDB experiences query failed, using fallback:", err);
    }
  }
  return fallbackState.experiences;
}

export async function getGuestbookEntries() {
  if (db) {
    try {
      const results = await db.select().from(schema.guestbook).orderBy(schema.guestbook.createdAt);
      return results.reverse();
    } catch (err) {
      console.warn("NeonDB guestbook query failed, using in-memory store:", err);
    }
  }
  return [...fallbackState.guestbook].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export async function insertGuestbookEntry(entry: schema.NewGuestbookEntry) {
  if (db) {
    try {
      const [inserted] = await db.insert(schema.guestbook).values(entry).returning();
      return { success: true, entry: inserted, isLiveDb: true };
    } catch (err: any) {
      console.warn("Failed to insert into live NeonDB, falling back to local store:", err.message);
    }
  }

  // Fallback in-memory insertion
  const newEntry: schema.GuestbookEntry = {
    id: fallbackState.guestbook.length + 1,
    authorName: entry.authorName,
    role: entry.role ?? null,
    message: entry.message,
    avatarColor: entry.avatarColor ?? "#06b6d4",
    createdAt: new Date(),
  };
  fallbackState.guestbook.unshift(newEntry);
  return { success: true, entry: newEntry, isLiveDb: false };
}

export async function insertContactMessage(msg: schema.NewMessage) {
  if (db) {
    try {
      const [inserted] = await db.insert(schema.messages).values(msg).returning();
      return { success: true, message: inserted, isLiveDb: true };
    } catch (err: any) {
      console.warn("Failed to insert message into live NeonDB, falling back to local store:", err.message);
    }
  }

  const newMsg: schema.Message = {
    id: fallbackState.messages.length + 1,
    name: msg.name,
    email: msg.email,
    subject: msg.subject ?? null,
    message: msg.message,
    createdAt: new Date(),
  };
  fallbackState.messages.unshift(newMsg);
  return { success: true, message: newMsg, isLiveDb: false };
}

export async function insertSubscription(sub: schema.NewSubscription) {
  if (db) {
    try {
      const [inserted] = await db.insert(schema.subscriptions).values(sub).returning();
      return { success: true, subscription: inserted, isLiveDb: true };
    } catch (err: any) {
      console.warn("Failed to insert subscription into live NeonDB:", err.message);
    }
  }
  return { success: true, subscription: sub, isLiveDb: false };
}

export async function getSubscriptions() {
  if (db) {
    try {
      const results = await db.select().from(schema.subscriptions).orderBy(schema.subscriptions.createdAt);
      return results.reverse();
    } catch (err: any) {
      console.warn("Failed to query subscriptions from NeonDB:", err.message);
    }
  }
  return [];
}

export async function checkDatabaseConnection(): Promise<{
  connected: boolean;
  message: string;
  dialect: string;
}> {
  if (!isConfigured || !db) {
    return {
      connected: false,
      message: "DATABASE_URL not configured. Running in high-performance local demo mode with rich seed data.",
      dialect: "Neon Serverless PostgreSQL (Mock / Fallback)",
    };
  }

  try {
    // Quick test query against Neon
    await db.select().from(schema.projects).limit(1);
    return {
      connected: true,
      message: "Successfully connected to Neon Serverless PostgreSQL with Drizzle ORM.",
      dialect: "Neon Serverless PostgreSQL (Live)",
    };
  } catch (err: any) {
    return {
      connected: false,
      message: `Neon connection error: ${err.message || "Unknown error"}. Check credentials.`,
      dialect: "Neon Serverless PostgreSQL (Error)",
    };
  }
}
