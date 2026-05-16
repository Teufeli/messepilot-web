import type {
  WebsiteFairBadgeKind,
  WebsiteFairChangeEventType,
  WebsiteFairLifecycleStatus,
} from "@/lib/fairs";
import {
  defaultWebsiteLocaleCode,
  isSupportedWebsiteLocale,
  type WebsiteLocaleCode,
} from "@/lib/website/i18n";

type BadgeLabels = Record<WebsiteFairBadgeKind, string>;
export type ProminentLifecycleStatus = Extract<
  WebsiteFairLifecycleStatus,
  "cancelled" | "postponed"
>;
type LifecycleStatusCopy = Record<
  ProminentLifecycleStatus,
  {
    stamp: string;
    message: string;
  }
>;
type ChangeEventCopyKey =
  | WebsiteFairChangeEventType
  | "officialWebsiteChanged"
  | "lifecycleStatusChanged"
  | "descriptionChanged";
type ChangeEventText = Record<ChangeEventCopyKey, string>;

export type FairPageCopy = {
  title: string;
  description: string;
  eyebrow: string;
  headline: string;
  intro: string;
  emptyTitle: string;
  emptyText: string;
  organizer: string;
  details: string;
  officialWebsite: string;
  searchPlaceholder: string;
  categoryFilter: string;
  selectedCategories: string;
  resetFilters: string;
  soonestFirst: string;
  latestFirst: string;
  hidePastFairs: string;
  noFilterResultsTitle: string;
  noUpcomingTitle: string;
  noUpcomingText: string;
  fairSingular: string;
  fairPlural: string;
  dateToBeConfirmed: string;
  backToFairs: string;
  publishedFair: string;
  openMap: string;
  openLocationInMaps: string;
  detailsHeading: string;
  descriptionHeading: string;
  updates: string;
  links: string;
  name: string;
  city: string;
  country: string;
  date: string;
  lastUpdated: string;
  categories: string;
  notAvailable: string;
  fairNotFoundTitle: string;
  detailNote: string;
  badges: BadgeLabels;
  lifecycle: LifecycleStatusCopy;
  changeEventTitles: ChangeEventText;
  changeEventSummaries: ChangeEventText;
};

