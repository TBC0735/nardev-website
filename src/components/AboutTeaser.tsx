import { Button } from "./Button";
import { Container } from "./Container";
import { Eyebrow } from "./ui/Eyebrow";
import type { Dict } from "@/i18n/dictionaries";

/** Bloc « Qui sommes-nous » de l'accueil. */
export function AboutTeaser({ dict }: { dict: Dict }) {
  const t = dict.aboutTeaser;
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container>
        <div className="grid items-center gap-10 rounded-2xl border border-bordure bg-fond-alt p-8 sm:p-12 lg:grid-cols-[1.4fr_auto]">
          <div>
            <Eyebrow>{t.eyebrow}</Eyebrow>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-marine sm:text-3xl">
              {t.title}
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-texte-secondaire">
              {t.text}
            </p>
          </div>
          <Button href="/a-propos" variant="contour" size="lg">
            {dict.cta.learnMore}
          </Button>
        </div>
      </Container>
    </section>
  );
}
