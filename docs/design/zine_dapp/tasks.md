# zine dapp 実装タスクリスト

## 概要

このタスクリストは、zine dapp の段階的な実装を行うためのコーディングタスクです。各タスクは前のタスクの成果物を基に構築され、テスト駆動開発を重視した実装を行います。

## 実装タスク

- [-] 1. モノレポセットアップ
  - プロジェクトルート・パッケージ構成（frontend, contract）
  - pnpm, eslint, .gitignore, README作成
  - _要件: 全体_

- [-] 2. スマートコントラクト開発
  - ZineNFT（ERC-721）コントラクト実装
  - interface定義
  - _要件: スマートコントラクト_

- [-] 2.1 コントラクトテスト・デプロイ
  - Hardhatによるテスト・デプロイ設定
  - Chaiによるユニットテスト
  - _要件: テスト_

- [-] 3. フロントエンドセットアップ
  - Next.js 15, TailwindCSS, TypeScript, ESLint, eslint
  - ディレクトリ構成・基本ページ作成
  - _要件: フロントエンド_

- [-] 4. Web3連携・プロバイダー実装
  - wagmi, viem, RainbowKit, MetaMask対応
  - コントラクトABI・型定義
  - _要件: Web3_

- [-] 5. UIコンポーネント実装
  - 共通UI（Button, Input, Modal等）
  - WalletConnect, Header
  - _要件: UI_

- [-] 6. コンテンツアップロード画面実装
  - ContentUploadFormコンポーネント
  - IPFSアップロード機能（useIPFS）
  - DB/メタデータ保存
  - _要件: アップロード_
  - 一旦、IPFSへのアップロードは現在シミュレートされており、メタデータのDB保存はコンソールへのログ出力で代替

- [ ] 7. 決済要求画面実装
  - PaymentRequestコンポーネント
  - 金額・コンテンツ名表示
  - x402課金リクエスト・決済実行（useX402）
  - _要件: 決済_

- [ ] 8. 決済完了画面実装
  - PaymentSuccessコンポーネント
  - 決済完了メッセージ
  - IPFSダウンロードリンク表示
  - _要件: 決済完了_

- [ ] 9. コントラクトインタラクション実装
  - useZineNFT, useX402, useIPFSフック
  - NFT発行・所有NFT取得
  - _要件: コントラクト連携_

- [ ] 10. エラーハンドリング・UX改善
  - 包括的なエラーハンドリング
  - ローディング・進行状況表示
  - _要件: UX_

- [ ] 11. テスト・デバッグ
  - フロントエンド: React Testing Library
  - E2E: Playwright
  - _要件: テスト_

- [ ] 12. デプロイ・最終統合
  - コントラクト: Base Sepoliaデプロイ
  - フロントエンド: Vercel等へのデプロイ
  - _要件: デプロイ_

## 実装順序の重要性

各タスクは前のタスクの成果物に依存しているため、順序通りに実装することが重要です。段階的に機能を追加し、各ステップでテスト・品質保証を行います。


## その他の作業
- RainbowKitの利用のためあとでprojectIdを登録する
- providers.tsxのYOUR_PROJECT_ID、WalletConnectから取得した実際のプロジェクトIDに置き換える必要がある