import {
  pgTable,
  serial,
  varchar,
  integer,
  text,
  date,
  float,
  boolean,
  primaryKey,
} from "drizzle-orm/pg-core";

// User Table
export const users = pgTable("users", {
  userId: serial("user_id").primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).unique(),
});
