import { client } from "@/sanity/lib/client";

export type WebsiteLocale = "en" | "de" | "ja";

export type HomeContent = {
  locale: WebsiteLocale;
  seoTitle: string;
  seoDescription: string;
  heroEyebrow: string;
  heroTitle: string;
  heroText: string;
  primaryButtonLabel: string;
  primaryButtonHref: string;
  primaryButtonNote: string;
};

type SanityWebsitePageTranslation = {
  languageCode?: string;
  seoTitle?: string;
  seoDescription?: string;
  heroEyebrow?: string;
  heroTitle?: string;
  heroText?: string;
  primaryButtonLabel?: string;
  primaryButtonHref?: string;
  primaryButtonNote?: string;
};

type SanityWebsitePage = {
  translations?: SanityWebsitePageTranslation[];
};

export const supportedWebsiteLocales: WebsiteLocale[] = ["en", "de", "ja"];

export const defaultWebsiteLocale: WebsiteLocale = "en";

const fallbackPrimaryButtonHref =
  "mailto:support@messepilot.ch?subject=MessePilot%20Beta%20Access%20Request&body=Hello%20MessePilot%20Team%2C%0A%0AI%20would%20like%20to%20request%20access%20to%20the%20MessePilot%20private%20beta.%0A%0AName%3A%0ACompany%3A%0ARole%3A%0ACountry%3A%0ADevice%3A%0AReason%20for%20beta%20access%3A%0A%0ABy%20submitting%20this%20request%2C%20I%20confirm%20that%20the%20information%20provided%20may%20be%20used%20to%20review%20my%20beta%20access%20request%2C%20contact%20me%20regarding%20MessePilot%20and%20manage%20my%20beta%20participation.%0A%0AI%20understand%20that%20MessePilot%20is%20currently%20in%20private%20beta.%20I%20agree%20to%20treat%20all%20non-public%20information%2C%20screenshots%2C%20unpublished%20features%2C%20internal%20test%20details%2C%20access%20links%20and%20beta-related%20material%20as%20confidential.%20I%20will%20not%20copy%2C%20publish%2C%20forward%2C%20distribute%20or%20otherwise%20share%20such%20information%20with%20third%20parties%20without%20prior%20written%20permission.%0A%0ABest%20regards%0A";

export const fallbackHomeContent: Record<WebsiteLocale, HomeContent> = {
  en: {
    locale: "en",
    seoTitle: "MessePilot | Trade fair planning made simple",
    seoDescription:
      "MessePilot helps users plan trade fairs and manage booths, notes, tasks, contacts, photos, videos and documents.",
    heroEyebrow: "MessePilot",
    heroTitle: "Trade fair planning made simple.",
    heroText:
      "MessePilot helps users plan trade fairs, manage booths, notes, tasks, contacts, photos, videos and documents.",
    primaryButtonLabel: "Request Beta Access",
    primaryButtonHref: fallbackPrimaryButtonHref,
    primaryButtonNote:
      "MessePilot is currently in private beta. Access is reviewed manually. By requesting access, you agree that the information you provide may be used to review your beta request, contact you about MessePilot and manage your beta access. You also agree not to publicly share screenshots, unpublished features, internal test details or access links without prior permission.",
  },
  de: {
    locale: "de",
    seoTitle: "MessePilot | Messeplanung einfach gemacht",
    seoDescription:
      "MessePilot hilft beim Planen von Messebesuchen und beim Verwalten von Messeständen, Notizen, Aufgaben, Kontakten und Anhängen.",
    heroEyebrow: "MessePilot",
    heroTitle: "Messeplanung einfach gemacht.",
    heroText:
      "MessePilot hilft dir, Messen zu planen und Messestände, Notizen, Aufgaben, Kontakte, Fotos, Videos und Dokumente übersichtlich zu verwalten.",
    primaryButtonLabel: "Beta-Zugang anfragen",
    primaryButtonHref: fallbackPrimaryButtonHref,
    primaryButtonNote:
      "MessePilot befindet sich derzeit in einer privaten Beta. Der Zugang wird manuell geprüft. Mit deiner Anfrage erklärst du dich damit einverstanden, dass die bereitgestellten Informationen zur Prüfung, Kontaktaufnahme und Verwaltung deiner Beta-Teilnahme verwendet werden. Screenshots, unveröffentlichte Funktionen, interne Testdetails oder Zugangsdaten dürfen ohne vorherige Erlaubnis nicht öffentlich geteilt werden.",
  },
  ja: {
    locale: "ja",
    seoTitle: "MessePilot | 展示会の計画をシンプルに",
    seoDescription:
      "MessePilot は、展示会、ブース、メモ、タスク、連絡先、写真、動画、書類をひとつの場所で整理するためのアプリです。",
    heroEyebrow: "MessePilot",
    heroTitle: "展示会の計画をシンプルに。",
    heroText:
      "MessePilot は、展示会、ブース、メモ、タスク、連絡先、写真、動画、書類をひとつの場所で整理するためのアプリです。",
    primaryButtonLabel: "ベータアクセスを申請",
    primaryButtonHref: fallbackPrimaryButtonHref,
    primaryButtonNote:
      "MessePilot は現在、プライベートベータ版です。アクセスは手動で審査されます。申請時に提供された情報は、ベータアクセスの審査、MessePilot に関する連絡、およびベータ参加の管理に使用される場合があります。スクリーンショット、未公開機能、内部テスト情報、アクセスリンクを事前の許可なく公開または共有しないでください。",
  },
};

