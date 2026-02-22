---
title: "omoshiku HP デザイン変遷録（v1→v5）"
description: "omoshiku（旧RAFTEL）HPの4世代にわたるデザイン進化を記録。各バージョンの設計判断、カラー・エフェクト・コンポーネントの変遷、得られた教訓をまとめる。"
date: 2026-02-22
category: "design"
tags: [hp, design-system, css, animation, gsap, branding]
maturity: published
actionability: reference
summary: "v2（LayerX骨格）→v3（コンテンツ充実）→v4（Craft化・暖色統一）→v5（ビジネスリライト+6層エフェクト）の変遷。色・フォント・アニメーション・コンポーネント構成の比較表と、4回のサービス名変更から得た命名の教訓を含む。"
keywords: [omoshiku, HP, デザインシステム, GSAP, ScrollTrigger, amber, craft]
tools_mentioned: [GSAP, ScrollTrigger, GitHub Pages]
series: "omoshiku-brand"
seriesOrder: 1
relatedSlugs: [omoshiku-service-design, sns-master-strategy, sns-master-creative]
---

## このドキュメントの目的

omoshiku HPは2026年2月に集中的にv2→v5の4世代を経て現在の形に到達した。各バージョンの設計判断と教訓を記録し、今後のHP改修やクライアントHP制作の参照資料とする。

---

## バージョン変遷サマリー

| バージョン | コンセプト | 主な変更 |
|-----------|-----------|---------|
| **v2** | LayerX骨格 × omoshikuカラー × GSAP | ベース構築。3色オーブ、パーティクル50個、スターフィールド |
| **v3** | コンテンツ充実化 | 比較表追加、プロジェクト実績アコーディオン導入 |
| **v4** | Night Horizon（Craft化） | Electric Blue全排除→暖色統一、Shimmer/Typewriter/磁力ボタン |
| **v5** | ビジネスリライト + 6層ビジュアル | メッセージ全置換、パルスリング3本、コンステレーションCanvas |

---

## カラー・ビジュアルの進化

### カラーパレット

| 項目 | v2-v3 | v4（転換点） | v5（最終） |
|------|-------|------------|-----------|
| メインアクセント | Amber `#e8944a` | Amber `#e8944a`（Blue完全排除） | Amber継続 |
| グラデーション | `135deg: #e8944a → #d4582f → #c04040` | 同左 | 同左 |
| セカンダリ | Teal `#2a7a6e` | Teal `#2a7a6e` | Teal `#2a7a6e` |
| Hero背景 | 深紺 `#0a0a14` | 深紺 `#0a0a14` | 深紺 `#0a0a14` |

**教訓**: Electric Blueを完全排除してAmber系に統一したv4が転換点。暖色系の方がコンサルティングブランドの「信頼感 + 情熱」を表現しやすい。

### Hero背景エフェクト（6層構成）

v5で確立した最終的なZ-index構成:

```
Layer 1 (最奥): Constellation Canvas（星座線アニメーション）
Layer 2: Hero Mesh Grid（opacity 0.06）
Layer 3: Hero Scanlines（細い白線）
Layer 4: Pulse Rings × 3本（Amber/Red/Teal放射波）
Layer 5: Hero Orbs × 3色（浮動）
Layer 6 (最前): Particles + Content
```

**モバイル最適化**:
- パーティクル: 50個 → 25個に縮小
- パルスリング: 60%縮小
- コンステレーションCanvas: 無効化
- `prefers-reduced-motion`: 全アニメーション無効化

---

## フォント体系

| 用途 | フォント | 備考 |
|------|---------|------|
| ロゴ | Zen Antique | 和のクラフト感 |
| 英数見出し | Sora | モダン・ジオメトリック |
| 本文 | Noto Sans JP | 可読性重視 |
| エンジニアリング | Inter | 技術的な信頼感 |
| 強調テキスト | `shimmer-text` | v4で導入、「面白く」に適用 |

---

## コンポーネント構成の変遷

| 項目 | v2 | v3 | v4 | v5 |
|------|-----|-----|-----|-----|
| セクション数 | 7 | 8 | 8 | 7 |
| 比較表 | - | 新規追加 | あり | あり |
| プロジェクト実績 | Numbersカード | アコーディオン | 独立セクション | Results統合 |
| Serviceカード | 複数プール | 表示修正 | Craft化 | 3本柱+価格明示 |
| About | 基本版 | 基本版 | 基本版 | プロフィール写真+経歴詳細 |

**教訓**: セクション数は増やすより減らす方向が正解。v3→v5で8→7に戻した。コンテンツを統合してスクロール深度を浅くした方が離脱率は下がる。

---

## アニメーション・インタラクション

| 機能 | 導入バージョン | 技術 |
|------|--------------|------|
| スクロール連動 | v2〜 | GSAP ScrollTrigger |
| Hero フェードイン | v2〜 | CSS `hero-fade-in 1s` |
| 3Dチルト | v2〜 | デスクトップのみ 15deg |
| カウントアップ | v2〜 | GSAP |
| Typewriter | v4〜 | JS タイムライン |
| Shimmer | v4〜 | CSS グラデーションアニメーション |
| 磁力ボタン | v4〜 | マウス追従 + グロー |
| パルスリング | v5〜 | CSS放射波 × 3色 |
| コンステレーション | v5〜 | Canvas 2D（デスクトップのみ） |

---

## Heroメッセージの変遷

| バージョン | 主コピー | サブコピー |
|-----------|---------|-----------|
| v2-v4 | 根拠のない**確信**を育て、論理的な**熱狂**でぶち抜く | （汎用的な訴求） |
| v5（最終） | **想い**を**仕組み**で**面白く** | 「何をつくるべきか」を戦略から一緒に考え、設計し、実装する |

**教訓**: 「確信と熱狂」は詩的だが、何をしてくれる会社かわからない。v5で「想い×仕組み×面白く」に変えて、具体的な価値提案（戦略→設計→実装）を明示した。

---

## サービス名変更の教訓（4回の変遷）

1. **Growth Partner** → Growth Sprint → 3ヶ月集中プログラム → **Growth Partner（原点回帰）**

**結論**: ターゲット（創業3ヶ月の中小企業）＋ 価値提供（デジタル戦略パートナー）が明確な名前が正解。一度変えてみて戻るのは無駄ではなく、確信を得るプロセス。

---

## 技術スタック（最終構成）

- **ホスティング**: GitHub Pages
- **ドメイン**: `omoshiku.jp`（CNAME設定）
- **CSS**: インラインCSS（外部ファイル最小限）
- **JS**: GSAP + ScrollTrigger + Canvas 2D
- **フォント**: Google Fonts（Zen Antique, Sora, Noto Sans JP, Inter）
- **アクセシビリティ**: `prefers-reduced-motion` 完全対応

---

## 今後の改善候補

- ダークモード対応（現状はダーク固定）
- コンタクトフォーム統合（現状は外部リンク）
- ページ表示速度の最適化（インラインCSS肥大化への対策）
- サービス詳細ページの復活（現在はindex.html単一構成）
