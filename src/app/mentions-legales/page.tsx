import type { Metadata } from "next";
import { Container } from "@/components/Container";

export const metadata: Metadata = { title: "Mentions légales" };

const MAJ = "septembre 2026";

export default function MentionsLegalesPage() {
  return (
    <>
      <section className="border-b border-bordure bg-fond-alt">
        <Container className="py-16">
          <h1 className="text-3xl sm:text-4xl">Mentions légales</h1>
          <p className="mt-4 text-sm text-texte-secondaire">
            Dernière mise à jour : {MAJ}.
          </p>
        </Container>
      </section>

      <Container className="max-w-3xl space-y-10 py-16 text-sm leading-relaxed text-texte-secondaire">
        <section>
          <h2 className="text-2xl text-marine">Éditeur du site</h2>
          <p className="mt-3">
            Le site <strong>nardev</strong> est édité par Nardev, structure en
            cours d&apos;immatriculation, basée à Dakar (Sénégal).
          </p>
          <ul className="mt-3 space-y-1">
            <li>Directeur de la publication : Ndiawar Thiaw</li>
            <li>
              Contact :{" "}
              <a href="mailto:contact@nardev.sn" className="no-underline hover:underline">
                contact@nardev.sn
              </a>
            </li>
          </ul>
          <p className="mt-3">
            Le numéro NINEA et le numéro RCCM seront ajoutés dès la fin des
            démarches d&apos;immatriculation.
          </p>
        </section>

        <section>
          <h2 className="text-2xl text-marine">Hébergement</h2>
          <p className="mt-3">
            Le site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut,
            CA 91789, États-Unis —{" "}
            <a
              href="https://vercel.com"
              className="no-underline hover:underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              vercel.com
            </a>
            . La base de données est hébergée par Neon (Neon Inc., États-Unis),
            au sein de l&apos;Union européenne.
          </p>
        </section>

        <section>
          <h2 className="text-2xl text-marine">Propriété intellectuelle</h2>
          <p className="mt-3">
            Sauf mention contraire, l&apos;ensemble des contenus du site (textes,
            visuels, logo, code) est la propriété de Nardev. Toute reproduction
            ou réutilisation sans autorisation écrite préalable est interdite.
            Les projets présentés dans la section « Réalisations » sont publiés
            avec l&apos;accord des clients concernés.
          </p>
        </section>

        <section>
          <h2 className="text-2xl text-marine">
            Données personnelles (formulaire de contact)
          </h2>
          <p className="mt-3">
            Le formulaire de la page{" "}
            <a href="/contact" className="no-underline hover:underline">
              Contact
            </a>{" "}
            collecte les informations que vous y saisissez : nom, adresse email,
            téléphone (facultatif), nom de l&apos;entreprise (facultatif),
            service souhaité et contenu de votre message.
          </p>
          <ul className="mt-3 space-y-2">
            <li>
              <strong>Finalité :</strong> traiter votre demande et vous
              recontacter. Ces données ne sont ni vendues ni transmises à des
              tiers à des fins commerciales.
            </li>
            <li>
              <strong>Destinataires :</strong> l&apos;équipe de Nardev
              uniquement. Une notification est envoyée par email via le
              prestataire Resend (Resend, Inc.) le cas échéant.
            </li>
            <li>
              <strong>Conservation :</strong> les messages sont conservés le
              temps nécessaire au suivi de la demande, puis supprimés au plus
              tard 24 mois après le dernier échange.
            </li>
            <li>
              <strong>Vos droits :</strong> conformément à la loi sénégalaise
              n°&nbsp;2008-12 du 25&nbsp;janvier&nbsp;2008 sur la protection des
              données à caractère personnel, vous disposez d&apos;un droit
              d&apos;accès, de rectification et de suppression de vos données.
              Écrivez à{" "}
              <a href="mailto:contact@nardev.sn" className="no-underline hover:underline">
                contact@nardev.sn
              </a>
              . Vous pouvez également saisir la Commission de protection des
              données personnelles (CDP) du Sénégal.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl text-marine">Cookies</h2>
          <p className="mt-3">
            Le site public ne dépose aucun cookie de mesure d&apos;audience ni de
            publicité. Un cookie de session est utilisé uniquement dans
            l&apos;espace d&apos;administration réservé à l&apos;équipe, pour
            maintenir la connexion.
          </p>
        </section>
      </Container>
    </>
  );
}
