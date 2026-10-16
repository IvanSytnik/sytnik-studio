import type { ReactNode } from "react";

import { legal, legalAddress, type LegalLang } from "@/lib/legal";

/**
 * Privacy policy. Describes exactly what this site does: static pages on
 * Vercel, cookieless Vercel Web Analytics, self-hosted fonts, and a contact
 * form delivered to Neon (EU), Resend and Telegram. Written for EU visitors
 * (GDPR) and Ukrainian law (Law "On Personal Data Protection").
 * Update it whenever a new service is added.
 */
type Section = { h: string; p: ReactNode[]; list?: ReactNode[] };

const TITLE: Record<LegalLang, string> = {
  uk: "Політика конфіденційності",
  de: "Datenschutzerklärung",
  en: "Privacy policy",
};

export function privacyTitle(lang: LegalLang) {
  return TITLE[lang];
}

function content(lang: LegalLang): { sections: Section[]; updated: string } {
  const mail = <a href={`mailto:${legal.email}`}>{legal.email}</a>;
  const who = (
    <>
      {legal.name}
      {legal.nameNative && ` (${legal.nameNative})`}
    </>
  );
  const address = legalAddress(lang);
  const region = legal.databaseRegion[lang];

  if (lang === "uk") {
    return {
      updated: `Оновлено: ${legal.lastUpdated.uk}`,
      sections: [
        {
          h: "1. Хто обробляє дані",
          p: [
            <>
              {who}, фізична особа — підприємець, зареєстрована в Україні
              {address && `, ${address}`}. E-mail: {mail}
            </>,
          ],
        },
        {
          h: "2. Хостинг і серверні журнали",
          p: [
            "Сайт розміщено у Vercel Inc. (США). Під час відвідування Vercel обробляє технічно необхідні дані — IP-адресу, час, сторінку й дані браузера — щоб показати сайт і захистити його від зловживань. Підстава — законний інтерес у безпечній і стабільній роботі сайту (ст. 6(1)(f) GDPR). Передача до США відбувається на підставі EU-US Data Privacy Framework або стандартних договірних положень ЄС.",
          ],
        },
        {
          h: "3. Аналітика",
          p: [
            "Я використовую Vercel Web Analytics: без cookies і без збереження IP-адрес, лише знеособлена загальна статистика (перегляди сторінок, країна, тип пристрою).",
            "Шрифти завантажуються з цього ж сайту, без звернень до серверів Google.",
          ],
        },
        {
          h: "4. Форма заявки",
          p: [
            "Коли ви надсилаєте заявку, я обробляю: ім’я, обраний канал зв’язку та відповідні дані (e-mail, нік у Telegram або номер телефону), за бажанням — компанію, ваше повідомлення, обрані послуги, бюджет, терміни й мову сайту. Мета — лише відповісти на заявку й за потреби підготувати пропозицію (ст. 6(1)(b) і (f) GDPR; згода та виконання договору за Законом України «Про захист персональних даних»).",
            "Для доставки заявки використовуються:",
          ],
          list: [
            <>
              Neon Inc. — зберігання заявки в базі даних, розташованій у{" "}
              {region}.
            </>,
            "Resend (Plus Five Five, Inc., США) — надсилання заявки мені на e-mail.",
            "Telegram — сповіщення про нову заявку в закритій групі, доступ до якої маю лише я.",
          ],
        },
        {
          h: "5. Строки зберігання",
          p: [
            "Заявки, після яких співпраця не почалася, я видаляю не пізніше ніж через 12 місяців після останнього контакту. Якщо укладено договір, дані зберігаються стільки, скільки вимагає законодавство України щодо первинних документів (щонайменше 1095 днів).",
          ],
        },
        {
          h: "6. Зовнішні посилання",
          p: [
            "Посилання на GitHub, LinkedIn, Telegram, WhatsApp і сайти проєктів відкриваються лише після кліку — тільки тоді дані передаються відповідному сервісу. Якщо ви пишете мені напряму в месенджер чи на e-mail, діють також правила конфіденційності цього сервісу.",
          ],
        },
        {
          h: "7. Ваші права",
          p: [
            <>
              Ви маєте право на доступ до своїх даних, їх виправлення,
              видалення, обмеження обробки, перенесення та заперечення проти
              обробки. Просто напишіть на {mail}.
            </>,
            <>
              Ви також можете звернутися до Уповноваженого Верховної Ради
              України з прав людини (
              <a href="https://ombudsman.gov.ua">ombudsman.gov.ua</a>) або, якщо
              ви перебуваєте в ЄС, — до наглядового органу із захисту даних у
              своїй країні.
            </>,
          ],
        },
      ],
    };
  }

  if (lang === "de") {
    return {
      updated: `Stand: ${legal.lastUpdated.de}`,
      sections: [
        {
          h: "1. Verantwortlicher",
          p: [
            <>
              {who}, Einzelunternehmer mit Sitz in der Ukraine
              {address && `, ${address}`}. E-Mail: {mail}
            </>,
          ],
        },
        {
          h: "2. Hosting und Server-Logs",
          p: [
            "Diese Website wird bei Vercel Inc. (USA) gehostet. Beim Aufruf verarbeitet Vercel technisch notwendige Daten wie IP-Adresse, Zeitpunkt, aufgerufene Seite und Browser-Informationen, um die Website auszuliefern und vor Missbrauch zu schützen. Rechtsgrundlage ist das berechtigte Interesse an einem sicheren und stabilen Betrieb (Art. 6 Abs. 1 lit. f DSGVO). Die Übermittlung in die USA erfolgt auf Grundlage des EU-US Data Privacy Framework bzw. der EU-Standardvertragsklauseln.",
          ],
        },
        {
          h: "3. Reichweitenmessung",
          p: [
            "Ich nutze Vercel Web Analytics. Es setzt keine Cookies und speichert keine IP-Adressen; Besuche werden nur aggregiert und anonym ausgewertet (z. B. Seitenaufrufe, Herkunftsland, Gerätetyp).",
            "Schriftarten werden von dieser Website selbst ausgeliefert; es besteht keine Verbindung zu Google-Servern.",
          ],
        },
        {
          h: "4. Kontaktformular",
          p: [
            "Wenn Sie mir über das Formular schreiben, verarbeite ich: Name, den gewählten Kontaktkanal und die dazugehörige Angabe (E-Mail-Adresse, Telegram-Benutzername oder Telefonnummer), optional Unternehmen, Ihre Nachricht, die gewählten Leistungen, Budget, Zeitrahmen und die Sprache der Website. Zweck ist ausschließlich die Bearbeitung Ihrer Anfrage und gegebenenfalls die Vorbereitung eines Angebots (Art. 6 Abs. 1 lit. b DSGVO), im Übrigen mein berechtigtes Interesse an der Beantwortung (Art. 6 Abs. 1 lit. f DSGVO).",
            "Für die Zustellung der Anfrage werden folgende Dienste eingesetzt:",
          ],
          list: [
            <>
              Neon Inc. – Speicherung der Anfrage in einer Datenbank mit
              Standort {region}.
            </>,
            "Resend (Plus Five Five, Inc., USA) – Zustellung der Anfrage per E-Mail an mich.",
            "Telegram – Benachrichtigung über neue Anfragen in einer privaten Gruppe, auf die nur ich Zugriff habe.",
          ],
        },
        {
          h: "5. Speicherdauer",
          p: [
            "Anfragen, aus denen kein Auftrag entsteht, lösche ich spätestens 12 Monate nach dem letzten Kontakt. Kommt ein Auftrag zustande, bewahre ich die Daten so lange auf, wie es die gesetzlichen Aufbewahrungspflichten für Geschäftsunterlagen verlangen.",
          ],
        },
        {
          h: "6. Externe Links",
          p: [
            "Links zu GitHub, LinkedIn, Telegram, WhatsApp und Projekt-Websites werden erst beim Anklicken aufgerufen; erst dann werden Daten an den jeweiligen Anbieter übertragen. Kontaktieren Sie mich direkt über einen Messenger oder per E-Mail, gelten zusätzlich die Datenschutzbestimmungen des jeweiligen Anbieters.",
          ],
        },
        {
          h: "7. Ihre Rechte",
          p: [
            <>
              Sie haben das Recht auf Auskunft, Berichtigung, Löschung,
              Einschränkung der Verarbeitung, Datenübertragbarkeit und
              Widerspruch. Schreiben Sie dazu einfach an {mail}.
            </>,
            "Außerdem können Sie sich bei der Datenschutz-Aufsichtsbehörde Ihres Wohnsitzlandes beschweren, in Österreich bei der Datenschutzbehörde (www.dsb.gv.at), in Deutschland bei der zuständigen Landesbehörde.",
          ],
        },
      ],
    };
  }

  return {
    updated: `Last updated: ${legal.lastUpdated.en}`,
    sections: [
      {
        h: "1. Controller",
        p: [
          <>
            {who}, sole proprietor registered in Ukraine
            {address && `, ${address}`}. Email: {mail}
          </>,
        ],
      },
      {
        h: "2. Hosting and server logs",
        p: [
          "This website is hosted by Vercel Inc. (USA). When you visit it, Vercel processes technically necessary data such as your IP address, time of access, requested page and browser information in order to deliver the site and protect it against abuse. The legal basis is the legitimate interest in secure and stable operation (Art. 6(1)(f) GDPR). Transfers to the USA are based on the EU-US Data Privacy Framework or the EU Standard Contractual Clauses.",
        ],
      },
      {
        h: "3. Analytics",
        p: [
          "I use Vercel Web Analytics. It sets no cookies and stores no IP addresses; visits are only evaluated in aggregate and anonymously (e.g. page views, country, device type).",
          "Fonts are served by this website itself; there is no connection to Google servers.",
        ],
      },
      {
        h: "4. Contact form",
        p: [
          "When you write to me via the form, I process: your name, the contact channel you chose and the corresponding detail (email address, Telegram username or phone number), optionally your company, your message, the services, budget and timeline you selected, and the site language. The sole purpose is to handle your inquiry and, where applicable, prepare an offer (Art. 6(1)(b) GDPR), otherwise my legitimate interest in replying (Art. 6(1)(f) GDPR).",
          "The following services are used to deliver your inquiry:",
        ],
        list: [
          <>
            Neon Inc. – storing the inquiry in a database located in {region}.
          </>,
          "Resend (Plus Five Five, Inc., USA) – delivering the inquiry to me by email.",
          "Telegram – notifying me of new inquiries in a private group that only I can access.",
        ],
      },
      {
        h: "5. Retention",
        p: [
          "I delete inquiries that don't lead to a project no later than 12 months after our last contact. If a contract results, I keep the data for as long as statutory record-keeping obligations require.",
        ],
      },
      {
        h: "6. External links",
        p: [
          "Links to GitHub, LinkedIn, Telegram, WhatsApp and project websites are only opened when you click them; only then is data transferred to the respective provider. If you contact me directly via a messenger or email, that provider's privacy policy also applies.",
        ],
      },
      {
        h: "7. Your rights",
        p: [
          <>
            You have the right to access, rectification, erasure, restriction of
            processing, data portability and objection. Just write to {mail}.
          </>,
          "You can also lodge a complaint with the data protection authority in your country of residence (in the EU) or with the Ukrainian Parliament Commissioner for Human Rights (ombudsman.gov.ua).",
        ],
      },
    ],
  };
}

export function PrivacyContent({ lang }: { lang: LegalLang }) {
  const { sections, updated } = content(lang);
  return (
    <>
      {sections.map((s) => (
        <section key={s.h}>
          <h2>{s.h}</h2>
          {s.p.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
          {s.list && (
            <ul>
              {s.list.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          )}
        </section>
      ))}
      <p className="text-sm">{updated}</p>
    </>
  );
}
