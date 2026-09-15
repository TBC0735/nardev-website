import type { Locale } from "@/i18n/config";

/**
 * Traductions anglaises du contenu géré en base (services, réalisations,
 * équipe). La base reste en français ; ces tables ne sont utilisées que pour
 * l'affichage quand `locale === "en"`, sans migration ni champ admin
 * supplémentaire. Clé = `slug` (services, projets) ou `nom` (membres).
 *
 * Un champ absent d'une entrée retombe simplement sur la valeur française.
 */

type ServiceOverride = Partial<{
  titre: string;
  resume: string;
  description: string;
  avantages: string[];
  pointsCles: string[];
}>;

const servicesEn: Record<string, ServiceOverride> = {
  "sites-vitrines": {
    titre: "Showcase websites",
    resume: "A clear, welcoming online presence, ready in a few weeks.",
    description:
      "A simple, polished site to present your business, your services and your contact details. Ideal for getting online quickly, with a design that inspires trust from the first visit.",
    avantages: [
      "Increase your visibility online",
      "Showcase your business and your values",
      "Information available around the clock",
      "Build trust with your customers",
      "Attract new customers",
    ],
    pointsCles: [
      "Mock-up approved with you before development",
      "Responsive site (mobile, tablet, desktop)",
      "Up to 5 pages (home, services, contact, etc.)",
      "Launch included",
    ],
  },
  "sites-dynamiques": {
    titre: "Dynamic websites",
    resume: "A site you run yourself, without depending on anyone.",
    description:
      "A site with a back office that lets you manage your own content without depending on a developer. Perfect for a catalogue, a blog, or any business that changes regularly.",
    avantages: [
      "Full control over your content, no coding required",
      "A site that grows with your business",
      "Ideal for a catalogue, a blog or ongoing projects",
      "No dependency on a developer to publish",
    ],
    pointsCles: [
      "Simple back office to manage your content",
      "Database for your products, articles or projects",
      "Training on how to use the admin panel",
      "Hosting and launch handled for you",
    ],
  },
  "flyers-affiches": {
    titre: "Flyers & posters",
    resume: "Print and digital materials that truly look like you.",
    description:
      "Print materials aligned with your brand image, ready to print or share on social media. We adapt the message and the visuals to your audience.",
    avantages: [
      "A consistent brand image across all your materials",
      "Visuals ready for both print and web",
      "A message tailored to your audience",
      "Ideal for your events and promotions",
    ],
    pointsCles: [
      "Custom design in your brand colours",
      "Print-ready files (high resolution)",
      "Version adapted for social media",
      "1 to 2 rounds of revisions included",
    ],
  },
  "visibilite-google": {
    titre: "Google visibility",
    resume: "Be easily found by customers searching near you.",
    description:
      "We optimise your Google Business profile so customers can find you easily when they search for your services nearby. A simple, effective lever for local visibility.",
    avantages: [
      "Appear in local searches and on Google Maps",
      "Build trust through customer reviews",
      "A simple lever, no advertising budget needed",
      "Always up-to-date information (hours, photos)",
    ],
    pointsCles: [
      "Creation or optimisation of your Google Business profile",
      "Adding photos, hours and key information",
      "Advice on getting customer reviews",
      "One month of visibility follow-up",
    ],
  },
};

type ProjetOverride = Partial<{
  resume: string;
  besoin: string;
  solution: string;
  role: string;
}>;

const projetsEn: Record<string, ProjetOverride> = {
  sunuetude: {
    resume:
      "Web platform to support students in Senegal: registration, school choice, housing and welcome.",
    besoin:
      "Students in Senegal have to manage several study-related steps separately: registering, choosing an institution, finding housing and organising their arrival. There was no single tool to track all of it.",
    solution:
      "A web platform that brings these steps together in one place: authentication and user management, student and school management, online registration, housing and landlord management, online payments, notifications, dashboards per profile, and administrative management.",
    role: "Design and development of the web platform, from the technical architecture to the individual features.",
  },
  nattbi: {
    resume:
      "Tontine (savings group) management platform, with mobile payments built in (Wave, Orange Money).",
    besoin:
      "Tontines are usually managed by hand: calculations on paper, unreliable tracking of contributions and payout order, risk of errors.",
    solution:
      "An application that simplifies day-to-day tontine management: tracking members, contributions and payout order, with mobile payments (Wave, Orange Money) built in directly, no longer depending on manual calculation.",
    role: "Development of the platform: MVC architecture with Laravel 12 (PHP 8.2) and Blade, Tailwind CSS for the frontend, MySQL for the database, integration of mobile payments Wave and Orange Money via PayTech.",
  },
  tresca: {
    resume:
      "Showcase website for TRESCA, a building and public works company.",
    besoin:
      "TRESCA needed a website to present and promote its building and public works services: road and utility works, building construction, rehabilitation and renovation.",
    solution:
      "A WordPress showcase site presenting the company and its three areas of work: road and utility works (roads, pavements, sewage, water, electricity and telecom networks), construction of public and private buildings, and rehabilitation/renovation of existing structures — with a quote request button and contact details.",
    role: "Design and development of the site on WordPress.",
  },
};

type MembreOverride = Partial<{ role: string; presentation: string }>;

const membresEn: Record<string, MembreOverride> = {
  "Ndiawar Thiaw": {
    role: "Co-founder · Technical lead",
    presentation:
      "He sets up the technical foundations of projects and follows development through to launch.",
  },
  "Mame Diarra": {
    role: "Co-founder · Administrative & financial manager",
    presentation:
      "She handles the agency's administrative and financial follow-up and frames each project from an organisational standpoint.",
  },
  Rokhaya: {
    role: "Co-founder · Development & communication",
    presentation:
      "She takes part in project development and in presenting the agency's work.",
  },
  "Awa Ndao": {
    role: "Co-founder · Development & communication",
    presentation:
      "She contributes to project development and follows up on client exchanges.",
  },
};

function merge<T extends object>(
  row: T,
  overrides: Record<string, Partial<T>>,
  key: string,
  locale: Locale,
): T {
  if (locale !== "en") return row;
  const override = overrides[key];
  return override ? { ...row, ...override } : row;
}

export function localizeService<T extends { slug: string }>(
  service: T,
  locale: Locale,
): T {
  return merge(service, servicesEn, service.slug, locale);
}

export function localizeProjet<T extends { slug: string }>(
  projet: T,
  locale: Locale,
): T {
  return merge(projet, projetsEn, projet.slug, locale);
}

export function localizeMembre<T extends { nom: string }>(
  membre: T,
  locale: Locale,
): T {
  return merge(membre, membresEn, membre.nom, locale);
}
