import { Button } from "./Button";
import { Container } from "./Container";
import { Eyebrow } from "./ui/Eyebrow";
import { HeroVisual } from "./HeroVisual";
import { CheckIcon } from "./icons";
import type { Dict } from "@/i18n/dictionaries";

export function Hero({ dict }: { dict: Dict }) {
  const t = dict.hero;

  return (
    <section className="relative isolate overflow-hidden bg-marine text-white">
      <div aria-hidden className="bg-dots absolute inset-0 opacity-50" />
      <div
        aria-hidden
        className="absolute -top-40 right-0 h-[36rem] w-[36rem] rounded-full bg-bleu/20 blur-[130px]"
      />
      <div
        aria-hidden
        className="absolute -bottom-48 -left-24 h-[32rem] w-[32rem] rounded-full bg-bleu-600/15 blur-[130px]"
      />

      <Container className="relative grid items-center gap-14 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
        <div>
          <Eyebrow tone="light">{t.eyebrow}</Eyebrow>
          <h1 className="mt-5 text-display-sm font-bold text-white sm:text-display lg:text-display-lg">
            {t.titleLead}{" "}
            <span className="text-gradient">{t.titleAccent}</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
            {t.text}
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Button href="/contact?type=devis#formulaire" size="lg">
              {dict.cta.quote}
            </Button>
            <Button href="/portfolio" size="lg" variant="contour-clair">
              {dict.cta.seeWork}
            </Button>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/70">
            {[t.trust1, t.trust2, t.trust3].map((item) => (
              <li key={item} className="inline-flex items-center gap-2">
                <CheckIcon className="h-4 w-4 text-bleu-300" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <HeroVisual />
      </Container>
    </section>
  );
}
