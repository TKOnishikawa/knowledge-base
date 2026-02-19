---
title: "Knowledge Base ガイド - 使い方・設計思想・運用ルール"
description: "このナレッジベースの全体像、使い方、メタデータ設計、運用のポイントと注意点"
date: 2026-02-20
category: tech
subcategory: "Astro"
tags: [knowledge-base, astro, github-pages, ai, metadata]
keywords: [ナレッジベース, Knowledge Base, Astro, Content Collections, AIマニフェスト, メタデータ, GitHub Pages]
summary: "このKnowledge Baseの設計思想・技術スタック・メタデータ設計・記事の書き方・運用ルール・注意点を解説。AI-First設計により、Claude Codeが1ファイル(ai-manifest.json)を読むだけで全記事を把握できる。Astro + Content Collections + Pagefind + GitHub Pages で構成。"
difficulty: beginner
audience: self
source: "Claude Code session 2026-02-20"
draft: false
---

## 1. Knowledge Base とは

このポータルは、日々の業務や学習で得た知識を **蓄積・検索・再利用** するためのパーソナルナレッジベースである。

### コンセプト

- **Claude Code で生成したナレッジの永続化**: セッション内で調査・分析した結果は、セッション終了とともに消えてしまう。重要な知見を記事として保存し、次のセッションからすぐに参照できるようにする
- **AI-First 設計**: 人間が読むだけでなく、AI（Claude Code）が構造的にメタデータを取得し、必要な記事を素早く特定できるアーキテクチャ
- **公開と非公開の両立**: `draft: true` の記事はビルド対象外となりURLが生成されない。公開したい記事も下書きも同一リポジトリで管理できる

### 想定する使い方

1. Claude Code でBQ分析やスクリプト作成を行う
2. 得られた知見・手順・設計判断を Markdown 記事として書き出す
3. `git push` でGitHub Pages に自動デプロイされる
4. 次回セッションで `ai-manifest.json` を読み、過去の知見を即座に参照する

> **なぜ Notion や Google Docs ではないのか？** AI が直接ファイルを読み書きできること、Git で履歴管理できること、Markdown でポータブルであることが理由。

---

## 2. 技術スタック

| 技術 | バージョン | 用途 |
|------|-----------|------|
| **Astro** | 5.x | 静的サイトジェネレーター。Markdown をHTMLに変換し、高速な静的サイトを生成する |
| **Content Collections** | Astro 組み込み | 記事の frontmatter（メタデータ）を Zod スキーマで型安全に管理。タイポや型ミスをビルド時に検出できる |
| **Pagefind** | - | 全文検索エンジン。ビルド時にインデックスを生成し、ブラウザ上で高速な検索を実現する（予定） |
| **GitHub Pages** | - | ホスティング。`main` ブランチへの push で自動的に公開される |
| **GitHub Actions** | - | CI/CD パイプライン。push をトリガーに `npm ci` → `npm run build` → デプロイを自動実行 |
| **McKinsey Dark Theme** | カスタム | ダークテーマのデザインシステム。4段階背景、セマンティックカラー、Noto Sans JP + JetBrains Mono |

### デプロイの流れ

```
ローカルで記事作成（.md）
  ↓
git push origin main
  ↓
GitHub Actions が起動
  ↓
npm ci → npm run build（Astro ビルド）
  ↓
dist/ を GitHub Pages にデプロイ
  ↓
https://tkonishikawa.github.io/knowledge-base/ で公開
```

---

## 3. メタデータ設計（AI-First）

このナレッジベースの最大の特徴は **AI がメタデータを効率的に活用できる設計** にある。

### 5層の検索アーキテクチャ

記事を探すための手段が5層用意されている。用途に応じて最適な層を選ぶ。

| 層 | 手段 | 最適な場面 |
|----|------|-----------|
| **Layer 1** | `ai-manifest.json` | AI が全記事を俯瞰する。セッション開始時に1回読むだけで全体把握 |
| **Layer 2** | Pagefind（全文検索） | キーワードで本文を横断検索したいとき |
| **Layer 3** | カテゴリフィルタ | 「ビジネス系の記事だけ見たい」など大分類での絞り込み |
| **Layer 4** | タグ検索 | カテゴリを横断する概念（例: `github-pages` は tech にも ai にも関連）で探すとき |
| **Layer 5** | 関連記事（relatedSlugs） | ある記事から芋づる式に関連知識をたどるとき |

