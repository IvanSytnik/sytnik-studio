import { legal } from "@/lib/legal";

type Lang = "de" | "en";

const L = {
  de: {
    title: "Impressum",
    note: undefined,
    basis:
      "Informationen gemäß § 5 E-Commerce-Gesetz (ECG) und Offenlegung gemäß § 25 Mediengesetz",
    owner: "Medieninhaber und Diensteanbieter",
    contact: "Kontakt",
    email: "E-Mail",
    activity: "Unternehmensgegenstand",
    activityText:
      "Entwicklung von Websites, Webanwendungen und IT-Dienstleistungen",
    trade: "Gewerbe",
    authority: "Gewerbebehörde",
    chamber: "Mitglied der",
    vat: "UID-Nummer",
    direction: "Grundlegende Richtung",
    directionText:
      "Information über die Leistungen von Ivan Sytnik als Webentwickler und Präsentation ausgewählter Projekte.",
    links: "Haftung für Links",
    linksText:
      "Diese Website enthält Links zu externen Websites. Für deren Inhalte sind ausschließlich die jeweiligen Betreiber verantwortlich. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar; bei Bekanntwerden von Rechtsverletzungen werden entsprechende Links umgehend entfernt.",
  },
  en: {
    title: "Legal notice",
    note: "Information under Austrian law (Impressum).",
    basis:
      "Information pursuant to § 5 E-Commerce Act (ECG) and disclosure pursuant to § 25 Media Act",
    owner: "Owner and service provider",
    contact: "Contact",
    email: "Email",
    activity: "Business activity",
    activityText: "Development of websites, web applications and IT services",
    trade: "Trade",
    authority: "Trade authority",
    chamber: "Member of",
    vat: "VAT ID",
    direction: "Editorial line",
    directionText:
      "Information about Ivan Sytnik's services as a web developer and a presentation of selected projects.",
    links: "Liability for links",
    linksText:
      "This website contains links to external websites. Their operators are solely responsible for their content. No unlawful content was apparent at the time of linking; links will be removed promptly if any infringement becomes known.",
  },
} as const;

export function impressumTitle(lang: Lang) {
  return L[lang].title;
}

export function ImpressumContent({ lang }: { lang: Lang }) {
  const t = L[lang];
  const b = legal.business;

  return (
    <>
      <section>
        <p className="text-sm">{t.basis}</p>
      </section>

      <section>
        <h2>{t.owner}</h2>
        <p>
          {legal.name}
          <br />
          {legal.street}
          <br />
          {legal.postalCode} {legal.city}
          <br />
          {legal.country[lang]}
        </p>
      </section>

      <section>
        <h2>{t.contact}</h2>
        <p>
          {t.email}: <a href={`mailto:${legal.email}`}>{legal.email}</a>
        </p>
      </section>

      <section>
        <h2>{t.activity}</h2>
        <p>{t.activityText}</p>
        {(b.trade || b.authority || b.chamber || b.vatId) && (
          <ul>
            {b.trade && (
              <li>
                {t.trade}: {b.trade}
              </li>
            )}
            {b.authority && (
              <li>
                {t.authority}: {b.authority}
              </li>
            )}
            {b.chamber && (
              <li>
                {t.chamber}: {b.chamber}
              </li>
            )}
            {b.vatId && (
              <li>
                {t.vat}: {b.vatId}
              </li>
            )}
          </ul>
        )}
      </section>

      <section>
        <h2>{t.direction}</h2>
        <p>{t.directionText}</p>
      </section>

      <section>
        <h2>{t.links}</h2>
        <p>{t.linksText}</p>
      </section>
    </>
  );
}
