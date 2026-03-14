---
title: "AI駆動開発の汎用思考フレームワーク + チーム開発プラクティス"
description: "要件定義・設計・テストの各フェーズで品質と効率を高める汎用的な思考プロセスと、仕様書ファースト・ADR・テストケースドキュメント化などのチーム開発ベストプラクティスをまとめた実践ガイド。"
date: 2026-03-14
category: "ai"
tags: [ai-driven-dev, frameworks, quality, team-development, adr, spec-driven]
summary: "AI駆動開発において、個別プロジェクトのスキルを量産するのではなく、どんな開発でも品質と効率を高める汎用的な思考フレームワークをまとめた。要件定義の三軸フィルター（D x F x V）、プレモーテム（事前検死）、受入条件12項目チェック、設計時の代替案比較・ADR・コスト意識・4層ガードレール、テスト時のDQ 7次元・セルフレビュー8ステップ、そしてad-conversion-kitに学ぶチーム開発プラクティス（仕様書ファースト、テストケースID管理、Issue-driven開発）を体系化。"
keywords: [三軸フィルター, プレモーテム, ADR, DQ7次元, セルフレビュー, 仕様書ファースト, コンテキストエンジニアリング]
subcategory: "開発プロセス"
difficulty: intermediate
audience: self
source: "Claude Code session 2026-03-14"
---

