import Link from "next/link";
import { Container } from "./Container";
import { Button } from "./Button";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-bordure bg-white">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="text-lg font-bold text-marine no-underline">
          Nardev
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-texte no-underline hover:text-bleu"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Button href="/contact?type=devis">Demander un devis</Button>
      </Container>
    </header>
  );
}
