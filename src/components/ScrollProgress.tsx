"use client";

import { useEffect, useRef } from "react";

/**
 * Barre de progression de lecture — fine, en haut de l'écran, sous le header.
 * Se remplit selon le scroll réel et redescend quand on remonte.
 * Écrit directement la largeur via une ref (pas de re-render à chaque frame).
 */
export function ScrollProgress() {
  const barre = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      const p = max > 0 ? Math.min(el.scrollTop / max, 1) : 0;
      if (barre.current) barre.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5"
    >
      <div
        ref={barre}
        className="h-full origin-left bg-gradient-to-r from-bleu to-bleu-400 transition-transform duration-150 ease-out"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