<style>
  :root {
    --navy: #1B2A4A;
    --navy-light: #2C4066;
    --gray-bg: #F7F8FA;
    --gray-card: #FFFFFF;
    --gray-border: #E2E5EB;
    --gray-text: #5A6578;
    --orange: #E87722;
    --orange-light: #FFF4EC;
    --text-primary: #1B2A4A;
    --text-secondary: #5A6578;
  }

  .mckinsey-article {
    font-family: 'Noto Sans JP', 'Helvetica Neue', Arial, sans-serif;
    color: var(--text-primary);
    line-height: 1.7;
    max-width: 960px;
    margin: 0 auto;
  }

  /* ===== Hero Banner ===== */
  .hero-banner {
    background: linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%);
    color: #fff;
    padding: 48px 40px;
    border-radius: 12px;
    margin-bottom: 40px;
    position: relative;
    overflow: hidden;
  }
  .hero-banner::after {
    content: '';
    position: absolute;
    top: -30%;
    right: -10%;
    width: 300px;
    height: 300px;
    background: rgba(232,119,34,0.08);
    border-radius: 50%;
  }
  .hero-banner h1 {
    font-size: 1.8em;
    font-weight: 700;
    margin: 0 0 12px 0;
    letter-spacing: -0.02em;
    color: #fff;
  }
  .hero-subtitle {
    font-size: 1.05em;
    color: rgba(255,255,255,0.85);
    margin: 0;
    max-width: 680px;
  }

  /* ===== Pillar Cards ===== */
  .pillars-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    margin: 32px 0;
  }
  @media (max-width: 768px) {
    .pillars-grid { grid-template-columns: repeat(2, 1fr); }
  }
  .pillar-card {
    background: var(--gray-card);
    border: 1px solid var(--gray-border);
    border-radius: 10px;
    padding: 24px 20px;
    text-align: center;
    transition: box-shadow 0.2s;
  }
  .pillar-card:hover {
    box-shadow: 0 4px 20px rgba(27,42,74,0.08);
  }
  .pillar-icon {
    font-size: 2em;
    margin-bottom: 12px;
    display: block;
  }
  .pillar-card h4 {
    font-size: 0.85em;
    color: var(--navy);
    margin: 0 0 8px 0;
    font-weight: 700;
  }
  .pillar-card p {
    font-size: 0.78em;
    color: var(--gray-text);
    margin: 0;
    line-height: 1.5;
  }

  /* ===== Section Header ===== */
  .section-header {
    display: flex;
    align-items: center;
    gap: 16px;
    margin: 48px 0 24px 0;
    padding-bottom: 12px;
    border-bottom: 3px solid var(--navy);
  }
  .section-number {
    background: var(--navy);
    color: #fff;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 1.1em;
    flex-shrink: 0;
  }
  .section-header h2 {
    font-size: 1.35em;
    font-weight: 700;
    color: var(--navy);
    margin: 0;
  }

  /* ===== Insight Box (So What?) ===== */
  .insight-box {
    background: var(--orange-light);
    border-left: 4px solid var(--orange);
    padding: 16px 20px;
    border-radius: 0 8px 8px 0;
    margin: 20px 0;
  }
  .insight-box .insight-label {
    font-size: 0.75em;
    font-weight: 700;
    color: var(--orange);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 4px;
  }
  .insight-box p {
    margin: 0;
    font-size: 0.92em;
    color: var(--text-primary);
    font-weight: 500;
  }

  /* ===== Infographic: 3-Axis Venn ===== */
  .axis-cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin: 24px 0;
  }
  @media (max-width: 768px) {
    .axis-cards { grid-template-columns: 1fr; }
  }
  .axis-card {
    border-radius: 10px;
    padding: 24px;
    text-align: center;
    border: 2px solid;
  }
  .axis-card.desirability {
    background: #F0F4FF;
    border-color: #4A72C4;
  }
  .axis-card.feasibility {
    background: #F0FAF0;
    border-color: #4A9E6F;
  }
  .axis-card.viability {
    background: #FFF8F0;
    border-color: var(--orange);
  }
  .axis-card .axis-icon { font-size: 1.8em; margin-bottom: 8px; display: block; }
  .axis-card h4 {
    font-size: 0.95em;
    margin: 0 0 4px 0;
    font-weight: 700;
  }
  .axis-card .axis-subtitle {
    font-size: 0.78em;
    color: var(--gray-text);
    margin: 0 0 12px 0;
  }
  .axis-card .axis-question {
    font-size: 0.88em;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0 0 8px 0;
  }
  .axis-examples {
    font-size: 0.78em;
    color: var(--gray-text);
    text-align: left;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .axis-examples li { padding: 2px 0; }
  .axis-examples li::before { content: ''; margin-right: 6px; }

  /* ===== 5W Grid ===== */
  .five-w-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 12px;
    margin: 24px 0;
  }
  @media (max-width: 768px) {
    .five-w-grid { grid-template-columns: repeat(3, 1fr); }
  }
  .five-w-item {
    background: var(--gray-card);
    border: 1px solid var(--gray-border);
    border-radius: 10px;
    padding: 20px 16px;
    text-align: center;
  }
  .five-w-item .w-letter {
    font-size: 1.6em;
    font-weight: 800;
    color: var(--navy);
    margin-bottom: 4px;
  }
  .five-w-item .w-label {
    font-size: 0.72em;
    color: var(--orange);
    font-weight: 700;
    text-transform: uppercase;
    margin-bottom: 8px;
  }
  .five-w-item .w-question {
    font-size: 0.82em;
    color: var(--text-primary);
    font-weight: 600;
    margin-bottom: 6px;
  }
  .five-w-item .w-hint {
    font-size: 0.72em;
    color: var(--gray-text);
  }

  /* ===== Checklist ===== */
  .checklist-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    margin: 24px 0;
  }
  @media (max-width: 768px) {
    .checklist-grid { grid-template-columns: repeat(2, 1fr); }
  }
  .checklist-item {
    background: var(--gray-card);
    border: 1px solid var(--gray-border);
    border-radius: 8px;
    padding: 14px 16px;
    font-size: 0.82em;
    display: flex;
    align-items: flex-start;
    gap: 8px;
  }
  .checklist-num {
    background: var(--navy);
    color: #fff;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7em;
    font-weight: 700;
    flex-shrink: 0;
  }

  /* ===== Comparison Table ===== */
  .comparison-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    border-radius: 10px;
    overflow: hidden;
    margin: 24px 0;
    font-size: 0.88em;
    border: 1px solid var(--gray-border);
  }
  .comparison-table th {
    background: var(--navy);
    color: #fff;
    padding: 14px 16px;
    text-align: left;
    font-weight: 600;
  }
  .comparison-table td {
    padding: 12px 16px;
    border-bottom: 1px solid var(--gray-border);
    background: var(--gray-card);
  }
  .comparison-table tr:last-child td { border-bottom: none; }
  .comparison-table tr:nth-child(even) td { background: var(--gray-bg); }

  /* ===== Layer Diagram ===== */
  .layer-stack {
    display: flex;
    flex-direction: column;
    gap: 0;
    margin: 24px 0;
  }
  .layer-item {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px 20px;
    border: 1px solid var(--gray-border);
    background: var(--gray-card);
  }
  .layer-item:first-child { border-radius: 10px 10px 0 0; }
  .layer-item:last-child { border-radius: 0 0 10px 10px; }
  .layer-item + .layer-item { border-top: none; }
  .layer-badge {
    background: var(--navy);
    color: #fff;
    padding: 4px 12px;
    border-radius: 4px;
    font-size: 0.78em;
    font-weight: 700;
    white-space: nowrap;
  }
  .layer-item:last-child .layer-badge {
    background: var(--orange);
  }
  .layer-content h5 {
    font-size: 0.88em;
    margin: 0 0 2px 0;
    color: var(--text-primary);
  }
  .layer-content p {
    font-size: 0.78em;
    color: var(--gray-text);
    margin: 0;
  }

  /* ===== DQ Radar-like Grid ===== */
  .dq-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
    margin: 24px 0;
  }
  @media (max-width: 768px) {
    .dq-grid { grid-template-columns: repeat(2, 1fr); }
  }
  .dq-item {
    border-radius: 10px;
    padding: 20px 16px;
    text-align: center;
    border: 1px solid var(--gray-border);
    background: var(--gray-card);
  }
  .dq-item.required {
    border-color: var(--navy);
    background: #F0F3F8;
  }
  .dq-item .dq-icon { font-size: 1.4em; margin-bottom: 6px; display: block; }
  .dq-item h5 {
    font-size: 0.82em;
    margin: 0 0 2px 0;
    color: var(--navy);
    font-weight: 700;
  }
  .dq-item .dq-en {
    font-size: 0.68em;
    color: var(--gray-text);
    margin: 0 0 8px 0;
  }
  .dq-item .dq-method {
    font-size: 0.75em;
    color: var(--text-secondary);
  }
  .dq-item .dq-badge {
    display: inline-block;
    background: var(--navy);
    color: #fff;
    font-size: 0.65em;
    padding: 2px 8px;
    border-radius: 10px;
    font-weight: 600;
    margin-top: 6px;
  }

  /* ===== Steps ===== */
  .steps-row {
    display: flex;
    gap: 0;
    margin: 24px 0;
    overflow-x: auto;
  }
  .step-item {
    flex: 1;
    min-width: 100px;
    background: var(--gray-card);
    border: 1px solid var(--gray-border);
    padding: 20px 16px;
    text-align: center;
    position: relative;
  }
  .step-item:first-child { border-radius: 10px 0 0 10px; }
  .step-item:last-child { border-radius: 0 10px 10px 0; }
  .step-item + .step-item { border-left: none; }
  .step-item.must {
    background: var(--orange-light);
    border-color: var(--orange);
  }
  .step-num {
    font-size: 1.4em;
    font-weight: 800;
    color: var(--navy);
    display: block;
    margin-bottom: 4px;
  }
  .step-item.must .step-num { color: var(--orange); }
  .step-item h5 {
    font-size: 0.78em;
    margin: 0 0 4px 0;
    color: var(--text-primary);
    font-weight: 600;
  }
  .step-item p {
    font-size: 0.7em;
    color: var(--gray-text);
    margin: 0;
  }

  /* ===== Process Flow ===== */
  .process-flow {
    display: flex;
    align-items: center;
    gap: 0;
    margin: 24px 0;
    flex-wrap: wrap;
  }
  .process-step {
    background: var(--navy);
    color: #fff;
    padding: 12px 20px;
    border-radius: 8px;
    font-size: 0.82em;
    font-weight: 600;
    text-align: center;
  }
  .process-arrow {
    color: var(--gray-text);
    font-size: 1.2em;
    padding: 0 8px;
  }

  /* ===== Tree Diagram ===== */
  .tree-container {
    background: var(--gray-bg);
    border-radius: 10px;
    padding: 24px;
    margin: 24px 0;
    font-family: 'Courier New', monospace;
    font-size: 0.85em;
    color: var(--navy);
    line-height: 1.6;
  }

  /* ===== Priority Matrix ===== */
  .priority-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    border-radius: 10px;
    overflow: hidden;
    margin: 24px 0;
    font-size: 0.85em;
    border: 1px solid var(--gray-border);
  }
  .priority-table th {
    background: var(--navy);
    color: #fff;
    padding: 14px 16px;
    text-align: left;
    font-weight: 600;
  }
  .priority-table td {
    padding: 14px 16px;
    border-bottom: 1px solid var(--gray-border);
    background: var(--gray-card);
  }
  .priority-table tr:last-child td { border-bottom: none; }
  .priority-badge {
    display: inline-block;
    padding: 3px 10px;
    border-radius: 12px;
    font-size: 0.78em;
    font-weight: 600;
  }
  .priority-badge.always { background: var(--orange); color: #fff; }
  .priority-badge.situational { background: var(--navy); color: #fff; }
  .priority-badge.optional { background: var(--gray-border); color: var(--text-primary); }

  /* ===== Sub Section ===== */
  .sub-section {
    margin: 28px 0;
  }
  .sub-section h3 {
    font-size: 1.05em;
    color: var(--navy);
    font-weight: 700;
    margin: 0 0 12px 0;
    padding-left: 12px;
    border-left: 4px solid var(--navy);
  }
  .sub-section p {
    font-size: 0.9em;
    color: var(--text-secondary);
    margin: 8px 0;
  }

  /* ===== ADR Template ===== */
  .adr-template {
    background: var(--gray-bg);
    border: 1px solid var(--gray-border);
    border-radius: 10px;
    padding: 24px;
    margin: 20px 0;
  }
  .adr-template h5 {
    color: var(--navy);
    font-size: 0.85em;
    margin: 0 0 4px 0;
  }
  .adr-template .adr-field {
    color: var(--gray-text);
    font-size: 0.82em;
    margin: 0 0 12px 0;
    padding-left: 12px;
    border-left: 2px solid var(--gray-border);
  }

  /* ===== Specs Template ===== */
  .specs-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    margin: 20px 0;
  }
  @media (max-width: 768px) {
    .specs-grid { grid-template-columns: 1fr; }
  }
  .specs-item {
    background: var(--gray-card);
    border: 1px solid var(--gray-border);
    border-radius: 8px;
    padding: 14px 16px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .specs-item.must {
    border-color: var(--orange);
    background: var(--orange-light);
  }
  .specs-num {
    background: var(--navy);
    color: #fff;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7em;
    font-weight: 700;
    flex-shrink: 0;
  }
  .specs-item.must .specs-num { background: var(--orange); }
  .specs-text {
    font-size: 0.82em;
    color: var(--text-primary);
  }

  /* ===== Before/After Comparison ===== */
  .ba-section {
    background: var(--gray-bg);
    border-radius: 12px;
    padding: 32px;
    margin-bottom: 40px;
  }
  .ba-section-title {
    font-size: 1.3em;
    font-weight: 700;
    color: var(--navy);
    margin: 0 0 8px 0;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .ba-section-subtitle {
    font-size: 0.92em;
    color: var(--text-secondary);
    margin: 0 0 24px 0;
  }
  .ba-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 32px;
    font-size: 0.88em;
  }
  .ba-table th {
    background: var(--navy);
    color: #fff;
    padding: 12px 16px;
    text-align: left;
    font-weight: 600;
  }
  .ba-table th:first-child { border-radius: 8px 0 0 0; }
  .ba-table th:last-child { border-radius: 0 8px 0 0; }
  .ba-table td {
    padding: 14px 16px;
    border-bottom: 1px solid var(--gray-border);
    vertical-align: top;
  }
  .ba-table tr:last-child td { border-bottom: none; }
  .ba-table tr:nth-child(even) td { background: var(--gray-bg); }
  .ba-table tr:nth-child(odd) td { background: var(--gray-card); }
  .ba-table .phase-label {
    font-weight: 700;
    color: var(--navy);
    white-space: nowrap;
  }
  .ba-before {
    color: var(--text-secondary);
  }
  .ba-after {
    color: var(--text-primary);
    font-weight: 500;
  }
  .ba-arrow {
    color: var(--orange);
    font-weight: 700;
    margin: 0 4px;
  }

  /* Auto-change cards */
  .auto-changes {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
    margin: 24px 0 32px 0;
  }
  @media (max-width: 768px) {
    .auto-changes { grid-template-columns: 1fr; }
  }
  .auto-card {
    background: var(--gray-card);
    border: 1px solid var(--gray-border);
    border-radius: 10px;
    padding: 18px 20px;
    border-left: 4px solid var(--navy);
  }
  .auto-card-trigger {
    font-size: 0.78em;
    font-weight: 700;
    color: var(--orange);
    text-transform: uppercase;
    letter-spacing: 0.04em;
    margin: 0 0 6px 0;
  }
  .auto-card-title {
    font-size: 0.92em;
    font-weight: 700;
    color: var(--navy);
    margin: 0 0 6px 0;
  }
  .auto-card-desc {
    font-size: 0.82em;
    color: var(--text-secondary);
    margin: 0;
    line-height: 1.6;
  }

  /* Prompt guide */
  .prompt-phase {
    margin-bottom: 24px;
  }
  .prompt-phase-title {
    font-size: 1em;
    font-weight: 700;
    color: var(--navy);
    margin: 0 0 12px 0;
    padding-bottom: 6px;
    border-bottom: 2px solid var(--orange);
    display: inline-block;
  }
  .prompt-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .prompt-list li {
    background: var(--gray-card);
    border: 1px solid var(--gray-border);
    border-radius: 8px;
    padding: 12px 16px;
    margin-bottom: 8px;
    font-size: 0.85em;
    color: var(--text-primary);
    font-family: 'Consolas', 'Source Code Pro', monospace;
    line-height: 1.5;
  }

  /* Top 3 habits */
  .habits-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin: 24px 0;
  }
  @media (max-width: 768px) {
    .habits-grid { grid-template-columns: 1fr; }
  }
  .habit-card {
    background: var(--gray-card);
    border: 2px solid var(--orange);
    border-radius: 12px;
    padding: 24px 20px;
    text-align: center;
  }
  .habit-num {
    background: var(--orange);
    color: #fff;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1em;
    font-weight: 700;
    margin-bottom: 12px;
  }
  .habit-title {
    font-size: 0.95em;
    font-weight: 700;
    color: var(--navy);
    margin: 0 0 8px 0;
  }
  .habit-desc {
    font-size: 0.82em;
    color: var(--text-secondary);
    margin: 0;
    line-height: 1.6;
  }

  /* ===== Skill Routing Table ===== */
  .skill-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    border-radius: 8px;
    overflow: hidden;
    font-size: 0.88em;
    margin: 20px 0;
  }
  .skill-table th {
    background: var(--navy);
    color: #fff;
    padding: 12px 16px;
    text-align: left;
    font-weight: 600;
  }
  .skill-table td {
    padding: 12px 16px;
    border-bottom: 1px solid var(--gray-border);
  }
  .skill-table tr:last-child td { border-bottom: none; }
  .skill-table tr:nth-child(even) td { background: var(--gray-bg); }
  .skill-table tr:nth-child(odd) td { background: var(--gray-card); }
  .skill-badge {
    display: inline-block;
    background: var(--navy);
    color: #fff;
    font-size: 0.82em;
    font-weight: 600;
    padding: 3px 10px;
    border-radius: 12px;
    font-family: 'Consolas', 'Source Code Pro', monospace;
  }
  .skill-badge.api { background: #2E7D32; }
  .skill-badge.app { background: var(--orange); }
  .skill-badge.sql { background: var(--navy); }
  .skill-note {
    font-size: 0.82em;
    color: var(--text-secondary);
    margin-top: 4px;
  }
  .architecture-note {
    background: var(--orange-light);
    border: 1px solid var(--orange);
    border-radius: 10px;
    padding: 18px 22px;
    margin: 20px 0 0 0;
    font-size: 0.88em;
    color: var(--text-primary);
    display: flex;
    align-items: flex-start;
    gap: 12px;
  }
  .architecture-note-icon {
    font-size: 1.4em;
    flex-shrink: 0;
  }
</style>

<div class="mckinsey-article">

<!-- ===== HERO ===== -->
<div class="hero-banner">
  <h1>AI駆動開発の汎用思考フレームワーク</h1>
  <p class="hero-subtitle">開発プロセス全体の品質と効率を高める — 要件定義・設計・テスト・チーム運営の横断的プラクティス集</p>
</div>

<!-- ===== WHAT CHANGES: Before → After ===== -->
<div class="ba-section">
  <h2 class="ba-section-title">&#9889; 開発プロセスの Before → After</h2>
  <p class="ba-section-subtitle">このフレームワーク導入で、各フェーズがどう変わるか</p>

  <table class="ba-table">
    <thead>
      <tr>
        <th>フェーズ</th>
        <th>Before（今まで）</th>
        <th>After（これから）</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="phase-label">要件定義</td>
        <td class="ba-before">「こんなテーブルほしい」→ 即着手</td>
        <td class="ba-after">三軸フィルター（D x F x V）で需要・実現性・持続性を検証 <span class="ba-arrow">→</span> プレモーテムで失敗シナリオ3つ <span class="ba-arrow">→</span> 受入条件確定 <span class="ba-arrow">→</span> 着手</td>
      </tr>
      <tr>
        <td class="phase-label">設計</td>
        <td class="ba-before">1案で進める。判断理由は記憶の中</td>
        <td class="ba-after">最低2案を比較 <span class="ba-arrow">→</span> ADRで判断理由を記録 <span class="ba-arrow">→</span> コストの桁感を把握 <span class="ba-arrow">→</span> ガードレール設計</td>
      </tr>
      <tr>
        <td class="phase-label">テスト</td>
        <td class="ba-before">dq-checkerが5カテゴリ</td>
        <td class="ba-after">dq-checkerが<strong>7次元</strong>（Accuracy・Integrity・Timeliness追加） + セルフレビュー8ステップがPR前チェックに組み込み</td>
      </tr>
      <tr>
        <td class="phase-label">新規PJ開始</td>
        <td class="ba-before">ゼロから構築</td>
        <td class="ba-after">team-dev-practice.md の骨格テンプレートが自動提案される</td>
      </tr>
      <tr>
        <td class="phase-label">サブエージェント</td>
        <td class="ba-before">タスク実行のみ</td>
        <td class="ba-after">コンテキスト6要素チェックを実行前にセルフチェック <span class="ba-arrow">→</span> 情報不足を自発報告</td>
      </tr>
    </tbody>
  </table>

  <!-- Auto-change cards -->
  <h3 style="font-size: 1.05em; font-weight: 700; color: var(--navy); margin: 0 0 16px 0;">&#9881; 具体的に「自動で変わる」部分</h3>
  <div class="auto-changes">
    <div class="auto-card">
      <p class="auto-card-trigger">/sql-develop 実行時</p>
      <p class="auto-card-title">Phase 0 で三軸フィルター + プレモーテム</p>
      <p class="auto-card-desc">D/F/V の懸念があれば質問に自動追加。着手前に需要・実現性・持続性を検証する</p>
    </div>
    <div class="auto-card">
      <p class="auto-card-trigger">/pr-review 実行時</p>
      <p class="auto-card-title">Phase 4 にセルフレビュー8ステップ</p>
      <p class="auto-card-desc">必須3点（意図・目視・AI意図確認）にマーク付きで表示される</p>
    </div>
    <div class="auto-card">
      <p class="auto-card-trigger">dq-checker 実行時</p>
      <p class="auto-card-title">7次元DQチェック（3次元追加）</p>
      <p class="auto-card-desc">ソーステーブル指定で正確性突合、参照テーブルで孤立レコード、日付カラムでデータ鮮度チェック</p>
    </div>
    <div class="auto-card">
      <p class="auto-card-trigger">新規PJ着手時</p>
      <p class="auto-card-title">requirements-thinking.md 自動参照</p>
      <p class="auto-card-desc">CLAUDE.md のルーティングで、新規PJ着手時に汎用フレームワークが自動ロードされる</p>
    </div>
  </div>

  <!-- Skill Routing -->
  <h3 style="font-size: 1.05em; font-weight: 700; color: var(--navy); margin: 32px 0 16px 0;">&#128268; Skill 使い分け早見表</h3>
  <table class="skill-table">
    <thead>
      <tr>
        <th>やりたいこと</th>
        <th>Skill</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Meta広告データをBQに日次連携</td>
        <td><span class="skill-badge api">/api-develop</span></td>
      </tr>
      <tr>
        <td>kintoneで注文書管理アプリ</td>
        <td><span class="skill-badge app">/app-develop</span></td>
      </tr>
      <tr>
        <td>Slack通知の自動化</td>
        <td><span class="skill-badge api">/api-develop</span></td>
      </tr>
      <tr>
        <td>ダッシュボード画面構築</td>
        <td><span class="skill-badge app">/app-develop</span></td>
      </tr>
      <tr>
        <td>画面 + API連携（ハイブリッド）</td>
        <td><span class="skill-badge app">/app-develop</span><div class="skill-note">API部分は /api-develop Phase 1 を参照</div></td>
      </tr>
      <tr>
        <td>BQマートテーブル構築</td>
        <td><span class="skill-badge sql">/sql-develop</span></td>
      </tr>
    </tbody>
  </table>
  <div class="architecture-note">
    <span class="architecture-note-icon">&#128279;</span>
    <div><strong>二層構造（Rule x Skill）</strong>: 3つのSkillが同じRule層（requirements-thinking.md, design-thinking.md等）を参照する。どのSkillでも品質プロセスが統一される Single Source of Truth アーキテクチャ。</div>
  </div>
</div>

<!-- ===== HOW TO MAXIMIZE: Prompt Guide ===== -->
<div class="ba-section">
  <h2 class="ba-section-title">&#128640; 最大限に活かすためのプロンプトガイド</h2>
  <p class="ba-section-subtitle">各フェーズで意識的に投げるべきプロンプト</p>

  <div class="prompt-phase">
    <h4 class="prompt-phase-title">要件定義時</h4>
    <ul class="prompt-list">
      <li>「D x F x V で見落としない？特にV（持続性）で運用コスト・保守体制を確認して」</li>
      <li>「プレモーテムやって。失敗シナリオ3つ以上挙げて」</li>
      <li>「受入条件12項目で、この開発に該当するものを整理して」</li>
    </ul>
  </div>

  <div class="prompt-phase">
    <h4 class="prompt-phase-title">設計時</h4>
    <ul class="prompt-list">
      <li>「別のアプローチを2つ提案して。比較表で見せて」</li>
      <li>「この判断はADRに残す価値ある？トレードオフは何？」</li>
      <li>「コストの桁感を教えて（月額$1/$10/$100のどれ？）」</li>
      <li>「ガードレールはどのレベルから始める？」</li>
    </ul>
  </div>

  <div class="prompt-phase">
    <h4 class="prompt-phase-title">テスト・PR前</h4>
    <ul class="prompt-list">
      <li>「セルフレビュー8ステップやって。特に1（意図）と7（AI意図確認）」</li>
      <li>「DQ 7次元で今回必須なのはどれ？Accuracy突合は必要？」</li>
      <li>「回帰テスト: この変更で下流のダッシュボード/レポートに影響ある？」</li>
    </ul>
  </div>

  <div class="prompt-phase">
    <h4 class="prompt-phase-title">新規PJ開始時</h4>
    <ul class="prompt-list">
      <li>「team-dev-practice.md の骨格テンプレートでプロジェクト構造作って」</li>
      <li>「仕様書ファーストで、まず目的・スコープ・受入条件だけ書いて」</li>
      <li>「Issue-driven でブランチ切って」</li>
    </ul>
  </div>

  <!-- Top 3 Habits -->
  <h3 style="font-size: 1.05em; font-weight: 700; color: var(--navy); margin: 32px 0 16px 0;">&#127942; 最も重要な3つの習慣</h3>
  <div class="habits-grid">
    <div class="habit-card">
      <div class="habit-num">1</div>
      <h4 class="habit-title">「なぜ」を先に言語化する</h4>
      <p class="habit-desc">プロンプトに「これは〜のために作る」を必ず含める。コンテキストの質が成果物の質を決める</p>
    </div>
    <div class="habit-card">
      <div class="habit-num">2</div>
      <h4 class="habit-title">2案比較を癖にする</h4>
      <p class="habit-desc">「これでいいよね？」ではなく「他にある？」と聞く。Rule側で代替案提案が組み込まれたので、促せば出てくる</p>
    </div>
    <div class="habit-card">
      <div class="habit-num">3</div>
      <h4 class="habit-title">セルフレビュー3点は飛ばさない</h4>
      <p class="habit-desc">特に 7（AI意図確認）— AIが書いたコードを「説明して」と聞いて、自分が理解してから採用する</p>
    </div>
  </div>
</div>

<!-- ===== 4 PILLARS ===== -->
<div class="pillars-grid">
  <div class="pillar-card">
    <span class="pillar-icon">&#9878;</span>
    <h4>判断の確信度</h4>
    <p>ツールではなく思考の質が生産性を決める</p>
  </div>
  <div class="pillar-card">
    <span class="pillar-icon">&#128269;</span>
    <h4>文脈情報の充足</h4>
    <p>失敗の8割は文脈情報の欠落に起因する</p>
  </div>
  <div class="pillar-card">
    <span class="pillar-icon">&#9745;</span>
    <h4>テストファースト</h4>
    <p>作る前に「何をテストするか」を決める</p>
  </div>
  <div class="pillar-card">
    <span class="pillar-icon">&#128221;</span>
    <h4>思考の形跡</h4>
    <p>「なぜそう作ったか」をドキュメントに残す</p>
  </div>
</div>

<!-- ===== SECTION 1: REQUIREMENTS ===== -->
<div class="section-header">
  <div class="section-number">1</div>
  <h2>要件定義フェーズ</h2>
</div>

<div class="sub-section">
  <h3>三軸フィルター D &times; F &times; V</h3>
  <p>あらゆるプロジェクトの要件を3軸で検証する。1軸でも欠けたまま進むと手戻りが発生する。</p>
</div>

<div class="axis-cards">
  <div class="axis-card desirability">
    <span class="axis-icon">&#10084;</span>
    <h4>Desirability</h4>
    <p class="axis-subtitle">需要</p>
    <p class="axis-question">誰が、何のために使うか？</p>
    <ul class="axis-examples">
      <li>広告担当者が入稿作業を時短</li>
      <li>営業がConnected Sheetsで日次KPI確認</li>
    </ul>
  </div>
  <div class="axis-card feasibility">
    <span class="axis-icon">&#9881;</span>
    <h4>Feasibility</h4>
    <p class="axis-subtitle">実現性</p>
    <p class="axis-question">技術的に可能か？制約は？</p>
    <ul class="axis-examples">
      <li>APIレート制限、認証要件</li>
      <li>テーブル容量、JOIN複雑度</li>
    </ul>
  </div>
  <div class="axis-card viability">
    <span class="axis-icon">&#128176;</span>
    <h4>Viability</h4>
    <p class="axis-subtitle">持続性</p>
    <p class="axis-question">運用コストは見合うか？</p>
    <ul class="axis-examples">
      <li>API課金、トークン更新、障害対応</li>
      <li>BQスキャンコスト、保守体制</li>
    </ul>
  </div>
</div>

<div class="insight-box">
  <div class="insight-label">So What?</div>
  <p>要件定義の最初に「D &times; F &times; V で見落としはないか？」と自問する。1軸でも欠けると手戻りコストが発生する。</p>
</div>

<div class="sub-section">
  <h3>プレモーテム（事前検死）</h3>
  <p>「このプロジェクトが失敗するとしたら原因は何か？」を着手前に考える。研究によると失敗特定能力が30%向上する。</p>
</div>

<div class="five-w-grid">
  <div class="five-w-item">
    <div class="w-letter">W</div>
    <div class="w-label">Who fails</div>
    <div class="w-question">誰が困るか</div>
    <div class="w-hint">ユーザー？運用者？</div>
  </div>
  <div class="five-w-item">
    <div class="w-letter">W</div>
    <div class="w-label">What breaks</div>
    <div class="w-question">何が壊れるか</div>
    <div class="w-hint">データ欠損？認証切れ？</div>
  </div>
  <div class="five-w-item">
    <div class="w-letter">W</div>
    <div class="w-label">When noticed</div>
    <div class="w-question">いつ気づくか</div>
    <div class="w-hint">即座？月末集計時？</div>
  </div>
  <div class="five-w-item">
    <div class="w-letter">W</div>
    <div class="w-label">Where impact</div>
    <div class="w-question">影響範囲は</div>
    <div class="w-hint">単体？下流全体？</div>
  </div>
  <div class="five-w-item">
    <div class="w-letter">W</div>
    <div class="w-label">Why happened</div>
    <div class="w-question">根本原因は</div>
    <div class="w-hint">設計ミス？仕様変更？</div>
  </div>
</div>

<div class="insight-box">
  <div class="insight-label">So What?</div>
  <p>3つ以上の失敗シナリオを挙げられないなら、要件の理解が浅い。</p>
</div>

<div class="sub-section">
  <h3>受入条件ファースト（12項目チェックリスト）</h3>
  <p>「何を作るか」ではなく「何ができたら完成か」を先に定義する。</p>
</div>

<div class="checklist-grid">
  <div class="checklist-item"><span class="checklist-num">1</span><span>ゴールが1文で説明できるか</span></div>
  <div class="checklist-item"><span class="checklist-num">2</span><span>入力データ/ソースが特定されているか</span></div>
  <div class="checklist-item"><span class="checklist-num">3</span><span>出力の形式・格納先が決まっているか</span></div>
  <div class="checklist-item"><span class="checklist-num">4</span><span>正常系の動作が定義されているか</span></div>
  <div class="checklist-item"><span class="checklist-num">5</span><span>異常系（エラー時の動作）が定義されているか</span></div>
  <div class="checklist-item"><span class="checklist-num">6</span><span>性能要件があるか</span></div>
  <div class="checklist-item"><span class="checklist-num">7</span><span>セキュリティ要件があるか</span></div>
  <div class="checklist-item"><span class="checklist-num">8</span><span>運用要件があるか</span></div>
  <div class="checklist-item"><span class="checklist-num">9</span><span>テスト方法が決まっているか</span></div>
  <div class="checklist-item"><span class="checklist-num">10</span><span>依存関係が明確か</span></div>
  <div class="checklist-item"><span class="checklist-num">11</span><span>完了のサインオフ方法が決まっているか</span></div>
  <div class="checklist-item"><span class="checklist-num">12</span><span>ロールバック方法が決まっているか</span></div>
</div>

<div class="insight-box">
  <div class="insight-label">So What?</div>
  <p>全12項目を埋める必要はない。「この項目は該当しない」と意識的に判断することが重要。</p>
</div>

<!-- ===== SECTION 2: DESIGN ===== -->
<div class="section-header">
  <div class="section-number">2</div>
  <h2>設計フェーズ</h2>
</div>

<div class="sub-section">
  <h3>代替案の比較（最低2案）</h3>
  <p>1案だけで進めない。最低2つの選択肢を並べて比較してから決定する。</p>
</div>

<table class="comparison-table">
  <tr><th>比較軸</th><th>問い</th></tr>
  <tr><td><strong>実装コスト</strong></td><td>何時間/何日かかるか</td></tr>
  <tr><td><strong>運用コスト</strong></td><td>月額いくらか。人的コストは</td></tr>
  <tr><td><strong>複雑度</strong></td><td>メンテナンスしやすいか</td></tr>
  <tr><td><strong>拡張性</strong></td><td>将来の変更に耐えるか</td></tr>
  <tr><td><strong>リスク</strong></td><td>失敗した場合の影響は</td></tr>
</table>

<div class="sub-section">
  <h3>ADR（Architecture Decision Record）</h3>
  <p>「なぜこの設計にしたか」を未来の自分に説明できるように記録する。</p>
</div>

<div class="adr-template">
  <h5>ADR-{番号}: {タイトル}</h5>
  <div class="adr-field"><strong>結論:</strong> 1-2文で決定事項を明記</div>
  <div class="adr-field"><strong>判断理由:</strong> 具体的な根拠を列挙</div>
  <div class="adr-field"><strong>トレードオフ:</strong> 受け入れるデメリットと許容理由</div>
  <div class="adr-field"><strong>参照:</strong> 関連ドキュメントへのリンク</div>
</div>

<div class="sub-section">
  <h3>コスト意識</h3>
  <p>正確な見積もりは不要。<strong>桁が合っているか</strong>（$1なのか$10なのか$100なのか）を把握するだけで十分。</p>
</div>

<div class="sub-section">
  <h3>ガードレール設計（4層）</h3>
  <p>「何をやっていいか」ではなく「何をやってはいけないか」を先に定義する。L4から始め、信頼度に応じて自動化を移す。</p>
</div>

<div class="layer-stack">
  <div class="layer-item">
    <span class="layer-badge">L1</span>
    <div class="layer-content">
      <h5>行動制限</h5>
      <p>許可する操作のホワイトリスト（「読み取りのみ」「テストアカウントのみ」）</p>
    </div>
  </div>
  <div class="layer-item">
    <span class="layer-badge">L2</span>
    <div class="layer-content">
      <h5>出力検証</h5>
      <p>結果の妥当性チェック（「行数が前回比 &plusmn;50%以内」）</p>
    </div>
  </div>
  <div class="layer-item">
    <span class="layer-badge">L3</span>
    <div class="layer-content">
      <h5>予算制御</h5>
      <p>コスト・回数の上限（「月額$100以下」「1日あたりAPI 1000回まで」）</p>
    </div>
  </div>
  <div class="layer-item">
    <span class="layer-badge">L4</span>
    <div class="layer-content">
      <h5>人間承認</h5>
      <p>重要操作は人間が最終判断（「本番広告配信」「データ削除」）</p>
    </div>
  </div>
</div>

<div class="insight-box">
  <div class="insight-label">So What?</div>
  <p>最初はL4（全件人間承認）で始め、実績と信頼度に応じてL1-L3に自動化を委譲していく。</p>
</div>

<!-- ===== SECTION 3: TESTING ===== -->
<div class="section-header">
  <div class="section-number">3</div>
  <h2>テスト・検証フェーズ</h2>
</div>

<div class="sub-section">
  <h3>DQ 7次元フレームワーク</h3>
  <p>データ品質を7つの次元で検証する。どんなデータにも適用できる汎用フレームワーク。</p>
</div>

<div class="dq-grid">
  <div class="dq-item required">
    <span class="dq-icon">&#128275;</span>
    <h5>一意性</h5>
    <p class="dq-en">Uniqueness</p>
    <p class="dq-method">主キーの重複チェック</p>
    <span class="dq-badge">必須</span>
  </div>
  <div class="dq-item required">
    <span class="dq-icon">&#9635;</span>
    <h5>完全性</h5>
    <p class="dq-en">Completeness</p>
    <p class="dq-method">NULL率チェック</p>
    <span class="dq-badge">必須</span>
  </div>
  <div class="dq-item required">
    <span class="dq-icon">&#10003;</span>
    <h5>妥当性</h5>
    <p class="dq-en">Validity</p>
    <p class="dq-method">値域・フォーマットチェック</p>
    <span class="dq-badge">必須</span>
  </div>
  <div class="dq-item">
    <span class="dq-icon">&#127919;</span>
    <h5>正確性</h5>
    <p class="dq-en">Accuracy</p>
    <p class="dq-method">ソースデータとの突合</p>
  </div>
  <div class="dq-item">
    <span class="dq-icon">&#128279;</span>
    <h5>整合性</h5>
    <p class="dq-en">Integrity</p>
    <p class="dq-method">外部キー参照チェック</p>
  </div>
  <div class="dq-item">
    <span class="dq-icon">&#9878;</span>
    <h5>一貫性</h5>
    <p class="dq-en">Consistency</p>
    <p class="dq-method">クロスチェック</p>
  </div>
  <div class="dq-item">
    <span class="dq-icon">&#9203;</span>
    <h5>適時性</h5>
    <p class="dq-en">Timeliness</p>
    <p class="dq-method">最終更新日時チェック</p>
  </div>
</div>

<div class="sub-section">
  <h3>セルフレビュー 8ステップ</h3>
  <p>PRやデプロイの前に自分自身で品質をチェックする。必須は <strong>1 + 3 + 7</strong> の3つ。</p>
</div>

<div class="steps-row">
  <div class="step-item must">
    <span class="step-num">1</span>
    <h5>意図の言語化</h5>
    <p>「なぜ」を1文で</p>
  </div>
  <div class="step-item">
    <span class="step-num">2</span>
    <h5>粒度の確認</h5>
    <p>レコード数・単位</p>
  </div>
  <div class="step-item must">
    <span class="step-num">3</span>
    <h5>目視確認</h5>
    <p>サンプルを見る</p>
  </div>
  <div class="step-item">
    <span class="step-num">4</span>
    <h5>ソース突合</h5>
    <p>元データと照合</p>
  </div>
  <div class="step-item">
    <span class="step-num">5</span>
    <h5>極端値</h5>
    <p>MIN/MAX/AVG</p>
  </div>
  <div class="step-item">
    <span class="step-num">6</span>
    <h5>NULL理解</h5>
    <p>発生パターン</p>
  </div>
  <div class="step-item must">
    <span class="step-num">7</span>
    <h5>AI意図確認</h5>
    <p>説明できるか</p>
  </div>
  <div class="step-item">
    <span class="step-num">8</span>
    <h5>一晩寝かせる</h5>
    <p>翌日再確認</p>
  </div>
</div>

<div class="insight-box">
  <div class="insight-label">So What?</div>
  <p>自動テストでは検出できない「意図の整合性」を人間が最終確認する。AIが書いたコードほど、意図確認ステップが重要。</p>
</div>

<!-- ===== SECTION 4: MINDSET ===== -->
<div class="section-header">
  <div class="section-number">4</div>
  <h2>横断的マインドセット</h2>
</div>

<div class="sub-section">
  <h3>コンテキストエンジニアリング</h3>
  <p>「失敗の8割は文脈情報の欠落」。AIに渡す情報の質が成果物の質を決める。</p>
</div>

<table class="comparison-table">
  <tr><th>要素</th><th>実践</th></tr>
  <tr><td><strong>System Prompt</strong></td><td>CLAUDE.md / Rules でプロジェクト文脈を常時供給</td></tr>
  <tr><td><strong>User Prompt</strong></td><td>「何を」「なぜ」「どの程度」を明示</td></tr>
  <tr><td><strong>State / History</strong></td><td>/compact で要約、/clear でリセット</td></tr>
  <tr><td><strong>Long-term Memory</strong></td><td>MEMORY.md で過去の教訓を蓄積</td></tr>
  <tr><td><strong>Retrieved Info</strong></td><td>スキーマ確認ファースト、APIドキュメント事前取得</td></tr>
  <tr><td><strong>Tools / Output</strong></td><td>Agentの役割分担、出力フォーマット統一</td></tr>
</table>

<div class="pillars-grid" style="grid-template-columns: repeat(3, 1fr);">
  <div class="pillar-card">
    <span class="pillar-icon">&#128260;</span>
    <h4>2回失敗ルール</h4>
    <p>同じアプローチで2回失敗したら別の方法に切り替える</p>
  </div>
  <div class="pillar-card">
    <span class="pillar-icon">&#9854;</span>
    <h4>冪等性の意識</h4>
    <p>2回実行しても結果が変わらない設計にする</p>
  </div>
  <div class="pillar-card">
    <span class="pillar-icon">&#128274;</span>
    <h4>最小権限の原則</h4>
    <p>全部NGから必要なものだけ開ける</p>
  </div>
</div>

<!-- ===== SECTION 5: TEAM PRACTICES ===== -->
<div class="section-header">
  <div class="section-number">5</div>
  <h2>チーム開発プラクティス</h2>
</div>

<div class="sub-section">
  <h3>ドキュメント構造の型</h3>
  <p>プロジェクトごとに以下の構造を標準化する。</p>
</div>

<div class="tree-container">
docs/<br>
├── specs/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;仕様書 — WHAT: 何を作るか<br>
├── plan/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;計画 — WHY: なぜそう作るか（ADR含む）<br>
├── runbooks/&nbsp;&nbsp;運用 — HOW: 障害時どうするか<br>
├── tests/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;テスト — VERIFY: 正しく動くか<br>
└── setup/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;セットアップ — ONBOARD: どう始めるか
</div>

<div class="sub-section">
  <h3>仕様書ファースト（Spec-driven Development）</h3>
  <p>コードを書く前に仕様書を書く。最低限 <strong>1（目的）+ 2（スコープ）+ 9（受入条件）</strong>で成立。</p>
</div>

<div class="specs-grid">
  <div class="specs-item must"><span class="specs-num">1</span><span class="specs-text">目的 — なぜ作るか</span></div>
  <div class="specs-item must"><span class="specs-num">2</span><span class="specs-text">スコープ / 非スコープ</span></div>
  <div class="specs-item"><span class="specs-num">3</span><span class="specs-text">完了定義</span></div>
  <div class="specs-item"><span class="specs-num">4</span><span class="specs-text">アーキテクチャ（データフロー）</span></div>
  <div class="specs-item"><span class="specs-num">5</span><span class="specs-text">実装仕様</span></div>
  <div class="specs-item"><span class="specs-num">6</span><span class="specs-text">冪等性・リトライ・ログ</span></div>
  <div class="specs-item"><span class="specs-num">7</span><span class="specs-text">セキュリティ</span></div>
  <div class="specs-item"><span class="specs-num">8</span><span class="specs-text">検証</span></div>
  <div class="specs-item must"><span class="specs-num">9</span><span class="specs-text">受入条件（Acceptance Criteria）</span></div>
  <div class="specs-item"><span class="specs-num">10</span><span class="specs-text">テストケース参照</span></div>
</div>

<div class="sub-section">
  <h3>Issue-driven 開発</h3>
  <p>変更の「なぜ」を追跡可能にする。半年後に Issue番号で全部追跡できる。</p>
</div>

<div class="process-flow">
  <div class="process-step">Issue起票</div>
  <span class="process-arrow">&#8594;</span>
  <div class="process-step">ブランチ作成</div>
  <span class="process-arrow">&#8594;</span>
  <div class="process-step">Issue番号付きコミット</div>
  <span class="process-arrow">&#8594;</span>
  <div class="process-step">PR作成</div>
  <span class="process-arrow">&#8594;</span>
  <div class="process-step">レビュー</div>
  <span class="process-arrow">&#8594;</span>
  <div class="process-step">マージ</div>
</div>

<div class="pillars-grid" style="grid-template-columns: repeat(3, 1fr);">
  <div class="pillar-card">
    <span class="pillar-icon">&#128203;</span>
    <h4>PRに「Why」を強制</h4>
    <p>Whatだけは3ヶ月後にゴミ。Whyがあれば資産。</p>
  </div>
  <div class="pillar-card">
    <span class="pillar-icon">&#128230;</span>
    <h4>環境再現性</h4>
    <p>.env.example + requirements.txt で「何が必要か」を明示</p>
  </div>
  <div class="pillar-card">
    <span class="pillar-icon">&#128196;</span>
    <h4>Contract Test</h4>
    <p>外部APIの入出力形式を明文化し、仕様変更事故を防ぐ</p>
  </div>
</div>

<!-- ===== PRIORITY MATRIX ===== -->
<div class="section-header">
  <div class="section-number" style="background: var(--orange);">&#9733;</div>
  <h2>実践の優先順位</h2>
</div>

<table class="priority-table">
  <tr>
    <th>優先度</th>
    <th>実践項目</th>
    <th>理由</th>
  </tr>
  <tr>
    <td><span class="priority-badge always">毎回やる</span></td>
    <td><strong>三軸フィルター</strong> + 受入条件3項目（目的・スコープ・受入条件）</td>
    <td>手戻りの8割を防ぐ</td>
  </tr>
  <tr>
    <td><span class="priority-badge always">毎回やる</span></td>
    <td><strong>セルフレビュー3点</strong>（意図・目視・AI意図確認）</td>
    <td>品質の最終防衛線</td>
  </tr>
  <tr>
    <td><span class="priority-badge situational">迷ったら</span></td>
    <td><strong>ADR</strong> + 代替案比較</td>
    <td>判断の記録</td>
  </tr>
  <tr>
    <td><span class="priority-badge situational">新規PJ時</span></td>
    <td><strong>プロジェクト骨格テンプレート</strong> + Issue-driven</td>
    <td>追跡可能性の確保</td>
  </tr>
  <tr>
    <td><span class="priority-badge optional">外部API時</span></td>
    <td><strong>Contract Test</strong> + ガードレール設計</td>
    <td>障害調査の高速化</td>
  </tr>
</table>

<div class="insight-box">
  <div class="insight-label">Ultimate Insight</div>
  <p>個別プロジェクトのスキルを量産するのではなく、この5つのフェーズ別フレームワークを反復適用することで、あらゆる開発の品質と効率が継続的に向上する。</p>
</div>

</div>
