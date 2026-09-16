import type { ReactNode } from "react";

/**
 * Sur-titre de section : petit trait bleu + label en capitales espacées.
 * Sobre, pas d'icône décorative.
 */
export function Eyebrow({
  children,
  tone = "default",
  className = "",
}: {
  children: ReactNode;
  tone?: "default" | "light";
  className?: string;
}) {
  const color = tone === "light" ? "text-bleu-300" : "text-bleu-600";
  const bar = tone === "light" ? "bg-bleu-300/60" : "bg-bleu/50";
  return (
    <span
      className={`inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.16em] ${color} ${className}`}
    >
      <span className={`h-px w-6 ${bar}`} aria-hidden="true" />
      {children}
    </span>
  );
}
