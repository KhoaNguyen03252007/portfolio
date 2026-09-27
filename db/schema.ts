import { pgTable, serial, text, varchar, timestamp, boolean, integer, jsonb } from "drizzle-orm/pg-core";

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  summary: text("summary").notNull(),
  description: text("description").notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  tags: jsonb("tags").$type<string[]>().notNull(),
  demoUrl: varchar("demo_url", { length: 500 }),
  githubUrl: varchar("github_url", { length: 500 }),
  stats: varchar("stats", { length: 255 }),
  featured: boolean("featured").default(true).notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  category: varchar("category", { length: 100 }).notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  proficiency: integer("proficiency").notNull(),
  highlight: text("highlight"),
  sortOrder: integer("sort_order").default(0).notNull(),
});

export const experiences = pgTable("experiences", {
  id: serial("id").primaryKey(),
  role: varchar("role", { length: 255 }).notNull(),
  company: varchar("company", { length: 255 }).notNull(),
  period: varchar("period", { length: 100 }).notNull(),
  description: text("description").notNull(),
  highlights: jsonb("highlights").$type<string[]>().notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
});

export const guestbook = pgTable("guestbook", {
  id: serial("id").primaryKey(),
  authorName: varchar("author_name", { length: 100 }).notNull(),
  role: varchar("role", { length: 150 }),
  message: text("message").notNull(),
  avatarColor: varchar("avatar_color", { length: 50 }).default("#06b6d4"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  subject: varchar("subject", { length: 255 }),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const subscriptions = pgTable("subscriptions", {
  id: serial("id").primaryKey(),
  stripeCustomerId: varchar("stripe_customer_id", { length: 255 }),
  stripeSubscriptionId: varchar("stripe_subscription_id", { length: 255 }),
  stripeSessionId: varchar("stripe_session_id", { length: 255 }).unique(),
  stripePriceId: varchar("stripe_price_id", { length: 255 }),
  customerEmail: varchar("customer_email", { length: 255 }),
  customerName: varchar("customer_name", { length: 255 }),
  amountTotal: integer("amount_total"),
  currency: varchar("currency", { length: 10 }).default("usd"),
  status: varchar("status", { length: 50 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;
export type Skill = typeof skills.$inferSelect;
export type Experience = typeof experiences.$inferSelect;
export type GuestbookEntry = typeof guestbook.$inferSelect;
export type NewGuestbookEntry = typeof guestbook.$inferInsert;
export type Message = typeof messages.$inferSelect;
export type NewMessage = typeof messages.$inferInsert;
export type Subscription = typeof subscriptions.$inferSelect;
export type NewSubscription = typeof subscriptions.$inferInsert;

