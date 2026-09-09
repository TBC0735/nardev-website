import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { CtaPanel } from "@/components/CtaPanel";
import { getDict } from "@/i18n/server";
import { FaqAccordion } from "./FaqAccordion";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Délais de livraison, tarifs, hébergement, maintenance, paiement : les réponses aux questions les plus fréquentes sur nos prestations.",
};
export const dynamic = "force-dynamic";

export default function FaqPage() {
  const dict = getDict();
  const t = dict.faq;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero
        eyebrow={t.eyebrow}
        title={t.title}
        lead={
          <>
            {t.intro}{" "}
            <Link
              href="/contact"
              className="text-bleu-300 no-underline hover:text-white"
            >
              {t.contactLink}
            </Link>
            .
          </>
        }
      />

      <Container className="max-w-3xl py-16 sm:py-20">
        <Reveal>
          <FaqAccordion items={t.items} />
        </Reveal>
      </Container>

      <CtaPanel
        title={t.stillTitle}
        text={t.stillText}
        primaryLabel={dict.cta.quote}
        primaryHref="/contact?type=devis#formulaire"
        secondaryLabel={dict.cta.contactUs}
        secondaryHref="/contact"
      />
    </>
  );
}
