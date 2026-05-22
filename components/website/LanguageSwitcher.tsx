"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { WebsiteLanguage } from "@/lib/websiteLanguages";
import {
  websiteLocaleCookieName,
  websiteLocaleStorageKey,
} from "@/lib/website/i18n";

type LanguageSwitcherProps = {
  languages: WebsiteLanguage[];
};

const headerDropdownOpenEvent = "messepilot:website-header-dropdown-opened";
const languageDropdownId = "language";

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

function closedLanguageLabel(language: WebsiteLanguage): string {
  return language.flagEmoji.trim() || "🌐";
}

function languageOptionAriaLabel(language: WebsiteLanguage): string {
  return [language.nativeName, language.displayName]
    .filter((label, index, labels) => label && labels.indexOf(label) === index)
    .join(", ");
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
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

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

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handlePointerDown(event: PointerEvent) {
      if (
        containerRef.current &&
        event.target instanceof Node &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    function handleHeaderDropdownOpen(event: Event) {
      if (
        event instanceof CustomEvent &&
        event.detail !== languageDropdownId
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener(headerDropdownOpenEvent, handleHeaderDropdownOpen);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener(
        headerDropdownOpenEvent,
        handleHeaderDropdownOpen,
      );
    };
  }, [isOpen]);

  if (!currentLanguage) {
    return null;
  }

  return (
    <div ref={containerRef} className="relative inline-flex">
      <button
        type="button"
        aria-label={languageSelectAriaLabel(currentLanguage.languageCode)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        className="inline-flex h-8 w-10 items-center justify-center rounded-full text-lg leading-none text-slate-700 outline-none transition hover:bg-white/80 hover:text-slate-950 focus-visible:ring-2 focus-visible:ring-blue-500/35"
        onClick={() => {
          setIsOpen((current) => {
            const nextOpen = !current;
            if (nextOpen) {
              window.dispatchEvent(
                new CustomEvent(headerDropdownOpenEvent, {
                  detail: languageDropdownId,
                }),
              );
            }
            return nextOpen;
          });
        }}
      >
        <span aria-hidden="true">{closedLanguageLabel(currentLanguage)}</span>
      </button>

      {isOpen ? (
        <div
          role="menu"
          className="absolute right-0 top-full z-[200] mt-2 grid w-32 grid-cols-3 gap-1 overflow-hidden rounded-2xl border border-slate-200 bg-white/95 p-1.5 text-sm shadow-xl shadow-slate-900/10 backdrop-blur"
        >
          {sortedLanguages.map((language) => {
            const isSelected =
              language.languageCode === currentLanguage.languageCode;

            return (
              <button
                key={language.languageCode}
                type="button"
                role="menuitemradio"
                aria-checked={isSelected}
                aria-label={languageOptionAriaLabel(language)}
                title={languageOptionAriaLabel(language)}
                className={[
                  "relative flex h-9 w-9 items-center justify-center rounded-xl text-lg leading-none transition focus-visible:ring-2 focus-visible:ring-blue-500/35",
                  isSelected
                    ? "bg-slate-950 text-white"
                    : "text-slate-700 hover:bg-slate-100 hover:text-slate-950",
                ].join(" ")}
                onClick={() => {
                  persistLanguagePreference(language.languageCode);
                  setIsOpen(false);
                  router.push(
                    getLocalizedPath(pathname, language, sortedLanguages),
                  );
                }}
              >
                <span aria-hidden="true">
                  {closedLanguageLabel(language)}
                </span>
                {isSelected ? (
                  <span
                    aria-hidden="true"
                    className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold leading-none text-white ring-2 ring-white"
                  >
                    ✓
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
