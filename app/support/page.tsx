import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support | MessePilot",
  description: "Support information for the MessePilot app.",
};

export default function SupportPage() {
  return (
    <section className="space-y-8">
      <div className="space-y-4">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
          Support
        </p>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-neutral-950 sm:text-5xl">
          MessePilot Support
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-neutral-700">
          Need help with MessePilot? We are here to help with beta testing,
          account access, login issues, booth data, media attachments and data
          deletion requests.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-neutral-950">
            Contact Support
          </h2>
          <p className="mt-3 text-neutral-700">
            For support requests, feedback or privacy-related questions, please
            contact us by email.
          </p>
          <a
            className="mt-5 inline-flex rounded-full bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
            href="mailto:zutter.roger@gmx.ch"
          >
            zutter.roger@gmx.ch
          </a>
        </div>

        <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-neutral-950">
            Early Release
          </h2>
          <p className="mt-3 text-neutral-700">
            MessePilot is currently in beta and early release preparation. Some
            features may still change as the app is improved and prepared for a
            wider release.
          </p>
        </div>
      </div>

      <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-6">
        <h2 className="text-xl font-semibold text-neutral-950">
          What we can help with
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-neutral-700">
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
