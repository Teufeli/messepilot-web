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
              "Depending on the app version, MessePilot may support Sign in with Apple, Google Sign-In and email/password login.",
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
              "In the current architecture, MessePilot does not store media or document files as binary files in Firebase Storage or Firestore. MessePilot may store related metadata so files can be linked to the correct booth.",
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
