import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { PortfolioManager } from "./PortfolioManager";

export const metadata: Metadata = { title: "Portfolio — Admin" };
export const dynamic = "force-dynamic";

async function getData() {
  try {
    const [projets, services] = await Promise.all([
      prisma.projet.findMany({
        orderBy: [{ ordre: "asc" }, { createdAt: "desc" }],
      }),
      prisma.service.findMany({
        orderBy: { ordre: "asc" },
        select: { id: true, titre: true },
      }),
    ]);
    return { projets, services };
  } catch {
    return { projets: [], services: [] };
  }
}

export default async function AdminPortfolioPage() {
  const { projets, services } = await getData();

  return (
    <div>
      <h1 className="text-2xl">Portfolio</h1>
      <p className="mt-2 text-sm text-texte-secondaire">
        Les réalisations affichées sur <code>/portfolio</code>. Décochez
        « publié » pour retirer un projet du site sans le supprimer.
      </p>
      <PortfolioManager projetsInitiaux={projets} services={services} />
    </div>
  );
}
