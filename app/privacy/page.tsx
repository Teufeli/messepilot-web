import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | MessePilot",
  description: "Privacy Policy for the MessePilot app.",
};

export default function PrivacyPage() {
  return (
    <section className="space-y-8">
      <div className="space-y-4">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
          Privacy
        </p>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-neutral-950 sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-neutral-700">
          MessePilot is a trade fair planning app for managing fairs, booths,
          notes, tasks, contacts and media attachments.
        </p>
        <p className="text-sm text-neutral-500">Last updated: April 26, 2026</p>
      </div>

      <div className="prose prose-neutral max-w-3xl">
        <h2>Overview</h2>
        <p>
          MessePilot helps users plan trade fairs and manage personal booth
          information. This Privacy Policy explains what data may be processed
          when using the app.
        </p>

        <h2>Data We Process</h2>
        <p>
          Depending on the app version and the information entered by the user,
          MessePilot may process account, profile and user-generated content
          data.
        </p>
        <p>This may include:</p>
        <ul>
          <li>Authentication and account information such as user ID and email address.</li>
          <li>Profile information such as name, phone number, address or business profile fields, if entered by the user.</li>
          <li>Booth-related content such as notes, tasks, contacts, photos, videos, documents and related metadata.</li>
          <li>Basic analytics and diagnostic information used to improve app stability and usability.</li>
        </ul>

        <h2>Firebase Services</h2>
        <p>
          MessePilot uses Firebase services for authentication, database
          functionality and analytics. Authentication may use Apple, Google or
          email/password depending on the app version. Firestore stores account,
          profile, booth and attachment metadata required for app functionality.
        </p>

        <h2>Photos, Videos and Documents</h2>
        <p>
          Photos, videos and documents are not stored in Firebase Storage or
          Firestore as binary files. Media and document files are stored locally
          on the user&apos;s device and/or in the user&apos;s private iCloud
          container when enabled by the operating system.
        </p>
        <p>
          Firestore may store metadata needed to link booth data and attachment
          references to the correct user and booth.
        </p>

        <h2>Analytics and Diagnostics</h2>
        <p>
          MessePilot may collect basic analytics and diagnostic information to
          understand app usage, improve stability and fix issues. This
          information is not used for third-party advertising.
        </p>

        <h2>No Sale of User Data</h2>
        <p>
          MessePilot does not sell user data and does not use user data for
          third-party advertising.
        </p>

        <h2>Data Deletion</h2>
        <p>
          Users can request account or data deletion through the app where
          available or by contacting support.
        </p>

        <h2>Contact</h2>
        <p>
          For privacy questions or deletion requests, contact:
          {" "}
          <a href="mailto:zutter.roger@gmx.ch">zutter.roger@gmx.ch</a>
        </p>
      </div>
    </section>
  );
}
