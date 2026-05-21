import {
  defaultWebsiteLocaleCode,
  isSupportedWebsiteLocale,
  type WebsiteLocaleCode,
} from "@/lib/website/i18n";

export const weatherTemperatureUnitStorageKey =
  "messepilot.weatherTemperatureUnit";
export const weatherTemperatureUnitPreferenceChangedEvent =
  "messepilot:weather-temperature-unit-preference-changed";

export const weatherTemperatureUnitPreferences = [
  "auto",
  "celsius",
  "fahrenheit",
] as const;

export type WeatherTemperatureUnitPreference =
  (typeof weatherTemperatureUnitPreferences)[number];

export type ResolvedWeatherTemperatureUnit = "celsius" | "fahrenheit";

export type WeatherTemperatureUnitCopy = {
  label: string;
  autoShort: string;
  automatic: string;
  celsius: string;
  fahrenheit: string;
};

const weatherTemperatureUnitCopyByLocale: Record<
  WebsiteLocaleCode,
  WeatherTemperatureUnitCopy
> = {
  en: {
    label: "Temperature unit",
    autoShort: "Auto",
    automatic: "Automatic",
    celsius: "°C",
    fahrenheit: "°F",
  },
  de: {
    label: "Temperatureinheit",
    autoShort: "Auto",
    automatic: "Automatisch",
    celsius: "°C",
    fahrenheit: "°F",
  },
  ja: {
    label: "温度単位",
    autoShort: "Auto",
    automatic: "自動",
    celsius: "°C",
    fahrenheit: "°F",
  },
  es: {
    label: "Unidad de temperatura",
    autoShort: "Auto",
    automatic: "Automático",
    celsius: "°C",
    fahrenheit: "°F",
  },
  fr: {
    label: "Unité de température",
    autoShort: "Auto",
    automatic: "Automatique",
    celsius: "°C",
    fahrenheit: "°F",
  },
  it: {
    label: "Unità di temperatura",
    autoShort: "Auto",
    automatic: "Automatico",
    celsius: "°C",
    fahrenheit: "°F",
  },
  bs: {
    label: "Jedinica temperature",
    autoShort: "Auto",
    automatic: "Automatski",
    celsius: "°C",
    fahrenheit: "°F",
  },
  hr: {
    label: "Jedinica temperature",
    autoShort: "Auto",
    automatic: "Automatski",
    celsius: "°C",
    fahrenheit: "°F",
  },
  hi: {
    label: "तापमान इकाई",
    autoShort: "Auto",
    automatic: "स्वचालित",
    celsius: "°C",
    fahrenheit: "°F",
  },
};

function normalizedLocale(locale: string): string {
  return locale.trim().replaceAll("_", "-");
}

function primaryBrowserLocale(): string | null {
  if (typeof navigator === "undefined") {
    return null;
  }

  const language = navigator.languages?.[0] ?? navigator.language;
  return typeof language === "string" && language.trim() ? language : null;
}

function localeRegion(locale: string): string | null {
  const normalized = normalizedLocale(locale);

  try {
    return new Intl.Locale(normalized).region?.toUpperCase() ?? null;
  } catch {
    const match = normalized.match(/-([a-z]{2}|\d{3})$/i);
    return match?.[1]?.toUpperCase() ?? null;
  }
}

function celsiusToFahrenheit(value: number): number {
  return value * 1.8 + 32;
}

function formattedUnit(unit: ResolvedWeatherTemperatureUnit): string {
  return unit === "fahrenheit" ? "°F" : "°C";
}

function convertedTemperature(
  valueCelsius: number,
  unit: ResolvedWeatherTemperatureUnit,
): number {
  return unit === "fahrenheit" ? celsiusToFahrenheit(valueCelsius) : valueCelsius;
}

export function getWeatherTemperatureUnitCopy(
  locale: string,
): WeatherTemperatureUnitCopy {
  return weatherTemperatureUnitCopyByLocale[
    isSupportedWebsiteLocale(locale) ? locale : defaultWebsiteLocaleCode
  ];
}

export function normalizeWeatherTemperatureUnitPreference(
  value: unknown,
): WeatherTemperatureUnitPreference {
  return weatherTemperatureUnitPreferences.includes(
    value as WeatherTemperatureUnitPreference,
  )
    ? (value as WeatherTemperatureUnitPreference)
    : "auto";
}

export function resolveAutoWeatherTemperatureUnit(
  browserLocale: string | null = primaryBrowserLocale(),
): ResolvedWeatherTemperatureUnit {
  return browserLocale && localeRegion(browserLocale) === "US"
    ? "fahrenheit"
    : "celsius";
}

export function resolveWeatherTemperatureUnit(
  preference: WeatherTemperatureUnitPreference,
): ResolvedWeatherTemperatureUnit {
  switch (preference) {
    case "fahrenheit":
      return "fahrenheit";
    case "celsius":
      return "celsius";
    case "auto":
      return resolveAutoWeatherTemperatureUnit();
  }
}

export function formatWeatherTemperatureFromCelsius(
  valueCelsius: number | null | undefined,
  locale: string,
  preference: WeatherTemperatureUnitPreference,
): string | null {
  if (typeof valueCelsius !== "number" || !Number.isFinite(valueCelsius)) {
    return null;
  }

  const unit = resolveWeatherTemperatureUnit(preference);
  const value = convertedTemperature(valueCelsius, unit);
  const formattedValue = new Intl.NumberFormat(locale, {
    maximumFractionDigits: 0,
  }).format(value);

  return `${formattedValue} ${formattedUnit(unit)}`;
}

export function formatWeatherTemperatureRangeFromCelsius(
  minCelsius: number | null | undefined,
  maxCelsius: number | null | undefined,
  locale: string,
  preference: WeatherTemperatureUnitPreference,
): string | null {
  const unit = resolveWeatherTemperatureUnit(preference);
  const formatter = new Intl.NumberFormat(locale, {
    maximumFractionDigits: 0,
  });

  const min =
    typeof minCelsius === "number" && Number.isFinite(minCelsius)
      ? formatter.format(convertedTemperature(minCelsius, unit))
      : null;
  const max =
    typeof maxCelsius === "number" && Number.isFinite(maxCelsius)
      ? formatter.format(convertedTemperature(maxCelsius, unit))
      : null;

  if (min && max) {
    return `${min} / ${max} ${formattedUnit(unit)}`;
  }

  const singleValue = min ?? max;
  return singleValue ? `${singleValue} ${formattedUnit(unit)}` : null;
}
