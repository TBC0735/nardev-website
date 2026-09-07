import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { prisma } from "@/lib/prisma";
import { getDict } from "@/i18n/server";

export const metadata: Metadata = { title: "À propos" };

// La liste des fondateurs vient de la base (table Membre, gérée depuis /admin/equipe).
export const dynamic = "force-dynamic";

async function getMembres() {
  try {
    return await prisma.membre.findMany({ orderBy: { ordre: "asc" } });
  } catch {
    // La base n'est pas encore disponible (ex. build CI) — on affiche la page sans l'équipe.
    return [];
  }
}

function initiales(nom: string) {
  return nom
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((mot) => mot[0]?.toUpperCase() ?? "")
    .join("");
}

export default async function AProposPage() {
  const dict = getDict();
  const membres = await getMembres();

  return (
    <>
      <section className="border-b border-bordure bg-fond-alt">
        <Container className="py-16">
          <h1 className="max-w-3xl text-3xl sm:text-4xl">{dict.about.title}</h1>
          <p className="mt-4 max-w-2xl text-texte-secondaire">
            {dict.about.intro}
          </p>
        </Container>
      </section>

      <section>
        <Container className="py-16">
          <h2 className="text-2xl">{dict.about.teamTitle}</h2>
          <p className="mt-2 max-w-2xl text-texte-secondaire">
            {dict.about.teamText}
          </p>

          {membres.length === 0 ? (
            <p className="mt-8 rounded border border-bordure bg-fond-alt p-4 text-sm text-texte-secondaire">
              {dict.about.teamEmpty}
            </p>
          ) : (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {membres.map((membre) => (
                <article
                  key={membre.id}
                  className="rounded border border-bordure p-5"
                >
                  {membre.photoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={membre.photoUrl}
                      alt={membre.nom}
                      className="h-16 w-16 rounded-full object-cover"
                    />
                  ) : (
                    <span
                      aria-hidden
                      className="flex h-16 w-16 items-center justify-center rounded-full bg-bleu/10 text-lg font-semibold text-bleu"
                    >
                      {initiales(membre.nom)}
                    </span>
                  )}
                  <p className="mt-4 font-semibold text-marine">{membre.nom}</p>
                  <p className="text-sm font-medium text-bleu">{membre.role}</p>
                  <p className="mt-2 text-sm text-texte-secondaire">
                    {membre.presentation}
                  </p>
                </article>
              ))}
            </div>
          )}
        </Container>
      </section>

      <section className="bg-fond-alt">
        <Container className="py-16">
          <h2 className="text-2xl">{dict.about.valuesTitle}</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {dict.about.values.map((valeur) => (
              <div
                key={valeur.title}
                className="rounded border border-bordure bg-white p-5"
              >
                <p className="font-semibold text-marine">{valeur.title}</p>
                <p className="mt-2 text-sm text-texte-secondaire">
                  {valeur.text}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section>
        <Container className="flex flex-col items-start gap-4 py-16">
          <h2 className="text-2xl">{dict.about.ctaTitle}</h2>
          <p className="max-w-xl text-texte-secondaire">{dict.about.ctaText}</p>
          <Button href="/contact">{dict.cta.contactUs}</Button>
        </Container>
      </section>
    </>
  );
}
