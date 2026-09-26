/**
 * Service identifiers shared across features.
 *
 * Projects reference services ("this case proves I can do X"), and the
 * Services section (Pack 9) renders them. Keeping the ids here avoids a
 * dependency between two feature folders.
 */
export const SERVICE_IDS = [
  "landing-pages",
  "business-websites",
  "crm-systems",
  "ai-integrations",
  "bots-automation",
] as const;

export type ServiceId = (typeof SERVICE_IDS)[number];
