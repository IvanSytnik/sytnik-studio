import { getTranslations } from "next-intl/server";

import { routing, type Locale } from "@/i18n/routing";
import { OG_SIZE, renderOgImage } from "@/lib/og/render";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Ivan Sytnik — Independent Web Studio";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return renderOgImage({
    eyebrow: t("ogEyebrow"),
    title: t("ogTitle"),
    description: t("ogDescription"),
    footer: t("ogFooter"),
  });
}
