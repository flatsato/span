<?php

//全体 基本設定
function mytheme_setup() {

	// ページのタイトルを出力
	add_theme_support( 'title-tag' );

	// HTML5対応
	add_theme_support( 'html5', array( 'style', 'script' ) );

	// アイキャッチ画像
	add_theme_support( 'post-thumbnails' );

	// ナビゲーションメニュー
	register_nav_menus( array(
		'primary' => 'メイン',
	) );

	// 編集画面用のCSS
	add_theme_support( 'editor-styles', date('U'));
	add_editor_style( 'editor-style.css', date('U'));

	//block css
	add_theme_support( 'wp-block-styles', date('U'));

	// 埋め込みコンテンツのレスポンシブ化
	add_theme_support( 'responsive-embeds', date('U') );

}
add_action( 'after_setup_theme', 'mytheme_setup' );

//全体 ウィジェット
function mytheme_widgets() {
	register_sidebar( array(
		'id' => 'sidebar-1',
		'name' => 'サイドメニュー',
		'before_widget' => '<section id="%1$s" class="l_sidebar__widget %2$s">',
		'after_widget'  => '</section>',
	) );
}
add_action( 'widgets_init', 'mytheme_widgets' );

//全体 CSS
function mytheme_enqueue() {

	//Font Awesome
	wp_enqueue_style( 'mytheme-fontawesome', 'https://use.fontawesome.com/releases/v5.8.1/css/all.css', array(), null );


	//Google Fonts
	wp_enqueue_style( 'mytheme-googlefonts', 'https://fonts.googleapis.com/css?family=Montserrat:400,800', array(), null );

	//テーマのCSS
	wp_enqueue_style( 'mytheme-style', get_stylesheet_uri(), array(), date('U') );

}
add_action( 'wp_enqueue_scripts', 'mytheme_enqueue' );

//全体 Font Awesomeの属性
function mytheme_sri( $html, $handle ) {
	if ( $handle === 'mytheme-fontawesome' ) {
		return str_replace(
			'/>',
			'integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous"' . ' />',
			$html 
		);
	}
	return $html;
}
add_filter( 'style_loader_tag', 'mytheme_sri', 10, 2);

//投稿画面の項目の表示
add_action( 'init', 'remove_block_editor_options' );
function remove_block_editor_options() {
//   remove_post_type_support( 'post', 'author' );              // 投稿者
//   remove_post_type_support( 'post', 'post-formats' );        // 投稿フォーマット
//   remove_post_type_support( 'post', 'revisions' );           // リビジョン
//   remove_post_type_support( 'post', 'thumbnail' );           // アイキャッチ
//   remove_post_type_support( 'post', 'excerpt' );             // 抜粋
//   remove_post_type_support( 'post', 'comments' );            // コメント
//   remove_post_type_support( 'post', 'trackbacks' );          // トラックバック
//   remove_post_type_support( 'post', 'custom-fields' );       // カスタムフィールド
//   unregister_taxonomy_for_object_type( 'category', 'post' ); // カテゴリー
//   unregister_taxonomy_for_object_type( 'post_tag', 'post' ); // タグ
}

//Post blockカテゴリー追加
add_filter( 'block_categories', 'add_block_categories' );
function add_block_categories( $categories ) {
  $add_categories = [
    [
      'slug' => 'example-category',
      'title' => 'サンプルカテゴリー',
      'icon' => 'admin-site-alt3',
    ],
  ];
  $categories = array_merge( $categories, $add_categories );
  return $categories;
}

//Post block 非表示
add_filter( 'allowed_block_types', 'custom_allowed_block_types' );
function custom_allowed_block_types( $allowed_block_types ) {
  $allowed_block_types = array(
    // 一般ブロック
    'core/paragraph',           // 段落
    'core/heading',             // 見出し
    'core/image',               // 画像
    'core/quote',               // 引用
    'core/gallery',             // ギャラリー
    'core/list',                // リスト
    'core/audio',               // 音声
    'core/cover',               // カバー
    'core/file',                // ファイル
    'core/video',               // 動画

    // フォーマット
    'core/code',                // ソースコード
    'core/freeform',            // クラシック
    'core/html',                // カスタムHTML
    'core/preformatted',        // 整形済み
    'core/pullquote',           // プルクオート
    'core/table',               // テーブル
    'core/verse',               // 詩

    // レイアウト要素
    'core/button',              // ボタン
    'core/columns',             // カラム
    'core/media-text',          // メディアと文章
    'core/more',                // 続きを読む
    'core/nextpage',            // 改ページ
    'core/separator',           // 区切り
    'core/spacer',              // スペーサー

    // ウィジェット
    'core/shortcode',           // ショートコード
    'core/archives',            // アーカイブ
    'core/categories',          // カテゴリー
    'core/latest-comments',     // 最新のコメント
    'core/latest-posts',        // 最新の記事

    // 埋め込み
    'core/embed',               // 埋め込み
    'core-embed/twitter',       // Twitter
    'core-embed/youtube',       // YouTube
    'core-embed/facebook',      // Facebook
    'core-embed/instagram',     // Instagram
    'core-embed/wordpress',     // WordPress
    'core-embed/soundcloud',    // SoundCloud
    'core-embed/spotify',       // Spotify
    'core-embed/flickr',        // Flickr
    'core-embed/vimeo',         // Viemo
    'core-embed/animoto',       // Animoto
    'core-embed/cloudup',       // Cloudup
    'core-embed/collegehumor',  // CollegeHumor
    'core-embed/dailymotion',   // Dailymotion
    'core-embed/funnyordie',    // Funny or Die
    'core-embed/hulu',          // Hulu
    'core-embed/imgur',         // Imgur
    'core-embed/issuu',         // Issuu
    'core-embed/kickstarter',   // Kickstarter
    'core-embed/meetup-com',    // Meetup.com
    'core-embed/mixcloud',      // Mixcloud
    'core-embed/photobucket',   // Photobucket
    'core-embed/polldaddy',     // Polldaddy
    'core-embed/reddit',        // Reddit
    'core-embed/reverbnation',  // ReverbNation
    'core-embed/screencast',    // Screencast
    'core-embed/scribd',        // Scribd
    'core-embed/slideshare',    // Slideshare
    'core-embed/smugmug',       // SmugMug
    'core-embed/speaker-deck',  // Speaker Deck
    'core-embed/ted',           // TED
    'core-embed/tumblr',        // Tumblr
    'core-embed/videopress',    // VideoPress
    'core-embed/wordpress-tv',  // WordPress.tv

    // 再利用ブロック
    'core/block',               // 再利用ブロック
  );
  return $allowed_block_types;
}

//Post カラーパレットの色指定

add_theme_support( 'editor-color-palette', array(
	array(
	  'name'  => __( 'Blue', 'themeLangDomain' ),
	  'slug'  => 'example-blue',
	  'color' => '#3498db',
	),
	array(
	  'name'  => __( 'Red', 'themeLangDomain' ),
	  'slug'  => 'example-red',
	  'color' => '#e74c3c',
	),
	array(
	  'name'  => __( 'Yellow', 'themeLangDomain' ),
	  'slug'  => 'example-yellow',
	  'color' => '#f1c40f',
	),
	array(
	  'name'  => __( 'Black', 'themeLangDomain' ),
	  'slug'  => 'example-black',
	  'color' => 'rgb(0, 0, 0)',
	),
	array(
	  'name'  => __( 'White', 'themeLangDomain' ),
	  'slug'  => 'example-white',
	  'color' => 'hsl(0, 0%, 100%)',
	),
  ) );