import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | MessePilot",
  description: "Häufige Fragen zu MessePilot.",
};

const faqSections = [
  {
    group: "Erste Schritte",
    categories: [
      {
        title: "Allgemein",
        items: [
          {
            question: "Was ist MessePilot?",
            answer:
              "MessePilot hilft dir, Messebesuche zu planen und Messen, Stände, Notizen, Aufgaben, Kontakte, Fotos, Videos und Dokumente an einem Ort zu organisieren.",
          },
          {
            question: "Für wen ist MessePilot gedacht?",
            answer:
              "MessePilot ist für alle gedacht, die Messebesuche planen, vorbereiten oder nachbearbeiten – zum Beispiel Besucher, Einkäufer, Vertriebsteams, Lieferanten, Aussteller oder Geschäftsreisende.",
          },
          {
            question: "Ist MessePilot kostenlos?",
            answer:
              "MessePilot ist derzeit während der Beta- und frühen Veröffentlichungsphase verfügbar. Zukünftige Versionen können kostenpflichtige Funktionen oder Abonnements enthalten.",
          },
        ],
      },
    ],
  },
  {
    group: "Konto & Einstellungen",
    categories: [
      {
        title: "Konto & Anmeldung",
        items: [
          {
            question: "Brauche ich ein Konto?",
            answer:
              "Ja. MessePilot verwendet Benutzerkonten, damit deine persönlichen Planungsdaten deinem Konto zugeordnet und bei erneuter Anmeldung wieder verfügbar gemacht werden können.",
          },
          {
            question: "Welche Anmeldemethoden werden unterstützt?",
            answer:
              "MessePilot unterstützt je nach App-Version die Anmeldung mit Apple sowie E-Mail und Passwort. Google Login ist geplant und kann in einer späteren Version ergänzt werden.",
          },
          {
            question: "Kann ich MessePilot auf mehreren Geräten nutzen?",
            answer:
              "Ja. MessePilot ist aktuell auf das Apple-Universum ausgerichtet, also iPhone und iPad. Du kannst dich auf unterstützten Apple-Geräten mit demselben Konto anmelden. Android ist für später geplant, aber aktuell nicht Teil der unterstützten Plattformen.",
          },
          {
            question: "Was passiert, wenn ich „Mit Apple anmelden“ und „E-Mail verbergen“ nutze?",
            answer:
              "Wenn du bei „Mit Apple anmelden“ deine E-Mail-Adresse verbirgst, kann Apple eine private Relay-E-Mail-Adresse bereitstellen. MessePilot verwendet dann die von Apple bereitgestellte E-Mail-Adresse für kontobezogene Kommunikation, sofern erforderlich.",
          },
          {
            question: "Warum kann mein Zugriff eingeschränkt werden?",
            answer:
              "Der Zugriff kann eingeschränkt werden, wenn Missbrauch, Spam, Fake-Accounts, Sicherheitsrisiken oder Verstöße gegen Beta- oder Nutzungsbedingungen festgestellt werden.",
          },
          {
            question: "Wie kann ich mein Konto löschen?",
            answer:
              "Wenn verfügbar, kannst du die Kontolöschung direkt in der App anfordern. Falls diese Option in deiner App-Version noch nicht verfügbar ist, kontaktiere den Support unter support@messepilot.ch.",
          },
        ],
      },
      {
        title: "Profil & Geschäftsdaten",
        items: [
          {
            question: "Wofür wird das persönliche Profil verwendet?",
            answer:
              "Das persönliche Profil speichert optionale Angaben wie Name, Kontakt-E-Mail, Telefonnummer, Adresse, Sprache, Land und Profilbild.",
          },
          {
            question: "Wofür wird das Geschäftsprofil verwendet?",
            answer:
              "Das Geschäftsprofil speichert optionale berufliche Angaben wie Firmenname, Position, Abteilung, Website, geschäftliche E-Mail, Telefonnummer und Geschäftsadresse.",
          },
        ],
      },
    ],
  },
  {
    group: "Messeplanung",
    categories: [
      {
        title: "Messeplanung",
        items: [
          {
            question: "Was bedeutet Messe-Relevanz?",
            answer:
              "Die Messe-Relevanz hilft dir zu entscheiden, ob eine Messe für deine persönliche oder geschäftliche Planung wichtig ist.",
          },
          {
            question: "Können sich Messedaten ändern?",
            answer:
              "Ja. Termine, Veranstaltungsorte und Details können sich ändern. Prüfe wichtige Informationen immer zusätzlich auf der offiziellen Website der Messe, bevor du Reise- oder Geschäftsentscheidungen triffst.",
          },
        ],
      },
      {
        title: "Messedaten",
        items: [
          {
            question: "Woher stammen die Messeinformationen?",
            answer:
              "MessePilot konzentriert sich auf sachliche Messeinformationen wie Name, Stadt, Land, Datum, Veranstaltungsort, Kategorie und Links zu offiziellen Websites. Wichtige Details sollten immer auf der offiziellen Messewebsite geprüft werden.",
          },
          {
            question: "Ist MessePilot für Inhalte auf verlinkten Websites verantwortlich?",
            answer:
              "Nein. MessePilot kann auf externe Websites wie offizielle Messe-Websites, Veranstalterseiten oder andere Drittanbieterquellen verweisen. Für Inhalte, Verfügbarkeit, Aktualität, Richtigkeit oder Änderungen auf externen Websites ist MessePilot nicht verantwortlich und kann dafür nicht haftbar gemacht werden.",
          },
          {
            question: "Ist MessePilot offiziell mit den gelisteten Messen verbunden?",
            answer:
              "Nicht automatisch. MessePilot kann auf offizielle Messe-Websites verweisen, ist aber nicht automatisch offizieller Vertreter, Veranstalter oder Partner einer gelisteten Messe, sofern dies nicht ausdrücklich angegeben wird.",
          },
          {
            question: "Kann ich falsche Messeinformationen melden?",
            answer:
              "Ja. Wenn du falsche oder veraltete Messeinformationen bemerkst, kannst du MessePilot unter support@messepilot.ch oder info@messepilot.ch kontaktieren.",
          },
        ],
      },
    ],
  },
  {
    group: "Stände & Nachverfolgung",
    categories: [
      {
        title: "Stände",
        items: [
          {
            question: "Was ist ein Stand in MessePilot?",
            answer:
              "Ein Stand ist dein persönlicher Eintrag für einen Aussteller, Lieferanten, Partner oder ein Unternehmen, das du während einer Messe festhalten möchtest.",
          },
          {
            question: "Was kann ich in einem Stand speichern?",
            answer:
              "Ein Stand kann Kontakte, Notizen, Aufgaben, Tags, Fotos, Videos und Dokumente enthalten.",
          },
        ],
      },
      {
        title: "Standkontakte",
        items: [
          {
            question: "Was ist ein Standkontakt?",
            answer:
              "Ein Standkontakt ist eine Person, die du im Zusammenhang mit einem Stand getroffen hast oder dir merken möchtest.",
          },
          {
            question: "Sind Standkontakte dasselbe wie meine Telefonkontakte?",
            answer:
              "Nein. Standkontakte sind Einträge innerhalb von MessePilot. MessePilot muss dafür nicht auf dein Geräte-Adressbuch zugreifen.",
          },
          {
            question: "Kann ich Standkontakte in mein Telefonbuch exportieren?",
            answer:
              "Je nach App-Version kannst du Standkontakte aus MessePilot in dein Geräte-Adressbuch exportieren oder über native Teilen-Funktionen weiterverwenden. Ein Export erfolgt nur durch eine bewusste Aktion des Nutzers und nicht automatisch.",
          },
          {
            question: "Kann ich Standkontakte für Follow-ups nutzen?",
            answer:
              "Ja. Standkontakte helfen dir, Personen, Gespräche und nächste Schritte nach einer Messe besser nachzuverfolgen.",
          },
        ],
      },
      {
        title: "Notizen & Aufgaben",
        items: [
          {
            question: "Kann ich Notizen und Aufgaben erfassen?",
            answer:
              "Ja. Notizen helfen dir, wichtige Informationen festzuhalten. Aufgaben helfen dir, Follow-ups und wichtige Schritte vor, während oder nach einem Messebesuch zu verfolgen.",
          },
        ],
      },
    ],
  },
  {
    group: "Dateien & Speicher",
    categories: [
      {
        title: "Medien & Anhänge",
        items: [
          {
            question: "Wo werden meine Fotos, Videos und Dokumente gespeichert?",
            answer:
              "Medien und Dokumente werden lokal auf deinem Gerät und/oder in deinem privaten iCloud-Container gespeichert, abhängig von deinen Geräteeinstellungen und der iCloud-Verfügbarkeit.",
          },
          {
            question: "Werden meine Dateien auf MessePilot-Servern gespeichert?",
            answer:
              "In der aktuellen Architektur lädt MessePilot deine Fotos, Videos und Dokumente nicht als eigentliche Dateien auf MessePilot- oder Firebase-Server hoch. Die Dateien bleiben auf deinem Gerät und/oder in deinem privaten iCloud-Container. MessePilot und dessen Mitarbeitende können die Inhalte deiner Fotos, Videos oder Dokumente nicht einsehen. In Firestore werden nur technische Informationen und Referenzen gespeichert, zum Beispiel eine interne ID, Dateityp, Status, Dateigröße oder die Zuordnung zu einem Stand. Diese Informationen helfen der App, Anhänge korrekt anzuzeigen und dem richtigen Stand zuzuordnen.",
          },
          {
            question: "Darf ich fremde Broschüren, Logos oder Bilder hochladen?",
            answer:
              "Du solltest nur Dateien hinzufügen, die du speichern und verwenden darfst. Nutzer sind selbst dafür verantwortlich, dass gespeicherte oder verarbeitete Inhalte keine Rechte Dritter verletzen. MessePilot gibt dir keine Rechte an urheberrechtlich geschütztem Material wie Logos, Broschüren, Bildern oder Dokumenten Dritter.",
          },
          {
            question: "Was passiert, wenn ich einen Anhang lösche?",
            answer:
              "Wenn ein Anhang gelöscht wird, kann MessePilot die zugehörigen Metadaten aktualisieren oder entfernen und den Anhang in der App ausblenden oder entfernen. Gelöschte Daten und entfernte Dateien können von MessePilot und dessen Mitarbeitenden nicht wiederhergestellt werden. Dateien, die lokal oder in iCloud gespeichert sind, können zusätzlich vom Verhalten des Betriebssystems und deinen iCloud-Einstellungen abhängen.",
          },
          {
            question: "Was passiert, wenn eine Datei auf meinem Gerät fehlt?",
            answer:
              "Wenn eine Datei lokal nicht verfügbar ist, kann MessePilot versuchen, sie aus deinem privaten iCloud-Container wieder verfügbar zu machen, sofern sie dort vorhanden ist und iCloud korrekt funktioniert.",
          },
        ],
      },
      {
        title: "iCloud & lokaler Speicher",
        items: [
          {
            question: "Brauche ich iCloud?",
            answer:
              "iCloud ist hilfreich, um Medien und Dokumente über deinen privaten Apple-Speicher verfügbar zu halten. Das genaue Verhalten hängt jedoch von deinem Gerät und den Systemeinstellungen ab.",
          },
          {
            question: "Kann MessePilot garantieren, dass iCloud-Dateien immer sofort verfügbar sind?",
            answer:
              "Nein. Wenn iCloud eine Datei herunterladen muss, kann die Verfügbarkeit von Netzwerkverbindung, Geräteeinstellungen und dem Verhalten des iCloud-Systems abhängen.",
          },
        ],
      },
    ],
  },
  {
    group: "Datenschutz & Daten",
    categories: [
      {
        title: "Datenschutz & Daten",
        items: [
          {
            question: "Welche Daten werden in Firebase gespeichert?",
            answer:
              "MessePilot verwendet Firebase für Authentifizierung, Datenbankfunktionen und grundlegende Analysen. Dazu können Kontodaten, Profildaten, Standdaten, Notizen, Aufgaben, Kontakte, Anhangsmetadaten und grundlegende Analysedaten gehören.",
          },
          {
            question: "Verkauft MessePilot Nutzerdaten?",
            answer: "Nein. MessePilot verkauft keine Nutzerdaten.",
          },
          {
            question: "Verwendet MessePilot Nutzerdaten für Werbung?",
            answer:
              "Nein. MessePilot verwendet Nutzerdaten nicht für Werbung durch Dritte.",
          },
          {
            question: "Wer kann meine persönlichen Planungsdaten sehen?",
            answer:
              "Deine persönlichen Planungsdaten sind deinem Konto zugeordnet und nicht für andere Nutzer sichtbar. MessePilot und dessen Mitarbeitende können deine persönlichen Planungsinhalte wie Standdaten, Notizen, Aufgaben, Kontakte oder Medieninhalte nicht einsehen. Der Zugriff wird durch technische und sicherheitsbezogene Regeln beschränkt.",
          },
          {
            question: "Können gelöschte Daten wiederhergestellt werden?",
            answer:
              "Nein. Daten, die durch den Nutzer gelöscht oder im Rahmen einer Kontolöschung entfernt wurden, können von MessePilot und dessen Mitarbeitenden nicht wiederhergestellt werden. Technische Backups oder systembedingte Kopien können für eine begrenzte Zeit bestehen, sind jedoch nicht als Wiederherstellungsservice für Nutzer vorgesehen.",
          },
          {
            question: "Ist MessePilot für Inhalte verantwortlich, die Nutzer in der App speichern oder verarbeiten?",
            answer:
              "Nein. Nutzer sind selbst dafür verantwortlich, welche Informationen, Notizen, Kontakte, Dateien, Bilder, Videos, Dokumente oder sonstigen Inhalte sie in MessePilot eingeben, speichern, verarbeiten oder weiterverwenden. MessePilot stellt lediglich die technische App-Funktionalität bereit und kann für nutzergenerierte Inhalte, deren Rechtmässigkeit, Richtigkeit, Vollständigkeit oder Nutzung nicht verantwortlich oder haftbar gemacht werden.",
          },
          {
            question: "Wo finde ich die Datenschutzerklärung?",
            answer:
              "Die Datenschutzerklärung findest du auf der MessePilot-Website im Bereich Datenschutz.",
          },
        ],
      },
    ],
  },
  {
    group: "Sprachen, Beta & Support",
    categories: [
      {
        title: "Sprachen",
        items: [
          {
            question: "Ist MessePilot in mehreren Sprachen verfügbar?",
            answer:
              "MessePilot ist für mehrere Sprachen ausgelegt. Die derzeit vollständig unterstützten App-Sprachen sind Englisch, Deutsch und Japanisch.",
          },
        ],
      },
      {
        title: "Beta & Feedback",
        items: [
          {
            question: "Ist MessePilot noch in der Beta?",
            answer:
              "MessePilot befindet sich derzeit in der Beta- und frühen Veröffentlichungsphase. Funktionen, Design und Verfügbarkeit können sich während der Weiterentwicklung ändern.",
          },
          {
            question: "Wie kann ich Beta-Zugang anfragen?",
            answer:
              "Du kannst über die MessePilot-Website eine Beta-Zugangsanfrage per E-Mail senden. Der Zugang wird manuell geprüft und ist nicht automatisch garantiert.",
          },
          {
            question: "Ist Beta-Zugang garantiert?",
            answer:
              "Nein. MessePilot befindet sich in einer privaten Beta. Anfragen werden manuell geprüft, und ein Zugang kann abhängig von Testphase, Kapazität, Zielgruppe oder Sicherheitsgründen abgelehnt werden.",
          },
          {
            question: "Darf ich Screenshots, TestFlight-Links oder unveröffentlichte Funktionen teilen?",
            answer:
              "Nein. Inhalte der privaten Beta, Screenshots, unveröffentlichte Funktionen, interne Testdetails und Zugangsdaten dürfen ohne vorherige schriftliche Erlaubnis nicht veröffentlicht, weitergeleitet oder mit Dritten geteilt werden.",
          },
          {
            question: "Wie kann ich Feedback senden?",
            answer:
              "Du kannst Feedback über TestFlight senden, sofern verfügbar, oder den Support unter support@messepilot.ch kontaktieren.",
          },
        ],
      },
      {
        title: "Support",
        items: [
          {
            question: "Wie kann ich den Support kontaktieren?",
            answer:
              "Du erreichst den MessePilot Support per E-Mail unter support@messepilot.ch.",
          },
          {
            question: "Wie können Messeveranstalter oder Partner MessePilot kontaktieren?",
            answer:
              "Für allgemeine, geschäftliche oder veranstalterbezogene Fragen kontaktiere info@messepilot.ch.",
          },
          {
            question: "Was sollte ich in einer Support-Anfrage angeben?",
            answer:
              "Gib nach Möglichkeit dein Gerät, deine iOS-Version, die App-Version, eine kurze Beschreibung des Problems und Screenshots an, falls diese hilfreich sind.",
          },
          {
            question: "Ist Support in allen Sprachen verfügbar?",
            answer:
              "MessePilot unterstützt mehrere App-Sprachen. Support-Antworten sind jedoch möglicherweise nicht immer sofort in jeder Sprache verfügbar.",
          },
        ],
      },
    ],
  },
];

export default function GermanFAQPage() {
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
          FAQ
        </p>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          MessePilot Help Center
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-100">
          Antworten zu Konto, Messeplanung, Ständen, Dateien, Datenschutz und
          Support.
        </p>
        </div>
      </div>

      <div className="space-y-8">
        {faqSections.map((section) => (
          <section
            key={section.group}
            className="rounded-3xl border border-white/70 bg-white/90 p-6 shadow-sm backdrop-blur-xl sm:p-8"
          >
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
              {section.group}
            </h2>

            <div className="mt-6 space-y-7">
              {section.categories.map((category) => (
                <div key={category.title}>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                    {category.title}
                  </h3>

                  <div className="mt-3 divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white/80">
                    {category.items.map((item) => (
                      <details key={item.question} className="group">
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold text-slate-900 transition hover:bg-slate-50">
                          <span>{item.question}</span>
                          <span className="text-xl leading-none text-slate-400 transition group-open:rotate-45">
                            +
                          </span>
                        </summary>
                        <div className="px-5 pb-5 text-sm leading-7 text-slate-700">
                          {item.answer}
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
