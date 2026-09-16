import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { LayersIcon, FolderIcon, MailIcon, UserIcon } from "@/components/icons";

export const dynamic = "force-dynamic";

async function getCounts() {
  try {
    const [services, projets, membres, messages, nonLus] = await Promise.all([
      prisma.service.count(),
      prisma.projet.count(),
      prisma.membre.count(),
      prisma.message.count(),
      prisma.message.count({ where: { lu: false } }),
    ]);
    return { services, projets, membres, messages, nonLus };
  } catch {
    return { services: 0, projets: 0, membres: 0, messages: 0, nonLus: 0 };
  }
}

export default async function AdminDashboardPage() {
  const counts = await getCounts();

  const cartes = [
    {
      href: "/admin/services",
      label: "Services",
      value: counts.services,
      icon: LayersIcon,
    },
    {
      href: "/admin/portfolio",
      label: "Projets",
      value: counts.projets,
      icon: FolderIcon,
    },
    {
      href: "/admin/messages",
      label: "Messages",
      value: counts.messages,
      badge: counts.nonLus > 0 ? `${counts.nonLus} non lu(s)` : undefined,
      icon: MailIcon,
    },
    {
      href: "/admin/equipe",
      label: "Équipe",
      value: counts.membres,
      icon: UserIcon,
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-marine">
        Tableau de bord
      </h1>
      <p className="mt-1.5 text-sm text-texte-secondaire">
        Vue d&apos;ensemble du contenu du site. Cliquez sur une carte pour
        gérer cette section.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cartes.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="group relative overflow-hidden rounded-xl border border-bordure bg-white p-5 no-underline shadow-card transition-all duration-200 hover:border-bleu/40 hover:shadow-card-hover motion-safe:hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-ciel text-bleu">
                <c.icon className="h-5 w-5" />
              </span>
              {c.badge && (
                <span className="rounded-full bg-erreur/10 px-2 py-0.5 text-xs font-semibold text-erreur">
                  {c.badge}
                </span>
              )}
            </div>
            <p className="mt-4 text-2xl font-bold text-marine">{c.value}</p>
            <p className="mt-0.5 text-sm text-texte-secondaire">{c.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 rounded-xl border border-bordure bg-white p-5">
        <p className="text-sm font-semibold text-marine">Rappel</p>
        <p className="mt-1.5 text-sm leading-relaxed text-texte-secondaire">
          Les modifications faites ici (services, portfolio, équipe, messages)
          sont immédiatement visibles sur le site public.
        </p>
      </div>
    </div>
  );
}
