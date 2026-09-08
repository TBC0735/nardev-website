import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Spark } from "@/components/ui/Spark";
import { CtaPanel } from "@/components/CtaPanel";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { prisma } from "@/lib/prisma";
import { getDict } from "@/i18n/server";
import { TeamCard } from "./TeamCard";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Nardev, agence web à Dakar fondée par quatre associés pour rendre le web professionnel accessible aux petites structures.",
};
export const dynamic = "force-dynamic";

async function getMembres() {
  try {
    return await prisma.membre.findMany({ orderBy: { ordre: "asc" } });
  } catch {
    return [];
  }
}

export default async function AProposPage() {
  const dict = getDict();
  const t = dict.about;
  const membres = await getMembres();

  return (
    <>
      <section className="relative overflow-hidden bg-marine text-white">
        <div aria-hidden className="bg-dots absolute inset-0 opacity-50" />
        <div
          aria-hidden
          className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-bleu/20 blur-[110px]"
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

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <Reveal>
            <p className="eyebrow">
              <Spark className="h-3.5 w-3.5" />
              {t.storyTitle}
            </p>
            <p className="mt-4 text-lg leading-relaxed text-texte-secondaire">
              {t.storyText}
            </p>
          </Reveal>
          <Reveal
            delay={120}
            className="relative overflow-hidden rounded-2xl border border-bordure bg-gradient-to-br from-marine via-marine-700 to-bleu-600 p-8 text-white"
          >
            <div aria-hidden className="bg-dots absolute inset-0 opacity-50" />
            <Spark className="relative h-10 w-10 text-bleu-300 motion-safe:animate-spark-pulse" />
            <p className="relative mt-4 text-2xl font-bold">
              Dev · Design · Com&apos;
            </p>
            <p className="relative mt-2 text-sm text-white/70">
              Trois métiers réunis dans une seule équipe, un seul interlocuteur.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading
          eyebrow={t.teamEyebrow}
          title={t.teamTitle}
          lead={t.teamText}
        />
        {membres.length === 0 ? (
          <p className="mt-8 rounded-xl border border-bordure bg-white p-4 text-sm text-texte-secondaire">
            {t.teamEmpty}
          </p>
        ) : (
          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {membres.map((membre, i) => (
              <RevealItem key={membre.id} index={i}>
                <TeamCard membre={membre} />
              </RevealItem>
            ))}
          </RevealGroup>
        )}
      </Section>

      <Section>
        <SectionHeading
          eyebrow={t.valuesEyebrow}
          title={t.valuesTitle}
        />
        <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-3">
          {t.values.map((valeur, i) => (
            <RevealItem key={valeur.title} index={i}>
              <div className="h-full rounded-xl border border-bordure bg-white p-6 shadow-card">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-ciel text-bleu">
                  <Spark className="h-5 w-5" />
                </span>
                <p className="mt-4 font-semibold text-marine">{valeur.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-texte-secondaire">
                  {valeur.text}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <CtaPanel
        title={t.ctaTitle}
        text={t.ctaText}
        primaryLabel={dict.cta.contactUs}
        primaryHref="/contact"
      />
    </>
  );
}
