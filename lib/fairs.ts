import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  type GeoPoint,
  type Timestamp,
} from "firebase/firestore/lite";
import { db } from "./firebase";

export type WebsiteFairLifecycleStatus =
  | "active"
  | "cancelled"
  | "postponed"
  | "ended";

export type WebsiteFairChangeEventType =
  | "newFair"
  | "updatedFair"
  | "cancelled"
  | "postponed"
  | "dateChanged"
  | "locationChanged"
  | "importantInfoChanged";

export type WebsiteFairBadgeKind =
  | "new"
  | "updated"
  | "cancelled"
  | "postponed"
  | "dateChanged"
  | "locationChanged"
  | "important";

export type WebsiteFairBadge = {
  kind: WebsiteFairBadgeKind;
  eventId?: string;
};

export type WebsiteFairChangeEvent = {
  id: string;
  fairId: string;
  eventType: WebsiteFairChangeEventType;
  createdAt: Date | null;
  effectiveAt: Date | null;
  visibleFrom: Date | null;
  visibleUntil: Date | null;
  title?: string;
  summary?: string;
};

export type WebsiteFair = {
  id: string;
  name: string;
  city: string;
  countryISO: string;
  startDate: Date | null;
  endDate: Date | null;
  categories: string[];
  officialWebsite?: string;
  organizerName?: string;
  updatedAt: Date | null;
  latitude?: number;
  longitude?: number;
  lifecycleStatus?: WebsiteFairLifecycleStatus;
  latestPublicChangeEventId?: string;
  lastSignificantChangeAt: Date | null;
  changeSummary?: string;
  recentImportantChangeUntil: Date | null;
  changeEvents: WebsiteFairChangeEvent[];
  badges: WebsiteFairBadge[];
};

type FirestoreFairDocument = {
  id?: string;
  name?: string;
  city?: string;
  countryISO?: string;
  startDate?: Timestamp;
  endDate?: Timestamp;
  categories?: string[];
  officialWebsite?: string;
  organizerName?: string;
  updatedAt?: Timestamp;
  status?: string;
  location?: GeoPoint;
  lifecycleStatus?: string;
  latestPublicChangeEventId?: string;
  lastSignificantChangeAt?: Timestamp;
  changeSummary?: string;
  recentImportantChangeUntil?: Timestamp;
};

type FirestoreFairChangeEventDocument = {
  fairId?: string;
  eventType?: string;
  visibility?: string;
  status?: string;
  createdAt?: Timestamp;
  effectiveAt?: Timestamp;
  visibleFrom?: Timestamp;
  visibleUntil?: Timestamp;
  title?: string;
  summary?: string;
};

function toDate(value: Timestamp | undefined): Date | null {
  return value?.toDate?.() ?? null;
}

function formatFallbackId(documentId: string, data: FirestoreFairDocument): string {
  return data.id || documentId;
}

function mapFairDocument(documentId: string, data: FirestoreFairDocument): WebsiteFair {
  return {
    id: formatFallbackId(documentId, data),
    name: data.name ?? "Untitled fair",
    city: data.city ?? "",
    countryISO: data.countryISO ?? "",
    startDate: toDate(data.startDate),
    endDate: toDate(data.endDate),
    categories: Array.isArray(data.categories) ? data.categories : [],
    officialWebsite: data.officialWebsite,
    organizerName: data.organizerName,
    updatedAt: toDate(data.updatedAt),
    latitude: data.location?.latitude,
    longitude: data.location?.longitude,
    lifecycleStatus: normalizeLifecycleStatus(data.lifecycleStatus),
    latestPublicChangeEventId: data.latestPublicChangeEventId,
    lastSignificantChangeAt: toDate(data.lastSignificantChangeAt),
    changeSummary: data.changeSummary,
    recentImportantChangeUntil: toDate(data.recentImportantChangeUntil),
    changeEvents: [],
    badges: [],
  };
}

function normalizeLifecycleStatus(
  value: string | undefined,
): WebsiteFairLifecycleStatus | undefined {
  if (
    value === "active" ||
    value === "cancelled" ||
    value === "postponed" ||
    value === "ended"
  ) {
    return value;
  }
  return undefined;
}

function normalizeChangeEventType(
  value: string | undefined,
): WebsiteFairChangeEventType | undefined {
  if (
    value === "newFair" ||
    value === "updatedFair" ||
    value === "cancelled" ||
    value === "postponed" ||
    value === "dateChanged" ||
    value === "locationChanged" ||
    value === "importantInfoChanged"
  ) {
    return value;
  }
  return undefined;
}

function badgeKindForEvent(
  eventType: WebsiteFairChangeEventType,
): WebsiteFairBadgeKind {
  switch (eventType) {
    case "newFair":
      return "new";
    case "updatedFair":
      return "updated";
    case "cancelled":
      return "cancelled";
    case "postponed":
      return "postponed";
    case "dateChanged":
      return "dateChanged";
    case "locationChanged":
      return "locationChanged";
    case "importantInfoChanged":
      return "important";
  }
}

function isVisibleEvent(event: WebsiteFairChangeEvent, now: number): boolean {
  const visibleFrom = event.visibleFrom?.getTime() ?? Number.MIN_SAFE_INTEGER;
  const visibleUntil = event.visibleUntil?.getTime() ?? Number.MIN_SAFE_INTEGER;
  return visibleFrom <= now && visibleUntil >= now;
}

