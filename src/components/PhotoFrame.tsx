import Image from "next/image";
import type { ReactNode } from "react";
import { Spark } from "./ui/Spark";

/**
 * Cadre visuel réutilisable (hero, cartes service, portfolio…).
 * Sans photo (`imageUrl` vide), affiche un aplat dégradé navy → bleu avec un
 * motif de points et, au centre, l'icône fournie (ou l'étincelle par défaut).
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
}: {
  imageUrl?: string | null;
  alt: string;
  icon?: ReactNode;
  className?: string;
  sizes?: string;
  priority?: boolean;
  rounded?: boolean;
  fit?: "cover" | "contain";
}) {
  return (
    <div
      className={`group/frame relative overflow-hidden ${
        rounded ? "rounded-xl" : ""
      } ${
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
            fit === "contain" ? "object-contain" : "object-cover"
          } motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out group-hover:motion-safe:scale-[1.03]`}
        />
      ) : (
        <>
          <div
            aria-hidden
            className="bg-dots absolute inset-0 opacity-70"
          />
          <div
            aria-hidden
            className="absolute inset-0 flex items-center justify-center text-white/90 motion-safe:transition-transform motion-safe:duration-500 group-hover:motion-safe:scale-105"
          >
            {icon ?? <Spark className="h-10 w-10 animate-spark-pulse" />}
          </div>
        </>
      )}
    </div>
  );
}
