import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

// Domaine « Services & Accueil » — Mame Diarra.
// GET  /api/services  → liste publique (pages / et /services)
// POST /api/services  → création (admin only)

const serviceSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1, "Le slug est requis.")
    .max(80)
    .regex(/^[a-z0-9-]+$/, "Le slug ne peut contenir que des minuscules, chiffres et tirets."),
  titre: z.string().trim().min(1, "Le titre est requis.").max(120),
  resume: z.string().trim().min(1, "Le résumé est requis.").max(200),
  description: z.string().trim().min(1, "La description est requise.").max(1000),
  avantages: z.array(z.string().trim().min(1)).default([]),
  pointsCles: z.array(z.string().trim().min(1)).default([]),
  imageUrl: z.string().trim().url("URL de photo invalide.").or(z.literal("")).optional(),
  ordre: z.coerce.number().int().min(0).optional(),
});

export async function GET() {
  const services = await prisma.service.findMany({ orderBy: { ordre: "asc" } });
  return NextResponse.json(services);
}

export async function POST(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const parsed = serviceSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Données invalides." },
      { status: 400 },
    );
  }

  const { imageUrl, ...rest } = parsed.data;
  const service = await prisma.service.create({
    data: { ...rest, imageUrl: imageUrl || null },
  });
  return NextResponse.json(service, { status: 201 });
}
