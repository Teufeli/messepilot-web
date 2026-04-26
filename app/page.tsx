import Link from "next/link";

export default function Home() {
  return (
    <section className="space-y-8">
      <div className="space-y-4">
        <p className="text-sm font-medium uppercase tracking-wide text-slate-500">MessePilot</p>
        <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
          Trade fair planning made simple.
        </h1>
        <p className="max-w-2xl text-base leading-7 text-slate-700 sm:text-lg">
          MessePilot helps users plan trade fairs, manage booths, notes, tasks, contacts, photos,
          videos and documents.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/privacy"
          className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-700"
        >
          Privacy Policy
        </Link>
        <Link
          href="/support"
          className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-900 hover:bg-slate-100"
        >
          Support
        </Link>
      </div>
    </section>
  );
}
