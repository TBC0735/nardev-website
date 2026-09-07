import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { getDict } from "@/i18n/server";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Tarifs, délais, hébergement, maintenance, paiement : les réponses aux questions les plus fréquentes sur nos prestations.",
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
        <dl className="divide-y divide-bordure">
          {t.items.map((item) => (
            <div key={item.q} className="py-6 first:pt-0">
              <dt className="font-semibold text-marine">{item.q}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-texte-secondaire">
                {item.a}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-10">
          <Button href="/contact?type=devis">{dict.cta.quote}</Button>
        </div>
      </Container>
    </>
  );
}
