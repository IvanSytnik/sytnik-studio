import { getTranslations } from "next-intl/server";

import { getProjectStats } from "@/features/projects/queries";
import { routing } from "@/i18n/routing";

/**
 * Proof points under the CTAs. Every number is computed — from the project
 * registry and from the locales the site itself ships in — so the hero can
 * never claim more than the portfolio shows.
 *
 * Rendered as one ruled strip (a <dl>) rather than floating cards: it reads
 * as facts, not as decoration.
 */
export async function HeroStats() {
  const t = await getTranslations("hero.stats");
  const { total, live } = getProjectStats();
  const languages = routing.locales.length;

  const items = [
    { value: total, label: t("projects", { count: total }) },
    { value: live, label: t("live", { count: live }) },
    {
      value: languages,
      label: t("languages", { count: languages }),
      hint: t("languagesHint"),
    },
  ];

  return (
    <dl className="grid grid-cols-3 divide-x divide-border">
      {items.map((item) => (
        <div
          key={item.label}
          className="flex flex-col gap-1 px-3 py-1 first:pl-0 sm:px-5 sm:first:pl-0"
        >
          <dt className="order-2 text-xs leading-snug text-muted-foreground sm:text-sm">
            {item.label}
            {item.hint && (
              <span className="mt-0.5 block text-[11px] text-muted-foreground/80 sm:text-xs">
                {item.hint}
              </span>
            )}
          </dt>
          <dd className="order-1 text-3xl font-semibold tabular-nums tracking-tight sm:text-4xl">
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
