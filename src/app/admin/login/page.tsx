import { Suspense } from "react";
import { LoginForm } from "./LoginForm";

export default function AdminLoginPage() {
  return (
    <div className="mx-auto max-w-sm">
      <h1 className="text-2xl">Connexion administrateur</h1>
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}
