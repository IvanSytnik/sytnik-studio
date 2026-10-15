import { loadEnvConfig } from "@next/env";
import type { Config } from "drizzle-kit";

// drizzle-kit runs outside Next.js, so load .env.local the same way Next does.
loadEnvConfig(process.cwd());

// Schema changes go through the direct (unpooled) connection when available.
const url = process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL ?? "";

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: { url },
  strict: true,
  verbose: true,
} satisfies Config;
