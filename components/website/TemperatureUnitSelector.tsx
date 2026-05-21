"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

import {
  getWeatherTemperatureUnitCopy,
  normalizeWeatherTemperatureUnitPreference,
  resolveWeatherTemperatureUnit,
  weatherTemperatureUnitPreferenceChangedEvent,
  weatherTemperatureUnitPreferences,
  weatherTemperatureUnitStorageKey,
  type ResolvedWeatherTemperatureUnit,
  type WeatherTemperatureUnitPreference,
} from "@/lib/website/weatherUnits";

type TemperatureUnitSelectorProps = {
  locale: string;
};

type WeatherTemperatureUnitPreferenceState = {
  preference: WeatherTemperatureUnitPreference;
  resolvedUnit: ResolvedWeatherTemperatureUnit;
  setPreference: (preference: WeatherTemperatureUnitPreference) => void;
};

let fallbackStoredPreference: WeatherTemperatureUnitPreference = "auto";

function readStoredPreference(): WeatherTemperatureUnitPreference {
  if (typeof window === "undefined") {
    return fallbackStoredPreference;
  }

  try {
    fallbackStoredPreference = normalizeWeatherTemperatureUnitPreference(
      window.localStorage.getItem(weatherTemperatureUnitStorageKey),
    );
    return fallbackStoredPreference;
  } catch {
    return fallbackStoredPreference;
  }
}

function subscribeToStoredPreference(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  window.addEventListener("storage", onStoreChange);
  window.addEventListener(
    weatherTemperatureUnitPreferenceChangedEvent,
    onStoreChange,
  );

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(
      weatherTemperatureUnitPreferenceChangedEvent,
      onStoreChange,
    );
  };
}

function serverPreferenceSnapshot(): WeatherTemperatureUnitPreference {
  return "auto";
}

function preferenceClosedLabel(
  preference: WeatherTemperatureUnitPreference,
  autoShortLabel: string,
): string {
  switch (preference) {
    case "celsius":
      return "°C";
    case "fahrenheit":
      return "°F";
    case "auto":
      return autoShortLabel;
  }
}

function preferenceDropdownLabel(
  preference: WeatherTemperatureUnitPreference,
  labels: ReturnType<typeof getWeatherTemperatureUnitCopy>,
): string {
  switch (preference) {
    case "celsius":
      return labels.celsius;
    case "fahrenheit":
      return labels.fahrenheit;
    case "auto":
      return labels.automatic;
  }
}

export function useWeatherTemperatureUnitPreference(): WeatherTemperatureUnitPreferenceState {
  const preference = useSyncExternalStore(
    subscribeToStoredPreference,
    readStoredPreference,
    serverPreferenceSnapshot,
  );

  const setPreference = useCallback(
    (nextPreference: WeatherTemperatureUnitPreference) => {
      fallbackStoredPreference = nextPreference;

      try {
        window.localStorage.setItem(
          weatherTemperatureUnitStorageKey,
          nextPreference,
        );
      } catch {
        // In private or restricted browser modes, in-memory state still updates.
      }

      window.dispatchEvent(
        new Event(weatherTemperatureUnitPreferenceChangedEvent),
      );
    },
    [],
  );

  return {
    preference,
    resolvedUnit: resolveWeatherTemperatureUnit(preference),
    setPreference,
  };
}

export function TemperatureUnitSelector({
  locale,
}: TemperatureUnitSelectorProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { preference, setPreference } = useWeatherTemperatureUnitPreference();
  const copy = getWeatherTemperatureUnitCopy(locale);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handlePointerDown(event: PointerEvent) {
      if (
        containerRef.current &&
        event.target instanceof Node &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative inline-flex">
      <button
        type="button"
        aria-label={copy.label}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        className="inline-flex min-w-10 items-center justify-center rounded-full px-2.5 py-1.5 text-sm font-semibold text-slate-700 outline-none transition hover:bg-white/80 hover:text-slate-950 focus-visible:ring-2 focus-visible:ring-blue-500/35"
        onClick={() => setIsOpen((current) => !current)}
      >
        {preferenceClosedLabel(preference, copy.autoShort)}
      </button>

      {isOpen ? (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-2 w-40 overflow-hidden rounded-2xl border border-slate-200 bg-white/95 p-1 text-sm shadow-xl shadow-slate-900/10 backdrop-blur"
        >
          {weatherTemperatureUnitPreferences.map((option) => {
            const isSelected = option === preference;

            return (
              <button
                key={option}
                type="button"
                role="menuitemradio"
                aria-checked={isSelected}
                className={[
                  "flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-left transition",
                  isSelected
                    ? "bg-slate-950 text-white"
                    : "text-slate-700 hover:bg-slate-100 hover:text-slate-950",
                ].join(" ")}
                onClick={() => {
                  setPreference(option);
                  setIsOpen(false);
                }}
              >
                <span>{preferenceDropdownLabel(option, copy)}</span>
                {isSelected ? <span aria-hidden="true">✓</span> : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
