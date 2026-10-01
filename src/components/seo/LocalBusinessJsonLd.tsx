import type { SiteConfig } from "@/types";

/** schema.org structured data for local businesses. Rendered once in the root layout. */
export function LocalBusinessJsonLd({ config }: { config: SiteConfig }) {
  const { contact, seo, socials } = config;

  const data = {
    "@context": "https://schema.org",
    "@type": seo.businessType,
    name: config.name,
    description: seo.description,
    url: seo.siteUrl,
    email: contact.email,
    telephone: contact.phone,
    address: contact.address && {
      "@type": "PostalAddress",
      streetAddress: contact.address.street,
      addressLocality: contact.address.city,
      addressRegion: contact.address.region,
      postalCode: contact.address.postalCode,
      addressCountry: contact.address.country,
    },
    sameAs: socials.map((social) => social.href),
  };

  return (
    <script
      type="application/ld+json"
      // Escape "<" so content can never close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
