/**
 * Legal details of the business behind the site — a sole proprietorship
 * (ФОП, fizychna osoba-pidpryiemets) registered in Ukraine. Single source of
 * truth for the legal notice, the privacy policy and structured data.
 *
 * TODO(ivan): fill in every `null` from the extract of the Unified State
 * Register (ЄДР). Until then the legal notice shows a placeholder line and
 * `isLegalComplete` is false — don't enable indexing before it is true.
 * Never put the personal tax number (РНОКПП) here; it is not required.
 */
export const legal = {
  /** Name as shown to clients (Latin). */
  name: "Ivan Sytnik",
  /** Name exactly as in the register (Ukrainian), e.g. "Ситник Іван …". */
  nameNative: null as string | null,
  /** Number of the record in the Unified State Register (ЄДР). */
  registryNumber: null as string | null,
  /** Registration date in the register, e.g. "2024-03-12". */
  registeredOn: null as string | null,
  /** Simplified tax group, e.g. 3 (single tax, non-VAT payer). */
  taxGroup: null as number | null,
  /** Registered address (as in the register). */
  address: {
    street: null as string | null,
    postalCode: null as string | null,
    city: null as string | null,
    country: { uk: "Україна", de: "Ukraine", en: "Ukraine" },
  },
  email: "ivan.sytnik02@gmail.com",
  /** Currencies invoices are issued in. */
  currencies: ["EUR", "USD"] as const,

  /** Where contact-form data is stored. Must match the Neon project region. */
  databaseRegion: {
    uk: "ЄС (Франкфурт-на-Майні)",
    de: "EU (Frankfurt am Main)",
    en: "EU (Frankfurt am Main)",
  },
  lastUpdated: { uk: "жовтень 2026", de: "Oktober 2026", en: "October 2026" },
};

export type LegalLang = "uk" | "de" | "en";

/** Legal texts exist in Ukrainian, German and English; Russian shows English. */
export const legalLangFor = (locale: string): LegalLang =>
  locale === "uk" || locale === "de" ? locale : "en";

export const isLegalComplete = Boolean(
  legal.nameNative &&
  legal.registryNumber &&
  legal.address.street &&
  legal.address.postalCode &&
  legal.address.city
);

/** One-line registered address, or null while it is not filled in. */
export function legalAddress(lang: LegalLang): string | null {
  const a = legal.address;
  if (!a.street || !a.postalCode || !a.city) return null;
  return `${a.street}, ${a.postalCode} ${a.city}, ${a.country[lang]}`;
}
