import { z } from "zod";

/**
 * Server-only configuration for lead delivery. Every channel is optional:
 * a missing key disables that channel instead of crashing the build, so
 * the form works locally with nothing configured and in production with
 * whatever is set up. Never import this file from a Client Component.
 */
const schema = z.object({
  RESEND_API_KEY: z.string().min(1).optional(),
  RESEND_FROM_EMAIL: z.string().min(3).optional(),
  RESEND_TO_EMAIL: z.string().email().optional(),
  TELEGRAM_BOT_TOKEN: z.string().min(10).optional(),
  TELEGRAM_CHAT_ID: z.string().min(1).optional(),
  DATABASE_URL: z.string().url().optional(),
});

const parsed = schema.parse(
  Object.fromEntries(
    Object.entries(process.env).map(([k, v]) => [k, v === "" ? undefined : v])
  )
);

export const leadChannels = {
  email:
    parsed.RESEND_API_KEY && parsed.RESEND_FROM_EMAIL && parsed.RESEND_TO_EMAIL
      ? {
          apiKey: parsed.RESEND_API_KEY,
          from: parsed.RESEND_FROM_EMAIL,
          to: parsed.RESEND_TO_EMAIL,
        }
      : null,
  telegram:
    parsed.TELEGRAM_BOT_TOKEN && parsed.TELEGRAM_CHAT_ID
      ? { token: parsed.TELEGRAM_BOT_TOKEN, chatId: parsed.TELEGRAM_CHAT_ID }
      : null,
  database: parsed.DATABASE_URL ? { url: parsed.DATABASE_URL } : null,
} as const;
