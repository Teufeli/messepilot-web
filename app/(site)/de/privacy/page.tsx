import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutzerklärung | MessePilot",
  description: "Datenschutzerklärung für die MessePilot App.",
};

export default function GermanPrivacyPage() {
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
          Datenschutz
        </p>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Datenschutzerklärung
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-100">
          MessePilot ist eine App zur Planung von Messebesuchen und zur
          Verwaltung von Messen, Ständen, Notizen, Aufgaben, Kontakten und
          Medienanhängen.
        </p>
        <p className="mt-3 text-sm text-slate-500">
          Zuletzt aktualisiert: 1. Mai 2026
        </p>
        </div>
      </div>

      <div className="max-w-4xl rounded-3xl border border-white/70 bg-white/90 p-8 shadow-sm backdrop-blur-xl sm:p-10">
        <h2 className="text-2xl font-semibold text-slate-950">Überblick</h2>
        <p className="mt-2 leading-7 text-slate-700">
          MessePilot hilft Nutzerinnen und Nutzern, Messebesuche zu planen und
          persönliche Standinformationen zu verwalten. Diese Datenschutzerklärung
          erklärt, welche Daten bei der Nutzung der App verarbeitet werden können.
        </p>

        <h2 className="mt-8 text-2xl font-semibold text-slate-950">
          Daten, die wir verarbeiten
        </h2>
        <p className="mt-2 leading-7 text-slate-700">
          Abhängig von der App-Version und den vom Nutzer eingegebenen
          Informationen kann MessePilot Konto-, Profil- und nutzergenerierte
          Inhaltsdaten verarbeiten.
        </p>
        <p className="mt-2 leading-7 text-slate-700">Dies kann umfassen:</p>
        <ul className="mt-2 list-disc space-y-2 pl-6 text-slate-700">
          <li>
            Authentifizierungs- und Kontoinformationen wie Benutzer-ID und
            E-Mail-Adresse.
          </li>
          <li>
            Profilinformationen wie Name, Telefonnummer, Adresse oder
            geschäftliche Profildaten, sofern diese vom Nutzer eingegeben werden.
          </li>
          <li>
            Standbezogene Inhalte wie Notizen, Aufgaben, Kontakte, Fotos,
            Videos, Dokumente und zugehörige Metadaten.
          </li>
          <li>
            Grundlegende Analyse- und Diagnoseinformationen zur Verbesserung von
            Stabilität und Benutzerfreundlichkeit.
          </li>
        </ul>

        <h2 className="mt-8 text-2xl font-semibold text-slate-950">
          Firebase-Dienste
        </h2>
        <p className="mt-2 leading-7 text-slate-700">
          MessePilot verwendet Firebase-Dienste für Authentifizierung,
          Datenbankfunktionen und Analysen. Die Authentifizierung kann je nach
          App-Version über Apple, Google oder E-Mail/Passwort erfolgen. Firestore
          speichert Konto-, Profil-, Stand- und Anhangsmetadaten, die für die
          Funktionalität der App erforderlich sind.
        </p>

        <h2 className="mt-8 text-2xl font-semibold text-slate-950">
          Fotos, Videos und Dokumente
        </h2>
        <p className="mt-2 leading-7 text-slate-700">
          In der aktuellen Architektur lädt MessePilot Fotos, Videos und
          Dokumente nicht als eigentliche Dateien auf MessePilot- oder
          Firebase-Server hoch. Medien- und Dokumentdateien bleiben lokal auf
          dem Gerät des Nutzers und/oder im privaten iCloud-Container des
          Nutzers gespeichert, sofern dies durch das Betriebssystem aktiviert
          ist.
        </p>
        <p className="mt-2 leading-7 text-slate-700">
          MessePilot und dessen Mitarbeitende können die Inhalte von Fotos,
          Videos oder Dokumenten, die Nutzer speichern, nicht einsehen.
          Firestore kann technische Informationen und Referenzen speichern, zum
          Beispiel eine interne ID, Dateityp, Status, Dateigröße oder die
          Zuordnung zu einem Stand, damit die App Anhänge korrekt anzeigen und
          dem richtigen Stand zuordnen kann.
        </p>

        <h2 className="mt-8 text-2xl font-semibold text-slate-950">
          Verantwortung für Nutzerinhalte
        </h2>
        <p className="mt-2 leading-7 text-slate-700">
          Nutzer sind selbst dafür verantwortlich, welche Informationen,
          Notizen, Kontakte, Dateien, Bilder, Videos, Dokumente oder sonstigen
          Inhalte sie in MessePilot eingeben, speichern, verarbeiten, teilen
          oder weiterverwenden. MessePilot stellt die technische
          App-Funktionalität bereit, prüft nutzergenerierte Inhalte nicht auf
          Richtigkeit oder Rechtmäßigkeit und kann für solche Inhalte, deren
          Rechtmäßigkeit, Richtigkeit, Vollständigkeit, Nutzung oder Folgen der
          Nutzung nicht verantwortlich oder haftbar gemacht werden.
        </p>

        <h2 className="mt-8 text-2xl font-semibold text-slate-950">
          Analysen und Diagnosen
        </h2>
        <p className="mt-2 leading-7 text-slate-700">
          MessePilot kann grundlegende Analyse- und Diagnoseinformationen
          erfassen, um die App-Nutzung zu verstehen, Stabilität zu verbessern
          und Fehler zu beheben. Diese Informationen werden nicht für Werbung
          durch Dritte verwendet.
        </p>

        <h2 className="mt-8 text-2xl font-semibold text-slate-950">
          Beta-Zugangsanfragen
        </h2>
        <p className="mt-2 leading-7 text-slate-700">
          Wenn du Zugang zur privaten MessePilot-Beta anfragst, können wir die
          Informationen verarbeiten, die du in deiner Anfrage bereitstellst, zum
          Beispiel Name, E-Mail-Adresse, Unternehmen, Rolle, Land,
          Geräteinformationen und den Grund für deine Beta-Zugangsanfrage.
        </p>
        <p className="mt-2 leading-7 text-slate-700">
          Wir verwenden diese Informationen, um deine Anfrage zu prüfen, dich zu
          MessePilot zu kontaktieren, Beta-Zugänge zu verwalten, genehmigte
          Tester einzuladen und die Integrität der privaten Beta zu schützen.
          Der Zugang zur Beta wird manuell geprüft und ist nicht garantiert.
        </p>
        <p className="mt-2 leading-7 text-slate-700">
          Informationen aus einer Beta-Zugangsanfrage können so lange
          aufbewahrt werden, wie dies zur Verwaltung des Beta-Programms, zur
          Bearbeitung der Kommunikation, zur Dokumentation von
          Zugangsentscheidungen und zum Schutz vor Missbrauch erforderlich ist.
          Du kannst die Löschung deiner Beta-Anfragedaten über
          support@messepilot.ch verlangen, sofern keine technischen,
          sicherheitsbezogenen oder rechtlichen Gründe für eine weitere
          Aufbewahrung bestehen.
        </p>

        <h2 className="mt-8 text-2xl font-semibold text-slate-950">
          Kein Verkauf von Nutzerdaten
        </h2>
        <p className="mt-2 leading-7 text-slate-700">
          MessePilot verkauft keine Nutzerdaten und verwendet Nutzerdaten nicht
          für Werbung durch Dritte.
        </p>

        <h2 className="mt-8 text-2xl font-semibold text-slate-950">
          Datenlöschung
        </h2>
        <p className="mt-2 leading-7 text-slate-700">
          Nutzer können eine Konto- oder Datenlöschung über die App anfragen,
          sofern verfügbar, oder den Support kontaktieren.
        </p>

        <h2 className="mt-8 text-2xl font-semibold text-slate-950">Kontakt</h2>
        <p className="mt-2 leading-7 text-slate-700">
          Bei Datenschutzfragen oder Löschanfragen kontaktiere uns unter:{" "}
          <a
            className="font-medium text-slate-900 underline"
            href="mailto:support@messepilot.ch"
          >
            support@messepilot.ch
          </a>
        </p>
      </div>
    </section>
  );
}
