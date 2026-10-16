import {
  isLegalComplete,
  legal,
  legalAddress,
  type LegalLang,
} from "@/lib/legal";

const L = {
  uk: {
    title: "Правова інформація",
    basis:
      "Інформація про суб’єкта господарювання відповідно до статті 15 Закону України «Про електронну комерцію».",
    provider: "Надавач послуг",
    form: "Фізична особа — підприємець (ФОП), зареєстрована в Україні",
    registry: "Номер запису в ЄДР",
    registered: "Дата реєстрації",
    tax: "Податковий статус",
    taxText: (g: number) =>
      `платник єдиного податку, ${g} група, неплатник ПДВ`,
    address: "Місцезнаходження",
    contact: "Контакти",
    email: "E-mail",
    activity: "Вид діяльності",
    activityText:
      "Розробка вебсайтів, вебзастосунків і програмного забезпечення (КВЕД 62.01)",
    links: "Відповідальність за посилання",
    linksText:
      "Сайт містить посилання на сторонні ресурси. За їхній зміст відповідають виключно їхні власники. На момент розміщення посилань протиправного змісту виявлено не було; у разі виявлення порушень посилання буде негайно видалено.",
    pending: "Реєстраційні дані буде додано найближчим часом.",
  },
  de: {
    title: "Impressum",
    basis:
      "Angaben zum Diensteanbieter. Der Anbieter ist ein in der Ukraine registrierter Einzelunternehmer.",
    provider: "Diensteanbieter",
    form: "Einzelunternehmer nach ukrainischem Recht (ФОП – fizychna osoba-pidpryiemets)",
    registry:
      "Eintragungsnummer im ukrainischen Einheitlichen Staatsregister (ЄДР)",
    registered: "Eingetragen am",
    tax: "Steuerstatus",
    taxText: (g: number) =>
      `Einheitssteuer (vereinfachtes Steuersystem), Gruppe ${g}, nicht umsatzsteuerpflichtig in der Ukraine`,
    address: "Anschrift",
    contact: "Kontakt",
    email: "E-Mail",
    activity: "Unternehmensgegenstand",
    activityText: "Entwicklung von Websites, Webanwendungen und Software",
    links: "Haftung für Links",
    linksText:
      "Diese Website enthält Links zu externen Websites. Für deren Inhalte sind ausschließlich die jeweiligen Betreiber verantwortlich. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar; bei Bekanntwerden von Rechtsverletzungen werden entsprechende Links umgehend entfernt.",
    pending: "Die Registrierungsdaten werden in Kürze ergänzt.",
  },
  en: {
    title: "Legal notice",
    basis:
      "Information about the service provider, a sole proprietor registered in Ukraine.",
    provider: "Service provider",
    form: "Sole proprietor registered in Ukraine (FOP – fizychna osoba-pidpryiemets)",
    registry: "Record number in the Unified State Register of Ukraine (EDR)",
    registered: "Registered on",
    tax: "Tax status",
    taxText: (g: number) =>
      `Single tax (simplified system), group ${g}, not registered for VAT in Ukraine`,
    address: "Registered address",
    contact: "Contact",
    email: "Email",
    activity: "Business activity",
    activityText: "Development of websites, web applications and software",
    links: "Liability for links",
    linksText:
      "This website contains links to external websites. Their operators are solely responsible for their content. No unlawful content was apparent at the time of linking; links will be removed promptly if any infringement becomes known.",
    pending: "Registration details will be added shortly.",
  },
} as const;

export function impressumTitle(lang: LegalLang) {
  return L[lang].title;
}

export function ImpressumContent({ lang }: { lang: LegalLang }) {
  const t = L[lang];
  const address = legalAddress(lang);

  return (
    <>
      <section>
        <p className="text-sm">{t.basis}</p>
      </section>

      <section>
        <h2>{t.provider}</h2>
        <p>
          {legal.name}
          {legal.nameNative && ` (${legal.nameNative})`}
          <br />
          {t.form}
        </p>
        <ul>
          {legal.registryNumber && (
            <li>
              {t.registry}: {legal.registryNumber}
            </li>
          )}
          {legal.registeredOn && (
            <li>
              {t.registered}: {legal.registeredOn}
            </li>
          )}
          {legal.taxGroup && (
            <li>
              {t.tax}: {t.taxText(legal.taxGroup)}
            </li>
          )}
        </ul>
        {!isLegalComplete && <p className="text-sm">{t.pending}</p>}
      </section>

      {address && (
        <section>
          <h2>{t.address}</h2>
          <p>{address}</p>
        </section>
      )}

      <section>
        <h2>{t.contact}</h2>
        <p>
          {t.email}: <a href={`mailto:${legal.email}`}>{legal.email}</a>
        </p>
      </section>

      <section>
        <h2>{t.activity}</h2>
        <p>{t.activityText}</p>
      </section>

      <section>
        <h2>{t.links}</h2>
        <p>{t.linksText}</p>
      </section>
    </>
  );
}
