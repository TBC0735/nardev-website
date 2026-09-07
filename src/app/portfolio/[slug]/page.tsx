import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { PhotoFrame } from "@/components/PhotoFrame";
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
  const projet = await getProjet(params.slug);
  if (!projet) notFound();

  const galerie = [projet.imageUrl, ...projet.images].filter(
    (src): src is string => Boolean(src),
  );

  return (
    <>
      <section className="border-b border-bordure bg-fond-alt">
        <Container className="py-16">
          <Link
            href={
              projet.service
                ? `/portfolio?service=${projet.service.slug}`
                : "/portfolio"
            }
            className="text-sm no-underline hover:underline"
          >
            {dict.portfolio.back}
          </Link>
          {projet.service && (
            <p className="mt-6 text-xs font-medium uppercase tracking-wide text-bleu">
              {projet.service.titre}
            </p>
          )}
          <h1 className="mt-1 text-3xl sm:text-4xl">{projet.nom}</h1>
          {projet.resume && (
            <p className="mt-4 max-w-2xl text-texte-secondaire">
              {projet.resume}
            </p>
          )}
        </Container>
      </section>

      <Container className="py-16">
        <PhotoFrame
          imageUrl={galerie[0] ?? null}
          alt={projet.nom}
          className="aspect-[16/9] w-full"
          sizes="(min-width: 1024px) 960px, 100vw"
          priority
        />
        {galerie.length > 1 && (
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {galerie.slice(1).map((src, i) => (
              <PhotoFrame
                key={src}
                imageUrl={src}
                alt={`${projet.nom} — visuel ${i + 2}`}
                className="aspect-[4/3] w-full"
                sizes="(min-width: 640px) 30vw, 90vw"
              />
            ))}
          </div>
        )}

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_260px]">
          <div className="space-y-8">
            {projet.besoin && (
              <div>
                <h2 className="text-2xl">{dict.portfolio.needTitle}</h2>
                <p className="mt-3 whitespace-pre-line text-texte-secondaire">
                  {projet.besoin}
                </p>
              </div>
            )}
            {projet.solution && (
              <div>
                <h2 className="text-2xl">{dict.portfolio.solutionTitle}</h2>
                <p className="mt-3 whitespace-pre-line text-texte-secondaire">
                  {projet.solution}
                </p>
              </div>
            )}
            {!projet.besoin && !projet.solution && projet.description && (
              <p className="whitespace-pre-line text-texte-secondaire">
                {projet.description}
              </p>
            )}
          </div>

          <aside className="h-fit rounded-lg border border-bordure p-5">
            {projet.technologies.length > 0 && (
              <>
                <p className="text-sm font-semibold text-marine">
                  {dict.portfolio.techTitle}
                </p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {projet.technologies.map((tech) => (
                    <li
                      key={tech}
                      className="rounded border border-bordure px-2 py-1 text-xs text-texte-secondaire"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </>
            )}
            <div className="mt-5">
              <Button href="/contact?type=devis">
                {dict.portfolio.similarCta}
              </Button>
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}
