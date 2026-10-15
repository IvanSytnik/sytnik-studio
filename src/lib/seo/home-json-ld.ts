import { brand } from "@/lib/brand";
import { legal } from "@/lib/legal";

/**
 * Structured data for the homepage: who I am (Person) and what I offer
 * (ProfessionalService, with the Graz address). Helps search engines show
 * the site for local queries like "web developer Graz".
 * Built only from static config — no user input.
 */
export function homeJsonLd(url: string, description: string) {
  const sameAs = [brand.social.github, brand.social.linkedin].filter(Boolean);
  const address = {
    "@type": "PostalAddress",
    streetAddress: legal.street,
    postalCode: legal.postalCode,
    addressLocality: legal.city,
    addressCountry: "AT",
  };

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
        address,
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
        address,
        areaServed: ["AT", "DE", "EU", "US"],
        founder: { "@id": `${url}#person` },
      },
    ],
  };
}
