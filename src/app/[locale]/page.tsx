import { setRequestLocale } from "next-intl/server";

import { AboutSection } from "@/features/about/about-section";
import { ContactSection } from "@/features/contact/contact-section";
import { FaqSection } from "@/features/faq/faq-section";
import { HeroSection } from "@/features/hero/hero-section";
import { ProcessSection } from "@/features/process/process-section";
import { ProjectsSection } from "@/features/projects/projects-section";
import { ServicesSection } from "@/features/services/services-section";
import { routing, type Locale } from "@/i18n/routing";

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
      <ProjectsSection />
      <AboutSection />
      <ServicesSection />
      <ProcessSection />
      <FaqSection />
      <ContactSection />
    </>
  );
}
