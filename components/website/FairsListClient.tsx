"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type FormEvent, useMemo, useState } from "react";
import {
  FairBadgeStrip,
  FairLifecycleNotice,
} from "@/components/website/FairBadges";
import {
  FairDataDisclaimerNotice,
  MissingFairSuggestionReport,
} from "@/components/website/FairDataReports";
import { WeatherSummary } from "@/components/website/WeatherSummary";
import {
  formatFairTitleForDisplay,
  formatFairDateRange,
  type WebsiteFair,
  type WebsiteFairCategory,
} from "@/lib/fairs";
import {
  fairLocationKey,
  fairMatchesLocationKey,
  locationLabelForKey,
  normalizeLocationQueryKey,
} from "@/lib/website/fairLocations";
import { isPastFair, todayDateKey } from "@/lib/website/fairDateFilters";
import { FAIR_SEARCH_QUERY_PARAM } from "@/lib/website/fairSearchParams";
import type { FairPageCopy } from "@/lib/website/fairCopy";
import type { FairDataReportCopy } from "@/lib/website/fairCopy";
import type { PublicWeatherSnapshotsByLocationKey } from "@/lib/website/weather";
import { getWeatherCopy } from "@/lib/website/weatherCopy";

type SortOrder = "soonest" | "latest";

type FairMonthGroup = {
  key: string;
  heading: string;
  fairs: WebsiteFair[];
};

type CategoryTreeNode = {
  category: WebsiteFairCategory;
  children: CategoryTreeNode[];
};

type CategoryTreeData = {
  roots: CategoryTreeNode[];
  categoriesById: Map<string, WebsiteFairCategory>;
  categoriesByKey: Map<string, WebsiteFairCategory>;
  descendantKeysById: Map<string, Set<string>>;
};

type FairsListClientProps = {
  fairs: WebsiteFair[];
  categories: WebsiteFairCategory[];
  locale: string;
  copy: FairPageCopy;
  reportCopy: FairDataReportCopy;
  initialLocationKey?: string | null;
  initialSearchQuery?: string;
  weatherSnapshots: PublicWeatherSnapshotsByLocationKey;
};

const TECHNICAL_CATEGORY_KEYS = new Set(["imported"]);

function categoryKey(categoryId: string): string {
  return categoryId.trim().toLowerCase();
}

function normalizeLocaleKey(locale: string): string {
  return locale.trim().replaceAll("_", "-").toLowerCase();
}

function categoryLabelFallbackCodes(locale: string): string[] {
  const normalizedLocale = normalizeLocaleKey(locale);
  const baseLanguage = normalizedLocale.split("-")[0];
  return [...new Set([normalizedLocale, baseLanguage, "en", "de"].filter(Boolean))];
}

function localizedCategoryLabel(
  category: WebsiteFairCategory,
  locale: string,
): string {
  for (const localeCode of categoryLabelFallbackCodes(locale)) {
    const label = category.labels[localeCode]?.trim();
    if (label) {
      return label;
    }
  }

  return category.id;
}

function isTechnicalCategory(categoryId: string): boolean {
  return TECHNICAL_CATEGORY_KEYS.has(categoryKey(categoryId));
}

