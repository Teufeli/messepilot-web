import type { Metadata } from "next";
import { getWebsiteFAQSections } from "@/lib/helpCenter";

export const dynamic = "force-dynamic";

type LocalizedFAQPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

const localizedCopy: Record<
  string,
  {
    title: string;
    description: string;
    eyebrow: string;
    headline: string;
    intro: string;
    emptyTitle: string;
    emptyText: string;
  }
> = {
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
};

const fallbackCopy = {
  title: "FAQ | MessePilot",
  description: "Frequently asked questions about MessePilot.",
  eyebrow: "FAQ",
  headline: "Frequently Asked Questions",
  intro:
    "Answers to common questions about MessePilot, beta access, privacy, files, booths and support.",
  emptyTitle: "No published FAQs yet",
  emptyText: "FAQ content is currently being prepared.",
};

export async function generateMetadata({
  params,
}: LocalizedFAQPageProps): Promise<Metadata> {
  const { locale } = await params;
  const copy = localizedCopy[locale] ?? fallbackCopy;

  return {
    title: copy.title,
    description: copy.description,
  };
}

export default async function LocalizedFAQPage({
  params,
}: LocalizedFAQPageProps) {
  const { locale } = await params;
  const copy = localizedCopy[locale] ?? fallbackCopy;
  const faqSections = await getWebsiteFAQSections(locale);

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
            {copy.eyebrow}
          </p>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            {copy.headline}
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-slate-100">
            {copy.intro}
          </p>
        </div>
      </div>

      <div className="space-y-6 rounded-3xl border border-white/70 bg-white/90 p-8 shadow-sm backdrop-blur-xl sm:p-10">
        {faqSections.length === 0 ? (
          <div>
            <h2 className="text-2xl font-semibold text-slate-950">
              {copy.emptyTitle}
            </h2>
            <p className="mt-2 leading-7 text-slate-700">{copy.emptyText}</p>
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
