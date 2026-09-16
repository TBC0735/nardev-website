import type { ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "@/components/motion/Reveal";

/** En-tête de section : sur-titre, titre, texte d'intro. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  dark = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  dark?: boolean;
}) {
  return (
    <Reveal
      className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      {eyebrow && (
        <Eyebrow tone={dark ? "light" : "default"}>{eyebrow}</Eyebrow>
      )}
      <h2
        className={`mt-4 text-3xl font-bold tracking-tight sm:text-4xl ${
          dark ? "text-white" : "text-marine"
        }`}
      >
        {title}
      </h2>
      {lead && (
        <p
          className={`mt-4 text-base leading-relaxed ${
            dark ? "text-white/70" : "text-texte-secondaire"
          }`}
        >
          {lead}
        </p>
      )}
    </Reveal>
  );
}
