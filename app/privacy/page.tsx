import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | MessePilot",
  description: "Privacy Policy for the MessePilot app.",
};

export default function PrivacyPage() {
  return (
    <section className="space-y-8">
      <div className="rounded-3xl border border-white/70 bg-white/85 p-8 shadow-sm backdrop-blur-xl sm:p-10">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
          Privacy
        </p>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-700">
          MessePilot is a trade fair planning app for managing fairs, booths,
          notes, tasks, contacts and media attachments.
        </p>
        <p className="mt-3 text-sm text-slate-500">Last updated: April 26, 2026</p>
      </div>

      <div className="max-w-4xl rounded-3xl border border-white/70 bg-white/90 p-8 shadow-sm backdrop-blur-xl sm:p-10">
        <h2 className="text-2xl font-semibold text-slate-950">Overview</h2>
        <p className="mt-2 leading-7 text-slate-700">
          MessePilot helps users plan trade fairs and manage personal booth
          information. This Privacy Policy explains what data may be processed
          when using the app.
        </p>

        <h2 className="mt-8 text-2xl font-semibold text-slate-950">Data We Process</h2>
        <p className="mt-2 leading-7 text-slate-700">
          Depending on the app version and the information entered by the user,
          MessePilot may process account, profile and user-generated content
          data.
        </p>
        <p className="mt-2 leading-7 text-slate-700">This may include:</p>
        <ul className="mt-2 list-disc space-y-2 pl-6 text-slate-700">
          <li>Authentication and account information such as user ID and email address.</li>
          <li>Profile information such as name, phone number, address or business profile fields, if entered by the user.</li>
          <li>Booth-related content such as notes, tasks, contacts, photos, videos, documents and related metadata.</li>
          <li>Basic analytics and diagnostic information used to improve app stability and usability.</li>
        </ul>

        <h2 className="mt-8 text-2xl font-semibold text-slate-950">Firebase Services</h2>
        <p className="mt-2 leading-7 text-slate-700">
          MessePilot uses Firebase services for authentication, database
          functionality and analytics. Authentication may use Apple, Google or
          email/password depending on the app version. Firestore stores account,
          profile, booth and attachment metadata required for app functionality.
        </p>

        <h2 className="mt-8 text-2xl font-semibold text-slate-950">Photos, Videos and Documents</h2>
        <p className="mt-2 leading-7 text-slate-700">
          Photos, videos and documents are not stored in Firebase Storage or
          Firestore as binary files. Media and document files are stored locally
          on the user&apos;s device and/or in the user&apos;s private iCloud
          container when enabled by the operating system.
        </p>
        <p className="mt-2 leading-7 text-slate-700">
          Firestore may store metadata needed to link booth data and attachment
          references to the correct user and booth.
        </p>

        <h2 className="mt-8 text-2xl font-semibold text-slate-950">Analytics and Diagnostics</h2>
        <p className="mt-2 leading-7 text-slate-700">
          MessePilot may collect basic analytics and diagnostic information to
          understand app usage, improve stability and fix issues. This
          information is not used for third-party advertising.
        </p>

        <h2 className="mt-8 text-2xl font-semibold text-slate-950">No Sale of User Data</h2>
        <p className="mt-2 leading-7 text-slate-700">
          MessePilot does not sell user data and does not use user data for
          third-party advertising.
        </p>

        <h2 className="mt-8 text-2xl font-semibold text-slate-950">Data Deletion</h2>
        <p className="mt-2 leading-7 text-slate-700">
          Users can request account or data deletion through the app where
          available or by contacting support.
        </p>

        <h2 className="mt-8 text-2xl font-semibold text-slate-950">Contact</h2>
        <p className="mt-2 leading-7 text-slate-700">
          For privacy questions or deletion requests, contact:
          {" "}
          <a className="font-medium text-slate-900 underline" href="mailto:zutter.roger@gmx.ch">
            zutter.roger@gmx.ch
          </a>
        </p>
      </div>
    </section>
  );
}
