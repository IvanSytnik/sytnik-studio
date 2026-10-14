/**
 * Best-effort, in-memory rate limit: 3 submissions per IP per 10 minutes.
 * On serverless each instance has its own memory, so this is a speed bump
 * for scripts hammering the endpoint, not a hard guarantee. Together with
 * the honeypot and the minimum fill time it stops ordinary form spam.
 */
const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 3;
const hits = new Map<string, number[]>();

export function isRateLimited(key: string, now = Date.now()): boolean {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= LIMIT) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear(); // keep memory bounded
  return false;
}
