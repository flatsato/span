const
  gulp = require('gulp'),
  stylelint = require('stylelint'),
  autoprefixer = require('autoprefixer'),
  cssMqpacker = require('css-mqpacker'),
  browserSync = require('browser-sync').create(),
  Cfg = require('./gulp.config.js');
  // gulp-load-pluginsで"gulp-"で始まる名称のパッケージのrequireを省略
  $ = require('gulp-load-plugins')();
const rollupEach = require('gulp-rollup-each');
const { eslint: _eslint } = require('rollup-plugin-eslint');
const eslint = function eslint(options = {}) {
  const plugin = _eslint(options);
  let isError = false;
  return {
    name: plugin.name,
    transform(code, id) {
      try {
        plugin.transform.call(this, code, id);
      }
      catch(error) {
        isError = true;
      }
      return null;
    },
    buildEnd() {
      if (isError) {
        $.notify('Warnings or errors were found').write(new Error());
        // throw new Error('Warnings or errors were found');
      }
    },
  };
};
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const babel = require('rollup-plugin-babel');
const { uglify } = require('rollup-plugin-uglify');

// 無加工複製
gulp.task('duplicate', ()=> {
  return gulp.src(['src/duplicate/**/*', 'src/duplicate/**/.*', '!src/duplicate/.gitkeep'], { since: gulp.lastRun('duplicate') })
  .pipe(gulp.dest('./dist/'));
});


// HTML用タスク
gulp.task('html', ()=> {
  // gulp.srcでタスク対象ディレクトリ指定
  // "!./src/template/_**/*.html"の指定で(include用のパーツ群はディレクトリごと除外)
  return gulp.src(Cfg.html.src)
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
  // タスク実行後に吐き出すディレクトリを指定
  .pipe(gulp.dest(Cfg.html.dest))
  .pipe(browserSync.reload({ stream: true }))
});

// EJS用タスク
gulp.task('ejs', ()=> {
  return gulp.src(Cfg.ejs.src)
  .pipe($.plumber({
    errorHandler: $.notify.onError('<%= error.message %>')
  }))
  .pipe($.eslint({
    useEslintrc: false,
    plugins: ['ejs-js'],
  }))
  .pipe($.eslint.format())
  .pipe($.eslint.failOnError())
  .pipe($.ejs(
    {},
    {},
    // dest時のファイルの拡張子を設定
    {ext: Cfg.ejs.suffix}
  ))
  .pipe($.if(Cfg.ejs.minFlg,
    $.htmlmin({collapseWhitespace: true})
  ))
  // ベースネームの最後に.phpがある場合は拡張子を変更
  .pipe($.rename((path) => {
    const basename = path.basename.match(/^(.*)+(\.php)$/);
    if (basename !== null) {
      path.basename = basename[1];
      path.extname = basename[2];
    }
  }))
  .pipe(gulp.dest(Cfg.ejs.dest))
  .pipe(browserSync.reload({ stream: true }))
});


// SCSS用タスク
gulp.task('sass', ()=> {
  return gulp.src(Cfg.scss.src, {sourcemaps: Cfg.scss.mapFlg})
  .pipe($.plumber({
    errorHandler: $.notify.onError('<%= error.message %>')
  }))
  // sassGlobで"object"をディレクトリごとscss内でimport出来るように設定
  .pipe($.sassGlob())
  // sassコンパイル
  // オプションで吐き出す形式を設定
  .pipe($.sass({outputStyle: Cfg.scss.outputStyle}))
  .pipe($.postcss([
    // prefixを自動付与
    autoprefixer(Cfg.scss.autoprefixer),
    // メディアクエリ最適化
    cssMqpacker(),
    // プロパティの並び順変更
    stylelint({
      config: {
        "extends": "stylelint-config-recess-order",
        "ignoreFiles": "src/scss/vendor/**",
      },
      fix: true,
    })
  ]))
  // css圧縮
  //cleanCss内のオプションで圧縮時の設定を追加
  .pipe($.if(Cfg.scss.minFlg,
    $.cleanCss({
      compatibility: {
        properties: {
          zeroUnits: false,
        }
      }
    })
  ))
  .pipe($.if(Cfg.scss.minFlg,
    // 圧縮後のファイルに.minのサフィックス付与
    $.rename({
      suffix: '.min'
    })
  ))
  .pipe(gulp.dest(Cfg.scss.dest, { sourcemaps: Cfg.scss.mapFlg ? Cfg.scss.sourceMaps : false}))
  .pipe(browserSync.reload({ stream: true }))
  .pipe($.if(Cfg.scss.wpFlg,
    gulp.dest("./src/wp/css/")
  ))
});

