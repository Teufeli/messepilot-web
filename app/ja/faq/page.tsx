import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | MessePilot",
  description: "MessePilot に関するよくある質問。",
};

const faqSections = [
  {
    group: "はじめに",
    categories: [
      {
        title: "概要",
        items: [
          {
            question: "MessePilot とは何ですか？",
            answer:
              "MessePilot は、展示会の訪問計画を立て、展示会、ブース、メモ、タスク、連絡先、写真、動画、書類をひとつの場所で整理するためのアプリです。",
          },
          {
            question: "MessePilot は誰のためのアプリですか？",
            answer:
              "MessePilot は、展示会を訪問、計画、準備する人のためのアプリです。来場者、購買担当者、営業チーム、サプライヤー、出展者、出張者などに役立ちます。",
          },
          {
            question: "MessePilot は無料ですか？",
            answer:
              "MessePilot は現在、ベータ版および初期リリース準備期間中に利用できます。将来のバージョンでは、有料機能やサブスクリプションが含まれる場合があります。",
          },
        ],
      },
    ],
  },
  {
    group: "アカウントと設定",
    categories: [
      {
        title: "アカウントとサインイン",
        items: [
          {
            question: "アカウントは必要ですか？",
            answer:
              "はい。MessePilot はユーザーアカウントを使用し、個人の計画データをアカウントに関連付けて、再度サインインしたときに利用できるようにします。",
          },
          {
            question: "どのサインイン方法に対応していますか？",
            answer:
              "アプリのバージョンによって、Apple でサインイン、Google サインイン、メールアドレスとパスワードでのログインに対応する場合があります。",
          },
          {
            question: "アカウントを削除するにはどうすればよいですか？",
            answer:
              "利用可能な場合は、アプリ内からアカウント削除をリクエストできます。お使いのアプリバージョンでこの機能が利用できない場合は、support@messepilot.ch までお問い合わせください。",
          },
        ],
      },
      {
        title: "プロフィールとビジネス情報",
        items: [
          {
            question: "個人プロフィールは何に使われますか？",
            answer:
              "個人プロフィールには、氏名、連絡先メールアドレス、電話番号、住所、言語、国、プロフィール画像などの任意情報を保存できます。",
          },
          {
            question: "ビジネスプロフィールは何に使われますか？",
            answer:
              "ビジネスプロフィールには、会社名、役職、部署、ウェブサイト、業務用メールアドレス、電話番号、会社住所などの任意の業務情報を保存できます。",
          },
        ],
      },
    ],
  },
  {
    group: "展示会の計画",
    categories: [
      {
        title: "展示会の計画",
        items: [
          {
            question: "展示会の関連性とは何ですか？",
            answer:
              "展示会の関連性は、その展示会が個人または業務上の計画にとって重要かどうかを判断するためのものです。",
          },
          {
            question: "展示会情報は変更されることがありますか？",
            answer:
              "はい。日程、会場、詳細情報は変更される場合があります。出張や業務上の判断を行う前に、必ず公式展示会ウェブサイトで重要な情報を確認してください。",
          },
        ],
      },
      {
        title: "展示会データ",
        items: [
          {
            question: "展示会情報はどこから取得されますか？",
            answer:
              "MessePilot は、名称、都市、国、日程、会場、カテゴリ、公式ウェブサイトリンクなどの事実に基づく展示会情報を扱います。重要な詳細は必ず公式展示会ウェブサイトで確認してください。",
          },
        ],
      },
    ],
  },
  {
    group: "ブースとフォローアップ",
    categories: [
      {
        title: "ブース",
        items: [
          {
            question: "MessePilot のブースとは何ですか？",
            answer:
              "ブースは、展示会で記録しておきたい出展者、サプライヤー、パートナー、企業のための個人的な記録です。",
          },
          {
            question: "ブースには何を保存できますか？",
            answer:
              "ブースには、連絡先、メモ、タスク、タグ、写真、動画、書類を保存できます。",
          },
        ],
      },
      {
        title: "ブース連絡先",
        items: [
          {
            question: "ブース連絡先とは何ですか？",
            answer:
              "ブース連絡先は、ブースに関連して会った人、または記録しておきたい人の情報です。",
          },
          {
            question: "ブース連絡先は端末の連絡先と同じですか？",
            answer:
              "いいえ。ブース連絡先は MessePilot 内で作成される項目です。この目的のために MessePilot が端末のアドレス帳を読み込む必要はありません。",
          },
        ],
      },
      {
        title: "メモとタスク",
        items: [
          {
            question: "メモやタスクを追加できますか？",
            answer:
              "はい。メモは重要な情報を記録するために、タスクは展示会の前、開催中、開催後のフォローアップや重要なアクションを管理するために使用できます。",
          },
        ],
      },
    ],
  },
  {
    group: "ファイルと保存",
    categories: [
      {
        title: "メディアと添付ファイル",
        items: [
          {
            question: "写真、動画、書類はどこに保存されますか？",
            answer:
              "メディアや書類ファイルは、端末上および／またはユーザーのプライベート iCloud コンテナに保存されます。保存方法は端末設定と iCloud の利用状況によって異なります。",
          },
          {
            question: "ファイルは MessePilot のサーバーに保存されますか？",
            answer:
              "現在の構成では、MessePilot はメディアや書類ファイルを Firebase Storage または Firestore にバイナリファイルとして保存しません。ファイルを正しいブースに関連付けるために、関連メタデータを保存する場合があります。",
          },
        ],
      },
      {
        title: "iCloud とローカルストレージ",
        items: [
          {
            question: "iCloud は必要ですか？",
            answer:
              "iCloud は、メディアや書類をユーザーのプライベートな Apple ストレージ経由で利用できるようにするために役立ちます。ただし、実際の動作は端末とシステム設定によって異なります。",
          },
          {
            question: "iCloud ファイルは常にすぐ利用できますか？",
            answer:
              "いいえ。iCloud がファイルをダウンロードする必要がある場合、利用可能になるまでの時間はネットワーク状況、端末設定、iCloud の動作に依存します。",
          },
        ],
      },
    ],
  },
  {
    group: "プライバシーとデータ",
    categories: [
      {
        title: "プライバシーとデータ",
        items: [
          {
            question: "Firebase にはどのようなデータが保存されますか？",
            answer:
              "MessePilot は、認証、データベース機能、基本的な分析のために Firebase を使用します。これには、アカウントデータ、プロフィールデータ、ブースデータ、メモ、タスク、連絡先、添付ファイルのメタデータ、基本的な分析データが含まれる場合があります。",
          },
          {
            question: "MessePilot はユーザーデータを販売しますか？",
            answer: "いいえ。MessePilot はユーザーデータを販売しません。",
          },
          {
            question: "MessePilot はユーザーデータを広告に使用しますか？",
            answer:
              "いいえ。MessePilot はユーザーデータを第三者広告のために使用しません。",
          },
        ],
      },
    ],
  },
  {
    group: "言語、ベータ、サポート",
    categories: [
      {
        title: "言語",
        items: [
          {
            question: "MessePilot は複数の言語に対応していますか？",
            answer:
              "MessePilot は複数言語に対応するよう設計されています。現在、完全に対応しているアプリ言語は英語、ドイツ語、日本語です。",
          },
        ],
      },
      {
        title: "ベータとフィードバック",
        items: [
          {
            question: "MessePilot はまだベータ版ですか？",
            answer:
              "MessePilot は現在、ベータ版および初期リリース準備中です。アプリの改善に伴い、機能、デザイン、利用可能性が変更される場合があります。",
          },
          {
            question: "フィードバックはどのように送れますか？",
            answer:
              "利用可能な場合は TestFlight からフィードバックを送信できます。または support@messepilot.ch までお問い合わせください。",
          },
        ],
      },
      {
        title: "サポート",
        items: [
          {
            question: "サポートにはどう連絡できますか？",
            answer:
              "MessePilot サポートには support@messepilot.ch までメールでお問い合わせください。",
          },
          {
            question: "展示会主催者やパートナーはどこに連絡できますか？",
            answer:
              "一般的なお問い合わせ、ビジネス関連、または主催者関連のご質問は info@messepilot.ch までご連絡ください。",
          },
        ],
      },
    ],
  },
];

export default function JapaneseFAQPage() {
  return (
    <section className="space-y-8">
      <div className="rounded-3xl border border-white/70 bg-white/85 p-8 shadow-sm backdrop-blur-xl sm:p-10">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
          FAQ
        </p>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
          MessePilot ヘルプセンター
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-700">
          アカウント、展示会計画、ブース、ファイル、プライバシー、サポートに関する回答を確認できます。
        </p>
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
