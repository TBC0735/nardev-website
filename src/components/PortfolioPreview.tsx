import Link from "next/link";
import type { Projet } from "@prisma/client";
import { Container } from "./Container";
import { PhotoFrame } from "./PhotoFrame";
import { Reveal, RevealGroup, RevealItem } from "./motion/Reveal";

/**
 * Aperçu de réalisations sur l'accueil. Composant purement présentationnel :
 * reçoit les projets en props (domaine Portfolio — Rokhaya) pour être
 * branché facilement une fois la table Projet alimentée.
 */
export function PortfolioPreview({ projets }: { projets: Projet[] }) {
  if (projets.length === 0) return null;

  return (
    <section className="bg-fond-alt">
      <Container className="py-16">
        <Reveal className="flex items-baseline justify-between">
          <h2 className="text-2xl">Nos réalisations</h2>
          <Link
            href="/portfolio"
            className="text-sm font-medium no-underline hover:underline"
          >
            Voir tout
          </Link>
        </Reveal>
        <RevealGroup className="mt-8 grid gap-6 sm:grid-cols-3">
          {projets.map((projet) => (
            <RevealItem key={projet.id}>
              <Link
                href={`/portfolio/${projet.slug}`}
                className="group block overflow-hidden rounded-lg border border-bordure bg-white no-underline transition-all duration-200 hover:-translate-y-0.5 hover:border-bleu hover:shadow-sm"
              >
                <PhotoFrame
                  imageUrl={projet.imageUrl}
                  alt={projet.nom}
                  className="aspect-[4/3] w-full"
                  sizes="(min-width: 640px) 33vw, 90vw"
                />
                <div className="p-4">
                  <p className="font-semibold text-marine">{projet.nom}</p>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
