import { prisma } from "@/lib/prisma";
import { Hero } from "@/components/Hero";
import { Container } from "@/components/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stat } from "@/components/ui/Stat";
import { ServiceCard } from "@/components/ServiceCard";
import { PortfolioPreview } from "@/components/PortfolioPreview";
import { AboutTeaser } from "@/components/AboutTeaser";
import { Steps } from "@/components/Steps";
import { FeatureGrid } from "@/components/FeatureGrid";
import { CtaPanel } from "@/components/CtaPanel";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { UserIcon, EyeIcon, ShieldIcon, LayersIcon } from "@/components/icons";
import { getDict } from "@/i18n/server";

export const dynamic = "force-dynamic";

async function getServices() {
  try {
    return await prisma.service.findMany({ orderBy: { ordre: "asc" }, take: 4 });
  } catch {
    return [];
  }
}

async function getProjetsRecents() {
  try {
    return await prisma.projet.findMany({
      where: { publie: true },
      orderBy: [{ ordre: "asc" }, { createdAt: "desc" }],
      take: 3,
      include: { service: { select: { slug: true, titre: true } } },
    });
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const dict = getDict();
  const t = dict.home;
  const [services, projets] = await Promise.all([
    getServices(),
    getProjetsRecents(),
  ]);

  const whyIcons = [UserIcon, LayersIcon, EyeIcon, ShieldIcon];
  const features = t.why.map((w, i) => ({ ...w, Icon: whyIcons[i] ?? UserIcon }));

  return (
    <>
      <Hero dict={dict} />

      {/* Chiffres-clés — engagements concrets */}
      <div className="border-b border-bordure bg-white">
        <Container className="py-10">
          <RevealGroup className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {t.stats.map((s, i) => (
              <RevealItem key={s.label} index={i}>
                <Stat value={s.value} label={s.label} />
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </div>

      <Section id="services" tone="muted">
        <SectionHeading
          eyebrow={t.servicesEyebrow}
          title={t.servicesTitle}
          lead={t.servicesLead}
        />
        {services.length === 0 ? (
          <p className="mt-8 text-texte-secondaire">{t.servicesEmpty}</p>
        ) : (
          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, i) => (
              <RevealItem key={service.id} index={i}>
                <ServiceCard service={service} moreLabel={dict.cta.learnMore} />
              </RevealItem>
            ))}
          </RevealGroup>
        )}
      </Section>

      <Section>
        <SectionHeading
          eyebrow={t.processEyebrow}
          title={t.processTitle}
          lead={t.processLead}
        />
        <Steps steps={dict.process.steps} />
      </Section>

      <PortfolioPreview projets={projets} dict={dict} />

      <Section tone="muted">
        <SectionHeading
          eyebrow={t.whyEyebrow}
          title={t.whyTitle}
          lead={t.whyLead}
        />
        <FeatureGrid features={features} columns={4} />
      </Section>

      <Reveal>
        <AboutTeaser dict={dict} />
      </Reveal>

      <CtaPanel
        title={t.ctaTitle}
        text={t.ctaText}
        primaryLabel={dict.cta.quote}
        primaryHref="/contact?type=devis#formulaire"
        secondaryLabel={dict.cta.seeWork}
        secondaryHref="/portfolio"
      />
    </>
  );
}
