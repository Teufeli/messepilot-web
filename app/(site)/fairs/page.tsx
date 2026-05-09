import type { Metadata } from "next";
import { getPublishedFairs } from "@/lib/fairs";
import FairsListClient from "@/components/website/FairsListClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Fairs | MessePilot",
  description: "Published trade fairs listed in MessePilot.",
};

export default async function FairsPage() {
  const fairs = await getPublishedFairs();

  const copy = {
    organizer: "Organizer",
    details: "View details",
    officialWebsite: "Official website",
    soonestFirst: "Soonest first",
    latestFirst: "Latest first",
    hidePastFairs: "Hide past fairs",
    noUpcomingTitle: "No upcoming published fairs visible",
    noUpcomingText:
      "Turn off Hide past fairs to show past published fairs too.",
    fairSingular: "fair",
    fairPlural: "fairs",
    dateToBeConfirmed: "DATE TO BE CONFIRMED",
  };

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
            Fairs
          </p>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Published trade fairs
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-slate-100">
            Explore trade fairs currently published in MessePilot. Details can
            change, so always check the official fair website before making
            travel or business decisions.
          </p>
        </div>
      </div>

      <div className="rounded-3xl border border-white/70 bg-white/90 p-6 shadow-sm backdrop-blur-xl sm:p-8">
        {fairs.length === 0 ? (
          <div>
            <h2 className="text-2xl font-semibold text-slate-950">
              No published fairs yet
            </h2>
            <p className="mt-2 leading-7 text-slate-700">
              Published fair data will appear here once it is available.
            </p>
          </div>
        ) : (
          <FairsListClient fairs={fairs} locale="en" copy={copy} />
        )}
      </div>
    </section>
  );
}