### frontmatter フィールド一覧

Content Collections のスキーマ（`src/content/config.ts`）で定義されている全フィールド。

#### 必須フィールド（5個）

記事作成に最低限必要なフィールド。これだけあればビルドが通る。

| フィールド | 型 | 説明 |
|-----------|------|------|
| `title` | string | 記事タイトル。ポータル一覧とブラウザタブに表示される |
| `description` | string | 記事の説明文。一覧カードとOGP（SNS共有時のプレビュー）に使用 |
| `date` | date | 作成日。`YYYY-MM-DD` 形式。ソートの基準になる |
| `category` | string | 大分類。`taxonomy.ts` で定義されたキーのいずれか |
| `tags` | string[] | タグ。複数指定可。UIフィルタ・タグページの生成に使用 |

#### AI向けフィールド（推奨）

AI が記事を効率よく検索・要約するためのフィールド。省略可能だが、記入を強く推奨する。

| フィールド | 型 | 説明 |
|-----------|------|------|
| `summary` | string | 記事の要約（1-3文）。マニフェストに含まれ、AI が本文を読まずに内容を判断できる |
| `keywords` | string[] | AI検索用キーワード。tags より具体的な語句を含める（例: `Content Collections`, `Zodバリデーション`） |
| `relatedSlugs` | string[] | 関連記事のslug（ファイル名から `.md` を除いたもの）。まだ存在しない記事への前方参照もOK |

#### 分類フィールド（任意）

| フィールド | 型 | 説明 |
|-----------|------|------|
| `subcategory` | string | サブカテゴリ。`taxonomy.ts` の `subcategories` から選ぶ |
| `series` | string | 連載名。同じ series 名の記事はグループとして扱われる |
| `seriesOrder` | number | 連載内の順番。1始まり |
| `difficulty` | enum | `beginner` / `intermediate` / `advanced` のいずれか |

#### ライフサイクルフィールド

| フィールド | 型 | デフォルト | 説明 |
|-----------|------|-----------|------|
| `updated` | date | なし | 最終更新日。frontmatter に手動で追記する |
| `draft` | boolean | `false` | `true` にするとビルド対象外（URLが生成されない） |
| `status` | enum | `published` | `draft` / `published` / `archived` / `outdated` のいずれか |

#### 出自フィールド

| フィールド | 型 | デフォルト | 説明 |
|-----------|------|-----------|------|
| `source` | string | なし | 記事の出自。例: `Claude Code session 2026-02-20`, `Web調査`, `プロジェクト: raftel_gcp` |
| `audience` | enum | `public` | `self`（自分用）/ `team`（チーム向け）/ `public`（一般公開） |

---

## 4. カテゴリ一覧（Taxonomy）

カテゴリは `src/data/taxonomy.ts` で定義されている。各カテゴリには色・日本語名・サブカテゴリが設定されている。

| カテゴリキー | 日本語名 | 色 | サブカテゴリ |
|-------------|---------|-----|-------------|
| `business` | 経営・ビジネス | 緑 `#34d399` | 創業, 税務, 法務, 営業, 経理, 保険, 融資 |
| `tech` | テクノロジー | 青 `#4a7dff` | GCP, BigQuery, Python, Web, Infrastructure, Astro |
| `data` | データ分析 | シアン `#22d3ee` | SQL, Visualization, Sheets, Dashboard |
| `ai` | AI・自動化 | 紫 `#a78bfa` | Claude, Prompt, MCP, Agent, Grok |
| `career` | キャリア | ピンク `#f472b6` | 転職, 独立, スキル, ネットワーク |
| `notes` | 雑記 | グレー `#9898ae` | （なし） |

> **カテゴリの追加方法**: `src/data/taxonomy.ts` の `taxonomy` オブジェクトに新しいキーを追加する。フォーマットは既存エントリを参照。

---

## 5. 記事の書き方

### ファイル配置

```
src/content/knowledge/
  ├── about-knowledge-base.md    ← この記事
  ├── bigquery-cost-optimization.md
  ├── claude-code-tips.md
  └── ...
```

