"use client";

import { useState } from "react";
import { Spark } from "@/components/ui/Spark";

type Item = { q: string; a: string };

/** Accordéon FAQ — une seule réponse ouverte à la fois, hauteur animée. */
export function FaqAccordion({ items }: { items: readonly Item[] }) {
  const [ouvert, setOuvert] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const actif = ouvert === i;
        return (
          <div
            key={item.q}
            className={`overflow-hidden rounded-xl border bg-white transition-colors ${
              actif ? "border-bleu/40 shadow-card" : "border-bordure"
            }`}
          >
            <h3>
              <button
                type="button"
                onClick={() => setOuvert(actif ? null : i)}
                aria-expanded={actif}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-medium text-marine transition-colors hover:text-bleu"
              >
                <span className="flex items-center gap-3">
                  <Spark
                    className={`h-3.5 w-3.5 shrink-0 transition-colors ${
                      actif ? "text-bleu" : "text-bordure"
                    }`}
                  />
                  {item.q}
                </span>
                <svg
                  className={`h-5 w-5 shrink-0 text-texte-secondaire transition-transform duration-300 ${
                    actif ? "rotate-45" : ""
                  }`}
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M10 4v12M4 10h12"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </h3>
            <div
              className={`grid transition-all duration-300 ease-out ${
                actif ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 pl-[3.25rem] text-sm leading-relaxed text-texte-secondaire">
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
