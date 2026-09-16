import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

// GET    /api/projets/:id  → détail public, accepte un id OU un slug
// PUT    /api/projets/:id  → modification (admin only)
// DELETE /api/projets/:id  → suppression (admin only)

const updateSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1)
    .max(80)
    .regex(/^[a-z0-9-]+$/, "Le slug ne peut contenir que des minuscules, chiffres et tirets.")
    .optional(),
  nom: z.string().trim().min(1).max(120).optional(),
  resume: z.string().trim().max(200).optional(),
  besoin: z.string().trim().max(2000).optional(),
  solution: z.string().trim().max(2000).optional(),
  role: z.string().trim().max(300).optional(),
  lienUrl: z.string().trim().url("Lien invalide.").or(z.literal("")).optional(),
  description: z.string().trim().max(2000).optional(),
  technologies: z.array(z.string().trim().min(1)).optional(),
  images: z.array(z.string().trim().url("URL d'image invalide.")).optional(),
  imageUrl: z.string().trim().url().or(z.literal("")).optional(),
  serviceId: z.string().trim().min(1).nullish(),
  publie: z.boolean().optional(),
  ordre: z.coerce.number().int().min(0).optional(),
});

type Params = { params: { id: string } };

export async function GET(_request: Request, { params }: Params) {
  const projet = await prisma.projet.findFirst({
    where: { OR: [{ id: params.id }, { slug: params.id }] },
    include: { service: { select: { slug: true, titre: true } } },
  });

  if (!projet) {
    return NextResponse.json({ error: "Projet introuvable." }, { status: 404 });
  }

  return NextResponse.json(projet);
}

export async function PUT(request: Request, { params }: Params) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const parsed = updateSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Données invalides." },
      { status: 400 },
    );
  }

  const { imageUrl, serviceId, lienUrl, ...rest } = parsed.data;
  const data: Prisma.ProjetUpdateInput = { ...rest };
  if (imageUrl !== undefined) data.imageUrl = imageUrl || null;
  if (lienUrl !== undefined) data.lienUrl = lienUrl || null;
  if (serviceId !== undefined) {
    data.service = serviceId
      ? { connect: { id: serviceId } }
      : { disconnect: true };
  }

  try {
    const projet = await prisma.projet.update({ where: { id: params.id }, data });
    return NextResponse.json(projet);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      return NextResponse.json({ error: "Projet introuvable." }, { status: 404 });
    }
    throw error;
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  try {
    await prisma.projet.delete({ where: { id: params.id } });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      return NextResponse.json({ error: "Projet introuvable." }, { status: 404 });
    }
    throw error;
  }
}
