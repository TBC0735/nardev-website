"use client";

import { ServiceIcon } from "@/lib/service-icons";

/** Décalage pour ne pas cacher le titre sous le header collant. */
const OFFSET = 88;

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  const targetY =
    el.getBoundingClientRect().top + window.scrollY - OFFSET;
  const startY = window.scrollY;
  const diff = targetY - startY;

  const reduce = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  if (reduce || Math.abs(diff) < 4) {
    window.scrollTo(0, targetY);
    history.replaceState(null, "", `#${id}`);
    return;
  }

  // Durée douce : ~600 ms de base, un peu plus pour les longues distances,
  // plafonnée pour ne jamais traîner.
  const duration = Math.min(900, Math.max(600, Math.abs(diff) * 0.35));
  let start: number | undefined;

  const step = (ts: number) => {
    if (start === undefined) start = ts;
    const elapsed = ts - start;
    const t = Math.min(elapsed / duration, 1);
    window.scrollTo(0, startY + diff * easeInOutCubic(t));
    if (elapsed < duration) requestAnimationFrame(step);
    else history.replaceState(null, "", `#${id}`);
  };
  requestAnimationFrame(step);
}

/** Puces d'ancrage (haut de la page Services) avec défilement fluide maîtrisé. */
export function SmoothAnchors({
  items,
}: {
  items: { slug: string; titre: string }[];
}) {
  return (
    <div className="mt-8 flex flex-wrap gap-2">
      {items.map((s) => (
        <a
          key={s.slug}
          href={`#${s.slug}`}
          onClick={(e) => {
            e.preventDefault();
            scrollToId(s.slug);
          }}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-sm text-white/80 no-underline transition-colors hover:border-white/40 hover:text-white"
        >
          <ServiceIcon slug={s.slug} className="h-4 w-4" />
          {s.titre}
        </a>
      ))}
    </div>
  );
}
