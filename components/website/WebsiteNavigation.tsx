"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import LanguageSwitcher from "@/components/website/LanguageSwitcher";
import { TemperatureUnitSelector } from "@/components/website/TemperatureUnitSelector";
import type {
  WebsiteNavigationContent,
  WebsiteNavigationItem,
} from "@/lib/website/navigationContent";
import {
  defaultWebsiteLocaleCode,
  isSupportedWebsiteLocale,
  type WebsiteLocaleCode,
} from "@/lib/website/i18n";
import type { WebsiteLanguage } from "@/lib/websiteLanguages";

type Locale = WebsiteLocaleCode;

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
  {
    languageCode: "es",
    displayName: "Spanish",
    nativeName: "Español",
    flagEmoji: "🇪🇸",
    routePrefix: "es",
    sortOrder: 40,
    isFallback: false,
  },
  {
    languageCode: "fr",
    displayName: "French",
    nativeName: "Français",
    flagEmoji: "🇫🇷",
    routePrefix: "fr",
    sortOrder: 50,
    isFallback: false,
  },
  {
    languageCode: "it",
    displayName: "Italian",
    nativeName: "Italiano",
    flagEmoji: "🇮🇹",
    routePrefix: "it",
    sortOrder: 60,
    isFallback: false,
  },
  {
    languageCode: "bs",
    displayName: "Bosnian",
    nativeName: "Bosanski",
    flagEmoji: "🇧🇦",
    routePrefix: "bs",
    sortOrder: 70,
    isFallback: false,
  },
  {
    languageCode: "hr",
    displayName: "Croatian",
    nativeName: "Hrvatski",
    flagEmoji: "🇭🇷",
    routePrefix: "hr",
    sortOrder: 80,
    isFallback: false,
  },
  {
    languageCode: "hi",
    displayName: "Hindi",
    nativeName: "हिन्दी",
    flagEmoji: "🇮🇳",
    routePrefix: "hi",
    sortOrder: 90,
    isFallback: false,
  },
];

