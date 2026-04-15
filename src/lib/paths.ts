import { defaultLanguage, type Language } from "./site";

export function withBasePath(pathname: string) {
  const normalized = pathname.startsWith("/") ? pathname.slice(1) : pathname;
  return `${import.meta.env.BASE_URL}${normalized}`;
}

export function localizedPath(lang: Language, pathname = "") {
  const cleanPath = pathname.replace(/^\/+|\/+$/g, "");
  return withBasePath(cleanPath ? `${lang}/${cleanPath}/` : `${lang}/`);
}

export function switchLanguagePath(currentLang: Language, targetLang: Language, pathname: string) {
  const base = import.meta.env.BASE_URL.replace(/\/+$/, "");
  const strippedBase = pathname.startsWith(base) ? pathname.slice(base.length) : pathname;
  const trimmed = strippedBase.replace(/^\/+|\/+$/g, "");

  if (!trimmed) {
    return localizedPath(targetLang);
  }

  const segments = trimmed.split("/");
  if (segments[0] === currentLang) {
    segments[0] = targetLang;
  } else if (segments[0] === defaultLanguage || segments[0] === "en") {
    segments[0] = targetLang;
  } else {
    segments.unshift(targetLang);
  }

  return withBasePath(`${segments.join("/")}/`);
}
