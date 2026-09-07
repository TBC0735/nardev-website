import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/Container";
import { prisma } from "@/lib/prisma";
import { getDict } from "@/i18n/server";
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
  const dict = getDict();
  const { projets, services } = await getData();

  // Ne proposer dans le filtre que les services qui ont au moins un projet.
  const slugsUtilises = new Set(projets.map((p) => p.service?.slug).filter(Boolean));
  const filtres = services.filter((s) => slugsUtilises.has(s.slug));

  return (
    <>
      <section className="border-b border-bordure bg-fond-alt">
        <Container className="py-16">
          <h1 className="text-3xl sm:text-4xl">{dict.portfolio.title}</h1>
          <p className="mt-4 max-w-2xl text-texte-secondaire">
            {dict.portfolio.intro}
          </p>
        </Container>
      </section>

      <Container className="py-16">
        {projets.length === 0 ? (
          <p className="text-texte-secondaire">{dict.portfolio.empty}</p>
        ) : (
          <Suspense>
            <PortfolioGrid
              projets={projets}
              filtres={filtres}
              labels={{
                all: dict.portfolio.filterAll,
                empty: dict.portfolio.filterEmpty,
              }}
            />
          </Suspense>
        )}
      </Container>
    </>
  );
}
