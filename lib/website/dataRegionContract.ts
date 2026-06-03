import {
  websiteLocaleOrDefault,
  type WebsiteLocaleCode,
} from "@/lib/website/i18n";

export const FAIR_REGION_QUERY_PARAM = "region";
export const DATA_REGION_ALL_ID = "all";
export const DATA_REGION_FALLBACK_ID = "other";

export const DATA_REGION_VISIBLE_SELECTABLE_IDS = [
  "europe",
  "asia",
  "middleEast",
  "northAmerica",
  "southAmerica",
  "africa",
  "oceania",
  "other",
] as const;

export const DATA_REGION_SCOPE_IDS = [
  ...DATA_REGION_VISIBLE_SELECTABLE_IDS,
  DATA_REGION_ALL_ID,
] as const;

export type DataRegionID = (typeof DATA_REGION_SCOPE_IDS)[number];

const DATA_REGION_LABELS: Record<DataRegionID, Record<WebsiteLocaleCode, string>> = {
  europe: {
    en: "Europe",
    de: "Europa",
    ja: "ヨーロッパ",
    es: "Europa",
    fr: "Europe",
    it: "Europa",
    bs: "Evropa",
    hr: "Europa",
    hi: "यूरोप",
  },
  asia: {
    en: "Asia",
    de: "Asien",
    ja: "アジア",
    es: "Asia",
    fr: "Asie",
    it: "Asia",
    bs: "Azija",
    hr: "Azija",
    hi: "एशिया",
  },
  middleEast: {
    en: "Middle East",
    de: "Naher Osten",
    ja: "中東",
    es: "Oriente Medio",
    fr: "Moyen-Orient",
    it: "Medio Oriente",
    bs: "Bliski istok",
    hr: "Bliski istok",
    hi: "मध्य पूर्व",
  },
  northAmerica: {
    en: "North America",
    de: "Nordamerika",
    ja: "北米",
    es: "Norteamérica",
    fr: "Amérique du Nord",
    it: "Nord America",
    bs: "Sjeverna Amerika",
    hr: "Sjeverna Amerika",
    hi: "उत्तरी अमेरिका",
  },
  southAmerica: {
    en: "South America",
    de: "Südamerika",
    ja: "南米",
    es: "Sudamérica",
    fr: "Amérique du Sud",
    it: "Sud America",
    bs: "Južna Amerika",
    hr: "Južna Amerika",
    hi: "दक्षिण अमेरिका",
  },
  africa: {
    en: "Africa",
    de: "Afrika",
    ja: "アフリカ",
    es: "África",
    fr: "Afrique",
    it: "Africa",
    bs: "Afrika",
    hr: "Afrika",
    hi: "अफ्रीका",
  },
  oceania: {
    en: "Oceania",
    de: "Ozeanien",
    ja: "オセアニア",
    es: "Oceanía",
    fr: "Océanie",
    it: "Oceania",
    bs: "Okeanija",
    hr: "Oceanija",
    hi: "ओशिआनिया",
  },
  other: {
    en: "Other",
    de: "Sonstige",
    ja: "その他",
    es: "Otros",
    fr: "Autres",
    it: "Altre",
    bs: "Ostalo",
    hr: "Ostalo",
    hi: "अन्य",
  },
  all: {
    en: "All regions",
    de: "Alle Regionen",
    ja: "すべての地域",
    es: "Todas las regiones",
    fr: "Toutes les régions",
    it: "Tutte le regioni",
    bs: "Sve regije",
    hr: "Sve regije",
    hi: "सभी क्षेत्र",
  },
};

const DATA_REGION_FILTER_LABELS: Record<WebsiteLocaleCode, string> = {
  en: "Region",
  de: "Region",
  ja: "地域",
  es: "Región",
  fr: "Région",
  it: "Regione",
  bs: "Regija",
  hr: "Regija",
  hi: "क्षेत्र",
};

export const COUNTRY_ISO_BY_DATA_REGION_ID: Record<
  Exclude<DataRegionID, "all">,
  readonly string[]
> = {
  europe: [
    "CH",
    "DE",
    "AT",
    "FR",
    "IT",
    "ES",
    "NL",
    "BE",
    "LU",
    "GB",
    "IE",
    "DK",
    "SE",
    "NO",
    "FI",
    "PL",
    "CZ",
    "SK",
    "HU",
    "RO",
    "BG",
    "HR",
    "BA",
    "SI",
    "RS",
    "GR",
    "PT",
    "TR",
    "CY",
  ],
  asia: ["CN", "JP", "KR", "IN", "SG", "TH", "VN", "MY", "ID", "PH", "TW", "HK"],
  middleEast: ["AE", "SA", "QA", "KW", "OM", "BH", "IL", "JO", "IQ", "IR", "LB", "PS", "SY", "YE"],
  northAmerica: ["US", "CA", "MX"],
  southAmerica: ["BR", "AR", "CL", "CO", "PE", "UY", "PY"],
  africa: ["ZA", "EG", "MA", "KE", "NG", "TN", "DZ"],
  oceania: ["AU", "NZ"],
  other: [],
};

const DATA_REGION_ID_BY_COUNTRY_ISO = Object.fromEntries(
  Object.entries(COUNTRY_ISO_BY_DATA_REGION_ID).flatMap(([regionID, countryISOs]) =>
    countryISOs.map((countryISO) => [countryISO, regionID]),
  ),
) as Record<string, DataRegionID | undefined>;

function normalizedText(value: unknown): string | null {
  const text = Array.isArray(value) ? value[0] : value;
  if (typeof text !== "string") {
    return null;
  }

  const trimmed = text.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export function normalizeDataRegionScopeID(value: unknown): DataRegionID {
  const normalizedValue = normalizedText(value);
  return DATA_REGION_SCOPE_IDS.includes(normalizedValue as DataRegionID)
    ? (normalizedValue as DataRegionID)
    : DATA_REGION_ALL_ID;
}

export function dataRegionScopeFromSearchParams(
  searchParams: Record<string, string | string[] | undefined> | undefined,
): DataRegionID {
  return normalizeDataRegionScopeID(searchParams?.[FAIR_REGION_QUERY_PARAM]);
}

export function dataRegionIDForCountryISO(countryISO: string | null | undefined): DataRegionID {
  const normalizedCountryISO = countryISO?.trim().toUpperCase() ?? "";
  return DATA_REGION_ID_BY_COUNTRY_ISO[normalizedCountryISO] ?? DATA_REGION_FALLBACK_ID;
}

export function dataRegionLabel(regionID: DataRegionID, locale: string): string {
  const localeCode = websiteLocaleOrDefault(locale);
  return DATA_REGION_LABELS[regionID][localeCode] ?? DATA_REGION_LABELS[regionID].en;
}

export function dataRegionFilterLabel(locale: string): string {
  const localeCode = websiteLocaleOrDefault(locale);
  return DATA_REGION_FILTER_LABELS[localeCode] ?? DATA_REGION_FILTER_LABELS.en;
}
