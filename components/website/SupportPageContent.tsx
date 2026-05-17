import type { SupportPageCopy } from "@/lib/website/staticPageCopy";

type SupportPageContentProps = {
  copy: SupportPageCopy;
};

export function SupportPageContent({ copy }: SupportPageContentProps) {
  return (
    <section className="space-y-8">
      <div
        className="relative overflow-hidden rounded-3xl border border-white/60 bg-slate-950 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.18)] sm:p-10"
        style={{
          backgroundImage: "url('/background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-slate-950/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-950/45 to-slate-950/10" />
        <div className="relative max-w-4xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-200">
            {copy.eyebrow}
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            {copy.headline}
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-100">
            {copy.intro}
          </p>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-3xl border border-white/70 bg-white/90 p-6 shadow-sm backdrop-blur-xl">
          <h2 className="text-xl font-semibold text-slate-950">
            {copy.contactTitle}
          </h2>
          <p className="mt-3 text-slate-700">{copy.contactText}</p>
          <a
            className="mt-5 inline-flex rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            href="mailto:support@messepilot.ch"
          >
            support@messepilot.ch
          </a>
        </div>

        <div className="rounded-3xl border border-white/70 bg-white/90 p-6 shadow-sm backdrop-blur-xl">
          <h2 className="text-xl font-semibold text-slate-950">
            {copy.releaseTitle}
          </h2>
          <p className="mt-3 text-slate-700">{copy.releaseText}</p>
        </div>
      </div>

      <div className="rounded-3xl border border-white/70 bg-white/90 p-6 shadow-sm backdrop-blur-xl">
        <h2 className="text-xl font-semibold text-slate-950">
          {copy.helpTitle}
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700">
          {copy.helpItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
