import { legal } from "@/lib/legal";

type Lang = "de" | "en";

/**
 * Privacy policy. Describes exactly what this site does: static pages on
 * Vercel, cookieless Vercel Web Analytics, self-hosted fonts, and a contact
 * form delivered to Neon, Resend and Telegram. Update it whenever a new
 * service is added.
 */
export function privacyTitle(lang: Lang) {
  return lang === "de" ? "Datenschutzerklärung" : "Privacy policy";
}

export function PrivacyContent({ lang }: { lang: Lang }) {
  const address = `${legal.street}, ${legal.postalCode} ${legal.city}, ${legal.country[lang]}`;
  const mail = <a href={`mailto:${legal.email}`}>{legal.email}</a>;

  if (lang === "de") {
    return (
      <>
        <section>
          <h2>1. Verantwortlicher</h2>
          <p>
            {legal.name}, {address}. E-Mail: {mail}
          </p>
        </section>

        <section>
          <h2>2. Hosting und Server-Logs</h2>
          <p>
            Diese Website wird bei Vercel Inc. (440 N Barranca Ave #4133,
            Covina, CA 91723, USA) gehostet. Beim Aufruf verarbeitet Vercel
            technisch notwendige Daten wie IP-Adresse, Zeitpunkt, aufgerufene
            Seite und Browser-Informationen, um die Website auszuliefern und vor
            Missbrauch zu schützen. Rechtsgrundlage ist unser berechtigtes
            Interesse an einem sicheren und stabilen Betrieb (Art. 6 Abs. 1 lit.
            f DSGVO). Die Übermittlung in die USA erfolgt auf Grundlage des
            EU-US Data Privacy Framework bzw. der EU-Standardvertragsklauseln.
          </p>
        </section>

        <section>
          <h2>3. Reichweitenmessung</h2>
          <p>
            Ich nutze Vercel Web Analytics. Es setzt keine Cookies und speichert
            keine IP-Adressen; Besuche werden nur aggregiert und anonym
            ausgewertet (z. B. Seitenaufrufe, Herkunftsland, Gerätetyp).
            Rechtsgrundlage ist mein berechtigtes Interesse an der Verbesserung
            der Website (Art. 6 Abs. 1 lit. f DSGVO).
          </p>
          <p>
            Schriftarten werden von dieser Website selbst ausgeliefert; es
            besteht keine Verbindung zu Google-Servern.
          </p>
        </section>

        <section>
          <h2>4. Kontaktformular und Anfragen</h2>
          <p>
            Wenn Sie mir über das Formular schreiben, verarbeite ich: Name, den
            gewählten Kontaktkanal und die dazugehörige Angabe (E-Mail-Adresse,
            Telegram-Benutzername oder Telefonnummer), optional Unternehmen,
            Ihre Nachricht, die gewählten Leistungen, Budget, Zeitrahmen und die
            Sprache der Website. Zweck ist ausschließlich die Bearbeitung Ihrer
            Anfrage und gegebenenfalls die Vorbereitung eines Angebots (Art. 6
            Abs. 1 lit. b DSGVO), im Übrigen mein berechtigtes Interesse an der
            Beantwortung (Art. 6 Abs. 1 lit. f DSGVO).
          </p>
          <p>
            Für die Zustellung der Anfrage werden folgende Dienste eingesetzt:
          </p>
          <ul>
            <li>
              Neon Inc. (USA) – Speicherung der Anfrage in einer Datenbank mit
              Standort {legal.databaseRegion.de}.
            </li>
            <li>
              Resend (Plus Five Five, Inc., USA) – Zustellung der Anfrage per
              E-Mail an mich.
            </li>
            <li>
              Telegram (Telegram Messenger Inc., Dubai) – Benachrichtigung über
              neue Anfragen in einer privaten Gruppe, auf die nur ich Zugriff
              habe.
            </li>
          </ul>
          <p>
            Übermittlungen in Drittländer erfolgen auf Grundlage von
            EU-Standardvertragsklauseln bzw. des EU-US Data Privacy Framework.
            Kontaktieren Sie mich direkt über Telegram, WhatsApp oder E-Mail,
            gelten zusätzlich die Datenschutzbestimmungen des jeweiligen
            Anbieters.
          </p>
          <p>
            Anfragen lösche ich spätestens 12 Monate nach dem letzten Kontakt,
            sofern kein Auftrag zustande kommt. Kommt ein Auftrag zustande,
            bewahre ich die Daten so lange auf, wie es gesetzliche
            Aufbewahrungspflichten (z. B. 7 Jahre nach § 132 BAO) verlangen.
          </p>
        </section>

        <section>
          <h2>5. Externe Links</h2>
          <p>
            Links zu GitHub, LinkedIn, Telegram, WhatsApp und Projekt-Websites
            werden erst beim Anklicken aufgerufen. Erst dann werden Daten an den
            jeweiligen Anbieter übertragen.
          </p>
        </section>

        <section>
          <h2>6. Ihre Rechte</h2>
          <p>
            Sie haben das Recht auf Auskunft, Berichtigung, Löschung,
            Einschränkung der Verarbeitung, Datenübertragbarkeit und
            Widerspruch. Schreiben Sie dazu einfach an {mail}.
          </p>
          <p>
            Sie können sich außerdem bei der Österreichischen Datenschutzbehörde
            beschweren: Barichgasse 40–42, 1030 Wien,{" "}
            <a href="https://www.dsb.gv.at">www.dsb.gv.at</a>.
          </p>
        </section>

        <p className="text-sm">Stand: {legal.lastUpdated.de}</p>
      </>
    );
  }

  return (
    <>
      <section>
        <h2>1. Controller</h2>
        <p>
          {legal.name}, {address}. Email: {mail}
        </p>
      </section>

      <section>
        <h2>2. Hosting and server logs</h2>
        <p>
          This website is hosted by Vercel Inc. (440 N Barranca Ave #4133,
          Covina, CA 91723, USA). When you visit it, Vercel processes
          technically necessary data such as your IP address, time of access,
          requested page and browser information in order to deliver the site
          and protect it against abuse. The legal basis is our legitimate
          interest in secure and stable operation (Art. 6(1)(f) GDPR). Transfers
          to the USA are based on the EU-US Data Privacy Framework or the EU
          Standard Contractual Clauses.
        </p>
      </section>

      <section>
        <h2>3. Analytics</h2>
        <p>
          I use Vercel Web Analytics. It sets no cookies and stores no IP
          addresses; visits are only evaluated in aggregate and anonymously
          (e.g. page views, country, device type). The legal basis is my
          legitimate interest in improving the website (Art. 6(1)(f) GDPR).
        </p>
        <p>
          Fonts are served by this website itself; there is no connection to
          Google servers.
        </p>
      </section>

      <section>
        <h2>4. Contact form and inquiries</h2>
        <p>
          When you write to me via the form, I process: your name, the contact
          channel you chose and the corresponding detail (email address,
          Telegram username or phone number), optionally your company, your
          message, the services, budget and timeline you selected, and the site
          language. The sole purpose is to handle your inquiry and, where
          applicable, prepare an offer (Art. 6(1)(b) GDPR), otherwise my
          legitimate interest in replying (Art. 6(1)(f) GDPR).
        </p>
        <p>The following services are used to deliver your inquiry:</p>
        <ul>
          <li>
            Neon Inc. (USA) – storing the inquiry in a database located in{" "}
            {legal.databaseRegion.en}.
          </li>
          <li>
            Resend (Plus Five Five, Inc., USA) – delivering the inquiry to me by
            email.
          </li>
          <li>
            Telegram (Telegram Messenger Inc., Dubai) – notifying me of new
            inquiries in a private group that only I can access.
          </li>
        </ul>
        <p>
          Transfers to third countries are based on EU Standard Contractual
          Clauses or the EU-US Data Privacy Framework. If you contact me
          directly via Telegram, WhatsApp or email, the privacy policy of that
          provider also applies.
        </p>
        <p>
          I delete inquiries no later than 12 months after our last contact if
          no contract results. If a contract results, I keep the data as long as
          statutory retention periods require (e.g. 7 years under § 132 of the
          Austrian Federal Fiscal Code).
        </p>
      </section>

      <section>
        <h2>5. External links</h2>
        <p>
          Links to GitHub, LinkedIn, Telegram, WhatsApp and project websites are
          only opened when you click them; only then is data transferred to the
          respective provider.
        </p>
      </section>

      <section>
        <h2>6. Your rights</h2>
        <p>
          You have the right to access, rectification, erasure, restriction of
          processing, data portability and objection. Just write to {mail}.
        </p>
        <p>
          You can also lodge a complaint with the Austrian Data Protection
          Authority: Barichgasse 40–42, 1030 Vienna,{" "}
          <a href="https://www.dsb.gv.at">www.dsb.gv.at</a>.
        </p>
      </section>

      <p className="text-sm">Last updated: {legal.lastUpdated.en}</p>
    </>
  );
}
