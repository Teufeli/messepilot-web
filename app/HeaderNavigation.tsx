"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import type { WebsiteLanguage } from "@/lib/websiteLanguages";

type Locale = "en" | "de" | "ja";

const fallbackLanguages: WebsiteLanguage[] = [
  {
    languageCode: "en",
    displayName: "English",
    nativeName: "English",
    flagEmoji: "🇬🇧",
    routePrefix: "",
    sortOrder: 10,
    isFallback: true,
  },
  {
    languageCode: "de",
    displayName: "German",
    nativeName: "Deutsch",
    flagEmoji: "🇩🇪",
    routePrefix: "de",
    sortOrder: 20,
    isFallback: false,
  },
  {
    languageCode: "ja",
    displayName: "Japanese",
    nativeName: "日本語",
    flagEmoji: "🇯🇵",
    routePrefix: "ja",
    sortOrder: 30,
    isFallback: false,
  },
];

const labels: Record<
  Locale,
  {
    home: string;
    fairs: string;
    faq: string;
    privacy: string;
    support: string;
  }
> = {
  en: {
    home: "Home",
    fairs: "Fairs",
    faq: "FAQ",
    privacy: "Privacy",
    support: "Support",
  },
  de: {
    home: "Home",
    fairs: "Messen",
    faq: "FAQ",
    privacy: "Datenschutz",
    support: "Support",
  },
  ja: {
    home: "ホーム",
    fairs: "展示会",
    faq: "FAQ",
    privacy: "プライバシー",
    support: "サポート",
  },
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

function localizedPath(language: WebsiteLanguage, path: string): string {
  if (language.isFallback || language.routePrefix === "") {
    return path;
  }

  return path === "/"
    ? `/${language.routePrefix}`
    : `/${language.routePrefix}${path}`;
}

function isActivePath(pathname: string, href: string, exact = false): boolean {
  if (exact) {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function knownLocale(languageCode: string): Locale {
  if (languageCode === "de" || languageCode === "ja") {
    return languageCode;
  }

  return "en";
}

export default function HeaderNavigation() {
  const pathname = usePathname();
  const [languages, setLanguages] =
    useState<WebsiteLanguage[]>(fallbackLanguages);

  useEffect(() => {
    let isMounted = true;

    async function loadLanguages() {
      try {
        const response = await fetch("/api/website-languages", {
          cache: "no-store",
        });

        if (!response.ok) {
          return;
        }

        const payload = (await response.json()) as {
          languages?: WebsiteLanguage[];
        };

        if (
          isMounted &&
          Array.isArray(payload.languages) &&
          payload.languages.length > 0
        ) {
          setLanguages(payload.languages);
        }
      } catch {
        // Fallback languages stay active.
      }
    }

    loadLanguages();

    return () => {
      isMounted = false;
    };
  }, []);

  const currentLanguage = useMemo(
    () => getCurrentLanguage(pathname, languages),
    [pathname, languages],
  );

  const copy = labels[knownLocale(currentLanguage.languageCode)];

  const navItems = [
    { href: localizedPath(currentLanguage, "/"), label: copy.home, exact: true },
    { href: localizedPath(currentLanguage, "/fairs"), label: copy.fairs },
    { href: localizedPath(currentLanguage, "/faq"), label: copy.faq },
    { href: localizedPath(currentLanguage, "/privacy"), label: copy.privacy },
    { href: localizedPath(currentLanguage, "/support"), label: copy.support },
  ];

  return (
    <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:items-end">
      <nav
        aria-label="Main navigation"
        className="flex flex-wrap items-center justify-center gap-2 text-sm sm:justify-end"
      >
        {navItems.map((item) => {
          const isActive = isActivePath(pathname, item.href, item.exact);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "rounded-full px-3 py-1.5 font-medium transition",
                isActive
                  ? "bg-slate-950 text-white shadow-sm"
                  : "text-slate-700 hover:bg-white/80 hover:text-slate-950",
              ].join(" ")}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <LanguageSwitcher languages={languages} />
    </div>
  );
}
