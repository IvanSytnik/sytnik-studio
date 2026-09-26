import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";

import { Container } from "@/components/layout/container";
import { HeroSection } from "@/features/hero/hero-section";
import { routing, type Locale } from "@/i18n/routing";
import { navItems } from "@/lib/nav";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <HeroSection />
      <SectionPlaceholders />
    </>
  );
}

/**
 * Placeholder anchors for each upcoming section.
 * Lets header nav and the hero CTAs scroll somewhere until the real
 * sections land. Replaced section-by-section in future packs.
 */
function SectionPlaceholders() {
  const t = useTranslations("nav");
  return (
    <Container className="space-y-16 py-24">
      {navItems.map((item) => (
        <section
          key={item.id}
          id={item.id}
          aria-labelledby={`${item.id}-heading`}
          className="scroll-mt-20 rounded-lg border border-dashed border-border bg-card/40 p-8"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            #{item.id}
          </p>
          <h2
            id={`${item.id}-heading`}
            className="mt-2 text-2xl font-semibold tracking-tight"
          >
            {t(item.labelKey)}
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Placeholder. Real section ships in an upcoming pack.
          </p>
        </section>
      ))}
    </Container>
  );
}
