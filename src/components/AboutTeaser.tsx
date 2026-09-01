import { Button } from "./Button";
import { Container } from "./Container";

/** Bloc "Qui sommes-nous" de l'accueil, avec lien vers /a-propos. */
export function AboutTeaser() {
  return (
    <section>
      <Container className="grid gap-8 py-16 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <h2 className="text-2xl">Qui sommes-nous</h2>
          <p className="mt-4 max-w-2xl text-texte-secondaire">
            Nardev est une agence à taille humaine. On préfère les échanges
            directs aux process compliqués, et un site qui vous ressemble
            vraiment plutôt qu&apos;un modèle recopié — du premier brief
            jusqu&apos;à la mise en ligne, et après.
          </p>
        </div>
        <Button href="/a-propos" variant="contour">
          En savoir plus
        </Button>
      </Container>
    </section>
  );
}
