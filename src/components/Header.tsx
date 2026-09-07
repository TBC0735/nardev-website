"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "./Container";
import { Button } from "./Button";
import { LangToggle } from "./LangToggle";
import type { Locale } from "@/i18n/config";
import type { Dict } from "@/i18n/dictionaries";

export function Header({ dict, locale }: { dict: Dict; locale: Locale }) {
  const pathname = usePathname();

  const navLinks = [
    { href: "/services", label: dict.nav.services },
    { href: "/portfolio", label: dict.nav.portfolio },
    { href: "/a-propos", label: dict.nav.about },
    { href: "/faq", label: dict.nav.faq },
    { href: "/contact", label: dict.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-bordure bg-white">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link href="/" className="shrink-0 no-underline">
          <Image
            src="/logo.png"
            alt="Nardev"
            width={1636}
            height={240}
            priority
            className="h-8 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`border-b-2 py-1 text-sm font-medium no-underline transition-colors hover:text-bleu ${
                  active
                    ? "border-bleu text-bleu"
                    : "border-transparent text-texte"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <LangToggle current={locale} label={dict.langToggle.label} />
          <Button href="/contact?type=devis">{dict.cta.quote}</Button>
        </div>
      </Container>
    </header>
  );
}
