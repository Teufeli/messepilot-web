export const FAIR_PAGE_QUERY_PARAM = "page";
export const FAIR_PAGE_SIZE_QUERY_PARAM = "pageSize";
export const FAIR_PAGE_SIZE_OPTIONS = [10, 25, 50, 100] as const;
export const DEFAULT_FAIR_PAGE_SIZE = 25;

export type FairPageSize = (typeof FAIR_PAGE_SIZE_OPTIONS)[number];

type SearchParamValue = string | string[] | undefined;

function firstSearchParamValue(value: SearchParamValue): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function normalizedInteger(value: unknown): number | null {
  const rawValue =
    typeof value === "string" ? value.trim() : typeof value === "number" ? `${value}` : "";
  if (!rawValue) {
    return null;
  }

  const parsed = Number.parseInt(rawValue, 10);
  return Number.isFinite(parsed) ? parsed : null;
}

export function normalizeFairPage(value: unknown): number {
  const parsed = normalizedInteger(value);
  return parsed && parsed > 0 ? parsed : 1;
}

export function normalizeFairPageSize(value: unknown): FairPageSize {
  const parsed = normalizedInteger(value);
  return FAIR_PAGE_SIZE_OPTIONS.includes(parsed as FairPageSize)
    ? (parsed as FairPageSize)
    : DEFAULT_FAIR_PAGE_SIZE;
}

export function fairPageFromSearchParams(
  searchParams: Record<string, SearchParamValue> | undefined,
): number {
  return normalizeFairPage(
    firstSearchParamValue(searchParams?.[FAIR_PAGE_QUERY_PARAM]),
  );
}

export function fairPageSizeFromSearchParams(
  searchParams: Record<string, SearchParamValue> | undefined,
): FairPageSize {
  return normalizeFairPageSize(
    firstSearchParamValue(searchParams?.[FAIR_PAGE_SIZE_QUERY_PARAM]),
  );
}
