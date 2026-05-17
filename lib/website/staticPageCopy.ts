import {
  defaultWebsiteLocaleCode,
  isSupportedWebsiteLocale,
  type WebsiteLocaleCode,
} from "@/lib/website/i18n";

export type FAQPageCopy = {
  title: string;
  description: string;
  eyebrow: string;
  headline: string;
  intro: string;
  emptyTitle: string;
  emptyText: string;
};

export type SupportPageCopy = {
  title: string;
  description: string;
  eyebrow: string;
  headline: string;
  intro: string;
  contactTitle: string;
  contactText: string;
  releaseTitle: string;
  releaseText: string;
  helpTitle: string;
  helpItems: string[];
};

export type PrivacySectionCopy = {
  title: string;
  paragraphs: string[];
  list?: string[];
};

export type PrivacyPageCopy = {
  title: string;
  description: string;
  eyebrow: string;
  headline: string;
  intro: string;
  lastUpdated: string;
  sections: PrivacySectionCopy[];
  contactTitle: string;
  contactText: string;
};

function copyForLocale<T extends Record<WebsiteLocaleCode, unknown>>(
  copyByLocale: T,
  locale: string,
): T[WebsiteLocaleCode] {
  return copyByLocale[
    isSupportedWebsiteLocale(locale) ? locale : defaultWebsiteLocaleCode
  ] as T[WebsiteLocaleCode];
}

export const faqPageCopyByLocale: Record<WebsiteLocaleCode, FAQPageCopy> = {
  en: {
    title: "FAQ | MessePilot",
    description: "Frequently asked questions about MessePilot.",
    eyebrow: "FAQ",
    headline: "Frequently Asked Questions",
    intro:
      "Answers to common questions about MessePilot, beta access, privacy, files, booths and support.",
    emptyTitle: "No published FAQs yet",
    emptyText: "FAQ content is currently being prepared.",
  },
  de: {
    title: "FAQ | MessePilot",
    description: "Häufig gestellte Fragen zu MessePilot.",
    eyebrow: "FAQ",
    headline: "Häufig gestellte Fragen",
    intro:
      "Antworten auf häufige Fragen zu MessePilot, Beta-Zugang, Datenschutz, Dateien, Ständen und Support.",
    emptyTitle: "Noch keine veröffentlichten FAQs",
    emptyText: "Die FAQ-Inhalte werden aktuell vorbereitet.",
  },
  ja: {
    title: "FAQ | MessePilot",
    description: "MessePilot に関するよくある質問。",
    eyebrow: "FAQ",
    headline: "よくある質問",
    intro:
      "MessePilot、ベータアクセス、プライバシー、ファイル、ブース、サポートに関するよくある質問です。",
    emptyTitle: "公開済みの FAQ はまだありません",
    emptyText: "FAQ コンテンツは現在準備中です。",
  },
  es: {
    title: "FAQ | MessePilot",
    description: "Preguntas frecuentes sobre MessePilot.",
    eyebrow: "FAQ",
    headline: "Preguntas frecuentes",
    intro:
      "Respuestas a preguntas comunes sobre MessePilot, acceso beta, privacidad, archivos, booths y soporte.",
    emptyTitle: "Aún no hay FAQ publicadas",
    emptyText: "El contenido de FAQ se está preparando.",
  },
  fr: {
    title: "FAQ | MessePilot",
    description: "Questions fréquentes sur MessePilot.",
    eyebrow: "FAQ",
    headline: "Questions fréquentes",
    intro:
      "Réponses aux questions courantes sur MessePilot, l'accès bêta, la confidentialité, les fichiers, les booths et le support.",
    emptyTitle: "Aucune FAQ publiée pour le moment",
    emptyText: "Le contenu FAQ est en préparation.",
  },
  it: {
    title: "FAQ | MessePilot",
    description: "Domande frequenti su MessePilot.",
    eyebrow: "FAQ",
    headline: "Domande frequenti",
    intro:
      "Risposte alle domande comuni su MessePilot, accesso beta, privacy, file, booth e supporto.",
    emptyTitle: "Nessuna FAQ pubblicata",
    emptyText: "Il contenuto delle FAQ è in preparazione.",
  },
  bs: {
    title: "FAQ | MessePilot",
    description: "Često postavljana pitanja o MessePilotu.",
    eyebrow: "FAQ",
    headline: "Često postavljana pitanja",
    intro:
      "Odgovori na česta pitanja o MessePilotu, beta pristupu, privatnosti, datotekama, boothovima i podršci.",
    emptyTitle: "Još nema objavljenih FAQ sadržaja",
    emptyText: "FAQ sadržaj je trenutno u pripremi.",
  },
  hr: {
    title: "FAQ | MessePilot",
    description: "Često postavljana pitanja o MessePilotu.",
    eyebrow: "FAQ",
    headline: "Često postavljana pitanja",
    intro:
      "Odgovori na česta pitanja o MessePilotu, beta pristupu, privatnosti, datotekama, boothovima i podršci.",
    emptyTitle: "Još nema objavljenog FAQ sadržaja",
    emptyText: "FAQ sadržaj trenutačno je u pripremi.",
  },
  hi: {
    title: "FAQ | MessePilot",
    description: "MessePilot के बारे में अक्सर पूछे जाने वाले प्रश्न।",
    eyebrow: "FAQ",
    headline: "अक्सर पूछे जाने वाले प्रश्न",
    intro:
      "MessePilot, बीटा एक्सेस, गोपनीयता, फाइलों, booth और सहायता से जुड़े सामान्य प्रश्नों के उत्तर।",
    emptyTitle: "अभी कोई प्रकाशित FAQ नहीं",
    emptyText: "FAQ सामग्री तैयार की जा रही है।",
  },
};