// SASSLINT用タスク
gulp.task('sasslint', ()=> {
  return gulp.src([Cfg.scss.src, "!./src/scss/vendor/**"])
  .pipe($.stylelint({
    failAfterError: false,
    reporters: [
      {formatter: 'string', console: true}
    ],
  }))
});
gulp.task('sasslint-fix', ()=> {
  return gulp.src([Cfg.scss.src, "!./src/scss/vendor/**"])
  .pipe($.stylelint({
    fix: true,
    failAfterError: false,
    reporters: [
      {formatter: 'string', console: true}
    ],
  }))
  .pipe(gulp.dest('./src/scss/'));
});

// JavaScript(開発ディレクトリ)
gulp.task('js:works', ()=> {
  return gulp.src(Cfg.js_works.entry, { sourcemaps: Cfg.js_works.mapFlg })
    .pipe($.plumber({
      errorHandler: $.notify.onError("<%= error.message %>"),
    }))
    .pipe(rollupEach({
      plugins: [
        eslint({
          throwOnError: true,
          throwOnWarning: true,
        }),
        nodeResolve(),
        commonjs(),
        babel({
          runtimeHelpers: true,
        }),
        Cfg.js_works.minFlg ? uglify() : {},
      ],
    }, {
      output: {
        format: 'iife',
      }
    }))
    .pipe($.if(Cfg.js_works.minFlg,
      $.rename({
        suffix: '.min'
      })
    ))
    .pipe(gulp.dest(Cfg.js_works.dest, { sourcemaps: Cfg.js_works.mapFlg ? Cfg.js_works.sourceMaps : false}))
    .pipe(browserSync.reload({ stream: true }))
    .pipe($.if(Cfg.js_works.wpFlg,
      gulp.dest("./src/wp/js/")
    ))
});


// JavaScript(プラグイン)
const
  saveLicense = require('uglify-save-license');

gulp.task('js:vendor', ()=> {
  return gulp.src(Cfg.js_vendor.src, { since: gulp.lastRun('js:vendor') })
  .pipe($.plumber({
    errorHandler: $.notify.onError('<%= error.message %>')
  }))
  .pipe($.if(Cfg.js_vendor.minFlg,
    // saveLicenseで圧縮時に各種プラグインのライセンス記載部分を残す
    $.uglify({
      output: {
        comments: saveLicense
      }
    })
  ))
  .pipe(gulp.dest(Cfg.js_vendor.dest))
  .pipe(browserSync.reload({ stream: true }))
});


// js:worksとjs:vendorを並行処理
gulp.task('js', gulp.parallel('js:works', 'js:vendor'));


// images用タスク
gulp.task('image', ()=> {
  return gulp.src(Cfg.img.src, { since: gulp.lastRun('image') })
  .pipe($.plumber({
    errorHandler: $.notify.onError('<%= error.message %>')
  }))
  .pipe($.imagemin([
      // gif圧縮
      $.imagemin.gifsicle({
        optimizationLevel: 3,
      }),
      // jpg圧縮
      $.imagemin.jpegtran({
        progressive: true,
      }),
      // png圧縮
      $.imagemin.optipng(),
      // svg圧縮
      $.imagemin.svgo({
        plugins: [
          {
            removeViewBox: false,
          }
        ]
      })
    ]))
  .pipe(gulp.dest(Cfg.img.dest))
  .pipe(browserSync.reload({ stream: true }))
  .pipe($.if(Cfg.img.wpFlg,
    gulp.dest("./src/wp/img/")
  ))
});


gulp.task('watch', ()=> {
  // 開発サーバー立ち上げ
  browserSync.init({
    server: {
      baseDir: Cfg.server.root,
    },
  });
  gulp.watch(['src/duplicate/**/*', 'src/duplicate/**/.*', '!src/duplicate/.gitkeep'], gulp.parallel('duplicate'));
  gulp.watch('src/template/**/*.html', gulp.parallel('html'));
  gulp.watch('src/template/**/*.ejs', gulp.parallel('ejs'));
  gulp.watch('src/scss/**/*.scss', gulp.parallel('sass'));
  gulp.watch('src/img/**/*', gulp.parallel('image'));
  gulp.watch(Cfg.js_works.src, gulp.parallel('js:works'));
  gulp.watch('src/js/vendor/*.js', gulp.parallel('js:vendor'));
});

gulp.task('default', gulp.parallel('duplicate', 'html', 'ejs', 'sass', 'js', 'image','watch'));
