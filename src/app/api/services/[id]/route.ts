import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

// GET    /api/services/:id  → détail public, accepte un id OU un slug
//        (un seul segment dynamique possible ici ; ex: /api/services/sites-vitrines)
// PUT    /api/services/:id  → modification (admin only)
// DELETE /api/services/:id  → suppression (admin only)

const updateSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1)
    .max(80)
    .regex(/^[a-z0-9-]+$/, "Le slug ne peut contenir que des minuscules, chiffres et tirets.")
    .optional(),
  titre: z.string().trim().min(1).max(120).optional(),
  resume: z.string().trim().min(1).max(200).optional(),
  description: z.string().trim().min(1).max(1000).optional(),
  avantages: z.array(z.string().trim().min(1)).optional(),
  pointsCles: z.array(z.string().trim().min(1)).optional(),
  imageUrl: z.string().trim().url().or(z.literal("")).optional(),
  ordre: z.coerce.number().int().min(0).optional(),
});

type Params = { params: { id: string } };

export async function GET(_request: Request, { params }: Params) {
  const service = await prisma.service.findFirst({
    where: { OR: [{ id: params.id }, { slug: params.id }] },
  });

  if (!service) {
    return NextResponse.json({ error: "Service introuvable." }, { status: 404 });
  }

  return NextResponse.json(service);
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

  const { imageUrl, ...rest } = parsed.data;
  const data = { ...rest, ...(imageUrl !== undefined && { imageUrl: imageUrl || null }) };

  try {
    const service = await prisma.service.update({ where: { id: params.id }, data });
    return NextResponse.json(service);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      return NextResponse.json({ error: "Service introuvable." }, { status: 404 });
    }
    throw error;
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  try {
    await prisma.service.delete({ where: { id: params.id } });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      return NextResponse.json({ error: "Service introuvable." }, { status: 404 });
    }
    throw error;
  }
}
