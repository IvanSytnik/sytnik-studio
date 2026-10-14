import { routing, type Locale } from "@/i18n/routing";
import { env } from "@/lib/env";

/**
 * Absolute URL for a path in a given locale, matching the
 * `localePrefix: "as-needed"` routing: the default locale has no prefix.
 */
export function localizedUrl(locale: Locale, path: string): string {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  const clean = path === "/" ? "" : path;
  return `${env.siteUrl}${prefix}${clean}` || env.siteUrl;
}

/** hreflang map for every locale, plus x-default. */
export function languageAlternates(path: string): Record<string, string> {
  return {
    ...Object.fromEntries(
      routing.locales.map((locale) => [locale, localizedUrl(locale, path)])
    ),
    "x-default": localizedUrl(routing.defaultLocale, path),
  };
}
