import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MessePilot | Messeplanung einfach gemacht",
  description:
    "MessePilot hilft beim Planen von Messebesuchen und beim Verwalten von Messeständen, Notizen, Aufgaben, Kontakten und Anhängen.",
};

export default function GermanHome() {
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
            MessePilot
          </p>
          <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Messeplanung einfach gemacht.
          </h1>
          <p className="max-w-2xl text-base leading-7 text-slate-100 sm:text-lg">
            MessePilot hilft dir, Messen zu planen und Messestände, Notizen,
            Aufgaben, Kontakte, Fotos, Videos und Dokumente übersichtlich zu
            verwalten.
          </p>
        </div>
      </div>

      <div className="max-w-3xl space-y-4">
        <Link
          href="mailto:support@messepilot.ch?subject=MessePilot%20Beta%20Access%20Request&body=Hello%20MessePilot%20Team%2C%0A%0AI%20would%20like%20to%20request%20access%20to%20the%20MessePilot%20private%20beta.%0A%0AName%3A%0ACompany%3A%0ARole%3A%0ACountry%3A%0ADevice%3A%0AReason%20for%20beta%20access%3A%0A%0ABy%20submitting%20this%20request%2C%20I%20confirm%20that%20the%20information%20provided%20may%20be%20used%20to%20review%20my%20beta%20access%20request%2C%20contact%20me%20regarding%20MessePilot%20and%20manage%20my%20beta%20participation.%0A%0AI%20understand%20that%20MessePilot%20is%20currently%20in%20private%20beta.%20I%20agree%20to%20treat%20all%20non-public%20information%2C%20screenshots%2C%20unpublished%20features%2C%20internal%20test%20details%2C%20access%20links%20and%20beta-related%20material%20as%20confidential.%20I%20will%20not%20copy%2C%20publish%2C%20forward%2C%20distribute%20or%20otherwise%20share%20such%20information%20with%20third%20parties%20without%20prior%20written%20permission.%0A%0ABest%20regards%0A"
          className="inline-flex rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Beta-Zugang anfragen
        </Link>
        <p className="max-w-2xl text-sm leading-6 text-slate-600">
          MessePilot befindet sich derzeit in einer privaten Beta. Der Zugang
          wird manuell geprüft. Mit deiner Anfrage erklärst du dich damit
          einverstanden, dass die bereitgestellten Informationen zur Prüfung,
          Kontaktaufnahme und Verwaltung deiner Beta-Teilnahme verwendet werden.
          Screenshots, unveröffentlichte Funktionen, interne Testdetails oder
          Zugangsdaten dürfen ohne vorherige Erlaubnis nicht öffentlich geteilt
          werden.
        </p>
      </div>
    </section>
  );
}
