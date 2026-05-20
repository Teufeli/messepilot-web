import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  FairBadgeStrip,
  FairLifecycleNotice,
  FairUpdatesPanel,
} from "@/components/website/FairBadges";
import { FairCategoryChips } from "@/components/website/FairCategoryChips";
import {
  ExistingFairCorrectionReport,
  FairDataDisclaimerNotice,
} from "@/components/website/FairDataReports";
import { WeatherDetailPanel } from "@/components/website/WeatherSummary";
import {
  formatFairDateRange,
  formatFairTitleForDisplay,
  getPublicFairCategories,
  getPublishedFairById,
  localizedFairDescription,
} from "@/lib/fairs";
import { getPublicWeatherSnapshotsByLocationKeys } from "@/lib/weather";
import { getFairCopy, getFairDataReportCopy } from "@/lib/website/fairCopy";
import { fairLocationKey } from "@/lib/website/fairLocations";
import { getWeatherCopy } from "@/lib/website/weatherCopy";

export const dynamic = "force-dynamic";
const copy = getFairCopy("en");
const reportCopy = getFairDataReportCopy("en");

type FairDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({
  params,
}: FairDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const fair = await getPublishedFairById(id);
  const fairDescription = fair ? localizedFairDescription(fair, "en") : undefined;

  if (!fair) {
    return {
      title: copy.fairNotFoundTitle,
    };
  }

  return {
    title: `${fair.name} | MessePilot`,
    description: fairDescription ?? `${fair.name} in ${fair.city}, ${fair.countryISO}.`,
  };
}

