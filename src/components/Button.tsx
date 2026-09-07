import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "plein" | "contour" | "contour-clair";

const base =
  "inline-flex items-center justify-center rounded px-4 py-2.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-bleu focus-visible:ring-offset-2 disabled:opacity-50";

const variants: Record<Variant, string> = {
  // Un seul bouton "plein" (bleu) par section — cf. charte graphique
  plein: "bg-bleu text-white hover:bg-bleu/90",
  contour: "border border-bleu text-bleu hover:bg-bleu/5",
  // Variante contour pour les bandeaux à fond sombre (ex: hero marine).
  "contour-clair": "border border-white/40 text-white hover:bg-white/10",
};

export function Button({
  href,
  variant = "plein",
  children,
  ...props
}: {
  href?: string;
  variant?: Variant;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  const className = `${base} ${variants[variant]}`;

  if (href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
}
