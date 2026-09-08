import Link from "next/link";
import { Container } from "./Container";
import { PhotoFrame } from "./PhotoFrame";
import { SectionHeading } from "./ui/SectionHeading";
import { Badge } from "./ui/Badge";
import { RevealGroup, RevealItem } from "./motion/Reveal";
import { ArrowRightIcon } from "./icons";
import type { Dict } from "@/i18n/dictionaries";

type ProjetCarte = {
  id: string;
  slug: string;
  nom: string;
  resume: string;
  imageUrl: string | null;
  service: { slug: string; titre: string } | null;
};

/** Aperçu des réalisations sur l'accueil. */
export function PortfolioPreview({
  projets,
  dict,
}: {
  projets: ProjetCarte[];
  dict: Dict;
}) {
  if (projets.length === 0) return null;
  const t = dict.portfolio;

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow={t.previewEyebrow} title={t.previewTitle} />
          <Link
            href="/portfolio"
            className="link-underline inline-flex items-center gap-1.5 text-sm font-medium text-bleu"
          >
            {t.seeAll}
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>

        <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projets.map((projet, i) => (
            <RevealItem key={projet.id} index={i}>
              <Link
                href={`/portfolio/${projet.slug}`}
                className="group block h-full overflow-hidden rounded-xl border border-bordure bg-white no-underline shadow-card transition-all duration-200 hover:border-bleu/40 hover:shadow-card-hover motion-safe:hover:-translate-y-1"
              >
                <PhotoFrame
                  imageUrl={projet.imageUrl}
                  alt={projet.nom}
                  className="aspect-[16/10] w-full"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 90vw"
                />
                <div className="p-5">
                  {projet.service && (
                    <Badge variant="bleu">{projet.service.titre}</Badge>
                  )}
                  <p className="mt-2.5 font-semibold text-marine">
                    {projet.nom}
                  </p>
                  {projet.resume && (
                    <p className="mt-1 text-sm text-texte-secondaire">
                      {projet.resume}
                    </p>
                  )}
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
