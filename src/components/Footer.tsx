import Link from "next/link";
import { Container } from "./Container";
import type { Dict } from "@/i18n/dictionaries";

export function Footer({ dict }: { dict: Dict }) {
  const links = [
    { href: "/services", label: dict.nav.services },
    { href: "/portfolio", label: dict.nav.portfolio },
    { href: "/a-propos", label: dict.nav.about },
    { href: "/faq", label: dict.nav.faq },
    { href: "/contact", label: dict.nav.contact },
    { href: "/mentions-legales", label: dict.nav.legal },
  ];

  return (
    <footer className="border-t border-bordure bg-marine text-white">
      <Container className="grid gap-8 py-12 sm:grid-cols-3">
        <div>
          <p className="text-lg font-bold">Nardev</p>
          <p className="mt-2 text-sm text-white/70">{dict.footer.tagline}</p>
        </div>

        <div>
          <p className="text-sm font-semibold">{dict.footer.navTitle}</p>
          <ul className="mt-2 space-y-1 text-sm text-white/70">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-white/70 no-underline hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold">{dict.footer.contactTitle}</p>
          <ul className="mt-2 space-y-1 text-sm text-white/70">
            <li>contact@nardev.sn</li>
            <li>+221 —</li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10 py-4 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Nardev. {dict.footer.rights}
      </div>
    </footer>
  );
}
