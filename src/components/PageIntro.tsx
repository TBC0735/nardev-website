import { ReactNode } from "react";
import { Container } from "./Container";

/** Bandeau de titre réutilisable en haut des pages publiques. */
export function PageIntro({
  title,
  children,
  owner,
}: {
  title: string;
  children?: ReactNode;
  /** Domaine responsable (cf. cahier des charges section 4) — visible tant que la page est un placeholder. */
  owner?: string;
}) {
  return (
    <section className="border-b border-bordure bg-fond-alt">
      <Container className="py-16">
        <h1 className="text-3xl sm:text-4xl">{title}</h1>
        {children && (
          <p className="mt-4 max-w-2xl text-texte-secondaire">{children}</p>
        )}
        {owner && (
          <p className="mt-6 inline-block rounded border border-bordure bg-white px-3 py-1 text-xs text-texte-secondaire">
            Page à construire · domaine : {owner}
          </p>
        )}
      </Container>
    </section>
  );
}
