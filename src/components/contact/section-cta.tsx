import { getTranslations } from "next-intl/server";

import { Container } from "@/components/layout/container";
import { buttonVariants } from "@/components/ui/button";
import { QuickContact } from "./quick-contact";

/**
 * A short call to action between sections, so a visitor who is convinced
 * halfway down the page doesn't have to scroll to the end to get in touch.
 */
export async function SectionCta({
  variant,
}: {
  variant: "afterServices" | "afterProjects";
}) {
  const t = await getTranslations("cta");

  return (
    <Container className="pb-16 sm:pb-20">
      <div className="flex flex-col gap-5 rounded-xl border border-border bg-card px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <p className="font-semibold tracking-tight">
            {t(`${variant}.title`)}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {t(`${variant}.text`)}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <a href="#contact" className={buttonVariants({ variant: "accent" })}>
            {t("button")}
          </a>
          <QuickContact variant="icon" />
        </div>
      </div>
    </Container>
  );
}
