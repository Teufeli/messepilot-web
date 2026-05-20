import {
  hasDisplayablePublicWeatherForecast,
  isDisplayablePublicWeatherSnapshot,
  type PublicWeatherDailyForecast,
  type PublicWeatherLocationSnapshot,
  type WeatherConditionLabelKey,
  type WeatherIconKey,
} from "@/lib/website/weather";
import type { WeatherCopy } from "@/lib/website/weatherCopy";

type WeatherSummaryProps = {
  weather: PublicWeatherLocationSnapshot | null | undefined;
  locale: string;
  conditionLabels: Record<WeatherConditionLabelKey, string>;
  observedAtLabel?: string;
  showObservedAt?: boolean;
  variant?: "compact" | "detail";
};

const defaultForecastLimit = 5;

function weatherSymbol(iconKey: WeatherIconKey) {
  switch (iconKey) {
    case "sunny":
      return "☀️";
    case "partly-cloudy":
      return "⛅️";
    case "cloudy":
      return "☁️";
    case "fog":
      return "🌫️";
    case "rain":
      return "🌧️";
    case "snow":
      return "❄️";
    case "storm":
      return "⛈️";
    case "wind":
      return "🌬️";
    case "unknown":
      return "◦";
  }
}

function formatTemperature(value: number, locale: string) {
  return `${new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(value)} °C`;
}

function formatForecastNumber(value: number, locale: string) {
  return new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(value);
}

function formatObservedAt(value: Date, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(value);
}

function formatForecastDate(value: Date | null, locale: string) {
  if (!value) {
    return null;
  }

  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(value);
}

function formatTemperatureRange(
  forecast: PublicWeatherDailyForecast,
  locale: string,
) {
  const min =
    typeof forecast.temperatureMinCelsius === "number"
      ? formatForecastNumber(forecast.temperatureMinCelsius, locale)
      : null;
  const max =
    typeof forecast.temperatureMaxCelsius === "number"
      ? formatForecastNumber(forecast.temperatureMaxCelsius, locale)
      : null;

  if (min && max) {
    return `${min} / ${max} °C`;
  }

  const singleValue = min ?? max;
  return singleValue ? `${singleValue} °C` : null;
}

function formatPrecipitationChance(value: number | null, locale: string) {
  if (typeof value !== "number" || !Number.isFinite(value) || value < 0) {
    return null;
  }

  const normalized = value <= 1 ? value : value <= 100 ? value / 100 : null;
  if (normalized === null) {
    return null;
  }

  return new Intl.NumberFormat(locale, {
    style: "percent",
    maximumFractionDigits: 0,
  }).format(normalized);
}

function ForecastList({
  forecast,
  limit,
  locale,
  copy,
}: {
  forecast: PublicWeatherDailyForecast[];
  limit: number;
  locale: string;
  copy: WeatherCopy;
}) {
  const displayedForecast = forecast.slice(0, Math.max(0, limit));
  if (displayedForecast.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 border-t border-slate-200 pt-4">
      <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
        {copy.forecast}
      </h3>
      <ol className="mt-3 divide-y divide-slate-200 rounded-2xl bg-white/70">
        {displayedForecast.map((day, index) => {
          const dateLabel = formatForecastDate(day.date, locale);
          const conditionLabel =
            day.iconKey !== "unknown"
              ? copy.conditionLabels[day.iconKey] ?? copy.conditionLabels.unknown
              : day.conditionCode ?? copy.conditionLabels.unknown;
          const temperatureRange = formatTemperatureRange(day, locale);
          const precipitationChance = formatPrecipitationChance(
            day.precipitationChance,
            locale,
          );
          const details = [
            conditionLabel,
            temperatureRange,
            precipitationChance,
          ].filter((detail): detail is string => Boolean(detail));

          return (
            <li key={`${day.date?.toISOString() ?? "forecast"}-${index}`} className="p-3">
              <div className="flex items-start gap-2 text-sm leading-6">
                <span aria-hidden="true" className="mt-0.5 w-5 shrink-0 text-base leading-none">
                  {weatherSymbol(day.iconKey)}
                </span>
                <div className="min-w-0">
                  {dateLabel ? (
                    <p className="font-semibold text-slate-950">{dateLabel}</p>
                  ) : null}
                  <p className="text-slate-600">{details.join(" · ")}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export function WeatherSummary({
  weather,
  locale,
  conditionLabels,
  observedAtLabel,
  showObservedAt = false,
  variant = "compact",
}: WeatherSummaryProps) {
  if (!isDisplayablePublicWeatherSnapshot(weather)) {
    return null;
  }

  const conditionLabel =
    conditionLabels[weather.current.iconKey] ?? conditionLabels.unknown;
  const attribution =
    weather.attribution?.providerLabel && weather.attribution.legalUrl
      ? {
          providerLabel: weather.attribution.providerLabel,
          legalUrl: weather.attribution.legalUrl,
        }
      : null;
  const observedAt =
    showObservedAt && observedAtLabel && weather.current.observedAt
      ? `${observedAtLabel}: ${formatObservedAt(weather.current.observedAt, locale)}`
      : null;

  return (
    <div
      className={[
        "flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-600",
        variant === "detail" ? "mt-3" : "mt-2",
      ].join(" ")}
    >
      <span
        className={[
          "inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 font-medium text-slate-800",
          variant === "detail" ? "px-3 py-1.5 text-sm" : "px-2.5 py-1",
        ].join(" ")}
      >
        <span
          aria-hidden="true"
          className={[
            "shrink-0 leading-none",
            variant === "detail" ? "text-base" : "text-sm",
          ].join(" ")}
        >
          {weatherSymbol(weather.current.iconKey)}
        </span>
        <span>
          {formatTemperature(weather.current.temperatureCelsius, locale)} ·{" "}
          {conditionLabel}
        </span>
      </span>

      {observedAt ? <span className="text-slate-500">{observedAt}</span> : null}

      {attribution ? (
        <a
          href={attribution.legalUrl}
          target="_blank"
          rel="noreferrer"
          className="font-medium text-slate-500 underline decoration-slate-300 underline-offset-2 transition hover:text-slate-900"
        >
          {attribution.providerLabel}
        </a>
      ) : null}
    </div>
  );
}

export function WeatherDetailPanel({
  weather,
  locale,
  copy,
  forecastLimit = defaultForecastLimit,
}: {
  weather: PublicWeatherLocationSnapshot | null | undefined;
  locale: string;
  copy: WeatherCopy;
  forecastLimit?: number;
}) {
  const hasWeather = isDisplayablePublicWeatherSnapshot(weather);
  const hasForecast = hasDisplayablePublicWeatherForecast(weather);

  return (
    <section className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
      {hasWeather ? (
        <>
          <h2 className="text-xl font-semibold text-slate-950">
            {copy.currentWeather}
          </h2>
          <WeatherSummary
            weather={weather}
            locale={locale}
            conditionLabels={copy.conditionLabels}
            observedAtLabel={copy.observedAt}
            showObservedAt
            variant="detail"
          />
          {hasForecast ? (
            <ForecastList
              forecast={weather.dailyForecast}
              limit={forecastLimit}
              locale={locale}
              copy={copy}
            />
          ) : null}
        </>
      ) : null}
      <p
        className={[
          "text-sm leading-6 text-slate-600",
          hasWeather ? "mt-3" : "",
        ].join(" ")}
      >
        {copy.availabilityNote}
      </p>
    </section>
  );
}
