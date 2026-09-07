"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "./Container";
import { Button } from "./Button";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();

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

        <Button href="/contact?type=devis">Demander un devis</Button>
      </Container>
    </header>
  );
}
