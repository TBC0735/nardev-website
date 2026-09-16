import { Suspense } from "react";
import Image from "next/image";
import { Container } from "@/components/Container";
import { LoginForm } from "./LoginForm";

export default function AdminLoginPage() {
  return (
    <Container className="flex min-h-[70vh] items-center justify-center py-16">
      <div className="w-full max-w-sm rounded-2xl border border-bordure bg-white p-8 shadow-card">
        <Image
          src="/logo.png"
          alt="Nardev"
          width={1636}
          height={240}
          className="h-6 w-auto"
        />
        <h1 className="mt-6 text-xl font-bold tracking-tight text-marine">
          Connexion administrateur
        </h1>
        <p className="mt-1 text-sm text-texte-secondaire">
          Réservé à l&apos;équipe Nardev.
        </p>
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </Container>
  );
}
