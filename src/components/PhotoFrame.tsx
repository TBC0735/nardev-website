import Image from "next/image";

/**
 * Cadre photo réutilisable (hero, cartes service, portfolio…).
 * Tant qu'aucune vraie photo n'est fournie (`imageUrl` vide), affiche un
 * dégradé doux dans les tons de la charte plutôt qu'un rectangle gris terne.
 */
export function PhotoFrame({
  imageUrl,
  alt,
  icon = "✨",
  iconClassName = "text-5xl",
  className = "",
  sizes = "100vw",
  priority = false,
  rounded = true,
  fit = "cover",
}: {
  imageUrl?: string | null;
  alt: string;
  icon?: string;
  iconClassName?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Désactiver pour un usage plein-bleed (ex: hero pleine largeur). */
  rounded?: boolean;
  /** "contain" pour une capture d'écran de site (ne rien couper, texte lisible). */
  fit?: "cover" | "contain";
}) {
  return (
    <div
      className={`relative overflow-hidden ${rounded ? "rounded-lg" : ""} ${imageUrl ? "bg-fond-alt" : "bg-gradient-to-br from-marine via-bleu to-marine/70"} ${className}`}
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={fit === "contain" ? "object-contain" : "object-cover"}
        />
      ) : (
        <div
          className={`absolute inset-0 flex items-center justify-center ${iconClassName}`}
          aria-hidden="true"
        >
          {icon}
        </div>
      )}
    </div>
  );
}
