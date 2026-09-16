// Envoi d'email via l'API REST de Resend (pas de SDK à installer).
// Si RESEND_API_KEY n'est pas configuré, l'envoi est ignoré silencieusement :
// le message reste enregistré en base et consultable depuis /admin/messages.

type Envoi = {
  sujet: string;
  texte: string;
  repondreA?: string;
};

const FROM = process.env.CONTACT_FROM_EMAIL ?? "Nardev <onboarding@resend.dev>";

export async function envoyerEmailEquipe({ sujet, texte, repondreA }: Envoi) {
  const cle = process.env.RESEND_API_KEY;
  const destinataire = process.env.CONTACT_TO_EMAIL;

  if (!cle || !destinataire) {
    console.warn(
      "[contact] RESEND_API_KEY ou CONTACT_TO_EMAIL absent — email non envoyé (message tout de même enregistré).",
    );
    return { envoye: false as const };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${cle}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: [destinataire],
        subject: sujet,
        text: texte,
        ...(repondreA ? { reply_to: repondreA } : {}),
      }),
    });

    if (!res.ok) {
      console.error("[contact] Échec envoi Resend :", res.status, await res.text());
      return { envoye: false as const };
    }
    return { envoye: true as const };
  } catch (error) {
    console.error("[contact] Erreur réseau Resend :", error);
    return { envoye: false as const };
  }
}
