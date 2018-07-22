const
  gulp = require('gulp'),
  runSequence = require('run-sequence'),
  Cfg = require('./gulpconfig.json');
  // gulp-load-pluginsで"gulp-"で始まる名称のパッケージのrequireを省略
  $ = require('gulp-load-plugins')();

// 開発サーバー立ち上げ
gulp.task('webserver', ()=> {
  gulp.src(Cfg.server.root)
  .pipe($.webserver({
    host: '0.0.0.0',
    livereload: true
  }));
});


// HTML用タスク
gulp.task('html', ()=> {
  // gulp.srcでタスク対象ディレクトリ指定
  // "!./src/template/_**/*.html"の指定で(include用のパーツ群はディレクトリごと除外)
  gulp.src(Cfg.html.src)
  // plumberでエラー発生時gulpが停止するのを防ぐ
  // notifyでエラー内容をデスクトップ通知
  .pipe($.plumber({
    errorHandler: $.notify.onError('<%= error.message %>')
  }))
  // fileIncludeでHTMLファイルをincludeで読み込める用に設定
  .pipe($.fileInclude({
    prefix: '@@',
    basepath: Cfg.html.includeRoot
  }))
  .pipe($.if(Cfg.html.minFlg,
    $.htmlmin({collapseWhitespace: true})
  ))
  .pipe($.if(Cfg.html.minFlg,
    // 圧縮後のファイルに.minのサフィックス付与
    $.rename({
      suffix: '.min'
    })
  ))
  // タスク実行後に吐き出すディレクトリを指定
  .pipe(gulp.dest(Cfg.html.dest));
});

// EJS用タスク
gulp.task('ejs', ()=> {
  gulp.src(Cfg.ejs.src)
  .pipe($.plumber({
    errorHandler: $.notify.onError('<%= error.message %>')
  }))
  .pipe($.ejs(
    {msg: 'Run EJS'},
    {},
    // dest時のファイルの拡張子を設定
    {ext: Cfg.ejs.suffix}
  ))
  .pipe($.if(Cfg.ejs.minFlg,
    $.htmlmin({collapseWhitespace: true})
  ))
  .pipe($.if(Cfg.ejs.minFlg,
    // 圧縮後のファイルに.minのサフィックス付与
    $.rename({
      suffix: '.min'
    })
  ))
  .pipe(gulp.dest(Cfg.ejs.dest))
});


// SCSS用タスク
gulp.task('sass', ()=> {
  gulp.src(Cfg.scss.src)
  .pipe($.plumber({
    errorHandler: $.notify.onError('<%= error.message %>')
  }))
  .pipe($.if(Cfg.scss.mapFlg,
    // sourcemaps用設定
    // オプションのloadMapsで外部のソースマップファイル読み込みを設定
    $.sourcemaps.init({loadMaps: true})
  ))
  // sassBulkImportで"object"をディレクトリごとscss内でimport出来るように設定
  .pipe($.sassBulkImport())
  // sassコンパイル
  // オプションで吐き出す形式を設定
  .pipe($.sass({outputStyle: Cfg.scss.outputStyle}))
  // prefixを自動付与
  .pipe($.autoprefixer({
    browsers: Cfg.scss.prefixBrowser
  }))
  // プロパティの並び順変更
  .pipe($.csscomb())
  // css圧縮
  //cleanCss内のオプションで圧縮時の設定を追加
  .pipe($.if(Cfg.scss.minFlg,
    $.cleanCss({compatibility: '-properties.zeroUnits'})
  ))
  .pipe($.if(Cfg.scss.minFlg,
    // 圧縮後のファイルに.minのサフィックス付与
    $.rename({
      suffix: '.min'
    })
  ))
  .pipe($.if(Cfg.scss.mapFlg,
    // sourcemap吐き出し
    $.sourcemaps.write(Cfg.scss.sourceMaps, {includeContent: false})
  ))
  .pipe(gulp.dest(Cfg.scss.dest))
  .pipe($.if(Cfg.scss.wpFlg,
    gulp.dest("src/wp/thema/css/")
  ))
});


