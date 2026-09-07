import type { Locale } from "./config";

// Traductions de l'interface. Les contenus gérés en base (détails des services,
// fiches projets, membres de l'équipe) restent en français pour l'instant.

const fr = {
  nav: {
    services: "Services",
    portfolio: "Portfolio",
    about: "À propos",
    contact: "Contact",
    faq: "FAQ",
    legal: "Mentions légales",
  },
  cta: {
    quote: "Demander un devis",
    contactUs: "Nous contacter",
    learnMore: "En savoir plus",
    seeWork: "Voir nos réalisations",
    requestService: "Demander ce service",
    seeExamples: "Voir des exemples",
    send: "Envoyer",
    sending: "Envoi…",
  },
  langToggle: { label: "Langue", fr: "Français", en: "English" },
  footer: {
    tagline:
      "Agence web — sites vitrines, sites dynamiques, print et visibilité Google.",
    navTitle: "Navigation",
    contactTitle: "Contact",
    rights: "Tous droits réservés.",
  },
  hero: {
    title:
      "Nardev conçoit des sites web et des supports qui font grandir votre activité.",
    text: "Sites vitrines, sites dynamiques, print et visibilité Google — une équipe à taille humaine, à l'écoute de votre projet du premier échange jusqu'à la mise en ligne.",
  },
  home: {
    servicesTitle: "Nos services",
    servicesEmpty: "Les services seront bientôt disponibles ici.",
    ctaTitle: "Un projet en tête ?",
    ctaText:
      "Parlons-en, tout simplement. On revient vers vous rapidement avec une proposition concrète.",
  },
  aboutTeaser: {
    title: "Qui sommes-nous",
    text: "Nardev est une agence à taille humaine. On préfère les échanges directs aux process compliqués, et un site qui vous ressemble vraiment plutôt qu'un modèle recopié — du premier brief jusqu'à la mise en ligne, et après.",
  },
  about: {
    title: "À propos de Nardev",
    intro:
      "Nardev est née de l'envie de rendre le web professionnel accessible aux petites structures : commerces, artisans, associations et jeunes entreprises. Plutôt que de sous-traiter chacun de notre côté, nous avons réuni nos compétences — développement, design et communication — dans une seule équipe, avec un interlocuteur unique pour chaque client.",
    teamTitle: "L'équipe",
    teamText:
      "Quatre fondateurs, chacun responsable d'un pan du projet de bout en bout.",
    teamEmpty:
      "La présentation de l'équipe sera visible dès que les membres auront été ajoutés depuis le back-office.",
    valuesTitle: "Nos valeurs",
    values: [
      {
        title: "Proximité",
        text: "Un seul interlocuteur, des échanges clairs et des points réguliers, du premier rendez-vous jusqu'à la mise en ligne.",
      },
      {
        title: "Travail soigné",
        text: "Des sites rapides, lisibles sur mobile et faciles à faire évoluer — sans effets inutiles ni surcharge.",
      },
      {
        title: "Transparence",
        text: "Des devis détaillés, des délais annoncés et tenus, et aucun coût caché en cours de route.",
      },
    ],
    ctaTitle: "Envie de travailler avec nous ?",
    ctaText: "Présentez-nous votre projet, on revient vers vous rapidement.",
  },
  services: {
    title: "Nos services",
    intro:
      "Quatre façons de vous accompagner, du site vitrine à la visibilité locale. Chaque service peut être demandé directement depuis cette page — le tarif se construit avec vous, sur devis.",
    empty: "Les services seront bientôt disponibles ici.",
    whyTitle: "Pourquoi ce service",
    receiveTitle: "Ce que vous recevez",
    priceNote: "Tarif sur devis, adapté à votre projet.",
    processTitle: "Comment ça se passe",
    processText: "Le même déroulé simple, quel que soit le service choisi.",
    steps: [
      {
        title: "Échange & brief",
        text: "On prend le temps de comprendre votre activité, votre cible et ce dont vous avez vraiment besoin.",
      },
      {
        title: "Maquette validée avec vous",
        text: "Vous voyez à quoi ressemblera votre projet avant qu'on ne développe la moindre ligne.",
      },
      {
        title: "Réalisation",
        text: "On développe (ou on designe) en gardant le contact — vous suivez l'avancement, pas de surprise à la fin.",
      },
      {
        title: "Livraison & suite",
        text: "Mise en ligne accompagnée, et on reste disponible ensuite pour les ajustements et les évolutions.",
      },
    ],
  },
  portfolio: {
    title: "Nos réalisations",
    intro:
      "Quelques projets menés par Nardev. Chaque fiche détaille le besoin du client, la solution apportée et les technologies utilisées.",
    empty: "Les réalisations seront bientôt visibles ici.",
    filterAll: "Tous",
    filterEmpty: "Aucun projet pour ce filtre.",
    previewTitle: "Nos réalisations",
    seeAll: "Voir tout",
    back: "← Retour aux réalisations",
    needTitle: "Le besoin",
    solutionTitle: "Notre solution",
    techTitle: "Technologies",
    similarCta: "Un projet similaire ?",
    notFound: "Projet introuvable",
  },
  contact: {
    title: "Nous contacter",
    intro:
      "Présentez-nous votre projet en quelques lignes. On revient vers vous rapidement, avec une proposition concrète.",
    devisNote:
      "Demande de devis — précisez votre besoin, on vous répond avec une estimation.",
    name: "Nom",
    company: "Entreprise (optionnel)",
    email: "Email",
    phone: "Téléphone (optionnel)",
    serviceLabel: "Service souhaité",
    serviceDefault: "— Je ne sais pas encore —",
    message: "Votre message",
    messagePlaceholder:
      "Décrivez votre projet, vos délais, votre budget indicatif…",
    error: "L'envoi a échoué. Réessayez dans un instant.",
    sentTitle: "Message bien reçu.",
    sentText:
      "Merci ! Nous revenons vers vous par email dès que possible, en général sous 48 h ouvrées.",
    coordsTitle: "Coordonnées",
    emailLabel: "Email",
    phoneLabel: "Téléphone",
    privacyNote: "Vos informations servent uniquement à traiter votre demande.",
    privacyLink: "mentions légales",
  },
  faq: {
    title: "Questions fréquentes",
    intro:
      "Les réponses aux questions qu'on nous pose le plus souvent. Une autre question ?",
    contactLink: "Écrivez-nous",
    items: [
      {
        q: "Combien coûte un site ?",
        a: "Chaque projet est différent, donc chaque tarif l'est aussi. On établit un devis détaillé et gratuit après un premier échange, en fonction du nombre de pages, des fonctionnalités et du contenu à préparer. Pas de coût caché.",
      },
      {
        q: "En combien de temps le site est-il prêt ?",
        a: "Comptez 2 à 4 semaines pour un site vitrine, un peu plus pour un site dynamique avec back-office. Le délai dépend surtout de la rapidité avec laquelle vous nous fournissez les textes et les images.",
      },
      {
        q: "Est-ce que je pourrai modifier le site moi-même ensuite ?",
        a: "Pour un site vitrine, les modifications se font par nous (petites retouches incluses le premier mois). Pour un site dynamique, vous avez un espace d'administration et une formation pour gérer vos contenus en autonomie.",
      },
      {
        q: "L'hébergement et le nom de domaine sont-ils inclus ?",
        a: "La mise en ligne est incluse. L'hébergement et le nom de domaine sont à votre nom ; on s'occupe de la configuration et on vous conseille sur les fournisseurs.",
      },
      {
        q: "Proposez-vous la maintenance après la livraison ?",
        a: "Oui, en option : mises à jour techniques, sauvegardes, petites évolutions. On en discute selon vos besoins réels, sans vous imposer un forfait.",
      },
      {
        q: "Combien d'allers-retours sont possibles sur le design ?",
        a: "On valide ensemble une maquette avant de développer, puis 1 à 2 séries de retouches sont incluses. Au-delà, on en parle en toute transparence.",
      },
      {
        q: "Travaillez-vous avec des clients hors de Dakar ?",
        a: "Oui. La plupart des échanges se font à distance (appel, visio, WhatsApp). On peut se rencontrer sur Dakar si c'est utile.",
      },
      {
        q: "Comment se passe le paiement ?",
        a: "En général un acompte au démarrage et le solde à la livraison. Les modalités sont précisées dans le devis.",
      },
    ],
  },
  legal: {
    title: "Mentions légales",
    updated: "Dernière mise à jour : septembre 2026.",
    editorTitle: "Éditeur du site",
    editorBody:
      "Le site nardev est édité par Nardev, structure en cours d'immatriculation, basée à Dakar (Sénégal).",
    editorDirector: "Directeur de la publication : Ndiawar Thiaw",
    editorContact: "Contact :",
    editorRegistration:
      "Le numéro NINEA et le numéro RCCM seront ajoutés dès la fin des démarches d'immatriculation.",
    hostTitle: "Hébergement",
    hostBody:
      "Le site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis — vercel.com. La base de données est hébergée par Neon (Neon Inc.), au sein de l'Union européenne.",
    ipTitle: "Propriété intellectuelle",
    ipBody:
      "Sauf mention contraire, l'ensemble des contenus du site (textes, visuels, logo, code) est la propriété de Nardev. Toute reproduction ou réutilisation sans autorisation écrite préalable est interdite. Les projets présentés dans la section « Réalisations » sont publiés avec l'accord des clients concernés.",
    dataTitle: "Données personnelles (formulaire de contact)",
    dataIntro:
      "Le formulaire de la page Contact collecte les informations que vous y saisissez : nom, adresse email, téléphone (facultatif), nom de l'entreprise (facultatif), service souhaité et contenu de votre message.",
    dataPurpose:
      "Finalité : traiter votre demande et vous recontacter. Ces données ne sont ni vendues ni transmises à des tiers à des fins commerciales.",
    dataRecipients:
      "Destinataires : l'équipe de Nardev uniquement. Une notification est envoyée par email via le prestataire Resend (Resend, Inc.) le cas échéant.",
    dataRetention:
      "Conservation : les messages sont conservés le temps nécessaire au suivi de la demande, puis supprimés au plus tard 24 mois après le dernier échange.",
    dataRights:
      "Vos droits : conformément à la loi sénégalaise n° 2008-12 du 25 janvier 2008 sur la protection des données à caractère personnel, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Écrivez à contact@nardev.sn. Vous pouvez également saisir la Commission de protection des données personnelles (CDP) du Sénégal.",
    cookiesTitle: "Cookies",
    cookiesBody:
      "Le site public ne dépose aucun cookie de mesure d'audience ni de publicité. Un cookie de session est utilisé uniquement dans l'espace d'administration réservé à l'équipe, pour maintenir la connexion.",
  },
};

