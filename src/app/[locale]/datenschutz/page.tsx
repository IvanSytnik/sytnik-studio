import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { PrivacyContent, privacyTitle } from "@/features/legal/privacy-content";
import { LegalPage } from "@/features/legal/legal-page";
import { routing, type Locale } from "@/i18n/routing";
import { languageAlternates, localizedUrl } from "@/lib/urls";

type Params = { locale: Locale };

/** Legal texts exist in German (binding) and English; uk/ru show English. */
const langFor = (locale: Locale) => (locale === "de" ? "de" : "en");

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: privacyTitle(langFor(locale)),
    alternates: {
      canonical: localizedUrl(locale, "/datenschutz"),
      languages: languageAlternates("/datenschutz"),
    },
  };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const lang = langFor(locale);
  return (
    <LegalPage
      title={privacyTitle(lang)}
      note={
        lang === "en" ? "The German version is legally binding." : undefined
      }
    >
      <PrivacyContent lang={lang} />
    </LegalPage>
  );
}
