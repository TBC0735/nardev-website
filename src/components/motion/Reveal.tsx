"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// Apparition douce au scroll : léger fondu + montée de quelques pixels, jouée
// une seule fois. Fait maison (IntersectionObserver + CSS), sans librairie, et
// neutralisée si l'utilisateur préfère moins de mouvement (motion-safe).

function useRevele<T extends HTMLElement>(delay = 0) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    let timer: ReturnType<typeof setTimeout>;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timer = setTimeout(() => setVisible(true), delay);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [delay]);

  return { ref, visible };
}

const classes = (visible: boolean, className?: string) =>
  `motion-safe:transition-all motion-safe:duration-[600ms] ease-out ${
    visible ? "opacity-100 translate-y-0" : "opacity-0 motion-safe:translate-y-3"
  } ${className ?? ""}`;

/** Fondu discret à l'apparition pour un bloc isolé (titres de section, bandeaux…). */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useRevele<HTMLDivElement>(delay);
  return (
    <div ref={ref} className={classes(visible, className)}>
      {children}
    </div>
  );
}

/** Conteneur d'éléments révélés à l'apparition. */
export function RevealGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}

/**
 * Élément d'une `RevealGroup`. `index` décale légèrement l'apparition pour
 * créer une cascade quand le groupe entre dans le champ de vision.
 */
export function RevealItem({
  children,
  className,
  index = 0,
}: {
  children: ReactNode;
  className?: string;
  index?: number;
}) {
  const { ref, visible } = useRevele<HTMLDivElement>(Math.min(index, 8) * 70);
  return (
    <div ref={ref} className={classes(visible, className)}>
      {children}
    </div>
  );
}
