"use client";

import { useMemo, useState } from "react";
import { geoEqualEarth, geoPath } from "d3-geo";
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
import type { HomeLocationMapCopy } from "@/lib/website/homeLocationMapCopy";
import countries110m from "world-atlas/countries-110m.json";

type HomeFairLocationMapProps = {
  fairs: WebsiteFair[];
  locale: string;
  copy: HomeLocationMapCopy;
};

type WorldAtlasTopology = Topology<{
  countries: GeometryCollection;
}>;

type MarkerHorizontalPlacement = "left" | "center" | "right";
type MarkerVerticalPlacement = "above" | "below";

type ProjectedLocation = {
  x: number;
  y: number;
  leftPercent: number;
  topPercent: number;
  labelSide: Exclude<MarkerHorizontalPlacement, "center">;
  previewX: MarkerHorizontalPlacement;
  previewY: MarkerVerticalPlacement;
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
    leftPercent: (x / width) * 100,
    topPercent: (y / height) * 100,
    labelSide: x > width * 0.68 ? "left" : "right",
    previewX: x < width * 0.32 ? "left" : x > width * 0.68 ? "right" : "center",
    previewY: y < height * 0.42 ? "below" : "above",
  };
}

function countLabel(count: number, copy: HomeLocationMapCopy) {
  return `${count} ${count === 1 ? copy.fairSingular : copy.fairPlural}`;
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
    vertical === "above" ? "bottom-full mb-4" : "top-full mt-4";
  const horizontalClass =
    horizontal === "left"
      ? "left-0"
      : horizontal === "right"
      ? "right-0"
      : "left-1/2 -translate-x-1/2";

  return `${verticalClass} ${horizontalClass}`;
}

function PreviewCard({
  group,
  locale,
  copy,
}: {
  group: FairLocationGroup;
  locale: string;
  copy: HomeLocationMapCopy;
}) {
  const firstFair = group.previewFairs[0];
  const detail = firstFair ? localizedFairLocationDetail(firstFair, locale) : null;

  return (
    <div className="w-72 max-w-[calc(100vw-3rem)] cursor-pointer rounded-2xl border border-slate-200 bg-white/95 p-4 text-left shadow-xl shadow-slate-900/15 backdrop-blur">
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          {countLabel(group.fairs.length, copy)}
        </p>
        <h3 className="text-base font-semibold text-slate-950">{group.label}</h3>
        {detail ? (
          <p className="text-xs font-medium text-slate-500">{detail}</p>
        ) : null}
      </div>

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
    </div>
  );
}

export function HomeFairLocationMap({
  fairs,
  locale,
  copy,
}: HomeFairLocationMapProps) {
  const groups = useMemo(
    () => buildFairLocationGroups(fairs, locale),
    [fairs, locale],
  );
  const persistentLabels = useMemo(() => persistentLabelKeys(groups), [groups]);
  const [activeLocationKey, setActiveLocationKey] = useState<string | null>(null);

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
        <>
          <div className="relative aspect-[1.85/1] overflow-visible">
            <div className="absolute inset-0 overflow-hidden rounded-3xl border border-white/70 bg-white/90 shadow-sm backdrop-blur-xl">
              <svg
                role="img"
                aria-label={copy.title}
                viewBox={`0 0 ${width} ${height}`}
                className="h-full w-full bg-[radial-gradient(circle_at_30%_15%,rgba(14,165,233,0.16),transparent_30%),linear-gradient(180deg,#f8fafc_0%,#e2e8f0_100%)]"
              >
                <rect width={width} height={height} fill="transparent" />
                <g>
                  {countryFeatures.map((country: Feature<Geometry>, index) => (
                    <path
                      key={country.id ?? index}
                      d={path(country) ?? undefined}
                      className="fill-white/80 stroke-slate-300/70"
                      strokeWidth={0.7}
                    />
                  ))}
                </g>
              </svg>
            </div>

            <div className="pointer-events-none absolute inset-0 z-10">
              {groups.map((group) => {
                const projected = projectedLocation(group);
                if (!projected) {
                  return null;
                }

                const isActive = group.key === activeLocationKey;
                const showLabel = isActive || persistentLabels.has(group.key);
                const href = fairsLocationHref(locale, group.key);

                return (
                  <a
                    key={group.key}
                    href={href}
                    aria-label={`${group.label}, ${countLabel(group.fairs.length, copy)}`}
                    onMouseEnter={() => setActiveLocationKey(group.key)}
                    onMouseLeave={() => setActiveLocationKey(null)}
                    onFocus={() => setActiveLocationKey(group.key)}
                    onBlur={() => setActiveLocationKey(null)}
                    className={[
                      "group pointer-events-auto absolute flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full outline-none transition focus-visible:ring-4 focus-visible:ring-blue-500/30",
                      isActive ? "z-30" : "z-10",
                    ].join(" ")}
                    style={{
                      left: `${projected.leftPercent}%`,
                      top: `${projected.topPercent}%`,
                    }}
                  >
                    <span
                      aria-hidden="true"
                      className={[
                        "absolute h-8 w-8 rounded-full border-2 border-blue-700/45 bg-blue-500/15 transition",
                        isActive
                          ? "scale-125 bg-blue-500/25"
                          : "group-hover:scale-125 group-hover:bg-blue-500/25 group-focus:scale-125 group-focus:bg-blue-500/25",
                      ].join(" ")}
                    />
                    <span
                      aria-hidden="true"
                      className="relative h-3.5 w-3.5 rounded-full border-[3px] border-white bg-slate-950 shadow-md shadow-slate-900/30 transition group-hover:bg-blue-700 group-focus:bg-blue-700"
                    />

                    <span
                      className={[
                        "absolute top-1/2 hidden max-w-40 -translate-y-1/2 whitespace-nowrap rounded-full border border-slate-200 bg-white/95 px-3 py-1.5 text-sm font-semibold leading-none text-slate-950 shadow-lg shadow-slate-900/10 backdrop-blur transition md:block",
                        labelPlacementClass(projected.labelSide),
                        showLabel
                          ? "scale-100 opacity-100"
                          : "pointer-events-none scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 group-focus:scale-100 group-focus:opacity-100",
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
                        <PreviewCard group={group} locale={locale} copy={copy} />
                      </div>
                    ) : null}
                  </a>
                );
              })}
            </div>
          </div>

          <div className="space-y-3 md:hidden">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              {copy.mobileListTitle}
            </h3>
            <div className="grid gap-3">
              {groups.map((group) => (
                <a
                  key={group.key}
                  href={fairsLocationHref(locale, group.key)}
                  className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm transition hover:border-slate-300 hover:bg-white"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-950">{group.label}</p>
                      <p className="mt-1 text-sm text-slate-600">
                        {countLabel(group.fairs.length, copy)}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-blue-700">
                      {copy.viewFairs}
                    </span>
                  </div>
                </a>
              ))}
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
