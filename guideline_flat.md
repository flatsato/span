# コーディング 基本方針

担当者：サトウ

## ガイドラインの目的

クオリティ向上＝最新制作法の共有化。最適な方法を選択し全体のクオリティを向上する。  
コードの均一化＝コーディングルールを見える化し、制作者・技術レベル・案件ごとの揺れを防ぐ。  
制作効率＝ルールを明確にして悩む時間を減らす。修正の工数・手戻りを最小限にする。  

## 柔軟なコーディング

技術至上主義でなく、クライアントの環境・体制を考慮し、最適なコーディングを提供する。  
複数人・複数会社での制作・運用を考慮し、スケジュールや運用体制によって内容を検討する。  
案件ガイドライン、リーダーから指定があった場合はそのルールを優先する。

## 提案型コーディング

制作コストを削減し顧客の目的にあったサイトを作るため、デザイン至上主義にならない設計を提案する。  
操作したくなるサイトを目指しシンプルなレイアウトにUIアニメーションをつける。

# フロントエンド実装の進め方

## コミュニケーション

作業依頼はBacklog、GitHub issueなど課題を立てて依頼します。  
Wikiに必要情報を記載しております。
その他の不明点はタスクツールに課題立てください。

##提出日

スケジュールは以下のようにお願いいたします。

- テストアップ＝課題指定日前日 〜12:00 
- 検証完了＝課題指定日 〜17:00 

## チェック項目内容

### 制作者チェック

チェック項目として以下の対応をお願いいたします。

- HTML、 CSS
- デザインカンプ＞透かしチェック
- リキッドレイアウトチェック
- FLATチェック＞修正対応
- クライアントチェック＞修正対応
- ブラウザチェック、作業ブラウザ+IE11、スマホ1機種、リキッドレイアウトの自己チェック

### アクセシビリティ対応

アクセシビリティの確保をお願いたします。

- アクセシビリティ＞実装チェックリスト 等級A
- マシンリーダビリティ＞Google Developers 
- ユーザビリティ＞Human Interface Guidelines

## HTML、 CSS

コーディングルールを楽に統一するために対応を行う。

###デザインカンプ、透かしチェック

各自で対応

```
PerfectPixel by WellDoneCode
https://www.welldonecode.com/perfectpixel/
```

要素の抜け漏れ、余白の大幅なズレを効率的に確認するために行う。

## 画像

### ディレクトリ構造

/img/ 基本的にimg直下に画像を格納しない  
（理由）判断の迷いを無くし、揺れを防ぐため

/img/common/ サイト共通画像を格納  
/img/dummy/ ダミー画像はすべてこちらに入れて納品公開前に削除する  

/img/about/ aboutカテゴリの画像  
about以下のページはページ名を接頭辞につけて、エリア名をアンダースコアでつなげる。    
揺れをなくすためアンダースコアで統一し、ハイフンは使用しない。  
例）company_main.jpg

### 画像ネーミング

画像名はタイトルを見て、どこのどんな状態の画像か想像がつくネーミングが理想的である。  

画像に連番を使わない。意味のある単語を使用する  
例外として期間限定サイトとダミー画像は連番で良い。   
（理由）運用しないサイト、本番で使用しない画像、スライダー内の画像は連番で良い。  
番号、並び順が変わった場合は極力リファクタリングする。

バリエーション違いは状態を表す単語を含むようにする  
以下の例はタイトルで色の想像がつく。  
例）icon_facebook01.png、icon_facebook02.png   
→ icon_facebook_white.png、icon_facebook_blue.png

2倍サイズの画像はネーミングに@2xを含めるようにする。  
（理由）画像名で等倍、2倍の判断がつく。

画像の接頭辞はディレクトリ名を含まない  
例 /about/内の画像には接頭辞に aboutを含めない。

### 画像作成

画像に適した画像フォーマットで書き出しする  
写真画像はpngにせずjpgにする、色数が256色に収まる画像はpngにする

### その他

- ダミー画像、不要画像は必ず削除する  
- 1MB前後の画像は手動で容量圧縮を行う


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

###blockネーミングにハイフンとアンダースコアを使わない

blockのネーミングはキャメルケースを使用する。

>理由：記号をblockネーミングに使わない

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

ショートハンドを使用せず、個別に記述する。

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
共通の指定
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

## その他

- class名は中学生程度の平易な英単語を使う。
- 英単語は辞書で検索 OR Google変換を使って正確なスペルを使用する。
- CMS使用の場合、ネーミングは設計・URLに合わせる。
- 単語を繋げる場合、2単語以内でキャメルケースを使用。ハイフン、アンダースコアは使わない。
- js実装箇所のブロックには idで接頭詞 `js-` を付けておく。
- class名は数字から始めない。
- Sassファイルに接頭詞をつける。
- block単位でSassファイルを分割する。
- calc計算は他の作業者がわかるよう複雑にしないように心がける。

# ガイドライン HTML

FLATでは細かいコードに関するマニュアルは作らない方針です。  
エンジニアには、メイン制作者に質問しつつコードを解読する能力を持っていただきたいです。

## body

- bodyにレイアウト目的のid・classを指定しない。静的HTML、WordPressの場合はclass使用可。class名は（XXXPage）とする

```
<body class="XXXPage">
```

## h1-h6

ｈ1タグ＝ページに1つのみ
TOPページ＝サイトタイトル・ロゴに指定
その他のページ＝ページ固有のタイトル

>理由：h1は1ページにひとつとわかりやすく統一する。クライアントの方針に従う。

## その他

### インライン要素に閉じタグを入れない
>理由：表記ゆれを無くし・余分なコードを減らす。

```
◎ OK
<br>
<img src="/img/common/logo.png">
× NG
<br />
<img src="/img/common/logo.png" />
```