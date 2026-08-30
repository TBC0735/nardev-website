import Link from "next/link";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="border-t border-bordure bg-marine text-white">
      <Container className="grid gap-8 py-12 sm:grid-cols-3">
        <div>
          <p className="text-lg font-bold">Nardev</p>
          <p className="mt-2 text-sm text-white/70">
            Agence web — sites vitrines, sites dynamiques, print et visibilité
            Google.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold">Navigation</p>
          <ul className="mt-2 space-y-1 text-sm text-white/70">
            <li>
              <Link href="/services" className="text-white/70 no-underline hover:text-white">
                Services
              </Link>
            </li>
            <li>
              <Link href="/portfolio" className="text-white/70 no-underline hover:text-white">
                Portfolio
              </Link>
            </li>
            <li>
              <Link href="/a-propos" className="text-white/70 no-underline hover:text-white">
                À propos
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-white/70 no-underline hover:text-white">
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/mentions-legales"
                className="text-white/70 no-underline hover:text-white"
              >
                Mentions légales
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold">Contact</p>
          <ul className="mt-2 space-y-1 text-sm text-white/70">
            <li>contact@nardev.sn</li>
            <li>+221 —</li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10 py-4 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Nardev. Tous droits réservés.
      </div>
    </footer>
  );
}
