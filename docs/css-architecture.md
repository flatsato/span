# CSS 設計

旧来の FLOCSS + Sass から、**ネイティブ CSS によるハイブリッド設計**へ移行した。
Sass のコンパイルに頼らず、ブラウザ標準機能（カスケードレイヤー・カスタムプロパティ・
ネスト・container query）で構築する。

## 1. カスケードレイヤー

詠み順（＝強さ）を `@layer` で固定し、詳細度の殴り合いを排除する。
宣言は [`src/styles/global.css`](../src/styles/global.css) の冒頭。

```css
@layer reset, base, layout, components, utilities;
```

| レイヤー     | 役割                                   | 場所                         |
| ------------ | -------------------------------------- | ---------------------------- |
| `reset`      | ブラウザ差の吸収                       | `styles/reset.css`           |
| `base`       | 素の HTML 要素のベース見た目           | `styles/base.css`            |
| `layout`     | ページ骨格                             | （主に各レイアウトコンポーネント） |
| `components` | 再利用部品                             | `.astro` の scoped style / `styles/forms.css` |
| `utilities`  | 単機能の上書き（最強）                 | `styles/utilities.css`       |

> トークン（`:root` のカスタムプロパティ）はレイヤー外。値の定義のみで競合しないため。

## 2. デザイントークン

[`src/styles/tokens/`](../src/styles/tokens/) に集約。**案件のテーマはここを書き換える**。

- `color.css` … primitive（原色）→ semantic（用途別）の2層。部品からは `--color-text` 等の semantic を参照
- `typography.css` … `clamp()` による流体フォントスケール（`--text-base` 〜 `--text-3xl`）
- `space.css` … t-shirt サイズの余白・角丸・影。セクション余白は流体
- `layout.css` … コンテンツ幅・ガター・z-index・ブレイクポイント定義

```css
.example {
  color: var(--color-text);
  padding: var(--space-md);
  font-size: var(--text-lg);
}
```

## 3. コンポーネントのスタイル

部品ごとのスタイルは **Astro の scoped `<style>`** に閉じ込める。
グローバル CSS を肥大させず、部品の自己完結性を保つ。

```astro
<div class="card">...</div>

<style>
  .card {
    /* この .card はこのコンポーネント内にのみ適用される */
  }
  /* 子要素の素タグや prose 等に効かせたい時だけ :global() */
  .card__thumb :global(img) {
    object-fit: cover;
  }
</style>
```

## 4. 命名規則

camelCase ベースの BEM。状態・バリエーションは **先頭ハイフンの modifier クラス**で表す。

```html
<button class="btn -outline -lg">送信</button>
```

| 種別      | 記法            | 例                          |
| --------- | --------------- | --------------------------- |
| Block     | camelCase       | `.card` / `.pageHeader`     |
| Element   | `__` 1階層のみ  | `.card__title`              |
| Modifier  | 先頭 `-`        | `.-outline` / `.-large`     |

- 階層は2つまで（`block__el__el` は不可 → 新規 block にする）
- レイアウト目的で `id` を使わない（JS フックは `data-*` を使用）
- Stylelint の `selector-class-pattern` でこの規則を機械的に強制

## 5. レスポンシブ

- 部品内のレイアウト調整は **container query / 流体値（clamp）** を優先
- ページ全体に効くものだけメディアクエリを直書き（範囲記法 `@media (width < 768px)`）
- ブレイクポイント値は `tokens/layout.css` のコメントに集約（sm 480 / md 768 / lg 1024 / xl 1280）

## 旧設計からの主な変更点

| 旧（〜v1）                  | 新（v2）                                   |
| --------------------------- | ------------------------------------------ |
| Sass（`@use` / mixin / 関数） | ネイティブ CSS（custom properties / nest） |
| FLOCSS のフォルダ分割        | カスケードレイヤー                         |
| IE ハック・ベンダープレフィックス手当て | 全廃（モダンブラウザ前提）         |
| `_modifier`（アンダースコア） | `-modifier`（ハイフン）                    |
| メディアクエリ集約（mqpacker） | container query + 流体値で削減            |
