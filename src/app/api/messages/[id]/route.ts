import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

// PATCH  /api/messages/:id → marquer lu / non lu (admin only)
// DELETE /api/messages/:id → suppression (admin only)

const patchSchema = z.object({ lu: z.boolean() });

type Params = { params: { id: string } };

export async function PATCH(request: Request, { params }: Params) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const parsed = patchSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Données invalides." }, { status: 400 });
  }

  try {
    const message = await prisma.message.update({
      where: { id: params.id },
      data: { lu: parsed.data.lu },
    });
    return NextResponse.json(message);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      return NextResponse.json({ error: "Message introuvable." }, { status: 404 });
    }
    throw error;
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  try {
    await prisma.message.delete({ where: { id: params.id } });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      return NextResponse.json({ error: "Message introuvable." }, { status: 404 });
    }
    throw error;
  }
}
