import { Container } from "@/components/Container";
import { Button } from "@/components/Button";

const services = [
  { title: "Sites vitrines", desc: "Une présence en ligne claire et professionnelle." },
  { title: "Sites dynamiques", desc: "Des sites avec back-office pour gérer votre contenu." },
  { title: "Flyers & affiches", desc: "Des supports print alignés sur votre image." },
  { title: "Visibilité Google", desc: "Votre fiche entreprise optimisée pour être trouvé." },
];

export default function HomePage() {
  return (
    <>
      <section className="bg-fond-alt">
        <Container className="py-20">
          <h1 className="max-w-3xl text-4xl sm:text-5xl">
            Nardev conçoit des sites web et des supports qui font grandir votre
            activité.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-texte-secondaire">
            Sites vitrines, sites dynamiques, print et visibilité Google — une
            équipe, un interlocuteur, un résultat soigné.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/contact?type=devis">Demander un devis</Button>
            <Button href="/portfolio" variant="contour">
              Voir nos réalisations
            </Button>
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-16">
          <h2 className="text-2xl">Nos services</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <a
                key={s.title}
                href="/services"
                className="rounded border border-bordure p-5 no-underline transition-colors hover:border-bleu"
              >
                <p className="font-semibold text-marine">{s.title}</p>
                <p className="mt-2 text-sm text-texte-secondaire">{s.desc}</p>
              </a>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-fond-alt">
        <Container className="flex flex-col items-start gap-4 py-16">
          <h2 className="text-2xl">Un projet en tête ?</h2>
          <p className="max-w-xl text-texte-secondaire">
            Parlons-en. On revient vers vous rapidement avec une proposition
            concrète.
          </p>
          <Button href="/contact">Nous contacter</Button>
        </Container>
      </section>
    </>
  );
}
