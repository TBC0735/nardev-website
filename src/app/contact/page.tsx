import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/motion/Reveal";
import { prisma } from "@/lib/prisma";
import { getDict } from "@/i18n/server";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Parlez-nous de votre projet. Devis gratuit et réponse rapide — Nardev, agence web à Dakar.",
};
export const dynamic = "force-dynamic";

// Liste de repli si la table Service n'est pas encore accessible.
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
      <section className="relative overflow-hidden bg-gradient-to-br from-marine via-marine to-bleu text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/5"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-white/5"
        />
        <Container className="relative py-20">
          <h1 className="max-w-2xl text-3xl font-bold sm:text-4xl">{t.title}</h1>
          <p className="mt-4 max-w-xl text-white/80">{t.intro}</p>
          <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white ring-1 ring-white/20">
            <span className="h-1.5 w-1.5 rounded-full bg-succes" />
            {t.responseBadge}
          </span>
        </Container>
      </section>

      <Container className="pb-20">
        <div className="-mt-12 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <Reveal className="rounded-xl border border-bordure bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-lg font-semibold text-marine">{t.formTitle}</h2>
            <div className="mt-5">
              <Suspense>
                <ContactForm services={services} dict={dict} />
              </Suspense>
            </div>
          </Reveal>

          <Reveal
            delay={120}
            className="h-fit rounded-xl border border-bordure bg-fond-alt p-6 sm:p-7"
          >
            <p className="text-sm font-semibold text-marine">{t.coordsTitle}</p>
            <ul className="mt-4 space-y-4 text-sm">
              <li>
                <span className="block text-xs uppercase tracking-wide text-texte-secondaire">
                  {t.emailLabel}
                </span>
                <a
                  href="mailto:contact@nardev.sn"
                  className="font-medium no-underline hover:underline"
                >
                  contact@nardev.sn
                </a>
              </li>
              <li>
                <span className="block text-xs uppercase tracking-wide text-texte-secondaire">
                  {t.phoneLabel}
                </span>
                <span className="font-medium text-texte">+221 —</span>
              </li>
            </ul>

            <hr className="my-6 border-bordure" />

            <p className="text-sm font-semibold text-marine">{t.reasonsTitle}</p>
            <ul className="mt-3 space-y-2 text-sm text-texte-secondaire">
              {[t.reason1, t.reason2, t.reason3].map((r) => (
                <li key={r} className="flex items-start gap-2">
                  <span className="mt-0.5 text-bleu" aria-hidden>
                    →
                  </span>
                  {r}
                </li>
              ))}
            </ul>

            <p className="mt-6 text-xs text-texte-secondaire">
              {t.privacyNote}{" "}
              <a
                href="/mentions-legales"
                className="no-underline hover:underline"
              >
                {t.privacyLink}
              </a>
              .
            </p>
          </Reveal>
        </div>
      </Container>
    </>
  );
}
