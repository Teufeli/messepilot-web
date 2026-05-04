import Link from "next/link";

import type { HomeContent } from "@/lib/website/homeContent";

type WebsiteHomePageProps = {
  content: HomeContent;
};

export function WebsiteHomePage({ content }: WebsiteHomePageProps) {
  return (
    <section className="space-y-8">
      <div
        className="relative overflow-hidden rounded-[2rem] border border-white/60 shadow-[0_20px_60px_rgba(15,23,42,0.2)]"
        style={{
          backgroundImage: "url('/background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-slate-900/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/55 via-slate-900/35 to-transparent" />
        <div className="relative space-y-5 px-8 py-20 sm:px-12 sm:py-24">
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-slate-100">
            {content.heroEyebrow}
          </p>
          <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            {content.heroTitle}
          </h1>
          <p className="max-w-2xl text-base leading-7 text-slate-100 sm:text-lg">
            {content.heroText}
          </p>
        </div>
      </div>

      <div className="max-w-3xl space-y-4">
        <Link
          href={content.primaryButtonHref}
          className="inline-flex rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          {content.primaryButtonLabel}
        </Link>
        <p className="max-w-2xl text-sm leading-6 text-slate-600">
          {content.primaryButtonNote}
        </p>
      </div>
    </section>
  );
}
