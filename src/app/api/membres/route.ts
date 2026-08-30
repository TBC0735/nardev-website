import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

// Domaine « Équipe & configuration » — Ndiawar.
// GET  /api/membres  → liste publique (page /a-propos)
// POST /api/membres  → création (admin only)

const membreSchema = z.object({
  nom: z.string().trim().min(1, "Le nom est requis.").max(120),
  role: z.string().trim().min(1, "Le rôle est requis.").max(120),
  presentation: z.string().trim().min(1, "La présentation est requise.").max(500),
  photoUrl: z.string().trim().url("URL de photo invalide.").or(z.literal("")).optional(),
  ordre: z.coerce.number().int().min(0).optional(),
});

export async function GET() {
  const membres = await prisma.membre.findMany({ orderBy: { ordre: "asc" } });
  return NextResponse.json(membres);
}

export async function POST(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const parsed = membreSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Données invalides." },
      { status: 400 },
    );
  }

  const { photoUrl, ...rest } = parsed.data;
  const membre = await prisma.membre.create({
    data: { ...rest, photoUrl: photoUrl || null },
  });
  return NextResponse.json(membre, { status: 201 });
}
