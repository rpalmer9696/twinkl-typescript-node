import { sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey().notNull(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  password: text("password").notNull(),
  userType: text("user_type").notNull(),
  createdDate: text("created_date")
    .default(sql`(current_timestamp)`)
    .notNull(),
});
