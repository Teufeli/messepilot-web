import type { WebsiteFairBadgeKind, WebsiteFairChangeEventType } from "@/lib/fairs";
import {
  defaultWebsiteLocaleCode,
  isSupportedWebsiteLocale,
  type WebsiteLocaleCode,
} from "@/lib/website/i18n";

type BadgeLabels = Record<WebsiteFairBadgeKind, string>;
type ChangeEventSummaries = Record<WebsiteFairChangeEventType, string>;

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
  soonestFirst: string;
  latestFirst: string;
  hidePastFairs: string;
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
  changeEventSummaries: ChangeEventSummaries;
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
    soonestFirst: "Soonest first",
    latestFirst: "Latest first",
    hidePastFairs: "Hide past fairs",
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
    changeEventSummaries: {
      newFair: "Fair was published.",
      updatedFair: "Fair details were updated.",
      cancelled: "Fair was marked as cancelled.",
      postponed: "Fair was marked as postponed.",
      dateChanged: "Fair dates were updated.",
      locationChanged: "Fair location was updated.",
      importantInfoChanged: "Important fair information was updated.",
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
    soonestFirst: "Nächste zuerst",
    latestFirst: "Spätere zuerst",
    hidePastFairs: "Vergangene Messen ausblenden",
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
    changeEventSummaries: {
      newFair: "Messe wurde veröffentlicht.",
      updatedFair: "Messedetails wurden aktualisiert.",
      cancelled: "Messe wurde als abgesagt markiert.",
      postponed: "Messe wurde als verschoben markiert.",
      dateChanged: "Messetermine wurden aktualisiert.",
      locationChanged: "Messeort wurde aktualisiert.",
      importantInfoChanged: "Wichtige Messeinformationen wurden aktualisiert.",
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
    soonestFirst: "近い日程順",
    latestFirst: "遅い日程順",
    hidePastFairs: "過去の展示会を非表示",
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
    changeEventSummaries: {
      newFair: "展示会が公開されました。",
      updatedFair: "展示会情報が更新されました。",
      cancelled: "展示会は中止としてマークされました。",
      postponed: "展示会は延期としてマークされました。",
      dateChanged: "展示会の日程が更新されました。",
      locationChanged: "展示会の場所が更新されました。",
      importantInfoChanged: "重要な展示会情報が更新されました。",
    },
  },
};

export function getFairCopy(locale: string): FairPageCopy {
  return fairCopyByLocale[
    isSupportedWebsiteLocale(locale) ? locale : defaultWebsiteLocaleCode
  ];
}
