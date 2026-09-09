import { CheckIcon } from "./icons";

/**
 * Visuel du hero — composition 100 % SVG/CSS, sans photo : une fenêtre de
 * navigateur stylisée « en construction », reliée par un trait animé à une
 * carte de statut. Sobre, cohérent avec la charte.
 */
export function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 rounded-full bg-bleu/20 blur-3xl"
      />

      <div className="relative motion-safe:animate-float">
        {/* Fenêtre navigateur */}
        <div className="overflow-hidden rounded-2xl border border-white/15 bg-marine-800/90 shadow-glow backdrop-blur">
          <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="ml-3 h-4 flex-1 rounded bg-white/5" />
          </div>
          <div className="space-y-3 p-5">
            <div className="h-3 w-2/5 rounded bg-bleu-400/70" />
            <div className="h-6 w-4/5 rounded bg-white/15" />
            <div className="h-3 w-3/5 rounded bg-white/10" />
            <div className="mt-4 grid grid-cols-3 gap-2">
              <div className="h-14 rounded-lg bg-white/5 ring-1 ring-inset ring-white/10" />
              <div className="h-14 rounded-lg bg-white/5 ring-1 ring-inset ring-white/10" />
              <div className="h-14 rounded-lg bg-white/5 ring-1 ring-inset ring-white/10" />
            </div>
            <div className="mt-2 flex gap-2">
              <div className="h-7 w-24 rounded-full bg-bleu" />
              <div className="h-7 w-20 rounded-full bg-white/10" />
            </div>
          </div>
        </div>

        {/* Trait de connexion */}
        <svg
          className="absolute -right-6 top-1/2 hidden h-20 w-16 -translate-y-1/2 text-bleu-300 sm:block"
          viewBox="0 0 64 80"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M0 40 C 24 40, 24 12, 56 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="4 6"
            className="motion-safe:animate-dash-flow"
          />
          <circle cx="56" cy="12" r="4" fill="currentColor" />
        </svg>

        {/* Carte de statut */}
        <div className="absolute -bottom-6 right-1 w-36 rounded-xl border border-white/15 bg-white p-3 text-marine shadow-card-hover sm:-bottom-8 sm:-right-8 sm:w-40">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-succes/15 text-succes">
              <CheckIcon className="h-4 w-4" />
            </span>
            <div className="flex-1">
              <div className="h-2 w-full rounded bg-marine/15" />
              <div className="mt-1 h-2 w-2/3 rounded bg-marine/10" />
            </div>
          </div>
          <div className="mt-2 h-1.5 w-full rounded bg-succes/25" />
          <p className="mt-1.5 text-[10px] font-medium text-succes">
            En ligne · 48 h
          </p>
        </div>
      </div>
    </div>
  );
}
