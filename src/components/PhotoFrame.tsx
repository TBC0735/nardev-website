import Image from "next/image";
import type { ReactNode } from "react";

/**
 * Cadre visuel réutilisable.
 * - `browser` : entoure l'image d'un bandeau de navigateur (idéal pour une
 *   capture de site) et cadre par le haut.
 * - sans `imageUrl` : composition graphique sobre (dégradé + grille de points
 *   + icône éventuelle), jamais d'image « bouche-trou ».
 */
export function PhotoFrame({
  imageUrl,
  alt,
  icon,
  className = "",
  sizes = "100vw",
  priority = false,
  rounded = true,
  fit = "cover",
  align = "center",
  browser = false,
}: {
  imageUrl?: string | null;
  alt: string;
  icon?: ReactNode;
  className?: string;
  sizes?: string;
  priority?: boolean;
  rounded?: boolean;
  fit?: "cover" | "contain";
  align?: "center" | "top";
  browser?: boolean;
}) {
  const pos = align === "top" ? "object-top" : "object-center";
  const radius = rounded ? "rounded-xl" : "";

  if (imageUrl && browser) {
    return (
      <div
        className={`group/frame overflow-hidden border border-bordure bg-white shadow-card ${radius} ${className}`}
      >
        <div className="flex items-center gap-1.5 border-b border-bordure bg-fond-alt px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-bordure" />
          <span className="h-2 w-2 rounded-full bg-bordure" />
          <span className="h-2 w-2 rounded-full bg-bordure" />
        </div>
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <Image
            src={imageUrl}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover object-top motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out group-hover:motion-safe:scale-[1.02]"
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`group/frame relative overflow-hidden ${radius} ${
        imageUrl
          ? "bg-fond-alt"
          : "bg-gradient-to-br from-marine via-marine-700 to-bleu-600"
      } ${className}`}
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={`${
            fit === "contain" ? "object-contain" : `object-cover ${pos}`
          } motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out group-hover:motion-safe:scale-[1.03]`}
        />
      ) : (
        <>
          <div aria-hidden className="bg-dots absolute inset-0 opacity-60" />
          <div
            aria-hidden
            className="absolute -right-8 -top-8 h-32 w-32 rounded-2xl border border-white/10"
          />
          <div
            aria-hidden
            className="absolute bottom-4 left-4 h-16 w-16 rounded-full border border-white/10"
          />
          {icon && (
            <div className="absolute inset-0 flex items-center justify-center text-white/90">
              {icon}
            </div>
          )}
        </>
      )}
    </div>
  );
}
