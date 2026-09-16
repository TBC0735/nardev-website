import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

// Change le mot de passe d'un compte admin.
// Usage :
//   npx tsx prisma/set-admin-password.ts <email> <nouveau-mot-de-passe>
//   (ou via les variables ADMIN_EMAIL / ADMIN_PASSWORD)
//
// À lancer en local — la connexion pointe vers la base configurée dans .env.

const prisma = new PrismaClient();

async function main() {
  const email = process.argv[2] ?? process.env.ADMIN_EMAIL ?? "admin@nardev.sn";
  const password = process.argv[3] ?? process.env.ADMIN_PASSWORD;

  if (!password || password.length < 8) {
    throw new Error(
      "Mot de passe manquant ou trop court (min. 8 caractères).\n" +
        "Usage : npx tsx prisma/set-admin-password.ts <email> <mot-de-passe>",
    );
  }

  const user = await prisma.user
    .update({
      where: { email },
      data: { passwordHash: await bcrypt.hash(password, 10) },
    })
    .catch(() => null);

  if (!user) {
    throw new Error(`Aucun compte admin avec l'email « ${email} ».`);
  }

  console.log(`✔ Mot de passe mis à jour pour ${email}`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
