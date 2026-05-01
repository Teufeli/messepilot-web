import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー | MessePilot",
  description: "MessePilot アプリのプライバシーポリシー。",
};

export default function JapanesePrivacyPage() {
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
          Privacy
        </p>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          プライバシーポリシー
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-100">
          MessePilot は、展示会、ブース、メモ、タスク、連絡先、メディア添付を管理するための展示会計画アプリです。
        </p>
        <p className="mt-3 text-sm text-slate-500">
          最終更新日：2026年5月1日
        </p>
        </div>
      </div>

      <div className="max-w-4xl rounded-3xl border border-white/70 bg-white/90 p-8 shadow-sm backdrop-blur-xl sm:p-10">
        <h2 className="text-2xl font-semibold text-slate-950">概要</h2>
        <p className="mt-2 leading-7 text-slate-700">
          MessePilot は、ユーザーが展示会を計画し、個人のブース情報を管理するためのアプリです。
          このプライバシーポリシーでは、アプリの利用時に処理される可能性のあるデータについて説明します。
        </p>

        <h2 className="mt-8 text-2xl font-semibold text-slate-950">
          処理するデータ
        </h2>
        <p className="mt-2 leading-7 text-slate-700">
          アプリのバージョンおよびユーザーが入力する情報に応じて、MessePilot はアカウント、プロフィール、ユーザー作成コンテンツに関するデータを処理する場合があります。
        </p>
        <p className="mt-2 leading-7 text-slate-700">
          これには以下が含まれる場合があります。
        </p>
        <ul className="mt-2 list-disc space-y-2 pl-6 text-slate-700">
          <li>ユーザーIDやメールアドレスなどの認証およびアカウント情報。</li>
          <li>
            ユーザーが入力した場合の氏名、電話番号、住所、ビジネスプロフィール項目などのプロフィール情報。
          </li>
          <li>
            メモ、タスク、連絡先、写真、動画、書類、および関連メタデータなどのブース関連コンテンツ。
          </li>
          <li>
            アプリの安定性と使いやすさを改善するための基本的な分析および診断情報。
          </li>
        </ul>

        <h2 className="mt-8 text-2xl font-semibold text-slate-950">
          Firebase サービス
        </h2>
        <p className="mt-2 leading-7 text-slate-700">
          MessePilot は、認証、データベース機能、分析のために Firebase サービスを使用します。
          認証はアプリのバージョンに応じて、Apple、Google、またはメールアドレスとパスワードを使用する場合があります。
          Firestore は、アプリ機能に必要なアカウント、プロフィール、ブース、添付ファイルのメタデータを保存します。
        </p>

        <h2 className="mt-8 text-2xl font-semibold text-slate-950">
          写真、動画、書類
        </h2>
        <p className="mt-2 leading-7 text-slate-700">
          現在の構成では、MessePilot は写真、動画、書類を実際のファイルとして
          MessePilot または Firebase のサーバーへアップロードしません。
          メディアおよび書類ファイルは、OS によって有効化されている場合、
          ユーザーの端末上および／またはユーザーのプライベート iCloud コンテナに保存されます。
        </p>
        <p className="mt-2 leading-7 text-slate-700">
          MessePilot およびそのスタッフは、ユーザーが保存した写真、動画、書類の内容を閲覧できません。
          Firestore には、内部ID、ファイル種類、ステータス、ファイルサイズ、関連するブースとの紐付けなど、
          技術的な情報と参照が保存される場合があります。これにより、アプリは添付ファイルを正しく表示し、
          適切なブースに関連付けることができます。
        </p>

        <h2 className="mt-8 text-2xl font-semibold text-slate-950">
          ユーザーコンテンツに関する責任
        </h2>
        <p className="mt-2 leading-7 text-slate-700">
          MessePilot に入力、保存、処理、共有、またはその他の方法で利用する情報、
          メモ、連絡先、ファイル、画像、動画、書類、その他のコンテンツについては、
          ユーザー自身が責任を負います。MessePilot は技術的なアプリ機能を提供するものであり、
          ユーザー生成コンテンツの正確性または合法性を審査するものではありません。
          MessePilot は、そのようなコンテンツ、その合法性、正確性、完全性、利用、
          または利用の結果について責任または法的責任を負いません。
        </p>

        <h2 className="mt-8 text-2xl font-semibold text-slate-950">
          分析と診断
        </h2>
        <p className="mt-2 leading-7 text-slate-700">
          MessePilot は、アプリの利用状況を理解し、安定性を改善し、問題を修正するために、基本的な分析および診断情報を収集する場合があります。
          この情報は第三者広告のためには使用されません。
        </p>

        <h2 className="mt-8 text-2xl font-semibold text-slate-950">
          ベータアクセス申請
        </h2>
        <p className="mt-2 leading-7 text-slate-700">
          MessePilot のプライベートベータへのアクセスを申請する場合、申請時に提供された情報を処理する場合があります。
          これには、氏名、メールアドレス、会社名、役割、国、端末情報、ベータアクセスを希望する理由などが含まれます。
        </p>
        <p className="mt-2 leading-7 text-slate-700">
          これらの情報は、申請の審査、MessePilot に関する連絡、ベータアクセスの管理、承認されたテスターの招待、プライベートベータの完全性を保護するために使用されます。
          ベータへのアクセスは手動で審査され、保証されるものではありません。
        </p>
        <p className="mt-2 leading-7 text-slate-700">
          ベータアクセス申請に含まれる情報は、ベータプログラムの管理、関連する連絡の対応、アクセス判断の記録、不正利用からの保護に必要な期間保存される場合があります。
          技術上、セキュリティ上、または法的な理由で保存が必要な場合を除き、support@messepilot.ch まで連絡することで、ベータアクセス申請データの削除を依頼できます。
        </p>

        <h2 className="mt-8 text-2xl font-semibold text-slate-950">
          ユーザーデータの販売なし
        </h2>
        <p className="mt-2 leading-7 text-slate-700">
          MessePilot はユーザーデータを販売せず、ユーザーデータを第三者広告のために使用しません。
        </p>

        <h2 className="mt-8 text-2xl font-semibold text-slate-950">
          データ削除
        </h2>
        <p className="mt-2 leading-7 text-slate-700">
          ユーザーは、利用可能な場合はアプリ内から、またはサポートに連絡することで、アカウントまたはデータ削除をリクエストできます。
        </p>

        <h2 className="mt-8 text-2xl font-semibold text-slate-950">連絡先</h2>
        <p className="mt-2 leading-7 text-slate-700">
          プライバシーに関する質問または削除リクエストは、以下までご連絡ください：{" "}
          <a
            className="font-medium text-slate-900 underline"
            href="mailto:support@messepilot.ch"
          >
            support@messepilot.ch
          </a>
        </p>
      </div>
    </section>
  );
}
