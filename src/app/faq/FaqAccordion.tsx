"use client";

import { useState } from "react";

type Item = { q: string; a: string };

/**
 * Accordéon FAQ : une seule réponse ouverte à la fois. Ouverture/fermeture
 * animée en douceur via la transition `grid-rows` (0fr → 1fr), sans mesure JS.
 */
export function FaqAccordion({ items }: { items: readonly Item[] }) {
  const [ouvert, setOuvert] = useState<number | null>(0);

  return (
    <div className="divide-y divide-bordure border-y border-bordure">
      {items.map((item, i) => {
        const actif = ouvert === i;
        return (
          <div key={item.q}>
            <h3>
              <button
                type="button"
                onClick={() => setOuvert(actif ? null : i)}
                aria-expanded={actif}
                className="flex w-full items-center justify-between gap-4 py-5 text-left font-medium text-marine transition-colors hover:text-bleu"
              >
                <span>{item.q}</span>
                <svg
                  className={`h-5 w-5 shrink-0 text-texte-secondaire transition-transform duration-300 ${
                    actif ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M6 8l4 4 4-4"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </h3>
            <div
              className={`grid transition-all duration-300 ease-out ${
                actif
                  ? "grid-rows-[1fr] pb-5 opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="pr-9 text-sm leading-relaxed text-texte-secondaire">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
