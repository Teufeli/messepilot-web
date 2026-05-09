import type { Metadata } from "next";
import { getPublishedFairs } from "@/lib/fairs";
import FairsListClient from "@/components/website/FairsListClient";

export const dynamic = "force-dynamic";

type LocalizedFairsPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

const localizedCopy: Record<
  string,
  {
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
  }
> = {
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
  },
};

const fallbackCopy = {
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
};

export async function generateMetadata({
  params,
}: LocalizedFairsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const copy = localizedCopy[locale] ?? fallbackCopy;

  return {
    title: copy.title,
    description: copy.description,
  };
}

export default async function LocalizedFairsPage({
  params,
}: LocalizedFairsPageProps) {
  const { locale } = await params;
  const copy = localizedCopy[locale] ?? fallbackCopy;
  const fairs = await getPublishedFairs();

  return (
    <section className="space-y-8">
      <div
        className="relative overflow-hidden rounded-[2rem] border border-white/60 shadow-[0_20px_60px_rgba(15,23,42,0.18)]"
        style={{
          backgroundImage: "url('/background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-slate-900/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/60 via-slate-900/35 to-transparent" />
        <div className="relative space-y-4 px-8 py-16 sm:px-12 sm:py-20">
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-slate-100">
            {copy.eyebrow}
          </p>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            {copy.headline}
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-slate-100">
            {copy.intro}
          </p>
        </div>
      </div>

      <div className="rounded-3xl border border-white/70 bg-white/90 p-6 shadow-sm backdrop-blur-xl sm:p-8">
        {fairs.length === 0 ? (
          <div>
            <h2 className="text-2xl font-semibold text-slate-950">
              {copy.emptyTitle}
            </h2>
            <p className="mt-2 leading-7 text-slate-700">{copy.emptyText}</p>
          </div>
        ) : (
          <FairsListClient fairs={fairs} locale={locale} copy={copy} />
        )}
      </div>
    </section>
  );
}
