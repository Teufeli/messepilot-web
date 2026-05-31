import type { WebsiteFair } from "@/lib/fairs";

export function utcDateKey(date: Date) {
  return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
}

export function todayDateKey() {
  const now = new Date();
  return Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
}

export function isPastFair(fair: WebsiteFair, currentTodayKey = todayDateKey()) {
  return fair.endDate ? utcDateKey(fair.endDate) < currentTodayKey : false;
}

export function isCurrentOrFutureFair(
  fair: WebsiteFair,
  currentTodayKey = todayDateKey(),
) {
  return !isPastFair(fair, currentTodayKey);
}
