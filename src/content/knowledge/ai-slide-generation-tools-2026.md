---
title: "AIスライド生成ツール比較 2026 — Gamma, Canva, GenSpark, Plus AI"
description: "Claude Code + MCP連携を前提としたAIスライド生成ツールの6軸評価比較。Gamma首位、Plus AI・Canvaが次点。NotebookLM→Google Slidesパイプラインの実現可能性も調査。"
date: 2026-02-20
category: "ai"
tags: [slide-generation, tool-comparison, mcp, presentation]
maturity: memo
actionability: explore
summary: "AIスライド生成ツール6種を、デザイン品質・AI生成力・MCP連携・出力柔軟性・コスト・日本語の6軸で比較評価。Gamma (66.2pt) が総合首位、Plus AI (58.0pt) とCanva (57.4pt) が次点。NotebookLMのGoogle Slidesエクスポートは2026年中に実現見込みで、MCP経由の一気通貫パイプラインも技術的に可能。"
keywords: [Gamma, Plus AI, Canva, GenSpark, Beautiful.ai, Tome, NotebookLM, Google Slides, MCP, スライド自動生成, プレゼンテーション]
tools_mentioned: [Gamma, Plus AI, Canva, GenSpark, Beautiful.ai, Tome, NotebookLM, Google Slides, Claude Code]
session_context: "AIスライド生成ツール比較リサーチ"
source: "Claude Code session 2026-02-20: AIスライドツール比較リサーチ"
subcategory: "MCP"
---

## 背景（Background）

Claude Code + MCP連携でスライド作成を自動化できないかというニーズから調査を開始。
NotebookLMの高品質な資料生成やGammaの評判を踏まえつつ、実際に「Claude Codeからの一気通貫パイプライン」を組めるツールはどれか、体系的に比較した。

## 目的（Purpose）

MCP接続前提で最適なAIスライド生成ツールを選定し、Claude Codeワークフローへの組み込み方針を決める。

## 期待アウトカム（Expected Outcome）

- 最適ツールの選定とセットアップ手順の明確化
- NotebookLM → Google Slides パイプラインの実現時期把握
- 次回セッションで具体的なMCP連携テストを実施

---

## 評価軸（6軸）

| # | 評価軸 | 重み | 説明 |
|---|--------|------|------|
| 1 | デザイン品質 | 25% | テンプレの洗練度・ビジュアル完成度 |
| 2 | AI生成力 | 20% | プロンプト→スライド変換の賢さ |
| 3 | MCP / API連携 | 20% | Claude Codeからの自動操作性 |
| 4 | 出力柔軟性 | 15% | PPTX・PDF・Googleスライド等の出力対応 |
| 5 | コスト効率 | 10% | 無料枠・有料プランの費用対効果 |
| 6 | 日本語対応 | 10% | 日本語テンプレ・フォント品質 |

## 総合スコアリング

| ツール | デザイン | AI生成力 | MCP/API | 出力 | コスト | 日本語 | **合計** |
|--------|---------|---------|---------|------|--------|--------|---------|
| **Gamma** | 9.0 | 8.5 | 8.5 | 7.5 | 7.0 | 7.5 | **66.2** |
| **Plus AI** | 7.5 | 8.0 | 6.5 | 8.5 | 6.5 | 7.0 | **58.0** |
| **Canva** | 8.5 | 7.0 | 6.0 | 8.0 | 7.5 | 8.0 | **57.4** |
| **GenSpark** | 6.0 | 7.5 | 5.0 | 6.0 | 9.0 | 5.0 | **48.0** |
| **Beautiful.ai** | 8.0 | 6.0 | 4.0 | 5.5 | 5.5 | 5.0 | **46.4** |
| **Tome** | 7.0 | 6.5 | 4.0 | 4.5 | 4.0 | 5.0 | **40.1** |

## 各ツール要点

### Gamma（総合1位: 66.2pt）
- **公式MCP Server**: `developers.gamma.app` で提供。Claude Code直結が最も容易
- **デザイン**: Web-native（HTML/CSS）で動的・モダン。AI生成としてはトップクラス
- **弱点**: PPTXエクスポートは有料（Pro $10/月〜）、純粋なPowerPoint形式ではない
- **おすすめ用途**: Claude Codeからの自動生成 → Web共有

### Plus AI（2位: 58.0pt）
- **Google Slides ネイティブ**: Googleスライドのアドオンとして動作
- **MCP**: `mcp.plusai.com` で提供あり
- **弱点**: $20/月〜と高め。Google Workspace とは別製品（Geminiの上位互換ではない）
- **おすすめ用途**: Google Slidesで完結させたい場合の最有力

### Canva（3位: 57.4pt）
- **テンプレ豊富**: 25万枚超のテンプレート、日本語対応も充実
- **MCP**: Connect API + 非公式MCP（`/mcp/canva`）あり
- **弱点**: AI生成力はGammaに劣る。APIの自由度も限定的
- **おすすめ用途**: デザイン重視・手動調整前提のワークフロー

### GenSpark（4位: 48.0pt）
- **完全無料**: コスト面で圧倒的優位
- **弱点**: MCP非対応、出力はPDF中心、デザイン品質は中程度
- **おすすめ用途**: コストゼロで「とりあえず形にしたい」場合

### Beautiful.ai / Tome
- いずれもMCP非対応で、Claude Code自動化との相性が悪い
- Beautiful.aiはデザイン自動調整が優秀だがAPI未公開
- Tomeは方向転換（プレゼンツール→AIドキュメント）中

## NotebookLM → Google Slides パイプライン

### 現状（2026年2月時点）
- **PPTXエクスポート**: 2026年2月18日に実装済み（公式発表）
- **Google Slidesエクスポート**: "coming next!" と公式Xで発信。時期未定だが2026年中に実現見込み
- **MCP連携**: `notebooklm-mcp-cli`（非公式、Cookie認証）で自動操作可能

### 一気通貫パイプライン構想
```
Claude Code
  ├→ /x（Grok検索）でリサーチ
  ├→ NotebookLM MCP でソース投入 + ノート生成
  ├→ NotebookLM → Google Slides エクスポート（coming soon）
  └→ Google Slides MCP でレイアウト微調整
```

**技術的には可能**。ただしNotebookLMのMCPは非公式（Cookie認証）のため安定性に課題。
Google Slidesエクスポート実装後に再評価を推奨。

## 推奨アクション

1. **即座に試せる**: Gamma MCP Server でClaude Code連携テスト
2. **Google Slides派**: Plus AI を試用（14日無料トライアル）
3. **待機**: NotebookLM → Google Slides エクスポート機能のリリースを注視
