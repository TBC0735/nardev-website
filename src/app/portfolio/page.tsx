import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Section } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { CtaPanel } from "@/components/CtaPanel";
import { EyeIcon, PenRulerIcon, RocketIcon } from "@/components/icons";
import { prisma } from "@/lib/prisma";
import { getDict } from "@/i18n/server";
import { PortfolioGrid } from "./PortfolioGrid";

export const metadata: Metadata = {
  title: "Réalisations",
  description:
    "Les projets que Nardev a conçus et réalisés : sites web, plateformes et supports. Besoin, solution, technologies.",
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

  const approche = [
    { Icon: EyeIcon, ...t.approach[0] },
    { Icon: PenRulerIcon, ...t.approach[1] },
    { Icon: RocketIcon, ...t.approach[2] },
  ];

  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} lead={t.intro} />

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

      <Section tone="muted">
        <SectionHeading
          eyebrow={t.approachEyebrow}
          title={t.approachTitle}
          lead={t.approachLead}
        />
        <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-3">
          {approche.map((a, i) => (
            <RevealItem key={a.title} index={i}>
              <div className="h-full rounded-xl border border-bordure bg-white p-6 shadow-card">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ciel text-bleu">
                  <a.Icon className="h-5 w-5" />
                </span>
                <p className="mt-4 font-semibold text-marine">{a.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-texte-secondaire">
                  {a.text}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <CtaPanel
        title={dict.home.ctaTitle}
        text={dict.home.ctaText}
        primaryLabel={dict.cta.quote}
        primaryHref="/contact?type=devis"
      />
    </>
  );
}
