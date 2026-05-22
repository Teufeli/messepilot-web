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
export type FairDataReportTypeKey =
  | "date"
  | "location"
  | "organizer"
  | "officialWebsite"
  | "categories"
  | "description"
  | "status"
  | "duplicate"
  | "other";

export type FairDataReportCopy = {
  disclaimer: {
    title: string;
    text: string;
  };
  existing: {
    action: string;
    title: string;
    intro: string;
  };
  missing: {
    action: string;
    title: string;
    intro: string;
    helper: string;
  };
  reportType: Record<FairDataReportTypeKey, string>;
  form: {
    reportType: string;
    message: string;
    messagePlaceholder: string;
    correctedValue: string;
    contactEmail: string;
    fairName: string;
    city: string;
    country: string;
    startDate: string;
    endDate: string;
    dateText: string;
    venue: string;
    officialWebsite: string;
    organizer: string;
    sourceUrl: string;
    note: string;
    submit: string;
    cancel: string;
    close: string;
    optional: string;
    requiredHint: string;
    invalidEmail: string;
    invalidUrl: string;
  };
  result: {
    successTitle: string;
    successText: string;
    errorTitle: string;
    errorText: string;
  };
};

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
  selectedFilters: string;
  searchFilter: string;
  locationFilter: string;
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
    selectedFilters: "Active filters",
    searchFilter: "Search",
    locationFilter: "Location",
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
    selectedFilters: "Aktive Filter",
    searchFilter: "Suche",
    locationFilter: "Standort",
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
    selectedFilters: "有効なフィルター",
    searchFilter: "検索",
    locationFilter: "場所",
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
  es: {
    title: "Ferias | MessePilot",
    description: "Ferias publicadas en MessePilot.",
    eyebrow: "Ferias",
    headline: "Ferias publicadas",
    intro:
      "Explora las ferias publicadas actualmente en MessePilot. Los detalles pueden cambiar, así que revisa siempre el sitio web oficial de la feria antes de tomar decisiones de viaje o negocio.",
    emptyTitle: "Aún no hay ferias publicadas",
    emptyText:
      "Los datos de ferias publicadas aparecerán aquí cuando estén disponibles.",
    organizer: "Organizador",
    details: "Ver detalles",
    officialWebsite: "Sitio web oficial",
    searchPlaceholder: "Buscar ferias",
    categoryFilter: "Categorías",
    selectedCategories: "Categorías seleccionadas",
    selectedFilters: "Filtros activos",
    searchFilter: "Búsqueda",
    locationFilter: "Ubicación",
    resetFilters: "Restablecer filtros",
    soonestFirst: "Más próximas primero",
    latestFirst: "Más lejanas primero",
    hidePastFairs: "Ocultar ferias pasadas",
    noFilterResultsTitle: "No se encontraron ferias",
    noUpcomingTitle: "No hay ferias publicadas próximas visibles",
    noUpcomingText:
      "Desactiva Ocultar ferias pasadas para mostrar también ferias publicadas anteriores.",
    fairSingular: "feria",
    fairPlural: "ferias",
    dateToBeConfirmed: "FECHA POR CONFIRMAR",
    backToFairs: "Volver a ferias",
    publishedFair: "Feria publicada",
    openMap: "Abrir mapa",
    openLocationInMaps: "Abrir ubicación en Mapas",
    detailsHeading: "Detalles",
    descriptionHeading: "Sobre esta feria",
    updates: "Actualizaciones",
    links: "Enlaces",
    name: "Nombre",
    city: "Lugar",
    country: "País",
    date: "Fecha",
    lastUpdated: "Última actualización",
    categories: "Categorías",
    notAvailable: "No disponible",
    fairNotFoundTitle: "Feria no encontrada | MessePilot",
    detailNote:
      "Los detalles de la feria pueden cambiar. Verifica siempre la información de viaje, recinto y negocio en el sitio web oficial antes de tomar decisiones.",
    badges: {
      new: "Nueva",
      updated: "Actualizada",
      cancelled: "Cancelada",
      postponed: "Aplazada",
      dateChanged: "Fecha cambiada",
      locationChanged: "Lugar cambiado",
      important: "Actualización importante",
    },
    lifecycle: {
      cancelled: {
        stamp: "CANCELADA",
        message: "Esta feria ha sido cancelada.",
      },
      postponed: {
        stamp: "APLAZADA",
        message: "Esta feria ha sido aplazada.",
      },
    },
    changeEventTitles: {
      newFair: "La feria fue publicada",
      updatedFair: "Detalles de la feria actualizados",
      cancelled: "Feria cancelada",
      postponed: "Feria aplazada",
      dateChanged: "Fecha cambiada",
      locationChanged: "Lugar cambiado",
      importantInfoChanged: "Actualización importante",
      officialWebsiteChanged: "Sitio web oficial cambiado",
      lifecycleStatusChanged: "Estado público cambiado",
      descriptionChanged: "Descripción actualizada",
    },
    changeEventSummaries: {
      newFair: "La feria fue publicada.",
      updatedFair: "Los detalles de la feria fueron actualizados.",
      cancelled: "La feria fue marcada como cancelada.",
      postponed: "La feria fue marcada como aplazada.",
      dateChanged: "Las fechas de la feria fueron actualizadas.",
      locationChanged: "El lugar de la feria fue actualizado.",
      importantInfoChanged: "Se actualizó información importante de la feria.",
      officialWebsiteChanged: "El sitio web oficial de la feria fue actualizado.",
      lifecycleStatusChanged: "El estado público de la feria fue actualizado.",
      descriptionChanged: "La descripción de la feria fue actualizada.",
    },
  },
  fr: {
    title: "Salons | MessePilot",
    description: "Salons publiés dans MessePilot.",
    eyebrow: "Salons",
    headline: "Salons publiés",
    intro:
      "Explorez les salons actuellement publiés dans MessePilot. Les détails peuvent changer, vérifiez donc toujours le site officiel du salon avant toute décision de voyage ou d'affaires.",
    emptyTitle: "Aucun salon publié pour le moment",
    emptyText:
      "Les données de salons publiés apparaîtront ici dès qu'elles seront disponibles.",
    organizer: "Organisateur",
    details: "Voir les détails",
    officialWebsite: "Site officiel",
    searchPlaceholder: "Rechercher des salons",
    categoryFilter: "Catégories",
    selectedCategories: "Catégories sélectionnées",
    selectedFilters: "Filtres actifs",
    searchFilter: "Recherche",
    locationFilter: "Lieu",
    resetFilters: "Réinitialiser les filtres",
    soonestFirst: "Les plus proches d'abord",
    latestFirst: "Les plus éloignés d'abord",
    hidePastFairs: "Masquer les salons passés",
    noFilterResultsTitle: "Aucun salon trouvé",
    noUpcomingTitle: "Aucun salon publié à venir visible",
    noUpcomingText:
      "Désactivez Masquer les salons passés pour afficher aussi les salons publiés passés.",
    fairSingular: "salon",
    fairPlural: "salons",
    dateToBeConfirmed: "DATE À CONFIRMER",
    backToFairs: "Retour aux salons",
    publishedFair: "Salon publié",
    openMap: "Ouvrir la carte",
    openLocationInMaps: "Ouvrir le lieu dans Plans",
    detailsHeading: "Détails",
    descriptionHeading: "À propos de ce salon",
    updates: "Mises à jour",
    links: "Liens",
    name: "Nom",
    city: "Lieu",
    country: "Pays",
    date: "Date",
    lastUpdated: "Dernière mise à jour",
    categories: "Catégories",
    notAvailable: "Non disponible",
    fairNotFoundTitle: "Salon introuvable | MessePilot",
    detailNote:
      "Les détails du salon peuvent changer. Vérifiez toujours les informations de voyage, de lieu et d'affaires sur le site officiel avant de prendre une décision.",
    badges: {
      new: "Nouveau",
      updated: "Mis à jour",
      cancelled: "Annulé",
      postponed: "Reporté",
      dateChanged: "Date modifiée",
      locationChanged: "Lieu modifié",
      important: "Mise à jour importante",
    },
    lifecycle: {
      cancelled: {
        stamp: "ANNULÉ",
        message: "Ce salon a été annulé.",
      },
      postponed: {
        stamp: "REPORTÉ",
        message: "Ce salon a été reporté.",
      },
    },
    changeEventTitles: {
      newFair: "Le salon a été publié",
      updatedFair: "Détails du salon mis à jour",
      cancelled: "Salon annulé",
      postponed: "Salon reporté",
      dateChanged: "Date modifiée",
      locationChanged: "Lieu modifié",
      importantInfoChanged: "Mise à jour importante",
      officialWebsiteChanged: "Site officiel modifié",
      lifecycleStatusChanged: "Statut public modifié",
      descriptionChanged: "Description mise à jour",
    },
    changeEventSummaries: {
      newFair: "Le salon a été publié.",
      updatedFair: "Les détails du salon ont été mis à jour.",
      cancelled: "Le salon a été marqué comme annulé.",
      postponed: "Le salon a été marqué comme reporté.",
      dateChanged: "Les dates du salon ont été mises à jour.",
      locationChanged: "Le lieu du salon a été mis à jour.",
      importantInfoChanged: "Des informations importantes du salon ont été mises à jour.",
      officialWebsiteChanged: "Le site officiel du salon a été mis à jour.",
      lifecycleStatusChanged: "Le statut public du salon a été mis à jour.",
      descriptionChanged: "La description du salon a été mise à jour.",
    },
  },
  it: {
    title: "Fiere | MessePilot",
    description: "Fiere pubblicate in MessePilot.",
    eyebrow: "Fiere",
    headline: "Fiere pubblicate",
    intro:
      "Esplora le fiere attualmente pubblicate in MessePilot. I dettagli possono cambiare, quindi verifica sempre il sito ufficiale della fiera prima di prendere decisioni di viaggio o business.",
    emptyTitle: "Nessuna fiera pubblicata",
    emptyText:
      "I dati delle fiere pubblicate appariranno qui quando saranno disponibili.",
    organizer: "Organizzatore",
    details: "Vedi dettagli",
    officialWebsite: "Sito ufficiale",
    searchPlaceholder: "Cerca fiere",
    categoryFilter: "Categorie",
    selectedCategories: "Categorie selezionate",
    selectedFilters: "Filtri attivi",
    searchFilter: "Ricerca",
    locationFilter: "Luogo",
    resetFilters: "Reimposta filtri",
    soonestFirst: "Prima le più vicine",
    latestFirst: "Prima le più lontane",
    hidePastFairs: "Nascondi fiere passate",
    noFilterResultsTitle: "Nessuna fiera trovata",
    noUpcomingTitle: "Nessuna fiera pubblicata prossima visibile",
    noUpcomingText:
      "Disattiva Nascondi fiere passate per mostrare anche le fiere pubblicate passate.",
    fairSingular: "fiera",
    fairPlural: "fiere",
    dateToBeConfirmed: "DATA DA CONFERMARE",
    backToFairs: "Torna alle fiere",
    publishedFair: "Fiera pubblicata",
    openMap: "Apri mappa",
    openLocationInMaps: "Apri posizione in Mappe",
    detailsHeading: "Dettagli",
    descriptionHeading: "Informazioni su questa fiera",
    updates: "Aggiornamenti",
    links: "Link",
    name: "Nome",
    city: "Luogo",
    country: "Paese",
    date: "Data",
    lastUpdated: "Ultimo aggiornamento",
    categories: "Categorie",
    notAvailable: "Non disponibile",
    fairNotFoundTitle: "Fiera non trovata | MessePilot",
    detailNote:
      "I dettagli della fiera possono cambiare. Verifica sempre le informazioni di viaggio, sede e business sul sito ufficiale prima di prendere decisioni.",
    badges: {
      new: "Nuova",
      updated: "Aggiornata",
      cancelled: "Annullata",
      postponed: "Rinviata",
      dateChanged: "Data cambiata",
      locationChanged: "Luogo cambiato",
      important: "Aggiornamento importante",
    },
    lifecycle: {
      cancelled: {
        stamp: "ANNULLATA",
        message: "Questa fiera è stata annullata.",
      },
      postponed: {
        stamp: "RINVIATA",
        message: "Questa fiera è stata rinviata.",
      },
    },
    changeEventTitles: {
      newFair: "La fiera è stata pubblicata",
      updatedFair: "Dettagli della fiera aggiornati",
      cancelled: "Fiera annullata",
      postponed: "Fiera rinviata",
      dateChanged: "Data cambiata",
      locationChanged: "Luogo cambiato",
      importantInfoChanged: "Aggiornamento importante",
      officialWebsiteChanged: "Sito ufficiale modificato",
      lifecycleStatusChanged: "Stato pubblico modificato",
      descriptionChanged: "Descrizione aggiornata",
    },
    changeEventSummaries: {
      newFair: "La fiera è stata pubblicata.",
      updatedFair: "I dettagli della fiera sono stati aggiornati.",
      cancelled: "La fiera è stata contrassegnata come annullata.",
      postponed: "La fiera è stata contrassegnata come rinviata.",
      dateChanged: "Le date della fiera sono state aggiornate.",
      locationChanged: "Il luogo della fiera è stato aggiornato.",
      importantInfoChanged: "Informazioni importanti della fiera sono state aggiornate.",
      officialWebsiteChanged: "Il sito ufficiale della fiera è stato aggiornato.",
      lifecycleStatusChanged: "Lo stato pubblico della fiera è stato aggiornato.",
      descriptionChanged: "La descrizione della fiera è stata aggiornata.",
    },
  },
  bs: {
    title: "Sajmovi | MessePilot",
    description: "Objavljeni sajmovi u MessePilotu.",
    eyebrow: "Sajmovi",
    headline: "Objavljeni sajmovi",
    intro:
      "Pregledajte sajmove koji su trenutno objavljeni u MessePilotu. Detalji se mogu promijeniti, zato uvijek provjerite službenu web stranicu sajma prije putnih ili poslovnih odluka.",
    emptyTitle: "Još nema objavljenih sajmova",
    emptyText:
      "Objavljeni podaci o sajmovima pojavit će se ovdje čim budu dostupni.",
    organizer: "Organizator",
    details: "Prikaži detalje",
    officialWebsite: "Službena web stranica",
    searchPlaceholder: "Pretraži sajmove",
    categoryFilter: "Kategorije",
    selectedCategories: "Odabrane kategorije",
    selectedFilters: "Aktivni filteri",
    searchFilter: "Pretraga",
    locationFilter: "Lokacija",
    resetFilters: "Poništi filtere",
    soonestFirst: "Najbliži prvo",
    latestFirst: "Kasniji prvo",
    hidePastFairs: "Sakrij prošle sajmove",
    noFilterResultsTitle: "Nema pronađenih sajmova",
    noUpcomingTitle: "Nema vidljivih nadolazećih objavljenih sajmova",
    noUpcomingText:
      "Isključite Sakrij prošle sajmove da prikažete i prošle objavljene sajmove.",
    fairSingular: "sajam",
    fairPlural: "sajmovi",
    dateToBeConfirmed: "DATUM JOŠ NIJE POTVRĐEN",
    backToFairs: "Nazad na sajmove",
    publishedFair: "Objavljeni sajam",
    openMap: "Otvori mapu",
    openLocationInMaps: "Otvori lokaciju u Mapama",
    detailsHeading: "Detalji",
    descriptionHeading: "O ovom sajmu",
    updates: "Ažuriranja",
    links: "Linkovi",
    name: "Naziv",
    city: "Mjesto",
    country: "Država",
    date: "Datum",
    lastUpdated: "Zadnje ažurirano",
    categories: "Kategorije",
    notAvailable: "Nije dostupno",
    fairNotFoundTitle: "Sajam nije pronađen | MessePilot",
    detailNote:
      "Detalji sajma se mogu promijeniti. Prije odluka uvijek provjerite putne, lokacijske i poslovne informacije na službenoj web stranici sajma.",
    badges: {
      new: "Novo",
      updated: "Ažurirano",
      cancelled: "Otkazano",
      postponed: "Odgođeno",
      dateChanged: "Datum promijenjen",
      locationChanged: "Lokacija promijenjena",
      important: "Važno ažuriranje",
    },
    lifecycle: {
      cancelled: {
        stamp: "OTKAZANO",
        message: "Ovaj sajam je otkazan.",
      },
      postponed: {
        stamp: "ODGOĐENO",
        message: "Ovaj sajam je odgođen.",
      },
    },
    changeEventTitles: {
      newFair: "Sajam je objavljen",
      updatedFair: "Detalji sajma su ažurirani",
      cancelled: "Sajam otkazan",
      postponed: "Sajam odgođen",
      dateChanged: "Datum promijenjen",
      locationChanged: "Lokacija promijenjena",
      importantInfoChanged: "Važno ažuriranje",
      officialWebsiteChanged: "Službena web stranica promijenjena",
      lifecycleStatusChanged: "Javni status promijenjen",
      descriptionChanged: "Opis ažuriran",
    },
    changeEventSummaries: {
      newFair: "Sajam je objavljen.",
      updatedFair: "Detalji sajma su ažurirani.",
      cancelled: "Sajam je označen kao otkazan.",
      postponed: "Sajam je označen kao odgođen.",
      dateChanged: "Datumi sajma su ažurirani.",
      locationChanged: "Lokacija sajma je ažurirana.",
      importantInfoChanged: "Važne informacije o sajmu su ažurirane.",
      officialWebsiteChanged: "Službena web stranica sajma je ažurirana.",
      lifecycleStatusChanged: "Javni status sajma je ažuriran.",
      descriptionChanged: "Opis sajma je ažuriran.",
    },
  },
  hr: {
    title: "Sajmovi | MessePilot",
    description: "Objavljeni sajmovi u MessePilotu.",
    eyebrow: "Sajmovi",
    headline: "Objavljeni sajmovi",
    intro:
      "Pregledajte sajmove koji su trenutačno objavljeni u MessePilotu. Detalji se mogu promijeniti, zato uvijek provjerite službenu web-stranicu sajma prije putnih ili poslovnih odluka.",
    emptyTitle: "Još nema objavljenih sajmova",
    emptyText:
      "Objavljeni podaci o sajmovima pojavit će se ovdje čim budu dostupni.",
    organizer: "Organizator",
    details: "Prikaži detalje",
    officialWebsite: "Službena web-stranica",
    searchPlaceholder: "Pretraži sajmove",
    categoryFilter: "Kategorije",
    selectedCategories: "Odabrane kategorije",
    selectedFilters: "Aktivni filtri",
    searchFilter: "Pretraga",
    locationFilter: "Lokacija",
    resetFilters: "Poništi filtre",
    soonestFirst: "Najbliži prvo",
    latestFirst: "Kasniji prvo",
    hidePastFairs: "Sakrij prošle sajmove",
    noFilterResultsTitle: "Nema pronađenih sajmova",
    noUpcomingTitle: "Nema vidljivih nadolazećih objavljenih sajmova",
    noUpcomingText:
      "Isključite Sakrij prošle sajmove kako biste prikazali i prošle objavljene sajmove.",
    fairSingular: "sajam",
    fairPlural: "sajmovi",
    dateToBeConfirmed: "DATUM JOŠ NIJE POTVRĐEN",
    backToFairs: "Natrag na sajmove",
    publishedFair: "Objavljeni sajam",
    openMap: "Otvori kartu",
    openLocationInMaps: "Otvori lokaciju u Kartama",
    detailsHeading: "Detalji",
    descriptionHeading: "O ovom sajmu",
    updates: "Ažuriranja",
    links: "Poveznice",
    name: "Naziv",
    city: "Mjesto",
    country: "Država",
    date: "Datum",
    lastUpdated: "Zadnje ažurirano",
    categories: "Kategorije",
    notAvailable: "Nije dostupno",
    fairNotFoundTitle: "Sajam nije pronađen | MessePilot",
    detailNote:
      "Detalji sajma mogu se promijeniti. Prije odluka uvijek provjerite putne, lokacijske i poslovne informacije na službenoj web-stranici sajma.",
    badges: {
      new: "Novo",
      updated: "Ažurirano",
      cancelled: "Otkazano",
      postponed: "Odgođeno",
      dateChanged: "Datum promijenjen",
      locationChanged: "Lokacija promijenjena",
      important: "Važno ažuriranje",
    },
    lifecycle: {
      cancelled: {
        stamp: "OTKAZANO",
        message: "Ovaj sajam je otkazan.",
      },
      postponed: {
        stamp: "ODGOĐENO",
        message: "Ovaj sajam je odgođen.",
      },
    },
    changeEventTitles: {
      newFair: "Sajam je objavljen",
      updatedFair: "Detalji sajma su ažurirani",
      cancelled: "Sajam otkazan",
      postponed: "Sajam odgođen",
      dateChanged: "Datum promijenjen",
      locationChanged: "Lokacija promijenjena",
      importantInfoChanged: "Važno ažuriranje",
      officialWebsiteChanged: "Službena web-stranica promijenjena",
      lifecycleStatusChanged: "Javni status promijenjen",
      descriptionChanged: "Opis ažuriran",
    },
    changeEventSummaries: {
      newFair: "Sajam je objavljen.",
      updatedFair: "Detalji sajma su ažurirani.",
      cancelled: "Sajam je označen kao otkazan.",
      postponed: "Sajam je označen kao odgođen.",
      dateChanged: "Datumi sajma su ažurirani.",
      locationChanged: "Lokacija sajma je ažurirana.",
      importantInfoChanged: "Važne informacije o sajmu su ažurirane.",
      officialWebsiteChanged: "Službena web-stranica sajma je ažurirana.",
      lifecycleStatusChanged: "Javni status sajma je ažuriran.",
      descriptionChanged: "Opis sajma je ažuriran.",
    },
  },
  hi: {
    title: "मेले | MessePilot",
    description: "MessePilot में प्रकाशित व्यापार मेले।",
    eyebrow: "मेले",
    headline: "प्रकाशित व्यापार मेले",
    intro:
      "MessePilot में वर्तमान में प्रकाशित व्यापार मेलों को देखें। विवरण बदल सकते हैं, इसलिए यात्रा या व्यापारिक निर्णय लेने से पहले हमेशा मेले की आधिकारिक वेबसाइट जांचें।",
    emptyTitle: "अभी कोई प्रकाशित मेला नहीं",
    emptyText:
      "प्रकाशित मेला डेटा उपलब्ध होते ही यहां दिखाई देगा।",
    organizer: "आयोजक",
    details: "विवरण देखें",
    officialWebsite: "आधिकारिक वेबसाइट",
    searchPlaceholder: "मेले खोजें",
    categoryFilter: "श्रेणियां",
    selectedCategories: "चयनित श्रेणियां",
    selectedFilters: "सक्रिय फ़िल्टर",
    searchFilter: "खोज",
    locationFilter: "स्थान",
    resetFilters: "फिल्टर रीसेट करें",
    soonestFirst: "सबसे पहले आने वाले",
    latestFirst: "बाद की तिथियां पहले",
    hidePastFairs: "बीते मेले छिपाएं",
    noFilterResultsTitle: "कोई मेला नहीं मिला",
    noUpcomingTitle: "कोई आने वाला प्रकाशित मेला दिखाई नहीं दे रहा",
    noUpcomingText:
      "बीते प्रकाशित मेले दिखाने के लिए बीते मेले छिपाएं को बंद करें।",
    fairSingular: "मेला",
    fairPlural: "मेले",
    dateToBeConfirmed: "तारीख की पुष्टि बाकी",
    backToFairs: "मेलों पर वापस जाएं",
    publishedFair: "प्रकाशित मेला",
    openMap: "मानचित्र खोलें",
    openLocationInMaps: "Maps में स्थान खोलें",
    detailsHeading: "विवरण",
    descriptionHeading: "इस मेले के बारे में",
    updates: "अपडेट",
    links: "लिंक",
    name: "नाम",
    city: "स्थान",
    country: "देश",
    date: "तारीख",
    lastUpdated: "अंतिम अपडेट",
    categories: "श्रेणियां",
    notAvailable: "उपलब्ध नहीं",
    fairNotFoundTitle: "मेला नहीं मिला | MessePilot",
    detailNote:
      "मेले के विवरण बदल सकते हैं। निर्णय लेने से पहले यात्रा, स्थल और व्यावसायिक जानकारी हमेशा आधिकारिक मेला वेबसाइट पर जांचें।",
    badges: {
      new: "नया",
      updated: "अपडेट किया गया",
      cancelled: "रद्द",
      postponed: "स्थगित",
      dateChanged: "तारीख बदली",
      locationChanged: "स्थान बदला",
      important: "महत्वपूर्ण अपडेट",
    },
    lifecycle: {
      cancelled: {
        stamp: "रद्द",
        message: "यह मेला रद्द कर दिया गया है।",
      },
      postponed: {
        stamp: "स्थगित",
        message: "यह मेला स्थगित कर दिया गया है।",
      },
    },
    changeEventTitles: {
      newFair: "मेला प्रकाशित किया गया",
      updatedFair: "मेले के विवरण अपडेट हुए",
      cancelled: "मेला रद्द",
      postponed: "मेला स्थगित",
      dateChanged: "तारीख बदली",
      locationChanged: "स्थान बदला",
      importantInfoChanged: "महत्वपूर्ण अपडेट",
      officialWebsiteChanged: "आधिकारिक वेबसाइट बदली",
      lifecycleStatusChanged: "सार्वजनिक स्थिति बदली",
      descriptionChanged: "विवरण अपडेट हुआ",
    },
    changeEventSummaries: {
      newFair: "मेला प्रकाशित किया गया।",
      updatedFair: "मेले के विवरण अपडेट किए गए।",
      cancelled: "मेले को रद्द के रूप में चिह्नित किया गया।",
      postponed: "मेले को स्थगित के रूप में चिह्नित किया गया।",
      dateChanged: "मेले की तारीखें अपडेट की गईं।",
      locationChanged: "मेले का स्थान अपडेट किया गया।",
      importantInfoChanged: "मेले की महत्वपूर्ण जानकारी अपडेट की गई।",
      officialWebsiteChanged: "मेले की आधिकारिक वेबसाइट अपडेट की गई।",
      lifecycleStatusChanged: "मेले की सार्वजनिक स्थिति अपडेट की गई।",
      descriptionChanged: "मेले का विवरण अपडेट किया गया।",
    },
  },
};

