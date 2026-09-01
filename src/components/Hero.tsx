"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { Button } from "./Button";
import { Container } from "./Container";
import { PhotoFrame } from "./PhotoFrame";

const textVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" },
  }),
};

const titre = "Nardev conçoit des sites web et des supports qui font grandir votre activité.";

const motsContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045, delayChildren: 0.05 } },
};

const mot: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

/** Titre du hero : chaque mot apparaît l'un après l'autre. */
function TitreAnime() {
  return (
    <motion.h1
      initial="hidden"
      animate="show"
      variants={motsContainer}
      className="max-w-4xl text-5xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl"
    >
      {titre.split(" ").map((motTexte, index) => (
        <motion.span key={index} variants={mot} className="mr-[0.25em] inline-block">
          {motTexte}
        </motion.span>
      ))}
    </motion.h1>
  );
}

/**
 * Hero de l'accueil : grande photo plein largeur avec titre superposé
 * (structure inspirée de sites vitrine à forte identité visuelle), mais
 * dans les tons de la charte Nardev — navy/bleu/blanc, pas de dégradé
 * criard. `imageUrl` accepte une vraie photo plus tard (props prêtes) ;
 * en attendant, un dégradé chaleureux tient la place.
 *
 * Texte en entrée animée (cascade) + léger effet de parallaxe sur la photo
 * au scroll.
 */
export function Hero({
  imageUrl,
  imageAlt = "Un projet Nardev en cours de réalisation",
}: {
  imageUrl?: string | null;
  imageAlt?: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-marine text-white"
    >
      <motion.div style={{ y }} className="absolute inset-0">
        <PhotoFrame
          imageUrl={imageUrl}
          alt={imageAlt}
          icon="✨"
          iconClassName="text-7xl opacity-90"
          rounded={false}
          className="h-full w-full"
          sizes="100vw"
          priority
        />
      </motion.div>
      {/* Voile navy pour garder le texte lisible sur la photo — tons de la charte uniquement. */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-marine via-marine/80 to-marine/30"
        aria-hidden="true"
      />

      <Container className="relative z-10 flex min-h-[420px] flex-col justify-end gap-6 py-16 sm:min-h-[520px] lg:min-h-[600px]">
        <div>
          <TitreAnime />
          <motion.p
            custom={0.75}
            initial="hidden"
            animate="show"
            variants={textVariants}
            className="mt-6 max-w-xl text-lg text-white/80"
          >
            Sites vitrines, sites dynamiques, print et visibilité Google —
            une équipe à taille humaine, à l&apos;écoute de votre projet du
            premier échange jusqu&apos;à la mise en ligne.
          </motion.p>
          <motion.div
            custom={0.9}
            initial="hidden"
            animate="show"
            variants={textVariants}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Button href="/contact?type=devis">Demander un devis</Button>
            <Button href="/portfolio" variant="contour-clair">
              Voir nos réalisations
            </Button>
          </motion.div>
        </div>
      </Container>

      <a
        href="#services"
        aria-label="Voir la suite de la page"
        className="absolute bottom-0 left-1/2 z-10 flex h-12 w-12 -translate-x-1/2 translate-y-1/2 animate-bounce items-center justify-center rounded-full bg-white text-marine shadow-sm no-underline"
      >
        <span aria-hidden="true">⌄</span>
      </a>
    </section>
  );
}
