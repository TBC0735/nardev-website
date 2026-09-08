"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Chiffre-clé : compte à rebours animé quand l'élément entre à l'écran, si un
 * nombre est détecté dans `value` (ex. "48 h" → anime 0…48). Sinon affiché tel
 * quel. Respecte prefers-reduced-motion.
 */
export function Stat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const match = value.match(/\d[\d\s]*/);
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!match || reduce) return;

    const target = parseInt(match[0].replace(/\s/g, ""), 10);
    const prefix = value.slice(0, match.index);
    const suffix = value.slice((match.index ?? 0) + match[0].length);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const duration = 900;
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setShown(`${prefix}${Math.round(target * eased)}${suffix}`);
          if (p < 1) requestAnimationFrame(tick);
        };
        setShown(`${prefix}0${suffix}`);
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return (
    <div ref={ref}>
      <p className="text-3xl font-bold tracking-tight text-marine sm:text-4xl">
        {shown}
      </p>
      <p className="mt-1 text-sm text-texte-secondaire">{label}</p>
    </div>
  );
}
