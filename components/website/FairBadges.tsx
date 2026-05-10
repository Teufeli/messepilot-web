import {
  localizedChangeEventText,
  type WebsiteFair,
  type WebsiteFairBadgeKind,
  type WebsiteFairChangeEvent,
} from "@/lib/fairs";
import type {
  FairPageCopy,
  ProminentLifecycleStatus,
} from "@/lib/website/fairCopy";

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

const lifecycleStampStyles: Record<ProminentLifecycleStatus, string> = {
  cancelled:
    "border-red-300 bg-red-50 text-red-800 shadow-[0_0_0_1px_rgba(248,113,113,0.14)]",
  postponed:
    "border-amber-300 bg-amber-50 text-amber-900 shadow-[0_0_0_1px_rgba(251,191,36,0.16)]",
};

const lifecycleNoticeStyles: Record<
  ProminentLifecycleStatus,
  {
    container: string;
    accent: string;
    label: string;
    message: string;
  }
> = {
  cancelled: {
    container:
      "border-red-300 bg-red-50 text-red-950 shadow-[0_14px_28px_-24px_rgba(185,28,28,0.7)]",
    accent: "bg-red-600",
    label: "text-red-800",
    message: "text-red-950/80",
  },
  postponed: {
    container:
      "border-amber-300 bg-amber-50 text-amber-950 shadow-[0_14px_28px_-24px_rgba(180,83,9,0.75)]",
    accent: "bg-amber-500",
    label: "text-amber-900",
    message: "text-amber-950/80",
  },
};

type LifecycleNoticeVariant = "card" | "hero";

function prominentLifecycleStatus(
  status: WebsiteFair["lifecycleStatus"],
): ProminentLifecycleStatus | null {
  return status === "cancelled" || status === "postponed" ? status : null;
}

function isProminentLifecycleBadgeKind(kind: WebsiteFairBadgeKind) {
  return kind === "cancelled" || kind === "postponed";
}

export function FairLifecycleStamp({
  status,
  copy,
  className,
}: {
  status: WebsiteFair["lifecycleStatus"];
  copy: FairPageCopy;
  className?: string;
}) {
  const lifecycleStatus = prominentLifecycleStatus(status);

  if (!lifecycleStatus) {
    return null;
  }

  return (
    <div
      className={[
        "inline-flex w-full max-w-full items-center justify-center rounded-lg border-2 px-4 py-2 text-base font-black uppercase leading-none tracking-[0.22em] sm:w-fit sm:min-w-44 sm:text-lg",
        lifecycleStampStyles[lifecycleStatus],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {copy.lifecycle[lifecycleStatus].stamp}
    </div>
  );
}

export function FairLifecycleNotice({
  fair,
  copy,
  className,
  variant = "hero",
}: {
  fair: WebsiteFair;
  copy: FairPageCopy;
  className?: string;
  variant?: LifecycleNoticeVariant;
}) {
  const lifecycleStatus = prominentLifecycleStatus(fair.lifecycleStatus);

  if (!lifecycleStatus) {
    return null;
  }

  const styles = lifecycleNoticeStyles[lifecycleStatus];
  const isCard = variant === "card";

  return (
    <div
      role="status"
      className={[
        "relative overflow-hidden rounded-2xl border-2",
        isCard ? "p-4 pl-5" : "p-5 pl-6",
        styles.container,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span
        aria-hidden="true"
        className={["absolute inset-y-0 left-0 w-1.5", styles.accent].join(
          " ",
        )}
      />
      <p
        className={[
          "font-black uppercase leading-tight tracking-[0.22em]",
          isCard ? "text-base" : "text-lg sm:text-xl",
          styles.label,
        ].join(" ")}
      >
        {copy.lifecycle[lifecycleStatus].stamp}
      </p>
      <p
        className={[
          "mt-2 font-semibold leading-6",
          isCard ? "text-sm" : "text-sm sm:text-base",
          styles.message,
        ].join(" ")}
      >
        {copy.lifecycle[lifecycleStatus].message}
      </p>
    </div>
  );
}

export function FairBadgeStrip({
  badges,
  labels = badgeLabels,
  maxCount = 4,
  hideProminentLifecycleBadges = false,
}: {
  badges: WebsiteFair["badges"];
  labels?: Record<WebsiteFairBadgeKind, string>;
  maxCount?: number;
  hideProminentLifecycleBadges?: boolean;
}) {
  const displayedBadges = hideProminentLifecycleBadges
    ? badges.filter((badge) => !isProminentLifecycleBadgeKind(badge.kind))
    : badges;

  if (displayedBadges.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {displayedBadges.slice(0, maxCount).map((badge) => (
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
