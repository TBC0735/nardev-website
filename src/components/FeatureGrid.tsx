import type { ComponentType, SVGProps } from "react";
import { RevealGroup, RevealItem } from "./motion/Reveal";

type Feature = {
  title: string;
  text: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

/** Grille d'atouts — icône dans une pastille, titre, description. */
export function FeatureGrid({
  features,
  columns = 3,
}: {
  features: Feature[];
  columns?: 2 | 3 | 4;
}) {
  const cols = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  }[columns];

  return (
    <RevealGroup className={`mt-12 grid gap-6 ${cols}`}>
      {features.map((f, i) => (
        <RevealItem key={f.title} index={i}>
          <div className="h-full rounded-xl border border-bordure bg-white p-6 shadow-card transition-shadow hover:shadow-card-hover">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ciel text-bleu">
              <f.Icon className="h-5 w-5" />
            </span>
            <p className="mt-4 font-semibold text-marine">{f.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-texte-secondaire">
              {f.text}
            </p>
          </div>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
