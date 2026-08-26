# HTML / コンポーネント規約

旧 `guideline_html.md` のうち、現代ブラウザ前提で今も有効な方針を Astro 向けに再構成したもの。

## コンポーネント設計

- 1 部品 = 1 `.astro`。`src/components/` に配置し、Props を `interface Props` で型定義する
- ページ固有でない見た目は部品に閉じ込め、ページ側はデータと構成に集中する
- 共通データ（サイト名・ナビ等）は `src/config/site.ts` に集約（旧 EJS データの置き換え）

## レイアウト

| 用途           | 使うもの                          |
| -------------- | --------------------------------- |
| 全ページ共通   | `layouts/BaseLayout.astro`        |
| 下層ページ     | `layouts/PageLayout.astro`（パンくず + 見出し + 1/2カラム） |
| セクション区切り | `components/Section.astro`       |

## HTML マークアップ方針

- **見出し**: `h1` はページに1つ。階層を飛ばさない
- **外部リンク**: `target="_blank"` には必ず `rel="noopener noreferrer"`（各部品は `external` prop で自動付与）
- **メールリンク**: `@` は実体参照 `&#64;` で記述しクローラー避け
- **time**: 日付は `datetime` 属性とセット
- **address**: 連絡先のマークアップに使用（`font-style` は base.css で解除済み）
- **button と a の使い分け**: 操作は `<button>`、遷移は `<a>`。見た目はどちらも `Button` 部品で統一
- **フォーム**: `label` と `id` を対応させ、最初の入力に `autofocus`、必須は `required` + 視覚表示

## アクセシビリティ

- ランドマーク（`header` / `main` / `footer` / `nav[aria-label]`）を明示
- 本文スキップリンクを `BaseLayout` に常設
- 現在地は `aria-current="page"`、開閉状態は `aria-expanded` で表現
- フォーカスリングは `:focus-visible` で担保（消さない）
- 装飾アイコンは `aria-hidden`、視覚的に隠すテキストは `.visually-hidden`

## JavaScript

- 部品内の挙動は `.astro` の `<script>`（型付き・自動バンドル）に書く
- DOM フックは `id` ではなく `data-*` 属性（例: `data-drawer-toggle`）
- 過度な JS を避け、`details`/`summary` などネイティブ要素を優先（FAQ アコーディオン参照）

## パス・URL

- `astro.config.mjs` の `trailingSlash: "always"` + `format: "directory"` でクリーン URL（`/about/`）
- 内部リンクはルート相対（`/about/`）。`index.html` は付けない
