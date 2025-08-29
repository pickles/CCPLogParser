# CCP Log Parser Project Context

このプロジェクトはAmazon Connect CCPログを解析するReactベースのWebアプリケーションです。

## プロジェクト構造
- `src/components/` - React コンポーネント
- `src/utils/` - ユーティリティ関数（ログ解析、パターンマッチング）
- `src/parsers/` - ログパーサー実装

## コーディング規約
- 最小限のコードで要件を満たす
- 既存のコードスタイルに従う
- 不要な冗長性を避ける
- ESLintルールに準拠

## 重要な概念
- ログエントリのパターンマッチング
- API呼び出しのレイテンシ追跡
- WebSocketハートビート監視
- エージェントスナップショット処理