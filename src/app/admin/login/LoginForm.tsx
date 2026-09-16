"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/Button";

export function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = new FormData(e.currentTarget);
    const res = await signIn("credentials", {
      email: String(form.get("email")),
      password: String(form.get("password")),
      redirect: false,
    });

    setLoading(false);
    if (res?.error) {
      setError("Email ou mot de passe incorrect.");
      return;
    }
    router.push(params.get("callbackUrl") ?? "/admin");
  }

  const field =
    "mt-1.5 w-full rounded-lg border border-bordure bg-white px-3.5 py-2.5 text-sm transition-colors focus:border-bleu focus:outline-none focus:ring-2 focus:ring-bleu/20";

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-marine">
          Email
        </label>
        <input id="email" name="email" type="email" required className={field} />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-marine">
          Mot de passe
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className={field}
        />
      </div>
      {error && <p className="text-sm text-erreur">{error}</p>}
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Connexion…" : "Se connecter"}
      </Button>
    </form>
  );
}
