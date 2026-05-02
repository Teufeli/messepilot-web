import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatFairDateRange, getPublishedFairById } from "@/lib/fairs";

export const dynamic = "force-dynamic";

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

  if (!fair) {
    return {
      title: "Fair not found | MessePilot",
    };
  }

  return {
    title: `${fair.name} | MessePilot`,
    description: `${fair.name} in ${fair.city}, ${fair.countryISO}.`,
  };
}

function formatUpdatedAt(date: Date | null): string {
  if (!date) {
    return "Not available";
  }

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export default async function FairDetailPage({ params }: FairDetailPageProps) {
  const { id } = await params;
  const fair = await getPublishedFairById(id);

  if (!fair) {
    notFound();
  }

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
          ← Back to fairs
        </Link>

        <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-4">
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-slate-500">
              Published fair
            </p>

            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              {fair.name}
            </h1>

            <p className="text-lg font-medium text-slate-700">
              {fair.city}
              {fair.city && fair.countryISO ? ", " : ""}
              {fair.countryISO}
            </p>

            <p className="text-lg text-slate-700">
              {formatFairDateRange(fair.startDate, fair.endDate, "en")}
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
                Official website
              </a>
            ) : null}

            {mapURL ? (
              <a
                href={mapURL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
              >
                Open map
              </a>
            ) : null}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6 rounded-3xl border border-white/70 bg-white/90 p-8 shadow-sm backdrop-blur-xl">
          <section>
            <h2 className="text-xl font-semibold text-slate-950">Details</h2>

            <dl className="mt-5 divide-y divide-slate-200 rounded-2xl bg-slate-50">
              <div className="grid gap-1 px-5 py-4 sm:grid-cols-[180px_1fr]">
                <dt className="font-medium text-slate-600">Name</dt>
                <dd className="text-slate-950">{fair.name}</dd>
              </div>

              <div className="grid gap-1 px-5 py-4 sm:grid-cols-[180px_1fr]">
                <dt className="font-medium text-slate-600">City</dt>
                <dd className="text-slate-950">{fair.city || "Not available"}</dd>
              </div>

              <div className="grid gap-1 px-5 py-4 sm:grid-cols-[180px_1fr]">
                <dt className="font-medium text-slate-600">Country</dt>
                <dd className="text-slate-950">
                  {fair.countryISO || "Not available"}
                </dd>
              </div>

              <div className="grid gap-1 px-5 py-4 sm:grid-cols-[180px_1fr]">
                <dt className="font-medium text-slate-600">Date</dt>
                <dd className="text-slate-950">
                  {formatFairDateRange(fair.startDate, fair.endDate, "en")}
                </dd>
              </div>

              <div className="grid gap-1 px-5 py-4 sm:grid-cols-[180px_1fr]">
                <dt className="font-medium text-slate-600">Organizer</dt>
                <dd className="text-slate-950">
                  {fair.organizerName || "Not available"}
                </dd>
              </div>

              <div className="grid gap-1 px-5 py-4 sm:grid-cols-[180px_1fr]">
                <dt className="font-medium text-slate-600">Last updated</dt>
                <dd className="text-slate-950">{formatUpdatedAt(fair.updatedAt)}</dd>
              </div>
            </dl>
          </section>

          {fair.categories.length > 0 ? (
            <section>
              <h2 className="text-xl font-semibold text-slate-950">
                Categories
              </h2>

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
            </section>
          ) : null}
        </div>

        <aside className="space-y-6 rounded-3xl border border-white/70 bg-white/90 p-8 shadow-sm backdrop-blur-xl">
          <section>
            <h2 className="text-xl font-semibold text-slate-950">Links</h2>

            <div className="mt-4 space-y-3">
              {fair.officialWebsite ? (
                <a
                  href={fair.officialWebsite}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-2xl border border-slate-200 bg-white p-4 font-semibold text-blue-700 transition hover:border-blue-200 hover:bg-blue-50"
                >
                  Official website
                </a>
              ) : null}

              {mapURL ? (
                <a
                  href={mapURL}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-2xl border border-slate-200 bg-white p-4 font-semibold text-blue-700 transition hover:border-blue-200 hover:bg-blue-50"
                >
                  Open location in Maps
                </a>
              ) : null}
            </div>
          </section>

          <p className="text-sm leading-6 text-slate-600">
            Messe details can change. Always verify travel, venue and business
            information on the official fair website before making decisions.
          </p>
        </aside>
      </div>
    </section>
  );
}
