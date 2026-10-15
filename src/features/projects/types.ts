import type en from "../../../messages/en.json";
import type { ServiceId } from "@/types/service";

/**
 * Every slug must have a matching entry under `projects.items` in
 * messages/en.json. Deriving the type from the JSON makes a missing
 * translation a compile error instead of a runtime "MISSING_MESSAGE".
 */
export type ProjectSlug = keyof typeof en.projects.items;

type ProjectCopy = typeof en.projects.items;

/**
 * Slugs whose copy contains a full case study (result, context, problem…).
 * Only these may be flagships — promoting a project without that copy is
 * a type error, not a page with holes in it.
 */
export type CaseStudySlug = {
  [K in ProjectSlug]: ProjectCopy[K] extends { result: string } ? K : never;
}[ProjectSlug];

/**
 * Lifecycle status, shown as a badge. Keep it honest:
 * - live        publicly usable right now
 * - beta        working, open to a limited group of testers
 * - delivered   handed over to the client; not necessarily launched
 * - pre-launch  built/being built, not publicly available
 */
export const PROJECT_STATUSES = [
  "live",
  "beta",
  "delivered",
  "pre-launch",
] as const;
export type ProjectStatus = (typeof PROJECT_STATUSES)[number];

/**
 * flagship → large card + its own case study page at /projects/[slug]
 * compact  → small card in the "Client & smaller work" grid, no page
 */
export type ProjectTier = Project["tier"];

/** Who the work was for. Drives the "Client work" label. */
export type ProjectKind = "product" | "client";

export type ProjectLinks = {
  live?: string;
  repo?: string;
  /** Screen recording, used when a live demo isn't appropriate. */
  video?: string;
};

export type GalleryImage = {
  /** Path under /public, e.g. "/projects/styleme/upload.webp". */
  src: string;
  /** Intrinsic size — lets the page reserve space and avoid layout shift. */
  width: number;
  height: number;
};

export type ProjectMedia = {
  /** 16:10 cover under /public, e.g. "/projects/styleme/cover.webp". */
  cover?: string;
  /**
   * Optional light-theme variant. Without it the same cover is used in
   * both themes — dark screenshots still sit on a soft stage, so they
   * never look like a black hole in the light theme.
   */
  coverLight?: string;
  /**
   * How the cover is framed:
   * - "laptop" (default): `cover` is a desktop screenshot in a laptop frame
   * - "phones": `phones` are full-screen phone screenshots side by side in
   *   phone frames (`cover` is still used for the Open Graph image)
   */
  coverKind?: "laptop" | "phones";
  /** Full-screen phone screenshots (9:19.5) for coverKind "phones". */
  phones?: readonly string[];
  /** Extra screenshots for the case study page. */
  gallery: readonly GalleryImage[];
};

/**
 * Language-independent facts about a project.
 * All human-readable text lives in messages/*.json under
 * `projects.items.<slug>` — never put copy here.
 */
type ProjectBase = {
  status: ProjectStatus;
  kind: ProjectKind;
  /** Lower comes first within its tier. */
  order: number;
  /**
   * Unpublished entries stay in the registry but are excluded from every
   * query — use it for projects whose links or details aren't confirmed yet.
   */
  published: boolean;
  links: ProjectLinks;
  /** Display names, most important first. Flagship rows show the first four. */
  stack: readonly string[];
  /** First entry is the primary service, used as the row's category. */
  services: readonly [ServiceId, ...ServiceId[]];
  media: ProjectMedia;
};

export type FlagshipProject = ProjectBase & {
  tier: "flagship";
  slug: CaseStudySlug;
};

export type CompactProject = ProjectBase & {
  tier: "compact";
  slug: ProjectSlug;
};

export type Project = FlagshipProject | CompactProject;
