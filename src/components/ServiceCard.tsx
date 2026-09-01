import Link from "next/link";
import type { Service } from "@prisma/client";
import { PhotoFrame } from "./PhotoFrame";
import { serviceIcon } from "@/lib/service-icons";

/** Carte service de l'accueil — cliquable vers l'ancre du service sur /services. */
export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services#${service.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-bordure bg-white no-underline transition-all duration-200 hover:-translate-y-0.5 hover:border-bleu hover:shadow-sm"
    >
      <PhotoFrame
        imageUrl={service.imageUrl}
        alt={service.titre}
        icon={serviceIcon(service.slug)}
        fit="contain"
        className="aspect-[16/10] w-full"
        sizes="(min-width: 1024px) 560px, (min-width: 640px) 45vw, 90vw"
      />
      <div className="p-5">
        <p className="font-semibold text-marine">{service.titre}</p>
        <p className="mt-2 text-sm text-texte-secondaire">{service.resume}</p>
      </div>
    </Link>
  );
}
