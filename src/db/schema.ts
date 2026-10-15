import {
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
  jsonb,
} from "drizzle-orm/pg-core";

export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  /** Set when the visitor chose email as contact method. */
  email: varchar("email", { length: 254 }),
  /** email | telegram | whatsapp | phone */
  contactMethod: varchar("contact_method", { length: 16 })
    .notNull()
    .default("email"),
  /** The handle / number / address for the chosen method. */
  contactValue: varchar("contact_value", { length: 254 }),
  company: varchar("company", { length: 160 }),
  message: text("message").notNull(),
  /** Brief: { needs: string[], budget?: string, timeline?: string } */
  estimator: jsonb("estimator"),
  locale: varchar("locale", { length: 5 }),
  source: varchar("source", { length: 64 }).default("website"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type NewContactSubmission = typeof contactSubmissions.$inferInsert;
