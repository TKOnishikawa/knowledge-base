# Knowledge Base - Claude Code 設定

## このリポジトリについて
Astro 5.x で構築された個人ナレッジポータル。GitHub Pages で公開。

## 記事の作成方法

### 1. ファイル作成
`src/content/knowledge/<kebab-case-name>.md` にMarkdownファイルを作成。

### 2. 必須 frontmatter（最低限これだけあれば公開可能）
```yaml
---
title: "記事タイトル"
description: "200文字以内の説明"
date: YYYY-MM-DD
category: "business"   # business / tech / data / ai / career / notes
tags: [tag1, tag2]
draft: false
---
```

### 3. 推奨 frontmatter（AI検索性を高める）
```yaml
summary: "AI用の詳細要約（500文字以内）"
keywords: [具体的なキーワード, 日本語OK]
subcategory: "サブカテゴリ"
source: "出自メモ"
```

### 4. 任意 frontmatter
```yaml
relatedSlugs: [related-article-slug]  # 関連記事
series: "シリーズ名"
seriesOrder: 1
difficulty: beginner   # beginner / intermediate / advanced
audience: self         # self / team / public
status: published      # draft / published / archived / outdated
```

## カテゴリ一覧（src/data/taxonomy.ts で定義）
| キー | 日本語 | 色 |
|------|--------|-----|
| business | 経営・ビジネス | green |
| tech | テクノロジー | blue |
| data | データ分析 | cyan |
| ai | AI・自動化 | purple |
| career | キャリア | pink |
| notes | 雑記 | gray |

## AIマニフェスト
ビルド時に `ai-manifest.json` が自動生成される。
セッション開始時にこのファイルを読めば全記事のメタデータを把握できる。
URL: `https://tkonishikawa.github.io/knowledge-base/ai-manifest.json`

## tags と keywords の使い分け
- **tags**: UI表示用。英語。大分類。例: `startup`, `tax`
- **keywords**: AI検索用。日本語OK。具体語。例: `個人事業主`, `青色申告`

## デプロイ
main ブランチに push → GitHub Actions が自動ビルド+デプロイ。

## 注意
- PUBLIC リポジトリ。機密情報を含めないこと。
- `draft: true` でもソースコードは公開される（ビルド成果物に含まれないだけ）。
- 日本語ファイル名は使わない。
