"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { formatFairDateRange, type WebsiteFair } from "@/lib/fairs";

type SortOrder = "soonest" | "latest";

type FairsListClientProps = {
  fairs: WebsiteFair[];
  locale: string;
  copy: {
    organizer: string;
    details: string;
    officialWebsite: string;
    soonestFirst: string;
    latestFirst: string;
  };
};

function getTime(date: Date | null) {
  return date?.getTime() ?? Number.MAX_SAFE_INTEGER;
}

export default function FairsListClient({
  fairs,
  locale,
  copy,
}: FairsListClientProps) {
  const [sortOrder, setSortOrder] = useState<SortOrder>("soonest");

  const sortedFairs = useMemo(() => {
    return [...fairs].sort((a, b) => {
      const aTime = getTime(a.startDate);
      const bTime = getTime(b.startDate);

      if (aTime !== bTime) {
        return sortOrder === "soonest" ? aTime - bTime : bTime - aTime;
      }

      return a.name.localeCompare(b.name);
    });
  }, [fairs, sortOrder]);

  const fairDetailPath = (fairId: string) =>
    locale === "en" ? `/fairs/${fairId}` : `/${locale}/fairs/${fairId}`;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-medium text-slate-600">
          {sortedFairs.length} {sortedFairs.length === 1 ? "fair" : "fairs"}
        </p>

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

      <div className="grid gap-4">
        {sortedFairs.map((fair) => (
          <article
            key={fair.id}
            className="rounded-2xl border border-slate-200 bg-white/85 p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
                  <Link
                    href={fairDetailPath(fair.id)}
                    className="hover:text-blue-700"
                  >
                    {fair.name}
                  </Link>
                </h2>

                <p className="text-sm font-medium text-slate-600">
                  {fair.city}
                  {fair.city && fair.countryISO ? ", " : ""}
                  {fair.countryISO}
                </p>

                <p className="text-sm text-slate-700">
                  {formatFairDateRange(fair.startDate, fair.endDate, locale)}
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
    </div>
  );
}
