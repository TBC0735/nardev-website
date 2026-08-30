import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";

export const metadata: Metadata = { title: "Mentions légales" };

export default function MentionsLegalesPage() {
  return (
    <PageIntro title="Mentions légales" owner="Équipe (à faire à la fin)">
      Identité de l&apos;entreprise (statut juridique dès qu&apos;il est défini)
      et politique sur les données du formulaire de contact.
    </PageIntro>
  );
}
