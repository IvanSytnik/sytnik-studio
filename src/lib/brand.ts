/**
 * Single source of truth for brand identity.
 *
 * Hybrid product:
 *  - Primary identity: Ivan Sytnik (solo freelance developer).
 *  - Presentation layer: a small independent studio.
 *
 * IMPORTANT: never present the studio as a multi-person team.
 * Copy is first person ("I"). Studio is a brand wrapper only.
 */
export const brand = {
  name: "Ivan Sytnik",
  studio: "Independent Web Studio",
  fullName: "Ivan Sytnik — Independent Web Studio",
  shortName: "Sytnik Studio",
  initials: "IS",
  description:
    "Independent frontend developer building production-grade web products with React, Next.js, and TypeScript.",
  url: "https://ivansytnik.com",
  locale: "en",
  /**
   * Social links shown in the footer.
   * Empty strings = not configured yet; the footer hides empties.
   */
  social: {
    github: "https://github.com/IvanSytnik",
    linkedin: "https://www.linkedin.com/in/ivan-sytnik/",
    upwork: "",
    telegram: "",
    email: "",
  },
} as const;

export type Brand = typeof brand;
