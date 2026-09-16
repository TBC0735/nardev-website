"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import type { Projet } from "@prisma/client";
import { Button } from "@/components/Button";

type ProjetForm = {
  slug: string;
  nom: string;
  resume: string;
  besoin: string;
  solution: string;
  role: string;
  lienUrl: string;
  technologies: string;
  images: string;
  imageUrl: string;
  serviceId: string;
  publie: boolean;
  ordre: string;
};

const formVide: ProjetForm = {
  slug: "",
  nom: "",
  resume: "",
  besoin: "",
  solution: "",
  role: "",
  lienUrl: "",
  technologies: "",
  images: "",
  imageUrl: "",
  serviceId: "",
  publie: true,
  ordre: "0",
};

function toForm(projet: Projet): ProjetForm {
  return {
    slug: projet.slug,
    nom: projet.nom,
    resume: projet.resume,
    besoin: projet.besoin,
    solution: projet.solution,
    role: projet.role,
    lienUrl: projet.lienUrl ?? "",
    technologies: projet.technologies.join("\n"),
    images: projet.images.join("\n"),
    imageUrl: projet.imageUrl ?? "",
    serviceId: projet.serviceId ?? "",
    publie: projet.publie,
    ordre: String(projet.ordre),
  };
}

const lignes = (v: string) =>
  v
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

export function PortfolioManager({
  projetsInitiaux,
  services,
}: {
  projetsInitiaux: Projet[];
  services: { id: string; titre: string }[];
}) {
  const router = useRouter();
  const [editionId, setEditionId] = useState<string | null>(null);
  const [form, setForm] = useState<ProjetForm>(formVide);
  const [erreur, setErreur] = useState<string | null>(null);
  const [enCours, setEnCours] = useState(false);

  function reinitialiser() {
    setEditionId(null);
    setForm(formVide);
    setErreur(null);
  }

  function commencerEdition(projet: Projet) {
    setEditionId(projet.id);
    setForm(toForm(projet));
    setErreur(null);
  }

  async function envoyer(event: FormEvent) {
    event.preventDefault();
    setEnCours(true);
    setErreur(null);

    const payload = {
      slug: form.slug,
      nom: form.nom,
      resume: form.resume,
      besoin: form.besoin,
      solution: form.solution,
      role: form.role,
      lienUrl: form.lienUrl,
      technologies: lignes(form.technologies),
      images: lignes(form.images),
      imageUrl: form.imageUrl,
      serviceId: form.serviceId || null,
      publie: form.publie,
      ordre: Number(form.ordre) || 0,
    };

    const url = editionId ? `/api/projets/${editionId}` : "/api/projets";
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
    if (!confirm("Supprimer ce projet ?")) return;
    setEnCours(true);
    const res = await fetch(`/api/projets/${id}`, { method: "DELETE" });
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
          Projets ({projetsInitiaux.length})
        </h2>

        {projetsInitiaux.length === 0 ? (
          <p className="mt-3 rounded border border-bordure bg-fond-alt p-4 text-sm text-texte-secondaire">
            Aucun projet pour le moment. Ajoutez-en un avec le formulaire.
          </p>
        ) : (
          <ul className="mt-3 divide-y divide-bordure rounded border border-bordure">
            {projetsInitiaux.map((projet) => (
              <li
                key={projet.id}
                className="flex items-start justify-between gap-4 p-4"
              >
                <div>
                  <p className="font-medium text-marine">
                    {projet.nom}
                    {!projet.publie && (
                      <span className="ml-2 rounded bg-fond-alt px-1.5 py-0.5 text-xs text-texte-secondaire">
                        brouillon
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-texte-secondaire">/{projet.slug}</p>
                  {projet.resume && (
                    <p className="mt-1 text-sm text-texte-secondaire">
                      {projet.resume}
                    </p>
                  )}
                </div>
                <div className="flex shrink-0 gap-2">
                  <button
                    type="button"
                    onClick={() => commencerEdition(projet)}
                    className="text-sm font-medium text-bleu hover:underline"
                  >
                    Modifier
                  </button>
                  <button
                    type="button"
                    onClick={() => supprimer(projet.id)}
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
          {editionId ? "Modifier le projet" : "Ajouter un projet"}
        </h2>

        <div className="mt-4 space-y-3">
          <Champ
            label="Nom"
            value={form.nom}
            onChange={(v) => setForm({ ...form, nom: v })}
            required
          />
          <Champ
            label="Slug (dans l'URL)"
            value={form.slug}
            onChange={(v) => setForm({ ...form, slug: v })}
            required
          />
          <Zone
            label="Résumé (carte)"
            value={form.resume}
            onChange={(v) => setForm({ ...form, resume: v })}
            rows={2}
          />
          <Zone
            label="Le besoin du client"
            value={form.besoin}
            onChange={(v) => setForm({ ...form, besoin: v })}
            rows={3}
          />
          <Zone
            label="Notre solution"
            value={form.solution}
            onChange={(v) => setForm({ ...form, solution: v })}
            rows={3}
          />
          <Champ
            label="Notre rôle sur le projet"
            value={form.role}
            onChange={(v) => setForm({ ...form, role: v })}
          />
          <Champ
            label="Lien vers le projet en ligne (optionnel)"
            value={form.lienUrl}
            onChange={(v) => setForm({ ...form, lienUrl: v })}
            type="url"
          />
          <Zone
            label="Technologies (une par ligne)"
            value={form.technologies}
            onChange={(v) => setForm({ ...form, technologies: v })}
            rows={3}
          />
          <div>
            <label className="block text-sm font-medium">Service associé</label>
            <select
              value={form.serviceId}
              onChange={(e) => setForm({ ...form, serviceId: e.target.value })}
              className="mt-1 w-full rounded border border-bordure px-3 py-2 text-sm"
            >
              <option value="">— Aucun —</option>
              {services.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.titre}
                </option>
              ))}
            </select>
          </div>
          <Champ
            label="Image de couverture (URL)"
            value={form.imageUrl}
            onChange={(v) => setForm({ ...form, imageUrl: v })}
            type="url"
          />
          <Zone
            label="Images supplémentaires (une URL par ligne)"
            value={form.images}
            onChange={(v) => setForm({ ...form, images: v })}
            rows={2}
          />
          <Champ
            label="Ordre d'affichage"
            value={form.ordre}
            onChange={(v) => setForm({ ...form, ordre: v })}
            type="number"
          />
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.publie}
              onChange={(e) => setForm({ ...form, publie: e.target.checked })}
            />
            Publié (visible sur le site)
          </label>
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

function Zone({
  label,
  value,
  onChange,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}) {
  return (
    <div>
      <label className="block text-sm font-medium">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="mt-1 w-full rounded border border-bordure px-3 py-2 text-sm"
      />
    </div>
  );
}