export const fairDataReportCopyByLocale: Record<
  WebsiteLocaleCode,
  FairDataReportCopy
> = {
  en: {
    disclaimer: {
      title: "Notice about trade fair information",
      text: "Trade fair information is compiled from public and official sources. Despite careful review, details may be incomplete or incorrect. Please also check important decisions on the official trade fair website.",
    },
    existing: {
      action: "Report data error",
      title: "Report a data error",
      intro: "Tell us what should be checked. We review reports before any fair data changes.",
    },
    missing: {
      action: "Report missing trade fair",
      title: "Report a missing trade fair",
      intro: "Send a few details about a trade fair that is not listed yet.",
      helper: "Enter what you know. We will review it and add the rest.",
    },
    reportType: {
      date: "Date",
      location: "Location",
      organizer: "Organizer",
      officialWebsite: "Official website",
      categories: "Categories",
      description: "Description",
      status: "Status",
      duplicate: "Duplicate",
      other: "Other",
    },
    form: {
      reportType: "Type of issue",
      message: "Message",
      messagePlaceholder: "Describe what should be checked",
      correctedValue: "Correct or suggested value",
      contactEmail: "Contact email",
      fairName: "Trade fair name",
      city: "City or place",
      country: "Country",
      startDate: "Start date",
      endDate: "End date",
      dateText: "Date or period as text",
      venue: "Venue",
      officialWebsite: "Official website",
      organizer: "Organizer",
      sourceUrl: "Source link",
      note: "Comment",
      submit: "Send report",
      cancel: "Cancel",
      close: "Close",
      optional: "optional",
      requiredHint: "Please enter the trade fair name and city.",
      invalidEmail: "Please enter a valid email address or leave the field empty.",
      invalidUrl: "Please enter a valid http or https URL, or leave the field empty.",
    },
    result: {
      successTitle: "Report sent",
      successText: "Thank you. We will review the information before making changes.",
      errorTitle: "Report could not be sent",
      errorText: "Please try again in a moment.",
    },
  },
  de: {
    disclaimer: {
      title: "Hinweis zu Messeinformationen",
      text: "Die Messeinformationen werden aus öffentlichen und offiziellen Quellen zusammengestellt. Trotz sorgfältiger Prüfung können Angaben unvollständig oder fehlerhaft sein. Bitte prüfe wichtige Entscheidungen zusätzlich auf der offiziellen Messe-Website.",
    },
    existing: {
      action: "Datenfehler melden",
      title: "Datenfehler melden",
      intro: "Sag uns, was geprüft werden soll. Wir prüfen Meldungen, bevor Messedaten geändert werden.",
    },
    missing: {
      action: "Fehlende Messe melden",
      title: "Fehlende Messe melden",
      intro: "Sende wenige Angaben zu einer Messe, die noch nicht gelistet ist.",
      helper: "Gib an, was du weisst. Wir prüfen und ergänzen den Rest.",
    },
    reportType: {
      date: "Datum",
      location: "Ort",
      organizer: "Veranstalter",
      officialWebsite: "Offizielle Website",
      categories: "Kategorien",
      description: "Beschreibung",
      status: "Status",
      duplicate: "Duplikat",
      other: "Sonstiges",
    },
    form: {
      reportType: "Art des Problems",
      message: "Nachricht",
      messagePlaceholder: "Beschreibe, was geprüft werden soll",
      correctedValue: "Richtiger oder vorgeschlagener Wert",
      contactEmail: "Kontakt-E-Mail",
      fairName: "Messe-Name",
      city: "Stadt / Ort",
      country: "Land",
      startDate: "Startdatum",
      endDate: "Enddatum",
      dateText: "Datum oder Zeitraum als Text",
      venue: "Veranstaltungsort",
      officialWebsite: "Offizielle Website",
      organizer: "Veranstalter",
      sourceUrl: "Quelle / Link",
      note: "Kommentar",
      submit: "Meldung senden",
      cancel: "Abbrechen",
      close: "Schliessen",
      optional: "optional",
      requiredHint: "Bitte gib Messe-Name und Stadt ein.",
      invalidEmail: "Bitte gib eine gültige E-Mail-Adresse ein oder lass das Feld leer.",
      invalidUrl: "Bitte gib eine gültige http- oder https-URL ein oder lass das Feld leer.",
    },
    result: {
      successTitle: "Meldung gesendet",
      successText: "Danke. Wir prüfen die Information, bevor etwas geändert wird.",
      errorTitle: "Meldung konnte nicht gesendet werden",
      errorText: "Bitte versuche es gleich noch einmal.",
    },
  },
  ja: {
    disclaimer: {
      title: "展示会情報に関する注意",
      text: "展示会情報は公開情報と公式情報をもとにまとめられています。慎重に確認していますが、内容が不完全または誤っている場合があります。重要な判断は公式展示会ウェブサイトでも確認してください。",
    },
    existing: {
      action: "データの誤りを報告",
      title: "データの誤りを報告",
      intro: "確認してほしい内容をお知らせください。展示会データは確認後にのみ変更されます。",
    },
    missing: {
      action: "不足している展示会を報告",
      title: "不足している展示会を報告",
      intro: "まだ掲載されていない展示会について、分かる範囲で送信してください。",
      helper: "分かる範囲で入力してください。内容を確認し、残りを補足します。",
    },
    reportType: {
      date: "日程",
      location: "場所",
      organizer: "主催者",
      officialWebsite: "公式ウェブサイト",
      categories: "カテゴリー",
      description: "説明",
      status: "ステータス",
      duplicate: "重複",
      other: "その他",
    },
    form: {
      reportType: "問題の種類",
      message: "メッセージ",
      messagePlaceholder: "確認してほしい内容を説明してください",
      correctedValue: "正しい値または提案値",
      contactEmail: "連絡先メール",
      fairName: "展示会名",
      city: "都市または場所",
      country: "国",
      startDate: "開始日",
      endDate: "終了日",
      dateText: "日付または期間のメモ",
      venue: "会場",
      officialWebsite: "公式ウェブサイト",
      organizer: "主催者",
      sourceUrl: "情報源リンク",
      note: "コメント",
      submit: "報告を送信",
      cancel: "キャンセル",
      close: "閉じる",
      optional: "任意",
      requiredHint: "展示会名と都市を入力してください。",
      invalidEmail: "有効なメールアドレスを入力するか、空欄にしてください。",
      invalidUrl: "有効な http または https のURLを入力するか、空欄にしてください。",
    },
    result: {
      successTitle: "報告を送信しました",
      successText: "ありがとうございます。変更を行う前に情報を確認します。",
      errorTitle: "報告を送信できませんでした",
      errorText: "しばらくしてからもう一度お試しください。",
    },
  },
  es: {
    disclaimer: {
      title: "Aviso sobre la información de ferias",
      text: "La información de ferias se recopila a partir de fuentes públicas y oficiales. Aunque la revisamos con cuidado, los datos pueden estar incompletos o ser incorrectos. Comprueba también las decisiones importantes en el sitio web oficial de la feria.",
    },
    existing: {
      action: "Informar error de datos",
      title: "Informar un error de datos",
      intro: "Cuéntanos qué debemos revisar. Revisamos los informes antes de cambiar datos de ferias.",
    },
    missing: {
      action: "Informar feria faltante",
      title: "Informar una feria faltante",
      intro: "Envía algunos datos de una feria que aún no aparece en la lista.",
      helper: "Indica lo que sepas. Lo revisaremos y añadiremos el resto.",
    },
    reportType: {
      date: "Fecha",
      location: "Lugar",
      organizer: "Organizador",
      officialWebsite: "Sitio web oficial",
      categories: "Categorías",
      description: "Descripción",
      status: "Estado",
      duplicate: "Duplicado",
      other: "Otro",
    },
    form: {
      reportType: "Tipo de problema",
      message: "Mensaje",
      messagePlaceholder: "Describe qué debemos revisar",
      correctedValue: "Valor correcto o sugerido",
      contactEmail: "Email de contacto",
      fairName: "Nombre de la feria",
      city: "Ciudad o lugar",
      country: "País",
      startDate: "Fecha de inicio",
      endDate: "Fecha de finalización",
      dateText: "Fecha o periodo como texto",
      venue: "Recinto",
      officialWebsite: "Sitio web oficial",
      organizer: "Organizador",
      sourceUrl: "Enlace de fuente",
      note: "Comentario",
      submit: "Enviar informe",
      cancel: "Cancelar",
      close: "Cerrar",
      optional: "opcional",
      requiredHint: "Introduce el nombre de la feria y la ciudad.",
      invalidEmail: "Introduce un email válido o deja el campo vacío.",
      invalidUrl: "Introduce una URL http o https válida, o deja el campo vacío.",
    },
    result: {
      successTitle: "Informe enviado",
      successText: "Gracias. Revisaremos la información antes de hacer cambios.",
      errorTitle: "No se pudo enviar el informe",
      errorText: "Inténtalo de nuevo en un momento.",
    },
  },
  fr: {
    disclaimer: {
      title: "Remarque sur les informations des salons",
      text: "Les informations sur les salons sont compilées à partir de sources publiques et officielles. Malgré une vérification attentive, les données peuvent être incomplètes ou incorrectes. Vérifie aussi les décisions importantes sur le site officiel du salon.",
    },
    existing: {
      action: "Signaler une erreur de données",
      title: "Signaler une erreur de données",
      intro: "Dis-nous ce qui doit être vérifié. Nous examinons les signalements avant toute modification.",
    },
    missing: {
      action: "Signaler un salon manquant",
      title: "Signaler un salon manquant",
      intro: "Envoie quelques informations sur un salon qui n’est pas encore listé.",
      helper: "Indique ce que tu sais. Nous vérifierons et compléterons le reste.",
    },
    reportType: {
      date: "Date",
      location: "Lieu",
      organizer: "Organisateur",
      officialWebsite: "Site officiel",
      categories: "Catégories",
      description: "Description",
      status: "Statut",
      duplicate: "Doublon",
      other: "Autre",
    },
    form: {
      reportType: "Type de problème",
      message: "Message",
      messagePlaceholder: "Décris ce qui doit être vérifié",
      correctedValue: "Valeur correcte ou suggérée",
      contactEmail: "Email de contact",
      fairName: "Nom du salon",
      city: "Ville ou lieu",
      country: "Pays",
      startDate: "Date de début",
      endDate: "Date de fin",
      dateText: "Date ou période en texte",
      venue: "Lieu",
      officialWebsite: "Site officiel",
      organizer: "Organisateur",
      sourceUrl: "Lien source",
      note: "Commentaire",
      submit: "Envoyer le signalement",
      cancel: "Annuler",
      close: "Fermer",
      optional: "facultatif",
      requiredHint: "Indique le nom du salon et la ville.",
      invalidEmail: "Indique une adresse email valide ou laisse le champ vide.",
      invalidUrl: "Indique une URL http ou https valide, ou laisse le champ vide.",
    },
    result: {
      successTitle: "Signalement envoyé",
      successText: "Merci. Nous vérifierons l’information avant toute modification.",
      errorTitle: "Le signalement n’a pas pu être envoyé",
      errorText: "Réessaie dans un instant.",
    },
  },
  it: {
    disclaimer: {
      title: "Avviso sulle informazioni fieristiche",
      text: "Le informazioni sulle fiere sono raccolte da fonti pubbliche e ufficiali. Nonostante controlli accurati, i dati possono essere incompleti o errati. Verifica anche le decisioni importanti sul sito ufficiale della fiera.",
    },
    existing: {
      action: "Segnala errore dati",
      title: "Segnala un errore dati",
      intro: "Indicaci cosa deve essere verificato. Esaminiamo le segnalazioni prima di modificare i dati.",
    },
    missing: {
      action: "Segnala fiera mancante",
      title: "Segnala una fiera mancante",
      intro: "Invia alcuni dati su una fiera non ancora presente nell’elenco.",
      helper: "Inserisci ciò che sai. Verificheremo e aggiungeremo il resto.",
    },
    reportType: {
      date: "Data",
      location: "Luogo",
      organizer: "Organizzatore",
      officialWebsite: "Sito ufficiale",
      categories: "Categorie",
      description: "Descrizione",
      status: "Stato",
      duplicate: "Duplicato",
      other: "Altro",
    },
    form: {
      reportType: "Tipo di problema",
      message: "Messaggio",
      messagePlaceholder: "Descrivi cosa deve essere verificato",
      correctedValue: "Valore corretto o suggerito",
      contactEmail: "Email di contatto",
      fairName: "Nome della fiera",
      city: "Città o luogo",
      country: "Paese",
      startDate: "Data di inizio",
      endDate: "Data di fine",
      dateText: "Data o periodo come testo",
      venue: "Sede",
      officialWebsite: "Sito ufficiale",
      organizer: "Organizzatore",
      sourceUrl: "Link fonte",
      note: "Commento",
      submit: "Invia segnalazione",
      cancel: "Annulla",
      close: "Chiudi",
      optional: "facoltativo",
      requiredHint: "Inserisci il nome della fiera e la città.",
      invalidEmail: "Inserisci un indirizzo email valido o lascia il campo vuoto.",
      invalidUrl: "Inserisci un URL http o https valido, oppure lascia il campo vuoto.",
    },
    result: {
      successTitle: "Segnalazione inviata",
      successText: "Grazie. Verificheremo le informazioni prima di apportare modifiche.",
      errorTitle: "Non è stato possibile inviare la segnalazione",
      errorText: "Riprova tra poco.",
    },
  },
  bs: {
    disclaimer: {
      title: "Napomena o informacijama o sajmovima",
      text: "Informacije o sajmovima sastavljaju se iz javnih i službenih izvora. Uprkos pažljivoj provjeri, podaci mogu biti nepotpuni ili netačni. Važne odluke dodatno provjeri na službenoj web stranici sajma.",
    },
    existing: {
      action: "Prijavi grešku u podacima",
      title: "Prijavi grešku u podacima",
      intro: "Reci nam šta treba provjeriti. Prijave pregledamo prije bilo kakvih izmjena podataka.",
    },
    missing: {
      action: "Prijavi nedostajući sajam",
      title: "Prijavi nedostajući sajam",
      intro: "Pošalji nekoliko podataka o sajmu koji još nije na listi.",
      helper: "Unesi ono što znaš. Provjerit ćemo i dopuniti ostatak.",
    },
    reportType: {
      date: "Datum",
      location: "Lokacija",
      organizer: "Organizator",
      officialWebsite: "Službena web stranica",
      categories: "Kategorije",
      description: "Opis",
      status: "Status",
      duplicate: "Duplikat",
      other: "Ostalo",
    },
    form: {
      reportType: "Vrsta problema",
      message: "Poruka",
      messagePlaceholder: "Opiši šta treba provjeriti",
      correctedValue: "Ispravna ili predložena vrijednost",
      contactEmail: "Kontakt email",
      fairName: "Naziv sajma",
      city: "Grad ili mjesto",
      country: "Država",
      startDate: "Datum početka",
      endDate: "Datum završetka",
      dateText: "Datum ili period kao tekst",
      venue: "Mjesto održavanja",
      officialWebsite: "Službena web stranica",
      organizer: "Organizator",
      sourceUrl: "Link izvora",
      note: "Komentar",
      submit: "Pošalji prijavu",
      cancel: "Otkaži",
      close: "Zatvori",
      optional: "opciono",
      requiredHint: "Unesi naziv sajma i grad.",
      invalidEmail: "Unesi ispravnu email adresu ili ostavi polje prazno.",
      invalidUrl: "Unesi ispravan http ili https URL, ili ostavi polje prazno.",
    },
    result: {
      successTitle: "Prijava poslana",
      successText: "Hvala. Provjerit ćemo informacije prije bilo kakvih izmjena.",
      errorTitle: "Prijava nije mogla biti poslana",
      errorText: "Pokušaj ponovo za trenutak.",
    },
  },
  hr: {
    disclaimer: {
      title: "Napomena o informacijama o sajmovima",
      text: "Informacije o sajmovima sastavljaju se iz javnih i službenih izvora. Unatoč pažljivoj provjeri, podaci mogu biti nepotpuni ili netočni. Važne odluke dodatno provjeri na službenoj web-stranici sajma.",
    },
    existing: {
      action: "Prijavi pogrešku u podacima",
      title: "Prijavi pogrešku u podacima",
      intro: "Reci nam što treba provjeriti. Prijave pregledavamo prije bilo kakvih izmjena podataka.",
    },
    missing: {
      action: "Prijavi nedostajući sajam",
      title: "Prijavi nedostajući sajam",
      intro: "Pošalji nekoliko podataka o sajmu koji još nije na popisu.",
      helper: "Unesi ono što znaš. Provjerit ćemo i dopuniti ostatak.",
    },
    reportType: {
      date: "Datum",
      location: "Lokacija",
      organizer: "Organizator",
      officialWebsite: "Službena web-stranica",
      categories: "Kategorije",
      description: "Opis",
      status: "Status",
      duplicate: "Duplikat",
      other: "Ostalo",
    },
    form: {
      reportType: "Vrsta problema",
      message: "Poruka",
      messagePlaceholder: "Opiši što treba provjeriti",
      correctedValue: "Ispravna ili predložena vrijednost",
      contactEmail: "Kontakt email",
      fairName: "Naziv sajma",
      city: "Grad ili mjesto",
      country: "Država",
      startDate: "Datum početka",
      endDate: "Datum završetka",
      dateText: "Datum ili razdoblje kao tekst",
      venue: "Mjesto održavanja",
      officialWebsite: "Službena web-stranica",
      organizer: "Organizator",
      sourceUrl: "Poveznica izvora",
      note: "Komentar",
      submit: "Pošalji prijavu",
      cancel: "Odustani",
      close: "Zatvori",
      optional: "neobavezno",
      requiredHint: "Unesi naziv sajma i grad.",
      invalidEmail: "Unesi ispravnu email adresu ili ostavi polje prazno.",
      invalidUrl: "Unesi ispravan http ili https URL, ili ostavi polje prazno.",
    },
    result: {
      successTitle: "Prijava poslana",
      successText: "Hvala. Provjerit ćemo informacije prije bilo kakvih izmjena.",
      errorTitle: "Prijavu nije bilo moguće poslati",
      errorText: "Pokušaj ponovno za trenutak.",
    },
  },
  hi: {
    disclaimer: {
      title: "व्यापार मेले की जानकारी के बारे में सूचना",
      text: "मेले की जानकारी सार्वजनिक और आधिकारिक स्रोतों से तैयार की जाती है। सावधानीपूर्वक जाँच के बावजूद जानकारी अधूरी या गलत हो सकती है। महत्वपूर्ण निर्णयों के लिए आधिकारिक मेले की वेबसाइट पर भी जाँच करें।",
    },
    existing: {
      action: "डेटा त्रुटि रिपोर्ट करें",
      title: "डेटा त्रुटि रिपोर्ट करें",
      intro: "बताएँ कि क्या जाँचना चाहिए। किसी भी डेटा बदलाव से पहले हम रिपोर्ट की समीक्षा करते हैं।",
    },
    missing: {
      action: "छूटा हुआ व्यापार मेला रिपोर्ट करें",
      title: "छूटा हुआ व्यापार मेला रिपोर्ट करें",
      intro: "ऐसे मेले की कुछ जानकारी भेजें जो अभी सूची में नहीं है।",
      helper: "जो जानकारी आपको पता है वह दर्ज करें। हम जाँचेंगे और बाकी जोड़ेंगे।",
    },
    reportType: {
      date: "तारीख",
      location: "स्थान",
      organizer: "आयोजक",
      officialWebsite: "आधिकारिक वेबसाइट",
      categories: "श्रेणियां",
      description: "विवरण",
      status: "स्थिति",
      duplicate: "डुप्लिकेट",
      other: "अन्य",
    },
    form: {
      reportType: "समस्या का प्रकार",
      message: "संदेश",
      messagePlaceholder: "बताएँ कि क्या जाँचना चाहिए",
      correctedValue: "सही या सुझाया गया मान",
      contactEmail: "संपर्क ईमेल",
      fairName: "व्यापार मेले का नाम",
      city: "शहर या स्थान",
      country: "देश",
      startDate: "आरंभ तिथि",
      endDate: "समाप्ति तिथि",
      dateText: "तारीख या अवधि टेक्स्ट में",
      venue: "स्थान",
      officialWebsite: "आधिकारिक वेबसाइट",
      organizer: "आयोजक",
      sourceUrl: "स्रोत लिंक",
      note: "टिप्पणी",
      submit: "रिपोर्ट भेजें",
      cancel: "रद्द करें",
      close: "बंद करें",
      optional: "वैकल्पिक",
      requiredHint: "कृपया मेले का नाम और शहर दर्ज करें।",
      invalidEmail: "कृपया मान्य ईमेल पता दर्ज करें या फ़ील्ड खाली छोड़ दें।",
      invalidUrl: "कृपया मान्य http या https URL दर्ज करें, या फ़ील्ड खाली छोड़ दें।",
    },
    result: {
      successTitle: "रिपोर्ट भेज दी गई",
      successText: "धन्यवाद। बदलाव करने से पहले हम जानकारी की जाँच करेंगे।",
      errorTitle: "रिपोर्ट भेजी नहीं जा सकी",
      errorText: "कृपया थोड़ी देर बाद फिर से प्रयास करें।",
    },
  },
};

export function getFairCopy(locale: string): FairPageCopy {
  return fairCopyByLocale[
    isSupportedWebsiteLocale(locale) ? locale : defaultWebsiteLocaleCode
  ];
}

export function getFairDataReportCopy(locale: string): FairDataReportCopy {
  return fairDataReportCopyByLocale[
    isSupportedWebsiteLocale(locale) ? locale : defaultWebsiteLocaleCode
  ];
}
