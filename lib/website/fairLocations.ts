import type { WebsiteFair } from "@/lib/fairs";
import {
  isCurrentOrFutureFair,
  todayDateKey,
  utcDateKey,
} from "@/lib/website/fairDateFilters";

export type FairLocationCoordinates = {
  latitude: number;
  longitude: number;
};

export type FairLocationGroup = {
  key: string;
  city: string;
  countryISO: string;
  label: string;
  coordinates: FairLocationCoordinates;
  fairs: WebsiteFair[];
  previewFairs: WebsiteFair[];
};

const locationKeyPattern = /^[A-Z0-9]{2,3}:[a-z0-9]+(?:-[a-z0-9]+)*$/;

const canonicalCityAliasesByCountry: Record<string, Record<string, string>> = {
  CN: {
    beijing: "beijing",
    peking: "beijing",
  },
  DE: {
    cologne: "cologne",
    koln: "cologne",
    koeln: "cologne",
    munchen: "munich",
    munich: "munich",
    muenchen: "munich",
  },
  SG: {
    singapore: "singapore",
    singapur: "singapore",
  },
  VN: {
    hcmc: "ho-chi-minh-city",
    "ho-chi-minh": "ho-chi-minh-city",
    "ho-chi-minh-city": "ho-chi-minh-city",
    hochiminh: "ho-chi-minh-city",
    "ho-chi-minh-stadt": "ho-chi-minh-city",
    saigon: "ho-chi-minh-city",
  },
};

