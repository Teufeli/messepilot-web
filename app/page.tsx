import Link from "next/link";

export default function Home() {
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
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-slate-100">MessePilot</p>
          <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Trade fair planning made simple.
          </h1>
          <p className="max-w-2xl text-base leading-7 text-slate-100 sm:text-lg">
            MessePilot helps users plan trade fairs, manage booths, notes, tasks, contacts, photos,
            videos and documents.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/privacy"
          className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          Privacy Policy
        </Link>
        <Link
          href="/support"
          className="rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
        >
          Support
        </Link>
      </div>
    </section>
  );
}
