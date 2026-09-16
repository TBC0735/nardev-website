"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Container } from "./Container";
import { Button } from "./Button";
import { LangToggle } from "./LangToggle";
import { MenuIcon, CloseIcon } from "./icons";
import type { Locale } from "@/i18n/config";
import type { Dict } from "@/i18n/dictionaries";

export function Header({ dict, locale }: { dict: Dict; locale: Locale }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const navLinks = [
    { href: "/services", label: dict.nav.services },
    { href: "/portfolio", label: dict.nav.portfolio },
    { href: "/a-propos", label: dict.nav.about },
    { href: "/faq", label: dict.nav.faq },
    { href: "/contact", label: dict.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || open
          ? "border-bordure bg-white/85 backdrop-blur-md"
          : "border-transparent bg-white"
      }`}
    >
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link href="/" className="shrink-0 no-underline" aria-label="Nardev">
          <Image
            src="/logo.png"
            alt="Nardev"
            width={1636}
            height={240}
            priority
            className="h-8 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-3 py-1.5 text-sm font-medium no-underline transition-colors ${
                  active
                    ? "bg-ciel text-bleu-600"
                    : "text-texte hover:bg-fond-alt hover:text-bleu"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LangToggle current={locale} label={dict.langToggle.label} />
          <div className="hidden sm:block">
            <Button href="/contact?type=devis#formulaire" size="md">
              {dict.cta.quote}
            </Button>
          </div>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? dict.nav.close : dict.nav.menu}
            className="rounded-lg p-2 text-marine hover:bg-fond-alt md:hidden"
          >
            {open ? (
              <CloseIcon className="h-6 w-6" />
            ) : (
              <MenuIcon className="h-6 w-6" />
            )}
          </button>
        </div>
      </Container>

      {/* Menu mobile */}
      <div
        className={`overflow-hidden border-bordure bg-white transition-[max-height] duration-300 ease-out md:hidden ${
          open ? "max-h-96 border-t" : "max-h-0"
        }`}
      >
        <Container className="flex flex-col gap-1 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-3 py-2.5 text-sm font-medium no-underline ${
                isActive(link.href)
                  ? "bg-ciel text-bleu-600"
                  : "text-texte hover:bg-fond-alt"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Button href="/contact?type=devis#formulaire" className="mt-2 w-full">
            {dict.cta.quote}
          </Button>
        </Container>
      </div>
    </header>
  );
}
