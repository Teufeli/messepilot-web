export type PublicWeatherSnapshotStatus =
  | "fresh"
  | "stale"
  | "error"
  | "disabled"
  | "unknown";

export type WeatherIconKey =
  | "sunny"
  | "partly-cloudy"
  | "cloudy"
  | "rain"
  | "snow"
  | "storm"
  | "fog"
  | "wind"
  | "unknown";

export type WeatherConditionLabelKey = WeatherIconKey;

export type PublicWeatherCurrent = {
  temperatureCelsius: number | null;
  conditionCode: string | null;
  iconKey: WeatherIconKey;
  observedAt: Date | null;
};

export type PublicWeatherAttribution = {
  providerLabel: string | null;
  legalUrl: string | null;
};

export type PublicWeatherLocationSnapshot = {
  locationKey: string;
  city: string | null;
  citySlug: string | null;
  countryISO: string | null;
  latitude: number | null;
  longitude: number | null;
  status: PublicWeatherSnapshotStatus;
  current: PublicWeatherCurrent | null;
  attribution: PublicWeatherAttribution | null;
  lastRefreshAt: Date | null;
  expiresAt: Date | null;
  updatedAt: Date | null;
};

export type PublicWeatherSnapshotsByLocationKey = Record<
  string,
  PublicWeatherLocationSnapshot
>;

export function normalizeWeatherIconKey(value: unknown): WeatherIconKey {
  const normalized = typeof value === "string" ? value.trim().toLowerCase() : null;

  switch (normalized) {
    case "sunny":
    case "partly-cloudy":
    case "cloudy":
    case "rain":
    case "snow":
    case "storm":
    case "fog":
    case "wind":
      return normalized;
    default:
      return "unknown";
  }
}

export function isDisplayablePublicWeatherSnapshot(
  snapshot: PublicWeatherLocationSnapshot | null | undefined,
): snapshot is PublicWeatherLocationSnapshot & {
  current: PublicWeatherCurrent & { temperatureCelsius: number };
} {
  return Boolean(
    snapshot &&
      (snapshot.status === "fresh" || snapshot.status === "stale") &&
      snapshot.current &&
      typeof snapshot.current.temperatureCelsius === "number" &&
      Number.isFinite(snapshot.current.temperatureCelsius),
  );
}
