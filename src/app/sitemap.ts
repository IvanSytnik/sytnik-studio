import type { MetadataRoute } from "next";

import { getCaseStudySlugs } from "@/features/projects/queries";
import { routing } from "@/i18n/routing";
import { languageAlternates, localizedUrl } from "@/lib/urls";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "/", priority: 1 },
    ...getCaseStudySlugs().map((slug) => ({
      path: `/projects/${slug}`,
      priority: 0.7,
    })),
  ];

  return routes.flatMap(({ path, priority }) =>
    routing.locales.map((locale) => ({
      url: localizedUrl(locale, path),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority,
      alternates: { languages: languageAlternates(path) },
    }))
  );
}
