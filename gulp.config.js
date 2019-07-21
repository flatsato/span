module.exports = {
  "server": {
    // localhostのDocumentRootの設定
    "root": "./docs",
  },

  "html": {
    // htmlに関するタスクを実行する対象の設定
    "src": [
      "./src/template/**/*.{html,php}",
      "!./src/template/_include/**",
    ],
    // パーツとしてincludeするモジュールの格納先設定
    "includeRoot": "./src/template/_include/",
    // タスク完了後destするディレクトリの設定
    "dest": "./docs/",
    // dest時の圧縮設定
    "minFlg": false,
  },

  "ejs": {
    // ejsに関するタスクを実行する対象の設定
    "src": [
      "./src/template/**/*.ejs",
      "!./src/template/_include/**",
    ],
    // srcディレクトリの.ejsファイルをdestした際の拡張子の設定
    "suffix": ".html",
    // タスク完了後destするディレクトリの設定
    "dest": "./docs/",
    // dest時の圧縮設定
    "minFlg": false,
  },

  "scss": {
    // scssに関するタスクを実行する対象の設定
    "src": "./src/scss/**/*.scss",
    // scssのコンパイル後の形式を設定
    "outputStyle": "expanded",
    // Autoprefixerオプション
    // https://github.com/postcss/autoprefixer#options
    "autoprefixer": {
      // グリッドレイアウトをIEに対応する設定 (false|"autoplace"|"no-autoplace")
      "grid": "autoplace",
    },
    // sourcemapのdestディレクトリを設定
    "sourceMaps": "./maps",
    // タスク完了後destするディレクトリの設定
    "dest": "./docs/css",
    // dest時の圧縮設定
    "minFlg": true,
    // sourcemapの設定
    "mapFlg": true,
    // wordpress用のdest設定
    "wpFlg": false,
  },

  "js_works": {
    // js(開発)に関するタスクを実行する対象の設定
    "src": [
      "./src/js/**/*.js",
      "!./src/js/vendor/**/*.js",
    ],
    "entry": [
      "./src/js/script.js",
    ],
    // sourcemapのdestディレクトリを設定
    "sourceMaps": "./maps",
    // タスク完了後destするディレクトリの設定
    "dest": "./docs/js",
    // dest時の圧縮設定
    "minFlg": false,
    // sourcemapの設定
    "mapFlg": true,
    // wordpress用のdest設定
    "wpFlg": false,
  },
  "js_vendor": {
    // js(プラグイン)に関するタスクを実行する対象の設定
    "src": "./src/js/vendor/**/*.js",
    // タスク完了後destするディレクトリの設定
    "dest": "./docs/js/vendor",
    // dest時の圧縮設定
    "minFlg": false,
  },

  "img": {
    // imgに関するタスクを実行する対象の設定
    "src": "./src/img/**/*",
    // タスク完了後destするディレクトリの設定
    "dest": "./docs/img/",
    // wordpress用のdest設定
    "wpFlg": false,
  },
};
