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
  sourceURL?: string;
  updatedAt: Date | null;
  latitude?: number;
  longitude?: number;
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
  sourceURL?: string;
  updatedAt?: Timestamp;
  status?: string;
  location?: GeoPoint;
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
    sourceURL: data.sourceURL,
    updatedAt: toDate(data.updatedAt),
    latitude: data.location?.latitude,
    longitude: data.location?.longitude,
  };
}

export async function getPublishedFairs(): Promise<WebsiteFair[]> {
  const snapshot = await getDocs(
    query(collection(db, "fairs"), where("status", "==", "published")),
  );

  return snapshot.docs
    .map((document) => {
      const data = document.data() as FirestoreFairDocument;
      return mapFairDocument(document.id, data);
    })
    .sort((a, b) => {
      const now = Date.now();

      const aStart = a.startDate?.getTime() ?? Number.MAX_SAFE_INTEGER;
      const bStart = b.startDate?.getTime() ?? Number.MAX_SAFE_INTEGER;
      const aEnd = a.endDate?.getTime() ?? aStart;
      const bEnd = b.endDate?.getTime() ?? bStart;

      const aIsUpcomingOrRunning = aEnd >= now;
      const bIsUpcomingOrRunning = bEnd >= now;

      if (aIsUpcomingOrRunning !== bIsUpcomingOrRunning) {
        return aIsUpcomingOrRunning ? -1 : 1;
      }

      if (aIsUpcomingOrRunning && bIsUpcomingOrRunning) {
        if (aStart !== bStart) {
          return aStart - bStart;
        }
      } else if (aStart !== bStart) {
        return bStart - aStart;
      }

      return a.name.localeCompare(b.name);
    });
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

  return mapFairDocument(fairDocument.id, data);
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
