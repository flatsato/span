# タスクランナー

## 環境

Node.js v10.16.3

バージョン管理にnvm(Node Version Manager)を利用している環境では、`nvm use`コマンドの実行で指定のバージョンに切り替わります。

```
nvm use
```

## インストール

```
npm ci
```

このコマンドは、`node_modules`ディレクトリを自動で削除し、パッケージのバージョンが環境によって差のないように安全にインストールを行います。`npm install`ではなくこちらのコマンドを使用してください。

## タスクランナー仕様

### HTML（`html`&`ejs`タスク）

#### ファイルインクルード（`html`タスク）

[gulp-file-include
](https://github.com/haoxins/gulp-file-include)

#### テンプレートエンジン（`ejs`タスク）

[EJS](https://ejs.co/)

### CSS（`sass`タスク）

#### スタイルシート言語

[Sass](https://sass-lang.com/)

#### ベンダープレフィックス付与

[Autoprefixer](https://github.com/postcss/autoprefixer)

#### メディアクエリ最適化

[css-mqpacker](https://github.com/hail2u/node-css-mqpacker)

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

---

# HTMLテンプレート

temp-gulp  
https://github.com/harumi-sato/temp-gulp  
株式会社FLAT スターターキット

## 推奨環境

Node.js v10.15.3

## できること

### ローカルサーバー自動更新
http://localhost:8000/  
HTML・CSS更新されると自動でローカルがリロードされます。  
gulp-webserver LiveReload環境構築  

### HTMLコードのままインクルード作成が可能。GulpでひとつのHTMLを生成。  　　
gulp-file-include HTMLインクルード　　

### Autoprefixer付与
ベンダープレフィックスを自動で付与します。  
対応バージョン IE11、モダンブラウザlast2Version、  

### CSS、JavaScript、HTML自動圧縮
軽量化された圧縮ファイルを自動で生成します。
gulp-clean-css CSS圧縮  
gulp-uglify JavaScript圧縮  
gulp-htmlmin HTML圧縮

### 画像自動圧縮
jpg、png、svgを自動で圧縮いたします。  
gulp-imagemin img圧縮

### SourceMap自動生成
Sassの記述位置をブラウザで確認できるSourceMapを生成  
gulp-sourcemaps  sourcemap作成

### CSS圧縮
- gulp-clean-css

## gulpconfig.jsonについて
html,scss,js,imgなどgulpfile.js内のタスク単位でディレクトリの設定などをgulpconfig.jsonファイルに外部化している。
プロジェクト毎にディレクトリが変わってカスタマイズする際はこのファイルを編集する。

## 各種機能のON/OFF設定について
gulpconfig.jsonの中に"xxFlg"という項目がある。
この項目をtrue/falseに切り替えることでON/OFFの設定が出来る。
今の所下記機能のON/OFFが可能

- dest時の圧縮
- sourcemapの出力
- wordpress用のdest設定