function publicCategoryIds(categoryIds: string[]): string[] {
  const seen = new Set<string>();
  return categoryIds
    .map((categoryId) => categoryId.trim())
    .filter((categoryId) => {
      const key = categoryKey(categoryId);
      if (!categoryId || isTechnicalCategory(categoryId) || seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
}

function knownPublicCategoryIds(
  categoryIds: string[],
  categoriesByKey: Map<string, WebsiteFairCategory>,
): string[] {
  return publicCategoryIds(categoryIds).filter((categoryId) =>
    categoriesByKey.has(categoryKey(categoryId)),
  );
}

function compareFairsByStartDate(
  a: WebsiteFair,
  b: WebsiteFair,
  sortOrder: SortOrder,
  locale: string,
) {
  const aTime = a.startDate?.getTime();
  const bTime = b.startDate?.getTime();

  if (aTime === undefined && bTime === undefined) {
    return a.name.localeCompare(b.name, locale);
  }
  if (aTime === undefined) {
    return 1;
  }
  if (bTime === undefined) {
    return -1;
  }
  if (aTime !== bTime) {
    return sortOrder === "soonest" ? aTime - bTime : bTime - aTime;
  }

  return a.name.localeCompare(b.name, locale);
}

function monthGroupKey(date: Date | null) {
  if (!date) {
    return "date-to-be-confirmed";
  }

  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  return `${date.getUTCFullYear()}-${month}`;
}

function monthHeading(
  date: Date | null,
  locale: string,
  dateToBeConfirmed: string,
) {
  if (!date) {
    return dateToBeConfirmed;
  }

  return new Intl.DateTimeFormat(locale, {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  })
    .format(date)
    .toLocaleUpperCase(locale);
}

function groupFairsByMonth(
  fairs: WebsiteFair[],
  locale: string,
  dateToBeConfirmed: string,
) {
  const groups: FairMonthGroup[] = [];
  const groupsByKey = new Map<string, FairMonthGroup>();

  for (const fair of fairs) {
    const key = monthGroupKey(fair.startDate);
    let group = groupsByKey.get(key);

    if (!group) {
      group = {
        key,
        heading: monthHeading(fair.startDate, locale, dateToBeConfirmed),
        fairs: [],
      };
      groupsByKey.set(key, group);
      groups.push(group);
    }

    group.fairs.push(fair);
  }

  return groups;
}

function compareCategories(
  a: WebsiteFairCategory,
  b: WebsiteFairCategory,
  locale: string,
) {
  const aOrder = a.sortOrder ?? Number.MAX_SAFE_INTEGER;
  const bOrder = b.sortOrder ?? Number.MAX_SAFE_INTEGER;
  if (aOrder !== bOrder) {
    return aOrder - bOrder;
  }

  const aLevel = a.level ?? Number.MAX_SAFE_INTEGER;
  const bLevel = b.level ?? Number.MAX_SAFE_INTEGER;
  if (aLevel !== bLevel) {
    return aLevel - bLevel;
  }

  return (
    localizedCategoryLabel(a, locale).localeCompare(
      localizedCategoryLabel(b, locale),
      locale,
    ) || a.id.localeCompare(b.id, locale)
  );
}

function buildCategoryTreeData(
  fairs: WebsiteFair[],
  categories: WebsiteFairCategory[],
  locale: string,
): CategoryTreeData {
  const categoriesByKey = new Map<string, WebsiteFairCategory>();
  const categoriesById = new Map<string, WebsiteFairCategory>();

  for (const category of categories) {
    if (!category.id || isTechnicalCategory(category.id)) {
      continue;
    }
    categoriesByKey.set(categoryKey(category.id), category);
    categoriesById.set(category.id, category);
  }

  const usedCategoryKeys = new Set<string>();

  for (const fair of fairs) {
    for (const categoryId of publicCategoryIds(fair.categoryIds)) {
      const key = categoryKey(categoryId);
      if (categoriesByKey.has(key)) {
        usedCategoryKeys.add(key);
      }
    }
  }

  const includedKeys = new Set<string>();

  for (const usedKey of usedCategoryKeys) {
    let currentKey: string | undefined = usedKey;
    const visitedKeys = new Set<string>();

    while (currentKey && !visitedKeys.has(currentKey)) {
      visitedKeys.add(currentKey);
      includedKeys.add(currentKey);

      const category = categoriesByKey.get(currentKey);
      const parentKey = category?.parentId
        ? categoryKey(category.parentId)
        : undefined;

      if (
        !parentKey ||
        isTechnicalCategory(parentKey) ||
        !categoriesByKey.has(parentKey)
      ) {
        break;
      }

      currentKey = parentKey;
    }
  }

  const nodesByKey = new Map<string, CategoryTreeNode>();
  const includedCategories = [...includedKeys]
    .map((key) => categoriesByKey.get(key))
    .filter((category): category is WebsiteFairCategory => Boolean(category))
    .sort((a, b) => compareCategories(a, b, locale));

  for (const category of includedCategories) {
    nodesByKey.set(categoryKey(category.id), {
      category,
      children: [],
    });
  }

  const roots: CategoryTreeNode[] = [];

  for (const category of includedCategories) {
    const node = nodesByKey.get(categoryKey(category.id));
    if (!node) {
      continue;
    }

    const parentKey = category.parentId ? categoryKey(category.parentId) : "";
    const parentNode =
      parentKey && parentKey !== categoryKey(category.id)
        ? nodesByKey.get(parentKey)
        : undefined;

    if (parentNode) {
      parentNode.children.push(node);
    } else {
      roots.push(node);
    }
  }

  function sortTree(nodes: CategoryTreeNode[]) {
    nodes.sort((a, b) => compareCategories(a.category, b.category, locale));
    for (const node of nodes) {
      sortTree(node.children);
    }
  }

  sortTree(roots);

  const descendantKeysById = new Map<string, Set<string>>();

  function collectDescendantKeys(node: CategoryTreeNode): Set<string> {
    const descendantKeys = new Set([categoryKey(node.category.id)]);
    for (const child of node.children) {
      for (const childKey of collectDescendantKeys(child)) {
        descendantKeys.add(childKey);
      }
    }
    descendantKeysById.set(node.category.id, descendantKeys);
    return descendantKeys;
  }

  for (const root of roots) {
    collectDescendantKeys(root);
  }

  return {
    roots,
    categoriesById,
    categoriesByKey,
    descendantKeysById,
  };
}

function selectedCategoryMatchKeys(
  selectedCategoryIds: string[],
  descendantKeysById: Map<string, Set<string>>,
) {
  const selectedKeys = new Set<string>();

  for (const selectedCategoryId of selectedCategoryIds) {
    const descendantKeys = descendantKeysById.get(selectedCategoryId);
    if (descendantKeys) {
      for (const descendantKey of descendantKeys) {
        selectedKeys.add(descendantKey);
      }
    } else {
      selectedKeys.add(categoryKey(selectedCategoryId));
    }
  }

  return selectedKeys;
}

const SEARCH_COMBINING_MARKS_PATTERN = /[\u0300-\u036f]/g;

function normalizeSearchText(value: string): string {
  return value
    .normalize("NFKD")
    .replace(SEARCH_COMBINING_MARKS_PATTERN, "")
    .replace(/[ßẞ]/g, "ss")
    .toLowerCase();
}

function searchTokens(searchQuery: string): string[] {
  return normalizeSearchText(searchQuery)
    .split(/\s+/)
    .map((token) => token.trim())
    .filter(Boolean);
}

function searchAcronym(value: string): string | null {
  const words = normalizeSearchText(value)
    .split(/[^a-z0-9]+/)
    .filter(Boolean);

  return words.length > 1 ? words.map((word) => word[0]).join("") : null;
}

function countrySearchValues(countryISO: string, locale: string): string[] {
  const normalizedCountryISO = countryISO.trim().toUpperCase();
  if (!normalizedCountryISO) {
    return [];
  }

  const values = new Set([normalizedCountryISO]);

  for (const localeCode of categoryLabelFallbackCodes(locale)) {
    try {
      const label = new Intl.DisplayNames([localeCode], { type: "region" }).of(
        normalizedCountryISO,
      );
      if (label) {
        values.add(label);
        const acronym = searchAcronym(label);
        if (acronym) {
          values.add(acronym);
        }
      }
    } catch {
      // Ignore unsupported region display names and keep the ISO fallback.
    }
  }

  return [...values];
}

function locationSearchAliases(fair: WebsiteFair, locationKey: string | null): string[] {
  const normalizedCity = normalizeSearchText(fair.city);
  const aliases = new Set<string>();

  if (
    locationKey === "DE:munich" ||
    normalizedCity === "munich" ||
    normalizedCity === "munchen"
  ) {
    aliases.add("Munich");
    aliases.add("München");
  }

  if (
    locationKey === "CN:beijing" ||
    normalizedCity === "beijing" ||
    normalizedCity === "peking" ||
    normalizedCity === "bejing"
  ) {
    aliases.add("Beijing");
    aliases.add("Peking");
    aliases.add("Bejing");
  }

  return [...aliases];
}

function categoryLabelsForSearch(
  categoryId: string,
  categoriesByKey: Map<string, WebsiteFairCategory>,
  locale: string,
  visitedKeys = new Set<string>(),
): string[] {
  const key = categoryKey(categoryId);
  if (visitedKeys.has(key) || isTechnicalCategory(categoryId)) {
    return [];
  }

  visitedKeys.add(key);
  const category = categoriesByKey.get(key);

  if (!category) {
    return [categoryId];
  }

  const labels = [localizedCategoryLabel(category, locale), category.id];

  if (category.parentId) {
    labels.push(
      ...categoryLabelsForSearch(
        category.parentId,
        categoriesByKey,
        locale,
        visitedKeys,
      ),
    );
  }

  return labels;
}

function fairSearchValues(
  fair: WebsiteFair,
  categoriesByKey: Map<string, WebsiteFairCategory>,
  locale: string,
): string[] {
  const locationKey = fairLocationKey(fair);
  const values = [
    fair.name,
    fair.city,
    fair.countryISO,
    ...countrySearchValues(fair.countryISO, locale),
    ...locationSearchAliases(fair, locationKey),
    locationKey,
    locationKey?.replace(/[:-]+/g, " "),
    fair.venueName,
    fair.organizerName,
    fair.description,
    ...Object.values(fair.localizedDescriptions),
    ...Object.values(fair.localizedLocationLabels).flatMap((labels) => [
      labels.cityDisplayName,
      labels.city,
      labels.locationName,
      labels.countryDisplayName,
      labels.venueName,
    ]),
    fair.officialWebsite,
    ...knownPublicCategoryIds(fair.categoryIds, categoriesByKey).flatMap((categoryId) =>
      categoryLabelsForSearch(categoryId, categoriesByKey, locale),
    ),
  ].filter((value): value is string => Boolean(value?.trim()));

  return [
    ...new Set(
      values.flatMap((value) => {
        const acronym = searchAcronym(value);
        return acronym ? [value, acronym] : [value];
      }),
    ),
  ];
}

function fairMatchesSearch(
  fair: WebsiteFair,
  tokens: string[],
  categoriesByKey: Map<string, WebsiteFairCategory>,
  locale: string,
): boolean {
  if (tokens.length === 0) {
    return true;
  }

  const haystack = normalizeSearchText(
    fairSearchValues(fair, categoriesByKey, locale).join("\n"),
  );

  return tokens.every((token) => haystack.includes(token));
}

function fairMatchesSelectedCategories(
  fair: WebsiteFair,
  selectedCategoryKeys: Set<string>,
  categoriesByKey: Map<string, WebsiteFairCategory>,
): boolean {
  if (selectedCategoryKeys.size === 0) {
    return true;
  }

  return knownPublicCategoryIds(fair.categoryIds, categoriesByKey).some((categoryId) =>
    selectedCategoryKeys.has(categoryKey(categoryId)),
  );
}

function categoryLabelById(
  categoryId: string,
  treeData: CategoryTreeData,
  locale: string,
): string {
  const category =
    treeData.categoriesById.get(categoryId) ??
    treeData.categoriesByKey.get(categoryKey(categoryId));

  return category ? localizedCategoryLabel(category, locale) : categoryId;
}

function CategoryTreeList({
  nodes,
  locale,
  selectedCategoryIds,
  openCategoryIds,
  onToggleCategory,
  onToggleOpen,
}: {
  nodes: CategoryTreeNode[];
  locale: string;
  selectedCategoryIds: string[];
  openCategoryIds: string[];
  onToggleCategory: (categoryId: string) => void;
  onToggleOpen: (categoryId: string) => void;
}) {
  return (
    <ol className="space-y-1">
      {nodes.map((node) => {
        const categoryId = node.category.id;
        const isSelected = selectedCategoryIds.includes(categoryId);
        const isOpen = openCategoryIds.includes(categoryId);
        const hasChildren = node.children.length > 0;
        const label = localizedCategoryLabel(node.category, locale);

        return (
          <li key={categoryId}>
            <div className="flex items-center gap-2 rounded-xl px-2 py-1.5 transition hover:bg-white">
              {hasChildren ? (
                <button
                  type="button"
                  aria-label={label}
                  aria-expanded={isOpen}
                  onClick={() => onToggleOpen(categoryId)}
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-950"
                >
                  <span
                    aria-hidden="true"
                    className={[
                      "transition-transform",
                      isOpen ? "rotate-90" : "",
                    ].join(" ")}
                  >
                    &gt;
                  </span>
                </button>
              ) : (
                <span className="h-7 w-7 shrink-0" />
              )}

              <label className="flex min-w-0 flex-1 cursor-pointer items-center gap-2 text-sm font-medium text-slate-700">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => onToggleCategory(categoryId)}
                  className="h-4 w-4 shrink-0 accent-slate-950"
                />
                <span className="truncate">{label}</span>
              </label>
            </div>

            {hasChildren && isOpen ? (
              <div className="ml-5 border-l border-slate-200 pl-3">
                <CategoryTreeList
                  nodes={node.children}
                  locale={locale}
                  selectedCategoryIds={selectedCategoryIds}
                  openCategoryIds={openCategoryIds}
                  onToggleCategory={onToggleCategory}
                  onToggleOpen={onToggleOpen}
                />
              </div>
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}

export default function FairsListClient({
  fairs,
  categories,
  locale,
  copy,
  reportCopy,
  initialLocationKey,
  initialSearchQuery = "",
  weatherSnapshots,
}: FairsListClientProps) {
  const pathname = usePathname();
  const [sortOrder, setSortOrder] = useState<SortOrder>("soonest");
  const [hidePastFairs, setHidePastFairs] = useState(true);
  const [searchQuery, setSearchQuery] = useState(() => initialSearchQuery.trim());
  const [selectedLocationKey, setSelectedLocationKey] = useState<string | null>(
    () => normalizeLocationQueryKey(initialLocationKey),
  );
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
  const [openCategoryIds, setOpenCategoryIds] = useState<string[]>([]);
  const currentTodayKey = useMemo(() => todayDateKey(), []);
  const weatherCopy = useMemo(() => getWeatherCopy(locale), [locale]);
  const activeSearchQuery = searchQuery.trim();

  const replaceFilterUrl = ({
    locationKey = selectedLocationKey,
    nextSearchQuery = searchQuery,
  }: {
    locationKey?: string | null;
    nextSearchQuery?: string;
  }) => {
    const params = new URLSearchParams(window.location.search);
    const normalizedSearchQuery = nextSearchQuery.trim();

    if (normalizedSearchQuery) {
      params.set(FAIR_SEARCH_QUERY_PARAM, normalizedSearchQuery);
    } else {
      params.delete(FAIR_SEARCH_QUERY_PARAM);
    }

    if (locationKey) {
      params.set("location", locationKey);
    } else {
      params.delete("location");
    }

    const queryString = params.toString();
    window.history.replaceState(
      window.history.state,
      "",
      `${pathname}${queryString ? `?${queryString}` : ""}`,
    );
  };

  const baseFairs = useMemo(
    () =>
      fairs.filter(
        (fair) => !hidePastFairs || !isPastFair(fair, currentTodayKey),
      ),
    [currentTodayKey, fairs, hidePastFairs],
  );

  const locationFilteredFairs = useMemo(
    () =>
      selectedLocationKey
        ? baseFairs.filter((fair) =>
            fairMatchesLocationKey(fair, selectedLocationKey),
          )
        : baseFairs,
    [baseFairs, selectedLocationKey],
  );

  const selectedLocationLabel = useMemo(
    () => locationLabelForKey(fairs, selectedLocationKey, locale),
    [fairs, locale, selectedLocationKey],
  );

  const categoryTreeData = useMemo(
    () => buildCategoryTreeData(locationFilteredFairs, categories, locale),
    [categories, locale, locationFilteredFairs],
  );

  const tokens = useMemo(() => searchTokens(searchQuery), [searchQuery]);

  const selectedCategoryKeys = useMemo(
    () =>
      selectedCategoryMatchKeys(
        selectedCategoryIds,
        categoryTreeData.descendantKeysById,
      ),
    [categoryTreeData.descendantKeysById, selectedCategoryIds],
  );

  const visibleFairs = useMemo(
    () =>
      locationFilteredFairs
        .filter((fair) =>
          fairMatchesSearch(
            fair,
            tokens,
            categoryTreeData.categoriesByKey,
            locale,
          ),
        )
        .filter((fair) =>
          fairMatchesSelectedCategories(
            fair,
            selectedCategoryKeys,
            categoryTreeData.categoriesByKey,
          ),
        )
        .sort((a, b) => compareFairsByStartDate(a, b, sortOrder, locale)),
    [
      categoryTreeData.categoriesByKey,
      locationFilteredFairs,
      locale,
      selectedCategoryKeys,
      sortOrder,
      tokens,
    ],
  );

  const groupedFairs = useMemo(
    () => groupFairsByMonth(visibleFairs, locale, copy.dateToBeConfirmed),
    [copy.dateToBeConfirmed, locale, visibleFairs],
  );

  const hasSearchOrCategoryFilter =
    tokens.length > 0 || selectedCategoryIds.length > 0 || Boolean(selectedLocationKey);
  const hasChangedFilters =
    hasSearchOrCategoryFilter || hidePastFairs !== true;

  const fairDetailPath = (fairId: string) =>
    locale === "en" ? `/fairs/${fairId}` : `/${locale}/fairs/${fairId}`;

  const clearLocationFilterState = () => {
    setSelectedLocationKey(null);
    replaceFilterUrl({ locationKey: null });
  };

  const clearSearchFilter = () => {
    setSearchQuery("");
    replaceFilterUrl({ nextSearchQuery: "" });
  };

  const updateSearchQuery = (nextSearchQuery: string) => {
    setSearchQuery(nextSearchQuery);
    replaceFilterUrl({ nextSearchQuery });
  };

  const toggleCategory = (categoryId: string) => {
    setSelectedCategoryIds((currentCategoryIds) =>
      currentCategoryIds.includes(categoryId)
        ? currentCategoryIds.filter((currentCategoryId) => currentCategoryId !== categoryId)
        : [...currentCategoryIds, categoryId],
    );
  };

  const toggleCategoryOpen = (categoryId: string) => {
    setOpenCategoryIds((currentCategoryIds) =>
      currentCategoryIds.includes(categoryId)
        ? currentCategoryIds.filter((currentCategoryId) => currentCategoryId !== categoryId)
        : [...currentCategoryIds, categoryId],
    );
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategoryIds([]);
    setSelectedLocationKey(null);
    setHidePastFairs(true);
    replaceFilterUrl({ locationKey: null, nextSearchQuery: "" });
  };

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedSearchQuery = searchQuery.trim();
    setSearchQuery(normalizedSearchQuery);
    replaceFilterUrl({ nextSearchQuery: normalizedSearchQuery });
  };

  return (
    <div className="space-y-5">
      <div className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <form role="search" onSubmit={submitSearch} className="min-w-0">
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => updateSearchQuery(event.target.value)}
              placeholder={copy.searchPlaceholder}
              aria-label={copy.searchPlaceholder}
              className="min-h-11 w-full rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-200/70"
            />
          </form>

          <div className="flex flex-wrap items-center gap-3">
            <label className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50">
              <input
                type="checkbox"
                checked={hidePastFairs}
                onChange={(event) => setHidePastFairs(event.target.checked)}
                className="h-4 w-4 accent-slate-950"
              />
              {copy.hidePastFairs}
            </label>

            <div className="inline-flex min-h-11 rounded-full border border-slate-200 bg-white p-1 text-sm font-semibold shadow-sm">
              <button
                type="button"
                onClick={() => setSortOrder("soonest")}
                className={[
                  "rounded-full px-3 py-1.5 transition",
                  sortOrder === "soonest"
                    ? "bg-slate-950 text-white"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-950",
                ].join(" ")}
              >
                {copy.soonestFirst}
              </button>
              <button
                type="button"
                onClick={() => setSortOrder("latest")}
                className={[
                  "rounded-full px-3 py-1.5 transition",
                  sortOrder === "latest"
                    ? "bg-slate-950 text-white"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-950",
                ].join(" ")}
              >
                {copy.latestFirst}
              </button>
            </div>

            {hasChangedFilters && selectedLocationKey ? (
              <Link
                href={pathname}
                scroll={false}
                onClick={resetFilters}
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-100"
              >
                {copy.resetFilters}
              </Link>
            ) : hasChangedFilters ? (
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-100"
              >
                {copy.resetFilters}
              </button>
            ) : null}
          </div>
        </div>

        {selectedLocationKey || activeSearchQuery ? (
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              {copy.selectedFilters}
            </p>
            <div className="flex flex-wrap gap-2">
              {selectedLocationKey ? (
                <button
                  type="button"
                  onClick={clearLocationFilterState}
                  className="inline-flex max-w-full items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
                >
                  <span className="truncate">
                    {copy.locationFilter}: {selectedLocationLabel ?? selectedLocationKey}
                  </span>
                  <span aria-hidden="true">x</span>
                </button>
              ) : null}

              {activeSearchQuery ? (
                <button
                  type="button"
                  onClick={clearSearchFilter}
                  className="inline-flex max-w-full items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
                >
                  <span className="truncate">
                    {copy.searchFilter}: {activeSearchQuery}
                  </span>
                  <span aria-hidden="true">x</span>
                </button>
              ) : null}
            </div>
          </div>
        ) : null}

        {categoryTreeData.roots.length > 0 ? (
          <details className="group rounded-2xl border border-slate-200 bg-white shadow-sm">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-semibold text-slate-800 marker:hidden">
              <span>
                {copy.categoryFilter}
                {selectedCategoryIds.length > 0
                  ? ` (${selectedCategoryIds.length})`
                  : ""}
              </span>
              <span
                aria-hidden="true"
                className="text-slate-500 transition group-open:rotate-90"
              >
                &gt;
              </span>
            </summary>

            <div className="space-y-3 border-t border-slate-100 p-3">
              {selectedCategoryIds.length > 0 ? (
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                    {copy.selectedCategories}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedCategoryIds.map((categoryId) => (
                      <button
                        key={categoryId}
                        type="button"
                        onClick={() => toggleCategory(categoryId)}
                        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-100"
                      >
                        <span>
                          {categoryLabelById(
                            categoryId,
                            categoryTreeData,
                            locale,
                          )}
                        </span>
                        <span aria-hidden="true">x</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}

              <CategoryTreeList
                nodes={categoryTreeData.roots}
                locale={locale}
                selectedCategoryIds={selectedCategoryIds}
                openCategoryIds={openCategoryIds}
                onToggleCategory={toggleCategory}
                onToggleOpen={toggleCategoryOpen}
              />
            </div>
          </details>
        ) : null}
      </div>

      <FairDataDisclaimerNotice copy={reportCopy.disclaimer} />

      <p className="rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm leading-6 text-slate-600">
        {weatherCopy.availabilityNote}
      </p>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-medium text-slate-600">
          {visibleFairs.length}{" "}
          {visibleFairs.length === 1 ? copy.fairSingular : copy.fairPlural}
        </p>

        {groupedFairs.length > 0 ? (
          <MissingFairSuggestionReport
            copy={reportCopy}
            locale={locale}
            initialFairName={searchQuery}
          />
        ) : null}
      </div>

      {groupedFairs.length === 0 ? (
        <div className="space-y-5 rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-2xl font-semibold text-slate-950">
            {fairs.length === 0
              ? copy.emptyTitle
              : hasSearchOrCategoryFilter
              ? copy.noFilterResultsTitle
              : copy.noUpcomingTitle}
          </h2>
          {fairs.length === 0 ? (
            <p className="mt-2 leading-7 text-slate-700">
              {copy.emptyText}
            </p>
          ) : !hasSearchOrCategoryFilter ? (
            <p className="mt-2 leading-7 text-slate-700">
              {copy.noUpcomingText}
            </p>
          ) : null}

          <MissingFairSuggestionReport
            copy={reportCopy}
            locale={locale}
            initialFairName={searchQuery}
            variant="empty"
          />
        </div>
      ) : (
        <div className="space-y-8">
          {groupedFairs.map((group) => (
            <section key={group.key} className="space-y-3">
              <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
                {group.heading}
              </h2>

              <div className="grid gap-4">
                {group.fairs.map((fair) => {
                  const weather =
                    weatherSnapshots[fairLocationKey(fair) ?? ""] ?? null;
                  const categoryIds = knownPublicCategoryIds(
                    fair.categoryIds,
                    categoryTreeData.categoriesByKey,
                  );

                  return (
                    <article
                      key={fair.id}
                      className="rounded-2xl border border-slate-200 bg-white/85 p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
                    >
                      <FairLifecycleNotice
                        fair={fair}
                        copy={copy}
                        variant="card"
                        className="mb-5"
                      />

                      <div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:items-start md:justify-between">
                        <div className="min-w-0 flex-1 space-y-2">
                          <h3 className="text-2xl font-semibold tracking-tight text-slate-950">
                            <Link
                              href={fairDetailPath(fair.id)}
                              className="hover:text-blue-700"
                            >
                              {formatFairTitleForDisplay(fair.name, locale)}
                            </Link>
                          </h3>

                          <FairBadgeStrip
                            badges={fair.badges}
                            labels={copy.badges}
                            maxCount={3}
                            hideProminentLifecycleBadges
                          />

                          <p className="text-sm font-medium text-slate-600">
                            {fair.city}
                            {fair.city && fair.countryISO ? ", " : ""}
                            {fair.countryISO}
                          </p>

                          <WeatherSummary
                            weather={weather}
                            locale={locale}
                            conditionLabels={weatherCopy.conditionLabels}
                          />

                          <p className="text-sm text-slate-700">
                            {formatFairDateRange(
                              fair.startDate,
                              fair.endDate,
                              locale,
                              copy.dateToBeConfirmed,
                            )}
                          </p>

                          {fair.organizerName ? (
                            <p className="text-sm text-slate-600">
                              {copy.organizer}: {fair.organizerName}
                            </p>
                          ) : null}
                        </div>

                        <div className="flex shrink-0 flex-wrap gap-2 md:justify-end">
                          <Link
                            href={fairDetailPath(fair.id)}
                            className="inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                          >
                            {copy.details}
                          </Link>
                        </div>
                      </div>

                      {categoryIds.length > 0 ? (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {categoryIds.map((categoryId) => (
                            <span
                              key={categoryId}
                              className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700"
                            >
                              {categoryLabelById(
                                categoryId,
                                categoryTreeData,
                                locale,
                              )}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </article>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
