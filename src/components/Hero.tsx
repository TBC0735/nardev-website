import { Button } from "./Button";
import { Container } from "./Container";
import { PhotoFrame } from "./PhotoFrame";
import type { Dict } from "@/i18n/dictionaries";

/**
 * Hero de l'accueil : photo pleine largeur avec titre superposé.
 * `imageUrl` est optionnel — tant qu'aucune vraie photo n'est fournie, un
 * aplat dégradé aux tons de la charte (navy / bleu) tient la place.
 */
export function Hero({
  dict,
  imageUrl,
  imageAlt = "Nardev",
}: {
  dict: Dict;
  imageUrl?: string | null;
  imageAlt?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-marine text-white">
      <div className="absolute inset-0">
        <PhotoFrame
          imageUrl={imageUrl}
          alt={imageAlt}
          icon=""
          rounded={false}
          className="h-full w-full"
          sizes="100vw"
          priority
        />
      </div>
      {/* Voile navy pour garder le texte lisible sur la photo. */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-marine via-marine/80 to-marine/40"
        aria-hidden="true"
      />

      <Container className="relative z-10 flex min-h-[380px] flex-col justify-end gap-6 py-16 sm:min-h-[440px]">
        <div>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight text-white sm:text-5xl">
            {dict.hero.title}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/80">{dict.hero.text}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/contact?type=devis">{dict.cta.quote}</Button>
            <Button href="/portfolio" variant="contour-clair">
              {dict.cta.seeWork}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