- **配置場所**: `src/content/knowledge/` ディレクトリ直下
- **ファイル名**: 英語の kebab-case（ハイフン区切り）。例: `bigquery-cost-optimization.md`
- **拡張子**: `.md`（Markdown）
- **日本語ファイル名は使わない**（URLエンコードの問題が発生するため）

### frontmatter テンプレート（最小構成）

最低限の5フィールドだけで記事を作成する場合:

```yaml
---
title: "記事のタイトル"
description: "1-2行の説明文"
date: 2026-02-20
category: tech
tags: [bigquery, sql]
---
```

### frontmatter テンプレート（フル構成）

全フィールドを活用する場合:

```yaml
---
title: "記事のタイトル"
description: "1-2行の説明文"
date: 2026-02-20
category: tech
subcategory: "BigQuery"
tags: [bigquery, sql, optimization]
keywords: [パーティション, クラスタリング, スロット, オンデマンド料金]
summary: "BigQueryのコスト最適化手法を解説。パーティション・クラスタリング・スロット予約の使い分けと、実測値に基づくコスト比較を記載。"
series: "BigQuery実践ガイド"
seriesOrder: 3
difficulty: intermediate
audience: team
source: "Claude Code session 2026-02-20"
relatedSlugs: [bigquery-basics, gcp-billing-setup]
draft: false
---
```

### Markdown 記法ガイド

本文で使える主な記法を紹介する。

#### 見出し

```markdown
## 大見出し（H2）
### 中見出し（H3）
#### 小見出し（H4）
```

H1 は記事タイトルとして自動レンダリングされるため、本文では H2 から使う。

#### 引用（blockquote）

```markdown
> **重要なポイント**: 引用ブロックは青いボーダーで強調表示される。重要な注意点や補足説明に使う。
```

#### コードブロック

````markdown
```sql
SELECT * FROM `dataset.table` WHERE date >= '2026-01-01'
```
````

言語名（sql, python, typescript, bash 等）を指定するとシンタックスハイライトが適用される。

#### テーブル

```markdown
| 項目 | 説明 |
|------|------|
| AAA  | BBB  |
| CCC  | DDD  |
```

#### チェックリスト

```markdown
- [x] 完了したタスク
- [ ] 未完了のタスク
```

#### 折りたたみ（details/summary）

```markdown
<details>
<summary>詳細を表示</summary>

折りたたまれた内容がここに入る。

</details>
```

#### カスタム CSS クラス

このデザインシステムには、記事本文で使えるカスタムクラスが用意されている。

```html
<!-- 注意・つまづきポイント -->
<div class="pitfall">
ここに注意すべき内容を書く。赤いボーダーで強調される。
</div>

<!-- ヒント・ポイント -->
<div class="tip">
ここにヒントを書く。青いボーダーで強調される。
</div>
```

---

## 6. 公開・非公開の制御

### 状態の組み合わせと挙動

| `draft` | `status` | ビルド | ポータル一覧 | URL | 説明 |
|---------|----------|--------|-------------|-----|------|
| `false` | `published` | される | 表示 | あり | 通常の公開記事 |
| `false` | `archived` | される | **非表示** | あり | ポータルからは消えるがURLで直接アクセス可能 |
| `false` | `outdated` | される | 表示 | あり | 古い情報であることを示す（将来的にバナー表示予定） |
| `true` | （任意） | **されない** | 非表示 | **なし** | 完全な下書き。ビルドに含まれない |

### 重要な注意点

> **GitHub リポジトリは PUBLIC である。** `draft: true` にしてもビルド出力には含まれないが、**git に push した時点でソースコード（Markdownファイル）自体は誰でも閲覧可能** になる。機密情報は絶対に含めないこと。

### 記事のライフサイクル

```
draft: true（下書き）
  ↓  公開準備完了
draft: false, status: published（公開）
  ↓  内容が古くなった
status: outdated（古い情報マーク）
  ↓  完全に不要になった
status: archived（ポータル非表示、URL残存）
```

---

## 7. AI マニフェスト（ai-manifest.json）

### 概要

`ai-manifest.json` は、全記事のメタデータを1つの JSON ファイルに集約したものである。ビルド時に Astro のエンドポイントとして自動生成される（手動更新は不要）。

### URL

