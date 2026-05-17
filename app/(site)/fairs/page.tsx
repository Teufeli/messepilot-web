import type { Metadata } from "next";
import { getPublicFairCategories, getPublishedFairs } from "@/lib/fairs";
import FairsListClient from "@/components/website/FairsListClient";
import { getFairCopy, getFairDataReportCopy } from "@/lib/website/fairCopy";

export const dynamic = "force-dynamic";

const copy = getFairCopy("en");
const reportCopy = getFairDataReportCopy("en");

export const metadata: Metadata = {
  title: copy.title,
  description: copy.description,
};

export default async function FairsPage() {
  const [fairs, categories] = await Promise.all([
    getPublishedFairs(),
    getPublicFairCategories(),
  ]);

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
        <FairsListClient
          fairs={fairs}
          categories={categories}
          locale="en"
          copy={copy}
          reportCopy={reportCopy}
        />
      </div>
    </section>
  );
}