function normalizedText(value: unknown): string | undefined {
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function normalizeLocaleKey(value: string): string {
  return value.trim().replaceAll("_", "-").toLowerCase();
}

function localizedFallbackCodes(locale: string): string[] {
  const normalizedLocale = normalizeLocaleKey(locale);
  const baseLanguage = normalizedLocale.split("-")[0];
  return [...new Set([normalizedLocale, baseLanguage, "en", "de"].filter(Boolean))];
}

function locationSlug(value: string): string {
  return value
    .trim()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function finiteCoordinate(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

function canonicalCitySlug(countryISO: string, city: string): string {
  const slug = locationSlug(city);
  return canonicalCityAliasesByCountry[countryISO]?.[slug] ?? slug;
}

export function fairLocationKey(fair: WebsiteFair): string | null {
  const city = normalizedText(fair.city);
  const countryISO = normalizedText(fair.countryISO)?.toUpperCase();
  const slug = city && countryISO ? canonicalCitySlug(countryISO, city) : "";

  if (!city || !countryISO || !slug) {
    return null;
  }

  return `${countryISO}:${slug}`;
}

export function normalizeLocationQueryKey(value: unknown): string | null {
  const text = normalizedText(Array.isArray(value) ? value[0] : value);
  if (!text) {
    return null;
  }

  const parts = text.split(":");
  if (parts.length !== 2) {
    return null;
  }

  const [countryISO, citySlug] = parts;
  const normalizedCountryISO = countryISO.toUpperCase();
  const normalized =
    normalizedCountryISO && citySlug
      ? `${normalizedCountryISO}:${canonicalCitySlug(normalizedCountryISO, citySlug)}`
      : "";

  return locationKeyPattern.test(normalized) ? normalized : null;
}

export function locationKeyFromSearchParams(
  searchParams: Record<string, string | string[] | undefined> | undefined,
): string | null {
  return normalizeLocationQueryKey(searchParams?.location);
}

export function localizedFairLocationLabel(fair: WebsiteFair, locale: string): string {
  for (const localeCode of localizedFallbackCodes(locale)) {
    const labels = fair.localizedLocationLabels[localeCode];
    const label =
      normalizedText(labels?.cityDisplayName) ??
      normalizedText(labels?.city) ??
      normalizedText(labels?.locationName);

    if (label) {
      return label;
    }
  }

  const city = normalizedText(fair.city);
  const countryISO = normalizedText(fair.countryISO);

  if (city) {
    return city;
  }

  return countryISO ? countryISO : "Location";
}

export function localizedFairLocationDetail(
  fair: WebsiteFair,
  locale: string,
): string | null {
  for (const localeCode of localizedFallbackCodes(locale)) {
    const venueName = normalizedText(fair.localizedLocationLabels[localeCode]?.venueName);
    if (venueName) {
      return venueName;
    }
  }

  return normalizedText(fair.venueName) ?? null;
}

export function fairMatchesLocationKey(
  fair: WebsiteFair,
  locationKey: string | null | undefined,
): boolean {
  if (!locationKey) {
    return true;
  }

  return fairLocationKey(fair) === locationKey;
}

function hasUsableCoordinates(fair: WebsiteFair): fair is WebsiteFair & FairLocationCoordinates {
  const latitude = finiteCoordinate(fair.latitude);
  const longitude = finiteCoordinate(fair.longitude);

  return (
    latitude !== undefined &&
    longitude !== undefined &&
    latitude >= -90 &&
    latitude <= 90 &&
    longitude >= -180 &&
    longitude <= 180
  );
}

function compareFairsForPreview(a: WebsiteFair, b: WebsiteFair): number {
  const todayKey = todayDateKey();
  const aTime = a.startDate?.getTime();
  const bTime = b.startDate?.getTime();
  const aUpcoming = a.startDate ? utcDateKey(a.startDate) >= todayKey : false;
  const bUpcoming = b.startDate ? utcDateKey(b.startDate) >= todayKey : false;

  if (aUpcoming !== bUpcoming) {
    return aUpcoming ? -1 : 1;
  }
  if (aTime === undefined && bTime === undefined) {
    return a.name.localeCompare(b.name);
  }
  if (aTime === undefined) {
    return 1;
  }
  if (bTime === undefined) {
    return -1;
  }
  if (aTime !== bTime) {
    return aTime - bTime;
  }

  return a.name.localeCompare(b.name);
}

export function buildFairLocationGroups(
  fairs: WebsiteFair[],
  locale: string,
): FairLocationGroup[] {
  const groupsByKey = new Map<
    string,
    {
      key: string;
      city: string;
      countryISO: string;
      fairs: WebsiteFair[];
      latitudeTotal: number;
      longitudeTotal: number;
      coordinateCount: number;
    }
  >();

  const currentTodayKey = todayDateKey();

  for (const fair of fairs) {
    if (
      fair.lifecycleStatus === "ended" ||
      !isCurrentOrFutureFair(fair, currentTodayKey) ||
      !hasUsableCoordinates(fair)
    ) {
      continue;
    }

    const key = fairLocationKey(fair);
    if (!key) {
      continue;
    }

    const group = groupsByKey.get(key) ?? {
      key,
      city: fair.city.trim(),
      countryISO: fair.countryISO.trim().toUpperCase(),
      fairs: [],
      latitudeTotal: 0,
      longitudeTotal: 0,
      coordinateCount: 0,
    };

    group.fairs.push(fair);
    group.latitudeTotal += fair.latitude;
    group.longitudeTotal += fair.longitude;
    group.coordinateCount += 1;
    groupsByKey.set(key, group);
  }

  return [...groupsByKey.values()]
    .map((group) => {
      const sortedFairs = [...group.fairs].sort(compareFairsForPreview);
      return {
        key: group.key,
        city: group.city,
        countryISO: group.countryISO,
        label: localizedFairLocationLabel(sortedFairs[0], locale),
        coordinates: {
          latitude: group.latitudeTotal / group.coordinateCount,
          longitude: group.longitudeTotal / group.coordinateCount,
        },
        fairs: sortedFairs,
        previewFairs: sortedFairs.slice(0, 5),
      };
    })
    .sort((a, b) => a.label.localeCompare(b.label, locale) || a.key.localeCompare(b.key));
}

export function locationLabelForKey(
  fairs: WebsiteFair[],
  locationKey: string | null | undefined,
  locale: string,
): string | null {
  if (!locationKey) {
    return null;
  }

  const fair = fairs.find((candidate) => fairLocationKey(candidate) === locationKey);
  return fair ? localizedFairLocationLabel(fair, locale) : null;
}

export function fairsLocationHref(locale: string, locationKey: string): string {
  return `/${locale}/fairs?location=${encodeURIComponent(locationKey)}`;
}
