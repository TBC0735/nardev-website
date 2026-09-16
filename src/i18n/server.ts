import { cookies } from "next/headers";
import { defaultLocale, isLocale, LOCALE_COOKIE, type Locale } from "./config";
import { getDictionary, type Dict } from "./dictionaries";

/** Locale courante, lue depuis le cookie (défaut : français). */
export function getLocale(): Locale {
  const value = cookies().get(LOCALE_COOKIE)?.value;
  return isLocale(value) ? value : defaultLocale;
}

/** Dictionnaire de traduction pour la locale courante. */
export function getDict(): Dict {
  return getDictionary(getLocale());
}
