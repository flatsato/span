# コーディングガイドライン

- <a href="guideline_basic.md">基本方針</a>
- <a href="guideline_html.md">ガイドライン HTML</a>
- <a href="guideline_css.md">ガイドライン CSS</a>
- <a href="guideline_basic.md">ガイドライン JavaScript</a>

- <a href="guideline_flow.md">はじめての方へ コーディングの進め方</a>

# タスクランナー

担当者：荻野

## 環境

Node.js v12.18.3

バージョン管理にnvm(Node Version Manager)を利用している環境では、`nvm use`コマンドの実行で指定のバージョンに切り替わります。

```
nvm use
```

下記メッセージが表示された場合は、`nvm install 12.18.3`でインストールしてください。

```
Found '/パス省略/.nvmrc' with version <12.18.3>
N/A: version "12.18.3 -> N/A" is not yet installed.

You need to run "nvm install 12.18.3" to install it before using it.
```

## インストール

```
npm ci
```

このコマンドは、`node_modules`ディレクトリを自動で削除し、パッケージのバージョンが環境によって差のないように安全にインストールを行います。`npm install`ではなくこちらのコマンドを使用してください。

## タスクランナー仕様

### HTML（`html`&`ejs`タスク）

#### ファイルインクルード（`html`タスク）

[gulp-file-include](https://github.com/haoxins/gulp-file-include)

#### テンプレートエンジン（`ejs`タスク）

[EJS](https://ejs.co/)

### CSS（`sass`タスク）

#### スタイルシート言語

[Sass](https://sass-lang.com/)

#### ベンダープレフィックス付与

[Autoprefixer](https://github.com/postcss/autoprefixer)

#### ファイル圧縮

[clean-css](https://github.com/jakubpawlowicz/clean-css)

#### リント & スタイルガイド

[stylelint](hhttps://stylelint.io/) & [Prettier](https://prettier.io/)

下記コマンドで自動修正（エラー部分は除く）

```
npx gulp format:sass
```

### JavaScript（`js`タスク）

#### バンドラー

[Rollup](https://rollupjs.org/guide/en/)

#### ECMAScriptコンパイラ

[Babel](https://babeljs.io/)

#### ファイル圧縮

[terser](https://github.com/terser-js/terser)

#### リント & スタイルガイド

[ESLint](https://eslint.org/) & [Prettier](https://prettier.io/)

[Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)の`eslint-config-airbnb-base`を使用。

下記コマンドで自動修正（エラー部分は除く）

```
npx gulp format:js
```

### 画像（`image`タスク）

#### ファイル圧縮

[imagemin](https://github.com/imagemin/imagemin)
