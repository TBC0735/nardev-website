"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

// Apparition douce au scroll : fondu + légère montée, jouée une seule fois.
// IntersectionObserver + animation CSS (.reveal / .is-visible), sans librairie,
// neutralisée par prefers-reduced-motion (voir globals.css).

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [seen]);

  return { ref, seen };
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Retard en ms avant l'apparition (utile pour une cascade). */
  delay?: number;
  as?: ElementType;
};

export function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: RevealProps) {
  const { ref, seen } = useInView<HTMLElement>();
  const style: CSSProperties = delay
    ? { animationDelay: `${delay}ms` }
    : {};
  return (
    <Tag
      ref={ref}
      style={style}
      className={`reveal ${seen ? "is-visible" : ""} ${className}`}
    >
      {children}
    </Tag>
  );
}

/** Conteneur d'une cascade — passer `index` à chaque `RevealItem`. */
export function RevealGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}

export function RevealItem({
  children,
  className = "",
  index = 0,
}: {
  children: ReactNode;
  className?: string;
  index?: number;
}) {
  return (
    <Reveal delay={Math.min(index, 10) * 65} className={className}>
      {children}
    </Reveal>
  );
}
