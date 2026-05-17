import { collection, getDocs, query, where } from "firebase/firestore/lite";
import { db } from "./firebase";
import { isSupportedWebsiteLocale } from "@/lib/website/i18n";

export type WebsiteLanguage = {
  languageCode: string;
  displayName: string;
  nativeName: string;
  flagEmoji: string;
  routePrefix: string;
  sortOrder: number;
  isFallback: boolean;
};

type FirestoreLanguageDocument = {
  languageCode?: string;
  displayName?: string;
  nativeName?: string;
  flagEmoji?: string;
  routePrefix?: string;
  sortOrder?: number;
  status?: string;
  isWebsiteEnabled?: boolean;
  isFallback?: boolean;
};

export const fallbackWebsiteLanguages: WebsiteLanguage[] = [
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

function normalizeLanguage(
  documentId: string,
  data: FirestoreLanguageDocument,
): WebsiteLanguage | null {
  const languageCode = (data.languageCode || documentId).trim().toLowerCase();

  if (!isSupportedWebsiteLocale(languageCode)) {
    return null;
  }

  return {
    languageCode,
    displayName: data.displayName || data.nativeName || languageCode.toUpperCase(),
    nativeName: data.nativeName || data.displayName || languageCode.toUpperCase(),
    flagEmoji: data.flagEmoji || "🌐",
    routePrefix:
      data.routePrefix !== undefined
        ? data.routePrefix
        : languageCode === "en"
          ? ""
          : languageCode,
    sortOrder:
      typeof data.sortOrder === "number"
        ? data.sortOrder
        : Number.MAX_SAFE_INTEGER,
    isFallback: data.isFallback === true || languageCode === "en",
  };
}

export async function getWebsiteLanguages(): Promise<WebsiteLanguage[]> {
  try {
    const snapshot = await getDocs(
      query(
        collection(db, "publicContent", "helpCenter", "languages"),
        where("status", "==", "active"),
        where("isWebsiteEnabled", "==", true),
      ),
    );

    const languages = snapshot.docs
      .map((document) =>
        normalizeLanguage(
          document.id,
          document.data() as FirestoreLanguageDocument,
        ),
      )
      .filter((language): language is WebsiteLanguage => Boolean(language))
      .sort(
        (a, b) =>
          a.sortOrder - b.sortOrder ||
          a.nativeName.localeCompare(b.nativeName),
      );

    const mergedLanguages = [...languages];

    for (const fallbackLanguage of fallbackWebsiteLanguages) {
      const alreadyExists = mergedLanguages.some(
        (language) => language.languageCode === fallbackLanguage.languageCode,
      );

      if (!alreadyExists) {
        mergedLanguages.push(fallbackLanguage);
      }
    }

    return mergedLanguages.sort(
      (a, b) =>
        a.sortOrder - b.sortOrder ||
        a.nativeName.localeCompare(b.nativeName),
    );
  } catch {
    return fallbackWebsiteLanguages;
  }
}
