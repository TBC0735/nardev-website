import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/Container";
import { prisma } from "@/lib/prisma";
import { PortfolioGrid } from "./PortfolioGrid";

export const metadata: Metadata = { title: "Réalisations" };
export const dynamic = "force-dynamic";

async function getData() {
  try {
    const [projets, services] = await Promise.all([
      prisma.projet.findMany({
        where: { publie: true },
        orderBy: [{ ordre: "asc" }, { createdAt: "desc" }],
        include: { service: { select: { slug: true, titre: true } } },
      }),
      prisma.service.findMany({
        orderBy: { ordre: "asc" },
        select: { slug: true, titre: true },
      }),
    ]);
    return { projets, services };
  } catch {
    return { projets: [], services: [] };
  }
}

export default async function PortfolioPage() {
  const { projets, services } = await getData();

  // Ne proposer dans le filtre que les services qui ont au moins un projet.
  const slugsUtilises = new Set(projets.map((p) => p.service?.slug).filter(Boolean));
  const filtres = services.filter((s) => slugsUtilises.has(s.slug));

  return (
    <>
      <section className="border-b border-bordure bg-fond-alt">
        <Container className="py-16">
          <h1 className="text-3xl sm:text-4xl">Nos réalisations</h1>
          <p className="mt-4 max-w-2xl text-texte-secondaire">
            Quelques projets menés par Nardev. Chaque fiche détaille le besoin
            du client, la solution apportée et les technologies utilisées.
          </p>
        </Container>
      </section>

      <Container className="py-16">
        {projets.length === 0 ? (
          <p className="text-texte-secondaire">
            Les réalisations seront bientôt visibles ici.
          </p>
        ) : (
          <Suspense>
            <PortfolioGrid projets={projets} filtres={filtres} />
          </Suspense>
        )}
      </Container>
    </>
  );
}
