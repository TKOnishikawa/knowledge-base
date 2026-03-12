---
title: "Claude Code 外部サービス接続の設計・整理・仕組み化"
description: "Claude Codeから外部サービス（BQ, Slack, Sheets等）への接続を棚卸し、MCP整理、認証管理、設計原則の仕組み化までを一気通貫で実施した記録"
date: 2026-03-12
category: "ai"
tags: [claude-code, mcp, architecture, devops]
summary: "Claude Codeの外部サービス接続を体系的にレビュー。不要MCP4つを削除（11→7サーバー）、シークレットの環境変数移行、ADC/SA/OAuth鮮度確認、接続アーキテクチャ図の作成、設計原則のrules/skills化による仕組み化を完了。"
keywords: [MCP, 外部サービス接続, 認証管理, BigQuery, Google Sheets, Slack, OAuth, ADC, サービスアカウント, 環境変数, アーキテクチャ図]
subcategory: "Claude Code環境構築"
difficulty: intermediate
audience: self
source: "Claude Code session 2026-03-12"
---

## 背景

Claude Codeから外部サービス（BigQuery, Google Sheets, Slack, Backlog等）を使う際、接続設定が増えるにつれて「どのサービスがどの認証で繋がっているのか」が把握しづらくなっていた。

以前作成した「外部サービス接続セットアップ＆テストガイド」を参考に、現環境を一気にレビュー・整理・仕組み化した。

## やったこと

### 1. MCP整理（11→7サーバー）

以下の基準で不要MCPを削除：

| 削除したMCP | 理由 |
|------------|------|
| Plane | GitHub Projectsへ移行済み |
| Discord | 低使用頻度 |
| Notion | 接続確認すら未実施 |
| Semantic Scholar | 低使用頻度 |

**変更ファイル**: `~/.claude/.mcp.json`, `~/.claude/settings.json`

### 2. シークレットの環境変数移行

MCPの`.mcp.json`に直書きされていたシークレットを、Windows User環境変数にもバックアップ設定。curl+Skillでも使えるようにした。

設定した8件：
- `BACKLOG_API_KEY`, `BACKLOG_DOMAIN`
- `GEMINI_API_KEY`
- `SLACK_BOT_TOKEN_MIZUKARA`, `SLACK_TEAM_ID_MIZUKARA`
- `SLACK_BOT_TOKEN_JCC`, `SLACK_TEAM_ID_JCC`
- `XAI_API_KEY`

### 3. 認証鮮度チェック

Pythonスクリプトで一括テスト：

| サービス | 状態 | 詳細 |
|----------|------|------|
| BQ SA | ✅ | project=bigquery-459908 |
| ADC (Drive) | ✅ | トークン有効 |
| Sheets mizukara | ✅ | refresh_tokenあり |
| Sheets omoshiku | ✅ | refresh_tokenあり |

### 4. gcloud bash PATH追加

`~/.bashrc`を新規作成し、gcloud SDKのbinディレクトリをPATHに追加。`cmd /c gcloud`を経由せずbashから直接実行可能に。

### 5. アーキテクチャ図の作成

HTMLで接続フローを可視化。5セクション構成：

1. **起動フロー**: VSCode → グローバル設定 → リポ固有設定 → MCP起動
2. **7 MCPサーバー詳細**: 起動コマンド・認証方式・接続先・速度
3. **リポ別接続経路**: raftel_gcp（11サービス） vs dx-projects（4サービス）
4. **認証方式マップ**: API Key / OAuth / OAuth2 File / SA / ADC / gh CLIの6種
5. **ファイル階層構造**: グローバル / raftel_gcp / dx-projects

### 6. 設計原則の仕組み化

ガイドの設計思想を3層に分散し、自動的に効く仕組みにした：

| 層 | ファイル | いつ効くか |
|---|--------|----------|
| 設計原則 | `~/.claude/rules/external-services.md` | 新サービス追加・MCP変更・認証エラー時 |
| 定期監査 | `~/.claude/skills/env-audit/` | 四半期 or MCP変更後に手動実行 |
| 毎セッション | `/preflight` に認証鮮度チェック追加 | セッション開始時 |

## 接続手段の選定基準（設計原則の要約）

```
新しいサービスを使いたい
  ├── 専用CLIがある？ → CLI を使う（gh, bq, gcloud）
  ├── Claude組み込みMCP？ → MCP を使う（Google Calendar等）
  └── 上記以外 → curl + Skill を使う
```

MCPを残す例外は「OAuth管理が成熟」「使用頻度が高い」「ストリーミングが必要」等の明確な理由がある場合のみ。

## 学んだこと

- **MCPは増えやすい**: 新サービスを試すたびにMCPを追加しがちだが、使わなくなっても残り続ける。定期的な棚卸しが必要
- **Windows環境変数の反映**: `SetEnvironmentVariable('User')`で設定しても、VSCode再起動だけでは不十分な場合がある。PC再起動が確実
- **設計思想はplansではなくrulesに**: plansは一度読んだら忘れられる。rulesに落とすことで「新サービス追加時」に自動的に参照される

## 成果物

| 成果物 | パス |
|--------|------|
| アーキテクチャ図 | `raftel_gcp/output/mcp-architecture.html` |
| 設計原則 | `~/.claude/rules/external-services.md` |
| 環境監査Skill | `~/.claude/skills/env-audit/SKILL.md` |
| MCP運用規約（更新） | `~/.claude/rules/mcp-ops.md` |
| preflight（拡張） | `raftel_gcp/.claude/skills/preflight/SKILL.md` |
