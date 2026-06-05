"use client";

import {
  useCallback,
  useMemo,
  useRef,
  useState,
  type FocusEvent,
  type PointerEvent,
  type WheelEvent,
} from "react";
import { geoContains, geoEqualEarth, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { Feature, FeatureCollection, Geometry } from "geojson";
import type { GeometryCollection, Topology } from "topojson-specification";

import {
  buildFairLocationGroups,
  fairsLocationHref,
  localizedFairLocationDetail,
  type FairLocationGroup,
} from "@/lib/website/fairLocations";
import { formatFairDateRange, formatFairTitleForDisplay, type WebsiteFair } from "@/lib/fairs";
import { WeatherSummary } from "@/components/website/WeatherSummary";
import type { HomeLocationMapCopy } from "@/lib/website/homeLocationMapCopy";
import {
  isDisplayablePublicWeatherSnapshot,
  type PublicWeatherLocationSnapshot,
  type PublicWeatherSnapshotsByLocationKey,
} from "@/lib/website/weather";
import {
  DATA_REGION_ALL_ID,
  dataRegionIDForCountryISO,
  dataRegionLabel,
  type DataRegionID,
} from "@/lib/website/dataRegionContract";
import countries110m from "world-atlas/countries-110m.json";

type HomeFairLocationMapProps = {
  fairs: WebsiteFair[];
  locale: string;
  copy: HomeLocationMapCopy;
  weatherSnapshots?: PublicWeatherSnapshotsByLocationKey;
};

type WorldAtlasTopology = Topology<{
  countries: GeometryCollection;
}>;

type MarkerHorizontalPlacement = "left" | "center" | "right";
type MarkerVerticalPlacement = "above" | "below";

type ProjectedLocation = {
  x: number;
  y: number;
  labelSide: Exclude<MarkerHorizontalPlacement, "center">;
  previewX: MarkerHorizontalPlacement;
  previewY: MarkerVerticalPlacement;
};

type MapPan = {
  x: number;
  y: number;
};

type RegionFilterOption = {
  id: DataRegionID;
  label: string;
  count: number;
};

type CountryFilterOption = {
  countryISO: string;
  label: string;
  count: number;
  regionID: DataRegionID;
};

const width = 960;
const height = 520;
const worldAtlas = countries110m as unknown as WorldAtlasTopology;
const countries = feature(
  worldAtlas,
  worldAtlas.objects.countries,
) as FeatureCollection<Geometry>;
const projection = geoEqualEarth().fitSize([width, height], { type: "Sphere" });
const path = geoPath(projection);
const countryFeatures = countries.features;
const persistentLabelLimit = 8;
const minMapZoom = 1;
const maxMapZoom = 4;
const mapZoomStep = 0.35;
const countryIsoNumericIds: Record<string, string> = {
  AE: "784",
  AT: "040",
  AU: "036",
  BE: "056",
  BR: "076",
  CA: "124",
  CH: "756",
  CN: "156",
  DE: "276",
  DK: "208",
  ES: "724",
  FI: "246",
  FR: "250",
  GB: "826",
  HK: "344",
  ID: "360",
  IN: "356",
  IT: "380",
  JP: "392",
  KR: "410",
  MX: "484",
  NL: "528",
  NO: "578",
  PL: "616",
  SE: "752",
  SG: "702",
  TH: "764",
  TR: "792",
  US: "840",
  ZA: "710",
};

function projectedLocation(group: FairLocationGroup): ProjectedLocation | null {
  const projected = projection([
    group.coordinates.longitude,
    group.coordinates.latitude,
  ]);

  if (!projected) {
    return null;
  }

  const [x, y] = projected;
  return {
    x,
    y,
    labelSide: x > width * 0.68 ? "left" : "right",
    previewX: x < width * 0.32 ? "left" : x > width * 0.68 ? "right" : "center",
    previewY: y < height * 0.42 ? "below" : "above",
  };
}

function countLabel(count: number, copy: HomeLocationMapCopy) {
  return `${count} ${count === 1 ? copy.fairSingular : copy.fairPlural}`;
}

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value));
}

function clampMapPan(zoom: number, pan: MapPan): MapPan {
  if (zoom <= minMapZoom) {
    return { x: 0, y: 0 };
  }

  return {
    x: clamp(pan.x, width - width * zoom, 0),
    y: clamp(pan.y, height - height * zoom, 0),
  };
}

