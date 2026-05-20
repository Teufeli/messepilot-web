import {
  isDisplayablePublicWeatherSnapshot,
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

function weatherToneClass(iconKey: WeatherIconKey) {
  switch (iconKey) {
    case "sunny":
      return "bg-amber-300 ring-amber-100";
    case "partly-cloudy":
      return "bg-sky-300 ring-sky-100";
    case "cloudy":
    case "fog":
      return "bg-slate-300 ring-slate-100";
    case "rain":
      return "bg-blue-400 ring-blue-100";
    case "snow":
      return "bg-cyan-200 ring-cyan-50";
    case "storm":
      return "bg-violet-400 ring-violet-100";
    case "wind":
      return "bg-teal-300 ring-teal-100";
    case "unknown":
      return "bg-slate-400 ring-slate-100";
  }
}

function formatTemperature(value: number, locale: string) {
  return `${new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(value)} °C`;
}

function formatObservedAt(value: Date, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(value);
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
            "rounded-full ring-4",
            variant === "detail" ? "h-3 w-3" : "h-2.5 w-2.5",
            weatherToneClass(weather.current.iconKey),
          ].join(" ")}
        />
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
}: {
  weather: PublicWeatherLocationSnapshot | null | undefined;
  locale: string;
  copy: WeatherCopy;
}) {
  const hasWeather = isDisplayablePublicWeatherSnapshot(weather);

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
