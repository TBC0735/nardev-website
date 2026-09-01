import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { PhotoFrame } from "@/components/PhotoFrame";
import { prisma } from "@/lib/prisma";
import { serviceIcon } from "@/lib/service-icons";

export const metadata: Metadata = { title: "Services" };
export const dynamic = "force-dynamic";

async function getServices() {
  try {
    return await prisma.service.findMany({ orderBy: { ordre: "asc" } });
  } catch {
    return [];
  }
}

const etapes = [
  {
    titre: "Échange & brief",
    texte: "On prend le temps de comprendre votre activité, votre cible et ce dont vous avez vraiment besoin.",
  },
  {
    titre: "Maquette validée avec vous",
    texte: "Vous voyez à quoi ressemblera votre projet avant qu'on ne développe la moindre ligne.",
  },
  {
    titre: "Réalisation",
    texte: "On développe (ou on designe) en gardant le contact — vous suivez l'avancement, pas de surprise à la fin.",
  },
  {
    titre: "Livraison & suite",
    texte: "Mise en ligne accompagnée, et on reste disponible ensuite pour les ajustements et les évolutions.",
  },
];

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <section className="border-b border-bordure bg-fond-alt">
        <Container className="py-16">
          <h1 className="text-3xl sm:text-4xl">Nos services</h1>
          <p className="mt-4 max-w-2xl text-texte-secondaire">
            Quatre façons de vous accompagner, du site vitrine à la
            visibilité locale. Chaque service peut être demandé directement
            depuis cette page — le tarif se construit avec vous, sur devis.
          </p>
        </Container>
      </section>

      {services.length === 0 ? (
        <Container className="py-16">
          <p className="text-texte-secondaire">
            Les services seront bientôt disponibles ici.
          </p>
        </Container>
      ) : (
        <div className="divide-y divide-bordure">
          {services.map((service, index) => {
            const inverse = index % 2 === 1;
            return (
              <section
                key={service.id}
                id={service.slug}
                className={inverse ? "scroll-mt-20 bg-fond-alt" : "scroll-mt-20"}
              >
                <Container className="py-16">
                  <div className="grid items-start gap-10 lg:grid-cols-2">
                    <PhotoFrame
                      imageUrl={service.imageUrl}
                      alt={service.titre}
                      icon={serviceIcon(service.slug)}
                      fit="contain"
                      className={`aspect-[16/10] w-full lg:sticky lg:top-24 ${inverse ? "lg:order-2" : ""}`}
                      sizes="(min-width: 1024px) 620px, 100vw"
                    />
                    <div className={inverse ? "lg:order-1" : undefined}>
                      <h2 className="text-2xl">{service.titre}</h2>
                      <p className="mt-4 text-texte-secondaire">
                        {service.description}
                      </p>

                      {service.avantages.length > 0 && (
                        <div className="mt-6">
                          <p className="text-sm font-semibold text-marine">
                            Pourquoi ce service
                          </p>
                          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                            {service.avantages.map((avantage) => (
                              <li
                                key={avantage}
                                className="flex items-start gap-2 text-sm text-texte-secondaire"
                              >
                                <span className="mt-0.5 text-bleu" aria-hidden="true">
                                  →
                                </span>
                                {avantage}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {service.pointsCles.length > 0 && (
                        <div className="mt-6">
                          <p className="text-sm font-semibold text-marine">
                            Ce que vous recevez
                          </p>
                          <ul className="mt-3 space-y-2">
                            {service.pointsCles.map((point) => (
                              <li
                                key={point}
                                className="flex items-start gap-2 text-sm text-texte-secondaire"
                              >
                                <span className="mt-0.5 text-succes" aria-hidden="true">
                                  ✓
                                </span>
                                {point}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="mt-8 flex flex-wrap items-center gap-3">
                        <Button href={`/contact?service=${service.slug}`}>
                          Demander ce service
                        </Button>
                        <Button href={`/portfolio?service=${service.slug}`} variant="contour">
                          Voir des exemples
                        </Button>
                      </div>
                      <p className="mt-3 text-xs text-texte-secondaire">
                        Tarif sur devis, adapté à votre projet.
                      </p>
                    </div>
                  </div>
                </Container>
              </section>
            );
          })}
        </div>
      )}

      <section className="bg-fond-alt">
        <Container className="py-16">
          <h2 className="text-2xl">Comment ça se passe</h2>
          <p className="mt-3 max-w-2xl text-texte-secondaire">
            Le même déroulé simple, quel que soit le service choisi.
          </p>
          <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {etapes.map((etape, index) => (
              <li
                key={etape.titre}
                className="rounded-lg border border-bordure bg-white p-5 transition-colors duration-200 hover:border-bleu"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-bleu text-sm font-semibold text-white">
                  {index + 1}
                </span>
                <p className="mt-3 font-semibold text-marine">{etape.titre}</p>
                <p className="mt-2 text-sm text-texte-secondaire">{etape.texte}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8">
            <Button href="/contact?type=devis">Demander un devis</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
