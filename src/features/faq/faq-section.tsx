import { getTranslations } from "next-intl/server";
import { FiPlus } from "react-icons/fi";

import { Container } from "@/components/layout/container";

const QUESTIONS = [
  "cost",
  "payment",
  "ownership",
  "support",
  "existing",
  "hosting",
  "languages",
  "nda",
] as const;

/**
 * Answers to what clients ask before hiring. Native <details>/<summary>:
 * keyboard- and screen-reader-accessible with zero JavaScript. FAQPage
 * structured data lets search engines show the answers directly.
 */
export async function FaqSection() {
  const t = await getTranslations("faq");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: QUESTIONS.map((key) => ({
      "@type": "Question",
      name: t(`items.${key}.q`),
      acceptedAnswer: { "@type": "Answer", text: t(`items.${key}.a`) },
    })),
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="scroll-mt-14 border-t border-border pb-16 pt-10 sm:pb-20"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Container className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <header className="lg:col-span-4">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {t("eyebrow")}
          </p>
          <h2
            id="faq-heading"
            className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            {t("title")}
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            {t("intro")}
          </p>
        </header>

        <div className="border-b border-border lg:col-span-8">
          {QUESTIONS.map((key) => (
            <details key={key} className="group border-t border-border">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-sm py-5 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
                {t(`items.${key}.q`)}
                <FiPlus
                  aria-hidden
                  className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-45"
                />
              </summary>
              <p className="max-w-[62ch] text-pretty pb-6 leading-relaxed text-muted-foreground">
                {t(`items.${key}.a`)}
              </p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