function transformedLocation(projected: ProjectedLocation, zoom: number, pan: MapPan) {
  return {
    leftPercent: (((projected.x * zoom + pan.x) / width) * 100).toFixed(4),
    topPercent: (((projected.y * zoom + pan.y) / height) * 100).toFixed(4),
  };
}

function mapViewportPoint(
  event: { clientX: number; clientY: number },
  element: HTMLElement,
) {
  const rect = element.getBoundingClientRect();
  return {
    x: ((event.clientX - rect.left) / rect.width) * width,
    y: ((event.clientY - rect.top) / rect.height) * height,
  };
}

function countryDisplayName(countryISO: string, locale: string) {
  const normalizedCountryISO = countryISO.trim().toUpperCase();
  if (!normalizedCountryISO) {
    return countryISO;
  }

  try {
    return (
      new Intl.DisplayNames([locale], { type: "region" }).of(normalizedCountryISO) ??
      normalizedCountryISO
    );
  } catch {
    return normalizedCountryISO;
  }
}

function buildRegionOptions(
  groups: FairLocationGroup[],
  locale: string,
): RegionFilterOption[] {
  const countsByRegion = new Map<DataRegionID, number>();

  for (const group of groups) {
    const regionID = dataRegionIDForCountryISO(group.countryISO);
    countsByRegion.set(regionID, (countsByRegion.get(regionID) ?? 0) + group.fairs.length);
  }

  return [...countsByRegion.entries()]
    .map(([id, count]) => ({
      id,
      count,
      label: dataRegionLabel(id, locale),
    }))
    .sort(
      (a, b) =>
        a.label.localeCompare(b.label, locale) ||
        a.id.localeCompare(b.id, locale),
    );
}

function buildCountryOptions(
  groups: FairLocationGroup[],
  locale: string,
  selectedRegionID: DataRegionID,
): CountryFilterOption[] {
  const countriesByISO = new Map<
    string,
    { countryISO: string; count: number; regionID: DataRegionID }
  >();

  for (const group of groups) {
    const regionID = dataRegionIDForCountryISO(group.countryISO);
    if (selectedRegionID !== DATA_REGION_ALL_ID && regionID !== selectedRegionID) {
      continue;
    }

    const countryISO = group.countryISO.trim().toUpperCase();
    if (!countryISO) {
      continue;
    }

    const current = countriesByISO.get(countryISO) ?? {
      countryISO,
      count: 0,
      regionID,
    };
    current.count += group.fairs.length;
    countriesByISO.set(countryISO, current);
  }

  return [...countriesByISO.values()]
    .map((option) => ({
      ...option,
      label: countryDisplayName(option.countryISO, locale),
    }))
    .sort(
      (a, b) =>
        a.label.localeCompare(b.label, locale) ||
        a.countryISO.localeCompare(b.countryISO, locale),
    );
}

function worldAtlasCountryId(country: Feature<Geometry>) {
  return country.id?.toString().padStart(3, "0") ?? null;
}

function countryIsoNumericId(countryISO: string) {
  return countryIsoNumericIds[countryISO.trim().toUpperCase()] ?? null;
}

function containingCountryId(group: FairLocationGroup) {
  const coordinates: [number, number] = [
    group.coordinates.longitude,
    group.coordinates.latitude,
  ];
  const country = countryFeatures.find((feature) => geoContains(feature, coordinates));

  return country ? worldAtlasCountryId(country) : null;
}

function activeCountryIds(groups: FairLocationGroup[]) {
  return new Set(
    groups
      .map(
        (group) =>
          countryIsoNumericId(group.countryISO) ?? containingCountryId(group),
      )
      .filter((id): id is string => Boolean(id)),
  );
}

function persistentLabelKeys(groups: FairLocationGroup[]) {
  return new Set(
    [...groups]
      .sort(
        (a, b) =>
          b.fairs.length - a.fairs.length ||
          a.label.localeCompare(b.label) ||
          a.key.localeCompare(b.key),
      )
      .slice(0, persistentLabelLimit)
      .map((group) => group.key),
  );
}