- 公開URL: `https://tkonishikawa.github.io/knowledge-base/ai-manifest.json`
- ソース: `src/pages/ai-manifest.json.ts`

### 構造

```json
{
  "_meta": {
    "description": "ナレッジベースのAI向けメタデータ。Claude Codeはこのファイルを最初に読むこと。",
    "generated": "2026-02-20T...",
    "baseUrl": "https://tkonishikawa.github.io/knowledge-base/",
    "localPath": "c:\\Users\\takao\\OneDrive\\ドキュメント\\GitHub\\knowledge-base"
  },
  "stats": {
    "totalArticles": 10,
    "byCategory": { "tech": 5, "data": 3, "ai": 2 },
    "byStatus": { "published": 9, "outdated": 1 },
    "recentlyUpdated": ["article-slug-1", "article-slug-2"]
  },
  "articles": [
    {
      "slug": "about-knowledge-base",
      "title": "Knowledge Base ガイド",
      "description": "...",
      "summary": "...",
      "category": "tech",
      "tags": ["knowledge-base", "astro"],
      "keywords": ["ナレッジベース", "Astro"],
      "date": "2026-02-20",
      "filePath": "src/content/knowledge/about-knowledge-base.md"
    }
  ],
  "taxonomy": { ... },
  "howToUse": {
    "findByCategory": "articles配列をcategoryでフィルタ",
    "findByKeyword": "keywordsとtagsを合わせて検索",
    "readArticle": "filePathのMarkdownファイルをReadツールで読む",
    "createArticle": "src/content/knowledge/ にMarkdownファイルを作成。必須: title, description, date, category, tags"
  }
}
```

### Claude Code での活用方法

1. セッション開始時に `ai-manifest.json` を読む（Web URL またはローカルファイル）
2. `stats` で記事数とカテゴリ分布を把握する
3. `articles` の `summary` と `keywords` で目的の記事を特定する
4. `filePath` を使って Read ツールで記事本文を読む
5. `howToUse` セクションに操作手順が記載されている

---

## 8. 運用のポイント

### tags と keywords の使い分け

| 項目 | tags | keywords |
|------|------|----------|
| **用途** | UI フィルタ、タグページ生成 | AI 検索、マニフェストでのマッチング |
| **粒度** | 大きめ（10-20種類に収まるイメージ） | 細かい具体語（記事固有の専門用語） |
| **例** | `bigquery`, `python`, `astro` | `パーティションプルーニング`, `Content Collections`, `Zodバリデーション` |
| **表示** | ポータルの記事カードとタグページ | マニフェスト内のみ（UI非表示） |

### relatedSlugs（関連記事）

- 関連する記事のファイル名（拡張子なし）を配列で指定する
- **まだ存在しない記事への前方参照も可能**。将来その記事を作成すれば自動的にリンクされる
- 例: `relatedSlugs: [bigquery-basics, gcp-billing-setup]`

### series（連載記事）

- 同じ `series` 名を持つ記事はグループとして扱われる
- `seriesOrder` で表示順を制御する（1始まり）
- 例: 「BigQuery実践ガイド」シリーズの第1回、第2回、第3回...

```yaml
# 第1回
series: "BigQuery実践ガイド"
seriesOrder: 1

# 第2回
series: "BigQuery実践ガイド"
seriesOrder: 2
```

### source（出自の記録）

記事がどこから生まれたかを記録しておくことで、後から文脈を追跡できる。

| 記述例 | 意味 |
|--------|------|
| `Claude Code session 2026-02-20` | Claude Code セッションでの調査結果 |
| `Web調査` | Web で調べた情報のまとめ |
| `プロジェクト: raftel_gcp` | 特定プロジェクトの作業で得た知見 |
| `書籍: データ指向アプリケーション設計` | 書籍からの学び |
| `社内MTG 2026-02-15` | ミーティングでの議論内容 |

---

## 9. 注意点・トラブルシューティング

### よくある問題と対処法

#### ビルドエラー: frontmatter バリデーション失敗

**症状**: `npm run build` で Zod のバリデーションエラーが出る

**原因**: 必須フィールドの不足、型の不一致、enum の値が不正

