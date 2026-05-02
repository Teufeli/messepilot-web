"use client";

import { usePathname, useRouter } from "next/navigation";
import type { WebsiteLanguage } from "@/lib/websiteLanguages";

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

function languageLabel(languageCode: string): string {
  switch (languageCode) {
    case "de":
      return "SPRACHE";
    case "ja":
      return "言語";
    case "fr":
      return "LANGUE";
    default:
      return "LANGUAGE";
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
    <label className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/85 px-3 py-2 text-sm font-semibold text-slate-800 shadow-sm backdrop-blur">
      <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
        {languageLabel(currentLanguage.languageCode)}
      </span>

      <select
        value={currentLanguage.languageCode}
        onChange={(event) => {
          const selectedLanguage = sortedLanguages.find(
            (language) => language.languageCode === event.target.value,
          );

          if (selectedLanguage) {
            router.push(
              getLocalizedPath(pathname, selectedLanguage, sortedLanguages),
            );
          }
        }}
        className="bg-transparent text-sm font-semibold text-slate-800 outline-none"
      >
        {sortedLanguages.map((language) => (
          <option key={language.languageCode} value={language.languageCode}>
            {language.nativeName}
          </option>
        ))}
      </select>
    </label>
  );
}
