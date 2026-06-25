import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { env } from "@/lib/env";

const routes = ["/"] as const;

function urlForLocale(locale: string, route: string): string {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  const path = route === "/" ? "" : route;
  return `${env.siteUrl}${prefix}${path}` || env.siteUrl;
}

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.flatMap((route) =>
    routing.locales.map((locale) => ({
      url: urlForLocale(locale, route),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: route === "/" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((code) => [code, urlForLocale(code, route)])
        ),
      },
    }))
  );
}