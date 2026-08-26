# コーディングガイドライン

- <a href="guideline_directory.md">ディレクトリ構成</a>
- <a href="guideline_frontend.md">ガイドライン フロントエンド実装ルール</a>
- <a href="guideline_git.md">ガイドライン Git</a>
- <a href="guideline_html.md">ガイドライン HTML</a>
- <a href="guideline_css.md">ガイドライン CSS</a>

# タスクランナー

担当者：荻野

## 環境

Node.js v14.17.4

バージョン管理にnvm(Node Version Manager)を利用している環境では、`nvm use`コマンドの実行で指定のバージョンに切り替わります。

```
nvm use
```

下記メッセージが表示された場合は、`nvm install 14.17.4`でインストールしてください。

```
Found '/パス省略/.nvmrc' with version <14.17.4>
N/A: version "14.17.4 -> N/A" is not yet installed.

You need to run "nvm install 14.17.4" to install it before using it.
```

## インストール

```
npm ci
```

このコマンドは、`node_modules`ディレクトリを自動で削除し、パッケージのバージョンが環境によって差のないように安全にインストールを行います。`npm install`ではなくこちらのコマンドを使用してください。

## コマンド

### 開発

```
npm run dev
```

### ビルド

```
npm run build
```

### CSS リント＆コード整形

```
npm run format:css
```

### JavaScript リント＆コード整形

```
npm run format:js
```

## タスクランナー仕様

### HTML（`ejs`タスク）

#### テンプレートエンジン（`ejs`タスク）

[EJS](https://ejs.co/)

### CSS（`sass`タスク）

#### スタイルシート言語

[Sass](https://sass-lang.com/)

#### ベンダープレフィックス付与

[Autoprefixer](https://github.com/postcss/autoprefixer)

#### ファイル圧縮

[CSSO](https://github.com/css/csso)

#### リント & スタイルガイド

[stylelint](https://stylelint.io/) & [Prettier](https://prettier.io/)

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

### 画像（`image`タスク）

#### ファイル圧縮

[imagemin](https://github.com/imagemin/imagemin)
