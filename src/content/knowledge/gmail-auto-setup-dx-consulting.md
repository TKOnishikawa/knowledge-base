---
title: "Gmail整理自動構築 — DXコンサル向けラベル・フィルタ・通知をClaude Codeで一括セットアップ"
description: "DXコンサルティング業務のGmailを、Claude Code + Gmail APIで自動整理。ラベル6個・フィルタ8本・既存メール振り分け・通知設計を30分で構築した手順と設計思想。"
date: 2026-03-13
category: "ai"
tags: [gmail-api, claude-code, automation, productivity]
summary: "オモシクのGmail（nishikawa@omoshiku.jp）をDXコンサル業務に最適化。Claude CodeからGmail APIをPythonで叩き、ラベル作成→フィルタ設定→既存メール振り分け→通知設計を一括自動実行。クライアントメールだけ通知ON、SaaS通知はSkip Inboxでノイズ除去。手動設定ゼロの状態から30分で完了。"
keywords: [Gmail整理, ラベル自動作成, フィルタ自動設定, DXコンサル, Claude Code, Gmail API, OAuth2]
subcategory: "業務自動化"
difficulty: intermediate
audience: self
source: "Claude Code session 2026-03-13"
---

## なぜやったか

合同会社オモシクのGmail（`nishikawa@omoshiku.jp`）は、カスタムラベル0件・フィルタ0件の完全未整理状態だった。DXコンサルとして複数クライアント（大和書房・ニッカホーム）を抱え、ベンダーやりとり・SaaS通知・自動レポート・会社設立関連メールが混在。重要なクライアントメールが埋もれるリスクがあった。

## 設計方針

### ラベルはシンプルに6個

```
CL/大和書房      ← クライアント（CC含むdaiwashobo.co.jp + ベンダー経由）
CL/ニッカホーム  ← クライアント（CC含むnikka-home.co.jp）
BIZ              ← 会計・税務・会社設立・契約・法務 すべて
RPT              ← Buy Box自動レポート・アラート
SaaS             ← Backlog, GitHub, Notion, Plane等 すべて
INFO             ← ニュースレター, LinkedIn, プロモーション すべて
```

**判断基準**: 「ラベルを見た時に3秒で何のメールか分かるか」。BIZ系を会計・税務・法務と細分化する案もあったが、メール量が少ない段階では1ラベルで十分。

### フィルタ8本の設計

| # | 条件 | アクション |
|---|------|-----------|
| F1 | 大和書房（from/to/cc） | → CL/大和書房 + Important |
| F2 | ニッカホーム（from/to/cc） | → CL/ニッカホーム + Important |
| F3 | シンクアップソリューション（ベンダー） | → CL/大和書房 |
| F4 | 自分→自分 subject:Buy Box | → RPT, Skip Inbox |
| F5 | freee, アトラス, Keepa等 | → BIZ |
| F6 | Backlog, GitHub, Notion等 | → SaaS, Skip Inbox |
| F7 | LinkedIn | → INFO, Skip Inbox |
| F8 | CloudSignメルマガ | → INFO, Skip Inbox |

**ポイント**: クライアント系は `Important` フラグを自動付与。Gmailの「重要なメールのみ通知」と組み合わせることで、クライアントメールだけデスクトップ通知が飛ぶ仕組み。

### 通知設計

| 対象 | 受信トレイ | デスクトップ通知 |
|------|-----------|----------------|
| クライアント | ✅ 残す | ✅ ON（Important連動） |
| BIZ | ✅ 残す | ❌ OFF |
| RPT/SaaS/INFO | ❌ Skip | ❌ OFF |

## 実装方法

### Gmail MCPのOAuth2トークンを再利用

`~/.gmail-mcp/credentials.json` にある OAuth2トークン（`gmail.modify` + `gmail.settings.basic` スコープ）をPythonから直接読み込み。新たな認証フロー不要。

```python
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build

creds = Credentials(
    token=cred_data["access_token"],
    refresh_token=cred_data["refresh_token"],
    token_uri=oauth_keys["token_uri"],
    client_id=oauth_keys["client_id"],
    client_secret=oauth_keys["client_secret"],
)
service = build("gmail", "v1", credentials=creds)
```

### 4ステップ自動実行

1. **認証テスト** — `getProfile()` でAPI接続確認
2. **ラベル作成** — `users.labels.create()` で6ラベル一括作成
3. **フィルタ作成** — `users.settings.filters.create()` で8フィルタ一括作成
4. **既存メール振り分け** — `users.messages.batchModify()` で153通中107通を分類

各ステップは独立した `_temp_*.py` スクリプトで実行し、完了後に削除。

### ベンダーメールのクライアント分類

「シンクアップソリューション（THINK'Sベンダー）からのメールは、CCに大和書房が入っていれば大和書房ラベルを付ける」という要件。フィルタではCC条件の細かい制御が難しいため、ベンダーの個人メールアドレス（`k_hirata@thinkup-sol.co.jp`）で直接マッチさせた。

## 結果

| 指標 | Before | After |
|------|--------|-------|
| カスタムラベル | 0個 | 6個 |
| フィルタ | 0本 | 8本 |
| 受信トレイのメール数 | 58通 | 19通（67%削減） |
| 分類済みメール | 0通 | 107通 |
| 所要時間 | — | 約30分 |

## 学んだこと

- **Gmail MCPのOAuth2トークンはPythonから再利用可能**。MCP用に取得した認証情報がそのままGmail API Pythonクライアントで使える
- **IPv4強制が必要**。Windows環境でGoogle APIにIPv6接続するとタイムアウトする（既知の問題）
- **フィルタは新規メールにしか適用されない**。既存メールの振り分けは `batchModify` APIで別途実行が必要
- **ラベル数は最小限に**。細かく分けたくなるが、メール量が少ない段階では大カテゴリで十分。増えてから分割すればいい
- **Important フラグ + 通知設定の組み合わせ**が、「特定の送信元だけ通知」を実現する最もシンプルな方法

## 今後の拡張

- 新クライアント追加時: 同じスクリプトパターンでラベル+フィルタを即追加可能
- Star運用: 黄Star（要対応）/ Blue Star（返信待ち）の2種類で手動管理
