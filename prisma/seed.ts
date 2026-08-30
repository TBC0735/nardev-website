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
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
