import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";

import { deepMerge } from "@/lib/deep-merge";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  // English is the master copy. Other locales may be partial: any key they
  // don't define falls back to English instead of rendering a missing key.
  const fallback = (await import("../../messages/en.json")).default;
  const messages =
    locale === routing.defaultLocale
      ? fallback
      : deepMerge(
          fallback,
          (await import(`../../messages/${locale}.json`)).default
        );

  return { locale, messages };
});
