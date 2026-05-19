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

function projectedLocation(group: FairLocationGroup) {
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
    previewX: Math.min(Math.max(x, 150), width - 150),
    previewY: Math.min(Math.max(y - 18, 110), height - 130),
  };
}

function countLabel(count: number, copy: HomeLocationMapCopy) {
  return `${count} ${count === 1 ? copy.fairSingular : copy.fairPlural}`;
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
    <div className="pointer-events-none w-72 max-w-[calc(100vw-3rem)] rounded-2xl border border-slate-200 bg-white/95 p-4 text-left shadow-xl shadow-slate-900/15 backdrop-blur">
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
  const [activeLocationKey, setActiveLocationKey] = useState<string | null>(null);
  const activeGroup =
    groups.find((group) => group.key === activeLocationKey) ?? null;
  const activePosition = activeGroup ? projectedLocation(activeGroup) : null;

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
          <div className="relative overflow-hidden rounded-3xl border border-white/70 bg-white/90 shadow-sm backdrop-blur-xl">
            <svg
              role="img"
              aria-label={copy.title}
              viewBox={`0 0 ${width} ${height}`}
              className="aspect-[1.85/1] w-full bg-[radial-gradient(circle_at_30%_15%,rgba(14,165,233,0.16),transparent_30%),linear-gradient(180deg,#f8fafc_0%,#e2e8f0_100%)]"
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

              {groups.map((group) => {
                const projected = projectedLocation(group);
                if (!projected) {
                  return null;
                }

                const isActive = group.key === activeLocationKey;
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
                    className="group outline-none"
                  >
                    <circle
                      cx={projected.x}
                      cy={projected.y}
                      r={isActive ? 15 : 12}
                      className="fill-blue-500/15 stroke-blue-700/50 transition-all group-hover:fill-blue-500/25 group-focus:fill-blue-500/25"
                      strokeWidth={2}
                    />
                    <circle
                      cx={projected.x}
                      cy={projected.y}
                      r={5}
                      className="fill-slate-950 stroke-white transition group-hover:fill-blue-700 group-focus:fill-blue-700"
                      strokeWidth={2.5}
                    />
                    <text
                      x={projected.x + 12}
                      y={projected.y - 10}
                      className="hidden fill-slate-950 text-[13px] font-semibold drop-shadow-sm md:block"
                    >
                      {group.label}
                    </text>
                  </a>
                );
              })}
            </svg>

            {activeGroup && activePosition ? (
              <div
                className="absolute z-10 hidden md:block"
                style={{
                  left: `${(activePosition.previewX / width) * 100}%`,
                  top: `${(activePosition.previewY / height) * 100}%`,
                  transform: "translate(-50%, -100%)",
                }}
              >
                <PreviewCard group={activeGroup} locale={locale} copy={copy} />
              </div>
            ) : null}
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
