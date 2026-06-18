import {
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
  integer,
  boolean,
  vector,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: varchar("id", { length: 256 }).primaryKey(), // Clerk ID
  email: text("email").notNull(),
  name: text("name"),
  resumeUrl: text("resume_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const applications = pgTable("applications", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: varchar("user_id", { length: 256 })
    .references(() => users.id)
    .notNull(),
  company: text("company").notNull(),
  role: text("role").notNull(),
  status: varchar("status", { length: 50 }).default("applied").notNull(), // applied, interviewing, offered, rejected
  jobDescription: text("job_description"),
  url: text("url"),
  salaryRange: text("salary_range"),
  location: text("location"),
  notes: text("notes"),
  appliedDate: timestamp("applied_date").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const applicationEmbeddings = pgTable("application_embeddings", {
  id: uuid("id").primaryKey().defaultRandom(),
  applicationId: uuid("application_id")
    .references(() => applications.id, { onDelete: "cascade" })
    .notNull(),
  content: text("content").notNull(), // The text that was embedded
  embedding: vector("embedding", { dimensions: 1536 }), // OpenAI text-embedding-3-small
});
