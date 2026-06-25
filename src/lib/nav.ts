/**
 * Top-level navigation for the single-page landing.
 * Each entry scrolls to the section with the matching id on the home page.
 * To rename: change `labelKey`. To add a section: append here and create
 * a corresponding section element with the same id.
 */
export type NavItem = {
  /** Anchor id on the landing page. */
  id: string;
  /** Translation key under "nav.*" in messages/*.json. */
  labelKey: "projects" | "services" | "process" | "contact";
};

export const navItems: readonly NavItem[] = [
  { id: "projects", labelKey: "projects" },
  { id: "services", labelKey: "services" },
  { id: "process", labelKey: "process" },
  { id: "contact", labelKey: "contact" },
] as const;