export type Dict = typeof fr;

const en: Dict = {
  nav: {
    services: "Services",
    portfolio: "Portfolio",
    about: "About",
    contact: "Contact",
    faq: "FAQ",
    legal: "Legal notice",
  },
  cta: {
    quote: "Request a quote",
    contactUs: "Get in touch",
    learnMore: "Learn more",
    seeWork: "See our work",
    requestService: "Request this service",
    seeExamples: "See examples",
    send: "Send",
    sending: "Sending…",
  },
  langToggle: { label: "Language", fr: "Français", en: "English" },
  footer: {
    tagline:
      "Web agency — showcase sites, dynamic sites, print and Google visibility.",
    navTitle: "Navigation",
    contactTitle: "Contact",
    rights: "All rights reserved.",
  },
  hero: {
    title: "Nardev builds websites and materials that help your business grow.",
    text: "Showcase sites, dynamic sites, print and Google visibility — a small, hands-on team that listens to your project from the first conversation to going live.",
  },
  home: {
    servicesTitle: "Our services",
    servicesEmpty: "Services will be available here soon.",
    ctaTitle: "Have a project in mind?",
    ctaText:
      "Let's talk it through. We'll get back to you quickly with a concrete proposal.",
  },
  aboutTeaser: {
    title: "Who we are",
    text: "Nardev is a small, hands-on agency. We prefer direct conversations over heavy processes, and a site that truly fits you rather than a copied template — from the first brief to launch, and beyond.",
  },
  about: {
    title: "About Nardev",
    intro:
      "Nardev was born from the wish to make professional web work accessible to small organisations: shops, craftspeople, associations and young businesses. Rather than each subcontracting on our own, we brought our skills together — development, design and communication — into a single team, with one point of contact for every client.",
    teamTitle: "The team",
    teamText:
      "Four founders, each responsible for one part of the project end to end.",
    teamEmpty:
      "The team will appear here as soon as members are added from the back office.",
    valuesTitle: "Our values",
    values: [
      {
        title: "Closeness",
        text: "One point of contact, clear communication and regular check-ins, from the first meeting to launch.",
      },
      {
        title: "Careful work",
        text: "Fast sites, readable on mobile and easy to evolve — no needless effects or clutter.",
      },
      {
        title: "Transparency",
        text: "Detailed quotes, deadlines announced and met, and no hidden costs along the way.",
      },
    ],
    ctaTitle: "Want to work with us?",
    ctaText: "Tell us about your project and we'll get back to you quickly.",
  },
  services: {
    title: "Our services",
    intro:
      "Four ways to help you, from a showcase site to local visibility. Each service can be requested directly from this page — pricing is built with you, on a quote basis.",
    empty: "Services will be available here soon.",
    whyTitle: "Why this service",
    receiveTitle: "What you get",
    priceNote: "Price on quote, tailored to your project.",
    processTitle: "How it works",
    processText: "The same simple flow, whichever service you choose.",
    steps: [
      {
        title: "Conversation & brief",
        text: "We take the time to understand your business, your audience and what you actually need.",
      },
      {
        title: "Mock-up validated with you",
        text: "You see what your project will look like before we write a single line of code.",
      },
      {
        title: "Build",
        text: "We build (or design) while keeping in touch — you follow the progress, no surprises at the end.",
      },
      {
        title: "Delivery & follow-up",
        text: "Guided launch, and we stay available afterwards for adjustments and future changes.",
      },
    ],
  },
  portfolio: {
    title: "Our work",
    intro:
      "A few projects delivered by Nardev. Each page details the client's need, the solution provided and the technologies used.",
    empty: "Our work will be visible here soon.",
    filterAll: "All",
    filterEmpty: "No project for this filter.",
    previewTitle: "Our work",
    seeAll: "See all",
    back: "← Back to our work",
    needTitle: "The need",
    solutionTitle: "Our solution",
    techTitle: "Technologies",
    similarCta: "A similar project?",
    notFound: "Project not found",
  },
  contact: {
    title: "Get in touch",
    intro:
      "Tell us about your project in a few lines. We'll get back to you quickly with a concrete proposal.",
    devisNote:
      "Quote request — describe your need and we'll reply with an estimate.",
    name: "Name",
    company: "Company (optional)",
    email: "Email",
    phone: "Phone (optional)",
    serviceLabel: "Service of interest",
    serviceDefault: "— Not sure yet —",
    message: "Your message",
    messagePlaceholder:
      "Describe your project, your timeline, your rough budget…",
    error: "Sending failed. Please try again in a moment.",
    sentTitle: "Message received.",
    sentText:
      "Thank you! We'll get back to you by email as soon as possible, usually within 48 business hours.",
    coordsTitle: "Contact details",
    emailLabel: "Email",
    phoneLabel: "Phone",
    privacyNote: "Your information is only used to handle your request.",
    privacyLink: "legal notice",
  },
  faq: {
    title: "Frequently asked questions",
    intro:
      "Answers to the questions we get asked most often. Another question?",
    contactLink: "Write to us",
    items: [
      {
        q: "How much does a website cost?",
        a: "Every project is different, so every price is too. We provide a detailed, free quote after a first conversation, based on the number of pages, the features and the content to prepare. No hidden costs.",
      },
      {
        q: "How long until the site is ready?",
        a: "Around 2 to 4 weeks for a showcase site, a bit more for a dynamic site with a back office. The timeline mostly depends on how quickly you provide the texts and images.",
      },
      {
        q: "Will I be able to edit the site myself afterwards?",
        a: "For a showcase site, changes are made by us (small tweaks included in the first month). For a dynamic site, you get an admin area and training to manage your content independently.",
      },
      {
        q: "Are hosting and the domain name included?",
        a: "Going live is included. Hosting and the domain name are in your name; we handle the setup and advise you on providers.",
      },
      {
        q: "Do you offer maintenance after delivery?",
        a: "Yes, optionally: technical updates, backups, small improvements. We discuss it based on your real needs, without forcing a package on you.",
      },
      {
        q: "How many design revisions are possible?",
        a: "We validate a mock-up together before building, then 1 to 2 rounds of revisions are included. Beyond that, we discuss it openly.",
      },
      {
        q: "Do you work with clients outside Dakar?",
        a: "Yes. Most exchanges happen remotely (call, video, WhatsApp). We can meet in Dakar if useful.",
      },
      {
        q: "How does payment work?",
        a: "Usually a deposit at the start and the balance on delivery. The terms are set out in the quote.",
      },
    ],
  },
  legal: {
    title: "Legal notice",
    updated: "Last updated: September 2026.",
    editorTitle: "Site publisher",
    editorBody:
      "The nardev site is published by Nardev, an organisation in the process of registration, based in Dakar (Senegal).",
    editorDirector: "Publication director: Ndiawar Thiaw",
    editorContact: "Contact:",
    editorRegistration:
      "The NINEA and RCCM numbers will be added once the registration process is complete.",
    hostTitle: "Hosting",
    hostBody:
      "The site is hosted by Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA — vercel.com. The database is hosted by Neon (Neon Inc.), within the European Union.",
    ipTitle: "Intellectual property",
    ipBody:
      "Unless stated otherwise, all site content (text, visuals, logo, code) is the property of Nardev. Any reproduction or reuse without prior written permission is prohibited. The projects shown in the “Work” section are published with the agreement of the clients concerned.",
    dataTitle: "Personal data (contact form)",
    dataIntro:
      "The form on the Contact page collects the information you enter: name, email address, phone (optional), company name (optional), service of interest and the content of your message.",
    dataPurpose:
      "Purpose: to handle your request and get back to you. This data is neither sold nor passed to third parties for commercial purposes.",
    dataRecipients:
      "Recipients: the Nardev team only. A notification may be sent by email via the provider Resend (Resend, Inc.).",
    dataRetention:
      "Retention: messages are kept for as long as needed to follow up on the request, then deleted at the latest 24 months after the last exchange.",
    dataRights:
      "Your rights: under Senegalese law no. 2008-12 of 25 January 2008 on the protection of personal data, you have a right to access, rectify and delete your data. Write to contact@nardev.sn. You may also contact Senegal's Personal Data Protection Commission (CDP).",
    cookiesTitle: "Cookies",
    cookiesBody:
      "The public site sets no analytics or advertising cookies. A session cookie is used only in the team's admin area, to keep you signed in.",
  },
};

const dictionaries: Record<Locale, Dict> = { fr, en };

export function getDictionary(locale: Locale): Dict {
  return dictionaries[locale];
}
