import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
import { initialProjects, initialSkills, initialExperiences, initialGuestbookEntries } from "./mockData";

async function seed() {
  const url = process.env.DATABASE_URL?.trim();
  if (!url || !url.startsWith("postgres")) {
    console.error("❌ ERROR: DATABASE_URL is not set in .env.local.");
    console.log("👉 Please add your Neon connection string to .env.local:");
    console.log("   DATABASE_URL=\"postgresql://user:pass@ep-xyz.aws.neon.tech/neondb?sslmode=require\"");
    process.exit(1);
  }

  console.log("🚀 Connecting to Neon PostgreSQL...");
  const sql = neon(url);
  const db = drizzle(sql, { schema });

  try {
    console.log("🌱 Seeding Projects...");
    for (const project of initialProjects) {
      await db
        .insert(schema.projects)
        .values(project)
        .onConflictDoNothing({ target: schema.projects.slug });
    }
    console.log(`✅ Seeded ${initialProjects.length} projects.`);

    console.log("🌱 Seeding Skills...");
    for (const skill of initialSkills) {
      await db.insert(schema.skills).values(skill);
    }
    console.log(`✅ Seeded ${initialSkills.length} skills.`);

    console.log("🌱 Seeding Experiences...");
    for (const exp of initialExperiences) {
      await db.insert(schema.experiences).values(exp);
    }
    console.log(`✅ Seeded ${initialExperiences.length} experiences.`);

    console.log("🌱 Seeding Sample Guestbook Endorsements...");
    for (const entry of initialGuestbookEntries) {
      await db.insert(schema.guestbook).values({
        authorName: entry.authorName,
        role: entry.role,
        message: entry.message,
        avatarColor: entry.avatarColor,
      });
    }
    console.log(`✅ Seeded ${initialGuestbookEntries.length} guestbook entries.`);

    console.log("\n🎉 Database seeded successfully! Your NeonDB is ready.");
  } catch (err: any) {
    console.error("❌ Failed to seed database:", err);
    process.exit(1);
  }
}

seed();
