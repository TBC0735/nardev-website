import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { getDict } from "@/i18n/server";

export const metadata: Metadata = { title: "Mentions légales" };
export const dynamic = "force-dynamic";

export default function MentionsLegalesPage() {
  const t = getDict().legal;

  return (
    <>
      <section className="border-b border-bordure bg-fond-alt">
        <Container className="py-16">
          <h1 className="text-3xl sm:text-4xl">{t.title}</h1>
          <p className="mt-4 text-sm text-texte-secondaire">{t.updated}</p>
        </Container>
      </section>

      <Container className="max-w-3xl space-y-10 py-16 text-sm leading-relaxed text-texte-secondaire">
        <section>
          <h2 className="text-2xl text-marine">{t.editorTitle}</h2>
          <p className="mt-3">{t.editorBody}</p>
          <ul className="mt-3 space-y-1">
            <li>{t.editorDirector}</li>
            <li>
              {t.editorContact}{" "}
              <a href="mailto:contact@nardev.sn" className="no-underline hover:underline">
                contact@nardev.sn
              </a>
            </li>
          </ul>
          <p className="mt-3">{t.editorRegistration}</p>
        </section>

        <section>
          <h2 className="text-2xl text-marine">{t.hostTitle}</h2>
          <p className="mt-3">{t.hostBody}</p>
        </section>

        <section>
          <h2 className="text-2xl text-marine">{t.ipTitle}</h2>
          <p className="mt-3">{t.ipBody}</p>
        </section>

        <section>
          <h2 className="text-2xl text-marine">{t.dataTitle}</h2>
          <p className="mt-3">{t.dataIntro}</p>
          <ul className="mt-3 space-y-2">
            <li>{t.dataPurpose}</li>
            <li>{t.dataRecipients}</li>
            <li>{t.dataRetention}</li>
            <li>{t.dataRights}</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl text-marine">{t.cookiesTitle}</h2>
          <p className="mt-3">{t.cookiesBody}</p>
        </section>
      </Container>
    </>
  );
}
