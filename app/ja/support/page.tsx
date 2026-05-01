import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support | MessePilot",
  description: "MessePilot のサポート情報。",
};

export default function JapaneseSupportPage() {
  return (
    <section className="space-y-8">
      <div className="rounded-3xl border border-white/70 bg-white/85 p-8 shadow-sm backdrop-blur-xl sm:p-10">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
          Support
        </p>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
          MessePilot サポート
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-700">
          MessePilot に関するサポートが必要な場合は、ベータテスト、
          アカウントやログインの問題、ブースデータ、メディア添付、
          データ削除リクエストについてお問い合わせいただけます。
        </p>
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
