import {
  localizedChangeEventText,
  type WebsiteFair,
  type WebsiteFairBadgeKind,
  type WebsiteFairChangeEvent,
} from "@/lib/fairs";
import type { FairPageCopy } from "@/lib/website/fairCopy";

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
  labels = badgeLabels,
  maxCount = 4,
}: {
  badges: WebsiteFair["badges"];
  labels?: Record<WebsiteFairBadgeKind, string>;
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
          {labels[badge.kind]}
        </span>
      ))}
    </div>
  );
}

function normalizedChangedFields(fields: string[]): string[] {
  return fields.map((field) => {
    const trimmed = field.trim();
    if (trimmed.startsWith("normalized.")) {
      return trimmed.slice("normalized.".length);
    }
    if (trimmed.startsWith("localized.")) {
      return trimmed.split(".").at(-1) ?? trimmed;
    }
    return trimmed;
  });
}

function changeEventCopyKey(event: WebsiteFairChangeEvent): keyof FairPageCopy["changeEventTitles"] {
  switch (event.eventType) {
    case "newFair":
    case "updatedFair":
    case "cancelled":
    case "postponed":
    case "dateChanged":
    case "locationChanged":
      return event.eventType;
    case "importantInfoChanged":
      break;
  }

  const fields = normalizedChangedFields(event.changedFields);
  if (fields.some((field) => field === "officialWebsite" || field.endsWith(".officialWebsite"))) {
    return "officialWebsiteChanged";
  }
  if (fields.some((field) => field === "startDate" || field === "endDate")) {
    return "dateChanged";
  }
  if (
    fields.some((field) =>
      ["city", "countryISO", "venueName", "location"].includes(field),
    )
  ) {
    return "locationChanged";
  }
  if (fields.includes("lifecycleStatus")) {
    return "lifecycleStatusChanged";
  }
  if (fields.some((field) => field.includes("description"))) {
    return "descriptionChanged";
  }

  return "importantInfoChanged";
}

function eventTitle(event: WebsiteFairChangeEvent, copy: FairPageCopy, locale: string) {
  const localizedText = localizedChangeEventText(event, locale);
  return localizedText.title || copy.changeEventTitles[changeEventCopyKey(event)] || event.title || copy.badges.updated;
}

function eventSummary(event: WebsiteFairChangeEvent, copy: FairPageCopy, locale: string) {
  const localizedText = localizedChangeEventText(event, locale);
  return localizedText.summary || copy.changeEventSummaries[changeEventCopyKey(event)] || event.summary;
}

export function FairUpdatesPanel({
  fair,
  copy,
  locale,
}: {
  fair: WebsiteFair;
  copy: FairPageCopy;
  locale: string;
}) {
  const visibleEvents = fair.changeEvents.filter((event) =>
    fair.badges.some((badge) => badge.eventId === event.id),
  );
  const fallbackSummary = visibleEvents.length === 0 ? fair.changeSummary : null;

  if (fair.badges.length === 0 && visibleEvents.length === 0 && !fallbackSummary) {
    return null;
  }

  return (
    <section>
      <h2 className="text-xl font-semibold text-slate-950">{copy.updates}</h2>
      <div className="mt-4 space-y-3">
        <FairBadgeStrip badges={fair.badges} labels={copy.badges} />

        {fallbackSummary ? (
          <p className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
            {fallbackSummary}
          </p>
        ) : null}

        {visibleEvents.map((event) => (
          <div
            key={event.id}
            className="rounded-2xl border border-slate-200 bg-white p-4"
          >
            <p className="font-semibold text-slate-950">
              {eventTitle(event, copy, locale)}
            </p>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              {eventSummary(event, copy, locale)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
