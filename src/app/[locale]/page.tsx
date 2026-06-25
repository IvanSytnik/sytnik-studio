import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";

import { Container } from "@/components/layout/container";
import { routing, type Locale } from "@/i18n/routing";
import { brand } from "@/lib/brand";
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
      <SkeletonHero />
      <SectionPlaceholders />
    </>
  );
}

function SkeletonHero() {
  const t = useTranslations();
  return (
    <section className="relative flex min-h-[calc(100dvh-4rem)] items-center justify-center overflow-hidden px-6 py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl dark:bg-accent/15"
      />
      <div className="relative mx-auto max-w-2xl text-center">
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {brand.shortName} · skeleton
        </p>
        <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          {t("welcome.title")}
        </h1>
        <p className="mt-6 text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
          {t("welcome.description")}
        </p>
        <div className="mt-10 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 font-mono text-xs text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          {t("brand.tagline")}
        </div>
      </div>
    </section>
  );
}

/**
 * Placeholder anchors for each upcoming section.
 * Lets header nav and footer nav actually scroll somewhere until the real
 * sections land. Will be replaced section-by-section in future packs.
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
