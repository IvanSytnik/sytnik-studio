import { brand } from "@/lib/brand";
import { legal } from "@/lib/legal";

/**
 * Structured data for the homepage: who I am (Person) and what I offer
 * (ProfessionalService). The registered address is included only once it
 * is filled in `legal.ts`. Built only from static config — no user input.
 */
export function homeJsonLd(url: string, description: string) {
  const sameAs = [brand.social.github, brand.social.linkedin].filter(Boolean);
  const a = legal.address;
  const address =
    a.street && a.postalCode && a.city
      ? {
          "@type": "PostalAddress",
          streetAddress: a.street,
          postalCode: a.postalCode,
          addressLocality: a.city,
          addressCountry: "UA",
        }
      : undefined;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${url}#person`,
        name: brand.name,
        jobTitle: "Full-stack developer",
        url,
        email: `mailto:${brand.contact.email}`,
        sameAs,
        knowsLanguage: ["en", "de", "uk", "ru"],
      },
      {
        "@type": "ProfessionalService",
        "@id": `${url}#service`,
        name: brand.fullName,
        description,
        url,
        email: brand.contact.email,
        ...(address && { address }),
        areaServed: ["EU", "US", "UA"],
        currenciesAccepted: legal.currencies.join(", "),
        founder: { "@id": `${url}#person` },
      },
    ],
  };
}
