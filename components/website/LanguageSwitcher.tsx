"use client";

import { usePathname, useRouter } from "next/navigation";
import type { WebsiteLanguage } from "@/lib/websiteLanguages";
import {
  websiteLocaleCookieName,
  websiteLocaleStorageKey,
} from "@/lib/website/i18n";

type LanguageSwitcherProps = {
  languages: WebsiteLanguage[];
};

function isLocaleLikeSegment(segment: string | undefined): boolean {
  return Boolean(segment && /^[a-z]{2}(-[a-z]{2})?$/i.test(segment));
}

function temporaryLanguageForLocale(locale: string): WebsiteLanguage {
  return {
    languageCode: locale,
    displayName: locale.toUpperCase(),
    nativeName: locale.toUpperCase(),
    flagEmoji: "",
    routePrefix: locale,
    sortOrder: Number.MAX_SAFE_INTEGER,
    isFallback: false,
  };
}

function getCurrentLanguage(
  pathname: string,
  languages: WebsiteLanguage[],
): WebsiteLanguage {
  const firstSegment = pathname.split("/").filter(Boolean)[0];

  const matchedLanguage = languages.find(
    (language) =>
      language.routePrefix === firstSegment ||
      language.languageCode === firstSegment,
  );

  if (matchedLanguage) {
    return matchedLanguage;
  }

  if (isLocaleLikeSegment(firstSegment)) {
    return temporaryLanguageForLocale(firstSegment);
  }

  return languages.find((language) => language.isFallback) || languages[0];
}

function getPathWithoutLocale(
  pathname: string,
  languages: WebsiteLanguage[],
): string {
  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];

  const hasKnownLocalePrefix = languages.some(
    (language) =>
      language.routePrefix === firstSegment ||
      language.languageCode === firstSegment,
  );

  const hasLocalePrefix =
    hasKnownLocalePrefix || isLocaleLikeSegment(firstSegment);

  if (segments.length > 0 && hasLocalePrefix) {
    const rest = segments.slice(1).join("/");
    return rest ? `/${rest}` : "/";
  }

  return pathname || "/";
}

function getLocalizedPath(
  pathname: string,
  language: WebsiteLanguage,
  languages: WebsiteLanguage[],
): string {
  const basePath = getPathWithoutLocale(pathname, languages);

  if (language.isFallback || language.routePrefix === "") {
    return basePath;
  }

  return basePath === "/"
    ? `/${language.routePrefix}`
    : `/${language.routePrefix}${basePath}`;
}

function shortLanguageLabel(languageCode: string): string {
  return languageCode.toUpperCase();
}

function persistLanguagePreference(languageCode: string) {
  document.cookie = `${websiteLocaleCookieName}=${encodeURIComponent(
    languageCode,
  )}; path=/; max-age=31536000; samesite=lax`;

  try {
    window.localStorage.setItem(websiteLocaleStorageKey, languageCode);
  } catch {
    // Cookie persistence is enough for routing; localStorage is best effort.
  }
}

function languageSelectAriaLabel(languageCode: string): string {
  switch (languageCode) {
    case "de":
      return "Website-Sprache auswählen";
    case "ja":
      return "サイトの言語を選択";
    case "es":
      return "Seleccionar idioma del sitio";
    case "fr":
      return "Sélectionner la langue du site";
    case "it":
      return "Seleziona la lingua del sito";
    case "bs":
      return "Odaberite jezik web stranice";
    case "hr":
      return "Odaberite jezik web-stranice";
    case "hi":
      return "वेबसाइट की भाषा चुनें";
    default:
      return "Select website language";
  }
}

export default function LanguageSwitcher({ languages }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();

  const currentLanguage = getCurrentLanguage(pathname, languages);

  const availableLanguages = [...languages];

  if (
    currentLanguage &&
    !availableLanguages.some(
      (language) => language.languageCode === currentLanguage.languageCode,
    )
  ) {
    availableLanguages.push(currentLanguage);
  }

  const sortedLanguages = [...availableLanguages].sort((a, b) =>
    a.nativeName.localeCompare(b.nativeName, undefined, {
      sensitivity: "base",
    }),
  );

  if (!currentLanguage) {
    return null;
  }

  return (
    <label className="inline-flex items-center">
      <select
        aria-label={languageSelectAriaLabel(currentLanguage.languageCode)}
        value={currentLanguage.languageCode}
        onChange={(event) => {
          const selectedLanguage = sortedLanguages.find(
            (language) => language.languageCode === event.target.value,
          );

          if (selectedLanguage) {
            persistLanguagePreference(selectedLanguage.languageCode);
            router.push(
              getLocalizedPath(pathname, selectedLanguage, sortedLanguages),
            );
          }
        }}
        className="cursor-pointer bg-transparent text-sm font-semibold uppercase text-slate-700 outline-none transition hover:text-slate-950"
      >
        {sortedLanguages.map((language) => (
          <option key={language.languageCode} value={language.languageCode}>
            {shortLanguageLabel(language.languageCode)}
          </option>
        ))}
      </select>
    </label>
  );
}
