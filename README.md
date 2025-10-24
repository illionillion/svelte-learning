# Svelte Learning

Svelteの学習用プロジェクトです。複数のデモアプリケーションを通じて、Svelteの基本的な機能とコンポーネント設計を学ぶことができます。

## 🚀 デモアプリケーション

このプロジェクトには以下のデモアプリケーションが含まれています：

### 1. カウンター (Counter)
- Svelteの基本的なリアクティビティを学習
- 状態管理の基礎

### 2. Todoアプリ (Todo App)
- タスクの追加、削除、完了状態の切り替え
- LocalStorageを使用したデータの永続化
- コンポーネントの分割と再利用

### 3. ストップウォッチ (Stopwatch)
- タイマー機能の実装
- ラップタイムの記録
- キーボードショートカット対応（Space: 開始/一時停止, S: 停止, R: リセット, L: ラップ）
- `onMount`と`onDestroy`ライフサイクルの活用

### 4. 三目並べ (Tic Tac Toe)
- ゲームロジックの実装
- 勝敗判定アルゴリズム
- 手順の取り消し機能
- 状態管理とゲームフローの制御

## 📦 技術スタック

- **Svelte 5** - リアクティブUIフレームワーク
- **TypeScript** - 型安全な開発環境
- **Vite** - 高速なビルドツール
- **svelte-spa-router** - クライアントサイドルーティング
- **pnpm** - パッケージマネージャー

## 🛠️ セットアップ

### 必要な環境

- Node.js (推奨: v18以上)
- pnpm

### インストール

```bash
# リポジトリのクローン
git clone https://github.com/illionillion/svelte-learning.git
cd svelte-learning

# 依存関係のインストール
pnpm install
```

## 📝 利用可能なコマンド

```bash
# 開発サーバーの起動
pnpm dev

# プロダクションビルド
pnpm build

# ビルドしたアプリのプレビュー
pnpm preview

# TypeScriptとSvelteの型チェック
pnpm check
```

## 🌐 GitHub Pagesでの公開

このプロジェクトはGitHub Pagesで公開されています。`main`ブランチへのプッシュで自動的にデプロイされます。

- デプロイURL: https://illionillion.github.io/svelte-learning/

## 📁 プロジェクト構造

```
svelte-learning/
├── src/
│   ├── components/      # 再利用可能なコンポーネント
│   │   ├── count/       # カウンターコンポーネント
│   │   ├── stopwatch/   # ストップウォッチコンポーネント
│   │   ├── tictactoe/   # 三目並べコンポーネント
│   │   └── todo/        # Todoコンポーネント
│   ├── route/           # ページコンポーネント
│   │   ├── home/        # ホームページ
│   │   ├── stopwatch/   # ストップウォッチページ
│   │   ├── tictactoe/   # 三目並べページ
│   │   ├── todo/        # Todoページ
│   │   └── not-found/   # 404ページ
│   ├── utils/           # ユーティリティ関数
│   ├── App.svelte       # ルートコンポーネント
│   └── main.ts          # エントリーポイント
├── docs/                # ビルド出力ディレクトリ（GitHub Pages用）
└── public/              # 静的アセット
```

## 🎯 学習ポイント

このプロジェクトを通じて以下のSvelteの概念を学習できます：

- **リアクティビティ**: Svelteの自動的な再レンダリング機能
- **コンポーネント設計**: 再利用可能なコンポーネントの作成
- **イベントハンドリング**: ユーザーインタラクションの処理
- **状態管理**: アプリケーション状態の管理
- **ライフサイクル**: `onMount`, `onDestroy`などのフック
- **ルーティング**: SPAでのページ遷移
- **LocalStorage**: データの永続化
- **TypeScript統合**: 型安全なSvelte開発

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 🔗 参考リンク

- [Svelte公式ドキュメント](https://svelte.jp/)
- [Svelte Tutorial](https://learn.svelte.jp/)
- [Vite公式ドキュメント](https://ja.vitejs.dev/)

## 💡 推奨IDE設定

[VS Code](https://code.visualstudio.com/) + [Svelte for VS Code](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode)
