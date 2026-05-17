import type { PrivacyPageCopy } from "@/lib/website/staticPageCopy";

type PrivacyPageContentProps = {
  copy: PrivacyPageCopy;
};

export function PrivacyPageContent({ copy }: PrivacyPageContentProps) {
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
            {copy.eyebrow}
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            {copy.headline}
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-100">
            {copy.intro}
          </p>
          <p className="mt-3 text-sm text-slate-300">{copy.lastUpdated}</p>
        </div>
      </div>

      <div className="max-w-4xl rounded-3xl border border-white/70 bg-white/90 p-8 shadow-sm backdrop-blur-xl sm:p-10">
        {copy.sections.map((section, index) => (
          <section key={section.title} className={index === 0 ? "" : "mt-8"}>
            <h2 className="text-2xl font-semibold text-slate-950">
              {section.title}
            </h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-2 leading-7 text-slate-700">
                {paragraph}
              </p>
            ))}
            {section.list ? (
              <ul className="mt-2 list-disc space-y-2 pl-6 text-slate-700">
                {section.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}

        <section className="mt-8">
          <h2 className="text-2xl font-semibold text-slate-950">
            {copy.contactTitle}
          </h2>
          <p className="mt-2 leading-7 text-slate-700">
            {copy.contactText}{" "}
            <a
              className="font-medium text-slate-900 underline"
              href="mailto:support@messepilot.ch"
            >
              support@messepilot.ch
            </a>
          </p>
        </section>
      </div>
    </section>
  );
}
