import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { envoyerEmailEquipe } from "@/lib/mailer";

// Domaine « Contact » — Awa Ndao.
// POST /api/contact → enregistre le message en base + notifie l'équipe par email.
// Route publique (pas d'auth).

const contactSchema = z.object({
  nom: z.string().trim().min(1, "Votre nom est requis.").max(120),
  email: z.string().trim().email("Adresse email invalide.").max(180),
  telephone: z.string().trim().max(40).optional(),
  entreprise: z.string().trim().max(120).optional(),
  service: z.string().trim().max(120).optional(),
  contenu: z.string().trim().min(10, "Votre message est un peu court.").max(4000),
  // Champ piège anti-spam : rempli uniquement par les bots.
  siteweb: z.string().max(0).optional(),
});

export async function POST(request: Request) {
  const parsed = contactSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Données invalides." },
      { status: 400 },
    );
  }

  const { siteweb, telephone, entreprise, service, ...rest } = parsed.data;

  // Honeypot rempli → on fait comme si tout allait bien, sans rien enregistrer.
  if (siteweb) return NextResponse.json({ ok: true });

  const message = await prisma.message.create({
    data: {
      ...rest,
      telephone: telephone || null,
      entreprise: entreprise || null,
      service: service || null,
    },
  });

  await envoyerEmailEquipe({
    sujet: `Nouveau message de ${message.nom}${service ? ` — ${service}` : ""}`,
    repondreA: message.email,
    texte: [
      `Nom : ${message.nom}`,
      `Email : ${message.email}`,
      telephone ? `Téléphone : ${telephone}` : null,
      entreprise ? `Entreprise : ${entreprise}` : null,
      service ? `Service souhaité : ${service}` : null,
      "",
      message.contenu,
    ]
      .filter((l) => l !== null)
      .join("\n"),
  });

  return NextResponse.json({ ok: true }, { status: 201 });
}
