import type { ReactNode } from "react";
import { Container } from "@/components/Container";
import { Eyebrow } from "./Eyebrow";

/** Bandeau de titre navy en haut des pages intérieures. */
export function PageHero({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-marine text-white">
      <div aria-hidden className="bg-dots absolute inset-0 opacity-45" />
      <div
        aria-hidden
        className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-bleu/20 blur-[120px]"
      />
      <Container className="relative py-16 lg:py-24">
        <Eyebrow tone="light">{eyebrow}</Eyebrow>
        <h1 className="mt-4 max-w-3xl text-display-sm font-bold text-white sm:text-display">
          {title}
        </h1>
        {lead && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
            {lead}
          </p>
        )}
        {children}
      </Container>
    </section>
  );
}