// JavaScript(開発ディレクトリ)
gulp.task('js:works', ()=> {
  gulp.src(Cfg.js_works.src)
  .pipe($.plumber({
    errorHandler: $.notify.onError('<%= error.message %>')
  }))
  .pipe($.if(Cfg.js_works.mapFlg,
    $.sourcemaps.init({loadMaps: true})
  ))
  // 対象ディクトリ内で変更があったファイルだけをストリーム(次の処理)に流す
  .pipe($.changed(Cfg.js_works.dest))
  // JavaScriptのLintチェック
  .pipe($.eslint({ useEslintrc: false }))
  // formatでLint結果をconsoleに表示
  .pipe($.eslint.format())
  // Lintエラーが発生した場合タスクの停止(dest以下のストリームを流さない)
  .pipe($.eslint.failOnError())
  .pipe($.if(Cfg.js_works.minFlg,
    // JavaScript圧縮
    $.uglify()
  ))
  .pipe($.if(Cfg.js_works.minFlg,
    $.rename({
      suffix: '.min'
    })
  ))
  .pipe($.if(Cfg.js_works.mapFlg,
    $.sourcemaps.write(Cfg.js_works.sourceMaps, {includeContent: false})
  ))
  .pipe(gulp.dest(Cfg.js_works.dest))
  .pipe($.if(Cfg.js_works.wpFlg,
    gulp.dest("src/wp/thema/js/")
  ))
});


// JavaScript(プラグイン)
const
  saveLicense = require('uglify-save-license');

gulp.task('js:vendor', ()=> {
  gulp.src(Cfg.js_vendor.src)
  .pipe($.plumber({
    errorHandler: $.notify.onError('<%= error.message %>')
  }))
  .pipe($.changed(Cfg.js_vendor.dest))
  .pipe($.if(Cfg.js_vendor.minFlg,
    // saveLicenseで圧縮時に各種プラグインのライセンス記載部分を残す
    $.uglify({
      output: {
        comments: saveLicense
      }
    })
  ))
  .pipe(gulp.dest(Cfg.js_vendor.dest));
});


// js:worksとjs:vendorを並行処理
gulp.task('js', ()=> {
  runSequence(
    ['js:works', 'js:vendor']
  );
});


// images用タスク
const
  pngquant = require('imagemin-pngquant'),
  mozjpeg = require('imagemin-mozjpeg');

gulp.task('image', ()=> {
  gulp.src(Cfg.img.src)
  .pipe($.plumber({
    errorHandler: $.notify.onError('<%= error.message %>')
  }))
  .pipe($.imagemin([
      // png圧縮
      pngquant({
        quality: Cfg.img.pngQuality,
        speed: 1
      }),
      // jpg圧縮
      mozjpeg({
        quality: Cfg.img.jpgQuality,
        speed: 1
      }),
      // gif圧縮
      $.imagemin.gifsicle({
        quality: Cfg.img.gifQuality,
        speed: 1
      }),
      // svg圧縮
      $.imagemin.svgo({
        quality: Cfg.img.svgQuality,
        speed: 1
      })
    ]))
  .pipe(gulp.dest(Cfg.img.dest))
  .pipe($.if(Cfg.img.wpFlg,
    gulp.dest("src/wp/thema/img/")
  ))
});


gulp.task('watch', ()=> {
  gulp.watch('src/template/**/*.html', ['html']);
  gulp.watch('src/template/**/*.ejs', ['ejs']);
  gulp.watch('src/scss/**/*.scss', ['sass']);
  gulp.watch('src/img/**/*', ['image']);
  gulp.watch(['src/js/**/*.js', '!src/js/vendor/*.js'], ['js:works']);
  gulp.watch('src/js/vendor/*.js', ['js:vendor']);
});

gulp.task('default', ()=> {
  runSequence(
    ['webserver', 'html', 'ejs', 'sass', 'js', 'image'],
    'watch'
  );
});
