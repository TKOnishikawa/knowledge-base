---
title: "AI駆動開発 構築編 — API統合・エージェントオーケストレーション"
description: "Meta/Google Ads API認証設計、Secret Manager統合、レート制限対処、マルチエージェント安全設計（ガードレール・冪等性・Sagaパターン）、Claudeモデル選択の実践ガイド。Grok Web Search + Gemini Deep Researchによる深層調査レポート。"
date: 2026-03-14
category: "ai"
tags: [claude-code, api-integration, agent-orchestration, gcp, security, meta-ads, google-ads]
summary: "非エンジニアDXコンサルタントのAPI統合・エージェント構築を支援する実践ガイド。OAuth2/SA認証判断フロー、Secret Manager統合、レート制限3パターン（Backoff/CircuitBreaker/Queue）、4層ガードレール設計、Sagaパターン補償トランザクション、Claude Haiku/Sonnet/Opusモデル選択基準、CrewAI先行事例（ROAS 109%向上）を統合。"
keywords: [API統合, エージェントオーケストレーション, ガードレール, 冪等性, Sagaパターン, Secret Manager, Claude Agent SDK, Meta Ads API, Google Ads API]
subcategory: "AI駆動開発"
difficulty: intermediate
audience: self
source: "Claude Code session 2026-03-14 + Grok Web Search + Gemini Deep Research"
---

## このドキュメントについて

このリサーチレポートは、[AI駆動開発 10x加速ガイド（分析編）](/knowledge/ai-driven-dev-10x-acceleration/)の続編です。

**前回（分析編）**: 要件定義・設計・実装・検証の4工程チェックリスト、認知オフローディング研究、Vibe Coding批判
**今回（構築編）**: API統合パターン、エージェントオーケストレーション、シークレット管理、エラーハンドリング

**調査手法**: Grok Web Search（8クエリ） + Gemini Deep Research（Search Grounding、4クエリ）の2系統で深層調査を実施。

**対象プロジェクト**:
- SYSDEVREQ-1173: AI広告運用システム（Meta/Google Ads API統合、4エージェント入稿自動化）
- SYSDEVREQ-1109: n8n導入PoC（Zapier→セルフホスト移行）
- アーキテクチャBP v3: KUZEN脱却、n8n中核の4レイヤー統合基盤

## 高品質版（HTML）

左ナビゲーション付きの高品質HTMLレポートは以下で閲覧可能です：

**[AI駆動開発 構築編（HTML版）](/knowledge-base/ai-driven-dev-construction.html)**

McKinsey品質のインフォグラフィック、フローチャート、比較表を多用した視覚的なドキュメントです。

## 主要な発見

### API統合パターン
- **認証方式の選択**: System User Token（Meta） / Service Account（Google） / Client Credentials（Salesforce）がサーバー間自動処理の推奨
- **シークレット管理**: 本番はSecret Manager一択。SecretCacheパターンでキャッシュ＋SRP準拠
- **レート制限**: Meta Ads APIは超過時300秒ブロック。Google Ads mutateは1リクエスト10,000オペレーション上限
- **CAPI必須化**: 2026年からConversions API実装が必須

### エージェントオーケストレーション
- **4層ガードレール**: アクション制限 → 出力検証 → 予算制御 → 人間承認
- **$47K事件**: 2つのAIエージェントが再帰ループで$47,000のAPI使用料発生 → MAX_STEPS + 予算閾値が必須
- **マルチエージェント成功率**: 92.1%（単一エージェント 60%比）
- **モデル選択**: submission-loggerはLLM不要、asset-scannerはHaiku、spec-validator/campaign-builderはSonnet

## 参考論文・記事
- [Anthropic: Building Effective Agents](https://www.anthropic.com/research/building-effective-agents)
- [SagaLLM (VLDB 2025)](https://www.vldb.org/pvldb/vol18/p4874-chang.pdf)
- [AgentDoG Framework (arXiv)](https://arxiv.org/pdf/2601.18491)
- [FINOS AI Governance Framework](https://air-governance-framework.finos.org/)
- [LangChain State of Agent Engineering](https://www.langchain.com/state-of-agent-engineering)
