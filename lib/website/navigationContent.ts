import { client } from "@/sanity/lib/client";

import type { WebsiteLocale } from "@/lib/website/homeContent";

export type NavigationItemKey = "home" | "fairs" | "faq" | "privacy" | "support";

export type WebsiteNavigationItem = {
  itemKey: NavigationItemKey;
  label: string;
  href: string;
  isVisible: boolean;
  sortOrder: number;
};

export type WebsiteNavigationContent = {
  locale: WebsiteLocale;
  menuLabel: string;
  items: WebsiteNavigationItem[];
};

type SanityNavigationItem = {
  itemKey?: string;
  label?: string;
  isVisible?: boolean;
  sortOrder?: number;
};

type SanityNavigationTranslation = {
  languageCode?: string;
  menuLabel?: string;
  items?: SanityNavigationItem[];
};

type SanityWebsiteNavigation = {
  translations?: SanityNavigationTranslation[];
};

const defaultWebsiteLocale: WebsiteLocale = "en";

const navigationHrefByKey: Record<NavigationItemKey, string> = {
  home: "/",
  fairs: "/fairs",
  faq: "/faq",
  privacy: "/privacy",
  support: "/support",
};

const fallbackNavigationContent: Record<WebsiteLocale, WebsiteNavigationContent> = {
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
};

function isNavigationItemKey(value: string | undefined): value is NavigationItemKey {
  return value === "home" || value === "fairs" || value === "faq" || value === "privacy" || value === "support";
}

function sanitizeText(value: unknown): string | undefined {
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim();

  return trimmed.length > 0 ? trimmed : undefined;
}

function sanitizeSortOrder(value: unknown, fallback: number): number {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return fallback;
  }

  return Math.max(0, Math.trunc(value));
}

function pickTranslation(
  translations: SanityNavigationTranslation[] | undefined,
  locale: WebsiteLocale,
): SanityNavigationTranslation | undefined {
  if (!Array.isArray(translations)) {
    return undefined;
  }

  const requestedTranslation = translations.find(
    (translation) => translation.languageCode === locale,
  );

  if (requestedTranslation) {
    return requestedTranslation;
  }

  return translations.find((translation) => translation.languageCode === defaultWebsiteLocale);
}

function buildNavigationContentFromTranslation(
  translation: SanityNavigationTranslation | undefined,
  locale: WebsiteLocale,
): WebsiteNavigationContent {
  const fallback = fallbackNavigationContent[locale];

  if (!translation || !Array.isArray(translation.items)) {
    return fallback;
  }

  const fallbackByKey = new Map(
    fallback.items.map((item) => [item.itemKey, item]),
  );

  const items = translation.items
    .map((item): WebsiteNavigationItem | undefined => {
      if (!isNavigationItemKey(item.itemKey)) {
        return undefined;
      }

      const fallbackItem = fallbackByKey.get(item.itemKey);
      const label = sanitizeText(item.label) ?? fallbackItem?.label;

      if (!fallbackItem || !label) {
        return undefined;
      }

      return {
        itemKey: item.itemKey,
        label,
        href: navigationHrefByKey[item.itemKey],
        isVisible: item.isVisible !== false,
        sortOrder: sanitizeSortOrder(item.sortOrder, fallbackItem.sortOrder),
      };
    })
    .filter((item): item is WebsiteNavigationItem => Boolean(item))
    .sort((a, b) => a.sortOrder - b.sortOrder);

  if (items.length === 0) {
    return fallback;
  }

  return {
    locale,
    menuLabel: sanitizeText(translation.menuLabel) ?? fallback.menuLabel,
    items,
  };
}

async function fetchMainNavigation(): Promise<SanityWebsiteNavigation | null> {
  try {
    return await client.fetch(
      `*[_type == "websiteNavigation" && key == "main"][0]{
        translations[]{
          languageCode,
          menuLabel,
          items[]{
            itemKey,
            label,
            isVisible,
            sortOrder
          }
        }
      }`,
      {},
      {
        next: {
          revalidate: 60,
        },
      },
    );
  } catch (error) {
    console.error("Failed to fetch Sanity website navigation content.", error);
    return null;
  }
}

export async function getWebsiteNavigationContent(
  locale: WebsiteLocale,
): Promise<WebsiteNavigationContent> {
  const navigation = await fetchMainNavigation();
  const translation = pickTranslation(navigation?.translations, locale);

  return buildNavigationContentFromTranslation(translation, locale);
}
