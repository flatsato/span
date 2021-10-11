const mode = (() => {
  if (process.env.NODE_ENV === undefined) {
    process.env.NODE_ENV = "development";
  }
  return process.env.NODE_ENV;
})();

module.exports = {
  "server": {
    // localhostのDocumentRootの設定
    "root": "./dist",
  },

  "duplicate": {
    // duplicateに関するタスクを実行する対象の設定
    "src": [
      "src/duplicate/**/{*,.*}",
      "!src/duplicate/.gitkeep",
    ],
    "wpSrc": "src/duplicate/{css,js}/**/*",
    // タスク完了後destするディレクトリの設定
    "dest": "./dist/",
    // wordpress用のdest設定
    "wpFlg": false,
  },

  "ejs": {
    // ejsに関するタスクを実行する対象の設定
    "src": "./src/template/**/*.ejs",
    // srcディレクトリの.ejsファイルをdestした際の拡張子の設定
    "suffix": ".html",
    // タスク完了後destするディレクトリの設定
    "dest": "./dist/",
    // dest時の圧縮設定
    "minFlg": false,
  },

  "scss": {
    // scssに関するタスクを実行する対象の設定
    "src": "./src/scss/**/*.scss",
    // scssの自動修正タスクを実行する対象の設定
    "srcFormat": [
      "./src/scss/**/*.scss",
      "!./src/scss/vendor/**",
    ],
    // scssのコンパイル後の形式を設定
    "outputStyle": "expanded",
    // Autoprefixerオプション
    // https://github.com/postcss/autoprefixer#options
    "autoprefixer": {
      // グリッドレイアウトをIEに対応する設定 (false|"autoplace"|"no-autoplace")
      "grid": false,
    },
    // sourcemapのdestディレクトリを設定
    "sourceMaps": "./maps",
    // タスク完了後destするディレクトリの設定
    "dest": "./dist/css",
    // dest時の圧縮設定
    "minFlg": true,
    // sourcemapの設定
    "mapFlg": mode !== "production",
    // wordpress用のdest設定
    "wpFlg": false,
  },

  "js": {
    // js(開発)に関するタスクを実行する対象の設定
    "src": "./src/js/**/*.js",
    "entry": [
      "./src/js/script.js",
    ],
    // sourcemapのdestディレクトリを設定
    "sourceMaps": "./maps",
    // タスク完了後destするディレクトリの設定
    "dest": "./dist/js",
    // dest時の圧縮設定
    "minFlg": false,
    // sourcemapの設定
    "mapFlg": mode !== "production",
    // wordpress用のdest設定
    "wpFlg": false,
  },

  "img": {
    // imgに関するタスクを実行する対象の設定
    "src": "./src/img/**/*",
    // タスク完了後destするディレクトリの設定
    "dest": "./dist/img/",
    // wordpress用のdest設定
    "wpFlg": false,
  },

  "remove": [
    "./dist",
  ],
};
