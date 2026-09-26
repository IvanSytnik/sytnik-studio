import type en from "../../../messages/en.json";
import type { ServiceId } from "@/types/service";

/**
 * Every slug must have a matching entry under `projects.items` in
 * messages/en.json. Deriving the type from the JSON makes a missing
 * translation a compile error instead of a runtime "MISSING_MESSAGE".
 */
export type ProjectSlug = keyof typeof en.projects.items;

/**
 * Lifecycle status, shown as a badge. Keep it honest:
 * - live        publicly usable right now
 * - delivered   handed over to the client; not necessarily launched
 * - pre-launch  built/being built, not publicly available
 */
export const PROJECT_STATUSES = ["live", "delivered", "pre-launch"] as const;
export type ProjectStatus = (typeof PROJECT_STATUSES)[number];

/**
 * flagship → large card + its own case study page at /projects/[slug]
 * compact  → small card in the "Client & smaller work" grid, no page
 */
export type ProjectTier = "flagship" | "compact";

/** Who the work was for. Drives the "Client work" label. */
export type ProjectKind = "product" | "client";

export type ProjectLinks = {
  live?: string;
  repo?: string;
  /** Screen recording, used when a live demo isn't appropriate. */
  video?: string;
};

export type ProjectMedia = {
  /** Path under /public, e.g. "/projects/styleme/cover.webp". */
  cover?: string;
  gallery: readonly string[];
};

/**
 * Language-independent facts about a project.
 * All human-readable text lives in messages/*.json under
 * `projects.items.<slug>` — never put copy here.
 */
export type Project = {
  slug: ProjectSlug;
  tier: ProjectTier;
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
  /** Display names, most important first. Cards show the first three. */
  stack: readonly string[];
  /** First entry is the primary service, used as the card category. */
  services: readonly [ServiceId, ...ServiceId[]];
  media: ProjectMedia;
};
