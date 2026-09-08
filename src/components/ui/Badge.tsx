import type { ReactNode } from "react";

type Variant = "bleu" | "succes" | "neutre" | "clair";

const variants: Record<Variant, string> = {
  bleu: "bg-ciel text-bleu-600 ring-1 ring-inset ring-bleu/15",
  succes: "bg-succes/10 text-succes ring-1 ring-inset ring-succes/20",
  neutre: "bg-fond-alt text-texte-secondaire ring-1 ring-inset ring-bordure",
  clair: "bg-white/10 text-white ring-1 ring-inset ring-white/20",
};

/** Pastille compacte pour un statut, une techno, un label. */
export function Badge({
  children,
  variant = "bleu",
  className = "",
}: {
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
