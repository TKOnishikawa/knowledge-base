---
title: "AI駆動開発で非エンジニアが品質を担保する方法 — フロントエンド・バックエンド品質ゲート完全ガイド"
description: "Vibe Codingの落とし穴を回避し、AI-Assisted Engineeringとして最低限の品質フィルターを通しながら実装を進めるための実践フレームワーク。フロントエンド7項目・バックエンド7項目のチェックリスト付き。"
date: 2026-03-01
category: "ai"
tags: [ai-driven-development, vibe-coding, security, quality-assurance, non-engineer]
maturity: memo
actionability: actionable
summary: "AI生成コードの36%にセキュリティ脆弱性がある現実を踏まえ、非エンジニアがAI駆動開発で守るべき品質ゲートを体系化。防御的アーキテクチャ選定→日常ループ（Trust but Verify）→マイルストーンチェックの3層構造。"
keywords: [Vibe Coding, AI-Assisted Engineering, Supabase RLS, XSS, SQLインジェクション, Zod, TypeScript strict, CLAUDE.md, Spec-Driven Development]
tools_mentioned: [Claude Code, Cursor, GitHub Copilot, Supabase, SvelteKit, Vercel, ESLint, Lighthouse, Zod]
session_context: "MYOSアプリ（ADHD才能解放AIコーチ）開発プロセスを題材に、AI駆動開発の品質担保アプローチを徹底リサーチ"
source: "Claude Code session 2026-03-01: AI駆動開発の品質ゲートリサーチ"
---

## 背景（Background）

AI駆動開発（Claude Code、Cursor等）の普及により、エンジニアリング経験が浅い人でもアプリを実装できるようになった。一方で2025〜2026年にかけて「Vibe Coding」由来のセキュリティ事故が多発。AIが生成するコードの36%にセキュリティ脆弱性があり（Veracode 2025）、Supabase + Lovable/Boltで作られた170以上のアプリがRLS未設定で個人情報漏洩（ByteIota 2025）という現実がある。

## 目的（Purpose）

非エンジニアがAI駆動開発で深刻なミスを防ぎ、最低限の品質を担保しながら実装を進めるための実践的フレームワークを構築する。

## 期待アウトカム（Expected Outcome）

- MYOSアプリ（SvelteKit + Supabase + Claude API）のMVP0実装時にこのガイドを適用
- CLAUDE.md にセキュリティルールとして組み込み、AIが自動的に従う仕組みを構築
- 今後のアプリ開発プロジェクト全般で再利用可能なチェックリストとして定着

---

## 核心の3原則

### 原則1：Vibe Coding ≠ AI-Assisted Engineering

| | Vibe Coding | AI-Assisted Engineering |
|---|---|---|
| 姿勢 | AIに任せた、動いたからOK | AIに書かせたコードを**理解し、検証する** |
| レビュー | しない | **必ずする** |
| テスト | 動けばいい | 自動テスト必須 |
| 結果 | 技術的負債の山 | 持続可能なコード |

> Google Chrome開発リードAddy Osmani: "Vibe coding is not the same as AI-assisted engineering"

### 原則2：防御的アーキテクチャを最初に選ぶ

コードレビューで穴を塞ぐのではなく、**そもそも穴が開きにくい仕組み**を採用する。

良い選択の例：
- **Supabase RLS** → 認証とデータアクセス制御がDB層で強制
- **TypeScript strict** → 型安全性でランタイムエラーを事前キャッチ
- **SvelteKit/Next.js** → フレームワークがXSS対策を内蔵
- **Edge Functions** → APIキーがサーバーサイドに隔離

### 原則3：理解できないコードはマージしない

AIが出力したコードの**意図と影響**を説明できないなら、使わない。

---

## 統計データ（2025-2026）

| 事実 | ソース |
|------|--------|
| AIが生成するコードの36%にセキュリティ脆弱性 | Veracode 2025 |
| 170+アプリがRLS未設定で個人情報漏洩 | ByteIota 2025 |
| 反復的なAIコード修正でセキュリティが劣化 | IEEE-ISTAS 2025 |
| 開発者の76%がAI生成コードを理解せずに使用 | Clutch.co 2025 |

---

## フロントエンド品質ゲート（7項目）

### 1. XSS防止 ★★★★★
- フレームワークのテンプレート（自動エスケープ）を使う
- `{@html}` / `dangerouslySetInnerHTML` は使用禁止
- ユーザー入力をそのままDOMに挿入しない

### 2. 認証・認可のフロントエンド制御 ★★★★★
- Supabaseのセッション管理を使う（自前で作らない）
- 認証ページにガードを入れる
- **鉄則：フロントの認証チェックはUXのため、セキュリティはバックエンドで担保**