export const supportPageCopyByLocale: Record<WebsiteLocaleCode, SupportPageCopy> = {
  en: {
    title: "Support | MessePilot",
    description: "Support information for the MessePilot app.",
    eyebrow: "Support",
    headline: "MessePilot Support",
    intro:
      "Need help with MessePilot? We are here to help with beta testing, account access, login issues, booth data, media attachments and data deletion requests.",
    contactTitle: "Contact Support",
    contactText:
      "For support requests, feedback or privacy-related questions, please contact us by email.",
    releaseTitle: "Early Release",
    releaseText:
      "MessePilot is currently in beta and early release preparation. Some features may still change as the app is improved and prepared for a wider release.",
    helpTitle: "What we can help with",
    helpItems: [
      "Account access and login issues",
      "Trade fair and booth planning features",
      "Notes, tasks and contact data",
      "Photos, videos and document attachments",
      "Account or data deletion requests",
      "Beta testing feedback",
    ],
  },
  de: {
    title: "Support | MessePilot",
    description: "Support-Informationen für MessePilot.",
    eyebrow: "Support",
    headline: "MessePilot Support",
    intro:
      "Brauchst du Hilfe mit MessePilot? Wir unterstützen dich bei Beta-Tests, Konto- und Anmeldeproblemen, Standdaten, Medienanhängen und Anfragen zur Datenlöschung.",
    contactTitle: "Support kontaktieren",
    contactText:
      "Für Support-Anfragen, Feedback oder datenschutzbezogene Fragen kontaktiere uns bitte per E-Mail.",
    releaseTitle: "Private Beta",
    releaseText:
      "MessePilot befindet sich derzeit in einer privaten Beta und frühen Veröffentlichungsphase. Funktionen können sich ändern, während die App weiter verbessert und für eine breitere Veröffentlichung vorbereitet wird.",
    helpTitle: "Wobei wir helfen können",
    helpItems: [
      "Konto- und Anmeldeprobleme",
      "Messe- und Standplanungsfunktionen",
      "Notizen, Aufgaben und Kontaktdaten",
      "Fotos, Videos und Dokumentanhänge",
      "Anfragen zur Konto- oder Datenlöschung",
      "Feedback zur Beta-Version",
    ],
  },
  ja: {
    title: "Support | MessePilot",
    description: "MessePilot のサポート情報。",
    eyebrow: "サポート",
    headline: "MessePilot サポート",
    intro:
      "MessePilot に関するサポートが必要な場合は、ベータテスト、アカウントやログインの問題、ブースデータ、メディア添付、データ削除リクエストについてお問い合わせいただけます。",
    contactTitle: "サポートに連絡",
    contactText:
      "サポート依頼、フィードバック、プライバシーに関するご質問は、メールでお問い合わせください。",
    releaseTitle: "プライベートベータ",
    releaseText:
      "MessePilot は現在、プライベートベータおよび初期リリース準備中です。アプリの改善と正式公開に向けた準備の中で、機能が変更される場合があります。",
    helpTitle: "サポートできる内容",
    helpItems: [
      "アカウントやログインに関する問題",
      "展示会やブース計画機能",
      "メモ、タスク、連絡先データ",
      "写真、動画、書類の添付",
      "アカウントまたはデータ削除リクエスト",
      "ベータ版に関するフィードバック",
    ],
  },
  es: {
    title: "Soporte | MessePilot",
    description: "Información de soporte para la app MessePilot.",
    eyebrow: "Soporte",
    headline: "Soporte de MessePilot",
    intro:
      "¿Necesitas ayuda con MessePilot? Podemos ayudarte con pruebas beta, acceso a la cuenta, inicio de sesión, datos de booths, archivos adjuntos y solicitudes de eliminación de datos.",
    contactTitle: "Contactar soporte",
    contactText:
      "Para solicitudes de soporte, comentarios o preguntas de privacidad, contáctanos por correo electrónico.",
    releaseTitle: "Beta privada",
    releaseText:
      "MessePilot está actualmente en beta privada y preparación de lanzamiento temprano. Algunas funciones pueden cambiar mientras la app se mejora y se prepara para una publicación más amplia.",
    helpTitle: "Con qué podemos ayudar",
    helpItems: [
      "Acceso a la cuenta y problemas de inicio de sesión",
      "Funciones de planificación de ferias y booths",
      "Notas, tareas y datos de contacto",
      "Fotos, videos y documentos adjuntos",
      "Solicitudes de eliminación de cuenta o datos",
      "Comentarios sobre la beta",
    ],
  },
  fr: {
    title: "Support | MessePilot",
    description: "Informations de support pour l'app MessePilot.",
    eyebrow: "Support",
    headline: "Support MessePilot",
    intro:
      "Besoin d'aide avec MessePilot ? Nous pouvons aider pour les tests bêta, l'accès au compte, les problèmes de connexion, les données de booths, les pièces jointes médias et les demandes de suppression de données.",
    contactTitle: "Contacter le support",
    contactText:
      "Pour les demandes de support, retours ou questions liées à la confidentialité, contactez-nous par e-mail.",
    releaseTitle: "Bêta privée",
    releaseText:
      "MessePilot est actuellement en bêta privée et en préparation de lancement initial. Certaines fonctionnalités peuvent encore changer pendant l'amélioration de l'app et sa préparation à une diffusion plus large.",
    helpTitle: "Ce que nous pouvons aider à résoudre",
    helpItems: [
      "Accès au compte et problèmes de connexion",
      "Fonctions de planification de salons et de booths",
      "Notes, tâches et données de contact",
      "Photos, vidéos et documents joints",
      "Demandes de suppression de compte ou de données",
      "Retours sur la bêta",
    ],
  },
  it: {
    title: "Supporto | MessePilot",
    description: "Informazioni di supporto per l'app MessePilot.",
    eyebrow: "Supporto",
    headline: "Supporto MessePilot",
    intro:
      "Hai bisogno di aiuto con MessePilot? Possiamo aiutarti con beta test, accesso all'account, problemi di login, dati dei booth, allegati multimediali e richieste di eliminazione dati.",
    contactTitle: "Contatta il supporto",
    contactText:
      "Per richieste di supporto, feedback o domande sulla privacy, contattaci via email.",
    releaseTitle: "Beta privata",
    releaseText:
      "MessePilot è attualmente in beta privata e in preparazione al rilascio iniziale. Alcune funzioni possono cambiare mentre l'app viene migliorata e preparata per una pubblicazione più ampia.",
    helpTitle: "Come possiamo aiutare",
    helpItems: [
      "Accesso all'account e problemi di login",
      "Funzioni di pianificazione fiere e booth",
      "Note, attività e dati di contatto",
      "Foto, video e documenti allegati",
      "Richieste di eliminazione account o dati",
      "Feedback sulla beta",
    ],
  },
  bs: {
    title: "Podrška | MessePilot",
    description: "Informacije o podršci za aplikaciju MessePilot.",
    eyebrow: "Podrška",
    headline: "MessePilot podrška",
    intro:
      "Trebate pomoć s MessePilotom? Pomažemo oko beta testiranja, pristupa računu, prijave, podataka o boothovima, medijskih priloga i zahtjeva za brisanje podataka.",
    contactTitle: "Kontaktirajte podršku",
    contactText:
      "Za zahtjeve za podršku, povratne informacije ili pitanja o privatnosti kontaktirajte nas e-mailom.",
    releaseTitle: "Privatna beta",
    releaseText:
      "MessePilot je trenutno u privatnoj beta verziji i ranoj pripremi za objavu. Neke funkcije se još mogu mijenjati dok se aplikacija poboljšava i priprema za šire izdanje.",
    helpTitle: "U čemu možemo pomoći",
    helpItems: [
      "Pristup računu i problemi s prijavom",
      "Funkcije planiranja sajmova i boothova",
      "Bilješke, zadaci i kontakt podaci",
      "Fotografije, videozapisi i dokumenti kao prilozi",
      "Zahtjevi za brisanje računa ili podataka",
      "Povratne informacije o beta verziji",
    ],
  },
  hr: {
    title: "Podrška | MessePilot",
    description: "Informacije o podršci za aplikaciju MessePilot.",
    eyebrow: "Podrška",
    headline: "MessePilot podrška",
    intro:
      "Trebate pomoć s MessePilotom? Pomažemo oko beta testiranja, pristupa računu, prijave, podataka o boothovima, medijskih privitaka i zahtjeva za brisanje podataka.",
    contactTitle: "Kontaktirajte podršku",
    contactText:
      "Za zahtjeve za podršku, povratne informacije ili pitanja o privatnosti kontaktirajte nas e-poštom.",
    releaseTitle: "Privatna beta",
    releaseText:
      "MessePilot je trenutačno u privatnoj beta verziji i ranoj pripremi za objavu. Neke značajke još se mogu mijenjati dok se aplikacija poboljšava i priprema za šire izdanje.",
    helpTitle: "U čemu možemo pomoći",
    helpItems: [
      "Pristup računu i problemi s prijavom",
      "Funkcije planiranja sajmova i boothova",
      "Bilješke, zadaci i kontaktni podaci",
      "Fotografije, videozapisi i dokumenti kao privitci",
      "Zahtjevi za brisanje računa ili podataka",
      "Povratne informacije o beta verziji",
    ],
  },
  hi: {
    title: "सहायता | MessePilot",
    description: "MessePilot ऐप के लिए सहायता जानकारी।",
    eyebrow: "सहायता",
    headline: "MessePilot सहायता",
    intro:
      "MessePilot में मदद चाहिए? हम बीटा परीक्षण, खाता एक्सेस, लॉगिन समस्याओं, booth डेटा, मीडिया अटैचमेंट और डेटा हटाने के अनुरोधों में मदद कर सकते हैं।",
    contactTitle: "सहायता से संपर्क करें",
    contactText:
      "सहायता अनुरोधों, प्रतिक्रिया या गोपनीयता से जुड़े प्रश्नों के लिए कृपया हमें ईमेल करें।",
    releaseTitle: "निजी बीटा",
    releaseText:
      "MessePilot अभी निजी बीटा और शुरुआती रिलीज की तैयारी में है। ऐप को बेहतर बनाते और व्यापक रिलीज के लिए तैयार करते समय कुछ सुविधाएं बदल सकती हैं।",
    helpTitle: "हम किन चीजों में मदद कर सकते हैं",
    helpItems: [
      "खाता एक्सेस और लॉगिन समस्याएं",
      "व्यापार मेले और booth योजना सुविधाएं",
      "नोट, कार्य और संपर्क डेटा",
      "फोटो, वीडियो और दस्तावेज अटैचमेंट",
      "खाता या डेटा हटाने के अनुरोध",
      "बीटा परीक्षण पर प्रतिक्रिया",
    ],
  },
};

