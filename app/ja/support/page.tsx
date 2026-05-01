import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support | MessePilot",
  description: "MessePilot のサポート情報。",
};

export default function JapaneseSupportPage() {
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
          MessePilot サポート
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-100">
          MessePilot に関するサポートが必要な場合は、ベータテスト、
          アカウントやログインの問題、ブースデータ、メディア添付、
          データ削除リクエストについてお問い合わせいただけます。
        </p>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-3xl border border-white/70 bg-white/90 p-6 shadow-sm backdrop-blur-xl">
          <h2 className="text-xl font-semibold text-slate-950">
            サポートに連絡
          </h2>
          <p className="mt-3 text-slate-700">
            サポート依頼、フィードバック、プライバシーに関するご質問は、
            メールでお問い合わせください。
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
            プライベートベータ
          </h2>
          <p className="mt-3 text-slate-700">
            MessePilot は現在、プライベートベータおよび初期リリース準備中です。
            アプリの改善と正式公開に向けた準備の中で、機能が変更される場合があります。
          </p>
        </div>
      </div>

      <div className="rounded-3xl border border-white/70 bg-white/90 p-6 shadow-sm backdrop-blur-xl">
        <h2 className="text-xl font-semibold text-slate-950">
          サポートできる内容
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700">
          <li>アカウントやログインに関する問題</li>
          <li>展示会やブース計画機能</li>
          <li>メモ、タスク、連絡先データ</li>
          <li>写真、動画、書類の添付</li>
          <li>アカウントまたはデータ削除リクエスト</li>
          <li>ベータ版に関するフィードバック</li>
        </ul>
      </div>
    </section>
  );
}