function formatUpdatedAt(date: Date | null, locale: string): string {
  if (!date) {
    return copy.notAvailable;
  }

  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export default async function FairDetailPage({ params }: FairDetailPageProps) {
  const { id } = await params;
  const [fair, categories] = await Promise.all([
    getPublishedFairById(id),
    getPublicFairCategories(),
  ]);

  if (!fair) {
    notFound();
  }

  const fairDescription = localizedFairDescription(fair, "en");
  const fairDisplayTitle = formatFairTitleForDisplay(fair.name, "en");
  const weatherCopy = getWeatherCopy("en");
  const locationKey = fairLocationKey(fair);
  const weatherSnapshots = await getPublicWeatherSnapshotsByLocationKeys([locationKey]);
  const weather = locationKey ? weatherSnapshots[locationKey] ?? null : null;
  const mapURL =
    fair.latitude !== undefined && fair.longitude !== undefined
      ? `https://www.google.com/maps/search/?api=1&query=${fair.latitude},${fair.longitude}`
      : null;

  return (
    <section className="space-y-8">
      <div className="rounded-3xl border border-white/70 bg-white/90 p-8 shadow-sm backdrop-blur-xl sm:p-10">
        <Link
          href="/fairs"
          className="text-sm font-semibold text-blue-700 transition hover:text-blue-900"
        >
          ← {copy.backToFairs}
        </Link>

        <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-4">
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-slate-500">
              {copy.publishedFair}
            </p>

            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              {fairDisplayTitle}
            </h1>

            <FairLifecycleNotice fair={fair} copy={copy} />

            <FairBadgeStrip
              badges={fair.badges}
              labels={copy.badges}
              maxCount={5}
              hideProminentLifecycleBadges
            />

            <p className="text-lg font-medium text-slate-700">
              {fair.city}
              {fair.city && fair.countryISO ? ", " : ""}
              {fair.countryISO}
            </p>

            <p className="text-lg text-slate-700">
              {formatFairDateRange(
                fair.startDate,
                fair.endDate,
                "en",
                copy.dateToBeConfirmed,
              )}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {fair.officialWebsite ? (
              <a
                href={fair.officialWebsite}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                {copy.officialWebsite}
              </a>
            ) : null}

            {mapURL ? (
              <a
                href={mapURL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
              >
                {copy.openMap}
              </a>
            ) : null}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6 rounded-3xl border border-white/70 bg-white/90 p-8 shadow-sm backdrop-blur-xl">
          {fairDescription ? (
            <section>
              <h2 className="text-xl font-semibold text-slate-950">
                {copy.descriptionHeading}
              </h2>
              <p className="mt-4 whitespace-pre-line text-base leading-7 text-slate-700">
                {fairDescription}
              </p>
            </section>
          ) : null}

          <section>
            <h2 className="text-xl font-semibold text-slate-950">
              {copy.detailsHeading}
            </h2>

            <dl className="mt-5 divide-y divide-slate-200 rounded-2xl bg-slate-50">
              <div className="grid gap-1 px-5 py-4 sm:grid-cols-[180px_1fr]">
                <dt className="font-medium text-slate-600">{copy.name}</dt>
                <dd className="text-slate-950">{fairDisplayTitle}</dd>
              </div>

              <div className="grid gap-1 px-5 py-4 sm:grid-cols-[180px_1fr]">
                <dt className="font-medium text-slate-600">{copy.city}</dt>
                <dd className="text-slate-950">{fair.city || copy.notAvailable}</dd>
              </div>

              <div className="grid gap-1 px-5 py-4 sm:grid-cols-[180px_1fr]">
                <dt className="font-medium text-slate-600">{copy.country}</dt>
                <dd className="text-slate-950">
                  {fair.countryISO || copy.notAvailable}
                </dd>
              </div>

              <div className="grid gap-1 px-5 py-4 sm:grid-cols-[180px_1fr]">
                <dt className="font-medium text-slate-600">{copy.date}</dt>
                <dd className="text-slate-950">
                  {formatFairDateRange(
                    fair.startDate,
                    fair.endDate,
                    "en",
                    copy.dateToBeConfirmed,
                  )}
                </dd>
              </div>

              <div className="grid gap-1 px-5 py-4 sm:grid-cols-[180px_1fr]">
                <dt className="font-medium text-slate-600">{copy.organizer}</dt>
                <dd className="text-slate-950">
                  {fair.organizerName || copy.notAvailable}
                </dd>
              </div>

              <div className="grid gap-1 px-5 py-4 sm:grid-cols-[180px_1fr]">
                <dt className="font-medium text-slate-600">{copy.lastUpdated}</dt>
                <dd className="text-slate-950">
                  {formatUpdatedAt(fair.updatedAt, "en")}
                </dd>
              </div>
            </dl>
          </section>

          <FairCategoryChips
            fair={fair}
            categories={categories}
            locale="en"
            copy={copy}
          />
        </div>

        <aside className="space-y-6 rounded-3xl border border-white/70 bg-white/90 p-8 shadow-sm backdrop-blur-xl">
          <FairUpdatesPanel fair={fair} copy={copy} locale="en" />

          <WeatherDetailPanel weather={weather} locale="en" copy={weatherCopy} />

          <section>
            <h2 className="text-xl font-semibold text-slate-950">{copy.links}</h2>

            <div className="mt-4 space-y-3">
              {fair.officialWebsite ? (
                <a
                  href={fair.officialWebsite}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-2xl border border-slate-200 bg-white p-4 font-semibold text-blue-700 transition hover:border-blue-200 hover:bg-blue-50"
                >
                  {copy.officialWebsite}
                </a>
              ) : null}

              {mapURL ? (
                <a
                  href={mapURL}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-2xl border border-slate-200 bg-white p-4 font-semibold text-blue-700 transition hover:border-blue-200 hover:bg-blue-50"
                >
                  {copy.openLocationInMaps}
                </a>
              ) : null}
            </div>
          </section>

          <p className="text-sm leading-6 text-slate-600">
            {copy.detailNote}
          </p>

          <FairDataDisclaimerNotice copy={reportCopy.disclaimer} />

          <ExistingFairCorrectionReport
            fair={fair}
            categories={categories}
            locale="en"
            copy={reportCopy}
          />
        </aside>
      </div>
    </section>
  );
}
