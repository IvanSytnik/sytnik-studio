import { notFound } from "next/navigation";

/**
 * Any unknown path inside a locale ends up here and renders the localized
 * not-found page (with header, footer and translations) instead of the
 * bare Next.js default.
 */
export default function CatchAll() {
  notFound();
}
