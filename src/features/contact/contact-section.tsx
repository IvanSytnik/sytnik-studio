import { getTranslations } from "next-intl/server";
import { FiArrowUpRight } from "react-icons/fi";

import { Container } from "@/components/layout/container";
import { brand } from "@/lib/brand";
import { ContactForm } from "./contact-form";

/** Last section on the landing page: one clear way to get in touch. */
export async function ContactSection() {
  const t = await getTranslations("contact");

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-14 border-t border-border pb-20 pt-10 sm:pb-28"
    >
      <Container className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <header className="lg:col-span-5">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {t("eyebrow")}
          </p>
          <h2
            id="contact-heading"
            className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl"
          >
            {t("title")}
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground sm:text-lg">
            {t("intro")}
          </p>

          <ul className="mt-8 space-y-2 text-sm">
            <li className="text-muted-foreground">{t("reply")}</li>
            {brand.social.linkedin && (
              <li>
                <a
                  href={brand.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-sm font-medium underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {t("linkedin")}
                  <FiArrowUpRight aria-hidden className="h-3.5 w-3.5" />
                </a>
              </li>
            )}
          </ul>
        </header>

        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </Container>
    </section>
  );
}
