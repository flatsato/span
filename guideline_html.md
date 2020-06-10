# ガイドライン HTML

HTML5を使用する。
モジュールの構造についてはtemplate内のHTMLを参照、案件に応じてアレンジは自由とする。

## head

### favicon、Facebook OGP、Twitter表示確認

クライアント指定がない場合は確認する。

## body

- bodyにレイアウト目的のid・classを指定しない。静的HTML、WordPressの場合はclass使用可。（XXXPage）

```
<body class="XXXPage">
```

## h1-h6

ｈ1タグ＝ページに1つのみ
TOPページ＝サイトタイトル・ロゴに指定
その他のページ＝ページ固有のタイトル

h2〜h4まで使用する
入れ子は基本的に3つの法則。

LPなど1ページにテキストボリュームが多い場合は
セクションの見出しをh1にする場合もある。

>理由：h1は1ページにひとつとわかりやすく統一する。クライアントの方針に従う。

## a

### 外部リンク

クライアント指定がなくてもtarget="_blank"を指定する

>理由：ほぼお約束だから。

target="_blank"と rel="noopener noreferrer"はセットで指定する。

>理由：target を使用する際は、window.opener API の悪用を避けるために rel="noopener noreferrer"を追加する。

```
<a href="" class="-www" target="_blank" rel="noopener noreferrer"></a>
```

### ファイルダウンロード

download属性をつける。

>理由：download属性を指定することで、そのリンクがダウンロード用のものであることを示すことができます。
>対応ブラウザでこのリンクをクリックすると、リンク先のファイルを表示せずにダウンロードが開始される。

```
<a href="example.gif" download="ファイル名">ダウンロード</a>
```

### メールリンク

mailto @は実体参照`&#64;`で記述する

>理由：@タグを直接記述しないことでクローラーを避ける効果がある

```
<address>
連絡先：<a href="mailto:info&#64;example.com">info&#64;example.com</a>
</address>

```

##address

個人、団体、組織の連絡先をマークアップ
住所、 URL、メールアドレス、電話番号、ソーシャルメディアのアカウント、地理上の座標など

```
<address>社名</address>
<address>sato@wd-flat.com</address>
```

## time

日付、時刻をマークアップ。datetime属性をセットとする。

>理由：datetime 属性を使用して、機械可読な形式の日付を記述し、検索エンジンの結果を改善できる。

```
<time datetime="2018">2018年</time>
<time datetime="2001-05-15T19:00">5月15日</time>
```

### 一番目の入力エリアに 属性autofocusを指定する

>理由：属性を指定することで読み込み時にカーソル位置を指定できる

##button 

formのボタンをaタグにしない
>理由：ボタンの使い回しでaタグを指定せず、適切なHTMLを使用する。

```
◎ OK
<button class="" type="">送信</button>

× NG
<a class="btn">送信</a>
```

name属性でボタンの名前を指定する

### text、textarea、checkbox、radioにはlabel属性と対応したid属性を必須とする。
>理由：labelをクリックで適用したフォームパーツにフォーカスがあたるため。

```
◎ OK
<legend class="form-groupTitle">性別</legend>
<label class="radio-inline"><input type="radio" name="sex" id="man" value="男性">男性</label>
<label class="radio-inline"><input type="radio" name="sex" id="woman" value="女性">女性</label>

× NG
<legend class="form-groupTitle">性別</legend>
<input type="radio" name="sex" id="man" value="男性">男性
<input type="radio" name="sex" id="woman" value="女性">女性
```

### checkbox、radioにはname属性を必須とする。
>理由：

```
◎ OK
<legend class="form-groupTitle">性別</legend>
<label class="radio-inline"><input type="radio" name="sex" id="man" value="男性">男性</label>
<label class="radio-inline"><input type="radio" name="sex" id="woman" value="女性"></label>
```

## SNS 

### 公式ボタン

### オリジナルボタン

## 機種依存文字

### 実体参照文字を使用する
> 理由：


### 名前付きエンティティを優先する。
> 理由：チームで統一し表記ゆれを無くす。

```
コピーライトの記述
◎ OK
&copy;

× NG
&#169;	
```

HTML上のその他の名前付きエンティティ
https://msdn.microsoft.com/ja-jp/library/cc392316.aspx

## 疑似要素

疑似要素はアニメーションの状態変化ができないので
確実にアニメしない箇所にだけ使用可。

イラスト・写真には疑似要素を使用しない
画像は要素ごとに書き出す。アニメーションで動かすことを事前に意識する。

## 背景画像

CMS更新箇所はCSSで背景画像を指定しない。
>理由：システム側でCSSを変更できないため。

## その他

### clearfixはHTMLのclassで指定しない
>理由：HTMLに依存するレイアウトを指定をしない。 

```
◎ OK
<div class="hoge">
.hoge{
...
 @include clearfix;
 }

× NG
<div class="hoge clearfix">
.hoge{...}
.clearfix{...}
```

### index.html 表記の省略
index.htmlの場合、URLにファイル名を記載しない。
> 理由：表記ゆれを無くす。非リンクが分散されるため。

```
◎ OK
<a href="/about/">

× NG
<a href="/about/index.html">
```

## 文字コード
指定がない限りUTF-8とする。
ファイルの先頭に文字コードを指定する。

```
◎OK
@charset "utf-8";

```
##インデント＝コードの改行は適宜行う。
block間は1行開ける。
>理由：人が見て見やすい／視認性の高いコードを基本とする。

```
◎ OK
<ul class="list">
  <li class="item"><a href="">テキスト</a></li>
  <li class="item"><a href="">テキスト</a></li>
</ul>
× NG 
<ul class="list"><li class="item"><a href="テキスト"></a></li><li class="item"><a href="テキスト"></a></li></ul>
```

## インライン要素に閉じタグを入れない
>理由：表記ゆれを無くし・余分なコードを減らす。

```
◎ OK
<br>
<img src="/img/common/logo.png">
× NG
<br />
<img src="/img/common/logo.png" />
```

## コメント
block＝開始と終了にコメントする、終了タグだけにしない。
>理由：エンジニアが解りやすいように開始と終了をコメントで囲う。

```
◎ OK
<!-- block START -->
<div class="hoge">
...
</div>
<!-- block END -->
× NG 
<div class="hoge">
...
<!-- block END -->
</div>
```

layout=大きく開始と終了が空く箇所、終了タグの後にコメントする
>理由：セットで解りやすいように

```
◎ OK 開始と終了タグで囲う
<!-- contents START -->
<div class="contents">
...
</div>
<!-- //contents END -->
× NG コメントなし
<div class="contents">
...
</div>
```

## パス記述はサイト内で統一する
サイトにより違うので事前に確認する。
確認なくサイトパス指定にしないよう注意。
>理由：後から変更は作業コストがかかる。
サイトパス=ドメイン直下で作成。

```
<img src="/img/common/logo.png">
<a href="/about/">
```

相対パス＝ディレクトリ完結で作成。

```
<img src="../img/common/logo.png">
<a href="../about/">
```
## http,httpsの統一
>理由：混在しないように、記述省略が非推奨となっているため。

```
◎ OK
<script src="http://www.google.com/js/gweb/analytics/autotrack.js"></script>
× NG
<script src="//www.google.com/js/gweb/analytics/autotrack.js"></script>
```