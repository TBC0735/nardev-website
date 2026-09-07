"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Message } from "@prisma/client";

const dateFmt = new Intl.DateTimeFormat("fr-FR", {
  dateStyle: "medium",
  timeStyle: "short",
});

export function MessagesManager({
  messagesInitiaux,
}: {
  messagesInitiaux: Message[];
}) {
  const router = useRouter();
  const [enCours, setEnCours] = useState<string | null>(null);
  const [erreur, setErreur] = useState<string | null>(null);

  async function basculerLu(message: Message) {
    setEnCours(message.id);
    setErreur(null);
    const res = await fetch(`/api/messages/${message.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lu: !message.lu }),
    });
    setEnCours(null);
    if (!res.ok) {
      setErreur("Action impossible.");
      return;
    }
    router.refresh();
  }

  async function supprimer(id: string) {
    if (!confirm("Supprimer ce message ?")) return;
    setEnCours(id);
    const res = await fetch(`/api/messages/${id}`, { method: "DELETE" });
    setEnCours(null);
    if (!res.ok && res.status !== 204) {
      setErreur("Suppression impossible.");
      return;
    }
    router.refresh();
  }

  if (messagesInitiaux.length === 0) {
    return (
      <p className="mt-8 rounded border border-bordure bg-fond-alt p-4 text-sm text-texte-secondaire">
        Aucun message pour le moment.
      </p>
    );
  }

  return (
    <div className="mt-8 space-y-4">
      {erreur && <p className="text-sm text-erreur">{erreur}</p>}

      {messagesInitiaux.map((message) => (
        <article
          key={message.id}
          className={`rounded-lg border p-5 ${
            message.lu ? "border-bordure" : "border-bleu bg-bleu/5"
          }`}
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="font-semibold text-marine">
                {message.nom}
                {message.entreprise ? ` · ${message.entreprise}` : ""}
              </p>
              <p className="text-sm text-texte-secondaire">
                <a href={`mailto:${message.email}`} className="no-underline hover:underline">
                  {message.email}
                </a>
                {message.telephone ? ` · ${message.telephone}` : ""}
              </p>
            </div>
            <p className="text-xs text-texte-secondaire">
              {dateFmt.format(message.createdAt)}
            </p>
          </div>

          {message.service && (
            <p className="mt-2 text-xs font-medium uppercase tracking-wide text-bleu">
              {message.service}
            </p>
          )}

          <p className="mt-3 whitespace-pre-line text-sm text-texte">
            {message.contenu}
          </p>

          <div className="mt-4 flex gap-4 text-sm">
            <button
              type="button"
              onClick={() => basculerLu(message)}
              disabled={enCours === message.id}
              className="font-medium text-bleu hover:underline disabled:opacity-50"
            >
              {message.lu ? "Marquer non lu" : "Marquer lu"}
            </button>
            <button
              type="button"
              onClick={() => supprimer(message.id)}
              disabled={enCours === message.id}
              className="font-medium text-erreur hover:underline disabled:opacity-50"
            >
              Supprimer
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
