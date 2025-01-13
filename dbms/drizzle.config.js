import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./configs/schema.js",
  dbCredentials: {
    url: "postgresql://neondb_owner:Gw9nuQekI4sY@ep-patient-haze-a5xjy9ef.us-east-2.aws.neon.tech/neondb?sslmode=require",
  },
});
