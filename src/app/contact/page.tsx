import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/Container";
import { prisma } from "@/lib/prisma";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = { title: "Contact" };
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
  const services = await getServices();

  return (
    <>
      <section className="border-b border-bordure bg-fond-alt">
        <Container className="py-16">
          <h1 className="text-3xl sm:text-4xl">Nous contacter</h1>
          <p className="mt-4 max-w-2xl text-texte-secondaire">
            Présentez-nous votre projet en quelques lignes. On revient vers vous
            rapidement, avec une proposition concrète.
          </p>
        </Container>
      </section>

      <Container className="grid gap-12 py-16 lg:grid-cols-[1fr_300px]">
        <Suspense>
          <ContactForm services={services} />
        </Suspense>

        <aside className="h-fit rounded-lg border border-bordure bg-fond-alt p-6">
          <p className="text-sm font-semibold text-marine">Coordonnées</p>
          <ul className="mt-3 space-y-3 text-sm text-texte-secondaire">
            <li>
              <span className="block text-xs uppercase tracking-wide">Email</span>
              <a href="mailto:contact@nardev.sn" className="no-underline hover:underline">
                contact@nardev.sn
              </a>
            </li>
            <li>
              <span className="block text-xs uppercase tracking-wide">
                Téléphone
              </span>
              +221 —
            </li>
          </ul>
          <p className="mt-6 text-xs text-texte-secondaire">
            Vos informations servent uniquement à traiter votre demande. Voir
            les{" "}
            <a href="/mentions-legales" className="no-underline hover:underline">
              mentions légales
            </a>
            .
          </p>
        </aside>
      </Container>
    </>
  );
}
