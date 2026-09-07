import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { PhotoFrame } from "@/components/PhotoFrame";
import { prisma } from "@/lib/prisma";
import { serviceIcon } from "@/lib/service-icons";
import { getDict } from "@/i18n/server";

export const metadata: Metadata = { title: "Services" };
export const dynamic = "force-dynamic";

async function getServices() {
  try {
    return await prisma.service.findMany({ orderBy: { ordre: "asc" } });
  } catch {
    return [];
  }
}

export default async function ServicesPage() {
  const dict = getDict();
  const services = await getServices();

  return (
    <>
      <section className="border-b border-bordure bg-fond-alt">
        <Container className="py-16">
          <h1 className="text-3xl sm:text-4xl">{dict.services.title}</h1>
          <p className="mt-4 max-w-2xl text-texte-secondaire">
            {dict.services.intro}
          </p>
        </Container>
      </section>

      {services.length === 0 ? (
        <Container className="py-16">
          <p className="text-texte-secondaire">{dict.services.empty}</p>
        </Container>
      ) : (
        <div className="divide-y divide-bordure">
          {services.map((service, index) => {
            const inverse = index % 2 === 1;
            return (
              <section
                key={service.id}
                id={service.slug}
                className={inverse ? "scroll-mt-20 bg-fond-alt" : "scroll-mt-20"}
              >
                <Container className="py-16">
                  <div className="grid items-start gap-10 lg:grid-cols-2">
                    <PhotoFrame
                      imageUrl={service.imageUrl}
                      alt={service.titre}
                      icon={serviceIcon(service.slug)}
                      fit="contain"
                      className={`aspect-[16/10] w-full lg:sticky lg:top-24 ${inverse ? "lg:order-2" : ""}`}
                      sizes="(min-width: 1024px) 620px, 100vw"
                    />
                    <div className={inverse ? "lg:order-1" : undefined}>
                      <h2 className="text-2xl">{service.titre}</h2>
                      <p className="mt-4 text-texte-secondaire">
                        {service.description}
                      </p>

                      {service.avantages.length > 0 && (
                        <div className="mt-6">
                          <p className="text-sm font-semibold text-marine">
                            {dict.services.whyTitle}
                          </p>
                          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                            {service.avantages.map((avantage) => (
                              <li
                                key={avantage}
                                className="flex items-start gap-2 text-sm text-texte-secondaire"
                              >
                                <span className="mt-0.5 text-bleu" aria-hidden="true">
                                  →
                                </span>
                                {avantage}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {service.pointsCles.length > 0 && (
                        <div className="mt-6">
                          <p className="text-sm font-semibold text-marine">
                            {dict.services.receiveTitle}
                          </p>
                          <ul className="mt-3 space-y-2">
                            {service.pointsCles.map((point) => (
                              <li
                                key={point}
                                className="flex items-start gap-2 text-sm text-texte-secondaire"
                              >
                                <span className="mt-0.5 text-succes" aria-hidden="true">
                                  ✓
                                </span>
                                {point}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="mt-8 flex flex-wrap items-center gap-3">
                        <Button href={`/contact?service=${service.slug}`}>
                          {dict.cta.requestService}
                        </Button>
                        <Button href={`/portfolio?service=${service.slug}`} variant="contour">
                          {dict.cta.seeExamples}
                        </Button>
                      </div>
                      <p className="mt-3 text-xs text-texte-secondaire">
                        {dict.services.priceNote}
                      </p>
                    </div>
                  </div>
                </Container>
              </section>
            );
          })}
        </div>
      )}

      <section className="bg-fond-alt">
        <Container className="py-16">
          <h2 className="text-2xl">{dict.services.processTitle}</h2>
          <p className="mt-3 max-w-2xl text-texte-secondaire">
            {dict.services.processText}
          </p>
          <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {dict.services.steps.map((etape, index) => (
              <li
                key={etape.title}
                className="rounded-lg border border-bordure bg-white p-5 transition-colors duration-200 hover:border-bleu"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-bleu text-sm font-semibold text-white">
                  {index + 1}
                </span>
                <p className="mt-3 font-semibold text-marine">{etape.title}</p>
                <p className="mt-2 text-sm text-texte-secondaire">{etape.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8">
            <Button href="/contact?type=devis">{dict.cta.quote}</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
