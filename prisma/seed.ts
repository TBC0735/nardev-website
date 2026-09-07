import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Compte admin de départ (à changer après la première connexion).
  const email = process.env.SEED_ADMIN_EMAIL ?? "admin@nardev.sn";
  const password = process.env.SEED_ADMIN_PASSWORD ?? "changeme123";

  await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      name: "Admin Nardev",
      passwordHash: await bcrypt.hash(password, 10),
    },
  });

  console.log(`✔ Admin prêt : ${email}`);

  // Fondateurs (domaine « Équipe & configuration » — Ndiawar).
  // Modifiables ensuite depuis /admin/equipe.
  const membres = [
    {
      nom: "Ndiawar Thiaw",
      role: "Développement & infrastructure",
      presentation:
        "Met en place les fondations techniques du projet et gère le déploiement continu du site.",
      ordre: 1,
    },
    {
      nom: "Mame Diarra",
      role: "Services & contenu",
      presentation:
        "Traduit les besoins des clients en offres claires et fait vivre le contenu du site.",
      ordre: 2,
    },
    {
      nom: "Rokhaya",
      role: "Réalisations & design",
      presentation:
        "Documente les projets livrés et veille à la cohérence visuelle de chaque réalisation.",
      ordre: 3,
    },
    {
      nom: "Awa Ndao",
      role: "Relation client & communication",
      presentation:
        "Premier point de contact de l'agence, elle assure le suivi des demandes entrantes.",
      ordre: 4,
    },
  ];

  for (const membre of membres) {
    const existant = await prisma.membre.findFirst({ where: { nom: membre.nom } });
    if (existant) {
      await prisma.membre.update({ where: { id: existant.id }, data: membre });
    } else {
      await prisma.membre.create({ data: membre });
    }
  }

  console.log(`✔ ${membres.length} membres de l'équipe en base`);

  // Services (domaine « Services & Accueil » — Mame Diarra).
  // Modifiables ensuite depuis /admin/services.
  // imageUrl volontairement null : les vrais visuels (projets Nardev ou photos
  // libres de droits) seront ajoutés depuis l'admin. En attendant, un aplat
  // dégradé aux couleurs de la charte s'affiche.
  const services = [
    {
      slug: "sites-vitrines",
      titre: "Sites vitrines",
      resume: "Une présence en ligne claire et accueillante, prête en quelques semaines.",
      description:
        "Un site simple et soigné pour présenter votre activité, vos services et vos coordonnées. Idéal pour être visible en ligne rapidement, avec un design qui inspire confiance dès la première visite.",
      avantages: [
        "Accroître votre visibilité en ligne",
        "Faire connaître votre activité et vos valeurs",
        "Des informations accessibles 24h/24 et 7j/7",
        "Renforcer la confiance de vos clients",
        "Attirer de nouveaux clients",
      ],
      pointsCles: [
        "Maquette validée avec vous avant développement",
        "Site responsive (mobile, tablette, ordinateur)",
        "Jusqu'à 5 pages (accueil, services, contact, etc.)",
        "Mise en ligne incluse",
      ],
      imageUrl: null,
      ordre: 1,
    },
    {
      slug: "sites-dynamiques",
      titre: "Sites dynamiques",
      resume: "Un site que vous faites vivre vous-même, sans dépendre de personne.",
      description:
        "Un site avec un back-office qui vous permet de gérer votre contenu sans dépendre d'un développeur. Parfait pour un catalogue, un blog, ou toute activité qui évolue régulièrement.",
      avantages: [
        "Autonomie totale sur vos contenus, sans coder",
        "Un site qui évolue avec votre activité",
        "Idéal pour un catalogue, un blog ou des projets à jour",
        "Aucune dépendance à un développeur pour publier",
      ],
      pointsCles: [
        "Back-office simple pour gérer vos contenus",
        "Base de données pour vos produits, articles ou projets",
        "Formation à l'utilisation de l'admin",
        "Hébergement et mise en ligne accompagnés",
      ],
      imageUrl: null,
      ordre: 2,
    },
    {
      slug: "flyers-affiches",
      titre: "Flyers & affiches",
      resume: "Des supports imprimés et digitaux qui vous ressemblent vraiment.",
      description:
        "Des supports print alignés sur votre image de marque, prêts à imprimer ou à diffuser sur les réseaux sociaux. Nous adaptons le message et le visuel à votre cible.",
      avantages: [
        "Une image de marque cohérente sur tous vos supports",
        "Des visuels prêts pour l'impression comme pour le web",
        "Un message adapté à votre cible",
        "Idéal pour vos événements et promotions",
      ],
      pointsCles: [
        "Design sur mesure aux couleurs de votre marque",
        "Fichiers prêts pour l'impression (haute résolution)",
        "Version adaptée aux réseaux sociaux",
        "1 à 2 allers-retours de retouches inclus",
      ],
      imageUrl: null,
      ordre: 3,
    },
    {
      slug: "visibilite-google",
      titre: "Visibilité Google",
      resume: "Être trouvé facilement par les clients qui cherchent près de chez eux.",
      description:
        "Nous optimisons votre fiche entreprise Google pour que les clients vous trouvent facilement lorsqu'ils cherchent vos services près de chez eux. Un levier simple et efficace pour gagner en visibilité locale.",
      avantages: [
        "Apparaître dans les recherches locales et sur Google Maps",
        "Rassurer grâce aux avis clients mis en valeur",
        "Un levier simple, sans budget publicitaire",
        "Des informations à jour en permanence (horaires, photos)",
      ],
      pointsCles: [
        "Création ou optimisation de votre fiche Google Entreprise",
        "Ajout de photos, horaires et informations clés",
        "Conseils pour obtenir des avis clients",
        "Suivi de la visibilité sur un mois",
      ],
      imageUrl: null,
      ordre: 4,
    },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: service,
      create: service,
    });
  }

  console.log(`✔ ${services.length} services en base`);

  // Réalisations (domaine « Portfolio » — Rokhaya).
  // Exemples de départ, à remplacer par de vrais projets Nardev depuis
  // /admin/portfolio. imageUrl volontairement null (aplat dégradé).
  const projets = [
    {
      slug: "boutique-mariama-couture",
      nom: "Mariama Couture",
      serviceSlug: "sites-vitrines",
      resume: "Site vitrine pour un atelier de couture à Dakar.",
      besoin:
        "Mariama, couturière, n'avait aucune présence en ligne et perdait des clientes qui ne trouvaient ni ses tarifs ni son adresse.",
      solution:
        "Un site vitrine de 4 pages : présentation de l'atelier, galerie de modèles, tarifs indicatifs et formulaire de prise de contact. Mise en ligne et prise en main incluses.",
      technologies: ["Next.js", "Tailwind CSS", "Vercel"],
      ordre: 1,
    },
    {
      slug: "catalogue-ndiaye-electronique",
      nom: "Ndiaye Électronique",
      serviceSlug: "sites-dynamiques",
      resume: "Catalogue en ligne mis à jour par le commerçant lui-même.",
      besoin:
        "Un magasin d'électroménager voulait présenter son stock en ligne et le tenir à jour sans repasser par un prestataire à chaque changement de prix.",
      solution:
        "Un site dynamique avec back-office : ajout, modification et retrait de produits en autonomie, catégories, photos et prix. Formation de l'équipe à l'administration.",
      technologies: ["Next.js", "Prisma", "PostgreSQL", "NextAuth"],
      ordre: 2,
    },
    {
      slug: "flyers-festival-gospel",
      nom: "Festival Gospel de Dakar",
      serviceSlug: "flyers-affiches",
      resume: "Affiche et flyers pour un événement culturel.",
      besoin:
        "L'organisation avait besoin de supports de communication cohérents pour l'affichage urbain et les réseaux sociaux, dans un délai court.",
      solution:
        "Une affiche A2, un flyer recto-verso et des déclinaisons carrées pour Instagram et Facebook, aux mêmes couleurs et typographies. Fichiers prêts pour l'impression fournis.",
      technologies: ["Illustration", "Mise en page", "Préparation impression"],
      ordre: 3,
    },
  ];

  for (const { serviceSlug, ...projet } of projets) {
    const service = await prisma.service.findUnique({
      where: { slug: serviceSlug },
    });
    await prisma.projet.upsert({
      where: { slug: projet.slug },
      update: { ...projet, serviceId: service?.id ?? null },
      create: { ...projet, serviceId: service?.id ?? null },
    });
  }

  console.log(`✔ ${projets.length} projets en base`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
