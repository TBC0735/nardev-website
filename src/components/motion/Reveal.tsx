"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// Charte : « pas d'effets voyants ». On se limite à un fondu discret à
// l'apparition, joué une seule fois. Fait maison (IntersectionObserver + CSS)
// pour ne pas embarquer de librairie d'animation.

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
      { rootMargin: "-40px" },
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
  `transition-opacity duration-500 ease-out ${visible ? "opacity-100" : "opacity-0"} ${className ?? ""}`;

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

/** Élément d'une `RevealGroup` — même fondu discret. */
export function RevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { ref, visible } = useRevele<HTMLDivElement>(0);
  return (
    <div ref={ref} className={classes(visible, className)}>
      {children}
    </div>
  );
}
