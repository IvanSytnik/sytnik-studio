import { getTranslations } from "next-intl/server";

import { Container } from "@/components/layout/container";
import { buttonVariants } from "@/components/ui/button";
import { QuickContact } from "@/components/contact/quick-contact";
import { cn } from "@/lib/utils";
import { HeroStats } from "./hero-stats";

/**
 * First screen — typographic. The headline is the visual: set large, full
 * container width, and everything else stays quiet around it.
 *
 * Layout (lg+):
 *   badge
 *   HEADLINE ACROSS THE FULL WIDTH
 *   ───────────────────────────────────────────────
 *   subtitle + CTAs (cols 1–6)     stats (cols 8–12)
 *
 * Server Component, ships no JavaScript.
 *
 * Motion: one short load sequence (badge → text → CTAs → stats), CSS only,
 * under `motion-safe`. The H1 is deliberately NOT animated — it is the LCP
 * element, and anything starting at opacity 0 delays LCP by its duration.
 */
export async function HeroSection() {
  const t = await getTranslations("hero");

  const enter =
    "motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-700 motion-safe:fill-mode-both";

  return (
    <section
      data-hero
      aria-labelledby="hero-heading"
      className="relative pb-12 pt-6 sm:pb-20 sm:pt-14 lg:pb-24 lg:pt-16"
    >
      <Container>
        <p
          className={cn(
            "inline-flex items-center gap-2 rounded-2xl border border-border bg-card px-3 py-1 text-xs text-muted-foreground sm:rounded-full sm:text-sm",
            enter
          )}
        >
          <span aria-hidden className="h-2 w-2 rounded-full bg-emerald-500" />
          {t("availability")}
        </p>

        <h1
          id="hero-heading"
          className="mt-5 max-w-[20ch] text-balance break-words text-[2rem] font-semibold leading-[1.05] tracking-[-0.035em] sm:mt-6 sm:text-5xl lg:text-6xl xl:text-[4.25rem]"
        >
          {t("title")}
        </h1>

        <div className="mt-6 grid gap-10 border-t border-border pt-6 sm:mt-10 sm:pt-8 lg:mt-12 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className={cn("lg:col-span-6", enter, "motion-safe:delay-150")}>
            <p className="max-w-[52ch] text-pretty text-[15px] leading-relaxed text-muted-foreground sm:text-lg">
              {t("subtitle")}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:flex">
              <a
                href="#contact"
                className={buttonVariants({ variant: "accent", size: "lg" })}
              >
                {t("ctaPrimary")}
              </a>
              <a
                href="#projects"
                className={buttonVariants({ variant: "outline", size: "lg" })}
              >
                {t("ctaSecondary")}
              </a>
            </div>
            <div className="mt-4 flex items-center gap-3 text-sm text-muted-foreground sm:mt-5">
              <span>{t("orDirect")}</span>
              <QuickContact variant="responsive" />
            </div>
          </div>

          <div
            className={cn(
              "lg:col-span-5 lg:col-start-8",
              enter,
              "motion-safe:delay-300"
            )}
          >
            <HeroStats />
          </div>
        </div>
      </Container>
    </section>
  );
}
