import { RevealGroup, RevealItem } from "./motion/Reveal";
import { ChatIcon, PenRulerIcon, RocketIcon } from "./icons";
import { CheckIcon } from "./icons";

const stepIcons = [ChatIcon, PenRulerIcon, RocketIcon, CheckIcon];

/** « Comment ça marche » — étapes numérotées reliées par un fil conducteur. */
export function Steps({ steps }: { steps: { title: string; text: string }[] }) {
  return (
    <RevealGroup className="relative mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {/* Fil conducteur (desktop) */}
      <div
        aria-hidden
        className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-bordure to-transparent lg:block"
      />
      {steps.map((step, i) => {
        const Icon = stepIcons[i] ?? CheckIcon;
        return (
          <RevealItem key={step.title} index={i} className="relative">
            <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white text-bleu ring-1 ring-bordure">
              <Icon className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-bleu text-[11px] font-bold text-white">
                {i + 1}
              </span>
            </span>
            <p className="mt-4 font-semibold text-marine">{step.title}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-texte-secondaire">
              {step.text}
            </p>
          </RevealItem>
        );
      })}
    </RevealGroup>
  );
}
