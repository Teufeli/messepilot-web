import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support | MessePilot",
  description: "Support-Informationen für MessePilot.",
};

export default function GermanSupportPage() {
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
          Brauchst du Hilfe mit MessePilot? Wir unterstützen dich bei Beta-Tests,
          Konto- und Anmeldeproblemen, Standdaten, Medienanhängen und Anfragen
          zur Datenlöschung.
        </p>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-3xl border border-white/70 bg-white/90 p-6 shadow-sm backdrop-blur-xl">
          <h2 className="text-xl font-semibold text-slate-950">
            Support kontaktieren
          </h2>
          <p className="mt-3 text-slate-700">
            Für Support-Anfragen, Feedback oder datenschutzbezogene Fragen
            kontaktiere uns bitte per E-Mail.
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
            Private Beta
          </h2>
          <p className="mt-3 text-slate-700">
            MessePilot befindet sich derzeit in einer privaten Beta und frühen
            Veröffentlichungsphase. Funktionen können sich ändern, während die
            App weiter verbessert und für eine breitere Veröffentlichung
            vorbereitet wird.
          </p>
        </div>
      </div>

      <div className="rounded-3xl border border-white/70 bg-white/90 p-6 shadow-sm backdrop-blur-xl">
        <h2 className="text-xl font-semibold text-slate-950">
          Wobei wir helfen können
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700">
          <li>Konto- und Anmeldeprobleme</li>
          <li>Messe- und Standplanungsfunktionen</li>
          <li>Notizen, Aufgaben und Kontaktdaten</li>
          <li>Fotos, Videos und Dokumentanhänge</li>
          <li>Anfragen zur Konto- oder Datenlöschung</li>
          <li>Feedback zur Beta-Version</li>
        </ul>
      </div>
    </section>
  );
}
