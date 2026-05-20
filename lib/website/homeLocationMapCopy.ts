import {
  defaultWebsiteLocaleCode,
  isSupportedWebsiteLocale,
  type WebsiteLocaleCode,
} from "@/lib/website/i18n";
import type { WeatherConditionLabelKey } from "@/lib/website/weather";

export type HomeLocationMapCopy = {
  eyebrow: string;
  title: string;
  intro: string;
  empty: string;
  mobileListTitle: string;
  previewHeading: string;
  fairSingular: string;
  fairPlural: string;
  viewFairs: string;
  dateToBeConfirmed: string;
  weatherConditionLabels: Record<WeatherConditionLabelKey, string>;
};

const homeLocationMapCopyByLocale: Record<WebsiteLocaleCode, HomeLocationMapCopy> = {
  en: {
    eyebrow: "Fair locations",
    title: "Published fairs around the world",
    intro:
      "Browse the cities currently represented in MessePilot. Each pin groups all published fairs for that location.",
    empty: "Published fairs with map coordinates will appear here once they are available.",
    mobileListTitle: "Locations",
    previewHeading: "Next fairs",
    fairSingular: "fair",
    fairPlural: "fairs",
    viewFairs: "View fairs",
    dateToBeConfirmed: "Date to be confirmed",
    weatherConditionLabels: {
      sunny: "Sunny",
      "partly-cloudy": "Partly cloudy",
      cloudy: "Cloudy",
      rain: "Rain",
      snow: "Snow",
      storm: "Storm",
      fog: "Fog",
      wind: "Wind",
      unknown: "Weather",
    },
  },
  de: {
    eyebrow: "Messestandorte",
    title: "Veröffentlichte Messen weltweit",
    intro:
      "Entdecke die Städte, die aktuell in MessePilot vertreten sind. Jeder Pin bündelt alle veröffentlichten Messen an diesem Standort.",
    empty: "Veröffentlichte Messen mit Kartenkoordinaten erscheinen hier, sobald sie verfügbar sind.",
    mobileListTitle: "Standorte",
    previewHeading: "Nächste Messen",
    fairSingular: "Messe",
    fairPlural: "Messen",
    viewFairs: "Messen anzeigen",
    dateToBeConfirmed: "Datum noch offen",
    weatherConditionLabels: {
      sunny: "Sonnig",
      "partly-cloudy": "Teilweise bewölkt",
      cloudy: "Bewölkt",
      rain: "Regen",
      snow: "Schnee",
      storm: "Gewitter",
      fog: "Nebel",
      wind: "Wind",
      unknown: "Wetter",
    },
  },
  ja: {
    eyebrow: "展示会の場所",
    title: "世界の公開展示会",
    intro:
      "MessePilot に現在掲載されている都市を確認できます。各ピンは、その場所の公開展示会をまとめて表示します。",
    empty: "地図座標のある公開展示会が利用可能になると、ここに表示されます。",
    mobileListTitle: "場所",
    previewHeading: "次の展示会",
    fairSingular: "展示会",
    fairPlural: "展示会",
    viewFairs: "展示会を見る",
    dateToBeConfirmed: "日程未定",
    weatherConditionLabels: {
      sunny: "晴れ",
      "partly-cloudy": "一部くもり",
      cloudy: "くもり",
      rain: "雨",
      snow: "雪",
      storm: "雷雨",
      fog: "霧",
      wind: "風",
      unknown: "天気",
    },
  },
  es: {
    eyebrow: "Ubicaciones de ferias",
    title: "Ferias publicadas en todo el mundo",
    intro:
      "Explora las ciudades representadas actualmente en MessePilot. Cada pin agrupa todas las ferias publicadas de esa ubicación.",
    empty: "Las ferias publicadas con coordenadas de mapa aparecerán aquí cuando estén disponibles.",
    mobileListTitle: "Ubicaciones",
    previewHeading: "Próximas ferias",
    fairSingular: "feria",
    fairPlural: "ferias",
    viewFairs: "Ver ferias",
    dateToBeConfirmed: "Fecha por confirmar",
    weatherConditionLabels: {
      sunny: "Soleado",
      "partly-cloudy": "Parcialmente nublado",
      cloudy: "Nublado",
      rain: "Lluvia",
      snow: "Nieve",
      storm: "Tormenta",
      fog: "Niebla",
      wind: "Viento",
      unknown: "Tiempo",
    },
  },
  fr: {
    eyebrow: "Lieux de salons",
    title: "Salons publiés dans le monde",
    intro:
      "Parcourez les villes actuellement représentées dans MessePilot. Chaque repère regroupe tous les salons publiés pour ce lieu.",
    empty: "Les salons publiés avec coordonnées cartographiques apparaîtront ici dès qu'ils seront disponibles.",
    mobileListTitle: "Lieux",
    previewHeading: "Prochains salons",
    fairSingular: "salon",
    fairPlural: "salons",
    viewFairs: "Voir les salons",
    dateToBeConfirmed: "Date à confirmer",
    weatherConditionLabels: {
      sunny: "Ensoleillé",
      "partly-cloudy": "Partiellement nuageux",
      cloudy: "Nuageux",
      rain: "Pluie",
      snow: "Neige",
      storm: "Orage",
      fog: "Brouillard",
      wind: "Vent",
      unknown: "Météo",
    },
  },
  it: {
    eyebrow: "Luoghi delle fiere",
    title: "Fiere pubblicate nel mondo",
    intro:
      "Esplora le città attualmente presenti in MessePilot. Ogni pin raggruppa tutte le fiere pubblicate per quel luogo.",
    empty: "Le fiere pubblicate con coordinate sulla mappa appariranno qui quando saranno disponibili.",
    mobileListTitle: "Luoghi",
    previewHeading: "Prossime fiere",
    fairSingular: "fiera",
    fairPlural: "fiere",
    viewFairs: "Vedi fiere",
    dateToBeConfirmed: "Data da confermare",
    weatherConditionLabels: {
      sunny: "Soleggiato",
      "partly-cloudy": "Parzialmente nuvoloso",
      cloudy: "Nuvoloso",
      rain: "Pioggia",
      snow: "Neve",
      storm: "Temporale",
      fog: "Nebbia",
      wind: "Vento",
      unknown: "Meteo",
    },
  },
  bs: {
    eyebrow: "Lokacije sajmova",
    title: "Objavljeni sajmovi širom svijeta",
    intro:
      "Pregledajte gradove koji su trenutno zastupljeni u MessePilotu. Svaki pin grupiše sve objavljene sajmove za tu lokaciju.",
    empty: "Objavljeni sajmovi s koordinatama na karti pojavit će se ovdje čim budu dostupni.",
    mobileListTitle: "Lokacije",
    previewHeading: "Sljedeći sajmovi",
    fairSingular: "sajam",
    fairPlural: "sajmovi",
    viewFairs: "Prikaži sajmove",
    dateToBeConfirmed: "Datum će biti potvrđen",
    weatherConditionLabels: {
      sunny: "Sunčano",
      "partly-cloudy": "Djelimično oblačno",
      cloudy: "Oblačno",
      rain: "Kiša",
      snow: "Snijeg",
      storm: "Oluja",
      fog: "Magla",
      wind: "Vjetar",
      unknown: "Vrijeme",
    },
  },
  hr: {
    eyebrow: "Lokacije sajmova",
    title: "Objavljeni sajmovi diljem svijeta",
    intro:
      "Pregledajte gradove koji su trenutačno zastupljeni u MessePilotu. Svaki pin grupira sve objavljene sajmove za tu lokaciju.",
    empty: "Objavljeni sajmovi s koordinatama na karti pojavit će se ovdje čim budu dostupni.",
    mobileListTitle: "Lokacije",
    previewHeading: "Sljedeći sajmovi",
    fairSingular: "sajam",
    fairPlural: "sajmovi",
    viewFairs: "Prikaži sajmove",
    dateToBeConfirmed: "Datum će biti potvrđen",
    weatherConditionLabels: {
      sunny: "Sunčano",
      "partly-cloudy": "Djelomično oblačno",
      cloudy: "Oblačno",
      rain: "Kiša",
      snow: "Snijeg",
      storm: "Oluja",
      fog: "Magla",
      wind: "Vjetar",
      unknown: "Vrijeme",
    },
  },
  hi: {
    eyebrow: "मेले के स्थान",
    title: "दुनिया भर में प्रकाशित मेले",
    intro:
      "MessePilot में अभी शामिल शहरों को देखें। हर पिन उस स्थान के सभी प्रकाशित मेलों को एक साथ दिखाता है।",
    empty: "मानचित्र निर्देशांक वाले प्रकाशित मेले उपलब्ध होते ही यहां दिखाई देंगे।",
    mobileListTitle: "स्थान",
    previewHeading: "अगले मेले",
    fairSingular: "मेला",
    fairPlural: "मेले",
    viewFairs: "मेले देखें",
    dateToBeConfirmed: "तारीख की पुष्टि बाकी है",
    weatherConditionLabels: {
      sunny: "धूप",
      "partly-cloudy": "आंशिक बादल",
      cloudy: "बादल",
      rain: "बारिश",
      snow: "बर्फ",
      storm: "तूफ़ान",
      fog: "कोहरा",
      wind: "हवा",
      unknown: "मौसम",
    },
  },
};

export function getHomeLocationMapCopy(locale: string): HomeLocationMapCopy {
  return homeLocationMapCopyByLocale[
    isSupportedWebsiteLocale(locale) ? locale : defaultWebsiteLocaleCode
  ];
}
