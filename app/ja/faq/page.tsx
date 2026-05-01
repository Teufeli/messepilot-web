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
              "アプリのバージョンに応じて、MessePilot は Apple でサインインおよびメールアドレスとパスワードによるログインに対応します。Google ログインは計画中で、将来のバージョンで追加される場合があります。",
          },
          {
            question: "MessePilot は複数の端末で利用できますか？",
            answer:
              "MessePilot は現在、iPhone と iPad を含む Apple エコシステムを中心に提供されています。対応する Apple 端末では、同じアカウントでサインインできます。Android は将来計画されていますが、現在の対応プラットフォームには含まれていません。",
          },
          {
            question: "Apple でサインインしてメールを非公開にした場合はどうなりますか？",
            answer:
              "Apple でサインインする際にメールアドレスを非公開にすると、Apple がプライベートリレー用のメールアドレスを提供する場合があります。MessePilot は必要に応じて、Apple から提供されたメールアドレスをアカウント関連の連絡に使用します。",
          },
          {
            question: "なぜアクセスが制限されることがありますか？",
            answer:
              "不正利用、スパム、偽アカウント、セキュリティリスク、またはベータ版や利用条件への違反が確認された場合、アクセスが制限されることがあります。",
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
          {
            question: "MessePilot はリンク先ウェブサイトの内容に責任を負いますか？",
            answer:
              "いいえ。MessePilot は公式展示会ウェブサイト、主催者ページ、その他の第三者情報源などの外部ウェブサイトにリンクする場合があります。外部ウェブサイトの内容、利用可能性、正確性、最新性、または変更について、MessePilot は責任または法的責任を負いません。",
          },
          {
            question: "MessePilot は掲載されている展示会と公式に提携していますか？",
            answer:
              "必ずしもそうではありません。MessePilot は公式展示会ウェブサイトにリンクする場合がありますが、明示されていない限り、掲載されている展示会の公式代表、主催者、またはパートナーではありません。",
          },
          {
            question: "誤った展示会情報を報告できますか？",
            answer:
              "はい。誤った情報や古い展示会情報に気づいた場合は、support@messepilot.ch または info@messepilot.ch までご連絡ください。",
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
          {
            question: "ブース連絡先を端末の連絡先にエクスポートできますか？",
            answer:
              "アプリのバージョンによっては、ブース連絡先を端末のアドレス帳にエクスポートしたり、標準の共有機能で利用できる場合があります。エクスポートはユーザーの明示的な操作によってのみ行われ、自動では実行されません。",
          },
          {
            question: "ブース連絡先をフォローアップに使えますか？",
            answer:
              "はい。ブース連絡先は、展示会後に人物、会話内容、次のステップを把握するために役立ちます。",
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
              "現在の構成では、MessePilot は写真、動画、書類を実際のファイルとして MessePilot または Firebase のサーバーへアップロードしません。ファイルはユーザーの端末上および／またはプライベート iCloud コンテナ内に残ります。MessePilot およびそのスタッフは、写真、動画、書類の内容を閲覧できません。Firestore には、内部ID、ファイル種類、ステータス、ファイルサイズ、関連するブースとの紐付けなど、技術的な情報と参照のみが保存されます。これらの情報は、アプリが添付ファイルを正しく表示し、適切なブースに関連付けるために使用されます。",
          },
          {
            question: "第三者のパンフレット、ロゴ、画像を追加できますか？",
            answer:
              "保存および使用する権利のあるファイルのみを追加してください。保存または処理されるコンテンツが第三者の権利を侵害しないようにする責任はユーザーにあります。MessePilot は、ロゴ、パンフレット、画像、第三者の書類などの著作権で保護された素材に対する権利を付与しません。",
          },
          {
            question: "添付ファイルを削除するとどうなりますか？",
            answer:
              "添付ファイルを削除すると、MessePilot は関連メタデータを更新または削除し、アプリ内で添付ファイルを非表示または削除する場合があります。削除されたデータや削除されたファイルは、MessePilot またはそのスタッフによって復元することはできません。ローカルまたは iCloud に保存されたファイルは、OS の動作や iCloud 設定にも依存します。",
          },
          {
            question: "端末上でファイルが見つからない場合はどうなりますか？",
            answer:
              "ファイルがローカルで利用できない場合、MessePilot はそのファイルがユーザーのプライベート iCloud コンテナに存在し、iCloud が正常に機能している場合に、再び利用できるよう試みることがあります。",
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
          {
            question: "私の個人的な計画データは誰が見ることができますか？",
            answer:
              "個人的な計画データはユーザーのアカウントに関連付けられており、他のユーザーに表示されることを意図していません。MessePilot およびそのスタッフは、ブースデータ、メモ、タスク、連絡先、メディアコンテンツなどの個人的な計画内容を閲覧できません。アクセスは技術的およびセキュリティ上のルールによって制限されています。",
          },
          {
            question: "削除されたデータは復元できますか？",
            answer:
              "いいえ。ユーザーによって削除されたデータ、またはアカウント削除の一環として削除されたデータは、MessePilot またはそのスタッフによって復元することはできません。技術的なバックアップやシステム上のコピーが一定期間存在する場合がありますが、ユーザー向けの復元サービスとして提供されるものではありません。",
          },
          {
            question: "MessePilot はユーザーがアプリ内に保存または処理する内容に責任を負いますか？",
            answer:
              "いいえ。MessePilot に入力、保存、処理、利用する情報、メモ、連絡先、ファイル、画像、動画、書類、その他のコンテンツについてはユーザー自身が責任を負います。MessePilot は技術的なアプリ機能を提供するものであり、ユーザー生成コンテンツ、その合法性、正確性、完全性、または利用について責任または法的責任を負いません。",
          },
          {
            question: "プライバシーポリシーはどこで確認できますか？",
            answer:
              "プライバシーポリシーは MessePilot ウェブサイトのプライバシーセクションで確認できます。",
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
            question: "ベータアクセスを申請するにはどうすればよいですか？",
            answer:
              "MessePilot ウェブサイトからメールでベータアクセスを申請できます。アクセスは手動で審査され、自動的に保証されるものではありません。",
          },
          {
            question: "ベータアクセスは保証されますか？",
            answer:
              "いいえ。MessePilot は現在プライベートベータ版です。申請は手動で審査され、テスト段階、容量、対象ユーザー、またはセキュリティ上の理由によりアクセスが承認されない場合があります。",
          },
          {
            question: "スクリーンショット、TestFlight リンク、未公開機能を共有できますか？",
            answer:
              "いいえ。プライベートベータの内容、スクリーンショット、未公開機能、内部テスト情報、アクセスリンクは、事前の書面による許可なく公開、転送、または第三者と共有してはいけません。",
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
          {
            question: "サポート依頼には何を含めるべきですか？",
            answer:
              "可能であれば、端末の種類、iOS バージョン、アプリバージョン、問題の簡単な説明、役立つ場合はスクリーンショットを含めてください。",
          },
          {
            question: "すべての言語でサポートを受けられますか？",
            answer:
              "MessePilot は複数のアプリ言語に対応しています。ただし、サポート回答がすべての言語ですぐに利用できるとは限りません。",
          },
        ],
      },
    ],
  },
];

export default function JapaneseFAQPage() {
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
          MessePilot ヘルプセンター
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-100">
          アカウント、展示会計画、ブース、ファイル、プライバシー、サポートに関する回答を確認できます。
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
