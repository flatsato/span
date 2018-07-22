# HTMLテンプレート

temp-gulp  
https://github.com/harumi-sato/temp-gulp  
株式会社FLAT スターターキット

## 推奨環境

node.js v4.8.4

## できること

### ローカルサーバー自動更新
http://localhost:8000/  
HTML・CSS更新されると自動でローカルがリロードされます。  
gulp-webserver【1】LiveReload環境構築  

### HTMLコードのままインクルード作成が可能。GulpでひとつのHTMLを生成。  　　
gulp-file-include【2】HTMLインクルード　　

### Autoprefixer付与
ベンダープレフィックスを自動で付与します。  
対応バージョン IE9、モダンブラウザlast2Version、  
gulp-autoprefixer【3】autoprefixer追加  

### CSS、JavaScript、HTML自動圧縮
軽量化された圧縮ファイルを自動で生成します。
gulp-clean-css【4】CSS圧縮  
gulp-uglify【5】JavaScript圧縮  
gulp-htmlmin【7】HTML圧縮

### 画像自動圧縮
jpg、png、svgを自動で圧縮いたします。  
gulp-imagemin【6】img圧縮


### SourceMap自動生成
Sassの記述位置をブラウザで確認できるSourceMapを生成  
gulp-sourcemaps 【8】sourcemap作成

### スプライト画像を生成
gulp.spritesmith【9】sprite画像

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
