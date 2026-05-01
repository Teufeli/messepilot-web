import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support | MessePilot",
  description: "Support information for the MessePilot app.",
};

export default function SupportPage() {
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
          Support
        </p>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          MessePilot Support
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-100">
          Need help with MessePilot? We are here to help with beta testing,
          account access, login issues, booth data, media attachments and data
          deletion requests.
        </p>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-3xl border border-white/70 bg-white/90 p-6 shadow-sm backdrop-blur-xl">
          <h2 className="text-xl font-semibold text-slate-950">
            Contact Support
          </h2>
          <p className="mt-3 text-slate-700">
            For support requests, feedback or privacy-related questions, please
            contact us by email.
          </p>
          <a
            className="mt-5 inline-flex rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            href="mailto:support@messepilot.ch"
          >
            support@messepilot.ch
          </a>
        </div>

        <div className="rounded-3xl border border-white/70 bg-white/90 p-6 shadow-sm backdrop-blur-xl">
          <h2 className="text-xl font-semibold text-slate-950">
            Early Release
          </h2>
          <p className="mt-3 text-slate-700">
            MessePilot is currently in beta and early release preparation. Some
            features may still change as the app is improved and prepared for a
            wider release.
          </p>
        </div>
      </div>

      <div className="rounded-3xl border border-white/70 bg-white/90 p-6 shadow-sm backdrop-blur-xl">
        <h2 className="text-xl font-semibold text-slate-950">
          What we can help with
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700">
          <li>Account access and login issues</li>
          <li>Trade fair and booth planning features</li>
          <li>Notes, tasks and contact data</li>
          <li>Photos, videos and document attachments</li>
          <li>Account or data deletion requests</li>
          <li>Beta testing feedback</li>
        </ul>
      </div>
    </section>
  );
}
