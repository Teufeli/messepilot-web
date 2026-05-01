import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MessePilot | 展示会の計画をシンプルに",
  description:
    "MessePilot helps users plan trade fairs and manage booths, notes, tasks, contacts and attachments.",
};

export default function JapaneseHome() {
  return (
    <section className="space-y-8">
      <div
        className="relative overflow-hidden rounded-[2rem] border border-white/60 shadow-[0_20px_60px_rgba(15,23,42,0.2)]"
        style={{
          backgroundImage: "url('/background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-slate-900/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/55 via-slate-900/35 to-transparent" />
        <div className="relative space-y-5 px-8 py-20 sm:px-12 sm:py-24">
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-slate-100">
            MessePilot
          </p>
          <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            展示会の計画をシンプルに。
          </h1>
          <p className="max-w-2xl text-base leading-7 text-slate-100 sm:text-lg">
            MessePilot は、展示会、ブース、メモ、タスク、連絡先、写真、
            動画、書類をひとつの場所で整理するためのアプリです。
          </p>
        </div>
      </div>

      <div className="max-w-3xl space-y-4">
        <Link
          href="mailto:support@messepilot.ch?subject=MessePilot%20Beta%20Access%20Request&body=Hello%20MessePilot%20Team%2C%0A%0AI%20would%20like%20to%20request%20access%20to%20the%20MessePilot%20private%20beta.%0A%0AName%3A%0ACompany%3A%0ARole%3A%0ACountry%3A%0ADevice%3A%0AReason%20for%20beta%20access%3A%0A%0ABy%20submitting%20this%20request%2C%20I%20confirm%20that%20the%20information%20provided%20may%20be%20used%20to%20review%20my%20beta%20access%20request%2C%20contact%20me%20regarding%20MessePilot%20and%20manage%20my%20beta%20participation.%0A%0AI%20understand%20that%20MessePilot%20is%20currently%20in%20private%20beta.%20I%20agree%20to%20treat%20all%20non-public%20information%2C%20screenshots%2C%20unpublished%20features%2C%20internal%20test%20details%2C%20access%20links%20and%20beta-related%20material%20as%20confidential.%20I%20will%20not%20copy%2C%20publish%2C%20forward%2C%20distribute%20or%20otherwise%20share%20such%20information%20with%20third%20parties%20without%20prior%20written%20permission.%0A%0ABest%20regards%0A"
          className="inline-flex rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          ベータアクセスを申請
        </Link>
        <p className="max-w-2xl text-sm leading-6 text-slate-600">
          MessePilot は現在、プライベートベータ版です。アクセスは手動で審査されます。
          申請時に提供された情報は、ベータアクセスの審査、MessePilot に関する連絡、
          およびベータ参加の管理に使用される場合があります。スクリーンショット、
          未公開機能、内部テスト情報、アクセスリンクを事前の許可なく公開または共有しないでください。
        </p>
      </div>
    </section>
  );
}
