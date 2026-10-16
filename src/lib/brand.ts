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
    "Websites, booking systems and AI features — designed and built by one developer, working remotely across Europe.",
  /** Production domain. Canonical URLs use NEXT_PUBLIC_SITE_URL; keep both in sync. */
  url: "https://sytnik.app",
  locale: "en",
  /**
   * Social links shown in the footer.
   * Empty strings = not configured yet; the footer hides empties.
   */
  social: {
    github: "https://github.com/IvanSytnik",
    linkedin: "https://www.linkedin.com/in/ivan-sytnik/",
    upwork: "",
    telegram: "https://t.me/sytnik_ivan",
    whatsapp: "https://wa.me/380957219583",
    email: "ivan.sytnik02@gmail.com",
  },
  /**
   * Direct channels for clients — used by the hero, the contact section,
   * the mobile contact bar and the footer. Change them here only.
   */
  contact: {
    telegram: { handle: "@sytnik_ivan", url: "https://t.me/sytnik_ivan" },
    whatsapp: {
      number: "+380 95 721 95 83",
      url: "https://wa.me/380957219583",
    },
    email: "ivan.sytnik02@gmail.com",
  },
} as const;

export type Brand = typeof brand;
