import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { brand } from "@/lib/brand";
import { env } from "@/lib/env";
import { CaseStudy } from "@/features/projects/case-study";
import {
  getCaseStudySlugs,
  getFlagshipBySlug,
} from "@/features/projects/queries";
import { type Locale } from "@/i18n/routing";
import { languageAlternates, localizedUrl } from "@/lib/urls";

type Params = { locale: Locale; slug: string };

/** Only flagships have case studies; anything else is a real 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return getCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getFlagshipBySlug(slug);
  if (!project) return {};

  const t = await getTranslations({ locale, namespace: "projects" });
  const title = t(`items.${project.slug}.title`);
  const description = t(`items.${project.slug}.summary`);
  const path = `/projects/${project.slug}`;
  // The preview image comes from ./opengraph-image.tsx (generated per locale).

  return {
    title,
    description,
    alternates: {
      canonical: localizedUrl(locale, path),
      languages: languageAlternates(path),
    },
    openGraph: {
      type: "article",
      title,
      description,
      url: localizedUrl(locale, path),
      siteName: brand.fullName,
      locale,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const project = getFlagshipBySlug(slug);
  if (!project) notFound();

  const t = await getTranslations("projects");
  const url = localizedUrl(locale, `/projects/${project.slug}`);

  // Structured data so search engines understand this is a piece of work
  // by a person, not a generic page. Values are static strings from the
  // registry and messages — no user input reaches this script tag.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: t(`items.${project.slug}.title`),
    description: t(`items.${project.slug}.summary`),
    url,
    ...(project.media.cover && {
      image: `${env.siteUrl}${project.media.cover}`,
    }),
    keywords: project.stack.join(", "),
    author: {
      "@type": "Person",
      name: brand.name,
      url: localizedUrl(locale, "/"),
    },
    ...(project.links.repo && { codeRepository: project.links.repo }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <CaseStudy project={project} />
    </>
  );
}
