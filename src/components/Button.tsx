import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "plein" | "contour" | "contour-clair" | "clair";
type Size = "md" | "lg";

const base =
  "group/btn inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-bleu focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 motion-safe:active:scale-[0.97]";

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-[0.95rem]",
};

const variants: Record<Variant, string> = {
  plein:
    "bg-bleu text-white shadow-sm hover:bg-bleu-600 hover:shadow-card-hover motion-safe:hover:-translate-y-0.5",
  contour:
    "border border-bordure bg-white text-marine hover:border-bleu hover:text-bleu",
  "contour-clair":
    "border border-white/25 text-white hover:bg-white/10 hover:border-white/40",
  clair: "bg-white text-marine shadow-sm hover:bg-white/90 motion-safe:hover:-translate-y-0.5",
};

export function Button({
  href,
  variant = "plein",
  size = "md",
  children,
  className: extra = "",
  ...props
}: {
  href?: string;
  variant?: Variant;
  size?: Size;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  const className =
    `${base} ${sizes[size]} ${variants[variant]} ${extra}`.trim();

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
