"use client";

import { usePathname, useRouter } from "next/navigation";
import type { WebsiteLanguage } from "@/lib/websiteLanguages";

type LanguageSwitcherProps = {
  languages: WebsiteLanguage[];
};

function getCurrentLanguage(
  pathname: string,
  languages: WebsiteLanguage[],
): WebsiteLanguage {
  const firstSegment = pathname.split("/").filter(Boolean)[0];

  return (
    languages.find(
      (language) =>
        language.routePrefix === firstSegment ||
        language.languageCode === firstSegment,
    ) ||
    languages.find((language) => language.isFallback) ||
    languages[0]
  );
}

function getPathWithoutLocale(
  pathname: string,
  languages: WebsiteLanguage[],
): string {
  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];

  const hasLocalePrefix = languages.some(
    (language) =>
      language.routePrefix === firstSegment ||
      language.languageCode === firstSegment,
  );

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

export default function LanguageSwitcher({ languages }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();
  const currentLanguage = getCurrentLanguage(pathname, languages);

  if (!currentLanguage) {
    return null;
  }

  return (
    <label className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/85 px-3 py-2 text-sm font-semibold text-slate-800 shadow-sm backdrop-blur">
      <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
        Language
      </span>

      <select
        value={currentLanguage.languageCode}
        onChange={(event) => {
          const selectedLanguage = languages.find(
            (language) => language.languageCode === event.target.value,
          );

          if (selectedLanguage) {
            router.push(getLocalizedPath(pathname, selectedLanguage, languages));
          }
        }}
        className="bg-transparent text-sm font-semibold text-slate-800 outline-none"
      >
        {languages.map((language) => (
          <option key={language.languageCode} value={language.languageCode}>
            {language.nativeName}
          </option>
        ))}
      </select>
    </label>
  );
}