const fallbackNavigationByLocale: Record<Locale, WebsiteNavigationContent> = {
  en: {
    locale: "en",
    menuLabel: "Menu",
    items: [
      { itemKey: "home", label: "Home", href: "/", isVisible: true, sortOrder: 10 },
      { itemKey: "fairs", label: "Fairs", href: "/fairs", isVisible: true, sortOrder: 20 },
      { itemKey: "faq", label: "FAQ", href: "/faq", isVisible: true, sortOrder: 30 },
      { itemKey: "privacy", label: "Privacy", href: "/privacy", isVisible: true, sortOrder: 40 },
      { itemKey: "support", label: "Support", href: "/support", isVisible: true, sortOrder: 50 },
    ],
  },
  de: {
    locale: "de",
    menuLabel: "Menü",
    items: [
      { itemKey: "home", label: "Home", href: "/", isVisible: true, sortOrder: 10 },
      { itemKey: "fairs", label: "Messen", href: "/fairs", isVisible: true, sortOrder: 20 },
      { itemKey: "faq", label: "FAQ", href: "/faq", isVisible: true, sortOrder: 30 },
      { itemKey: "privacy", label: "Datenschutz", href: "/privacy", isVisible: true, sortOrder: 40 },
      { itemKey: "support", label: "Support", href: "/support", isVisible: true, sortOrder: 50 },
    ],
  },
  ja: {
    locale: "ja",
    menuLabel: "メニュー",
    items: [
      { itemKey: "home", label: "ホーム", href: "/", isVisible: true, sortOrder: 10 },
      { itemKey: "fairs", label: "展示会", href: "/fairs", isVisible: true, sortOrder: 20 },
      { itemKey: "faq", label: "FAQ", href: "/faq", isVisible: true, sortOrder: 30 },
      { itemKey: "privacy", label: "プライバシー", href: "/privacy", isVisible: true, sortOrder: 40 },
      { itemKey: "support", label: "サポート", href: "/support", isVisible: true, sortOrder: 50 },
    ],
  },
  es: {
    locale: "es",
    menuLabel: "Menú",
    items: [
      { itemKey: "home", label: "Inicio", href: "/", isVisible: true, sortOrder: 10 },
      { itemKey: "fairs", label: "Ferias", href: "/fairs", isVisible: true, sortOrder: 20 },
      { itemKey: "faq", label: "FAQ", href: "/faq", isVisible: true, sortOrder: 30 },
      { itemKey: "privacy", label: "Privacidad", href: "/privacy", isVisible: true, sortOrder: 40 },
      { itemKey: "support", label: "Soporte", href: "/support", isVisible: true, sortOrder: 50 },
    ],
  },
  fr: {
    locale: "fr",
    menuLabel: "Menu",
    items: [
      { itemKey: "home", label: "Accueil", href: "/", isVisible: true, sortOrder: 10 },
      { itemKey: "fairs", label: "Salons", href: "/fairs", isVisible: true, sortOrder: 20 },
      { itemKey: "faq", label: "FAQ", href: "/faq", isVisible: true, sortOrder: 30 },
      { itemKey: "privacy", label: "Confidentialité", href: "/privacy", isVisible: true, sortOrder: 40 },
      { itemKey: "support", label: "Support", href: "/support", isVisible: true, sortOrder: 50 },
    ],
  },
  it: {
    locale: "it",
    menuLabel: "Menu",
    items: [
      { itemKey: "home", label: "Home", href: "/", isVisible: true, sortOrder: 10 },
      { itemKey: "fairs", label: "Fiere", href: "/fairs", isVisible: true, sortOrder: 20 },
      { itemKey: "faq", label: "FAQ", href: "/faq", isVisible: true, sortOrder: 30 },
      { itemKey: "privacy", label: "Privacy", href: "/privacy", isVisible: true, sortOrder: 40 },
      { itemKey: "support", label: "Supporto", href: "/support", isVisible: true, sortOrder: 50 },
    ],
  },
  bs: {
    locale: "bs",
    menuLabel: "Meni",
    items: [
      { itemKey: "home", label: "Početna", href: "/", isVisible: true, sortOrder: 10 },
      { itemKey: "fairs", label: "Sajmovi", href: "/fairs", isVisible: true, sortOrder: 20 },
      { itemKey: "faq", label: "FAQ", href: "/faq", isVisible: true, sortOrder: 30 },
      { itemKey: "privacy", label: "Privatnost", href: "/privacy", isVisible: true, sortOrder: 40 },
      { itemKey: "support", label: "Podrška", href: "/support", isVisible: true, sortOrder: 50 },
    ],
  },
  hr: {
    locale: "hr",
    menuLabel: "Izbornik",
    items: [
      { itemKey: "home", label: "Početna", href: "/", isVisible: true, sortOrder: 10 },
      { itemKey: "fairs", label: "Sajmovi", href: "/fairs", isVisible: true, sortOrder: 20 },
      { itemKey: "faq", label: "FAQ", href: "/faq", isVisible: true, sortOrder: 30 },
      { itemKey: "privacy", label: "Privatnost", href: "/privacy", isVisible: true, sortOrder: 40 },
      { itemKey: "support", label: "Podrška", href: "/support", isVisible: true, sortOrder: 50 },
    ],
  },
  hi: {
    locale: "hi",
    menuLabel: "मेन्यू",
    items: [
      { itemKey: "home", label: "होम", href: "/", isVisible: true, sortOrder: 10 },
      { itemKey: "fairs", label: "मेले", href: "/fairs", isVisible: true, sortOrder: 20 },
      { itemKey: "faq", label: "FAQ", href: "/faq", isVisible: true, sortOrder: 30 },
      { itemKey: "privacy", label: "गोपनीयता", href: "/privacy", isVisible: true, sortOrder: 40 },
      { itemKey: "support", label: "सहायता", href: "/support", isVisible: true, sortOrder: 50 },
    ],
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

function knownLocale(languageCode: string): Locale {
  if (isSupportedWebsiteLocale(languageCode)) {
    return languageCode;
  }

  return defaultWebsiteLocaleCode;
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

function localizeNavigationItem(
  item: WebsiteNavigationItem,
  language: WebsiteLanguage,
): WebsiteNavigationItem {
  return {
    ...item,
    href: localizedPath(language, item.href),
  };
}

export default function WebsiteNavigation() {
  const pathname = usePathname();
  const [languages, setLanguages] =
    useState<WebsiteLanguage[]>(fallbackLanguages);
  const [navigation, setNavigation] = useState<WebsiteNavigationContent | null>(
    null,
  );

  const currentLanguage = useMemo(
    () => getCurrentLanguage(pathname, languages),
    [pathname, languages],
  );

  const currentLocale = knownLocale(currentLanguage.languageCode);
  const fallbackNavigation = fallbackNavigationByLocale[currentLocale];

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

  useEffect(() => {
    let isMounted = true;

    async function loadNavigation() {
      try {
        const response = await fetch(
          `/api/website-navigation?locale=${encodeURIComponent(currentLocale)}`,
          {
            cache: "no-store",
          },
        );

        if (!response.ok) {
          return;
        }

        const payload = (await response.json()) as {
          navigation?: WebsiteNavigationContent;
        };

        if (isMounted && payload.navigation) {
          setNavigation(payload.navigation);
        }
      } catch {
        // Fallback navigation stays active.
      }
    }

    loadNavigation();

    return () => {
      isMounted = false;
    };
  }, [currentLocale]);

  const navigationContent = navigation ?? fallbackNavigation;

  const navItems = navigationContent.items
    .filter((item) => item.isVisible)
    .map((item) => localizeNavigationItem(item, currentLanguage));

  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-6 text-sm sm:w-auto sm:justify-end">
      <nav
        aria-label={navigationContent.menuLabel}
        className="flex flex-wrap items-center justify-center gap-2 sm:justify-end"
      >
        {navItems.map((item) => {
          const isActive = isActivePath(
            pathname,
            item.href,
            item.itemKey === "home",
          );

          return (
            <Link
              key={item.itemKey}
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

      <div className="flex items-center gap-1">
        <LanguageSwitcher languages={languages} />
        <TemperatureUnitSelector locale={currentLocale} />
      </div>
    </div>
  );
}
