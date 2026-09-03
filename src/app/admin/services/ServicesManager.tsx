"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import type { Service } from "@prisma/client";
import { Button } from "@/components/Button";
import { PhotoFrame } from "@/components/PhotoFrame";
import { serviceIcon } from "@/lib/service-icons";

type ServiceForm = {
  slug: string;
  titre: string;
  resume: string;
  description: string;
  avantages: string;
  pointsCles: string;
  imageUrl: string;
  ordre: string;
};

const formVide: ServiceForm = {
  slug: "",
  titre: "",
  resume: "",
  description: "",
  avantages: "",
  pointsCles: "",
  imageUrl: "",
  ordre: "0",
};

function toForm(service: Service): ServiceForm {
  return {
    slug: service.slug,
    titre: service.titre,
    resume: service.resume,
    description: service.description,
    avantages: service.avantages.join("\n"),
    pointsCles: service.pointsCles.join("\n"),
    imageUrl: service.imageUrl ?? "",
    ordre: String(service.ordre),
  };
}

export function ServicesManager({ servicesInitiaux }: { servicesInitiaux: Service[] }) {
  const router = useRouter();
  const [editionId, setEditionId] = useState<string | null>(null);
  const [form, setForm] = useState<ServiceForm>(formVide);
  const [erreur, setErreur] = useState<string | null>(null);
  const [enCours, setEnCours] = useState(false);

  function reinitialiser() {
    setEditionId(null);
    setForm(formVide);
    setErreur(null);
  }

  function commencerEdition(service: Service) {
    setEditionId(service.id);
    setForm(toForm(service));
    setErreur(null);
  }

  async function envoyer(event: FormEvent) {
    event.preventDefault();
    setEnCours(true);
    setErreur(null);

    const payload = {
      slug: form.slug,
      titre: form.titre,
      resume: form.resume,
      description: form.description,
      avantages: form.avantages
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean),
      pointsCles: form.pointsCles
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean),
      imageUrl: form.imageUrl,
      ordre: Number(form.ordre) || 0,
    };

    const url = editionId ? `/api/services/${editionId}` : "/api/services";
    const method = editionId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setEnCours(false);

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setErreur(data?.error ?? "Une erreur est survenue.");
      return;
    }

    reinitialiser();
    router.refresh();
  }

  async function supprimer(id: string) {
    if (!confirm("Supprimer ce service ?")) return;
    setEnCours(true);
    const res = await fetch(`/api/services/${id}`, { method: "DELETE" });
    setEnCours(false);
    if (!res.ok && res.status !== 204) {
      const data = await res.json().catch(() => null);
      setErreur(data?.error ?? "Suppression impossible.");
      return;
    }
    if (editionId === id) reinitialiser();
    router.refresh();
  }

  return (
    <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_360px]">
      <div>
        <h2 className="text-lg font-semibold text-marine">
          Services ({servicesInitiaux.length})
        </h2>

        {servicesInitiaux.length === 0 ? (
          <p className="mt-3 rounded border border-bordure bg-fond-alt p-4 text-sm text-texte-secondaire">
            Aucun service pour le moment. Ajoutez les 4 services avec le
            formulaire.
          </p>
        ) : (
          <ul className="mt-3 divide-y divide-bordure rounded border border-bordure">
            {servicesInitiaux.map((service) => (
              <li key={service.id} className="flex items-start gap-4 p-4">
                <PhotoFrame
                  imageUrl={service.imageUrl}
                  alt={service.titre}
                  icon={serviceIcon(service.slug)}
                  className="h-16 w-20 shrink-0"
                  sizes="80px"
                />
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-marine">
                    <span className="text-texte-secondaire">
                      #{service.ordre}
                    </span>{" "}
                    {service.titre}
                  </p>
                  <p className="text-sm text-bleu">/{service.slug}</p>
                  <p className="mt-1 text-sm text-texte-secondaire">
                    {service.resume}
                  </p>
                  {service.avantages.length > 0 && (
                    <p className="mt-2 text-xs text-texte-secondaire">
                      {service.avantages.length} avantage(s) renseigné(s)
                    </p>
                  )}
                  {service.pointsCles.length > 0 && (
                    <ul className="mt-2 list-disc pl-5 text-sm text-texte-secondaire">
                      {service.pointsCles.map((l) => (
                        <li key={l}>{l}</li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="flex shrink-0 gap-2">
                  <button
                    type="button"
                    onClick={() => commencerEdition(service)}
                    className="text-sm font-medium text-bleu hover:underline"
                  >
                    Modifier
                  </button>
                  <button
                    type="button"
                    onClick={() => supprimer(service.id)}
                    disabled={enCours}
                    className="text-sm font-medium text-erreur hover:underline disabled:opacity-50"
                  >
                    Supprimer
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <form
        onSubmit={envoyer}
        className="h-fit rounded border border-bordure p-5"
      >
        <h2 className="text-lg font-semibold text-marine">
          {editionId ? "Modifier le service" : "Ajouter un service"}
        </h2>

        <div className="mt-4 space-y-3">
          <Champ
            label="Titre"
            value={form.titre}
            onChange={(v) => setForm({ ...form, titre: v })}
            required
          />
          <Champ
            label="Slug (URL, ex: sites-vitrines)"
            value={form.slug}
            onChange={(v) => setForm({ ...form, slug: v })}
            required
          />
          <Champ
            label="Résumé court (carte accueil)"
            value={form.resume}
            onChange={(v) => setForm({ ...form, resume: v })}
            required
          />
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
              rows={4}
              className="mt-1 w-full rounded border border-bordure px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              Avantages / pourquoi ce service (une ligne par élément)
            </label>
            <textarea
              value={form.avantages}
              onChange={(e) => setForm({ ...form, avantages: e.target.value })}
              rows={4}
              placeholder={"Accroître votre visibilité\nAttirer de nouveaux clients"}
              className="mt-1 w-full rounded border border-bordure px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              Ce que le client reçoit (une ligne par élément)
            </label>
            <textarea
              value={form.pointsCles}
              onChange={(e) => setForm({ ...form, pointsCles: e.target.value })}
              rows={4}
              placeholder={"Maquette validée avec vous\nSite responsive livré clé en main"}
              className="mt-1 w-full rounded border border-bordure px-3 py-2 text-sm"
            />
          </div>
          <Champ
            label="URL de la photo (optionnel)"
            value={form.imageUrl}
            onChange={(v) => setForm({ ...form, imageUrl: v })}
            type="url"
          />
          <Champ
            label="Ordre d'affichage"
            value={form.ordre}
            onChange={(v) => setForm({ ...form, ordre: v })}
            type="number"
          />
        </div>

        {erreur && <p className="mt-3 text-sm text-erreur">{erreur}</p>}

        <div className="mt-4 flex gap-2">
          <Button type="submit" disabled={enCours}>
            {enCours ? "Enregistrement…" : editionId ? "Enregistrer" : "Ajouter"}
          </Button>
          {editionId && (
            <Button type="button" variant="contour" onClick={reinitialiser}>
              Annuler
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

function Champ({
  label,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        min={type === "number" ? 0 : undefined}
        className="mt-1 w-full rounded border border-bordure px-3 py-2 text-sm"
      />
    </div>
  );
}
