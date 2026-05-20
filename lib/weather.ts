import {
  collection,
  documentId,
  getDocs,
  query,
  where,
} from "firebase/firestore/lite";

import { db } from "@/lib/firebase";
import {
  normalizeWeatherIconKey,
  type PublicWeatherAttribution,
  type PublicWeatherCurrent,
  type PublicWeatherDailyForecast,
  type PublicWeatherLocationSnapshot,
  type PublicWeatherSnapshotStatus,
  type PublicWeatherSnapshotsByLocationKey,
} from "@/lib/website/weather";

const publicWeatherCollection = "publicWeatherLocationSnapshots";
const firestoreInQueryChunkSize = 10;

type FirestorePublicWeatherSnapshot = Record<string, unknown> & {
  locationKey?: unknown;
  city?: unknown;
  citySlug?: unknown;
  countryISO?: unknown;
  latitude?: unknown;
  longitude?: unknown;
  status?: unknown;
  current?: unknown;
  dailyForecast?: unknown;
  attribution?: unknown;
  lastRefreshAt?: unknown;
  expiresAt?: unknown;
  updatedAt?: unknown;
};

function normalizedText(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function finiteNumber(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function timestampToDate(value: unknown): Date | null {
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value;
  }

  if (typeof value === "string" || typeof value === "number") {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  if (value && typeof value === "object" && "toDate" in value) {
    const toDate = (value as { toDate?: unknown }).toDate;
    if (typeof toDate === "function") {
      const date = toDate.call(value);
      return date instanceof Date && !Number.isNaN(date.getTime()) ? date : null;
    }
  }

  return null;
}

function normalizeSnapshotStatus(value: unknown): PublicWeatherSnapshotStatus {
  switch (normalizedText(value)) {
    case "fresh":
      return "fresh";
    case "stale":
      return "stale";
    case "error":
      return "error";
    case "disabled":
      return "disabled";
    default:
      return "unknown";
  }
}

function httpUrl(value: unknown): string | null {
  const url = normalizedText(value);
  if (!url) {
    return null;
  }

  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" || parsed.protocol === "http:" ? url : null;
  } catch {
    return null;
  }
}

function objectRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function mapCurrent(value: unknown): PublicWeatherCurrent | null {
  const data = objectRecord(value);
  if (!data) {
    return null;
  }

  const current: PublicWeatherCurrent = {
    temperatureCelsius: finiteNumber(data.temperatureCelsius),
    conditionCode: normalizedText(data.conditionCode),
    iconKey: normalizeWeatherIconKey(data.iconKey),
    observedAt: timestampToDate(data.observedAt),
  };

  return current.temperatureCelsius !== null ||
    current.conditionCode !== null ||
    current.iconKey !== "unknown" ||
    current.observedAt !== null
    ? current
    : null;
}

function mapDailyForecastDay(value: unknown): PublicWeatherDailyForecast | null {
  const data = objectRecord(value);
  if (!data) {
    return null;
  }

  const forecast: PublicWeatherDailyForecast = {
    date: timestampToDate(data.date),
    conditionCode: normalizedText(data.conditionCode),
    iconKey: normalizeWeatherIconKey(data.iconKey),
    temperatureMinCelsius: finiteNumber(data.temperatureMinCelsius),
    temperatureMaxCelsius: finiteNumber(data.temperatureMaxCelsius),
    precipitationChance: finiteNumber(data.precipitationChance),
  };

  return forecast.date !== null ||
    forecast.conditionCode !== null ||
    forecast.iconKey !== "unknown" ||
    forecast.temperatureMinCelsius !== null ||
    forecast.temperatureMaxCelsius !== null ||
    forecast.precipitationChance !== null
    ? forecast
    : null;
}

function mapDailyForecast(value: unknown): PublicWeatherDailyForecast[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map(mapDailyForecastDay)
    .filter((forecast): forecast is PublicWeatherDailyForecast => Boolean(forecast));
}

function mapAttribution(value: unknown): PublicWeatherAttribution | null {
  const data = objectRecord(value);
  if (!data) {
    return null;
  }

  const attribution: PublicWeatherAttribution = {
    providerLabel: normalizedText(data.providerLabel),
    legalUrl: httpUrl(data.legalUrl),
  };

  return attribution.providerLabel || attribution.legalUrl ? attribution : null;
}

function mapPublicWeatherSnapshot(
  documentIdValue: string,
  data: FirestorePublicWeatherSnapshot,
): PublicWeatherLocationSnapshot {
  return {
    locationKey: documentIdValue,
    city: normalizedText(data.city),
    citySlug: normalizedText(data.citySlug),
    countryISO: normalizedText(data.countryISO)?.toUpperCase() ?? null,
    latitude: finiteNumber(data.latitude),
    longitude: finiteNumber(data.longitude),
    status: normalizeSnapshotStatus(data.status),
    current: mapCurrent(data.current),
    dailyForecast: mapDailyForecast(data.dailyForecast),
    attribution: mapAttribution(data.attribution),
    lastRefreshAt: timestampToDate(data.lastRefreshAt),
    expiresAt: timestampToDate(data.expiresAt),
    updatedAt: timestampToDate(data.updatedAt),
  };
}

function uniqueLocationKeys(locationKeys: Array<string | null | undefined>): string[] {
  return [
    ...new Set(
      locationKeys
        .map((locationKey) => normalizedText(locationKey))
        .filter((locationKey): locationKey is string => Boolean(locationKey)),
    ),
  ];
}

export async function getPublicWeatherSnapshotsByLocationKeys(
  locationKeys: Array<string | null | undefined>,
): Promise<PublicWeatherSnapshotsByLocationKey> {
  const keys = uniqueLocationKeys(locationKeys);
  const snapshots: PublicWeatherSnapshotsByLocationKey = {};

  for (let index = 0; index < keys.length; index += firestoreInQueryChunkSize) {
    const chunk = keys.slice(index, index + firestoreInQueryChunkSize);
    const querySnapshot = await getDocs(
      query(
        collection(db, publicWeatherCollection),
        where(documentId(), "in", chunk),
      ),
    );

    for (const snapshot of querySnapshot.docs) {
      snapshots[snapshot.id] = mapPublicWeatherSnapshot(
        snapshot.id,
        snapshot.data() as FirestorePublicWeatherSnapshot,
      );
    }
  }

  return snapshots;
}
