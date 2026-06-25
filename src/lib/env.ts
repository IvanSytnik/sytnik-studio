export const env = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  resendApiKey: process.env.RESEND_API_KEY ?? "",
  resendFrom: process.env.RESEND_FROM_EMAIL ?? "",
  resendTo: process.env.RESEND_TO_EMAIL ?? "",
  databaseUrl: process.env.DATABASE_URL ?? "",
} as const;

/**
 * Whether search engines should index this deployment.
 *
 * Indexable only when NEXT_PUBLIC_ALLOW_INDEXING === "true".
 * This means Vercel previews and local dev are never indexed by accident,
 * even if a recruiter stumbles onto a preview URL.
 *
 * Flip the flag to "true" in Vercel production env when the site is ready.
 */
export function isIndexable(): boolean {
  return process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";
}