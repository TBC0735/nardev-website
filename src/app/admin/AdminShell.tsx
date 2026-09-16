"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useEffect, useState, type ReactNode } from "react";
import {
  HomeIcon,
  LayersIcon,
  FolderIcon,
  MailIcon,
  UserIcon,
  ExternalLinkIcon,
  LogOutIcon,
  MenuIcon,
  CloseIcon,
} from "@/components/icons";

const links = [
  { href: "/admin", label: "Tableau de bord", icon: HomeIcon, exact: true },
  { href: "/admin/services", label: "Services", icon: LayersIcon },
  { href: "/admin/portfolio", label: "Portfolio", icon: FolderIcon },
  { href: "/admin/messages", label: "Messages", icon: MailIcon },
  { href: "/admin/equipe", label: "Équipe", icon: UserIcon },
];

function NavLinks({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <nav className="flex flex-col gap-1">
      {links.map((l) => {
        const active = l.exact ? pathname === l.href : pathname.startsWith(l.href);
        return (
          <Link
            key={l.href}
            href={l.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium no-underline transition-colors ${
              active
                ? "bg-ciel text-bleu-600"
                : "text-texte-secondaire hover:bg-fond-alt hover:text-marine"
            }`}
          >
            <l.icon className="h-4 w-4 shrink-0" />
            {l.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function AdminShell({
  email,
  children,
}: {
  email: string;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  const current = links.find((l) =>
    l.exact ? pathname === l.href : pathname.startsWith(l.href),
  );

  return (
    <div className="min-h-screen bg-fond-alt">
      <div className="mx-auto flex max-w-7xl">
        {/* Sidebar — desktop */}
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-bordure bg-white md:flex">
          <Link
            href="/"
            className="flex items-center px-5 py-5 no-underline"
            aria-label="Nardev"
          >
            <Image src="/logo.png" alt="Nardev" width={1636} height={240} className="h-6 w-auto" />
          </Link>
          <div className="flex-1 overflow-y-auto px-3">
            <NavLinks pathname={pathname} />
          </div>
          <div className="space-y-1 border-t border-bordure p-3">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-texte-secondaire no-underline transition-colors hover:bg-fond-alt hover:text-marine"
            >
              <ExternalLinkIcon className="h-4 w-4" />
              Voir le site
            </Link>
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm font-medium text-erreur transition-colors hover:bg-erreur/5"
            >
              <LogOutIcon className="h-4 w-4" />
              Se déconnecter
            </button>
          </div>
        </aside>

        {/* Colonne principale */}
        <div className="min-w-0 flex-1">
          {/* Barre du haut */}
          <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-bordure bg-white/90 px-4 py-3.5 backdrop-blur md:px-8">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-label="Menu"
                className="rounded-lg p-1.5 text-marine hover:bg-fond-alt md:hidden"
              >
                {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
              </button>
              <p className="font-semibold text-marine">
                {current?.label ?? "Back-office"}
              </p>
            </div>
            <p className="hidden truncate text-sm text-texte-secondaire sm:block">
              {email}
            </p>
          </header>

          {/* Menu mobile */}
          <div
            className={`overflow-hidden border-b border-bordure bg-white transition-[max-height] duration-300 ease-out md:hidden ${
              open ? "max-h-96" : "max-h-0"
            }`}
          >
            <div className="space-y-1 p-3">
              <NavLinks pathname={pathname} onNavigate={() => setOpen(false)} />
              <div className="mt-1 space-y-1 border-t border-bordure pt-2">
                <Link
                  href="/"
                  target="_blank"
                  className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-texte-secondaire no-underline hover:bg-fond-alt hover:text-marine"
                >
                  <ExternalLinkIcon className="h-4 w-4" />
                  Voir le site
                </Link>
                <button
                  type="button"
                  onClick={() => signOut({ callbackUrl: "/admin/login" })}
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm font-medium text-erreur hover:bg-erreur/5"
                >
                  <LogOutIcon className="h-4 w-4" />
                  Se déconnecter
                </button>
              </div>
            </div>
          </div>

          <main className="p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
