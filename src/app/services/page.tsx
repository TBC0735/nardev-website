import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/ui/PageHero";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Steps } from "@/components/Steps";
import { CtaPanel } from "@/components/CtaPanel";
import { Reveal } from "@/components/motion/Reveal";
import { PhotoFrame } from "@/components/PhotoFrame";
import { ServiceIcon } from "@/lib/service-icons";
import { ArrowRightIcon, CheckIcon } from "@/components/icons";
import { prisma } from "@/lib/prisma";
import { getDict } from "@/i18n/server";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Sites vitrines, sites dynamiques, flyers & affiches et visibilité Google. Chaque service sur devis, adapté à votre projet.",
};
export const dynamic = "force-dynamic";

async function getServices() {
  try {
    return await prisma.service.findMany({ orderBy: { ordre: "asc" } });
  } catch {
    return [];
  }
}

export default async function ServicesPage() {
  const dict = getDict();
  const t = dict.services;
  const services = await getServices();

  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} lead={t.intro}>
        {services.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {services.map((s) => (
              <a
                key={s.id}
                href={`#${s.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-sm text-white/80 no-underline transition-colors hover:border-white/40 hover:text-white"
              >
                <ServiceIcon slug={s.slug} className="h-4 w-4" />
                {s.titre}
              </a>
            ))}
          </div>
        )}
      </PageHero>

      {services.length === 0 ? (
        <Container className="py-20">
          <p className="text-texte-secondaire">{t.empty}</p>
        </Container>
      ) : (
        <div className="divide-y divide-bordure">
          {services.map((service, index) => {
            const inverse = index % 2 === 1;
            return (
              <section
                key={service.id}
                id={service.slug}
                className={`scroll-mt-24 ${inverse ? "bg-fond-alt" : "bg-white"}`}
              >
                <Container className="py-16 sm:py-20">
                  <Reveal className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
                    <div
                      className={`lg:sticky lg:top-24 ${
                        inverse ? "lg:order-2" : ""
                      }`}
                    >
                      <PhotoFrame
                        imageUrl={service.imageUrl}
                        alt={service.titre}
                        icon={
                          <ServiceIcon
                            slug={service.slug}
                            className="h-14 w-14"
                          />
                        }
                        fit="contain"
                        className="aspect-[4/3] w-full"
                        sizes="(min-width: 1024px) 560px, 100vw"
                      />
                    </div>

                    <div className={inverse ? "lg:order-1" : undefined}>
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-ciel text-bleu">
                        <ServiceIcon slug={service.slug} className="h-6 w-6" />
                      </span>
                      <h2 className="mt-4 text-2xl font-bold tracking-tight text-marine sm:text-3xl">
                        {service.titre}
                      </h2>
                      <p className="mt-4 leading-relaxed text-texte-secondaire">
                        {service.description}
                      </p>

                      {service.avantages.length > 0 && (
                        <div className="mt-7">
                          <Eyebrow>{t.whyTitle}</Eyebrow>
                          <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                            {service.avantages.map((a) => (
                              <li
                                key={a}
                                className="flex items-start gap-2 text-sm text-texte-secondaire"
                              >
                                <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-bleu" />
                                {a}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {service.pointsCles.length > 0 && (
                        <div className="mt-7 rounded-xl border border-bordure bg-white p-5">
                          <p className="text-sm font-semibold text-marine">
                            {t.receiveTitle}
                          </p>
                          <ul className="mt-3 space-y-2">
                            {service.pointsCles.map((p) => (
                              <li
                                key={p}
                                className="flex items-start gap-2.5 text-sm text-texte-secondaire"
                              >
                                <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-succes" />
                                {p}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="mt-8 flex flex-wrap items-center gap-3">
                        <Button href={`/contact?service=${service.slug}`}>
                          {dict.cta.requestService}
                        </Button>
                        <Link
                          href={`/portfolio?service=${service.slug}`}
                          className="link-underline inline-flex items-center gap-1.5 text-sm font-medium text-bleu"
                        >
                          {dict.cta.seeExamples}
                          <ArrowRightIcon className="h-4 w-4" />
                        </Link>
                      </div>
                      <p className="mt-3 text-xs text-texte-secondaire">
                        {t.priceNote}
                      </p>
                    </div>
                  </Reveal>
                </Container>
              </section>
            );
          })}
        </div>
      )}

      <Section tone="muted">
        <SectionHeading
          eyebrow={dict.home.processEyebrow}
          title={dict.home.processTitle}
          lead={dict.home.processLead}
        />
        <Steps steps={dict.process.steps} />
      </Section>

      <CtaPanel
        title={dict.home.ctaTitle}
        text={dict.home.ctaText}
        primaryLabel={dict.cta.quote}
        primaryHref="/contact?type=devis"
        secondaryLabel={dict.nav.faq}
        secondaryHref="/faq"
      />
    </>
  );
}
