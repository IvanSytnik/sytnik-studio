import { getTranslations } from "next-intl/server";

import { Container } from "@/components/layout/container";

const STEPS = [
  "call",
  "estimate",
  "design",
  "build",
  "launch",
  "support",
] as const;

/**
 * How a project runs, from first call to support. The steps really are a
 * sequence, so they are numbered; on large screens they read as a
 * horizontal timeline, on small screens as a vertical list.
 */
export async function ProcessSection() {
  const t = await getTranslations("process");

  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="scroll-mt-14 border-t border-border pb-10 pt-10 sm:pb-12"
    >
      <Container>
        <header className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {t("eyebrow")}
          </p>
          <h2
            id="process-heading"
            className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl"
          >
            {t("title")}
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground sm:text-lg">
            {t("intro")}
          </p>
        </header>

        <ol className="mt-10 grid gap-x-8 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((key, i) => (
            <li key={key} className="border-t border-border py-6">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs tabular-nums text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-semibold tracking-tight">
                  {t(`steps.${key}.title`)}
                </h3>
              </div>
              <p className="mt-2 text-pretty pl-8 text-sm leading-relaxed text-muted-foreground">
                {t(`steps.${key}.text`)}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
