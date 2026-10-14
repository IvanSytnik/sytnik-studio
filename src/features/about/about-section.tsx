import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { Container } from "@/components/layout/container";
import portrait from "../../../public/images/ivan-sytnik.webp";

const FACTS = ["location", "languages", "education", "clients"] as const;
const REASONS = [
  "endToEnd",
  "direct",
  "ai",
  "multilingual",
  "quality",
  "remote",
] as const;

/**
 * Who's behind the work and why that matters to a client.
 * Placed after the projects on purpose: proof first, then the person.
 * Server Component — the portrait is the only client code (next/image).
 */
export async function AboutSection() {
  const t = await getTranslations("about");

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-14 border-t border-border pb-16 pt-10 sm:pb-20"
    >
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="order-2 lg:order-1 lg:col-span-4">
          <div className="w-40 overflow-hidden rounded-xl bg-muted ring-1 ring-border sm:w-48">
            <Image
              src={portrait}
              alt={t("portraitAlt")}
              placeholder="blur"
              sizes="192px"
              className="aspect-[4/5] h-auto w-full object-cover"
            />
          </div>

          <dl className="mt-8 divide-y divide-border border-y border-border">
            {FACTS.map((key) => (
              <div
                key={key}
                className="grid grid-cols-[7.5rem_1fr] gap-4 py-3 text-sm"
              >
                <dt className="text-muted-foreground">
                  {t(`facts.${key}.label`)}
                </dt>
                <dd>{t(`facts.${key}.value`)}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="order-1 lg:order-2 lg:col-span-8">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {t("eyebrow")}
          </p>
          <h2
            id="about-heading"
            className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl"
          >
            {t("title")}
          </h2>
          <p className="mt-6 max-w-[62ch] text-pretty leading-relaxed text-muted-foreground sm:text-lg">
            {t("bio")}
          </p>

          <h3 className="mt-14 text-lg font-semibold tracking-tight">
            {t("reasonsTitle")}
          </h3>
          <ul className="mt-6 grid gap-x-10 sm:grid-cols-2">
            {REASONS.map((key) => (
              <li key={key} className="border-t border-border py-5">
                <p className="font-medium">{t(`reasons.${key}.title`)}</p>
                <p className="mt-1.5 text-pretty text-sm leading-relaxed text-muted-foreground">
                  {t(`reasons.${key}.text`)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
