import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

// Domaine « Portfolio » — Rokhaya.
// GET  /api/projets  → liste publique (projets publiés uniquement)
// POST /api/projets  → création (admin only)

const projetSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1, "Le slug est requis.")
    .max(80)
    .regex(/^[a-z0-9-]+$/, "Le slug ne peut contenir que des minuscules, chiffres et tirets."),
  nom: z.string().trim().min(1, "Le nom est requis.").max(120),
  resume: z.string().trim().max(200).default(""),
  besoin: z.string().trim().max(2000).default(""),
  solution: z.string().trim().max(2000).default(""),
  role: z.string().trim().max(300).default(""),
  lienUrl: z.string().trim().url("Lien invalide.").or(z.literal("")).optional(),
  description: z.string().trim().max(2000).default(""),
  technologies: z.array(z.string().trim().min(1)).default([]),
  images: z.array(z.string().trim().url("URL d'image invalide.")).default([]),
  imageUrl: z.string().trim().url("URL de couverture invalide.").or(z.literal("")).optional(),
  serviceId: z.string().trim().min(1).nullish(),
  publie: z.boolean().default(true),
  ordre: z.coerce.number().int().min(0).optional(),
});

export async function GET() {
  const projets = await prisma.projet.findMany({
    where: { publie: true },
    orderBy: [{ ordre: "asc" }, { createdAt: "desc" }],
    include: { service: { select: { slug: true, titre: true } } },
  });
  return NextResponse.json(projets);
}

export async function POST(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const parsed = projetSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Données invalides." },
      { status: 400 },
    );
  }

  const { imageUrl, serviceId, lienUrl, ...rest } = parsed.data;
  const projet = await prisma.projet.create({
    data: {
      ...rest,
      imageUrl: imageUrl || null,
      lienUrl: lienUrl || null,
      serviceId: serviceId || null,
    },
  });
  return NextResponse.json(projet, { status: 201 });
}
