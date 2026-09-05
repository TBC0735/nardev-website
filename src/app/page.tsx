import { prisma } from "@/lib/prisma";
import { Hero } from "@/components/Hero";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { ServiceCard } from "@/components/ServiceCard";
import { PortfolioPreview } from "@/components/PortfolioPreview";
import { AboutTeaser } from "@/components/AboutTeaser";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";

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
      orderBy: { createdAt: "desc" },
      take: 3,
    });
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const [services, projets] = await Promise.all([getServices(), getProjetsRecents()]);

  return (
    <>
      <Hero />

      <section id="services" className="scroll-mt-20">
        <Container className="py-16">
          <Reveal>
            <h2 className="text-2xl">Nos services</h2>
          </Reveal>
          {services.length === 0 ? (
            <p className="mt-4 text-texte-secondaire">
              Les services seront bientôt disponibles ici.
            </p>
          ) : (
            <RevealGroup className="mt-8 grid gap-6 sm:grid-cols-2">
              {services.map((service) => (
                <RevealItem key={service.id}>
                  <ServiceCard service={service} />
                </RevealItem>
              ))}
            </RevealGroup>
          )}
        </Container>
      </section>

      <PortfolioPreview projets={projets} />

      <Reveal>
        <AboutTeaser />
      </Reveal>

      <section className="bg-fond-alt">
        <Container className="py-16">
          <Reveal className="flex flex-col items-start gap-4">
            <h2 className="text-2xl">Un projet en tête ?</h2>
            <p className="max-w-xl text-texte-secondaire">
              Parlons-en, tout simplement. On revient vers vous rapidement
              avec une proposition concrète.
            </p>
            <Button href="/contact">Nous contacter</Button>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
