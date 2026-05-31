import type { WebsiteFair } from "@/lib/fairs";
import type { FairPageCopy } from "@/lib/website/fairCopy";

function formattedRatingAverage(fair: WebsiteFair, locale: string): string | null {
  const { ratingAverage, ratingCount } = fair.engagementStats;
  if (ratingCount <= 0 || ratingAverage === null) {
    return null;
  }

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(ratingAverage);
}

export function FairRatingBadge({
  fair,
  locale,
  copy,
  className,
}: {
  fair: WebsiteFair;
  locale: string;
  copy: FairPageCopy;
  className?: string;
}) {
  const ratingAverage = formattedRatingAverage(fair, locale);
  if (!ratingAverage) {
    return null;
  }

  return (
    <span
      aria-label={`${copy.rating}: ${ratingAverage}, ${fair.engagementStats.ratingCount} ${copy.ratings}`}
      className={[
        "inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-900",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span aria-hidden="true">★</span>
      <span>{ratingAverage}</span>
      <span className="text-amber-800/75">({fair.engagementStats.ratingCount})</span>
    </span>
  );
}

export function FairRatingPanel({
  fair,
  locale,
  copy,
}: {
  fair: WebsiteFair;
  locale: string;
  copy: FairPageCopy;
}) {
  const ratingAverage = formattedRatingAverage(fair, locale);
  if (!ratingAverage) {
    return null;
  }

  return (
    <section className="rounded-2xl border border-amber-200 bg-amber-50/80 p-4">
      <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-900">
        {copy.rating}
      </h2>
      <p className="mt-2 flex items-baseline gap-2 text-3xl font-semibold text-slate-950">
        <span aria-hidden="true" className="text-amber-500">
          ★
        </span>
        <span>{ratingAverage}</span>
      </p>
      <p className="mt-1 text-sm font-medium text-amber-900/80">
        {fair.engagementStats.ratingCount} {copy.ratings}
      </p>
    </section>
  );
}
