---
title: "kintone開発環境セットアップ & 学習ロードマップ"
description: "kintoneカスタマイズ開発を始めるための環境準備、開発者ライセンス取得、JSカスタマイズ入門、よくあるハマりポイントまでを最短ルートで解説。"
date: 2026-02-21
category: "tech"
tags: [kintone, javascript, api, setup]
summary: "kintoneのJS/APIカスタマイズ開発を始めるためのガイド。開発者ライセンス（無料）の取得、必要ツール、3日間の学習ロードマップ、頻出ハマりポイントと対処法をまとめた実践メモ。"
keywords: [kintone, サイボウズ, JSカスタマイズ, REST API, customize-uploader, 開発者ライセンス, cybozu.dev]
subcategory: "開発環境"
difficulty: beginner
audience: self
source: "Claude Code session 2026-02-21"
---

## 開発環境の準備

### 必須ツール（0円）

| ツール | 用途 |
|--------|------|
| Chrome（DevTools） | デバッグ・動作確認 |
| VSCode | JS開発（既存環境でOK） |
| kintone 開発者ライセンス | 無料の練習環境（後述） |

### あると便利なnpmパッケージ

| パッケージ | 用途 |
|-----------|------|
| `@kintone/customize-uploader` | JSファイルのアップロード自動化 |
| `@kintone/rest-api-client` | kintone API操作ライブラリ |
| `npx @kintone/create-plugin` | プラグイン開発のスキャフォールド |

## 開発者ライセンス（無料で練習環境を入手）

**大和書房などクライアントの本番環境をいきなり触るのはNG。** まず自分の練習環境を作る。

- **申請先**: [kintone開発者ライセンス](https://developer.cybozu.io/)
- **無料**、1年更新（再申請可）、5ユーザーまで
- 自分専用の `xxx.cybozu.com` がもらえる
- ここでアプリ作成・JSカスタマイズを練習してから、クライアント環境に持っていく

## 学習ロードマップ（最短3日ルート）

API/JSの基礎がある前提。公式チュートリアルを1周すれば十分。

### Day 1（3時間）

| やること | 時間 |
|---------|------|
| 開発者ライセンス申請 → アプリ1個作成（画面ポチポチ） | 2時間 |
| kintone REST API をcurl/Pythonで叩いてみる | 1時間 |

### Day 2（4時間）

| やること | 時間 |
|---------|------|
| JS カスタマイズで「Hello World」ボタン追加 | 1時間 |
| 注文書アプリを設計・作成 → 生成ボタン追加 | 3時間 |

### Day 3（1時間）

| やること | 時間 |
|---------|------|
| クライアント環境にデプロイ | 1時間 |

**公式チュートリアル**: [kintone カスタマイズ概要](https://cybozu.dev/ja/kintone/tips/development/customize/overview/)

## ハマりポイントと対処法

| 罠 | 対処 |
|----|------|
| JSは管理画面から手動アップロード | `@kintone/customize-uploader` で自動化 |
| `kintone.events.on` のイベント名を間違える | [公式イベントリファレンス](https://cybozu.dev/ja/kintone/docs/js-api/)をブクマ |
| サブテーブル（テーブル内テーブル）のAPI操作 | 構造がネストするので要注意 |
| CSRFトークンがAPI実行時に必要 | `kintone.api()` を使えば自動付与 |
| 本番環境で直接JSをいじって事故る | **必ず開発者ライセンスで検証してから** |
