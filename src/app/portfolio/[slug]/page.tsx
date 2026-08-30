import Link from "next/link";
import { Container } from "@/components/Container";
import { PageIntro } from "@/components/PageIntro";

export default function ProjetDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <>
      <PageIntro title="Détail d'un projet" owner="Portfolio — Rokhaya">
        Fiche projet « {params.slug} » : image(s), besoin client et solution
        apportée, technologies utilisées.
      </PageIntro>
      <Container className="py-16">
        <Link href="/portfolio">← Retour aux réalisations</Link>
      </Container>
    </>
  );
}
