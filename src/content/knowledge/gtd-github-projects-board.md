---
title: "GTDボード（GitHub Projects）活用コツ — タスク管理を習慣化する5カラム設計"
description: "GitHub Projects V2 を GTD思想で設計する方法。INBOX/Next Action/In Progress/Waiting/Done の使い分け、週次レビュー手順、ラベルフィルター活用法を解説。"
date: 2026-03-12
category: "business"
tags: [GTD, GitHub, タスク管理, 生産性, プロジェクト管理]
keywords: [GitHub Projects, GTD, Next Action, In Progress, INBOX, 週次レビュー, カンバン, タスク管理, 一人法人]
summary: "GitHub Projects V2 に GTD（Getting Things Done）の考え方を適用した5カラムボードの設計・運用ガイド。Next ActionとIn Progressの違い、INBOXの週次処理フロー、ラベルによるPJ横断フィルタリング、Roadmapビューのガンチャート活用法まで実践的なコツをまとめている。"
difficulty: beginner
audience: public
source: "Claude Code session 2026-03-12"
relatedSlugs: [business-launch-playbook]
---

## なぜ GitHub Projects × GTD なのか

GitHub Projects V2 は無料で使えるカンバン＋ロードマップツール。Issues のラベル管理と組み合わせると、**複数PJのタスクを一画面で横断管理**できる。

GTD（Getting Things Done）の「頭の外に出す → 整理 → 実行」の流れをボードカラムに落とし込むことで、タスクの詰まりがなくなる。

---

## 5カラムの設計

| カラム | 意味 | 使い方 |
|--------|------|--------|
| 📥 INBOX | 未分類・新規キャプチャ | とりあえずここに入れる。考えない |
| 🎯 Next Action | 次にやることが決まってる | 今週やるタスクのリスト |
| 🔄 In Progress | 今まさに手を動かしてる | **最大3件**に絞る |
| ⏳ Waiting | 誰かを待ってる・保留 | コメントに「誰に・何を待ってるか」を書く |
| ✅ Done | 完了 | 完了したら即移動。達成感が出る |

---

## Next Action vs In Progress の使い分け

**一番間違えやすいポイント**がここ。

```
Next Action = 「今週やるつもりがある」タスク
In Progress = 「今この瞬間、実際に作業中」のタスク
```

**例**：
- 「提案書を書く」というタスクがある
- 月曜に週次レビューで「今週やる」と決めた → **Next Action**
- 木曜にPCを開いて実際に書き始めた → **In Progress** に移動
- 完成した → **Done** に移動

**In Progressが3件を超えたら危険サイン**。「本当に今やってるか？」と自問して、Waitingかに戻す。

---

## INBOX の処理ルール（週次レビュー・15分）

```
毎週月曜の朝：INBOXを全部レビューする
  ↓
「今週やる？」       → 🎯 Next Action に移動
「誰かを待ってる？」  → ⏳ Waiting に移動（コメントに詳細を書く）
「いつかやる」       → そのまま INBOX に残す（OK）
「もうやらない」     → Issue を close する
```

INBOXは「一時置き場」なので、大量に溜まっていても焦らなくていい。週次レビューで整理するのがルール。

---

## ラベルでPJ横断フィルター

各 Issue に `PJ:NIKKA` `PJ:DAIWA` `PJ:CORP` などのラベルを付けておくと、ボード上でフィルタリングできる。

**使い方**：
1. Board画面上部の **Filter** をクリック
2. `label:PJ:NIKKA` と入力
3. そのPJのタスクだけに絞り込まれる

「今日のニッカ仕事だけ見たい」「大和書房の進行タスクを確認したい」がワンクリックで実現できる。

---

## Roadmapビューでガンチャート

1. Board画面の **+ New View** をクリック
2. **Roadmap** を選択
3. Issue に **Due date**（期日）を設定すると自動でガンチャート表示される

スプリントや締め切りが視覚化できるので、クライアントへの進捗報告にも使える。

---

## Waitingカラムの運用コツ

Waiting に移したら必ず **コメントを残す**。

```
例：
「武田さんに見積もり確認依頼 → 3/15 返答待ち」
「〇〇社との契約書、先方確認中 → 3/20 期限」
```

週次レビューで Waiting を確認し、返答が来ていたら Next Action または In Progress に戻す。これをやるだけで「あのタスクどうなったっけ？」という詰まりがなくなる。

---

## セットアップメモ（再現手順）

GitHub Projects V2 の Status フィールドを上記5カラムに変更するには GraphQL API が必要（UIからでも変更可能）。

```graphql
mutation {
  updateProjectV2Field(input: {
    fieldId: "<STATUS_FIELD_ID>"
    singleSelectOptions: [
      {name: "📥 INBOX", color: GRAY, description: "未分類・新規キャプチャ"}
      {name: "🎯 Next Action", color: BLUE, description: "次にやること"}
      {name: "🔄 In Progress", color: YELLOW, description: "作業中"}
      {name: "⏳ Waiting", color: ORANGE, description: "保留・待ち"}
      {name: "✅ Done", color: GREEN, description: "完了"}
    ]
  }) {
    projectV2Field { ... on ProjectV2SingleSelectField { id name } }
  }
}
```
