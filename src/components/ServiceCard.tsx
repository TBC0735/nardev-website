import Link from "next/link";
import type { Service } from "@prisma/client";
import { ServiceIcon } from "@/lib/service-icons";
import { ArrowRightIcon } from "./icons";

/** Carte service — icône SVG, résumé, flèche animée au survol. */
export function ServiceCard({
  service,
  moreLabel,
}: {
  service: Service;
  moreLabel: string;
}) {
  return (
    <Link
      href={`/services#${service.slug}`}
      className="group relative flex h-full flex-col rounded-xl border border-bordure bg-white p-6 no-underline shadow-card transition-all duration-200 hover:border-bleu/40 hover:shadow-card-hover motion-safe:hover:-translate-y-1"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-ciel text-bleu transition-colors group-hover:bg-bleu group-hover:text-white">
        <ServiceIcon slug={service.slug} className="h-6 w-6" />
      </span>
      <p className="mt-5 text-lg font-semibold text-marine">{service.titre}</p>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-texte-secondaire">
        {service.resume}
      </p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-bleu">
        {moreLabel}
        <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
