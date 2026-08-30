import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

// PATCH  /api/membres/:id → modification (admin only)
// DELETE /api/membres/:id → suppression (admin only)

const updateSchema = z.object({
  nom: z.string().trim().min(1).max(120).optional(),
  role: z.string().trim().min(1).max(120).optional(),
  presentation: z.string().trim().min(1).max(500).optional(),
  photoUrl: z.string().trim().url().or(z.literal("")).optional(),
  ordre: z.coerce.number().int().min(0).optional(),
});

type Params = { params: { id: string } };

export async function PATCH(request: Request, { params }: Params) {
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

  const { photoUrl, ...rest } = parsed.data;
  const data = { ...rest, ...(photoUrl !== undefined && { photoUrl: photoUrl || null }) };

  try {
    const membre = await prisma.membre.update({ where: { id: params.id }, data });
    return NextResponse.json(membre);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      return NextResponse.json({ error: "Membre introuvable." }, { status: 404 });
    }
    throw error;
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  try {
    await prisma.membre.delete({ where: { id: params.id } });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      return NextResponse.json({ error: "Membre introuvable." }, { status: 404 });
    }
    throw error;
  }
}
