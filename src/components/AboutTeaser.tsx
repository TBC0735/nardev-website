import { Button } from "./Button";
import { Container } from "./Container";
import type { Dict } from "@/i18n/dictionaries";

/** Bloc "Qui sommes-nous" de l'accueil, avec lien vers /a-propos. */
export function AboutTeaser({ dict }: { dict: Dict }) {
  return (
    <section>
      <Container className="grid gap-8 py-16 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <h2 className="text-2xl">{dict.aboutTeaser.title}</h2>
          <p className="mt-4 max-w-2xl text-texte-secondaire">
            {dict.aboutTeaser.text}
          </p>
        </div>
        <Button href="/a-propos" variant="contour">
          {dict.cta.learnMore}
        </Button>
      </Container>
    </section>
  );
}
