import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <h1 className="text-2xl">Tableau de bord</h1>
      <p className="mt-2 text-texte-secondaire">
        Connecté en tant que {session?.user?.email ?? "—"}.
      </p>
      <p className="mt-6 text-sm text-texte-secondaire">
        Chaque domaine ajoute ici son écran d&apos;administration (services,
        portfolio, messages, équipe).
      </p>
    </div>
  );
}
