import type { Locale } from "./config";

// Traductions de l'interface. Les contenus gérés en base (détails des services,
// fiches projets, membres de l'équipe) restent en français pour l'instant.

const fr = {
  nav: {
    services: "Services",
    portfolio: "Réalisations",
    about: "À propos",
    contact: "Contact",
    faq: "FAQ",
    legal: "Mentions légales",
    menu: "Menu",
    close: "Fermer",
    backToTop: "Revenir en haut de la page",
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
    startProject: "Démarrer un projet",
  },
  langToggle: { label: "Langue", fr: "Français", en: "English" },
  footer: {
    tagline:
      "Agence web à Dakar. On conçoit des sites, des supports et de la visibilité qui font grandir votre activité.",
    navTitle: "Le site",
    contactTitle: "Contact",
    rights: "Tous droits réservés.",
    location: "Basés à Dakar, Sénégal",
    soon: "(bientôt)",
    builtWith: "Conçu et développé par Nardev",
    ctaTitle: "Un projet à lancer ?",
    ctaText: "On en discute et on vous fait un devis clair.",
  },
  hero: {
    eyebrow: "Agence web · Dakar",
    titleLead: "Votre activité mérite mieux qu'une",
    titleAccent: "simple page Facebook.",
    text: "Nardev conçoit des sites vitrines, des sites dynamiques, des supports print et votre visibilité sur Google. Une équipe, un interlocuteur, un résultat soigné — du premier échange à la mise en ligne.",
    trust1: "Devis gratuit",
    trust2: "Réponse sous 48 h",
    trust3: "Un seul interlocuteur",
  },
  home: {
    stats: [
      { value: "3 à 5 j", label: "pour un site vitrine" },
      { value: "24-48 h", label: "pour un flyer ou une affiche" },
      { value: "1", label: "interlocuteur du début à la fin" },
      { value: "0", label: "coût caché, jamais" },
    ],
    servicesEyebrow: "Ce qu'on fait",
    servicesTitle: "Quatre façons de vous rendre visible",
    servicesLead:
      "Du site vitrine à la fiche Google, chaque prestation se commande directement en ligne et se construit avec vous, sur devis.",
    servicesEmpty: "Les services seront bientôt disponibles ici.",
    processEyebrow: "Notre méthode",
    processTitle: "Comment ça se passe",
    processLead:
      "Le même déroulé simple, quel que soit le projet : vous savez toujours où on en est.",
    whyEyebrow: "Pourquoi Nardev",
    whyTitle: "Une agence à taille humaine, pas une usine",
    whyLead:
      "On a réuni développement, design et communication dans une seule équipe pour vous éviter de jongler entre plusieurs prestataires.",
    why: [
      {
        title: "Un interlocuteur unique",
        text: "La même personne vous suit du brief à la livraison. Pas de service commercial qui passe le relais.",
      },
      {
        title: "Plusieurs expertises réunies",
        text: "Dev, design et com' dans la même équipe : votre projet est cohérent de bout en bout.",
      },
      {
        title: "Une maquette avant tout",
        text: "Vous validez le rendu avant qu'on développe la moindre ligne. Aucune mauvaise surprise à la fin.",
      },
      {
        title: "Des délais tenus",
        text: "On annonce une date au devis et on s'y tient. Vous suivez l'avancement en continu.",
      },
    ],
    ctaTitle: "Un projet en tête ?",
    ctaText:
      "Parlez-nous-en en quelques lignes. On revient vers vous rapidement, avec une proposition concrète et un devis clair.",
  },
  aboutTeaser: {
    eyebrow: "Qui sommes-nous",
    title: "Quatre associés, une seule équipe",
    text: "Nardev est né de l'envie de rendre le web professionnel accessible aux petites structures du Sénégal. Plutôt que de travailler chacun dans notre coin, on a mis nos compétences en commun — et on met en avant nos réalisations pour vous prouver ce qu'on sait faire.",
  },
  about: {
    eyebrow: "À propos",
    title: "L'agence web qu'on aurait aimé trouver",
    intro:
      "Nardev rend le web professionnel accessible aux commerces, artisans, associations et jeunes entreprises du Sénégal.",

    storyEyebrow: "Notre histoire",
    storyTitle: "Pourquoi on a créé Nardev",
    storyText:
      "On s'est connus en formation à l'ISI Dakar. Chacun a mené ses projets de son côté — des sites, des plateformes, des supports — et on a fini par faire le même constat : autour de nous, les petites structures n'ont pas les moyens d'une grosse agence, et se retrouvent souvent avec un site bâclé, jamais fini, ou impossible à modifier.\n\nNardev, c'est notre réponse. On a mis nos compétences en commun — développement, design, organisation, communication — pour proposer un accompagnement sérieux, à un prix clair, avec un seul interlocuteur du début à la fin.",
    storyQuote:
      "On voulait une agence qui explique, qui tient ses délais et qui ne disparaît pas après la livraison. Comme on n'en trouvait pas, on l'a montée.",

    missionEyebrow: "Notre mission",
    missionTitle: "Rendre le digital professionnel accessible",
    missionText:
      "Permettre aux entreprises, commerces, artisans, associations et jeunes structures d'avoir une présence en ligne solide, moderne et adaptée à leurs besoins réels — sans budget d'agence internationale et sans jargon.",

    expertiseEyebrow: "Nos expertises",
    expertiseTitle: "Trois métiers, une seule équipe",
    expertiseLead:
      "Vous n'avez pas à coordonner un développeur, un graphiste et un chargé de com'. On s'en occupe ensemble.",
    expertise: [
      {
        title: "Développement",
        text: "Des sites et plateformes web modernes, rapides, responsive et faciles à faire évoluer.",
      },
      {
        title: "Design",
        text: "Des interfaces claires et cohérentes avec votre identité — pensées pour vos visiteurs, pas pour faire joli.",
      },
      {
        title: "Communication",
        text: "De l'aide sur les contenus, la présentation du projet et votre présence en ligne.",
      },
    ],

    processEyebrow: "Notre méthode",
    processTitle: "Comment nous travaillons",
    processLead:
      "Un déroulé simple, transparent, où vous savez toujours où on en est.",
    process: [
      {
        title: "Écouter",
        text: "Comprendre votre activité, vos besoins, vos contraintes et vos objectifs avant de proposer quoi que ce soit.",
      },
      {
        title: "Concevoir",
        text: "Transformer les idées en une solution claire et structurée, validée avec vous sous forme de maquette.",
      },
      {
        title: "Développer",
        text: "Construire une solution moderne, performante et lisible sur tous les écrans.",
      },
      {
        title: "Livrer & accompagner",
        text: "Mettre le projet en ligne et rester disponible pour les évolutions, la maintenance et les besoins futurs.",
      },
    ],

    teamEyebrow: "L'équipe",
    teamTitle: "Les fondateurs",
    teamText:
      "Quatre profils complémentaires réunis autour d'une même idée : des solutions digitales utiles, accessibles et bien conçues.",
    teamEmpty:
      "La présentation de l'équipe sera visible dès que les membres auront été ajoutés depuis le back-office.",

    valuesEyebrow: "Nos valeurs",
    valuesTitle: "Ce qui ne change jamais chez nous",
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
      {
        title: "Engagement",
        text: "Chaque projet est suivi avec sérieux, de la première discussion jusqu'à sa mise en ligne — et après.",
      },
    ],

    whyEyebrow: "Pourquoi Nardev",
    whyTitle: "Ce qui nous rend différents",
    why: [
      {
        title: "Une équipe locale",
        text: "Basés à Dakar, on connaît le contexte, les usages et les contraintes du marché sénégalais.",
      },
      {
        title: "Un accompagnement humain",
        text: "On parle simplement, on explique nos choix, on reste joignable — avant, pendant et après le projet.",
      },
      {
        title: "Des solutions adaptées",
        text: "On part de votre besoin réel, pas d'un modèle recopié. Vous ne payez pas pour des fonctions inutiles.",
      },
      {
        title: "Une seule équipe",
        text: "Développement, design et communication au même endroit : votre projet reste cohérent de bout en bout.",
      },
    ],

    statsEyebrow: "En bref",
    statsTitle: "Nardev en quelques chiffres",
    stats: [
      { value: "4", label: "associés" },
      { value: "3", label: "expertises complémentaires" },
      { value: "1", label: "équipe pour tout le projet" },
    ],

    ctaTitle: "Envie de travailler avec nous ?",
    ctaText: "Présentez-nous votre projet, on revient vers vous rapidement.",
  },
  services: {
    eyebrow: "Nos services",
    title: "Des prestations claires, un tarif sur devis",
    intro:
      "Quatre façons de vous accompagner, du site vitrine à la visibilité locale. Chaque service peut être demandé directement depuis cette page — le tarif se construit avec vous.",
    empty: "Les services seront bientôt disponibles ici.",
    whyTitle: "Pourquoi ce service",
    receiveTitle: "Ce que vous recevez",
    priceNote: "Tarif sur devis, adapté à votre projet.",
    jumpTo: "Aller à",
  },
  process: {
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
    eyebrow: "Réalisations",
    title: "Nos réalisations",
    intro:
      "Découvrez les projets que nous avons conçus et réalisés pour donner vie aux idées.",
    empty: "Les réalisations seront bientôt visibles ici.",
    filterAll: "Tous",
    filterEmpty: "Aucun projet pour ce filtre.",
    previewEyebrow: "Réalisations",
    previewTitle: "Un aperçu de notre travail",
    seeAll: "Voir tout",
    back: "Retour aux réalisations",
    needTitle: "Le besoin",
    solutionTitle: "Notre solution",
    techTitle: "Technologies",
    similarCta: "Un projet similaire ?",
    similarText: "Parlez-nous du vôtre, on vous répond sous 48 h.",
    notFound: "Projet introuvable",
    viewProject: "Voir le projet",
    roleTitle: "Notre rôle",
    liveLink: "Voir le projet en ligne",
    approachEyebrow: "Notre approche",
    approachTitle: "Comment on aborde un projet",
    approachLead:
      "Chaque réalisation suit la même logique : comprendre, concevoir, mettre en ligne.",
    approach: [
      {
        title: "Comprendre le besoin",
        text: "On part du problème réel du client, pas d'un modèle tout fait : à quoi doit servir le projet, pour qui, dans quel contexte.",
      },
      {
        title: "Concevoir et développer",
        text: "On valide une maquette, puis on construit une solution moderne, rapide et lisible sur mobile.",
      },
      {
        title: "Mettre en ligne et suivre",
        text: "On accompagne la mise en ligne et on reste joignable ensuite pour les ajustements.",
      },
    ],
  },
  contact: {
    title: "Parlons de votre projet",
    intro:
      "Présentez-nous votre besoin en quelques lignes. On revient vers vous rapidement, avec une proposition concrète et un devis clair.",
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
    formTitle: "Parlez-nous de votre projet",
    responseBadge: "Réponse sous 48 h ouvrées",
    reasonsTitle: "Pourquoi nous écrire",
    reason1: "Un devis gratuit et détaillé, sans engagement",
    reason2: "Un interlocuteur unique du début à la livraison",
    reason3: "Une maquette validée avec vous avant tout développement",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Questions fréquentes",
    intro:
      "Les réponses aux questions qu'on nous pose le plus souvent. Une autre question ?",
    contactLink: "Écrivez-nous",
    stillTitle: "Vous ne trouvez pas votre réponse ?",
    stillText: "On répond à toutes les questions avant même le devis.",
    items: [
      {
        q: "Combien de temps faut-il pour créer un site vitrine ?",
        a: "Une fois vos contenus reçus (textes, photos, logo), on livre un site vitrine en 3 à 5 jours ouvrés. Une semaine grand maximum pour les demandes plus fournies. Et on valide une maquette avec vous avant de lancer : le délai annoncé est celui qui est tenu.",
      },
      {
        q: "Quel est le délai pour un site dynamique ou une application web ?",
        a: "À partir de 2 semaines pour un site dynamique avec back-office. Pour un projet plus complexe ou entièrement sur mesure, comptez 1 à 2 mois selon l'ampleur. On vous donne un planning clair dès le devis et vous suivez l'avancement en continu.",
      },
      {
        q: "En combien de temps livrez-vous un flyer ou une affiche ?",
        a: "24 à 48 h ouvrées après validation du brief et réception de vos éléments. Vous recevez une première proposition rapidement, puis les fichiers prêts à imprimer une fois les retouches faites.",
      },
      {
        q: "Combien coûte un site ?",
        a: "Chaque projet est différent, donc chaque tarif l'est aussi. On établit un devis détaillé et gratuit après un premier échange, en fonction du nombre de pages, des fonctionnalités et du contenu à préparer. Pas de coût caché.",
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
    portfolio: "Work",
    about: "About",
    contact: "Contact",
    faq: "FAQ",
    legal: "Legal notice",
    menu: "Menu",
    close: "Close",
    backToTop: "Back to top",
  },
  cta: {
    quote: "Get a quote",
    contactUs: "Contact us",
    learnMore: "Learn more",
    seeWork: "See our work",
    requestService: "Request this service",
    seeExamples: "See examples",
    send: "Send",
    sending: "Sending…",
    startProject: "Start a project",
  },
  langToggle: { label: "Language", fr: "Français", en: "English" },
  footer: {
    tagline:
      "Web agency in Dakar. We build sites, materials and visibility that grow your business.",
    navTitle: "The site",
    contactTitle: "Contact",
    rights: "All rights reserved.",
    location: "Based in Dakar, Senegal",
    soon: "(soon)",
    builtWith: "Designed and built by Nardev",
    ctaTitle: "Got a project to launch?",
    ctaText: "Let's talk it through and get you a clear quote.",
  },
  hero: {
    eyebrow: "Web agency · Dakar",
    titleLead: "Your business deserves more than a",
    titleAccent: "plain Facebook page.",
    text: "Nardev builds showcase sites, dynamic sites, print materials and your visibility on Google. One team, one point of contact, a polished result — from the first conversation to going live.",
    trust1: "Free quote",
    trust2: "Reply within 48 h",
    trust3: "A single point of contact",
  },
  home: {
    stats: [
      { value: "3 to 5 d", label: "for a showcase site" },
      { value: "24-48 h", label: "for a flyer or poster" },
      { value: "1", label: "point of contact, start to finish" },
      { value: "0", label: "hidden costs, ever" },
    ],
    servicesEyebrow: "What we do",
    servicesTitle: "Four ways to get you seen",
    servicesLead:
      "From a showcase site to a Google listing, every service is ordered online and built with you, on a quote basis.",
    servicesEmpty: "Services will be available here soon.",
    processEyebrow: "Our method",
    processTitle: "How it works",
    processLead:
      "The same simple flow for every project — you always know where things stand.",
    whyEyebrow: "Why Nardev",
    whyTitle: "A human-sized agency, not a factory",
    whyLead:
      "We brought development, design and communication into one team so you don't have to juggle several providers.",
    why: [
      {
        title: "A single point of contact",
        text: "The same person follows you from brief to delivery. No sales rep handing you off.",
      },
      {
        title: "Several skills, one team",
        text: "Dev, design and comms under one roof: your project stays coherent end to end.",
      },
      {
        title: "A mock-up first",
        text: "You approve the look before we write a single line of code. No nasty surprises at the end.",
      },
      {
        title: "Deadlines we keep",
        text: "We announce a date in the quote and stick to it. You follow progress throughout.",
      },
    ],
    ctaTitle: "Got a project in mind?",
    ctaText:
      "Tell us about it in a few lines. We'll get back to you quickly with a concrete proposal and a clear quote.",
  },
  aboutTeaser: {
    eyebrow: "Who we are",
    title: "Four partners, one team",
    text: "Nardev started from a wish to make professional web accessible to small organisations in Senegal. Rather than each working alone, we pooled our skills — and we showcase our work to prove what we can do.",
  },
  about: {
    eyebrow: "About",
    title: "The web agency we wish we'd found",
    intro:
      "Nardev makes professional web accessible to shops, craftspeople, associations and young companies in Senegal.",

    storyEyebrow: "Our story",
    storyTitle: "Why we started Nardev",
    storyText:
      "We met in training at ISI Dakar. Each of us ran our own projects — sites, platforms, materials — and we ended up with the same observation: around us, small organisations can't afford a big agency, and often end up with a rushed, unfinished or unmaintainable site.\n\nNardev is our answer. We pooled our skills — development, design, organisation, communication — to offer serious support, at a clear price, with a single point of contact from start to finish.",
    storyQuote:
      "We wanted an agency that explains things, keeps its deadlines and doesn't vanish after delivery. We couldn't find one, so we built it.",

    missionEyebrow: "Our mission",
    missionTitle: "Making professional digital accessible",
    missionText:
      "Helping companies, shops, craftspeople, associations and young organisations get a solid, modern online presence that fits their real needs — without an international-agency budget and without jargon.",

    expertiseEyebrow: "Our expertise",
    expertiseTitle: "Three crafts, one team",
    expertiseLead:
      "You don't have to coordinate a developer, a designer and a comms person. We handle it together.",
    expertise: [
      {
        title: "Development",
        text: "Modern web sites and platforms that are fast, responsive and easy to evolve.",
      },
      {
        title: "Design",
        text: "Clear interfaces consistent with your identity — built for your visitors, not just to look nice.",
      },
      {
        title: "Communication",
        text: "Help with content, presenting the project and your online presence.",
      },
    ],

    processEyebrow: "Our method",
    processTitle: "How we work",
    processLead:
      "A simple, transparent flow where you always know where things stand.",
    process: [
      {
        title: "Listen",
        text: "Understand your business, your needs, your constraints and your goals before proposing anything.",
      },
      {
        title: "Design",
        text: "Turn ideas into a clear, structured solution, approved with you as a mock-up.",
      },
      {
        title: "Build",
        text: "Build a modern, performant solution that reads well on every screen.",
      },
      {
        title: "Deliver & support",
        text: "Take the project live and stay available for improvements, maintenance and future needs.",
      },
    ],

    teamEyebrow: "The team",
    teamTitle: "The founders",
    teamText:
      "Four complementary profiles around one idea: digital solutions that are useful, accessible and well made.",
    teamEmpty:
      "The team will appear here as soon as members are added from the back office.",

    valuesEyebrow: "Our values",
    valuesTitle: "What never changes here",
    values: [
      {
        title: "Closeness",
        text: "One point of contact, clear exchanges and regular check-ins, from the first meeting to going live.",
      },
      {
        title: "Careful work",
        text: "Sites that are fast, readable on mobile and easy to evolve — no needless effects or bloat.",
      },
      {
        title: "Transparency",
        text: "Detailed quotes, deadlines announced and kept, and no hidden costs along the way.",
      },
      {
        title: "Commitment",
        text: "Every project is followed seriously, from the first talk to going live — and after.",
      },
    ],

    whyEyebrow: "Why Nardev",
    whyTitle: "What sets us apart",
    why: [
      {
        title: "A local team",
        text: "Based in Dakar, we know the context, habits and constraints of the Senegalese market.",
      },
      {
        title: "Human support",
        text: "We speak plainly, explain our choices and stay reachable — before, during and after the project.",
      },
      {
        title: "Tailored solutions",
        text: "We start from your real need, not a copied template. You don't pay for features you won't use.",
      },
      {
        title: "One single team",
        text: "Development, design and communication in one place: your project stays coherent end to end.",
      },
    ],

    statsEyebrow: "In short",
    statsTitle: "Nardev in a few figures",
    stats: [
      { value: "4", label: "partners" },
      { value: "3", label: "complementary skills" },
      { value: "1", label: "team for the whole project" },
    ],

    ctaTitle: "Want to work with us?",
    ctaText: "Tell us about your project, we'll get back to you quickly.",
  },
  services: {
    eyebrow: "Our services",
    title: "Clear services, quote-based pricing",
    intro:
      "Four ways to support you, from a showcase site to local visibility. Every service can be requested right from this page — pricing is built with you.",
    empty: "Services will be available here soon.",
    whyTitle: "Why this service",
    receiveTitle: "What you get",
    priceNote: "Quote-based pricing, tailored to your project.",
    jumpTo: "Jump to",
  },
  process: {
    steps: [
      {
        title: "Talk & brief",
        text: "We take the time to understand your business, your audience and what you really need.",
      },
      {
        title: "Mock-up approved with you",
        text: "You see what your project will look like before we write a single line of code.",
      },
      {
        title: "Build",
        text: "We build (or design) while staying in touch — you follow progress, no surprise at the end.",
      },
      {
        title: "Delivery & beyond",
        text: "Guided go-live, and we stay available afterwards for adjustments and improvements.",
      },
    ],
  },
  portfolio: {
    eyebrow: "Work",
    title: "Our work",
    intro:
      "Take a look at the projects we've designed and built to bring ideas to life.",
    empty: "Our work will be visible here soon.",
    filterAll: "All",
    filterEmpty: "No project for this filter.",
    previewEyebrow: "Work",
    previewTitle: "A glimpse of our work",
    seeAll: "See all",
    back: "Back to work",
    needTitle: "The need",
    solutionTitle: "Our solution",
    techTitle: "Technologies",
    similarCta: "A similar project?",
    similarText: "Tell us about yours, we reply within 48 h.",
    notFound: "Project not found",
    viewProject: "View project",
    roleTitle: "Our role",
    liveLink: "View the live project",
    approachEyebrow: "Our approach",
    approachTitle: "How we tackle a project",
    approachLead:
      "Every project follows the same logic: understand, design, ship.",
    approach: [
      {
        title: "Understand the need",
        text: "We start from the client's real problem, not a template: what the project is for, who it serves, in what context.",
      },
      {
        title: "Design and build",
        text: "We validate a mock-up, then build a modern, fast solution that reads well on mobile.",
      },
      {
        title: "Ship and support",
        text: "We support the go-live and stay reachable afterwards for adjustments.",
      },
    ],
  },
  contact: {
    title: "Let's talk about your project",
    intro:
      "Tell us about your need in a few lines. We'll get back to you quickly with a concrete proposal and a clear quote.",
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
    formTitle: "Tell us about your project",
    responseBadge: "Reply within 48 business hours",
    reasonsTitle: "Why write to us",
    reason1: "A free, detailed quote with no commitment",
    reason2: "One point of contact from start to delivery",
    reason3: "A mock-up approved with you before any development",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Frequently asked questions",
    intro:
      "Answers to the questions we get asked most. Another question?",
    contactLink: "Write to us",
    stillTitle: "Can't find your answer?",
    stillText: "We answer every question, even before the quote.",
    items: [
      {
        q: "How long does it take to build a showcase site?",
        a: "Once we have your content (text, photos, logo), we deliver a showcase site in 3 to 5 business days. One week at most for larger requests. And we validate a mock-up with you before starting: the deadline we announce is the one we meet.",
      },
      {
        q: "What is the timeline for a dynamic site or web app?",
        a: "From 2 weeks for a dynamic site with a back office. For a more complex or fully custom project, allow 1 to 2 months depending on scope. You get a clear schedule with the quote and follow progress throughout.",
      },
      {
        q: "How fast do you deliver a flyer or poster?",
        a: "24 to 48 business hours after the brief is approved and your assets are received. You get a first proposal quickly, then print-ready files once revisions are done.",
      },
      {
        q: "How much does a website cost?",
        a: "Every project is different, so every price is too. We provide a detailed, free quote after a first conversation, based on the number of pages, the features and the content to prepare. No hidden costs.",
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
      "The NINEA and RCCM numbers will be added once registration is complete.",
    hostTitle: "Hosting",
    hostBody:
      "The site is hosted by Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA — vercel.com. The database is hosted by Neon (Neon Inc.), within the European Union.",
    ipTitle: "Intellectual property",
    ipBody:
      "Unless stated otherwise, all site content (text, visuals, logo, code) is the property of Nardev. Any reproduction or reuse without prior written permission is prohibited. Projects shown in the “Work” section are published with the agreement of the clients concerned.",
    dataTitle: "Personal data (contact form)",
    dataIntro:
      "The Contact page form collects the information you enter: name, email address, phone (optional), company name (optional), service of interest and the content of your message.",
    dataPurpose:
      "Purpose: to handle your request and get back to you. This data is neither sold nor shared with third parties for commercial purposes.",
    dataRecipients:
      "Recipients: the Nardev team only. A notification is sent by email via the provider Resend (Resend, Inc.) where applicable.",
    dataRetention:
      "Retention: messages are kept as long as needed to handle the request, then deleted at the latest 24 months after the last exchange.",
    dataRights:
      "Your rights: under Senegalese law no. 2008-12 of 25 January 2008 on personal data protection, you have a right of access, rectification and deletion of your data. Write to contact@nardev.sn. You may also contact Senegal's Personal Data Protection Commission (CDP).",
    cookiesTitle: "Cookies",
    cookiesBody:
      "The public site sets no analytics or advertising cookies. A session cookie is used only in the team's admin area, to keep you signed in.",
  },
};

const dictionaries: Record<Locale, Dict> = { fr, en };

export function getDictionary(locale: Locale): Dict {
  return dictionaries[locale];
}
