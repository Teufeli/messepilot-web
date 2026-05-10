"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { FairBadgeStrip } from "@/components/website/FairBadges";
import { formatFairDateRange, type WebsiteFair } from "@/lib/fairs";
import type { FairPageCopy } from "@/lib/website/fairCopy";

type SortOrder = "soonest" | "latest";

type FairMonthGroup = {
  key: string;
  heading: string;
  fairs: WebsiteFair[];
};

type FairsListClientProps = {
  fairs: WebsiteFair[];
  locale: string;
  copy: FairPageCopy;
};

function compareFairsByStartDate(
  a: WebsiteFair,
  b: WebsiteFair,
  sortOrder: SortOrder,
  locale: string,
) {
  const aTime = a.startDate?.getTime();
  const bTime = b.startDate?.getTime();

  if (aTime === undefined && bTime === undefined) {
    return a.name.localeCompare(b.name, locale);
  }
  if (aTime === undefined) {
    return 1;
  }
  if (bTime === undefined) {
    return -1;
  }
  if (aTime !== bTime) {
    return sortOrder === "soonest" ? aTime - bTime : bTime - aTime;
  }

  return a.name.localeCompare(b.name, locale);
}

function utcDateKey(date: Date) {
  return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
}

function todayDateKey() {
  const now = new Date();
  return Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
}

function isPastFair(fair: WebsiteFair, todayKey: number) {
  const endDate = fair.endDate ?? fair.startDate;
  return endDate ? utcDateKey(endDate) < todayKey : false;
}

function monthGroupKey(date: Date | null) {
  if (!date) {
    return "date-to-be-confirmed";
  }

  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  return `${date.getUTCFullYear()}-${month}`;
}

function monthHeading(
  date: Date | null,
  locale: string,
  dateToBeConfirmed: string,
) {
  if (!date) {
    return dateToBeConfirmed;
  }

  return new Intl.DateTimeFormat(locale, {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  })
    .format(date)
    .toLocaleUpperCase(locale);
}

function groupFairsByMonth(
  fairs: WebsiteFair[],
  locale: string,
  dateToBeConfirmed: string,
) {
  const groups: FairMonthGroup[] = [];
  const groupsByKey = new Map<string, FairMonthGroup>();

  for (const fair of fairs) {
    const key = monthGroupKey(fair.startDate);
    let group = groupsByKey.get(key);

    if (!group) {
      group = {
        key,
        heading: monthHeading(fair.startDate, locale, dateToBeConfirmed),
        fairs: [],
      };
      groupsByKey.set(key, group);
      groups.push(group);
    }

    group.fairs.push(fair);
  }

  return groups;
}

export default function FairsListClient({
  fairs,
  locale,
  copy,
}: FairsListClientProps) {
  const [sortOrder, setSortOrder] = useState<SortOrder>("soonest");
  const [hidePastFairs, setHidePastFairs] = useState(true);
  const currentTodayKey = useMemo(() => todayDateKey(), []);

  const visibleFairs = useMemo(
    () =>
      fairs
        .filter((fair) => !hidePastFairs || !isPastFair(fair, currentTodayKey))
        .sort((a, b) => compareFairsByStartDate(a, b, sortOrder, locale)),
    [currentTodayKey, fairs, hidePastFairs, locale, sortOrder],
  );

  const groupedFairs = useMemo(
    () => groupFairsByMonth(visibleFairs, locale, copy.dateToBeConfirmed),
    [copy.dateToBeConfirmed, locale, visibleFairs],
  );

  const fairDetailPath = (fairId: string) =>
    locale === "en" ? `/fairs/${fairId}` : `/${locale}/fairs/${fairId}`;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-medium text-slate-600">
          {visibleFairs.length}{" "}
          {visibleFairs.length === 1 ? copy.fairSingular : copy.fairPlural}
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50">
            <input
              type="checkbox"
              checked={hidePastFairs}
              onChange={(event) => setHidePastFairs(event.target.checked)}
              className="h-4 w-4 accent-slate-950"
            />
            {copy.hidePastFairs}
          </label>

          <div className="inline-flex rounded-full border border-slate-200 bg-white p-1 text-sm font-semibold shadow-sm">
            <button
              type="button"
              onClick={() => setSortOrder("soonest")}
              className={[
                "rounded-full px-3 py-1.5 transition",
                sortOrder === "soonest"
                  ? "bg-slate-950 text-white"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-950",
              ].join(" ")}
            >
              {copy.soonestFirst}
            </button>
            <button
              type="button"
              onClick={() => setSortOrder("latest")}
              className={[
                "rounded-full px-3 py-1.5 transition",
                sortOrder === "latest"
                  ? "bg-slate-950 text-white"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-950",
              ].join(" ")}
            >
              {copy.latestFirst}
            </button>
          </div>
        </div>
      </div>

      {groupedFairs.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-2xl font-semibold text-slate-950">
            {copy.noUpcomingTitle}
          </h2>
          <p className="mt-2 leading-7 text-slate-700">
            {copy.noUpcomingText}
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {groupedFairs.map((group) => (
            <section key={group.key} className="space-y-3">
              <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
                {group.heading}
              </h2>

              <div className="grid gap-4">
                {group.fairs.map((fair) => (
                  <article
                    key={fair.id}
                    className="rounded-2xl border border-slate-200 bg-white/85 p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div className="space-y-2">
                        <h3 className="text-2xl font-semibold tracking-tight text-slate-950">
                          <Link
                            href={fairDetailPath(fair.id)}
                            className="hover:text-blue-700"
                          >
                            {fair.name}
                          </Link>
                        </h3>

                        <FairBadgeStrip
                          badges={fair.badges}
                          labels={copy.badges}
                          maxCount={3}
                        />

                        <p className="text-sm font-medium text-slate-600">
                          {fair.city}
                          {fair.city && fair.countryISO ? ", " : ""}
                          {fair.countryISO}
                        </p>

                        <p className="text-sm text-slate-700">
                          {formatFairDateRange(
                            fair.startDate,
                            fair.endDate,
                            locale,
                            copy.dateToBeConfirmed,
                          )}
                        </p>

                        {fair.organizerName ? (
                          <p className="text-sm text-slate-600">
                            {copy.organizer}: {fair.organizerName}
                          </p>
                        ) : null}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Link
                          href={fairDetailPath(fair.id)}
                          className="inline-flex items-center justify-center rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                        >
                          {copy.details}
                        </Link>

                        {fair.officialWebsite ? (
                          <a
                            href={fair.officialWebsite}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
                          >
                            {copy.officialWebsite}
                          </a>
                        ) : null}
                      </div>
                    </div>

                    {fair.categories.length > 0 ? (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {fair.categories.map((category) => (
                          <span
                            key={category}
                            className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
