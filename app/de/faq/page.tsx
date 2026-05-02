import type { Metadata } from "next";
import { getWebsiteFAQSections } from "@/lib/helpCenter";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "FAQ | MessePilot",
  description: "Häufig gestellte Fragen zu MessePilot.",
};

export default async function GermanFAQPage() {
  const faqSections = await getWebsiteFAQSections("de");

  return (
    <section className="space-y-8">
      <div
        className="relative overflow-hidden rounded-[2rem] border border-white/60 shadow-[0_20px_60px_rgba(15,23,42,0.18)]"
        style={{
          backgroundImage: "url('/background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-slate-900/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/60 via-slate-900/35 to-transparent" />
        <div className="relative space-y-4 px-8 py-16 sm:px-12 sm:py-20">
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-slate-100">
            FAQ
          </p>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Häufig gestellte Fragen
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-slate-100">
            Antworten auf häufige Fragen zu MessePilot, Beta-Zugang,
            Datenschutz, Dateien, Ständen und Support.
          </p>
        </div>
      </div>

      <div className="space-y-6 rounded-3xl border border-white/70 bg-white/90 p-8 shadow-sm backdrop-blur-xl sm:p-10">
        {faqSections.length === 0 ? (
          <div>
            <h2 className="text-2xl font-semibold text-slate-950">
              Noch keine veröffentlichten FAQs
            </h2>
            <p className="mt-2 leading-7 text-slate-700">
              Die FAQ-Inhalte werden aktuell vorbereitet.
            </p>
          </div>
        ) : (
          faqSections.map((section) => (
            <section key={section.group} className="space-y-5">
              <h2 className="text-2xl font-semibold text-slate-950">
                {section.group}
              </h2>

              <div className="space-y-6">
                {section.categories.map((category) => (
                  <div
                    key={`${section.group}-${category.title}`}
                    className="rounded-2xl border border-slate-200 bg-white/80 p-5"
                  >
                    <h3 className="text-lg font-semibold text-slate-950">
                      {category.title}
                    </h3>

                    <div className="mt-4 space-y-5">
                      {category.items.map((item) => (
                        <div key={item.question}>
                          <h4 className="font-semibold text-slate-950">
                            {item.question}
                          </h4>
                          <p className="mt-1 leading-7 text-slate-700">
                            {item.answer}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))
        )}
      </div>
    </section>
  );
}
