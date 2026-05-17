import { client } from "@/sanity/lib/client";
import {
  defaultWebsiteLocaleCode,
  supportedWebsiteLocaleCodes,
  type WebsiteLocaleCode,
} from "@/lib/website/i18n";

export type WebsiteLocale = WebsiteLocaleCode;

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

export const supportedWebsiteLocales: WebsiteLocale[] = [
  ...supportedWebsiteLocaleCodes,
];

export const defaultWebsiteLocale: WebsiteLocale = defaultWebsiteLocaleCode;

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
  es: {
    locale: "es",
    seoTitle: "MessePilot | Planificación de ferias simplificada",
    seoDescription:
      "MessePilot ayuda a planificar ferias y gestionar booths, notas, tareas, contactos, fotos, videos y documentos.",
    heroEyebrow: "MessePilot",
    heroTitle: "Planificación de ferias simplificada.",
    heroText:
      "MessePilot ayuda a planificar ferias y organizar booths, notas, tareas, contactos, fotos, videos y documentos en un solo lugar.",
    primaryButtonLabel: "Solicitar acceso beta",
    primaryButtonHref: fallbackPrimaryButtonHref,
    primaryButtonNote:
      "MessePilot está actualmente en beta privada. El acceso se revisa manualmente. Al solicitar acceso, aceptas que la información proporcionada se utilice para revisar tu solicitud, contactarte sobre MessePilot y gestionar tu acceso beta. También aceptas no compartir públicamente capturas de pantalla, funciones no publicadas, detalles internos de prueba ni enlaces de acceso sin permiso previo.",
  },
  fr: {
    locale: "fr",
    seoTitle: "MessePilot | Planification de salons simplifiée",
    seoDescription:
      "MessePilot aide à planifier des salons et à gérer booths, notes, tâches, contacts, photos, vidéos et documents.",
    heroEyebrow: "MessePilot",
    heroTitle: "La planification de salons simplifiée.",
    heroText:
      "MessePilot aide à planifier des salons et à organiser booths, notes, tâches, contacts, photos, vidéos et documents au même endroit.",
    primaryButtonLabel: "Demander l'accès bêta",
    primaryButtonHref: fallbackPrimaryButtonHref,
    primaryButtonNote:
      "MessePilot est actuellement en bêta privée. L'accès est vérifié manuellement. En demandant l'accès, vous acceptez que les informations fournies soient utilisées pour examiner votre demande, vous contacter au sujet de MessePilot et gérer votre accès bêta. Vous acceptez également de ne pas partager publiquement captures d'écran, fonctionnalités non publiées, détails de test internes ou liens d'accès sans autorisation préalable.",
  },
  it: {
    locale: "it",
    seoTitle: "MessePilot | Pianificazione fiere semplificata",
    seoDescription:
      "MessePilot aiuta a pianificare fiere e gestire booth, note, attività, contatti, foto, video e documenti.",
    heroEyebrow: "MessePilot",
    heroTitle: "Pianificazione fiere semplificata.",
    heroText:
      "MessePilot aiuta a pianificare fiere e a organizzare booth, note, attività, contatti, foto, video e documenti in un unico posto.",
    primaryButtonLabel: "Richiedi accesso beta",
    primaryButtonHref: fallbackPrimaryButtonHref,
    primaryButtonNote:
      "MessePilot è attualmente in beta privata. L'accesso viene verificato manualmente. Richiedendo l'accesso, accetti che le informazioni fornite siano usate per valutare la richiesta, contattarti su MessePilot e gestire il tuo accesso beta. Accetti inoltre di non condividere pubblicamente screenshot, funzionalità non pubblicate, dettagli di test interni o link di accesso senza autorizzazione preventiva.",
  },
  bs: {
    locale: "bs",
    seoTitle: "MessePilot | Jednostavnije planiranje sajmova",
    seoDescription:
      "MessePilot pomaže pri planiranju sajmova i upravljanju boothovima, bilješkama, zadacima, kontaktima, fotografijama, videozapisima i dokumentima.",
    heroEyebrow: "MessePilot",
    heroTitle: "Jednostavnije planiranje sajmova.",
    heroText:
      "MessePilot pomaže pri planiranju sajmova i organizaciji boothova, bilješki, zadataka, kontakata, fotografija, videozapisa i dokumenata na jednom mjestu.",
    primaryButtonLabel: "Zatraži beta pristup",
    primaryButtonHref: fallbackPrimaryButtonHref,
    primaryButtonNote:
      "MessePilot je trenutno u privatnoj beta verziji. Pristup se provjerava ručno. Slanjem zahtjeva prihvatate da se dostavljene informacije koriste za pregled beta zahtjeva, kontaktiranje u vezi s MessePilotom i upravljanje beta pristupom. Također prihvatate da bez prethodne dozvole ne dijelite javno snimke ekrana, neobjavljene funkcije, interne detalje testiranja ili pristupne linkove.",
  },
  hr: {
    locale: "hr",
    seoTitle: "MessePilot | Jednostavnije planiranje sajmova",
    seoDescription:
      "MessePilot pomaže planirati sajmove i upravljati boothovima, bilješkama, zadacima, kontaktima, fotografijama, videozapisima i dokumentima.",
    heroEyebrow: "MessePilot",
    heroTitle: "Jednostavnije planiranje sajmova.",
    heroText:
      "MessePilot pomaže planirati sajmove i organizirati boothove, bilješke, zadatke, kontakte, fotografije, videozapise i dokumente na jednom mjestu.",
    primaryButtonLabel: "Zatraži beta pristup",
    primaryButtonHref: fallbackPrimaryButtonHref,
    primaryButtonNote:
      "MessePilot je trenutačno u privatnoj beta verziji. Pristup se provjerava ručno. Slanjem zahtjeva pristajete da se dostavljene informacije koriste za pregled beta zahtjeva, kontaktiranje u vezi s MessePilotom i upravljanje beta pristupom. Također pristajete da bez prethodnog dopuštenja ne dijelite javno snimke zaslona, neobjavljene značajke, interne detalje testiranja ili pristupne poveznice.",
  },
  hi: {
    locale: "hi",
    seoTitle: "MessePilot | व्यापार मेलों की योजना आसान",
    seoDescription:
      "MessePilot व्यापार मेलों की योजना बनाने और booth, नोट, कार्य, संपर्क, फोटो, वीडियो और दस्तावेज प्रबंधित करने में मदद करता है।",
    heroEyebrow: "MessePilot",
    heroTitle: "व्यापार मेलों की योजना आसान।",
    heroText:
      "MessePilot व्यापार मेलों की योजना बनाने और booth, नोट, कार्य, संपर्क, फोटो, वीडियो और दस्तावेजों को एक जगह व्यवस्थित करने में मदद करता है।",
    primaryButtonLabel: "बीटा एक्सेस का अनुरोध करें",
    primaryButtonHref: fallbackPrimaryButtonHref,
    primaryButtonNote:
      "MessePilot अभी निजी बीटा में है। एक्सेस की समीक्षा मैन्युअल रूप से की जाती है। एक्सेस का अनुरोध करके आप सहमत होते हैं कि दी गई जानकारी का उपयोग आपके बीटा अनुरोध की समीक्षा, MessePilot के बारे में आपसे संपर्क करने और आपके बीटा एक्सेस को प्रबंधित करने के लिए किया जा सकता है। आप यह भी सहमत होते हैं कि पूर्व अनुमति के बिना स्क्रीनशॉट, अप्रकाशित सुविधाएं, आंतरिक परीक्षण विवरण या एक्सेस लिंक सार्वजनिक रूप से साझा नहीं करेंगे।",
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

  return undefined;
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
          revalidate: 60,
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
