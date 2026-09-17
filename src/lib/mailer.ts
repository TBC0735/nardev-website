// Envoi d'email via le compte Gmail de l'agence (SMTP), pour une délivrabilité
// fiable puisque l'email est envoyé et reçu sur le même compte. Si GMAIL_USER
// ou GMAIL_APP_PASSWORD ne sont pas configurés, l'envoi est ignoré
// silencieusement : le message reste enregistré en base et consultable
// depuis /admin/messages.

import nodemailer from "nodemailer";

type Envoi = {
  sujet: string;
  texte: string;
  repondreA?: string;
};

let transporteur: ReturnType<typeof nodemailer.createTransport> | null = null;

function getTransporteur() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) return null;

  transporteur ??= nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
  return transporteur;
}

export async function envoyerEmailEquipe({ sujet, texte, repondreA }: Envoi) {
  const user = process.env.GMAIL_USER;
  const destinataire = process.env.CONTACT_TO_EMAIL ?? user;
  const transport = getTransporteur();

  if (!transport || !destinataire) {
    console.warn(
      "[contact] GMAIL_USER/GMAIL_APP_PASSWORD ou CONTACT_TO_EMAIL absent — email non envoyé (message tout de même enregistré).",
    );
    return { envoye: false as const };
  }

  try {
    await transport.sendMail({
      from: `Nardev <${user}>`,
      to: destinataire,
      subject: sujet,
      text: texte,
      ...(repondreA ? { replyTo: repondreA } : {}),
    });
    return { envoye: true as const };
  } catch (error) {
    console.error("[contact] Erreur envoi email :", error);
    return { envoye: false as const };
  }
}
