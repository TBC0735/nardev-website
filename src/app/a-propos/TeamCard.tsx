import Image from "next/image";
import type { Membre } from "@prisma/client";

function initiales(nom: string) {
  return nom
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((m) => m[0]?.toUpperCase() ?? "")
    .join("");
}

/** Carte fondateur — photo (ou monogramme), nom, rôle, phrase. */
export function TeamCard({ membre }: { membre: Membre }) {
  return (
    <article className="group h-full overflow-hidden rounded-xl border border-bordure bg-white shadow-card transition-all duration-200 hover:border-bleu/40 hover:shadow-card-hover motion-safe:hover:-translate-y-1">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-gradient-to-br from-marine via-marine-700 to-bleu-600">
        {membre.photoUrl ? (
          <Image
            src={membre.photoUrl}
            alt={membre.nom}
            fill
            sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 90vw"
            className="object-cover object-top motion-safe:transition-transform motion-safe:duration-500 group-hover:motion-safe:scale-[1.03]"
          />
        ) : (
          <>
            <div aria-hidden className="bg-dots absolute inset-0 opacity-50" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-bold tracking-wide text-white/90">
                {initiales(membre.nom)}
              </span>
            </div>
          </>
        )}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-marine/60 to-transparent"
        />
      </div>
      <div className="p-5">
        <p className="font-semibold text-marine">{membre.nom}</p>
        <p className="mt-0.5 text-sm font-medium text-bleu">{membre.role}</p>
        <p className="mt-2 text-sm leading-relaxed text-texte-secondaire">
          {membre.presentation}
        </p>
      </div>
    </article>
  );
}
