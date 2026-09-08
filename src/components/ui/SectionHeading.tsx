import type { ReactNode } from "react";
import { Spark } from "./Spark";
import { Reveal } from "@/components/motion/Reveal";

/** En-tête de section : sur-titre (eyebrow + étincelle), titre, texte d'intro. */
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
        <p
          className={`eyebrow ${dark ? "text-bleu-300" : ""} ${
            align === "center" ? "justify-center" : ""
          }`}
        >
          <Spark className="h-3.5 w-3.5" />
          {eyebrow}
        </p>
      )}
      <h2
        className={`mt-3 text-3xl font-bold tracking-tight sm:text-4xl ${
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