function labelPlacementClass(side: ProjectedLocation["labelSide"]) {
  return side === "left"
    ? "right-full mr-3 origin-right"
    : "left-full ml-3 origin-left";
}

function previewPlacementClass(
  horizontal: MarkerHorizontalPlacement,
  vertical: MarkerVerticalPlacement,
) {
  const verticalClass =
    vertical === "above" ? "bottom-full" : "top-full";
  const horizontalClass =
    horizontal === "left"
      ? "left-0"
      : horizontal === "right"
      ? "right-0"
      : "left-1/2 -translate-x-1/2";

  return `${verticalClass} ${horizontalClass}`;
}

function displayableWeatherForGroup(
  group: FairLocationGroup,
  weatherSnapshots: PublicWeatherSnapshotsByLocationKey | undefined,
): PublicWeatherLocationSnapshot | null {
  const weather = weatherSnapshots?.[group.key];
  return isDisplayablePublicWeatherSnapshot(weather) ? weather : null;
}

function PreviewCard({
  group,
  locale,
  copy,
  href,
  weather,
}: {
  group: FairLocationGroup;
  locale: string;
  copy: HomeLocationMapCopy;
  href: string;
  weather: PublicWeatherLocationSnapshot | null;
}) {
  const firstFair = group.previewFairs[0];
  const detail = firstFair ? localizedFairLocationDetail(firstFair, locale) : null;

  return (
    <div className="w-72 max-w-[calc(100vw-3rem)] rounded-2xl border border-slate-200 bg-white/95 p-4 text-left shadow-xl shadow-slate-900/15 backdrop-blur">
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          {countLabel(group.fairs.length, copy)}
        </p>
        <h3 className="text-base font-semibold text-slate-950">{group.label}</h3>
        {detail ? (
          <p className="text-xs font-medium text-slate-500">{detail}</p>
        ) : null}
      </div>

      <WeatherSummary
        weather={weather}
        locale={locale}
        conditionLabels={copy.weatherConditionLabels}
      />

      <div className="mt-3 space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
          {copy.previewHeading}
        </p>
        <ol className="space-y-2">
          {group.previewFairs.map((fair) => (
            <li key={fair.id} className="space-y-0.5">
              <p className="line-clamp-1 text-sm font-semibold text-slate-900">
                {formatFairTitleForDisplay(fair.name, locale)}
              </p>
              <p className="text-xs text-slate-600">
                {formatFairDateRange(
                  fair.startDate,
                  fair.endDate,
                  locale,
                  copy.dateToBeConfirmed,
                )}
              </p>
            </li>
          ))}
        </ol>
      </div>
      <a
        href={href}
        className="mt-3 inline-flex text-sm font-semibold text-blue-700 transition hover:text-blue-900"
      >
        {copy.viewFairs}
      </a>
    </div>
  );
}