export function isWebsiteLocale(locale: string): locale is WebsiteLocale {
  return supportedWebsiteLocales.includes(locale as WebsiteLocale);
}

function sanitizeText(value: unknown): string | undefined {
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim();

  return trimmed.length > 0 ? trimmed : undefined;
}

function sanitizeHref(value: unknown, fallbackHref: string): string {
  const href = sanitizeText(value);

  if (!href) {
    return fallbackHref;
  }

  if (href.startsWith("/") || href.startsWith("https://") || href.startsWith("mailto:")) {
    return href;
  }

  return fallbackHref;
}

function pickTranslation(
  translations: SanityWebsitePageTranslation[] | undefined,
  locale: WebsiteLocale,
): SanityWebsitePageTranslation | undefined {
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

function buildHomeContentFromTranslation(
  translation: SanityWebsitePageTranslation | undefined,
  locale: WebsiteLocale,
): HomeContent {
  const fallback = fallbackHomeContent[locale];

  const heroTitle = sanitizeText(translation?.heroTitle);
  const heroText = sanitizeText(translation?.heroText);
  const primaryButtonLabel = sanitizeText(translation?.primaryButtonLabel);

  if (!heroTitle || !heroText || !primaryButtonLabel) {
    return fallback;
  }

  return {
    locale,
    seoTitle: sanitizeText(translation?.seoTitle) ?? fallback.seoTitle,
    seoDescription: sanitizeText(translation?.seoDescription) ?? fallback.seoDescription,
    heroEyebrow: sanitizeText(translation?.heroEyebrow) ?? fallback.heroEyebrow,
    heroTitle,
    heroText,
    primaryButtonLabel,
    primaryButtonHref: sanitizeHref(translation?.primaryButtonHref, fallback.primaryButtonHref),
    primaryButtonNote: sanitizeText(translation?.primaryButtonNote) ?? fallback.primaryButtonNote,
  };
}

async function fetchPublishedHomePage(): Promise<SanityWebsitePage | null> {
  try {
    return await client.fetch(
      `*[_type == "websitePage" && pageKey == "home" && status == "published"][0]{
        translations[]{
          languageCode,
          seoTitle,
          seoDescription,
          heroEyebrow,
          heroTitle,
          heroText,
          primaryButtonLabel,
          primaryButtonHref,
          primaryButtonNote
        }
      }`,
      {},
      {
        next: {
          revalidate: 300,
        },
      },
    );
  } catch (error) {
    console.error("Failed to fetch published Sanity home page content.", error);
    return null;
  }
}

export async function getHomeContent(locale: WebsiteLocale): Promise<HomeContent> {
  const page = await fetchPublishedHomePage();
  const translation = pickTranslation(page?.translations, locale);

  return buildHomeContentFromTranslation(translation, locale);
}
