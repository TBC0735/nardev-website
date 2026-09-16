"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import type { Membre } from "@prisma/client";
import { Button } from "@/components/Button";

type MembreForm = {
  nom: string;
  role: string;
  presentation: string;
  photoUrl: string;
  ordre: string;
};

const formVide: MembreForm = {
  nom: "",
  role: "",
  presentation: "",
  photoUrl: "",
  ordre: "0",
};

function toForm(membre: Membre): MembreForm {
  return {
    nom: membre.nom,
    role: membre.role,
    presentation: membre.presentation,
    photoUrl: membre.photoUrl ?? "",
    ordre: String(membre.ordre),
  };
}

export function EquipeManager({ membresInitiaux }: { membresInitiaux: Membre[] }) {
  const router = useRouter();
  const [editionId, setEditionId] = useState<string | null>(null);
  const [form, setForm] = useState<MembreForm>(formVide);
  const [erreur, setErreur] = useState<string | null>(null);
  const [enCours, setEnCours] = useState(false);

  function reinitialiser() {
    setEditionId(null);
    setForm(formVide);
    setErreur(null);
  }

  function commencerEdition(membre: Membre) {
    setEditionId(membre.id);
    setForm(toForm(membre));
    setErreur(null);
  }

  async function envoyer(event: FormEvent) {
    event.preventDefault();
    setEnCours(true);
    setErreur(null);

    const payload = {
      nom: form.nom,
      role: form.role,
      presentation: form.presentation,
      photoUrl: form.photoUrl,
      ordre: Number(form.ordre) || 0,
    };

    const url = editionId ? `/api/membres/${editionId}` : "/api/membres";
    const method = editionId ? "PATCH" : "POST";

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
    if (!confirm("Supprimer ce membre ?")) return;
    setEnCours(true);
    const res = await fetch(`/api/membres/${id}`, { method: "DELETE" });
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
    <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_320px]">
      <div>
        <h2 className="text-lg font-semibold text-marine">
          Membres ({membresInitiaux.length})
        </h2>

        {membresInitiaux.length === 0 ? (
          <p className="mt-3 rounded border border-bordure bg-fond-alt p-4 text-sm text-texte-secondaire">
            Aucun membre pour le moment. Ajoutez les fondateurs avec le
            formulaire.
          </p>
        ) : (
          <ul className="mt-3 divide-y divide-bordure rounded border border-bordure">
            {membresInitiaux.map((membre) => (
              <li
                key={membre.id}
                className="flex items-start justify-between gap-4 p-4"
              >
                <div>
                  <p className="font-medium text-marine">
                    <span className="text-texte-secondaire">
                      #{membre.ordre}
                    </span>{" "}
                    {membre.nom}
                  </p>
                  <p className="text-sm text-bleu">{membre.role}</p>
                  <p className="mt-1 text-sm text-texte-secondaire">
                    {membre.presentation}
                  </p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button
                    type="button"
                    onClick={() => commencerEdition(membre)}
                    className="text-sm font-medium text-bleu hover:underline"
                  >
                    Modifier
                  </button>
                  <button
                    type="button"
                    onClick={() => supprimer(membre.id)}
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
          {editionId ? "Modifier le membre" : "Ajouter un membre"}
        </h2>

        <div className="mt-4 space-y-3">
          <Champ
            label="Nom"
            value={form.nom}
            onChange={(v) => setForm({ ...form, nom: v })}
            required
          />
          <Champ
            label="Rôle"
            value={form.role}
            onChange={(v) => setForm({ ...form, role: v })}
            required
          />
          <div>
            <label className="block text-sm font-medium">Présentation</label>
            <textarea
              value={form.presentation}
              onChange={(e) =>
                setForm({ ...form, presentation: e.target.value })
              }
              required
              rows={3}
              className="mt-1 w-full rounded border border-bordure px-3 py-2 text-sm"
            />
          </div>
          <Champ
            label="URL de la photo (optionnel)"
            value={form.photoUrl}
            onChange={(v) => setForm({ ...form, photoUrl: v })}
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
