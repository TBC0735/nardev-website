import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";

export const metadata: Metadata = { title: "Réalisations" };

export default function PortfolioPage() {
  return (
    <PageIntro title="Nos réalisations" owner="Portfolio — Rokhaya">
      Grille de projets chargée depuis la base de données (table Projet), filtre
      par type de service, chaque carte renvoie vers /portfolio/[slug].
    </PageIntro>
  );
}
