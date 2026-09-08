import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/Container";
import { Spark } from "@/components/ui/Spark";
import { Reveal } from "@/components/motion/Reveal";
import { CtaPanel } from "@/components/CtaPanel";
import { prisma } from "@/lib/prisma";
import { getDict } from "@/i18n/server";
import { PortfolioGrid } from "./PortfolioGrid";

export const metadata: Metadata = {
  title: "Réalisations",
  description:
    "Les projets menés par Nardev : sites web, supports print et visibilité locale. Besoin client, solution apportée et technologies.",
};
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
  const t = dict.portfolio;
  const { projets, services } = await getData();

  const slugsUtilises = new Set(
    projets.map((p) => p.service?.slug).filter(Boolean),
  );
  const filtres = services.filter((s) => slugsUtilises.has(s.slug));

  return (
    <>
      <section className="relative overflow-hidden bg-marine text-white">
        <div aria-hidden className="bg-dots absolute inset-0 opacity-50" />
        <div
          aria-hidden
          className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-bleu/20 blur-[110px]"
        />
        <Container className="relative py-20 lg:py-24">
          <p className="eyebrow text-bleu-300">
            <Spark className="h-3.5 w-3.5" />
            {t.eyebrow}
          </p>
          <h1 className="mt-4 max-w-3xl text-display-sm font-bold text-white sm:text-display">
            {t.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/75">{t.intro}</p>
        </Container>
      </section>

      <Container className="py-16 sm:py-20">
        {projets.length === 0 ? (
          <p className="text-texte-secondaire">{t.empty}</p>
        ) : (
          <Reveal>
            <Suspense>
              <PortfolioGrid
                projets={projets}
                filtres={filtres}
                labels={{
                  all: t.filterAll,
                  empty: t.filterEmpty,
                  view: t.viewProject,
                }}
              />
            </Suspense>
          </Reveal>
        )}
      </Container>

      <CtaPanel
        title={dict.home.ctaTitle}
        text={dict.home.ctaText}
        primaryLabel={dict.cta.quote}
        primaryHref="/contact?type=devis"
      />
    </>
  );
}
