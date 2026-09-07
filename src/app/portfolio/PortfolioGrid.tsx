"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { PhotoFrame } from "@/components/PhotoFrame";

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
 * Le filtre actif est porté par l'URL (?service=slug) pour rester partageable
 * et cohérent avec les liens « Voir des exemples » depuis /services.
 */
export function PortfolioGrid({
  projets,
  filtres,
}: {
  projets: ProjetCarte[];
  filtres: { slug: string; titre: string }[];
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
          <FiltreLien libelle="Tous" slug={null} actif={!actif} />
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
            className="group block overflow-hidden rounded-lg border border-bordure bg-white no-underline transition-colors hover:border-bleu"
          >
            <PhotoFrame
              imageUrl={projet.imageUrl}
              alt={projet.nom}
              className="aspect-[4/3] w-full"
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 90vw"
            />
            <div className="p-4">
              {projet.service && (
                <p className="text-xs font-medium uppercase tracking-wide text-bleu">
                  {projet.service.titre}
                </p>
              )}
              <p className="mt-1 font-semibold text-marine">{projet.nom}</p>
              {projet.resume && (
                <p className="mt-1 text-sm text-texte-secondaire">
                  {projet.resume}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>

      {visibles.length === 0 && (
        <p className="mt-8 text-sm text-texte-secondaire">
          Aucun projet pour ce filtre.
        </p>
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
      className={`rounded border px-3 py-1.5 text-sm no-underline transition-colors ${
        actif
          ? "border-bleu bg-bleu text-white"
          : "border-bordure text-texte hover:border-bleu"
      }`}
    >
      {libelle}
    </Link>
  );
}
