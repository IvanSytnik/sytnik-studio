import { getTranslations } from "next-intl/server";

import {
  getCaseStudySlugs,
  getFlagshipBySlug,
} from "@/features/projects/queries";
import { routing, type Locale } from "@/i18n/routing";
import { OG_SIZE, renderOgImage } from "@/lib/og/render";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Case study";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getCaseStudySlugs().map((slug) => ({ locale, slug }))
  );
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const project = getFlagshipBySlug(slug);
  const t = await getTranslations({ locale, namespace: "projects" });
  const tm = await getTranslations({ locale, namespace: "meta" });

  if (!project) {
    return renderOgImage({
      eyebrow: tm("ogEyebrow"),
      title: tm("ogTitle"),
      footer: tm("ogFooter"),
    });
  }

  return renderOgImage({
    eyebrow: `${t("caseStudy.open")} · ${t(`status.${project.status}`)}`,
    title: t(`items.${project.slug}.title`),
    description: t(`items.${project.slug}.summary`),
    tags: project.stack,
    footer: tm("ogFooter"),
  });
}