const privacySections: Record<WebsiteLocaleCode, PrivacySectionCopy[]> = {
  en: [
    {
      title: "Overview",
      paragraphs: [
        "MessePilot helps users plan trade fairs and manage personal booth information. This Privacy Policy explains what data may be processed when using the app.",
      ],
    },
    {
      title: "Data We Process",
      paragraphs: [
        "Depending on the app version and the information entered by the user, MessePilot may process account, profile and user-generated content data.",
        "This may include:",
      ],
      list: [
        "Authentication and account information such as user ID and email address.",
        "Profile information such as name, phone number, address or business profile fields, if entered by the user.",
        "Booth-related content such as notes, tasks, contacts, photos, videos, documents and related metadata.",
        "Basic analytics and diagnostic information used to improve app stability and usability.",
      ],
    },
    {
      title: "Firebase Services",
      paragraphs: [
        "MessePilot uses Firebase services for authentication, database functionality and analytics. Authentication may use Apple, Google or email/password depending on the app version. Firestore stores account, profile, booth and attachment metadata required for app functionality.",
      ],
    },
    {
      title: "Photos, Videos and Documents",
      paragraphs: [
        "In the current architecture, MessePilot does not upload photos, videos or documents as actual files to MessePilot or Firebase servers. Media and document files remain on the user's device and/or in the user's private iCloud container when enabled by the operating system.",
        "MessePilot and its staff cannot view the contents of photos, videos or documents stored by users. Firestore may store technical information and references, such as an internal ID, file type, status, file size or the link to the related booth, so the app can display attachments correctly and connect them to the right booth.",
      ],
    },
    {
      title: "User Content Responsibility",
      paragraphs: [
        "Users are responsible for the information, notes, contacts, files, images, videos, documents or other content they enter, store, process, share or otherwise use in MessePilot. MessePilot provides the technical app functionality, does not review user-generated content for correctness or legality and cannot be held responsible or liable for such content, its legality, accuracy, completeness, use or any consequences of its use.",
      ],
    },
    {
      title: "Analytics and Diagnostics",
      paragraphs: [
        "MessePilot may collect basic analytics and diagnostic information to understand app usage, improve stability and fix issues. This information is not used for third-party advertising.",
      ],
    },
    {
      title: "Beta Access Requests",
      paragraphs: [
        "If you request access to the MessePilot private beta, we may process the information you provide in your request, such as your name, email address, company, role, country, device information and reason for requesting beta access.",
        "We use this information to review your request, contact you about MessePilot, manage beta access, invite approved testers and protect the integrity of the private beta. Access to the beta is reviewed manually and is not guaranteed.",
        "Information submitted with a beta access request may be kept for as long as needed to manage the beta program, handle related communication, document access decisions and protect against misuse. You may request deletion of your beta access request data by contacting support@messepilot.ch, unless retention is required for technical, security or legal reasons.",
      ],
    },
    {
      title: "No Sale of User Data",
      paragraphs: [
        "MessePilot does not sell user data and does not use user data for third-party advertising.",
      ],
    },
    {
      title: "Data Deletion",
      paragraphs: [
        "Users can request account or data deletion through the app where available or by contacting support.",
      ],
    },
  ],
  de: [
    {
      title: "Überblick",
      paragraphs: [
        "MessePilot hilft Nutzerinnen und Nutzern, Messebesuche zu planen und persönliche Standinformationen zu verwalten. Diese Datenschutzerklärung erklärt, welche Daten bei der Nutzung der App verarbeitet werden können.",
      ],
    },
    {
      title: "Daten, die wir verarbeiten",
      paragraphs: [
        "Abhängig von der App-Version und den vom Nutzer eingegebenen Informationen kann MessePilot Konto-, Profil- und nutzergenerierte Inhaltsdaten verarbeiten.",
        "Dies kann umfassen:",
      ],
      list: [
        "Authentifizierungs- und Kontoinformationen wie Benutzer-ID und E-Mail-Adresse.",
        "Profilinformationen wie Name, Telefonnummer, Adresse oder geschäftliche Profildaten, sofern diese eingegeben werden.",
        "Standbezogene Inhalte wie Notizen, Aufgaben, Kontakte, Fotos, Videos, Dokumente und zugehörige Metadaten.",
        "Grundlegende Analyse- und Diagnoseinformationen zur Verbesserung von Stabilität und Benutzerfreundlichkeit.",
      ],
    },
    {
      title: "Firebase-Dienste",
      paragraphs: [
        "MessePilot verwendet Firebase-Dienste für Authentifizierung, Datenbankfunktionen und Analysen. Die Authentifizierung kann je nach App-Version über Apple, Google oder E-Mail/Passwort erfolgen. Firestore speichert Konto-, Profil-, Stand- und Anhangsmetadaten, die für die Funktionalität der App erforderlich sind.",
      ],
    },
    {
      title: "Fotos, Videos und Dokumente",
      paragraphs: [
        "In der aktuellen Architektur lädt MessePilot Fotos, Videos und Dokumente nicht als eigentliche Dateien auf MessePilot- oder Firebase-Server hoch. Medien- und Dokumentdateien bleiben lokal auf dem Gerät des Nutzers und/oder im privaten iCloud-Container des Nutzers gespeichert, sofern dies durch das Betriebssystem aktiviert ist.",
        "MessePilot und dessen Mitarbeitende können die Inhalte von Fotos, Videos oder Dokumenten, die Nutzer speichern, nicht einsehen. Firestore kann technische Informationen und Referenzen speichern, zum Beispiel eine interne ID, Dateityp, Status, Dateigröße oder die Zuordnung zu einem Stand, damit die App Anhänge korrekt anzeigen und dem richtigen Stand zuordnen kann.",
      ],
    },
    {
      title: "Verantwortung für Nutzerinhalte",
      paragraphs: [
        "Nutzer sind selbst dafür verantwortlich, welche Informationen, Notizen, Kontakte, Dateien, Bilder, Videos, Dokumente oder sonstigen Inhalte sie in MessePilot eingeben, speichern, verarbeiten, teilen oder weiterverwenden. MessePilot stellt die technische App-Funktionalität bereit, prüft nutzergenerierte Inhalte nicht auf Richtigkeit oder Rechtmäßigkeit und kann für solche Inhalte, deren Rechtmäßigkeit, Richtigkeit, Vollständigkeit, Nutzung oder Folgen der Nutzung nicht verantwortlich oder haftbar gemacht werden.",
      ],
    },
    {
      title: "Analysen und Diagnosen",
      paragraphs: [
        "MessePilot kann grundlegende Analyse- und Diagnoseinformationen erfassen, um die App-Nutzung zu verstehen, Stabilität zu verbessern und Fehler zu beheben. Diese Informationen werden nicht für Werbung durch Dritte verwendet.",
      ],
    },
    {
      title: "Beta-Zugangsanfragen",
      paragraphs: [
        "Wenn du Zugang zur privaten MessePilot-Beta anfragst, können wir die Informationen verarbeiten, die du in deiner Anfrage bereitstellst, zum Beispiel Name, E-Mail-Adresse, Unternehmen, Rolle, Land, Geräteinformationen und den Grund für deine Beta-Zugangsanfrage.",
        "Wir verwenden diese Informationen, um deine Anfrage zu prüfen, dich zu MessePilot zu kontaktieren, Beta-Zugänge zu verwalten, genehmigte Tester einzuladen und die Integrität der privaten Beta zu schützen. Der Zugang zur Beta wird manuell geprüft und ist nicht garantiert.",
        "Informationen aus einer Beta-Zugangsanfrage können so lange aufbewahrt werden, wie dies zur Verwaltung des Beta-Programms, zur Bearbeitung der Kommunikation, zur Dokumentation von Zugangsentscheidungen und zum Schutz vor Missbrauch erforderlich ist. Du kannst die Löschung deiner Beta-Anfragedaten über support@messepilot.ch verlangen, sofern keine technischen, sicherheitsbezogenen oder rechtlichen Gründe für eine weitere Aufbewahrung bestehen.",
      ],
    },
    {
      title: "Kein Verkauf von Nutzerdaten",
      paragraphs: [
        "MessePilot verkauft keine Nutzerdaten und verwendet Nutzerdaten nicht für Werbung durch Dritte.",
      ],
    },
    {
      title: "Datenlöschung",
      paragraphs: [
        "Nutzer können eine Konto- oder Datenlöschung über die App anfragen, sofern verfügbar, oder den Support kontaktieren.",
      ],
    },
  ],
  ja: [
    {
      title: "概要",
      paragraphs: [
        "MessePilot は、ユーザーが展示会を計画し、個人のブース情報を管理するためのアプリです。このプライバシーポリシーでは、アプリの利用時に処理される可能性のあるデータについて説明します。",
      ],
    },
    {
      title: "処理するデータ",
      paragraphs: [
        "アプリのバージョンおよびユーザーが入力する情報に応じて、MessePilot はアカウント、プロフィール、ユーザー作成コンテンツに関するデータを処理する場合があります。",
        "これには以下が含まれる場合があります。",
      ],
      list: [
        "ユーザーIDやメールアドレスなどの認証およびアカウント情報。",
        "ユーザーが入力した場合の氏名、電話番号、住所、ビジネスプロフィール項目などのプロフィール情報。",
        "メモ、タスク、連絡先、写真、動画、書類、および関連メタデータなどのブース関連コンテンツ。",
        "アプリの安定性と使いやすさを改善するための基本的な分析および診断情報。",
      ],
    },
    {
      title: "Firebase サービス",
      paragraphs: [
        "MessePilot は、認証、データベース機能、分析のために Firebase サービスを使用します。認証はアプリのバージョンに応じて、Apple、Google、またはメールアドレスとパスワードを使用する場合があります。Firestore は、アプリ機能に必要なアカウント、プロフィール、ブース、添付ファイルのメタデータを保存します。",
      ],
    },
    {
      title: "写真、動画、書類",
      paragraphs: [
        "現在の構成では、MessePilot は写真、動画、書類を実際のファイルとして MessePilot または Firebase のサーバーへアップロードしません。メディアおよび書類ファイルは、OS によって有効化されている場合、ユーザーの端末上および／またはユーザーのプライベート iCloud コンテナに保存されます。",
        "MessePilot およびそのスタッフは、ユーザーが保存した写真、動画、書類の内容を閲覧できません。Firestore には、内部ID、ファイル種類、ステータス、ファイルサイズ、関連するブースとの紐付けなど、添付ファイルを正しく表示し適切なブースに関連付けるための技術情報と参照が保存される場合があります。",
      ],
    },
    {
      title: "ユーザーコンテンツに関する責任",
      paragraphs: [
        "MessePilot に入力、保存、処理、共有、またはその他の方法で利用する情報、メモ、連絡先、ファイル、画像、動画、書類、その他のコンテンツについては、ユーザー自身が責任を負います。MessePilot は技術的なアプリ機能を提供するものであり、ユーザー生成コンテンツの正確性または合法性を審査するものではありません。",
      ],
    },
    {
      title: "分析と診断",
      paragraphs: [
        "MessePilot は、アプリの利用状況を理解し、安定性を改善し、問題を修正するために、基本的な分析および診断情報を収集する場合があります。この情報は第三者広告のためには使用されません。",
      ],
    },
    {
      title: "ベータアクセス申請",
      paragraphs: [
        "MessePilot のプライベートベータへのアクセスを申請する場合、申請時に提供された氏名、メールアドレス、会社名、役割、国、端末情報、申請理由などの情報を処理する場合があります。",
        "これらの情報は、申請の審査、MessePilot に関する連絡、ベータアクセスの管理、承認されたテスターの招待、プライベートベータの完全性を保護するために使用されます。ベータへのアクセスは手動で審査され、保証されるものではありません。",
        "ベータアクセス申請に含まれる情報は、ベータプログラムの管理、関連する連絡、アクセス判断の記録、不正利用からの保護に必要な期間保存される場合があります。技術上、セキュリティ上、または法的な理由で保存が必要な場合を除き、support@messepilot.ch まで連絡することで削除を依頼できます。",
      ],
    },
    {
      title: "ユーザーデータの販売なし",
      paragraphs: [
        "MessePilot はユーザーデータを販売せず、ユーザーデータを第三者広告のために使用しません。",
      ],
    },
    {
      title: "データ削除",
      paragraphs: [
        "ユーザーは、利用可能な場合はアプリ内から、またはサポートに連絡することで、アカウントまたはデータ削除をリクエストできます。",
      ],
    },
  ],
  es: [
    {
      title: "Resumen",
      paragraphs: [
        "MessePilot ayuda a los usuarios a planificar ferias y gestionar información personal de booths. Esta Política de Privacidad explica qué datos pueden procesarse al usar la app.",
      ],
    },
    {
      title: "Datos que procesamos",
      paragraphs: [
        "Según la versión de la app y la información introducida por el usuario, MessePilot puede procesar datos de cuenta, perfil y contenido generado por el usuario.",
        "Esto puede incluir:",
      ],
      list: [
        "Información de autenticación y cuenta, como ID de usuario y dirección de correo electrónico.",
        "Información de perfil, como nombre, teléfono, dirección o campos de perfil profesional, si el usuario los introduce.",
        "Contenido relacionado con booths, como notas, tareas, contactos, fotos, videos, documentos y metadatos relacionados.",
        "Información básica de análisis y diagnóstico usada para mejorar la estabilidad y usabilidad de la app.",
      ],
    },
    {
      title: "Servicios Firebase",
      paragraphs: [
        "MessePilot utiliza servicios Firebase para autenticación, funciones de base de datos y análisis. La autenticación puede usar Apple, Google o email/contraseña según la versión de la app. Firestore almacena metadatos de cuenta, perfil, booth y adjuntos necesarios para el funcionamiento de la app.",
      ],
    },
    {
      title: "Fotos, videos y documentos",
      paragraphs: [
        "En la arquitectura actual, MessePilot no sube fotos, videos ni documentos como archivos reales a servidores de MessePilot o Firebase. Los archivos multimedia y documentos permanecen en el dispositivo del usuario y/o en su contenedor privado de iCloud cuando el sistema operativo lo habilita.",
        "MessePilot y su personal no pueden ver el contenido de fotos, videos o documentos almacenados por los usuarios. Firestore puede guardar información técnica y referencias, como ID interno, tipo de archivo, estado, tamaño o enlace al booth relacionado, para que la app pueda mostrar adjuntos correctamente.",
      ],
    },
    {
      title: "Responsabilidad por el contenido del usuario",
      paragraphs: [
        "Los usuarios son responsables de la información, notas, contactos, archivos, imágenes, videos, documentos u otros contenidos que introducen, almacenan, procesan, comparten o usan en MessePilot. MessePilot proporciona la funcionalidad técnica de la app y no revisa el contenido generado por usuarios para verificar exactitud o legalidad.",
      ],
    },
    {
      title: "Análisis y diagnósticos",
      paragraphs: [
        "MessePilot puede recopilar información básica de análisis y diagnóstico para entender el uso de la app, mejorar la estabilidad y corregir problemas. Esta información no se usa para publicidad de terceros.",
      ],
    },
    {
      title: "Solicitudes de acceso beta",
      paragraphs: [
        "Si solicitas acceso a la beta privada de MessePilot, podemos procesar la información que proporcionas, como nombre, email, empresa, rol, país, información del dispositivo y motivo de la solicitud.",
        "Usamos esta información para revisar tu solicitud, contactarte sobre MessePilot, gestionar el acceso beta, invitar testers aprobados y proteger la integridad de la beta privada. El acceso se revisa manualmente y no está garantizado.",
        "La información enviada con una solicitud beta puede conservarse el tiempo necesario para gestionar el programa beta, comunicaciones relacionadas, decisiones de acceso y protección contra uso indebido. Puedes solicitar la eliminación escribiendo a support@messepilot.ch, salvo que se requiera conservación por razones técnicas, de seguridad o legales.",
      ],
    },
    {
      title: "Sin venta de datos de usuario",
      paragraphs: [
        "MessePilot no vende datos de usuario ni los usa para publicidad de terceros.",
      ],
    },
    {
      title: "Eliminación de datos",
      paragraphs: [
        "Los usuarios pueden solicitar la eliminación de cuenta o datos desde la app cuando esté disponible o contactando al soporte.",
      ],
    },
  ],
  fr: [
    {
      title: "Aperçu",
      paragraphs: [
        "MessePilot aide les utilisateurs à planifier des salons et à gérer des informations personnelles de booths. Cette Politique de confidentialité explique quelles données peuvent être traitées lors de l'utilisation de l'app.",
      ],
    },
    {
      title: "Données que nous traitons",
      paragraphs: [
        "Selon la version de l'app et les informations saisies par l'utilisateur, MessePilot peut traiter des données de compte, de profil et de contenu généré par l'utilisateur.",
        "Cela peut inclure :",
      ],
      list: [
        "Informations d'authentification et de compte, comme l'ID utilisateur et l'adresse e-mail.",
        "Informations de profil, comme nom, numéro de téléphone, adresse ou champs professionnels, si elles sont saisies.",
        "Contenu lié aux booths, comme notes, tâches, contacts, photos, vidéos, documents et métadonnées associées.",
        "Informations d'analyse et de diagnostic de base utilisées pour améliorer la stabilité et l'utilisabilité de l'app.",
      ],
    },
    {
      title: "Services Firebase",
      paragraphs: [
        "MessePilot utilise les services Firebase pour l'authentification, les fonctions de base de données et l'analyse. L'authentification peut utiliser Apple, Google ou e-mail/mot de passe selon la version de l'app. Firestore stocke les métadonnées de compte, profil, booth et pièces jointes nécessaires au fonctionnement de l'app.",
      ],
    },
    {
      title: "Photos, vidéos et documents",
      paragraphs: [
        "Dans l'architecture actuelle, MessePilot ne téléverse pas les photos, vidéos ou documents comme fichiers réels vers des serveurs MessePilot ou Firebase. Les médias et documents restent sur l'appareil de l'utilisateur et/ou dans son conteneur iCloud privé lorsque le système l'active.",
        "MessePilot et son personnel ne peuvent pas consulter le contenu des photos, vidéos ou documents stockés par les utilisateurs. Firestore peut stocker des informations techniques et références, comme un ID interne, un type de fichier, un statut, une taille ou le lien vers le booth associé, afin que l'app affiche correctement les pièces jointes.",
      ],
    },
    {
      title: "Responsabilité du contenu utilisateur",
      paragraphs: [
        "Les utilisateurs sont responsables des informations, notes, contacts, fichiers, images, vidéos, documents ou autres contenus qu'ils saisissent, stockent, traitent, partagent ou utilisent dans MessePilot. MessePilot fournit la fonctionnalité technique de l'app et ne vérifie pas l'exactitude ou la légalité du contenu généré par les utilisateurs.",
      ],
    },
    {
      title: "Analyse et diagnostic",
      paragraphs: [
        "MessePilot peut collecter des informations d'analyse et de diagnostic de base pour comprendre l'utilisation de l'app, améliorer la stabilité et corriger les problèmes. Ces informations ne sont pas utilisées pour la publicité de tiers.",
      ],
    },
    {
      title: "Demandes d'accès bêta",
      paragraphs: [
        "Si vous demandez l'accès à la bêta privée de MessePilot, nous pouvons traiter les informations fournies, comme nom, e-mail, entreprise, rôle, pays, informations d'appareil et raison de la demande.",
        "Nous utilisons ces informations pour examiner votre demande, vous contacter au sujet de MessePilot, gérer l'accès bêta, inviter les testeurs approuvés et protéger l'intégrité de la bêta privée. L'accès est vérifié manuellement et n'est pas garanti.",
        "Les informations soumises avec une demande bêta peuvent être conservées aussi longtemps que nécessaire pour gérer le programme bêta, les communications, les décisions d'accès et la protection contre les abus. Vous pouvez demander la suppression via support@messepilot.ch, sauf si une conservation est requise pour des raisons techniques, de sécurité ou légales.",
      ],
    },
    {
      title: "Aucune vente de données utilisateur",
      paragraphs: [
        "MessePilot ne vend pas les données utilisateur et ne les utilise pas pour la publicité de tiers.",
      ],
    },
    {
      title: "Suppression des données",
      paragraphs: [
        "Les utilisateurs peuvent demander la suppression de leur compte ou de leurs données dans l'app lorsque disponible, ou en contactant le support.",
      ],
    },
  ],
  it: [
    {
      title: "Panoramica",
      paragraphs: [
        "MessePilot aiuta gli utenti a pianificare fiere e gestire informazioni personali dei booth. Questa Informativa sulla privacy spiega quali dati possono essere trattati durante l'uso dell'app.",
      ],
    },
    {
      title: "Dati che trattiamo",
      paragraphs: [
        "A seconda della versione dell'app e delle informazioni inserite dall'utente, MessePilot può trattare dati di account, profilo e contenuti generati dall'utente.",
        "Questo può includere:",
      ],
      list: [
        "Informazioni di autenticazione e account, come ID utente e indirizzo email.",
        "Informazioni di profilo, come nome, telefono, indirizzo o campi professionali, se inseriti dall'utente.",
        "Contenuti relativi ai booth, come note, attività, contatti, foto, video, documenti e metadati collegati.",
        "Informazioni di analisi e diagnostica di base usate per migliorare stabilità e usabilità dell'app.",
      ],
    },
    {
      title: "Servizi Firebase",
      paragraphs: [
        "MessePilot usa i servizi Firebase per autenticazione, funzionalità database e analisi. L'autenticazione può usare Apple, Google o email/password a seconda della versione dell'app. Firestore memorizza metadati di account, profilo, booth e allegati necessari al funzionamento dell'app.",
      ],
    },
    {
      title: "Foto, video e documenti",
      paragraphs: [
        "Nell'architettura attuale, MessePilot non carica foto, video o documenti come file effettivi sui server MessePilot o Firebase. I file multimediali e i documenti restano sul dispositivo dell'utente e/o nel suo contenitore iCloud privato quando abilitato dal sistema operativo.",
        "MessePilot e il suo staff non possono vedere il contenuto di foto, video o documenti salvati dagli utenti. Firestore può memorizzare informazioni tecniche e riferimenti, come ID interno, tipo file, stato, dimensione o collegamento al booth relativo, così l'app può mostrare correttamente gli allegati.",
      ],
    },
    {
      title: "Responsabilità dei contenuti utente",
      paragraphs: [
        "Gli utenti sono responsabili delle informazioni, note, contatti, file, immagini, video, documenti o altri contenuti che inseriscono, salvano, elaborano, condividono o usano in MessePilot. MessePilot fornisce la funzionalità tecnica dell'app e non verifica la correttezza o legalità dei contenuti generati dagli utenti.",
      ],
    },
    {
      title: "Analisi e diagnostica",
      paragraphs: [
        "MessePilot può raccogliere informazioni di analisi e diagnostica di base per comprendere l'uso dell'app, migliorare la stabilità e correggere problemi. Queste informazioni non sono usate per pubblicità di terzi.",
      ],
    },
    {
      title: "Richieste di accesso beta",
      paragraphs: [
        "Se richiedi accesso alla beta privata di MessePilot, possiamo trattare le informazioni fornite, come nome, email, azienda, ruolo, paese, informazioni dispositivo e motivo della richiesta.",
        "Usiamo queste informazioni per valutare la richiesta, contattarti su MessePilot, gestire l'accesso beta, invitare tester approvati e proteggere l'integrità della beta privata. L'accesso viene verificato manualmente e non è garantito.",
        "Le informazioni inviate con una richiesta beta possono essere conservate per il tempo necessario a gestire il programma beta, comunicazioni, decisioni di accesso e protezione da abusi. Puoi richiedere l'eliminazione scrivendo a support@messepilot.ch, salvo conservazione richiesta per motivi tecnici, di sicurezza o legali.",
      ],
    },
    {
      title: "Nessuna vendita di dati utente",
      paragraphs: [
        "MessePilot non vende dati utente e non usa dati utente per pubblicità di terzi.",
      ],
    },
    {
      title: "Eliminazione dei dati",
      paragraphs: [
        "Gli utenti possono richiedere l'eliminazione dell'account o dei dati tramite l'app, quando disponibile, oppure contattando il supporto.",
      ],
    },
  ],
  bs: [
    {
      title: "Pregled",
      paragraphs: [
        "MessePilot pomaže korisnicima da planiraju sajmove i upravljaju ličnim informacijama o boothovima. Ova Politika privatnosti objašnjava koji se podaci mogu obrađivati pri korištenju aplikacije.",
      ],
    },
    {
      title: "Podaci koje obrađujemo",
      paragraphs: [
        "Ovisno o verziji aplikacije i informacijama koje korisnik unese, MessePilot može obrađivati podatke o računu, profilu i sadržaju koji korisnik kreira.",
        "To može uključivati:",
      ],
      list: [
        "Informacije za autentifikaciju i račun, kao što su korisnički ID i e-mail adresa.",
        "Profilne informacije, kao što su ime, telefon, adresa ili poslovna profilna polja, ako ih korisnik unese.",
        "Sadržaj povezan s boothovima, kao što su bilješke, zadaci, kontakti, fotografije, videozapisi, dokumenti i povezani metapodaci.",
        "Osnovne analitičke i dijagnostičke informacije za poboljšanje stabilnosti i upotrebljivosti aplikacije.",
      ],
    },
    {
      title: "Firebase usluge",
      paragraphs: [
        "MessePilot koristi Firebase usluge za autentifikaciju, funkcije baze podataka i analitiku. Autentifikacija može koristiti Apple, Google ili e-mail/lozinku ovisno o verziji aplikacije. Firestore čuva metapodatke računa, profila, boothova i priloga potrebne za rad aplikacije.",
      ],
    },
    {
      title: "Fotografije, videozapisi i dokumenti",
      paragraphs: [
        "U trenutnoj arhitekturi MessePilot ne učitava fotografije, videozapise ili dokumente kao stvarne datoteke na MessePilot ili Firebase servere. Medijske i dokument datoteke ostaju na korisnikovom uređaju i/ili u privatnom iCloud kontejneru kada to operativni sistem omogućava.",
        "MessePilot i njegovo osoblje ne mogu vidjeti sadržaj fotografija, videozapisa ili dokumenata koje korisnici čuvaju. Firestore može čuvati tehničke informacije i reference, kao što su interni ID, tip datoteke, status, veličina ili veza s povezanim boothom, kako bi aplikacija ispravno prikazala priloge.",
      ],
    },
    {
      title: "Odgovornost za korisnički sadržaj",
      paragraphs: [
        "Korisnici su odgovorni za informacije, bilješke, kontakte, datoteke, slike, videozapise, dokumente ili drugi sadržaj koji unose, čuvaju, obrađuju, dijele ili koriste u MessePilotu. MessePilot pruža tehničku funkcionalnost aplikacije i ne provjerava tačnost ili zakonitost korisničkog sadržaja.",
      ],
    },
    {
      title: "Analitika i dijagnostika",
      paragraphs: [
        "MessePilot može prikupljati osnovne analitičke i dijagnostičke informacije radi razumijevanja korištenja aplikacije, poboljšanja stabilnosti i ispravljanja problema. Ove informacije se ne koriste za oglašavanje trećih strana.",
      ],
    },
    {
      title: "Zahtjevi za beta pristup",
      paragraphs: [
        "Ako zatražite pristup privatnoj beta verziji MessePilota, možemo obrađivati informacije koje dostavite, kao što su ime, e-mail, kompanija, uloga, država, informacije o uređaju i razlog zahtjeva.",
        "Ove informacije koristimo za pregled zahtjeva, kontaktiranje u vezi s MessePilotom, upravljanje beta pristupom, pozivanje odobrenih testera i zaštitu integriteta privatne bete. Pristup se provjerava ručno i nije zagarantovan.",
        "Informacije poslane uz beta zahtjev mogu se čuvati koliko je potrebno za upravljanje beta programom, komunikaciju, dokumentiranje odluka o pristupu i zaštitu od zloupotrebe. Brisanje možete zatražiti putem support@messepilot.ch, osim ako je čuvanje potrebno iz tehničkih, sigurnosnih ili pravnih razloga.",
      ],
    },
    {
      title: "Bez prodaje korisničkih podataka",
      paragraphs: [
        "MessePilot ne prodaje korisničke podatke i ne koristi ih za oglašavanje trećih strana.",
      ],
    },
    {
      title: "Brisanje podataka",
      paragraphs: [
        "Korisnici mogu zatražiti brisanje računa ili podataka kroz aplikaciju kada je dostupno ili kontaktiranjem podrške.",
      ],
    },
  ],
  hr: [
    {
      title: "Pregled",
      paragraphs: [
        "MessePilot pomaže korisnicima planirati sajmove i upravljati osobnim informacijama o boothovima. Ova Pravila privatnosti objašnjavaju koji se podaci mogu obrađivati pri korištenju aplikacije.",
      ],
    },
    {
      title: "Podaci koje obrađujemo",
      paragraphs: [
        "Ovisno o verziji aplikacije i informacijama koje korisnik unese, MessePilot može obrađivati podatke o računu, profilu i sadržaju koji korisnik stvara.",
        "To može uključivati:",
      ],
      list: [
        "Informacije za autentifikaciju i račun, kao što su korisnički ID i e-adresa.",
        "Profilne informacije, kao što su ime, telefon, adresa ili poslovna profilna polja, ako ih korisnik unese.",
        "Sadržaj povezan s boothovima, kao što su bilješke, zadaci, kontakti, fotografije, videozapisi, dokumenti i povezani metapodaci.",
        "Osnovne analitičke i dijagnostičke informacije za poboljšanje stabilnosti i upotrebljivosti aplikacije.",
      ],
    },
    {
      title: "Firebase usluge",
      paragraphs: [
        "MessePilot koristi Firebase usluge za autentifikaciju, funkcije baze podataka i analitiku. Autentifikacija može koristiti Apple, Google ili e-mail/lozinku ovisno o verziji aplikacije. Firestore čuva metapodatke računa, profila, boothova i privitaka potrebne za rad aplikacije.",
      ],
    },
    {
      title: "Fotografije, videozapisi i dokumenti",
      paragraphs: [
        "U trenutačnoj arhitekturi MessePilot ne prenosi fotografije, videozapise ili dokumente kao stvarne datoteke na MessePilot ili Firebase poslužitelje. Medijske i dokument datoteke ostaju na korisnikovu uređaju i/ili u privatnom iCloud spremniku kada to operativni sustav omogućuje.",
        "MessePilot i njegovo osoblje ne mogu vidjeti sadržaj fotografija, videozapisa ili dokumenata koje korisnici čuvaju. Firestore može čuvati tehničke informacije i reference, kao što su interni ID, vrsta datoteke, status, veličina ili veza s povezanim boothom, kako bi aplikacija ispravno prikazala privitke.",
      ],
    },
    {
      title: "Odgovornost za korisnički sadržaj",
      paragraphs: [
        "Korisnici su odgovorni za informacije, bilješke, kontakte, datoteke, slike, videozapise, dokumente ili drugi sadržaj koji unose, čuvaju, obrađuju, dijele ili koriste u MessePilotu. MessePilot pruža tehničku funkcionalnost aplikacije i ne provjerava točnost ili zakonitost korisničkog sadržaja.",
      ],
    },
    {
      title: "Analitika i dijagnostika",
      paragraphs: [
        "MessePilot može prikupljati osnovne analitičke i dijagnostičke informacije radi razumijevanja korištenja aplikacije, poboljšanja stabilnosti i ispravljanja problema. Ove informacije ne koriste se za oglašavanje trećih strana.",
      ],
    },
    {
      title: "Zahtjevi za beta pristup",
      paragraphs: [
        "Ako zatražite pristup privatnoj beta verziji MessePilota, možemo obrađivati informacije koje dostavite, kao što su ime, e-mail, tvrtka, uloga, država, informacije o uređaju i razlog zahtjeva.",
        "Ove informacije koristimo za pregled zahtjeva, kontaktiranje u vezi s MessePilotom, upravljanje beta pristupom, pozivanje odobrenih testera i zaštitu integriteta privatne bete. Pristup se provjerava ručno i nije zajamčen.",
        "Informacije poslane uz beta zahtjev mogu se čuvati koliko je potrebno za upravljanje beta programom, komunikaciju, dokumentiranje odluka o pristupu i zaštitu od zloupotrebe. Brisanje možete zatražiti putem support@messepilot.ch, osim ako je čuvanje potrebno iz tehničkih, sigurnosnih ili pravnih razloga.",
      ],
    },
    {
      title: "Bez prodaje korisničkih podataka",
      paragraphs: [
        "MessePilot ne prodaje korisničke podatke i ne koristi ih za oglašavanje trećih strana.",
      ],
    },
    {
      title: "Brisanje podataka",
      paragraphs: [
        "Korisnici mogu zatražiti brisanje računa ili podataka kroz aplikaciju kada je dostupno ili kontaktiranjem podrške.",
      ],
    },
  ],
  hi: [
    {
      title: "सारांश",
      paragraphs: [
        "MessePilot उपयोगकर्ताओं को व्यापार मेलों की योजना बनाने और व्यक्तिगत booth जानकारी प्रबंधित करने में मदद करता है। यह गोपनीयता नीति बताती है कि ऐप का उपयोग करते समय कौन सा डेटा संसाधित किया जा सकता है।",
      ],
    },
    {
      title: "हम जो डेटा संसाधित करते हैं",
      paragraphs: [
        "ऐप संस्करण और उपयोगकर्ता द्वारा दर्ज जानकारी के आधार पर, MessePilot खाता, प्रोफाइल और उपयोगकर्ता-निर्मित सामग्री डेटा संसाधित कर सकता है।",
        "इसमें शामिल हो सकता है:",
      ],
      list: [
        "प्रमाणीकरण और खाता जानकारी, जैसे उपयोगकर्ता ID और ईमेल पता।",
        "प्रोफाइल जानकारी, जैसे नाम, फोन नंबर, पता या व्यावसायिक प्रोफाइल फ़ील्ड, यदि उपयोगकर्ता ने दर्ज किए हों।",
        "booth से जुड़ी सामग्री, जैसे नोट, कार्य, संपर्क, फोटो, वीडियो, दस्तावेज और संबंधित मेटाडेटा।",
        "ऐप स्थिरता और उपयोगिता सुधारने के लिए मूलभूत विश्लेषण और निदान जानकारी।",
      ],
    },
    {
      title: "Firebase सेवाएं",
      paragraphs: [
        "MessePilot प्रमाणीकरण, डेटाबेस कार्यों और विश्लेषण के लिए Firebase सेवाओं का उपयोग करता है। ऐप संस्करण के आधार पर प्रमाणीकरण Apple, Google या ईमेल/पासवर्ड का उपयोग कर सकता है। Firestore ऐप कार्यक्षमता के लिए आवश्यक खाता, प्रोफाइल, booth और अटैचमेंट मेटाडेटा संग्रहीत करता है।",
      ],
    },
    {
      title: "फोटो, वीडियो और दस्तावेज",
      paragraphs: [
        "वर्तमान संरचना में, MessePilot फोटो, वीडियो या दस्तावेजों को वास्तविक फाइलों के रूप में MessePilot या Firebase सर्वर पर अपलोड नहीं करता। मीडिया और दस्तावेज फाइलें उपयोगकर्ता के डिवाइस और/या निजी iCloud कंटेनर में रहती हैं, जब ऑपरेटिंग सिस्टम इसे सक्षम करता है।",
        "MessePilot और उसका स्टाफ उपयोगकर्ताओं द्वारा संग्रहीत फोटो, वीडियो या दस्तावेजों की सामग्री नहीं देख सकते। Firestore आंतरिक ID, फाइल प्रकार, स्थिति, आकार या संबंधित booth का लिंक जैसी तकनीकी जानकारी और संदर्भ संग्रहीत कर सकता है, ताकि ऐप अटैचमेंट सही ढंग से दिखा सके।",
      ],
    },
    {
      title: "उपयोगकर्ता सामग्री की जिम्मेदारी",
      paragraphs: [
        "उपयोगकर्ता उन जानकारियों, नोट, संपर्क, फाइलों, छवियों, वीडियो, दस्तावेजों या अन्य सामग्री के लिए जिम्मेदार हैं जिन्हें वे MessePilot में दर्ज, संग्रहीत, संसाधित, साझा या उपयोग करते हैं। MessePilot तकनीकी ऐप कार्यक्षमता प्रदान करता है और उपयोगकर्ता-निर्मित सामग्री की सटीकता या वैधता की समीक्षा नहीं करता।",
      ],
    },
    {
      title: "विश्लेषण और निदान",
      paragraphs: [
        "MessePilot ऐप उपयोग को समझने, स्थिरता सुधारने और समस्याएं ठीक करने के लिए मूलभूत विश्लेषण और निदान जानकारी एकत्र कर सकता है। यह जानकारी तृतीय-पक्ष विज्ञापन के लिए उपयोग नहीं की जाती।",
      ],
    },
    {
      title: "बीटा एक्सेस अनुरोध",
      paragraphs: [
        "यदि आप MessePilot निजी बीटा के लिए एक्सेस मांगते हैं, तो हम आपके अनुरोध में दी गई जानकारी संसाधित कर सकते हैं, जैसे नाम, ईमेल, कंपनी, भूमिका, देश, डिवाइस जानकारी और अनुरोध का कारण।",
        "हम इस जानकारी का उपयोग आपके अनुरोध की समीक्षा, MessePilot के बारे में आपसे संपर्क, बीटा एक्सेस प्रबंधन, स्वीकृत टेस्टर्स को आमंत्रित करने और निजी बीटा की अखंडता की रक्षा के लिए करते हैं। एक्सेस की समीक्षा मैन्युअल रूप से होती है और इसकी गारंटी नहीं है।",
        "बीटा अनुरोध के साथ भेजी गई जानकारी बीटा कार्यक्रम, संबंधित संचार, एक्सेस निर्णयों के दस्तावेज़ीकरण और दुरुपयोग से सुरक्षा के लिए आवश्यक अवधि तक रखी जा सकती है। आप support@messepilot.ch पर संपर्क कर हटाने का अनुरोध कर सकते हैं, जब तक तकनीकी, सुरक्षा या कानूनी कारणों से संरक्षण आवश्यक न हो।",
      ],
    },
    {
      title: "उपयोगकर्ता डेटा की बिक्री नहीं",
      paragraphs: [
        "MessePilot उपयोगकर्ता डेटा नहीं बेचता और तृतीय-पक्ष विज्ञापन के लिए उपयोगकर्ता डेटा का उपयोग नहीं करता।",
      ],
    },
    {
      title: "डेटा हटाना",
      paragraphs: [
        "उपयोगकर्ता उपलब्ध होने पर ऐप के माध्यम से या सहायता से संपर्क कर खाते या डेटा को हटाने का अनुरोध कर सकते हैं।",
      ],
    },
  ],
};

