import { getTranslations, setRequestLocale } from "next-intl/server";

import { MobileContactBar } from "@/components/contact/mobile-contact-bar";
import { SectionCta } from "@/components/contact/section-cta";

import { AboutSection } from "@/features/about/about-section";
import { ContactSection } from "@/features/contact/contact-section";
import { FaqSection } from "@/features/faq/faq-section";
import { HeroSection } from "@/features/hero/hero-section";
import { ProcessSection } from "@/features/process/process-section";
import { ProjectsSection } from "@/features/projects/projects-section";
import { ServicesSection } from "@/features/services/services-section";
import { routing, type Locale } from "@/i18n/routing";
import { brand } from "@/lib/brand";

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
  const t = await getTranslations("nav");

  // Order follows how a client decides: what do you do → proof → how we'd
  // work → who you are → doubts → contact. Short CTAs sit between blocks so
  // nobody has to reach the bottom to get in touch.
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <SectionCta variant="afterServices" />
      <ProjectsSection />
      <SectionCta variant="afterProjects" />
      <ProcessSection />
      <AboutSection />
      <FaqSection />
      <ContactSection />
      <MobileContactBar
        ctaLabel={t("cta")}
        telegramUrl={brand.contact.telegram.url}
        whatsappUrl={brand.contact.whatsapp.url}
      />
    </>
  );
}
