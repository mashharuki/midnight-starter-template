# Serena Memory for MESH - Midnight Starter Template

## プロジェクト概要
Midnight Network 向け dApp 開発のスターターテンプレート。React/Vite フロントエンド、Compact ベースのスマートコントラクト、CLI ツールを pnpm ワークスペース + Turbo で管理するモノレポ構成。

## 主なワークスペース
- `frontend-vite-react`: React + Vite 製 UI。Midnight SDK でコントラクトと連携し、ビルド時にキー/zkir アーティファクトを `public` 配下へコピーする。
- `counter-contract`: Compact 言語のコントラクト。`src/managed` に生成物、`pnpm build` で `dist` へコピー。
- `counter-cli`: コントラクト操作用 CLI。テストネット向け Proof Server やローカル準備スクリプトを提供。

## 開発フロー
- ルート `pnpm run build|test|lint` が Turbo を介して全ワークスペースを実行。
- `pnpm run start-app-testnet` で Proof Server + フロントエンド dev サーバーを並行起動。
- ネットワーク切替は `frontend-vite-react/src/App.tsx` の `NetworkId` 設定とコントラクトアドレスで制御。

## テストとツール
- 単体テストに Vitest、CLI テストで Testcontainers を活用。
- `@tailwindcss/vite` と Radix UI/Lucide を使った UI コンポーネント。
- Node 環境の polyfill に `vite-plugin-node-polyfills` を利用。

## ドキュメント状態
- `docs/compact` 配下に Midnight Compact の仕様 PDF があり、`convert_pdfs.py` で一括して Markdown (`*.md`) に変換済み。変換には `markitdown[pdf]` を使用するため、Python 仮想環境 (`.venv`) に同パッケージをインストール済み。
- 同ディレクトリに PDF->Markdown 変換スクリプト `convert_pdfs.py` を配置。PDF を追加した場合はスクリプトを再実行して Markdown を更新する。

## 補足
- 依存管理は pnpm。`pnpm-lock.yaml` を更新しつつ Node>=18, pnpm>=9 を想定。
- ビルド成果物にはコントラクトキー/zkir のコピーが含まれるため、契約を更新した際は CLI とフロント間で同期が必要。
