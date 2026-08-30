import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageIntro } from "@/components/PageIntro";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <PageIntro title="Nous contacter" owner="Contact — Awa Ndao">
        Formulaire (nom, entreprise, service souhaité, message). À la soumission :
        email envoyé à l&apos;équipe + message enregistré en base (table Message).
        Coordonnées directes affichées à côté, message de confirmation après
        envoi.
      </PageIntro>
      <Container className="py-16">
        <p className="text-texte-secondaire">
          Email : contact@nardev.sn — Téléphone : +221 —
        </p>
      </Container>
    </>
  );
}
