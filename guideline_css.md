# ガイドライン CSS

## 設計

案件内容・規模により設計手法を選択する。 
FLATではFLOCSSをベースにBEMとSMACSSをアレンジして取り入れる。
>理由：世間に認知された手法を使うことで説明・ドキュメント作成の手間を省く

**FLOCSS**
（参考サイト）
https://github.com/hiloki/flocss

**SMACSS**
（参考サイト）SMACSSによるCSSの設計 | CodeGrid
https://app.codegrid.net/entry/smacss-1
https://app.codegrid.net/entry/smacss-2

OOCSSは使用しない。

### リセット

ress.cssを使用する
https://github.com/filipelinhares/ress
Normalize.cssをベースにしたリセットCSS

（参考サイト）
CSSリセットはこれで決まり！モダンブラウザによる相違を吸収するようカスタマイズされたスタイルシート -ress | コリス
http://coliss.com/articles/build-websites/operation/css/modern-css-reset-ress.html

## id/class

### レイアウト目的でidを使用しない。
>理由：ページ内で一度しか使えないidをレイアウト目的で使用しない。

id使用の例外
- ページ内リンク。
- JavaScriptのフックにidを利用する。その場合、js-接頭詞を付与する。

```
◎ OK
<ul id="js-carousel" class="p-carousel">
  <li class="p-carousel__item"></li>
</ul>

× NG
<ul id="carousel" class="p-carousel">
  <li class="p-carousel__item"></li>
</ul>
```

## ネーミング

### 追加・運用されるサイトの命名規則はBEMを使用する。

（参考サイト）
BEMによるフロントエンドの設計 | CodeGrid  
https://app.codegrid.net/entry/bem-basic-1
https://app.codegrid.net/entry/bem-1

###ネーミングにハイフンとアンダースコアを使わない

ネーミングはキャメルケースを使用する。

>理由：記号をネーミングに使わない

### エレメントは階層を作らない

__は1階層まで。エレメントはキャメルケースでつなげる。

>理由：階層を深くしない設計を徹底する。

```
◎OK
.block__element1 {} .block__element2 {} 

×NG
.block__element1__element2 {}
```

### 状態とバリエーションを区別しない
>理由：状態ORバリエーションで悩む時間を減らす

```
◎OK
<div class="block _large _open _current">

×NG
<div class="block block--large is-open is-current">
```

（参考サイト）
http://5log.jp/blog/css_375/

### blockで大文字を使用しない

## ショートハンド

### back-ground

3つまで＝ショートハンドを使用せず、個別に記述する。
4つ＝ショートハンドを使用する。
> 理由：ショートハンドを明示的に指定する。レスポンシブ・アニメーションの指定がしやすいよう分割して記載する。

```
◎OK
  background-image: url(images/background-photo.jpg);
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  background-color: #464646;
  
×NG
background: #464646 url(background-photo.jpg) center center / cover no-repeat fixed;
```

CSS ショートハンド・プロパティの問題点 · terkel.jp
http://terkel.jp/archives/2012/06/problem-with-css-shorthand-propaties/

### margin/padding
3つまで＝ショートハンドを使用せず、個別に記述する。
4つ＝ショートハンドを使用する。
例外＝中央寄せはショートハンドの使用可。

```
◎OK
margin: 0 auto;
```

```
◎OK
margin-top:10px;
  
×NG
margin:10px 0 0 0;
```
## Media Queries

### 1ヶ所にまとめず、各プロパティに記述する。

gulpのcss-mqpackerを使い、記述をまとめる

```
◎OK
Sass
.hoge{
SP・TB共通の指定
@include sp($point-sp){
SPの指定
}
@include pc($point-pc){
PCの指定
}
}
```

### 同じ指定を2度書かない

```
◎OK
.hoge{
font-size:14px;
@include sp($point-sp){
}
@include pc($point-pc){
}
}

×NG
.hoge{
font-size:14px;
@include sp($point-sp){
font-size:14px;
}
@include pc($point-pc){
font-size:14px;
}
}
```

### ブレイクポイントは変数で管理する
>理由 一箇所で管理して、数値の揺れを防ぐため。

```
変数 _mixin.scss
https://github.com/harumi-sato/temp-gulp

//
//@include sps($point-sps) {}
//@include sp($point-sp) {}
//@include tbOnly($point-tbOnly) {}
//@include tb($point-tb) {}
//@include pc($point-pc) {}
//

$point-sps: 480px;
$point-sp: 767px;
$point-tb: 768px;
$point-pc: 992px;

@mixin sp($point-sps) {
@media screen and (max-width: $point-sps) { @content; }
}

@mixin sp($point-sp) {
@media screen and (max-width: $point-sp) { @content; }
}

@mixin tb($point-tb) {
@media screen and (min-width: $point-tb) { @content; }
}

@mixin tbOnly($point-tbOnly) {
@media screen and (min-width: $point-tb) and (max-width: 991) { @content; }
}

@mixin pc($point-pc) {
@media screen and (min-width: $point-pc) { @content; }
}
```

（参考サイト）
Media Queriesの効率的な書き方
http://qiita.com/kyaido/items/828906ffa7198e99d0b7
  
Foundation for Sites 6 Docs | Media Queries
http://foundation.zurb.com/sites/docs/media-queries.html
Media Queriesの値を参照

## ベンダープレフィックス
ベンダープレフィックスは個別に指定せずautoprefixerで指定する。
手動で指定しないこと。
>理由：ブラウザの指定を検証を手動で行わず、自動で行う。

## その他

- 中学生程度の平易な英単語を使う。
- 英単語は辞書で検索 OR Google変換を使って正確なスペルを使用する。
- CMS使用の場合、ネーミングは設計・URLに合わせる。
- 単語を繋げる場合、2単語以内でキャメルケースを使用。
- BEMの階層は2つまで。 `.hoge__fuga__hoge`3階層以上は新規blockを作成する。
- js実装箇所のブロックには idで接頭詞 `js-` を付けておく。
- class名は数字から始めない。
- 英単語の大文字は先頭のみとする。全部英字の場合はCSSで指定する。text-transform: uppercase;
- class名はハイフンとキャメルケースを使用可能とする。アンダースコアは使わない。
- id名はキャメルケースを使用可能とする。ハイフン、アンダースコアは使わない。
- Sassファイルに接頭詞をつける。
- block単位でSassファイルを分割する。
- calc計算は他の作業者がわかるよう複雑にしないように心がける。
- mixinは関数はベース担当者のみ作成する。作成する場合は確認・事後報告する。
- HTMLにstyleで見た目を指定しない。JavaScriptなど例外の場合は除く。