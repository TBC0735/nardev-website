"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { locales, type Locale } from "@/i18n/config";
import { setLocale } from "@/i18n/actions";

export function LangToggle({
  current,
  label,
}: {
  current: Locale;
  label: string;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function choisir(locale: Locale) {
    if (locale === current) return;
    startTransition(async () => {
      await setLocale(locale);
      router.refresh();
    });
  }

  return (
    <div
      className="flex items-center rounded border border-bordure text-xs font-medium"
      role="group"
      aria-label={label}
    >
      {locales.map((locale, i) => (
        <button
          key={locale}
          type="button"
          onClick={() => choisir(locale)}
          disabled={pending}
          aria-pressed={locale === current}
          className={`px-2 py-1 uppercase transition-colors disabled:opacity-50 ${
            i > 0 ? "border-l border-bordure" : ""
          } ${
            locale === current
              ? "bg-bleu text-white"
              : "text-texte-secondaire hover:text-bleu"
          }`}
        >
          {locale}
        </button>
      ))}
    </div>
  );
}
