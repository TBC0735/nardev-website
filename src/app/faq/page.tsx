import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { getDict } from "@/i18n/server";

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
      <section className="border-b border-bordure bg-fond-alt">
        <Container className="py-16">
          <h1 className="text-3xl sm:text-4xl">{t.title}</h1>
          <p className="mt-4 max-w-2xl text-texte-secondaire">
            {t.intro}{" "}
            <Link href="/contact" className="no-underline hover:underline">
              {t.contactLink}
            </Link>
            .
          </p>
        </Container>
      </section>

      <Container className="max-w-3xl py-16">
        <div className="divide-y divide-bordure border-y border-bordure">
          {t.items.map((item) => (
            <details key={item.q} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-medium text-marine [&::-webkit-details-marker]:hidden">
                <span>{item.q}</span>
                <svg
                  className="h-5 w-5 shrink-0 text-texte-secondaire transition-transform duration-200 group-open:rotate-180"
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M6 8l4 4 4-4"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </summary>
              <p className="pb-5 pr-9 text-sm leading-relaxed text-texte-secondaire">
                {item.a}
              </p>
            </details>
          ))}
        </div>

        <div className="mt-10">
          <Button href="/contact?type=devis">{dict.cta.quote}</Button>
        </div>
      </Container>
    </>
  );
}
