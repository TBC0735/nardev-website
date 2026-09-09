import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { PhotoFrame } from "@/components/PhotoFrame";
import { Badge } from "@/components/ui/Badge";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowRightIcon } from "@/components/icons";
import { prisma } from "@/lib/prisma";
import { getDict } from "@/i18n/server";

export const dynamic = "force-dynamic";

async function getProjet(slug: string) {
  try {
    return await prisma.projet.findFirst({
      where: { slug, publie: true },
      include: { service: { select: { slug: true, titre: true } } },
    });
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const projet = await getProjet(params.slug);
  if (!projet) return { title: getDict().portfolio.notFound };
  return {
    title: projet.nom,
    description: projet.resume || projet.description || undefined,
  };
}

export default async function ProjetDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const dict = getDict();
  const t = dict.portfolio;
  const projet = await getProjet(params.slug);
  if (!projet) notFound();

  const galerie = [projet.imageUrl, ...projet.images].filter(
    (src): src is string => Boolean(src),
  );
  const backHref = projet.service
    ? `/portfolio?service=${projet.service.slug}`
    : "/portfolio";

  return (
    <>
      <section className="relative overflow-hidden bg-marine text-white">
        <div aria-hidden className="bg-dots absolute inset-0 opacity-45" />
        <Container className="relative py-14 lg:py-20">
          <Link
            href={backHref}
            className="inline-flex items-center gap-1.5 text-sm text-white/70 no-underline transition-colors hover:text-white"
          >
            <ArrowRightIcon className="h-4 w-4 rotate-180" />
            {t.back}
          </Link>
          {projet.service && (
            <div className="mt-6">
              <Badge variant="clair">{projet.service.titre}</Badge>
            </div>
          )}
          <h1 className="mt-3 text-display-sm font-bold text-white sm:text-display">
            {projet.nom}
          </h1>
          {projet.resume && (
            <p className="mt-4 max-w-2xl text-lg text-white/75">
              {projet.resume}
            </p>
          )}
          {projet.lienUrl && (
            <a
              href={projet.lienUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-white/25 px-4 py-2 text-sm font-medium text-white no-underline transition-colors hover:bg-white/10"
            >
              {t.liveLink}
              <ArrowRightIcon className="h-4 w-4 -rotate-45" />
            </a>
          )}
        </Container>
      </section>

      <Container className="py-16 sm:py-20">
        {galerie.length > 0 && (
          <Reveal>
            <PhotoFrame
              imageUrl={galerie[0]}
              alt={projet.nom}
              browser
              className="w-full"
              sizes="(min-width: 1024px) 960px, 100vw"
              priority
            />
          </Reveal>
        )}
        {galerie.length > 1 && (
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {galerie.slice(1).map((src, i) => (
              <PhotoFrame
                key={src}
                imageUrl={src}
                alt={`${projet.nom} — ${i + 2}`}
                className="aspect-[4/3] w-full"
                sizes="(min-width: 640px) 30vw, 90vw"
              />
            ))}
          </div>
        )}

        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_280px]">
          <Reveal className="space-y-10">
            {projet.besoin && (
              <div>
                <Eyebrow>{t.needTitle}</Eyebrow>
                <p className="mt-3 whitespace-pre-line leading-relaxed text-texte-secondaire">
                  {projet.besoin}
                </p>
              </div>
            )}
            {projet.solution && (
              <div>
                <Eyebrow>{t.solutionTitle}</Eyebrow>
                <p className="mt-3 whitespace-pre-line leading-relaxed text-texte-secondaire">
                  {projet.solution}
                </p>
              </div>
            )}
            {projet.role && (
              <div>
                <Eyebrow>{t.roleTitle}</Eyebrow>
                <p className="mt-3 leading-relaxed text-texte-secondaire">
                  {projet.role}
                </p>
              </div>
            )}
            {!projet.besoin && !projet.solution && projet.description && (
              <p className="whitespace-pre-line leading-relaxed text-texte-secondaire">
                {projet.description}
              </p>
            )}
          </Reveal>

          <Reveal delay={120}>
            <aside className="h-fit rounded-xl border border-bordure bg-fond-alt p-6">
              {projet.technologies.length > 0 && (
                <>
                  <p className="text-sm font-semibold text-marine">
                    {t.techTitle}
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {projet.technologies.map((tech) => (
                      <li key={tech}>
                        <Badge variant="neutre">{tech}</Badge>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              <p className="mt-6 font-semibold text-marine">{t.similarCta}</p>
              <p className="mt-1 text-sm text-texte-secondaire">
                {t.similarText}
              </p>
              <Button href="/contact?type=devis#formulaire" className="mt-4 w-full">
                {dict.cta.quote}
              </Button>
            </aside>
          </Reveal>
        </div>
      </Container>
    </>
  );
}
