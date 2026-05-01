import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | MessePilot",
  description: "Frequently asked questions about MessePilot.",
};

const faqSections = [
  {
    group: "Getting Started",
    categories: [
      {
        title: "General",
        items: [
          {
            question: "What is MessePilot?",
            answer:
              "MessePilot helps you plan and organize trade fair visits. You can keep fairs, booths, notes, tasks, contacts, photos, videos and documents together in one place.",
          },
          {
            question: "Who is MessePilot for?",
            answer:
              "MessePilot is useful for anyone who visits, plans or prepares trade fairs, including visitors, buyers, sales teams, suppliers, exhibitors and business travelers.",
          },
          {
            question: "Is MessePilot free?",
            answer:
              "MessePilot is currently available during beta and early release preparation. Future versions may include paid features or subscriptions.",
          },
        ],
      },
    ],
  },
  {
    group: "Account & Settings",
    categories: [
      {
        title: "Account & Sign-in",
        items: [
          {
            question: "Do I need an account?",
            answer:
              "Yes. MessePilot uses user accounts so your personal planning data can be linked to you and accessed again when you sign in.",
          },
          {
            question: "Which sign-in methods are supported?",
            answer:
              "Depending on the app version, MessePilot supports Sign in with Apple and email/password login. Google Sign-In is planned and may be added in a future version.",
          },
          {
            question: "Can I use MessePilot on multiple devices?",
            answer:
              "MessePilot is currently focused on the Apple ecosystem, including iPhone and iPad. You can sign in with the same account on supported Apple devices. Android is planned for a future version, but is not currently part of the supported platform scope.",
          },
          {
            question: "What happens if I use Sign in with Apple and hide my email address?",
            answer:
              "If you use Sign in with Apple and choose to hide your email address, Apple may provide a private relay email address. MessePilot will use the email address provided by Apple for account-related communication where applicable.",
          },
          {
            question: "Why can my access be restricted?",
            answer:
              "Access may be restricted in cases such as misuse, spam, fake accounts, security risks or violations of beta or usage conditions.",
          },
          {
            question: "How can I delete my account?",
            answer:
              "Where available, you can request account deletion directly in the app. If this option is not available in your app version, contact support at support@messepilot.ch.",
          },
        ],
      },
      {
        title: "Profile & Business Data",
        items: [
          {
            question: "What is the personal profile used for?",
            answer:
              "The personal profile stores optional information such as name, contact email, phone number, address, language, country and profile image.",
          },
          {
            question: "What is the business profile used for?",
            answer:
              "The business profile stores optional professional information such as company name, job title, department, website, business email, phone number and business address.",
          },
        ],
      },
    ],
  },
  {
    group: "Planning Fairs",
    categories: [
      {
        title: "Fair Planning",
        items: [
          {
            question: "What does fair relevance mean?",
            answer:
              "Fair relevance helps you decide whether a trade fair is important for your personal or business planning.",
          },
          {
            question: "Can trade fair data change over time?",
            answer:
              "Yes. Dates, venues and details can change. Always check the official fair website before making travel or business decisions.",
          },
        ],
      },
      {
        title: "Trade Fair Data",
        items: [
          {
            question: "Where does the trade fair information come from?",
            answer:
              "MessePilot focuses on factual trade fair information such as name, city, country, date, venue, category and official website links. Important details should always be checked on the official fair website.",
          },
          {
            question: "Is MessePilot responsible for content on linked websites?",
            answer:
              "No. MessePilot may link to external websites such as official fair websites, organizer pages or other third-party sources. MessePilot is not responsible or liable for the content, availability, accuracy, timeliness or changes on external websites.",
          },
          {
            question: "Is MessePilot officially affiliated with listed trade fairs?",
            answer:
              "Not automatically. MessePilot may link to official fair websites, but is not automatically an official representative, organizer or partner of a listed trade fair unless explicitly stated.",
          },
          {
            question: "Can I report incorrect fair information?",
            answer:
              "Yes. If you notice incorrect or outdated fair information, you can contact MessePilot at support@messepilot.ch or info@messepilot.ch.",
          },
        ],
      },
    ],
  },
  {
    group: "Booths & Follow-up",
    categories: [
      {
        title: "Booths",
        items: [
          {
            question: "What is a booth in MessePilot?",
            answer:
              "A booth is your personal record for an exhibitor, supplier, partner or company you want to remember during a trade fair.",
          },
          {
            question: "What can I store inside a booth?",
            answer:
              "A booth can contain contacts, notes, tasks, tags, photos, videos and documents.",
          },
        ],
      },
      {
        title: "Booth Contacts",
        items: [
          {
            question: "What is a booth contact?",
            answer:
              "A booth contact is a person you met or want to remember in relation to a booth.",
          },
          {
            question: "Are booth contacts the same as my phone contacts?",
            answer:
              "No. Booth contacts are entries created inside MessePilot. MessePilot does not need to import your device address book for this.",
          },
          {
            question: "Can I export booth contacts to my phone contacts?",
            answer:
              "Depending on the app version, you may be able to export booth contacts to your device address book or use native sharing options. Export only happens through a deliberate user action and not automatically.",
          },
          {
            question: "Can I use booth contacts for follow-ups?",
            answer:
              "Yes. Booth contacts help you remember people, conversations and next steps after a trade fair.",
          },
        ],
      },
      {
        title: "Notes & Tasks",
        items: [
          {
            question: "Can I add notes and tasks?",
            answer:
              "Yes. Notes help you capture important information, while tasks help you track follow-ups and important actions before, during or after a fair visit.",
          },
        ],
      },
    ],
  },
  {
    group: "Files & Storage",
    categories: [
      {
        title: "Media & Attachments",
        items: [
          {
            question: "Where are my photos, videos and documents stored?",
            answer:
              "Media and document files are stored locally on your device and/or in your private iCloud container, depending on your device settings and iCloud availability.",
          },
          {
            question: "Are my files stored on MessePilot servers?",
            answer:
              "In the current architecture, MessePilot does not upload your photos, videos or documents as actual files to MessePilot or Firebase servers. The files remain on your device and/or in your private iCloud container. MessePilot and its staff cannot view the contents of your photos, videos or documents. Firestore only stores technical information and references, such as an internal ID, file type, status, file size or the link to the related booth. This information helps the app display attachments correctly and connect them to the right booth.",
          },
          {
            question: "Can I add third-party brochures, logos or images?",
            answer:
              "You should only add files that you are allowed to store and use. Users are responsible for ensuring that stored or processed content does not infringe third-party rights. MessePilot does not grant rights to copyrighted material such as logos, brochures, images or third-party documents.",
          },
          {
            question: "What happens if I delete an attachment?",
            answer:
              "When an attachment is deleted, MessePilot may update or remove the related metadata and hide or remove the attachment in the app. Deleted data and removed files cannot be restored by MessePilot or its staff. Files stored locally or in iCloud may additionally depend on operating system behavior and your iCloud settings.",
          },
          {
            question: "What happens if a file is missing on my device?",
            answer:
              "If a file is not available locally, MessePilot may try to make it available from your private iCloud container if it exists there and iCloud is functioning correctly.",
          },
        ],
      },
      {
        title: "iCloud & Local Storage",
        items: [
          {
            question: "Do I need iCloud?",
            answer:
              "iCloud is useful for keeping media and documents available through your private Apple storage, but exact behavior depends on your device and system settings.",
          },
          {
            question: "Can MessePilot guarantee that iCloud files are always available immediately?",
            answer:
              "No. If iCloud needs to download a file, availability may depend on network conditions, device settings and iCloud system behavior.",
          },
        ],
      },
    ],
  },
  {
    group: "Privacy & Data",
    categories: [
      {
        title: "Privacy & Data",
        items: [
          {
            question: "What data is stored in Firebase?",
            answer:
              "MessePilot uses Firebase for authentication, database functionality and basic analytics. This can include account data, profile data, booth data, notes, tasks, contacts, attachment metadata and basic analytics.",
          },
          {
            question: "Does MessePilot sell user data?",
            answer: "No. MessePilot does not sell user data.",
          },
          {
            question: "Does MessePilot use user data for advertising?",
            answer:
              "No. MessePilot does not use user data for third-party advertising.",
          },
          {
            question: "Who can see my personal planning data?",
            answer:
              "Your personal planning data is linked to your account and is not intended to be visible to other users. MessePilot and its staff cannot view your personal planning content such as booth data, notes, tasks, contacts or media content. Access is limited by technical and security rules.",
          },
          {
            question: "Can deleted data be restored?",
            answer:
              "No. Data deleted by the user or removed as part of account deletion cannot be restored by MessePilot or its staff. Technical backups or system-level copies may exist for a limited time, but they are not intended as a recovery service for users.",
          },
          {
            question: "Is MessePilot responsible for content users store or process in the app?",
            answer:
              "No. Users are responsible for the information, notes, contacts, files, images, videos, documents or other content they enter, store, process or use in MessePilot. MessePilot only provides the technical app functionality and cannot be held responsible or liable for user-generated content, its legality, accuracy, completeness or use.",
          },
          {
            question: "Where can I find the privacy policy?",
            answer:
              "You can find the privacy policy on the MessePilot website in the Privacy section.",
          },
        ],
      },
    ],
  },
  {
    group: "Languages, Beta & Support",
    categories: [
      {
        title: "Languages",
        items: [
          {
            question: "Is MessePilot available in multiple languages?",
            answer:
              "MessePilot is designed for multiple languages. The currently fully supported app languages are English, German and Japanese.",
          },
        ],
      },
      {
        title: "Beta & Feedback",
        items: [
          {
            question: "Is MessePilot still in beta?",
            answer:
              "MessePilot is currently in beta and early release preparation. Features, design and availability may change as the app improves.",
          },
          {
            question: "How can I request beta access?",
            answer:
              "You can request beta access by email through the MessePilot website. Access is reviewed manually and is not automatically guaranteed.",
          },
          {
            question: "Is beta access guaranteed?",
            answer:
              "No. MessePilot is currently in private beta. Requests are reviewed manually and access may be declined depending on test phase, capacity, target group or security considerations.",
          },
          {
            question: "Can I share screenshots, TestFlight links or unpublished features?",
            answer:
              "No. Private beta content, screenshots, unpublished features, internal test details and access links may not be published, forwarded or shared with third parties without prior written permission.",
          },
          {
            question: "How can I send feedback?",
            answer:
              "You can send feedback through TestFlight where available or contact support at support@messepilot.ch.",
          },
        ],
      },
      {
        title: "Support",
        items: [
          {
            question: "How can I contact support?",
            answer:
              "You can contact MessePilot support by email at support@messepilot.ch.",
          },
          {
            question: "How can trade fair organizers or partners contact MessePilot?",
            answer:
              "For general, business or organizer-related questions, contact info@messepilot.ch.",
          },
          {
            question: "What should I include in a support request?",
            answer:
              "If possible, include your device type, iOS version, app version, a short description of the issue and screenshots if helpful.",
          },
          {
            question: "Is support available in all languages?",
            answer:
              "MessePilot supports multiple app languages. Support responses may not always be available immediately in every language.",
          },
        ],
      },
    ],
  },
];

export default function FAQPage() {
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
          Find answers about your account, fair planning, booths, files,
          privacy and support.
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
