import {
  getFunctions,
  httpsCallable,
  type Functions,
} from "firebase/functions";
import { app } from "@/lib/firebase";

export type FairDataReportType =
  | "date"
  | "location"
  | "organizer"
  | "officialWebsite"
  | "categories"
  | "description"
  | "status"
  | "duplicate"
  | "other";

export type SubmitFairDataReportPayload = Record<string, unknown>;

export type SubmitFairDataReportResult = {
  reportId: string;
  status: string;
  created: boolean;
  duplicate: boolean;
};

let functionsInstance: Functions | null = null;

function firebaseFunctions(): Functions {
  functionsInstance ??= getFunctions(app, "us-central1");
  return functionsInstance;
}

export function makeFairDataReportClientRequestId(): string {
  return `website-${crypto.randomUUID()}`;
}

export async function submitFairDataReport(
  payload: SubmitFairDataReportPayload,
): Promise<SubmitFairDataReportResult> {
  const callable = httpsCallable<
    SubmitFairDataReportPayload,
    SubmitFairDataReportResult
  >(firebaseFunctions(), "submitFairDataReport");
  const result = await callable(payload);
  return result.data;
}
