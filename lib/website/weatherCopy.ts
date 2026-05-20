import {
  defaultWebsiteLocaleCode,
  isSupportedWebsiteLocale,
  type WebsiteLocaleCode,
} from "@/lib/website/i18n";
import type { WeatherConditionLabelKey } from "@/lib/website/weather";

export type WeatherCopy = {
  currentWeather: string;
  forecast: string;
  availabilityNote: string;
  observedAt: string;
  conditionLabels: Record<WeatherConditionLabelKey, string>;
};

const conditionLabelsByLocale: Record<
  WebsiteLocaleCode,
  Record<WeatherConditionLabelKey, string>
> = {
  en: {
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
  de: {
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
  ja: {
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
  es: {
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
  fr: {
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
  it: {
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
  bs: {
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
  hr: {
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
  hi: {
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
};

const weatherCopyByLocale: Record<WebsiteLocaleCode, WeatherCopy> = {
  en: {
    currentWeather: "Current weather",
    forecast: "Forecast",
    availabilityNote:
      "Weather is shown for fair locations with an ongoing fair or a fair taking place within the next 180 days.",
    observedAt: "Observed",
    conditionLabels: conditionLabelsByLocale.en,
  },
  de: {
    currentWeather: "Aktuelles Wetter",
    forecast: "Tagesprognose",
    availabilityNote:
      "Wetter zeigen wir für Messestandorte, an denen aktuell eine Messe läuft oder innerhalb der nächsten 180 Tage stattfindet.",
    observedAt: "Beobachtet",
    conditionLabels: conditionLabelsByLocale.de,
  },
  ja: {
    currentWeather: "現在の天気",
    forecast: "天気予報",
    availabilityNote:
      "天気は、現在開催中または今後180日以内に開催される展示会がある場所で表示されます。",
    observedAt: "観測",
    conditionLabels: conditionLabelsByLocale.ja,
  },
  es: {
    currentWeather: "Tiempo actual",
    forecast: "Previsión",
    availabilityNote:
      "El tiempo se muestra para ubicaciones de ferias con una feria en curso o una feria que tendrá lugar en los próximos 180 días.",
    observedAt: "Observado",
    conditionLabels: conditionLabelsByLocale.es,
  },
  fr: {
    currentWeather: "Météo actuelle",
    forecast: "Prévisions",
    availabilityNote:
      "La météo s’affiche pour les lieux de salons avec un salon en cours ou prévu dans les 180 prochains jours.",
    observedAt: "Observé",
    conditionLabels: conditionLabelsByLocale.fr,
  },
  it: {
    currentWeather: "Meteo attuale",
    forecast: "Previsioni",
    availabilityNote:
      "Il meteo viene mostrato per i luoghi delle fiere con una fiera in corso o prevista nei prossimi 180 giorni.",
    observedAt: "Osservato",
    conditionLabels: conditionLabelsByLocale.it,
  },
  bs: {
    currentWeather: "Trenutno vrijeme",
    forecast: "Prognoza",
    availabilityNote:
      "Vrijeme prikazujemo za lokacije sajmova na kojima je sajam u toku ili se održava u narednih 180 dana.",
    observedAt: "Zabilježeno",
    conditionLabels: conditionLabelsByLocale.bs,
  },
  hr: {
    currentWeather: "Trenutačno vrijeme",
    forecast: "Prognoza",
    availabilityNote:
      "Vrijeme prikazujemo za lokacije sajmova na kojima je sajam u tijeku ili se održava u sljedećih 180 dana.",
    observedAt: "Zabilježeno",
    conditionLabels: conditionLabelsByLocale.hr,
  },
  hi: {
    currentWeather: "वर्तमान मौसम",
    forecast: "पूर्वानुमान",
    availabilityNote:
      "मौसम उन मेला स्थानों के लिए दिखाया जाता है जहां अभी मेला चल रहा है या अगले 180 दिनों में होने वाला है।",
    observedAt: "देखा गया",
    conditionLabels: conditionLabelsByLocale.hi,
  },
};

export function getWeatherCopy(locale: string): WeatherCopy {
  return weatherCopyByLocale[
    isSupportedWebsiteLocale(locale) ? locale : defaultWebsiteLocaleCode
  ];
}