function mapChangeEventDocument(
  documentId: string,
  data: FirestoreFairChangeEventDocument,
): WebsiteFairChangeEvent | null {
  const eventType = normalizeChangeEventType(data.eventType);
  if (
    !eventType ||
    data.visibility !== "public" ||
    data.status !== "active" ||
    !data.fairId
  ) {
    return null;
  }

  return {
    id: documentId,
    fairId: data.fairId,
    eventType,
    createdAt: toDate(data.createdAt),
    effectiveAt: toDate(data.effectiveAt),
    visibleFrom: toDate(data.visibleFrom),
    visibleUntil: toDate(data.visibleUntil),
    title: data.title,
    summary: data.summary,
  };
}

async function getPublicChangeEventsByFairId(
  fairIds: string[],
): Promise<Map<string, WebsiteFairChangeEvent[]>> {
  const eventsByFairId = new Map<string, WebsiteFairChangeEvent[]>();
  const uniqueFairIds = [...new Set(fairIds)].filter(Boolean);
  const chunkSize = 10;

  for (let index = 0; index < uniqueFairIds.length; index += chunkSize) {
    const chunk = uniqueFairIds.slice(index, index + chunkSize);
    const snapshot = await getDocs(
      query(
        collection(db, "fairChangeEvents"),
        where("fairId", "in", chunk),
        where("visibility", "==", "public"),
        where("status", "==", "active"),
      ),
    );

    for (const document of snapshot.docs) {
      const event = mapChangeEventDocument(
        document.id,
        document.data() as FirestoreFairChangeEventDocument,
      );
      if (!event) {
        continue;
      }
      const events = eventsByFairId.get(event.fairId) ?? [];
      events.push(event);
      eventsByFairId.set(event.fairId, events);
    }
  }

  for (const events of eventsByFairId.values()) {
    events.sort((a, b) => {
      const aTime = a.createdAt?.getTime() ?? 0;
      const bTime = b.createdAt?.getTime() ?? 0;
      return bTime - aTime;
    });
  }

  return eventsByFairId;
}

function attachPublicChangeState(
  fair: WebsiteFair,
  changeEvents: WebsiteFairChangeEvent[],
): WebsiteFair {
  const now = Date.now();
  const badges: WebsiteFairBadge[] = [];
  const seenKinds = new Set<WebsiteFairBadgeKind>();

  if (fair.lifecycleStatus === "cancelled" || fair.lifecycleStatus === "postponed") {
    badges.push({ kind: fair.lifecycleStatus });
    seenKinds.add(fair.lifecycleStatus);
  }

  for (const event of changeEvents) {
    if (!isVisibleEvent(event, now)) {
      continue;
    }
    const kind = badgeKindForEvent(event.eventType);
    if (seenKinds.has(kind)) {
      continue;
    }
    badges.push({ kind, eventId: event.id });
    seenKinds.add(kind);
  }

  return {
    ...fair,
    changeEvents,
    badges,
  };
}

function compareFairsByStartDate(a: WebsiteFair, b: WebsiteFair): number {
  const aTime = a.startDate?.getTime();
  const bTime = b.startDate?.getTime();

  if (aTime === undefined && bTime === undefined) {
    return a.name.localeCompare(b.name);
  }
  if (aTime === undefined) {
    return 1;
  }
  if (bTime === undefined) {
    return -1;
  }
  if (aTime !== bTime) {
    return aTime - bTime;
  }

  return a.name.localeCompare(b.name);
}

export async function getPublishedFairs(): Promise<WebsiteFair[]> {
  const snapshot = await getDocs(
    query(collection(db, "fairs"), where("status", "==", "published")),
  );

  const fairs = snapshot.docs
    .map((document) => {
      const data = document.data() as FirestoreFairDocument;
      return mapFairDocument(document.id, data);
    })
    .sort(compareFairsByStartDate);
  const eventsByFairId = await getPublicChangeEventsByFairId(
    fairs.map((fair) => fair.id),
  );

  return fairs.map((fair) =>
    attachPublicChangeState(fair, eventsByFairId.get(fair.id) ?? []),
  );
}

export async function getPublishedFairById(id: string): Promise<WebsiteFair | null> {
  const fairDocument = await getDoc(doc(db, "fairs", id));

  if (!fairDocument.exists()) {
    return null;
  }

  const data = fairDocument.data() as FirestoreFairDocument;

  if (data.status !== "published") {
    return null;
  }

  const fair = mapFairDocument(fairDocument.id, data);
  const eventsByFairId = await getPublicChangeEventsByFairId([fair.id]);
  return attachPublicChangeState(fair, eventsByFairId.get(fair.id) ?? []);
}

export function formatFairDateRange(
  startDate: Date | null,
  endDate: Date | null,
  locale: string,
): string {
  if (!startDate && !endDate) {
    return "Date to be confirmed";
  }

  const formatter = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  if (startDate && endDate) {
    return `${formatter.format(startDate)} – ${formatter.format(endDate)}`;
  }

  return formatter.format(startDate ?? endDate!);
}
