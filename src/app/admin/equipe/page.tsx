import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { EquipeManager } from "./EquipeManager";

export const metadata: Metadata = { title: "Équipe — Admin" };
export const dynamic = "force-dynamic";

async function getMembres() {
  try {
    return await prisma.membre.findMany({ orderBy: { ordre: "asc" } });
  } catch {
    return [];
  }
}

export default async function AdminEquipePage() {
  const membres = await getMembres();

  return (
    <div>
      <h1 className="text-2xl">Équipe</h1>
      <p className="mt-2 text-sm text-texte-secondaire">
        Les fondateurs affichés sur la page <code>/a-propos</code>. L&apos;ordre
        d&apos;affichage suit le champ « ordre » (croissant).
      </p>
      <EquipeManager membresInitiaux={membres} />
    </div>
  );
}
