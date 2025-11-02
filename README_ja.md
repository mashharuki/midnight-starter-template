# 🚀 MESH - Midnight スターターテンプレート

Midnight Network 上で React フロントエンドとスマートコントラクト連携を構築するためのスターターテンプレートです。
![Midnight Starter Template](./starter-template-optimized.png)

## 📦 前提条件

- [Node.js](https://nodejs.org/) (v18+) と [pnpm](https://pnpm.io/) (v9+)
- [Docker](https://docs.docker.com/get-docker/)
- [Git LFS](https://git-lfs.com/) （大容量ファイル用）
- [Compact](https://docs.midnight.network/relnotes/compact-tools) （Midnight 開発者向けツール）

## 🛠️ セットアップ手順

### 1️⃣ Git LFS をインストール

```bash
# Git LFS のインストールと初期化
sudo dnf install git-lfs  # Fedora/RHEL の場合
git lfs install
```

### 2️⃣ Compact ツールをインストール

```bash
# 最新の Compact ツールをインストール
curl --proto '=https' --tlsv1.2 -LsSf \
  https://github.com/midnightntwrk/compact/releases/latest/download/compact-installer.sh | sh
```

```bash
# 最新のコンパイラをインストール
compact update
```

### 3️⃣ Node.js・pnpm・Docker をインストール

- [Node.js](https://nodejs.org/) (v18+)
- [pnpm](https://pnpm.io/) (v9+、`corepack enable pnpm` を推奨)
- [Docker](https://docs.docker.com/get-docker/)

### 4️⃣ インストールを確認

```bash
# 各バージョンを確認
node -v   # v18+
pnpm -v   # v9+
docker -v
git lfs version
compact check  # 最新バージョンが表示されること
```

## 📁 プロジェクト構成

```
├── counter-cli/         # CLI ツール
├── counter-contract/    # スマートコントラクト
└── frontend-vite-react/ # React アプリケーション
```

## 🔗 ネットワーク設定

### Testnet ネットワーク

1. **ネットワーク ID を設定**
   - `frontend-vite-react/src/App.tsx` を開く
   - `setNetworkId(NetworkId.TestNet)` が設定されていることを確認

2. **コントラクトアドレスを設定**
   - 同じファイルで `contractAddress` 定数を探す
   - Counter Testnet ネットワーク用のコントラクトアドレスに置き換える

3. **開発を開始**
   ```bash
   # プロジェクトルートでターミナルを 1 つ起動
   pnpm install
   pnpm run build
   pnpm run start-app-testnet
   ```

### Undeployed / ローカルネットワーク

1. **ウォレットアドレスを設定**
   - `counter-cli/src/scripts/prepare-standalone.test.ts` を開く
   - 自分の undeployed ネットワーク用ウォレットアドレスに置き換える

2. **ネットワーク ID を設定**
   - `frontend-vite-react/src/App.tsx` を開く
   - `setNetworkId(NetworkId.Undeployed)` に変更

3. **ローカル開発を開始**

   ```bash
   # プロジェクトルートでターミナルを 1 つ起動
   pnpm install
   pnpm run build
   pnpm run dev:undeployed-instances

   # もう 1 つ別のターミナルを開く
   pnpm run start-app-undeployed
   ```

4. **コントラクトアドレスを設定**
   - 先に undeployed ネットワークでコントラクトをデプロイする必要があります
   - `frontend-vite-react/src/App.tsx` を開き、`contractAddress` 定数を新しくデプロイしたコントラクトアドレスに置き換えます

---

<div align="center"><p>Built with ❤️ by <a href="https://meshjs.dev">Mesh</a> × <a href="https://eddalabs.io">Edda Labs</a></p></div>
