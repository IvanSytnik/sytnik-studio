/**
 * Option lists for the contact brief — the single source of truth for the
 * chips in the UI, the validation in schema.ts and the labels in
 * messages/*.json (contact.options.*). Kept free of zod so the client
 * bundle doesn't pull in the validator.
 */
export const NEEDS = [
  "landing",
  "website",
  "crm",
  "ai",
  "bot",
  "redesign",
  "notSure",
] as const;
export const BUDGETS = [
  "lt500",
  "500to2k",
  "2to5k",
  "5to10k",
  "gt10k",
  "unknown",
] as const;
export const TIMELINES = ["asap", "1to3m", "flexible"] as const;
export const CONTACT_METHODS = [
  "email",
  "telegram",
  "whatsapp",
  "phone",
] as const;

export type Need = (typeof NEEDS)[number];
export type ContactMethod = (typeof CONTACT_METHODS)[number];
