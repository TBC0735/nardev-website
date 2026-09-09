import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Stat } from "@/components/ui/Stat";
import { Steps } from "@/components/Steps";
import { FeatureGrid } from "@/components/FeatureGrid";
import { CtaPanel } from "@/components/CtaPanel";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import {
  MonitorIcon,
  PaletteIcon,
  ChatIcon,
  CheckIcon,
} from "@/components/icons";
import { prisma } from "@/lib/prisma";
import { getDict } from "@/i18n/server";
import { TeamCard } from "./TeamCard";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Nardev, agence web à Dakar fondée par quatre associés pour rendre le web professionnel accessible aux petites structures du Sénégal.",
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

  const expertiseIcons = [MonitorIcon, PaletteIcon, ChatIcon];
  const expertises = t.expertise.map((e, i) => ({
    ...e,
    Icon: expertiseIcons[i] ?? MonitorIcon,
  }));

  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} lead={t.intro} />

      {/* 2 — Notre histoire (éditorial : texte + citation) */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:items-start">
          <Reveal>
            <Eyebrow>{t.storyEyebrow}</Eyebrow>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-marine sm:text-3xl">
              {t.storyTitle}
            </h2>
            <div className="mt-5 space-y-4 leading-relaxed text-texte-secondaire">
              {t.storyText.split("\n\n").map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Reveal>
          <Reveal
            delay={120}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-marine via-marine-700 to-bleu-600 p-8 text-white lg:sticky lg:top-24"
          >
            <div aria-hidden className="bg-dots absolute inset-0 opacity-40" />
            <p className="relative text-5xl font-serif leading-none text-white/25">
              &ldquo;
            </p>
            <blockquote className="relative -mt-4 text-lg font-medium leading-relaxed">
              {t.storyQuote}
            </blockquote>
          </Reveal>
        </div>
      </Section>

      {/* 3 — Notre mission (déclaration pleine largeur, fond tinté) */}
      <section className="bg-ciel py-16 sm:py-20">
        <Container>
          <Reveal className="mx-auto max-w-3xl text-center">
            <Eyebrow className="justify-center">{t.missionEyebrow}</Eyebrow>
            <p className="mt-5 text-2xl font-semibold leading-snug text-marine sm:text-[1.9rem]">
              {t.missionTitle}
            </p>
            <p className="mt-4 leading-relaxed text-texte-secondaire">
              {t.missionText}
            </p>
          </Reveal>
        </Container>
      </section>

      {/* 4 — Nos trois expertises */}
      <Section>
        <SectionHeading
          eyebrow={t.expertiseEyebrow}
          title={t.expertiseTitle}
          lead={t.expertiseLead}
        />
        <FeatureGrid features={expertises} columns={3} />
      </Section>

      {/* 5 — Comment nous travaillons (timeline) */}
      <Section tone="muted">
        <SectionHeading
          eyebrow={t.processEyebrow}
          title={t.processTitle}
          lead={t.processLead}
        />
        <Steps steps={t.process} />
      </Section>

      {/* 6 — L'équipe */}
      <Section>
        <SectionHeading
          eyebrow={t.teamEyebrow}
          title={t.teamTitle}
          lead={t.teamText}
        />
        {membres.length === 0 ? (
          <p className="mt-8 rounded-xl border border-bordure bg-fond-alt p-4 text-sm text-texte-secondaire">
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

      {/* 7 — Nos valeurs */}
      <Section tone="muted">
        <SectionHeading eyebrow={t.valuesEyebrow} title={t.valuesTitle} />
        <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2">
          {t.values.map((valeur, i) => (
            <RevealItem key={valeur.title} index={i}>
              <div className="flex h-full gap-4 rounded-xl border border-bordure bg-white p-6 shadow-card">
                <span className="mt-0.5 text-lg font-bold text-bleu/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-semibold text-marine">{valeur.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-texte-secondaire">
                    {valeur.text}
                  </p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* 8 — Pourquoi Nardev (éditorial : titre sticky + liste) */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.4fr] lg:gap-16">
          <Reveal className="lg:sticky lg:top-24 lg:self-start">
            <Eyebrow>{t.whyEyebrow}</Eyebrow>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-marine sm:text-3xl">
              {t.whyTitle}
            </h2>
          </Reveal>
          <RevealGroup className="divide-y divide-bordure border-y border-bordure">
            {t.why.map((item, i) => (
              <RevealItem key={item.title} index={i}>
                <div className="flex gap-4 py-6">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ciel text-bleu">
                    <CheckIcon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-marine">{item.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-texte-secondaire">
                      {item.text}
                    </p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* 9 — Quelques chiffres */}
      <section className="border-y border-bordure bg-fond-alt py-14">
        <Container>
          <Reveal>
            <Eyebrow>{t.statsEyebrow}</Eyebrow>
          </Reveal>
          <RevealGroup className="mt-6 grid grid-cols-1 divide-y divide-bordure sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {t.stats.map((s, i) => (
              <RevealItem key={s.label} index={i} className="py-6 sm:px-8 sm:py-0">
                <Stat value={s.value} label={s.label} />
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* 10 — CTA */}
      <CtaPanel
        title={t.ctaTitle}
        text={t.ctaText}
        primaryLabel={dict.cta.contactUs}
        primaryHref="/contact"
        secondaryLabel={dict.cta.seeWork}
        secondaryHref="/portfolio"
      />
    </>
  );
}