export const privacyPageCopyByLocale: Record<WebsiteLocaleCode, PrivacyPageCopy> = {
  en: {
    title: "Privacy Policy | MessePilot",
    description: "Privacy Policy for the MessePilot app.",
    eyebrow: "Privacy",
    headline: "Privacy Policy",
    intro:
      "MessePilot is a trade fair planning app for managing fairs, booths, notes, tasks, contacts and media attachments.",
    lastUpdated: "Last updated: May 1, 2026",
    sections: privacySections.en,
    contactTitle: "Contact",
    contactText: "For privacy questions or deletion requests, contact:",
  },
  de: {
    title: "Datenschutzerklärung | MessePilot",
    description: "Datenschutzerklärung für die MessePilot App.",
    eyebrow: "Datenschutz",
    headline: "Datenschutzerklärung",
    intro:
      "MessePilot ist eine App zur Planung von Messebesuchen und zur Verwaltung von Messen, Ständen, Notizen, Aufgaben, Kontakten und Medienanhängen.",
    lastUpdated: "Zuletzt aktualisiert: 1. Mai 2026",
    sections: privacySections.de,
    contactTitle: "Kontakt",
    contactText: "Bei Datenschutzfragen oder Löschanfragen kontaktiere uns unter:",
  },
  ja: {
    title: "プライバシーポリシー | MessePilot",
    description: "MessePilot アプリのプライバシーポリシー。",
    eyebrow: "プライバシー",
    headline: "プライバシーポリシー",
    intro:
      "MessePilot は、展示会、ブース、メモ、タスク、連絡先、メディア添付を管理するための展示会計画アプリです。",
    lastUpdated: "最終更新日：2026年5月1日",
    sections: privacySections.ja,
    contactTitle: "連絡先",
    contactText: "プライバシーに関する質問または削除リクエストは、以下までご連絡ください：",
  },
  es: {
    title: "Política de privacidad | MessePilot",
    description: "Política de privacidad de la app MessePilot.",
    eyebrow: "Privacidad",
    headline: "Política de privacidad",
    intro:
      "MessePilot es una app de planificación de ferias para gestionar ferias, booths, notas, tareas, contactos y archivos multimedia adjuntos.",
    lastUpdated: "Última actualización: 1 de mayo de 2026",
    sections: privacySections.es,
    contactTitle: "Contacto",
    contactText: "Para preguntas de privacidad o solicitudes de eliminación, contacta:",
  },
  fr: {
    title: "Politique de confidentialité | MessePilot",
    description: "Politique de confidentialité pour l'app MessePilot.",
    eyebrow: "Confidentialité",
    headline: "Politique de confidentialité",
    intro:
      "MessePilot est une app de planification de salons pour gérer salons, booths, notes, tâches, contacts et pièces jointes médias.",
    lastUpdated: "Dernière mise à jour : 1 mai 2026",
    sections: privacySections.fr,
    contactTitle: "Contact",
    contactText: "Pour les questions de confidentialité ou demandes de suppression, contactez :",
  },
  it: {
    title: "Informativa sulla privacy | MessePilot",
    description: "Informativa sulla privacy per l'app MessePilot.",
    eyebrow: "Privacy",
    headline: "Informativa sulla privacy",
    intro:
      "MessePilot è un'app per pianificare fiere e gestire fiere, booth, note, attività, contatti e allegati multimediali.",
    lastUpdated: "Ultimo aggiornamento: 1 maggio 2026",
    sections: privacySections.it,
    contactTitle: "Contatto",
    contactText: "Per domande sulla privacy o richieste di eliminazione, contatta:",
  },
  bs: {
    title: "Politika privatnosti | MessePilot",
    description: "Politika privatnosti za aplikaciju MessePilot.",
    eyebrow: "Privatnost",
    headline: "Politika privatnosti",
    intro:
      "MessePilot je aplikacija za planiranje sajmova i upravljanje sajmovima, boothovima, bilješkama, zadacima, kontaktima i medijskim prilozima.",
    lastUpdated: "Zadnje ažurirano: 1. maj 2026.",
    sections: privacySections.bs,
    contactTitle: "Kontakt",
    contactText: "Za pitanja o privatnosti ili zahtjeve za brisanje kontaktirajte:",
  },
  hr: {
    title: "Pravila privatnosti | MessePilot",
    description: "Pravila privatnosti za aplikaciju MessePilot.",
    eyebrow: "Privatnost",
    headline: "Pravila privatnosti",
    intro:
      "MessePilot je aplikacija za planiranje sajmova i upravljanje sajmovima, boothovima, bilješkama, zadacima, kontaktima i medijskim privitcima.",
    lastUpdated: "Zadnje ažurirano: 1. svibnja 2026.",
    sections: privacySections.hr,
    contactTitle: "Kontakt",
    contactText: "Za pitanja o privatnosti ili zahtjeve za brisanje kontaktirajte:",
  },
  hi: {
    title: "गोपनीयता नीति | MessePilot",
    description: "MessePilot ऐप की गोपनीयता नीति।",
    eyebrow: "गोपनीयता",
    headline: "गोपनीयता नीति",
    intro:
      "MessePilot व्यापार मेलों, booth, नोट, कार्य, संपर्क और मीडिया अटैचमेंट प्रबंधित करने के लिए एक व्यापार मेला योजना ऐप है।",
    lastUpdated: "अंतिम अपडेट: 1 मई 2026",
    sections: privacySections.hi,
    contactTitle: "संपर्क",
    contactText: "गोपनीयता प्रश्नों या हटाने के अनुरोधों के लिए संपर्क करें:",
  },
};

export function getFAQPageCopy(locale: string): FAQPageCopy {
  return copyForLocale(faqPageCopyByLocale, locale) as FAQPageCopy;
}

export function getSupportPageCopy(locale: string): SupportPageCopy {
  return copyForLocale(supportPageCopyByLocale, locale) as SupportPageCopy;
}

export function getPrivacyPageCopy(locale: string): PrivacyPageCopy {
  return copyForLocale(privacyPageCopyByLocale, locale) as PrivacyPageCopy;
}
