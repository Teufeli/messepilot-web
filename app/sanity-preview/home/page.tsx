import {client} from "@/sanity/lib/client";

type WebsitePageTranslation = {
  languageCode?: string;
  seoTitle?: string;
  seoDescription?: string;
  heroEyebrow?: string;
  heroTitle?: string;
  heroText?: string;
  primaryButtonLabel?: string;
  primaryButtonHref?: string;
  primaryButtonNote?: string;
};

type WebsitePage = {
  _id: string;
  pageKey?: string;
  status?: string;
  translations?: WebsitePageTranslation[];
};

const languageNames: Record<string, string> = {
  en: "English",
  de: "Deutsch",
  ja: "日本語",
};

async function getHomePage(): Promise<WebsitePage | null> {
  return client.fetch(
    `*[_type == "websitePage" && pageKey == "home"][0]{
      _id,
      pageKey,
      status,
      translations[]{
        languageCode,
        seoTitle,
        seoDescription,
        heroEyebrow,
        heroTitle,
        heroText,
        primaryButtonLabel,
        primaryButtonHref,
        primaryButtonNote
      }
    }`,
    {},
    {cache: "no-store"},
  );
}

export default async function SanityHomePreviewPage() {
  const page = await getHomePage();

  return (
    <section className="space-y-8">
      <div className="rounded-3xl border border-white/70 bg-white/90 p-6 shadow-sm backdrop-blur-xl sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
          Sanity Preview
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          Website Page: Home
        </h1>
        <p className="mt-3 max-w-3xl leading-7 text-slate-700">
          This debug page reads the Sanity document for <strong>pageKey = home</strong>.
          It does not replace the real homepage.
        </p>
      </div>

      {!page ? (
        <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-900">
          No Sanity websitePage document found for pageKey = home.
        </div>
      ) : (
        <>
          <div className="rounded-3xl border border-white/70 bg-white/90 p-6 shadow-sm backdrop-blur-xl">
            <dl className="grid gap-4 sm:grid-cols-3">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                  Document ID
                </dt>
                <dd className="mt-1 break-all font-mono text-sm text-slate-800">
                  {page._id}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                  Page Key
                </dt>
                <dd className="mt-1 text-sm font-semibold text-slate-800">
                  {page.pageKey ?? "—"}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                  Status Field
                </dt>
                <dd className="mt-1 text-sm font-semibold text-slate-800">
                  {page.status ?? "—"}
                </dd>
              </div>
            </dl>
          </div>

          <div className="grid gap-5">
            {(page.translations ?? []).map((translation) => {
              const languageCode = translation.languageCode ?? "unknown";

              return (
                <article
                  key={languageCode}
                  className="rounded-3xl border border-white/70 bg-white/90 p-6 shadow-sm backdrop-blur-xl sm:p-8"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                        Translation
                      </p>
                      <h2 className="mt-1 text-2xl font-semibold text-slate-950">
                        {languageNames[languageCode] ?? languageCode}
                      </h2>
                    </div>
                    <span className="rounded-full bg-slate-950 px-3 py-1 text-sm font-semibold text-white">
                      {languageCode}
                    </span>
                  </div>

                  <div className="mt-6 space-y-5">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                        SEO
                      </p>
                      <p className="mt-2 font-semibold text-slate-900">
                        {translation.seoTitle || "—"}
                      </p>
                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        {translation.seoDescription || "—"}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-950 p-5 text-white">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-300">
                        {translation.heroEyebrow || "—"}
                      </p>
                      <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                        {translation.heroTitle || "—"}
                      </h3>
                      <p className="mt-3 leading-7 text-slate-200">
                        {translation.heroText || "—"}
                      </p>
                      {translation.primaryButtonLabel ? (
                        <div className="mt-5 space-y-3">
                          <p className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950">
                            {translation.primaryButtonLabel}
                            {translation.primaryButtonHref
                              ? ` → ${translation.primaryButtonHref}`
                              : ""}
                          </p>
                          {translation.primaryButtonNote ? (
                            <p className="max-w-2xl text-sm leading-6 text-slate-300">
                              {translation.primaryButtonNote}
                            </p>
                          ) : null}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
}
