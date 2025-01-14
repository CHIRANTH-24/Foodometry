import { drizzle } from "drizzle-orm/neon-http";

const db = drizzle(process.env.NEXT_PUBLIC_DATABASE_CONNECTION_STRING);

export default db;