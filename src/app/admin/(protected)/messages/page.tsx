import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { MessagesManager } from "./MessagesManager";

export const metadata: Metadata = { title: "Messages — Admin" };
export const dynamic = "force-dynamic";

async function getMessages() {
  try {
    return await prisma.message.findMany({ orderBy: { createdAt: "desc" } });
  } catch {
    return [];
  }
}

export default async function AdminMessagesPage() {
  const messages = await getMessages();
  const nonLus = messages.filter((m) => !m.lu).length;

  return (
    <div>
      <h1 className="text-2xl">Messages</h1>
      <p className="mt-2 text-sm text-texte-secondaire">
        Demandes reçues via le formulaire <code>/contact</code>
        {nonLus > 0 ? ` — ${nonLus} non lu${nonLus > 1 ? "s" : ""}.` : "."}
      </p>
      <MessagesManager messagesInitiaux={messages} />
    </div>
  );
}
