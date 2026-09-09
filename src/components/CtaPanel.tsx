import { Container } from "./Container";
import { Button } from "./Button";
import { Reveal } from "./motion/Reveal";

/** Bandeau d'appel à l'action — panneau dégradé navy → bleu. */
export function CtaPanel({
  title,
  text,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: {
  title: string;
  text: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <div className="bg-white py-16 sm:py-20">
      <Container>
        <Reveal className="relative isolate overflow-hidden rounded-2xl bg-gradient-to-br from-marine via-marine-700 to-bleu-600 px-6 py-14 text-center text-white sm:px-12">
          <div aria-hidden className="bg-dots absolute inset-0 opacity-50" />
          <div
            aria-hidden
            className="absolute -right-10 -top-10 h-40 w-40 rounded-full border border-white/10"
          />
          <div
            aria-hidden
            className="absolute -bottom-16 -left-10 h-48 w-48 rounded-full border border-white/10"
          />
          <div className="relative mx-auto max-w-xl">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">{title}</h2>
            <p className="mt-3 text-white/75">{text}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href={primaryHref} size="lg" variant="clair">
                {primaryLabel}
              </Button>
              {secondaryLabel && secondaryHref && (
                <Button
                  href={secondaryHref}
                  size="lg"
                  variant="contour-clair"
                >
                  {secondaryLabel}
                </Button>
              )}
            </div>
          </div>
        </Reveal>
      </Container>
    </div>
  );
}
