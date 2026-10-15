/**
 * Legal details for the Impressum (§ 5 ECG, § 25 MedienG) and the privacy
 * policy. Single source of truth — the pages render whatever is set here.
 *
 * Business registration fields are null until the trade licence exists;
 * the Impressum shows them automatically once they are filled in.
 */
export const legal = {
  name: "Ivan Sytnik",
  // TODO(ivan): verify spelling against the Meldezettel ("Köflacher Gasse"?).
  street: "Köflacher Gasse 9",
  postalCode: "8020",
  city: "Graz",
  country: { de: "Österreich", en: "Austria" },
  email: "ivan.sytnik02@gmail.com",

  business: {
    /** e.g. "Dienstleistungen in der automatischen Datenverarbeitung und Informationstechnik" */
    trade: null as string | null,
    /** e.g. "Magistrat Graz" */
    authority: null as string | null,
    /** e.g. "Wirtschaftskammer Steiermark" */
    chamber: null as string | null,
    /** UID-Nummer, only if VAT-registered */
    vatId: null as string | null,
  },

  /** Where contact-form data is stored. Must match the Neon project region. */
  databaseRegion: {
    de: "EU (Frankfurt am Main)",
    en: "EU (Frankfurt am Main)",
  },
  lastUpdated: { de: "Oktober 2026", en: "October 2026" },
} as const;
