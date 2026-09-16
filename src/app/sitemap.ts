import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = site.url;

  const pagesFixes: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/services`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/portfolio`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/a-propos`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${base}/faq`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/contact`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/mentions-legales`, changeFrequency: "yearly", priority: 0.2 },
  ];

  let projets: { slug: string; updatedAt: Date }[] = [];
  try {
    projets = await prisma.projet.findMany({
      where: { publie: true },
      select: { slug: true, updatedAt: true },
    });
  } catch {
    projets = [];
  }

  return [
    ...pagesFixes,
    ...projets.map((p) => ({
      url: `${base}/portfolio/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