### 3. APIキー・シークレット漏洩防止 ★★★★★
- APIキーはEdge Function（サーバーサイド）にだけ置く
- `.env.local` をgitにコミットしない
- Supabaseの `anon key` は公開前提（RLSで制御）

### 4. 入力バリデーション ★★★★☆
- フロントでバリデーション（UXのため）
- バックエンドでもバリデーション（セキュリティのため）
- Zodスキーマで構造的な整合性を担保

### 5. エラーメッセージの制御 ★★★☆☆
- ユーザーには「問題が発生しました」程度の表示
- スタックトレースやDBエラーを露出させない

### 6. レスポンシブ・アクセシビリティ ★★☆☆☆
- Lighthouse スコア80以上
- タップターゲット44px以上

### 7. 依存パッケージの安全性 ★★★★☆
- `npm audit` を定期実行
- AIが提案するパッケージ名のtypoに注意（偽パッケージ）

---

## バックエンド品質ゲート（7項目）

### 1. RLS（Row Level Security）★★★★★
- 全テーブルでRLS有効化 + ポリシー定義
- **テストスクリプト**で「ユーザーAがユーザーBのデータを見えないこと」を検証

### 2. SQLインジェクション防止 ★★★★★
- Supabaseクエリビルダーを使う（自動的に安全）
- `.rpc()` でraw SQLを渡すパターンだけ要注意

### 3. Edge Functionのセキュリティ ★★★★☆
- 全Edge Functionの最初に認証チェック
- レートリミット（AI API乱用防止）
- 入力サイズ上限

### 4. APIキー管理 ★★★★★
- Supabase環境変数（Vault）にAPIキーを保存
- コードにハードコードしない

### 5. データバリデーション（サーバーサイド）★★★★☆
- Edge Function内でZodバリデーション
- パース失敗時は400返却

### 6. AI出力のサニタイズ ★★★☆☆
- AIレスポンスをそのままHTMLとしてレンダリングしない
- プロンプトインジェクション対策

### 7. ログとモニタリング ★★☆☆☆
- Supabase Dashboardでエラーログ確認
- 異常なリクエストパターンに気づく

---

## 開発プロセス：3層フィルター

### Layer 1：環境セットアップ時（1回だけ）
- CLAUDE.md にセキュリティルールを書く（AIが自動で従う）
- ESLint + Prettier + TypeScript strict mode
- `.env` をgitignore
- Supabase RLSをデフォルトON

### Layer 2：毎回のコード生成時（日常ループ）
```
1. AIにコードを生成させる
2. 「このコードの意図と各部分の役割を説明して」
3. 説明を読んで納得できるか確認
4. 「このコードにセキュリティ上の問題はないか」
5. 問題なければマージ
```
→ Addy Osmaniの「Trust but Verify」ループ

### Layer 3：機能完成時（マイルストーンごと）
- フロントエンド7項目チェック
- バックエンド7項目チェック
- 実機動作確認
- Lighthouse スコア確認

---

## CLAUDE.md に書くべきルール（テンプレート）

```markdown
## アプリケーション開発セキュリティ規約

### フロントエンド
- {@html} / dangerouslySetInnerHTML は使用禁止
- APIキーをフロントエンドのコードに含めない
- ユーザー入力は必ずZodスキーマでバリデーション

### バックエンド（Edge Functions）
- 全Edge Functionの最初に認証チェック
- ユーザー入力のサイズ上限（メッセージ10000文字以内）
- AI APIのレートリミット（1ユーザー100回/日）
- SQLは必ずSupabaseクエリビルダー使用（raw SQL禁止）

### データベース
- 新規テーブルは必ずRLS有効化 + ポリシー定義
- RLSポリシーのテストスクリプトを書く

### 依存関係
- npm install 前に npm audit を実行
- 不明パッケージはnpmjs.comで週間DL数を確認
```

---

## 参考ソース

- [Veracode: GenAI Code Security Report](https://www.veracode.com/blog/genai-code-security-report/)
- [Addy Osmani: Vibe Coding vs AI-Assisted Engineering](https://medium.com/@addyosmani/vibe-coding-is-not-the-same-as-ai-assisted-engineering-3f81088d5b98)
- [CSA: R.A.I.L.G.U.A.R.D. Framework](https://cloudsecurityalliance.org/blog/2025/05/06/secure-vibe-coding-level-up-with-cursor-rules-and-the-r-a-i-l-g-u-a-r-d-framework)
- [ByteIota: 170+ Apps Exposed by Missing RLS](https://byteiota.com/supabase-security-flaw-170-apps-exposed-by-missing-rls/)
- [Claude Code Best Practices](https://code.claude.com/docs/en/best-practices)
- [Aikido.dev: Vibe Coder's Security Checklist](https://www.aikido.dev/blog/vibe-check-the-vibe-coders-security-checklist)
- [GitHub: Spec-Driven Development with AI](https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/)
