import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { CheckIcon, MailIcon, PhoneIcon, WhatsappIcon } from "@/components/icons";
import { prisma } from "@/lib/prisma";
import { getDict } from "@/i18n/server";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Parlez-nous de votre projet. Devis gratuit et réponse rapide — Nardev, agence web à Dakar.",
};
export const dynamic = "force-dynamic";

const servicesParDefaut = [
  { slug: "sites-vitrines", titre: "Sites vitrines" },
  { slug: "sites-dynamiques", titre: "Sites dynamiques" },
  { slug: "flyers-affiches", titre: "Flyers & affiches" },
  { slug: "visibilite-google", titre: "Visibilité Google" },
];

async function getServices() {
  try {
    const services = await prisma.service.findMany({
      orderBy: { ordre: "asc" },
      select: { slug: true, titre: true },
    });
    return services.length > 0 ? services : servicesParDefaut;
  } catch {
    return servicesParDefaut;
  }
}

export default async function ContactPage() {
  const dict = getDict();
  const t = dict.contact;
  const services = await getServices();

  return (
    <>
      <PageHero eyebrow={dict.nav.contact} title={t.title} lead={t.intro}>
        <span className="mt-7 inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-medium ring-1 ring-inset ring-white/20">
          <span className="h-1.5 w-1.5 rounded-full bg-succes" />
          {t.responseBadge}
        </span>
      </PageHero>

      <Container className="py-16 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          <Reveal className="rounded-2xl border border-bordure bg-white p-6 shadow-card sm:p-8">
            <h2 className="text-lg font-semibold text-marine">{t.formTitle}</h2>
            <div className="mt-6">
              <Suspense>
                <ContactForm services={services} dict={dict} />
              </Suspense>
            </div>
          </Reveal>

          <Reveal delay={120} className="h-fit space-y-4">
            <div className="rounded-2xl border border-bordure bg-fond-alt p-6">
              <p className="text-sm font-semibold text-marine">
                {t.coordsTitle}
              </p>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <a
                    href="mailto:contact@nardev.sn"
                    className="inline-flex items-center gap-2 font-medium text-texte no-underline hover:text-bleu"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-bleu ring-1 ring-bordure">
                      <MailIcon className="h-4 w-4" />
                    </span>
                    contact@nardev.sn
                  </a>
                </li>
                <li className="inline-flex items-center gap-2 font-medium text-texte">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-bleu ring-1 ring-bordure">
                    <PhoneIcon className="h-4 w-4" />
                  </span>
                  +221 —
                </li>
                <li className="inline-flex items-center gap-2 text-texte-secondaire">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-bleu ring-1 ring-bordure">
                    <WhatsappIcon className="h-4 w-4" />
                  </span>
                  WhatsApp {dict.footer.soon}
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-bordure bg-white p-6">
              <p className="text-sm font-semibold text-marine">
                {t.reasonsTitle}
              </p>
              <ul className="mt-3 space-y-2.5 text-sm text-texte-secondaire">
                {[t.reason1, t.reason2, t.reason3].map((r) => (
                  <li key={r} className="flex items-start gap-2.5">
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-bleu" />
                    {r}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-xs text-texte-secondaire">
                {t.privacyNote}{" "}
                <a
                  href="/mentions-legales"
                  className="no-underline hover:underline"
                >
                  {t.privacyLink}
                </a>
                .
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </>
  );
}
