import Image from "next/image";
import Link from "next/link";
import { Container } from "./Container";
import { Button } from "./Button";
import { MailIcon, PhoneIcon, WhatsappIcon } from "./icons";
import type { Dict } from "@/i18n/dictionaries";

export function Footer({ dict }: { dict: Dict }) {
  const t = dict.footer;
  const year = new Date().getFullYear();

  const site = [
    { href: "/a-propos", label: dict.nav.about },
    { href: "/portfolio", label: dict.nav.portfolio },
    { href: "/faq", label: dict.nav.faq },
    { href: "/mentions-legales", label: dict.nav.legal },
  ];
  const services = [
    { href: "/services#sites-vitrines", label: "Sites vitrines" },
    { href: "/services#sites-dynamiques", label: "Sites dynamiques" },
    { href: "/services#flyers-affiches", label: "Flyers & affiches" },
    { href: "/services#visibilite-google", label: "Visibilité Google" },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-marine text-white">
      <div
        aria-hidden
        className="bg-dots absolute inset-0 opacity-30 [mask-image:linear-gradient(to_bottom,black,transparent_55%)]"
      />
      <Container className="relative">
        {/* Bandeau CTA */}
        <div className="flex flex-col items-start justify-between gap-6 border-b border-white/10 py-12 sm:flex-row sm:items-center">
          <div>
            <p className="text-xl font-bold tracking-tight">{t.ctaTitle}</p>
            <p className="mt-1 text-sm text-white/60">{t.ctaText}</p>
          </div>
          <Button href="/contact?type=devis#formulaire" variant="clair" size="lg">
            {dict.cta.quote}
          </Button>
        </div>

        {/* Colonnes */}
        <div className="grid gap-10 py-14 md:grid-cols-[1.5fr_1fr_1fr_1.1fr] lg:gap-12">
          <div>
            <Link href="/" className="inline-block no-underline">
              <Image
                src="/logo.png"
                alt="Nardev"
                width={1636}
                height={240}
                className="h-7 w-auto brightness-0 invert"
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              {t.tagline}
            </p>
            <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs text-white/80 ring-1 ring-inset ring-white/15">
              <span aria-hidden>🇸🇳</span> {t.location}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/45">
              {t.navTitle}
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {site.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-white/65 no-underline transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/45">
              {dict.nav.services}
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {services.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-white/65 no-underline transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/45">
              {t.contactTitle}
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-white/65">
              <li>
                <a
                  href="mailto:contact@nardev.sn"
                  className="inline-flex items-center gap-2 no-underline hover:text-white"
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

        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-6 text-xs text-white/45 sm:flex-row">
          <p>
            © {year} Nardev. {t.rights}
          </p>
          <p>{t.builtWith}</p>
        </div>
      </Container>
    </footer>
  );
}
