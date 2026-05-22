export const FAIR_SEARCH_QUERY_PARAM = "q";

function normalizedText(value: unknown): string | null {
  const text = Array.isArray(value) ? value[0] : value;
  if (typeof text !== "string") {
    return null;
  }

  const trimmed = text.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export function fairSearchQueryFromSearchParams(
  searchParams: Record<string, string | string[] | undefined> | undefined,
): string {
  return normalizedText(searchParams?.[FAIR_SEARCH_QUERY_PARAM]) ?? "";
}
