# 環境と構成ドキュメント

このドキュメントは、svelte-learningプロジェクトの現在の環境と構成について説明します。

## 🛠️ 開発環境

### Node.js とパッケージマネージャー

- **Node.js バージョン**: v20.x
- **パッケージマネージャー**: pnpm v9 (推奨) または pnpm v10
- **パッケージマネージャーの理由**: pnpmは高速で効率的なディスク使用量を実現します

### 主要な依存関係

#### フレームワークとビルドツール
- **Svelte**: v5.38.x - リアクティブUIフレームワーク
- **Vite**: v7.1.x - 高速なフロントエンドビルドツール
- **TypeScript**: v5.8.x - 型安全性のためのTypeScript

#### ルーティング
- **svelte-spa-router**: v4.0.1 - クライアントサイドルーティング

#### 開発ツール
- **svelte-check**: v4.3.1 - Svelteコンポーネントの型チェック
- **@sveltejs/vite-plugin-svelte**: v6.2.x - ViteでのSvelteサポート
- **autoprefixer**: v10.4.21 - CSSベンダープレフィックスの自動追加
- **@types/node**: v24.x - Node.js型定義

## 📁 プロジェクト構造

```
svelte-learning/
├── .github/
│   ├── actions/
│   │   └── install/          # Node.jsとPNPMのセットアップ用アクション
│   │       └── action.yml
│   └── workflows/
│       └── deploy.yml        # GitHub Pagesへの自動デプロイ
├── docs/                     # ビルド出力ディレクトリ（GitHub Pages用）
├── public/                   # 静的ファイル
├── src/
│   ├── assets/              # アセット（画像など）
│   ├── components/          # 再利用可能なコンポーネント
│   ├── route/               # ページコンポーネント
│   │   ├── home/           # ホームページ
│   │   ├── todo/           # Todoアプリ
│   │   ├── stopwatch/      # ストップウォッチ
│   │   ├── tictactoe/      # 三目並べゲーム
│   │   └── not-found/      # 404ページ
│   ├── utils/              # ユーティリティ関数
│   ├── App.svelte          # ルートコンポーネント
│   ├── main.ts             # エントリーポイント
│   └── vite-env.d.ts       # Vite型定義
├── index.html              # HTMLテンプレート
├── vite.config.ts          # Vite設定
├── svelte.config.js        # Svelte設定
├── tsconfig.json           # TypeScript設定（ルート）
├── tsconfig.app.json       # アプリケーション用TypeScript設定
├── tsconfig.node.json      # Node.js環境用TypeScript設定
└── package.json            # プロジェクト依存関係
```

## ⚙️ 設定ファイル

### vite.config.ts

```typescript
import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
  plugins: [svelte()],
  build: {
    outDir: 'docs', // GitHub Pages用の出力ディレクトリ
  },
  base: process.env.GITHUB_PAGES ? '/svelte-learning/' : './'
})
```

**重要な設定:**
- `outDir: 'docs'` - GitHub Pagesのデプロイ先
- `base` - GitHub Pagesではリポジトリ名をベースパスとして使用

### svelte.config.js

```javascript
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

export default {
  preprocess: vitePreprocess(),
}
```

Viteのプリプロセッサを使用してTypeScriptやSCSSをサポート。

### TypeScript設定

3つのTypeScript設定ファイルがあります：

1. **tsconfig.json** - ルート設定（プロジェクト参照）
2. **tsconfig.app.json** - アプリケーションコード用
3. **tsconfig.node.json** - Vite設定ファイル用（vite.config.tsなど）

## 🚀 利用可能なスクリプト

```bash
# 開発サーバーを起動
pnpm dev

# プロダクションビルド
pnpm build

# ビルドのプレビュー
pnpm preview

# 型チェックとLint
pnpm check
```

## 🌐 デプロイメント

### GitHub Pages

プロジェクトはGitHub Pagesに自動デプロイされます。

**デプロイワークフロー** (`.github/workflows/deploy.yml`):
1. `main`ブランチへのプッシュでトリガー
2. Node.jsとPNPMをセットアップ
3. 依存関係をインストール（`pnpm install --frozen-lockfile`）
4. `GITHUB_PAGES=true`環境変数付きでビルド
5. `docs`ディレクトリをコミット＆プッシュ

**カスタムアクション** (`.github/actions/install/action.yml`):
- PNPM v9のセットアップ
- Node.js v20のセットアップ
- キャッシュ付きで依存関係をインストール

### 環境変数

- **GITHUB_PAGES**: `true`に設定すると、ベースパスが`/svelte-learning/`になります

## 🏗️ ビルドプロセス

1. **型チェック**: `svelte-check`でSvelteコンポーネントをチェック、`tsc`でTypeScriptファイルをチェック
2. **ビルド**: Viteがアプリケーションをバンドルして`docs/`に出力
3. **最適化**: 
   - コード分割
   - ミニファイケーション
   - Gzip圧縮サイズの計算

## 📝 コーディング規約

- **言語**: TypeScript（厳密モード有効）
- **フレームワーク**: Svelte 5（最新のルーン構文をサポート）
- **スタイル**: Svelteコンポーネント内にスコープされたスタイル
- **ルーティング**: `svelte-spa-router`によるクライアントサイドルーティング

## 🔧 開発のセットアップ手順

1. リポジトリをクローン
   ```bash
   git clone https://github.com/illionillion/svelte-learning.git
   cd svelte-learning
   ```

2. PNPMをインストール（まだの場合）
   ```bash
   npm install -g pnpm
   ```

3. 依存関係をインストール
   ```bash
   pnpm install
   ```

4. 開発サーバーを起動
   ```bash
   pnpm dev
   ```

5. ブラウザで開く
   ```
   http://localhost:5173/
   ```

## 🧪 品質保証

### 型チェック
```bash
pnpm check
```

これにより以下が実行されます：
- Svelteコンポーネントの型チェック
- TypeScriptファイルの型チェック

### ビルドの検証
```bash
pnpm build
```

本番環境向けにビルドして、エラーがないことを確認します。

## 📚 学習用ルート

現在のプロジェクトには以下のルートがあります：

- `/` - ホーム（カウンターデモ）
- `/count` - ホームページ（エイリアス）
- `/todo` - Todoアプリ
- `/stopwatch` - ストップウォッチ
- `/tictactoe` - 三目並べゲーム
- `*` - 404 Not Foundページ

## 🔄 更新履歴

### 最近の変更
- Node.js型定義（`@types/node`）を追加してvite.config.tsの型エラーを修正
- pnpm v10でテスト済み
- 全ての型チェックが正常に通過

## 📖 参考リンク

- [Svelte公式ドキュメント](https://svelte.dev/)
- [Vite公式ドキュメント](https://vitejs.dev/)
- [svelte-spa-router](https://github.com/ItalyPaleAle/svelte-spa-router)
- [GitHub Pages](https://pages.github.com/)
