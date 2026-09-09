"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Chiffre-clé. Si `value` est un nombre simple (éventuellement suivi d'un
 * symbole court comme « + » ou « % »), il est animé en comptant à partir de 0
 * quand l'élément entre à l'écran. Sinon, affiché tel quel.
 * Respecte prefers-reduced-motion.
 */
export function Stat({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const m = value.match(/^(\d+)\s*([%+]?)$/);
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!m || reduce) {
      setShown(value);
      return;
    }

    const target = parseInt(m[1], 10);
    const suffix = m[2];

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const dur = 800;
        const tick = (now: number) => {
          const p = Math.min((now - start) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setShown(`${Math.round(target * eased)}${suffix}`);
          if (p < 1) requestAnimationFrame(tick);
        };
        setShown(`0${suffix}`);
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return (
    <div ref={ref}>
      <p className="text-3xl font-bold tracking-tight text-marine sm:text-4xl">
        {shown}
      </p>
      <p className="mt-1.5 text-sm text-texte-secondaire">{label}</p>
    </div>
  );
}
