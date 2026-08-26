# FLAT Starter Kit (Astro)

Astro + モダン CSS で構築する、ウェブサイト制作用のスターターキット。
旧 Gulp + EJS + Sass 構成からの全面刷新版（v2）。

## 技術スタック

| 領域       | 採用                                                         |
| ---------- | ------------------------------------------------------------ |
| フレームワーク | [Astro 5](https://astro.build/)（静的サイト生成）          |
| 言語       | TypeScript                                                   |
| CSS        | ネイティブ CSS（カスケードレイヤー + デザイントークン + ネスト + container query） |
| コンポーネント | `.astro`（scoped style）                                     |
| 画像       | `astro:assets`（Sharp 最適化）                               |
| 整形 / 検査 | Prettier / Stylelint / ESLint / `astro check`               |

## 必要環境

- Node.js **20.3 以上**

## セットアップ

```bash
npm install
```

## コマンド

| コマンド            | 内容                                       |
| ------------------- | ------------------------------------------ |
| `npm run dev`       | 開発サーバー（http://localhost:4321）      |
| `npm run build`     | 本番ビルド（`dist/` に出力）               |
| `npm run preview`   | ビルド結果のプレビュー                     |
| `npm run lint`      | Stylelint + ESLint                         |
| `npm run format`    | Prettier で全体整形                        |
| `npm run astro check` | 型チェック                               |

## ディレクトリ構成

```
src/
  components/   再利用 UI 部品（Header, Footer, Card, Button …）
  layouts/      ページの土台（BaseLayout, PageLayout）
  pages/        ルーティング（ファイル = URL）
    samples/    制作ページ雛形（納品時は削除）
  styles/       CSS 基盤（tokens / reset / base / forms / utilities）
  config/       サイト共通設定（site.ts）
  assets/       最適化対象の画像
public/         そのまま配信される静的ファイル（favicon 等）
_legacy/        旧構成（参照用。移行完了後に削除）
```

## 案件開始時にまず編集するところ

1. `src/config/site.ts` … サイト名・説明・ナビ・URL
2. `astro.config.mjs` の `site` … 本番 URL
3. `src/styles/tokens/` … カラー・タイポ・余白などデザイントークン
4. `public/` … favicon 一式・OGP 画像
5. `src/pages/samples/` … 雛形を複製して各ページを作成、不要分は削除

## ドキュメント

- [docs/css-architecture.md](docs/css-architecture.md) — CSS 設計（レイヤー / トークン / 命名）
- [docs/conventions.md](docs/conventions.md) — HTML / コンポーネント規約