export function HomeFairLocationMap({
  fairs,
  locale,
  copy,
  weatherSnapshots,
}: HomeFairLocationMapProps) {
  const groups = useMemo(
    () => buildFairLocationGroups(fairs, locale),
    [fairs, locale],
  );
  const [selectedRegionID, setSelectedRegionID] = useState<DataRegionID>(
    DATA_REGION_ALL_ID,
  );
  const [selectedCountryISO, setSelectedCountryISO] = useState<string | null>(null);
  const [activeLocationKey, setActiveLocationKey] = useState<string | null>(null);
  const [mapZoom, setMapZoom] = useState(minMapZoom);
  const [mapPan, setMapPan] = useState<MapPan>({ x: 0, y: 0 });
  const dragStateRef = useRef<{
    pointerId: number;
    startClientX: number;
    startClientY: number;
    startPan: MapPan;
  } | null>(null);
  const regionOptions = useMemo(
    () => buildRegionOptions(groups, locale),
    [groups, locale],
  );
  const countryOptions = useMemo(
    () => buildCountryOptions(groups, locale, selectedRegionID),
    [groups, locale, selectedRegionID],
  );
  const filteredGroups = useMemo(
    () =>
      groups.filter((group) => {
        const regionID = dataRegionIDForCountryISO(group.countryISO);
        const matchesRegion =
          selectedRegionID === DATA_REGION_ALL_ID || regionID === selectedRegionID;
        const matchesCountry =
          !selectedCountryISO || group.countryISO === selectedCountryISO;
        return matchesRegion && matchesCountry;
      }),
    [groups, selectedCountryISO, selectedRegionID],
  );
  const highlightedCountries = useMemo(
    () => activeCountryIds(filteredGroups),
    [filteredGroups],
  );
  const persistentLabels = useMemo(
    () => persistentLabelKeys(filteredGroups),
    [filteredGroups],
  );
  const hasActiveFilters =
    selectedRegionID !== DATA_REGION_ALL_ID || Boolean(selectedCountryISO);
  const mapTransform = `matrix(${mapZoom} 0 0 ${mapZoom} ${mapPan.x} ${mapPan.y})`;

  const adjustMapZoom = useCallback((delta: number, focalPoint: MapPan) => {
    setMapZoom((currentZoom) => {
      const nextZoom = clamp(currentZoom + delta, minMapZoom, maxMapZoom);
      setMapPan((currentPan) =>
        clampMapPan(nextZoom, {
          x: focalPoint.x - ((focalPoint.x - currentPan.x) / currentZoom) * nextZoom,
          y: focalPoint.y - ((focalPoint.y - currentPan.y) / currentZoom) * nextZoom,
        }),
      );
      return nextZoom;
    });
  }, []);

  const resetMapView = useCallback(() => {
    setMapZoom(minMapZoom);
    setMapPan({ x: 0, y: 0 });
  }, []);

  const resetFilters = () => {
    setSelectedRegionID(DATA_REGION_ALL_ID);
    setSelectedCountryISO(null);
    setActiveLocationKey(null);
  };

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    const focalPoint = mapViewportPoint(event, event.currentTarget);
    adjustMapZoom(event.deltaY < 0 ? mapZoomStep : -mapZoomStep, focalPoint);
  };

  const handleMapPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    const target = event.target instanceof Element ? event.target : null;
    if (
      mapZoom <= minMapZoom ||
      event.button !== 0 ||
      target?.closest("a,button,select,input")
    ) {
      return;
    }

    dragStateRef.current = {
      pointerId: event.pointerId,
      startClientX: event.clientX,
      startClientY: event.clientY,
      startPan: mapPan,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleMapPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const dragState = dragStateRef.current;
    if (!dragState || dragState.pointerId !== event.pointerId) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const deltaX = ((event.clientX - dragState.startClientX) / rect.width) * width;
    const deltaY = ((event.clientY - dragState.startClientY) / rect.height) * height;
    setMapPan(
      clampMapPan(mapZoom, {
        x: dragState.startPan.x + deltaX,
        y: dragState.startPan.y + deltaY,
      }),
    );
  };

  const handleMapPointerEnd = (event: PointerEvent<HTMLDivElement>) => {
    if (dragStateRef.current?.pointerId === event.pointerId) {
      dragStateRef.current = null;
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
    }
  };

  const handleRegionChange = (nextRegionID: string) => {
    setSelectedRegionID(nextRegionID as DataRegionID);
    setSelectedCountryISO(null);
    setActiveLocationKey(null);
  };

  const handleCountryChange = (nextCountryISO: string) => {
    setSelectedCountryISO(nextCountryISO || null);
    setActiveLocationKey(null);
  };

  const handleLocationBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (
      event.relatedTarget instanceof Node &&
      event.currentTarget.contains(event.relatedTarget)
    ) {
      return;
    }

    setActiveLocationKey(null);
  };

  return (
    <section className="space-y-5">
      <div className="max-w-3xl space-y-3">
        <p className="text-sm font-medium uppercase tracking-[0.22em] text-slate-500">
          {copy.eyebrow}
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          {copy.title}
        </h2>
        <p className="text-base leading-7 text-slate-600">{copy.intro}</p>
      </div>

      {groups.length > 0 ? (
        <div className="flex flex-wrap items-center gap-3 rounded-3xl border border-slate-200 bg-white/85 p-3 shadow-sm backdrop-blur">
          <label className="inline-flex min-h-11 min-w-0 flex-1 items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700 sm:flex-none">
            <span className="shrink-0">{copy.regionFilter}</span>
            <select
              value={selectedRegionID}
              onChange={(event) => handleRegionChange(event.target.value)}
              aria-label={copy.regionFilter}
              className="min-w-0 flex-1 rounded-full border border-slate-200 bg-white px-2 py-1 text-sm font-semibold text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 sm:min-w-44"
            >
              <option value={DATA_REGION_ALL_ID}>{copy.allRegions}</option>
              {regionOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label} · {countLabel(option.count, copy)}
                </option>
              ))}
            </select>
          </label>

          <label className="inline-flex min-h-11 min-w-0 flex-1 items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700 sm:flex-none">
            <span className="shrink-0">{copy.countryFilter}</span>
            <select
              value={selectedCountryISO ?? ""}
              onChange={(event) => handleCountryChange(event.target.value)}
              aria-label={copy.countryFilter}
              className="min-w-0 flex-1 rounded-full border border-slate-200 bg-white px-2 py-1 text-sm font-semibold text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 sm:min-w-48"
            >
              <option value="">{copy.allCountries}</option>
              {countryOptions.map((option) => (
                <option key={option.countryISO} value={option.countryISO}>
                  {option.label} · {countLabel(option.count, copy)}
                </option>
              ))}
            </select>
          </label>

          {hasActiveFilters ? (
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-100"
            >
              {copy.resetFilters}
            </button>
          ) : null}
        </div>
      ) : null}

      {groups.length > 0 ? (
        <>
          {filteredGroups.length > 0 ? (
            <div
              onWheel={handleWheel}
              onPointerDown={handleMapPointerDown}
              onPointerMove={handleMapPointerMove}
              onPointerUp={handleMapPointerEnd}
              onPointerCancel={handleMapPointerEnd}
              className={[
                "relative aspect-[1.85/1] touch-none overflow-hidden rounded-3xl border border-white/70 bg-white/90 shadow-sm backdrop-blur-xl",
                mapZoom > minMapZoom ? "cursor-grab active:cursor-grabbing" : "",
              ].join(" ")}
            >
              <svg
                role="img"
                aria-label={copy.title}
                viewBox={`0 0 ${width} ${height}`}
                className="h-full w-full bg-[radial-gradient(circle_at_30%_15%,rgba(14,165,233,0.16),transparent_30%),linear-gradient(180deg,#f8fafc_0%,#e2e8f0_100%)]"
              >
                <rect width={width} height={height} fill="transparent" />
                <g transform={mapTransform}>
                  {countryFeatures.map((country: Feature<Geometry>, index) => {
                    const countryId = worldAtlasCountryId(country);
                    const isHighlighted = highlightedCountries.has(countryId ?? "");

                    return (
                      <path
                        key={country.id ?? index}
                        data-country-active={isHighlighted ? "true" : undefined}
                        data-country-id={countryId ?? undefined}
                        d={path(country) ?? undefined}
                        className={
                          isHighlighted
                            ? "fill-blue-100/80 stroke-blue-300/80"
                            : "fill-white/80 stroke-slate-300/70"
                        }
                        strokeWidth={isHighlighted ? 0.9 : 0.7}
                      />
                    );
                  })}
                </g>
              </svg>

              <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
                {filteredGroups.map((group) => {
                const projected = projectedLocation(group);
                if (!projected) {
                  return null;
                }

                const transformed = transformedLocation(projected, mapZoom, mapPan);
                const isActive = group.key === activeLocationKey;
                const showLabel = isActive || persistentLabels.has(group.key);
                const href = fairsLocationHref(locale, group.key);
                const weather = displayableWeatherForGroup(group, weatherSnapshots);

                return (
                  <div
                    key={group.key}
                    onMouseEnter={() => setActiveLocationKey(group.key)}
                    onMouseLeave={() => setActiveLocationKey(null)}
                    onFocus={() => setActiveLocationKey(group.key)}
                    onBlur={handleLocationBlur}
                    className={[
                      "group pointer-events-auto absolute h-12 w-12 -translate-x-1/2 -translate-y-1/2",
                      isActive ? "z-30" : "z-10",
                    ].join(" ")}
                    style={{
                      left: `${transformed.leftPercent}%`,
                      top: `${transformed.topPercent}%`,
                    }}
                  >
                    <a
                      href={href}
                      aria-label={`${group.label}, ${countLabel(group.fairs.length, copy)}`}
                      className="relative flex h-12 w-12 items-center justify-center rounded-full outline-none transition focus-visible:ring-4 focus-visible:ring-blue-500/30"
                    >
                      <span
                        aria-hidden="true"
                        className={[
                          "absolute h-8 w-8 rounded-full border-2 border-blue-700/45 bg-blue-500/15 transition",
                          isActive
                            ? "scale-125 bg-blue-500/25"
                            : "group-hover:scale-125 group-hover:bg-blue-500/25 group-focus-within:scale-125 group-focus-within:bg-blue-500/25",
                        ].join(" ")}
                      />
                      <span
                        aria-hidden="true"
                        className="relative h-3.5 w-3.5 rounded-full border-[3px] border-white bg-slate-950 shadow-md shadow-slate-900/30 transition group-hover:bg-blue-700 group-focus-within:bg-blue-700"
                      />
                    </a>

                    <span
                      className={[
                        "absolute top-1/2 hidden max-w-40 -translate-y-1/2 whitespace-nowrap rounded-full border border-slate-200 bg-white/95 px-3 py-1.5 text-sm font-semibold leading-none text-slate-950 shadow-lg shadow-slate-900/10 backdrop-blur transition md:block",
                        labelPlacementClass(projected.labelSide),
                        showLabel
                          ? "scale-100 opacity-100"
                          : "pointer-events-none scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 group-focus-within:scale-100 group-focus-within:opacity-100",
                      ].join(" ")}
                    >
                      <span className="block truncate">{group.label}</span>
                    </span>

                    {isActive ? (
                      <div
                        className={[
                          "absolute z-30 hidden md:block",
                          previewPlacementClass(projected.previewX, projected.previewY),
                        ].join(" ")}
                      >
                        <PreviewCard
                          group={group}
                          locale={locale}
                          copy={copy}
                          href={href}
                          weather={weather}
                        />
                      </div>
                    ) : null}
                  </div>
                );
              })}
              </div>

              <div className="absolute right-3 top-3 z-20 flex overflow-hidden rounded-full border border-slate-200 bg-white/90 p-1 text-sm font-semibold text-slate-800 shadow-lg shadow-slate-900/10 backdrop-blur">
                <button
                  type="button"
                  onClick={() => adjustMapZoom(mapZoomStep, { x: width / 2, y: height / 2 })}
                  disabled={mapZoom >= maxMapZoom}
                  aria-label={copy.zoomIn}
                  title={copy.zoomIn}
                  className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={() => adjustMapZoom(-mapZoomStep, { x: width / 2, y: height / 2 })}
                  disabled={mapZoom <= minMapZoom}
                  aria-label={copy.zoomOut}
                  title={copy.zoomOut}
                  className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  -
                </button>
                <button
                  type="button"
                  onClick={resetMapView}
                  disabled={mapZoom === minMapZoom && mapPan.x === 0 && mapPan.y === 0}
                  aria-label={copy.resetMap}
                  title={copy.resetMap}
                  className="flex h-9 min-w-9 items-center justify-center rounded-full px-2 text-xs transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  1:1
                </button>
              </div>
            </div>
          ) : (
            <div className="rounded-3xl border border-slate-200 bg-white/85 p-6 text-sm leading-6 text-slate-600">
              {copy.filteredEmpty}
            </div>
          )}

          <div className="space-y-3 md:hidden">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              {copy.mobileListTitle}
            </h3>
            <div className="grid gap-3">
              {filteredGroups.map((group) => {
                const href = fairsLocationHref(locale, group.key);
                const weather = displayableWeatherForGroup(group, weatherSnapshots);

                return (
                  <div
                    key={group.key}
                    className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-slate-950">{group.label}</p>
                        <p className="mt-1 text-sm text-slate-600">
                          {countLabel(group.fairs.length, copy)}
                        </p>
                        <WeatherSummary
                          weather={weather}
                          locale={locale}
                          conditionLabels={copy.weatherConditionLabels}
                        />
                      </div>
                      <a
                        href={href}
                        className="text-sm font-semibold text-blue-700 transition hover:text-blue-900"
                      >
                        {copy.viewFairs}
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <div className="rounded-3xl border border-slate-200 bg-white/85 p-6 text-sm leading-6 text-slate-600">
          {copy.empty}
        </div>
      )}
    </section>
  );
}