**対処法**:
- エラーメッセージを確認し、該当フィールドを修正する
- `date` は `YYYY-MM-DD` 形式であること（引用符で囲まない）
- `difficulty` は `beginner` / `intermediate` / `advanced` のいずれかであること
- `status` は `draft` / `published` / `archived` / `outdated` のいずれかであること
- `audience` は `self` / `team` / `public` のいずれかであること

#### カテゴリの色が灰色になる

**症状**: ポータル上でカテゴリバッジの色がグレーで表示される

**原因**: `category` フィールドの値が `taxonomy.ts` に定義されていない

**対処法**: `src/data/taxonomy.ts` の `taxonomy` オブジェクトのキーを確認し、正しい値を使う。定義されていないカテゴリ名を使った場合、エラーにはならずフォールバック（灰色）で表示される。

#### 画像の配置

- 画像ファイルは `public/images/` ディレクトリに配置する
- Markdown からは `/knowledge-base/images/ファイル名` で参照する（`base` パスを含める）

```markdown
![説明文](/knowledge-base/images/screenshot.png)
```

#### 日本語ファイル名の禁止

ファイル名に日本語を使うと URL エンコードされ、リンク切れや予期しない動作の原因になる。必ず英語の kebab-case を使うこと。

- 良い例: `bigquery-cost-optimization.md`
- 悪い例: `BigQueryコスト最適化.md`

### ローカル開発

```bash
# 開発サーバー起動（ホットリロード対応）
npm run dev
# → http://localhost:4321/knowledge-base/ でプレビュー

# 本番ビルド
npm run build

# ビルド結果のプレビュー
npm run preview
```

### デプロイ確認

- `main` ブランチに push すると GitHub Actions が自動起動する
- Actions の実行状況: リポジトリの「Actions」タブで確認
- デプロイ完了後: `https://tkonishikawa.github.io/knowledge-base/` にアクセスして確認

---

## 10. ディレクトリ構成

```
knowledge-base/
├── .github/
│   └── workflows/
│       └── deploy.yml           ← GitHub Actions デプロイ定義
├── public/
│   ├── favicon.svg              ← ファビコン
│   └── images/                  ← 画像ファイル置き場
├── src/
│   ├── content/
│   │   ├── config.ts            ← Content Collections スキーマ定義（Zod）
│   │   └── knowledge/           ← ★ 記事 Markdown はここ
│   │       ├── about-knowledge-base.md
│   │       └── ...
│   ├── data/
│   │   └── taxonomy.ts          ← カテゴリ定義（色・サブカテゴリ）
│   ├── layouts/
│   │   ├── BaseLayout.astro     ← 共通レイアウト（head, fonts, OGP）
│   │   └── ArticleLayout.astro  ← 記事ページレイアウト（プログレスバー, メタ表示）
│   ├── pages/
│   │   ├── index.astro          ← トップページ（記事一覧, カテゴリフィルタ）
│   │   ├── knowledge/
│   │   │   └── [...slug].astro  ← 記事詳細ページ（動的ルーティング）
│   │   ├── tags/
│   │   │   └── [tag].astro      ← タグ別ページ
│   │   └── ai-manifest.json.ts ← AI マニフェスト生成エンドポイント
│   ├── styles/
│   │   ├── global.css           ← デザインシステム（変数, リセット, 共通スタイル）
│   │   └── article.css          ← 記事固有スタイル（KPI, callout, TOC等）
│   └── utils/
│       └── collections.ts       ← コレクション操作ユーティリティ
├── astro.config.mjs             ← Astro 設定（site, base, integrations）
├── package.json                 ← 依存パッケージ・スクリプト
└── tsconfig.json                ← TypeScript 設定
```

### 重要なファイルの役割

| ファイル | 役割 |
|---------|------|
| `src/content/config.ts` | frontmatter のスキーマ定義。ここを変更すると全記事に影響する |
| `src/data/taxonomy.ts` | カテゴリの追加・変更はここで行う |
| `src/utils/collections.ts` | `getPublishedArticles()` 等のヘルパー関数。`draft` と `archived` の除外ロジックが定義されている |
| `src/pages/ai-manifest.json.ts` | AI マニフェストの生成ロジック。出力フィールドを変更したい場合はここを編集 |
| `astro.config.mjs` | `base: '/knowledge-base'` が設定されている。全URLにこのプレフィックスが付く |
