import { projects } from "./data";
import type {
  CaseStudySlug,
  CompactProject,
  FlagshipProject,
  Project,
} from "./types";

/**
 * Read access to the registry. Sections and pages only talk to these
 * functions, so swapping the static registry for a CMS later touches
 * this file only.
 */

const byOrder = (a: Project, b: Project) => a.order - b.order;

function publishedProjects(): Project[] {
  return (projects as readonly Project[]).filter((p) => p.published);
}

export function getFlagshipProjects(): FlagshipProject[] {
  return publishedProjects()
    .filter((p): p is FlagshipProject => p.tier === "flagship")
    .sort(byOrder);
}

export function getCompactProjects(): CompactProject[] {
  return publishedProjects()
    .filter((p): p is CompactProject => p.tier === "compact")
    .sort(byOrder);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return publishedProjects().find((p) => p.slug === slug);
}

/** Slugs that get a case study page — used by generateStaticParams + sitemap. */
export function getCaseStudySlugs(): CaseStudySlug[] {
  return getFlagshipProjects().map((p) => p.slug);
}

/** Honest numbers for the hero, computed so they can't drift from reality. */
export function getProjectStats() {
  const all = publishedProjects();
  return {
    total: all.length,
    live: all.filter((p) => p.status === "live").length,
    clientProjects: all.filter((p) => p.kind === "client").length,
  } as const;
}

export function getFlagshipBySlug(slug: string): FlagshipProject | undefined {
  return getFlagshipProjects().find((p) => p.slug === slug);
}

/** The flagship after this one, wrapping around — for "Next project". */
export function getNextFlagship(slug: string): FlagshipProject | undefined {
  const all = getFlagshipProjects();
  const i = all.findIndex((p) => p.slug === slug);
  if (i === -1 || all.length < 2) return undefined;
  return all[(i + 1) % all.length];
}
