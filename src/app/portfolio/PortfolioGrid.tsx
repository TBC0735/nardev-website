"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { PhotoFrame } from "@/components/PhotoFrame";
import { Badge } from "@/components/ui/Badge";
import { ArrowRightIcon } from "@/components/icons";

type ProjetCarte = {
  id: string;
  slug: string;
  nom: string;
  resume: string;
  imageUrl: string | null;
  service: { slug: string; titre: string } | null;
};

/**
 * Grille des réalisations + filtre par type de service.
 * Le filtre actif est porté par l'URL (?service=slug) pour rester partageable.
 */
export function PortfolioGrid({
  projets,
  filtres,
  labels,
}: {
  projets: ProjetCarte[];
  filtres: { slug: string; titre: string }[];
  labels: { all: string; empty: string; view: string };
}) {
  const params = useSearchParams();
  const actif = params.get("service");

  const visibles = useMemo(
    () => (actif ? projets.filter((p) => p.service?.slug === actif) : projets),
    [projets, actif],
  );

  return (
    <div>
      {filtres.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <FiltreLien libelle={labels.all} slug={null} actif={!actif} />
          {filtres.map((f) => (
            <FiltreLien
              key={f.slug}
              libelle={f.titre}
              slug={f.slug}
              actif={actif === f.slug}
            />
          ))}
        </div>
      )}

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visibles.map((projet) => (
          <Link
            key={projet.id}
            href={`/portfolio/${projet.slug}`}
            className="group flex h-full flex-col overflow-hidden rounded-xl border border-bordure bg-white no-underline shadow-card transition-all duration-200 hover:border-bleu/40 hover:shadow-card-hover motion-safe:hover:-translate-y-1"
          >
            <PhotoFrame
              imageUrl={projet.imageUrl}
              alt={projet.nom}
              className="aspect-[16/10] w-full"
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 90vw"
            />
            <div className="flex flex-1 flex-col p-5">
              {projet.service && (
                <Badge variant="bleu">{projet.service.titre}</Badge>
              )}
              <p className="mt-2.5 font-semibold text-marine">{projet.nom}</p>
              {projet.resume && (
                <p className="mt-1 flex-1 text-sm text-texte-secondaire">
                  {projet.resume}
                </p>
              )}
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-bleu">
                {labels.view}
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        ))}
      </div>

      {visibles.length === 0 && (
        <p className="mt-8 text-sm text-texte-secondaire">{labels.empty}</p>
      )}
    </div>
  );
}

function FiltreLien({
  libelle,
  slug,
  actif,
}: {
  libelle: string;
  slug: string | null;
  actif: boolean;
}) {
  return (
    <Link
      href={slug ? `/portfolio?service=${slug}` : "/portfolio"}
      scroll={false}
      className={`rounded-full border px-4 py-1.5 text-sm no-underline transition-colors ${
        actif
          ? "border-bleu bg-bleu text-white"
          : "border-bordure bg-white text-texte hover:border-bleu hover:text-bleu"
      }`}
    >
      {libelle}
    </Link>
  );
}
