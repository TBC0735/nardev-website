import type { ReactNode } from "react";
import { Container } from "@/components/Container";

type Tone = "default" | "muted" | "dark";

const tones: Record<Tone, string> = {
  default: "bg-white",
  muted: "bg-fond-alt",
  dark: "bg-marine text-white",
};

/** Section pleine largeur avec rythme vertical constant et fond thématique. */
export function Section({
  children,
  tone = "default",
  id,
  className = "",
  containerClassName = "",
}: {
  children: ReactNode;
  tone?: Tone;
  id?: string;
  className?: string;
  containerClassName?: string;
}) {
  return (
    <section
      id={id}
      className={`${tones[tone]} py-16 sm:py-20 lg:py-24 ${className}`}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
