// Informations publiques de l'agence, centralisées.
// À compléter au fur et à mesure (numéro, réseaux sociaux, vrai domaine).

export const site = {
  name: "Nardev",
  // Remplacé par le vrai domaine via NEXT_PUBLIC_SITE_URL quand il sera acheté.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://nardev-website.vercel.app",
  descriptionFr:
    "Nardev conçoit des sites vitrines, des sites dynamiques, des supports print et améliore votre visibilité sur Google. Une équipe à Dakar, un interlocuteur unique.",
  descriptionEn:
    "Nardev builds showcase sites, dynamic sites and print materials, and improves your Google visibility. A team in Dakar, one point of contact.",
  email: "contact@nardev.sn",
  // telephone: "+221 ...",   // à ajouter
  city: "Dakar",
  country: "SN",
  // Liens réseaux sociaux — à remplir quand les comptes existent (utilisés dans le JSON-LD `sameAs`).
  social: [] as string[],
} as const;

/** Données structurées Organization (schema.org) pour le référencement. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    logo: `${site.url}/logo.png`,
    email: site.email,
    description: site.descriptionFr,
    areaServed: { "@type": "Country", name: "Sénégal" },
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city,
      addressCountry: site.country,
    },
    ...(site.social.length > 0 ? { sameAs: site.social } : {}),
  };
}
