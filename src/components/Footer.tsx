import Link from "next/link";
import { Container } from "./Container";
import { Spark } from "./ui/Spark";
import { MailIcon, PhoneIcon, WhatsappIcon } from "./icons";
import type { Dict } from "@/i18n/dictionaries";

export function Footer({ dict }: { dict: Dict }) {
  const t = dict.footer;
  const year = new Date().getFullYear();

  const nav = [
    { href: "/services", label: dict.nav.services },
    { href: "/portfolio", label: dict.nav.portfolio },
    { href: "/a-propos", label: dict.nav.about },
    { href: "/faq", label: dict.nav.faq },
  ];
  const secondary = [
    { href: "/contact", label: dict.nav.contact },
    { href: "/mentions-legales", label: dict.nav.legal },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-marine text-white">
      <div
        aria-hidden
        className="bg-dots absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent_60%)]"
      />
      <Container className="relative">
        <div className="grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr] lg:gap-16">
          <div>
            <p className="flex items-center gap-2 text-xl font-bold tracking-tight">
              NAR<span className="text-bleu-400">DEV</span>
              <Spark className="h-4 w-4 text-bleu-300" />
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/60">
              {t.tagline}
            </p>
            <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs text-white/80 ring-1 ring-inset ring-white/15">
              <span aria-hidden>🇸🇳</span> {t.location}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/50">
              {t.navTitle}
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[...nav, ...secondary].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 no-underline transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/50">
              {t.contactTitle}
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-white/70">
              <li>
                <a
                  href="mailto:contact@nardev.sn"
                  className="inline-flex items-center gap-2 text-white/70 no-underline hover:text-white"
                >
                  <MailIcon className="h-4 w-4" /> contact@nardev.sn
                </a>
              </li>
              <li className="inline-flex items-center gap-2">
                <PhoneIcon className="h-4 w-4" /> +221 —
              </li>
              <li className="inline-flex items-center gap-2">
                <WhatsappIcon className="h-4 w-4" /> WhatsApp {t.soon}
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-6 text-xs text-white/50 sm:flex-row">
          <p>
            © {year} Nardev. {t.rights}
          </p>
          <p className="inline-flex items-center gap-1.5">
            {t.builtWith} <Spark className="h-3 w-3 text-bleu-300" />
          </p>
        </div>
      </Container>
    </footer>
  );
}