export const fairCopyByLocale: Record<WebsiteLocaleCode, FairPageCopy> = {
  en: {
    title: "Fairs | MessePilot",
    description: "Published trade fairs listed in MessePilot.",
    eyebrow: "Fairs",
    headline: "Published trade fairs",
    intro:
      "Explore trade fairs currently published in MessePilot. Details can change, so always check the official fair website before making travel or business decisions.",
    emptyTitle: "No published fairs yet",
    emptyText: "Published fair data will appear here once it is available.",
    organizer: "Organizer",
    details: "View details",
    officialWebsite: "Official website",
    searchPlaceholder: "Search fairs",
    categoryFilter: "Categories",
    selectedCategories: "Selected categories",
    resetFilters: "Reset filters",
    soonestFirst: "Soonest first",
    latestFirst: "Latest first",
    hidePastFairs: "Hide past fairs",
    noFilterResultsTitle: "No fairs found",
    noUpcomingTitle: "No upcoming published fairs visible",
    noUpcomingText: "Turn off Hide past fairs to show past published fairs too.",
    fairSingular: "fair",
    fairPlural: "fairs",
    dateToBeConfirmed: "DATE TO BE CONFIRMED",
    backToFairs: "Back to fairs",
    publishedFair: "Published fair",
    openMap: "Open map",
    openLocationInMaps: "Open location in Maps",
    detailsHeading: "Details",
    descriptionHeading: "About this fair",
    updates: "Updates",
    links: "Links",
    name: "Name",
    city: "City",
    country: "Country",
    date: "Date",
    lastUpdated: "Last updated",
    categories: "Categories",
    notAvailable: "Not available",
    fairNotFoundTitle: "Fair not found | MessePilot",
    detailNote:
      "Messe details can change. Always verify travel, venue and business information on the official fair website before making decisions.",
    badges: {
      new: "New",
      updated: "Updated",
      cancelled: "Cancelled",
      postponed: "Postponed",
      dateChanged: "Date changed",
      locationChanged: "Location changed",
      important: "Important update",
    },
    lifecycle: {
      cancelled: {
        stamp: "CANCELLED",
        message: "This fair has been cancelled.",
      },
      postponed: {
        stamp: "POSTPONED",
        message: "This fair has been postponed.",
      },
    },
    changeEventTitles: {
      newFair: "Fair was published",
      updatedFair: "Fair details updated",
      cancelled: "Fair cancelled",
      postponed: "Fair postponed",
      dateChanged: "Date changed",
      locationChanged: "Location changed",
      importantInfoChanged: "Important update",
      officialWebsiteChanged: "Official website changed",
      lifecycleStatusChanged: "Lifecycle status changed",
      descriptionChanged: "Description updated",
    },
    changeEventSummaries: {
      newFair: "Fair was published.",
      updatedFair: "Fair details were updated.",
      cancelled: "Fair was marked as cancelled.",
      postponed: "Fair was marked as postponed.",
      dateChanged: "Fair dates were updated.",
      locationChanged: "Fair location was updated.",
      importantInfoChanged: "Important fair information was updated.",
      officialWebsiteChanged: "The official fair website was updated.",
      lifecycleStatusChanged: "The public lifecycle status was updated.",
      descriptionChanged: "The fair description was updated.",
    },
  },
  de: {
    title: "Messen | MessePilot",
    description: "Veröffentlichte Messen in MessePilot.",
    eyebrow: "Messen",
    headline: "Veröffentlichte Messen",
    intro:
      "Entdecke Messen, die aktuell in MessePilot veröffentlicht sind. Details können sich ändern. Prüfe Reise-, Veranstaltungs- und Geschäftsinformationen immer zusätzlich auf der offiziellen Website.",
    emptyTitle: "Noch keine veröffentlichten Messen",
    emptyText:
      "Veröffentlichte Messedaten erscheinen hier, sobald sie verfügbar sind.",
    organizer: "Veranstalter",
    details: "Details ansehen",
    officialWebsite: "Offizielle Website",
    searchPlaceholder: "Messen suchen",
    categoryFilter: "Kategorien",
    selectedCategories: "Ausgewählte Kategorien",
    resetFilters: "Filter zurücksetzen",
    soonestFirst: "Nächste zuerst",
    latestFirst: "Spätere zuerst",
    hidePastFairs: "Vergangene Messen ausblenden",
    noFilterResultsTitle: "Keine Messen gefunden",
    noUpcomingTitle: "Keine kommenden veröffentlichten Messen sichtbar",
    noUpcomingText:
      "Deaktiviere Vergangene Messen ausblenden, um vergangene veröffentlichte Messen anzuzeigen.",
    fairSingular: "Messe",
    fairPlural: "Messen",
    dateToBeConfirmed: "DATUM NOCH OFFEN",
    backToFairs: "Zurück zu Messen",
    publishedFair: "Veröffentlichte Messe",
    openMap: "Karte öffnen",
    openLocationInMaps: "Standort in Karten öffnen",
    detailsHeading: "Details",
    descriptionHeading: "Über diese Messe",
    updates: "Aktualisierungen",
    links: "Links",
    name: "Name",
    city: "Ort",
    country: "Land",
    date: "Datum",
    lastUpdated: "Zuletzt aktualisiert",
    categories: "Kategorien",
    notAvailable: "Nicht verfügbar",
    fairNotFoundTitle: "Messe nicht gefunden | MessePilot",
    detailNote:
      "Messedetails können sich ändern. Prüfe Reise-, Veranstaltungs- und Geschäftsinformationen vor Entscheidungen immer zusätzlich auf der offiziellen Messe-Website.",
    badges: {
      new: "Neu",
      updated: "Aktualisiert",
      cancelled: "Abgesagt",
      postponed: "Verschoben",
      dateChanged: "Datum geändert",
      locationChanged: "Ort geändert",
      important: "Wichtige Änderung",
    },
    lifecycle: {
      cancelled: {
        stamp: "ABGESAGT",
        message: "Diese Messe wurde abgesagt.",
      },
      postponed: {
        stamp: "VERSCHOBEN",
        message: "Diese Messe wurde verschoben.",
      },
    },
    changeEventTitles: {
      newFair: "Messe wurde veröffentlicht",
      updatedFair: "Messedetails aktualisiert",
      cancelled: "Messe abgesagt",
      postponed: "Messe verschoben",
      dateChanged: "Datum geändert",
      locationChanged: "Ort geändert",
      importantInfoChanged: "Wichtige Änderung",
      officialWebsiteChanged: "Offizielle Website geändert",
      lifecycleStatusChanged: "Lifecycle-Status geändert",
      descriptionChanged: "Beschreibung aktualisiert",
    },
    changeEventSummaries: {
      newFair: "Messe wurde veröffentlicht.",
      updatedFair: "Messedetails wurden aktualisiert.",
      cancelled: "Messe wurde als abgesagt markiert.",
      postponed: "Messe wurde als verschoben markiert.",
      dateChanged: "Messetermine wurden aktualisiert.",
      locationChanged: "Messeort wurde aktualisiert.",
      importantInfoChanged: "Wichtige Messeinformationen wurden aktualisiert.",
      officialWebsiteChanged: "Die offizielle Messe-Website wurde aktualisiert.",
      lifecycleStatusChanged: "Der öffentliche Lifecycle-Status wurde aktualisiert.",
      descriptionChanged: "Die Messebeschreibung wurde aktualisiert.",
    },
  },
  ja: {
    title: "展示会 | MessePilot",
    description: "MessePilot に掲載されている公開済み展示会。",
    eyebrow: "展示会",
    headline: "公開済みの展示会",
    intro:
      "MessePilot に掲載されている公開済みの展示会を確認できます。日程や会場などの情報は変更される場合があります。必ず公式サイトでも確認してください。",
    emptyTitle: "公開済みの展示会はまだありません",
    emptyText:
      "公開済みの展示会データは、利用可能になり次第ここに表示されます。",
    organizer: "主催者",
    details: "詳細を見る",
    officialWebsite: "公式サイト",
    searchPlaceholder: "展示会を検索",
    categoryFilter: "カテゴリ",
    selectedCategories: "選択中のカテゴリ",
    resetFilters: "フィルターをリセット",
    soonestFirst: "近い日程順",
    latestFirst: "遅い日程順",
    hidePastFairs: "過去の展示会を非表示",
    noFilterResultsTitle: "展示会が見つかりません",
    noUpcomingTitle: "表示できる今後の公開済み展示会はありません",
    noUpcomingText:
      "過去の展示会も表示するには、過去の展示会を非表示をオフにしてください。",
    fairSingular: "件",
    fairPlural: "件",
    dateToBeConfirmed: "日程未定",
    backToFairs: "展示会一覧へ戻る",
    publishedFair: "公開済み展示会",
    openMap: "地図を開く",
    openLocationInMaps: "地図で場所を開く",
    detailsHeading: "詳細",
    descriptionHeading: "この展示会について",
    updates: "更新情報",
    links: "リンク",
    name: "名称",
    city: "都市",
    country: "国",
    date: "日程",
    lastUpdated: "最終更新",
    categories: "カテゴリ",
    notAvailable: "未設定",
    fairNotFoundTitle: "展示会が見つかりません | MessePilot",
    detailNote:
      "展示会情報は変更される場合があります。移動、会場、ビジネス上の判断を行う前に、必ず公式サイトでも確認してください。",
    badges: {
      new: "新着",
      updated: "更新",
      cancelled: "中止",
      postponed: "延期",
      dateChanged: "日程変更",
      locationChanged: "場所変更",
      important: "重要な更新",
    },
    lifecycle: {
      cancelled: {
        stamp: "中止",
        message: "この展示会は中止されました。",
      },
      postponed: {
        stamp: "延期",
        message: "この展示会は延期されました。",
      },
    },
    changeEventTitles: {
      newFair: "展示会が公開されました",
      updatedFair: "展示会情報が更新されました",
      cancelled: "展示会が中止されました",
      postponed: "展示会が延期されました",
      dateChanged: "日程変更",
      locationChanged: "場所変更",
      importantInfoChanged: "重要な更新",
      officialWebsiteChanged: "公式サイト変更",
      lifecycleStatusChanged: "ステータス変更",
      descriptionChanged: "説明が更新されました",
    },
    changeEventSummaries: {
      newFair: "展示会が公開されました。",
      updatedFair: "展示会情報が更新されました。",
      cancelled: "展示会は中止としてマークされました。",
      postponed: "展示会は延期としてマークされました。",
      dateChanged: "展示会の日程が更新されました。",
      locationChanged: "展示会の場所が更新されました。",
      importantInfoChanged: "重要な展示会情報が更新されました。",
      officialWebsiteChanged: "公式展示会サイトが更新されました。",
      lifecycleStatusChanged: "公開ライフサイクルステータスが更新されました。",
      descriptionChanged: "展示会の説明が更新されました。",
    },
  },
};

export function getFairCopy(locale: string): FairPageCopy {
  return fairCopyByLocale[
    isSupportedWebsiteLocale(locale) ? locale : defaultWebsiteLocaleCode
  ];
}
