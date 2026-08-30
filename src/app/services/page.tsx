import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageIntro } from "@/components/PageIntro";

export const metadata: Metadata = { title: "Services" };

export default function ServicesPage() {
  return (
    <>
      <PageIntro
        title="Nos services"
        owner="Services & Accueil — Mame Diarra"
      >
        Détail des 4 services : titre, description, ce que le client reçoit, et
        un bouton « Demander ce service » qui pré-remplit le formulaire de
        contact. Contenu géré depuis l&apos;admin (table Service), pas en dur.
      </PageIntro>
      <Container className="py-16">
        <ul className="list-disc space-y-2 pl-5 text-texte-secondaire">
          <li>Sites vitrines</li>
          <li>Sites dynamiques</li>
          <li>Flyers &amp; affiches</li>
          <li>Visibilité Google (fiche entreprise)</li>
        </ul>
      </Container>
    </>
  );
}
