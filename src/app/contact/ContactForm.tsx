"use client";

import { useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { Button } from "@/components/Button";
import type { Dict } from "@/i18n/dictionaries";

type Service = { slug: string; titre: string };

const inputClass =
  "mt-1.5 w-full rounded-lg border border-bordure bg-white px-3.5 py-2.5 text-sm transition-colors placeholder:text-texte-secondaire/70 focus:border-bleu focus:outline-none focus:ring-2 focus:ring-bleu/20";

export function ContactForm({
  services,
  dict,
}: {
  services: Service[];
  dict: Dict;
}) {
  const t = dict.contact;
  const params = useSearchParams();
  const serviceInitial = params.get("service") ?? "";
  const devis = params.get("type") === "devis";

  const [envoye, setEnvoye] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);
  const [enCours, setEnCours] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setEnCours(true);
    setErreur(null);

    const form = new FormData(event.currentTarget);
    const payload = {
      nom: String(form.get("nom") ?? ""),
      email: String(form.get("email") ?? ""),
      telephone: String(form.get("telephone") ?? ""),
      entreprise: String(form.get("entreprise") ?? ""),
      service: String(form.get("service") ?? ""),
      contenu: String(form.get("contenu") ?? ""),
      siteweb: String(form.get("siteweb") ?? ""),
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setEnCours(false);

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setErreur(data?.error ?? t.error);
      return;
    }
    setEnvoye(true);
  }

  if (envoye) {
    return (
      <div className="flex flex-col items-center rounded-xl border border-succes/30 bg-succes/5 px-6 py-10 text-center">
        <span className="animate-pop-in flex h-14 w-14 items-center justify-center rounded-full bg-succes text-white">
          <svg
            viewBox="0 0 24 24"
            className="h-7 w-7"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M5 13l4 4L19 7"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <p className="animate-rise-in mt-4 font-semibold text-marine">
          {t.sentTitle}
        </p>
        <p className="animate-rise-in mt-1 max-w-sm text-sm text-texte-secondaire">
          {t.sentText}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {devis && (
        <p className="rounded-lg border border-bleu/20 bg-bleu/5 px-3.5 py-2.5 text-sm text-marine">
          {t.devisNote}
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Champ name="nom" label={t.name} required />
        <Champ name="entreprise" label={t.company} />
        <Champ name="email" label={t.email} type="email" required />
        <Champ name="telephone" label={t.phone} type="tel" />
      </div>

      <div>
        <label htmlFor="service" className="block text-sm font-medium text-marine">
          {t.serviceLabel}
        </label>
        <select
          id="service"
          name="service"
          defaultValue={serviceInitial}
          className={inputClass}
        >
          <option value="">{t.serviceDefault}</option>
          {services.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.titre}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="contenu" className="block text-sm font-medium text-marine">
          {t.message}
        </label>
        <textarea
          id="contenu"
          name="contenu"
          required
          rows={6}
          minLength={10}
          className={inputClass}
          placeholder={t.messagePlaceholder}
        />
      </div>

      {/* Champ piège anti-spam — masqué aux humains. */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor="siteweb">Ne rien saisir ici</label>
        <input id="siteweb" name="siteweb" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {erreur && <p className="text-sm text-erreur">{erreur}</p>}

      <Button type="submit" disabled={enCours} className="w-full sm:w-auto">
        {enCours ? dict.cta.sending : dict.cta.send}
      </Button>
    </form>
  );
}

function Champ({
  name,
  label,
  type = "text",
  required = false,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-marine">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className={inputClass}
      />
    </div>
  );
}
