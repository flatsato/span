# フロントエンド実装の進め方

担当者：サトウ

## コミュニケーション

作業依頼はBacklog、GitHub issueなど課題を立てて依頼いたします。  
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

### HTML Validator 対応

各自で対応

### CSS lint 対応

各自で対応

### editor config 対応

各自で対応

```
どんなエディタでもEditorConfigを使ってコードの統一性を高める - Qiita
https://qiita.com/naru0504/items/82f09881abaf3f4dc171
```

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

ダミー画像、不要画像は必ず削除する  
1MB前後の画像は手動で容量圧縮を行う


##アクセシビリティ 

###JIS等級A

```
実装チェックリスト JIS X 8341-3:2010 等級A
http://jis8341.net/shiken.html
```
```
20分でできる簡易チェックシート 等級A（excel版 127KB）
http://jis8341.net/download_count/download.php?download=6
```
```
Webアクセシビリティ 逆引きガイドライン｜実践ノウハウ｜エー イレブン ワイ［WebA11y.jp］
http://weba11y.jp/know-how/guidelines/guidelines_index/
```

### マシンリーダビリティ＞Google Developers

```
モバイル フレンドリー テスト - Google Search Console
https://search.google.com/test/mobile-friendly?hl=JA
```

```
PageSpeed Insights
https://developers.google.com/speed/pagespeed/insights/?hl=JA
```

###ユーザビリティ＞Human Interface Guidelines

```
デザイン - Apple Developer
https://developer.apple.com/jp/design/
```

```
ユーザインターフェイスのデザインのヒント - Apple Developer
https://developer.apple.com/jp/design/tips/
```
