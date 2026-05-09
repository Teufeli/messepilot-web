import type { WebsiteFair, WebsiteFairBadgeKind } from "@/lib/fairs";

const badgeLabels: Record<WebsiteFairBadgeKind, string> = {
  new: "New",
  updated: "Updated",
  cancelled: "Cancelled",
  postponed: "Postponed",
  dateChanged: "Date changed",
  locationChanged: "Location changed",
  important: "Important update",
};

const badgeStyles: Record<WebsiteFairBadgeKind, string> = {
  new: "border-blue-200 bg-blue-50 text-blue-800",
  updated: "border-slate-200 bg-slate-100 text-slate-700",
  cancelled: "border-red-200 bg-red-50 text-red-800",
  postponed: "border-amber-200 bg-amber-50 text-amber-800",
  dateChanged: "border-violet-200 bg-violet-50 text-violet-800",
  locationChanged: "border-emerald-200 bg-emerald-50 text-emerald-800",
  important: "border-orange-200 bg-orange-50 text-orange-800",
};

export function FairBadgeStrip({
  badges,
  maxCount = 4,
}: {
  badges: WebsiteFair["badges"];
  maxCount?: number;
}) {
  if (badges.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {badges.slice(0, maxCount).map((badge) => (
        <span
          key={`${badge.kind}-${badge.eventId ?? "lifecycle"}`}
          className={[
            "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold",
            badgeStyles[badge.kind],
          ].join(" ")}
        >
          {badgeLabels[badge.kind]}
        </span>
      ))}
    </div>
  );
}

export function FairUpdatesPanel({ fair }: { fair: WebsiteFair }) {
  const visibleEvents = fair.changeEvents.filter((event) =>
    fair.badges.some((badge) => badge.eventId === event.id),
  );
  const hasSummary = Boolean(fair.changeSummary);

  if (fair.badges.length === 0 && visibleEvents.length === 0 && !hasSummary) {
    return null;
  }

  return (
    <section>
      <h2 className="text-xl font-semibold text-slate-950">Updates</h2>
      <div className="mt-4 space-y-3">
        <FairBadgeStrip badges={fair.badges} />

        {hasSummary ? (
          <p className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
            {fair.changeSummary}
          </p>
        ) : null}

        {visibleEvents.map((event) => (
          <div
            key={event.id}
            className="rounded-2xl border border-slate-200 bg-white p-4"
          >
            {event.title ? (
              <p className="font-semibold text-slate-950">{event.title}</p>
            ) : null}
            {event.summary ? (
              <p className="mt-1 text-sm leading-6 text-slate-600">
                {event.summary}
              </p>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
