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
  password: varchar("password", { length: 255 }),
  age: integer("age"),
  dietaryPreferences: text("dietary_preferences"),
  allergies: text("allergies"),
  fitnessGoal: varchar("fitness_goal", { length: 50 }),
  profilePicture: varchar("profile_picture", { length: 255 }),
  joinDate: date("join_date"),
});
