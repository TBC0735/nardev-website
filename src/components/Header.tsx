"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Container } from "./Container";
import { Button } from "./Button";
import { FacebookIcon, InstagramIcon, LinkedinIcon, PhoneIcon } from "./icons";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

// Coordonnées et réseaux sociaux : mêmes placeholders que le footer, à remplacer
// par les vraies infos de l'agence.
const reseaux = [
  { label: "Facebook", href: "#", Icon: FacebookIcon },
  { label: "Instagram", href: "#", Icon: InstagramIcon },
  { label: "LinkedIn", href: "#", Icon: LinkedinIcon },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="bg-marine text-white/70">
        <Container className="flex h-9 items-center justify-between text-xs">
          <a href="mailto:contact@nardev.sn" className="text-white/70 no-underline hover:text-white">
            contact@nardev.sn
          </a>
          <div className="flex items-center gap-4">
            <a href="tel:+221" className="flex items-center gap-1.5 text-white/70 no-underline hover:text-white">
              <PhoneIcon className="h-3.5 w-3.5" />
              +221 —
            </a>
            <div className="flex items-center gap-2">
              {reseaux.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-6 w-6 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>
        </Container>
      </div>

      <motion.header
        animate={{
          boxShadow: scrolled
            ? "0 8px 20px -12px rgba(16,23,42,0.25)"
            : "0 0 0 0 rgba(16,23,42,0)",
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="sticky top-0 z-50 border-b border-bordure bg-white/95 backdrop-blur"
      >
        <Container className="flex h-20 items-center justify-between">
          <Link href="/" className="relative block h-16 w-64 shrink-0 no-underline">
            <Image
              src="/logo.png"
              alt="Nardev"
              fill
              priority
              sizes="256px"
              className="object-contain object-left"
            />
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative py-1 text-sm font-medium text-texte no-underline transition-colors hover:text-bleu"
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-0.5 left-0 right-0 h-0.5 rounded-full bg-bleu"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <Button href="/contact?type=devis">Demander un devis</Button>
        </Container>
      </motion.header>
    </>
  );
}
