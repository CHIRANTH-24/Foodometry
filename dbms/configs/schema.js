
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
  json,
} from "drizzle-orm/pg-core";

// User Table
export const users = pgTable("users", {
  userId: serial("user_id").primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).unique(),
});
export const RECIPE_TABLE = pgTable("recipeTable", {
  id: serial().primaryKey(),
  recipeId: varchar().notNull(),
  ingridients: varchar().notNull(),
  calories: varchar().notNull(),
  recipeLayout: json(),
  createdBy: varchar().notNull(),
  status: varchar().default('Genrating')
})