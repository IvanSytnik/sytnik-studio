import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
import { env } from "@/lib/env";

let _db: ReturnType<typeof drizzle> | null = null;

export function getDb() {
  if (_db) return _db;
  if (!env.databaseUrl) {
    throw new Error(
      "DATABASE_URL is not set. Configure Neon connection string in .env.local."
    );
  }
  const sql = neon(env.databaseUrl);
  _db = drizzle(sql, { schema });
  return _db;
}

export { schema };
