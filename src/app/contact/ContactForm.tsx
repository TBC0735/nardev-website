"use client";

import { useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { Button } from "@/components/Button";
import type { Dict } from "@/i18n/dictionaries";

type Service = { slug: string; titre: string };

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
      <div className="rounded-lg border border-succes/30 bg-succes/5 p-6">
        <p className="font-semibold text-marine">{t.sentTitle}</p>
        <p className="mt-2 text-sm text-texte-secondaire">{t.sentText}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {devis && (
        <p className="rounded border border-bordure bg-fond-alt px-3 py-2 text-sm text-texte-secondaire">
          {t.devisNote}
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <Champ name="nom" label={t.name} required />
        <Champ name="entreprise" label={t.company} />
        <Champ name="email" label={t.email} type="email" required />
        <Champ name="telephone" label={t.phone} type="tel" />
      </div>

      <div>
        <label htmlFor="service" className="block text-sm font-medium">
          {t.serviceLabel}
        </label>
        <select
          id="service"
          name="service"
          defaultValue={serviceInitial}
          className="mt-1 w-full rounded border border-bordure px-3 py-2 text-sm"
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
        <label htmlFor="contenu" className="block text-sm font-medium">
          {t.message}
        </label>
        <textarea
          id="contenu"
          name="contenu"
          required
          rows={6}
          minLength={10}
          className="mt-1 w-full rounded border border-bordure px-3 py-2 text-sm"
          placeholder={t.messagePlaceholder}
        />
      </div>

      {/* Champ piège anti-spam — masqué aux humains. */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor="siteweb">Ne rien saisir ici</label>
        <input id="siteweb" name="siteweb" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {erreur && <p className="text-sm text-erreur">{erreur}</p>}

      <Button type="submit" disabled={enCours}>
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
      <label htmlFor={name} className="block text-sm font-medium">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="mt-1 w-full rounded border border-bordure px-3 py-2 text-sm"
      />
    </div>
  );
}
