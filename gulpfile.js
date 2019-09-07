const Cfg = require('./gulp.config.js');
const gulp = require('gulp');
const stylelint = require('stylelint');
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').create();
const gulpIf = require('gulp-if');
const gulpNotify = require('gulp-notify');
const gulpPlumber = require('gulp-plumber');
const gulpRename = require('gulp-rename');
const gulpFileInclude = require('gulp-file-include');
const gulpHtmlmin = require('gulp-htmlmin');
const gulpEjs = require('gulp-ejs');
const gulpSass = require('gulp-sass');
const gulpSassGlob = require('gulp-sass-glob');
const gulpPostcss = require('gulp-postcss');
const gulpCleanCss = require('gulp-clean-css');
const gulpStylelint = require('gulp-stylelint');
const gulpEslint = require('gulp-eslint');
const gulpRollupEach = require('gulp-rollup-each');
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
      catch (error) {
        isError = true;
      }
      return null;
    },
    buildEnd() {
      if (isError) {
        gulpNotify('Warnings or errors were found').write(new Error());
        // throw new Error('Warnings or errors were found');
      }
    },
  };
};
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const babel = require('rollup-plugin-babel');
const { terser } = require('rollup-plugin-terser');
const gulpImagemin = require('gulp-imagemin');

function watchFilter(glob) {
  return Array.isArray(glob) ? glob.filter(element => !element.startsWith('!')) : glob;
}


// 無加工複製
gulp.task('duplicate:sub1', () => {
  return gulp.src(Cfg.duplicate.src, { since: gulp.lastRun('duplicate:sub1') })
    .pipe(gulp.dest(Cfg.duplicate.dest));
});
gulp.task('duplicate:sub2', () => {
  return gulp.src(Cfg.duplicate.wpSrc, { since: gulp.lastRun('duplicate:sub2') })
    .pipe(gulpIf(Cfg.duplicate.wpFlg,
      gulp.dest('./src/wp/')
    ));
});
gulp.task('duplicate', gulp.parallel('duplicate:sub1', 'duplicate:sub2'));


// HTML用タスク
gulp.task('html', () => {
  // gulp.srcでタスク対象ディレクトリ指定
  // "!./src/template/_**/*.html"の指定で(include用のパーツ群はディレクトリごと除外)
  return gulp.src(Cfg.html.src)
    // plumberでエラー発生時gulpが停止するのを防ぐ
    // notifyでエラー内容をデスクトップ通知
    .pipe(gulpPlumber({
      errorHandler: gulpNotify.onError('<%= error.message %>')
    }))
    // fileIncludeでHTMLファイルをincludeで読み込める用に設定
    .pipe(gulpFileInclude({
      prefix: '@@',
      basepath: Cfg.html.includeRoot
    }))
    .pipe(gulpIf(Cfg.html.minFlg,
      gulpHtmlmin({ collapseWhitespace: true })
    ))
    // タスク実行後に吐き出すディレクトリを指定
    .pipe(gulp.dest(Cfg.html.dest))
    .pipe(browserSync.reload({ stream: true }));
  });

// EJS用タスク
gulp.task('ejs', () => {
  return gulp.src(Cfg.ejs.src)
    .pipe(gulpPlumber({
      errorHandler: gulpNotify.onError('<%= error.message %>')
    }))
    .pipe(gulpEslint({
      useEslintrc: false,
      plugins: ['ejs-js'],
    }))
    .pipe(gulpEslint.format())
    .pipe(gulpEslint.failOnError())
    .pipe(gulpEjs())
    .pipe(gulpRename({ extname: Cfg.ejs.suffix }))
    .pipe(gulpIf(Cfg.ejs.minFlg,
      gulpHtmlmin({ collapseWhitespace: true })
    ))
    // ベースネームの最後に.phpがある場合は拡張子を変更
    .pipe(gulpRename((path) => {
      const basename = path.basename.match(/^(.*)+(\.php)$/);
      if (basename !== null) {
        path.basename = basename[1];
        path.extname = basename[2];
      }
    }))
    .pipe(gulp.dest(Cfg.ejs.dest))
    .pipe(browserSync.reload({ stream: true }));
});


// SCSS用タスク
gulp.task('sass', () => {
  return gulp.src(Cfg.scss.src, { sourcemaps: Cfg.scss.mapFlg })
    .pipe(gulpPlumber({
      errorHandler: gulpNotify.onError('<%= error.message %>')
    }))
    // リント
    .pipe(gulpStylelint({
      reporters: [
        { formatter: 'string', console: true }
      ],
    }))
    // sassGlobで"object"をディレクトリごとscss内でimport出来るように設定
    .pipe(gulpSassGlob())
    // sassコンパイル
    // オプションで吐き出す形式を設定
    .pipe(gulpSass({ outputStyle: Cfg.scss.outputStyle }))
    .pipe(gulpPostcss([
      // prefixを自動付与
      autoprefixer(Cfg.scss.autoprefixer),
      // プロパティの並び順変更
      stylelint({
        config: {
          'extends': 'stylelint-config-recess-order',
        },
        fix: true,
      })
    ]))
    // css圧縮
    //cleanCss内のオプションで圧縮時の設定を追加
    .pipe(gulpIf(Cfg.scss.minFlg,
      gulpCleanCss({
        compatibility: {
          properties: {
            zeroUnits: false,
          }
        }
      })
    ))
    .pipe(gulpIf(Cfg.scss.minFlg,
      // 圧縮後のファイルに.minのサフィックス付与
      gulpRename({
        suffix: '.min',
      })
    ))
    .pipe(gulp.dest(Cfg.scss.dest, { sourcemaps: Cfg.scss.mapFlg ? Cfg.scss.sourceMaps : false }))
    .pipe(browserSync.reload({ stream: true }))
    .pipe(gulpIf(Cfg.scss.wpFlg,
      gulp.dest('./src/wp/css/')
    ));
});


// JavaScript用タスク
gulp.task('js', () => {
  return gulp.src(Cfg.js.entry, { sourcemaps: Cfg.js.mapFlg })
    .pipe(gulpPlumber({
      errorHandler: gulpNotify.onError('<%= error.message %>'),
    }))
    .pipe(gulpRollupEach({
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
        Cfg.js.minFlg & terser({
          output: {
            comments: /^\**!|@preserve|@license|@cc_on/,
          },
        }),
      ],
    }, {
      output: {
        format: 'iife',
      }
    }))
    .pipe(gulpIf(Cfg.js.minFlg,
      gulpRename({
        suffix: '.min'
      })
    ))
    .pipe(gulp.dest(Cfg.js.dest, { sourcemaps: Cfg.js.mapFlg ? Cfg.js.sourceMaps : false }))
    .pipe(browserSync.reload({ stream: true }))
    .pipe(gulpIf(Cfg.js.wpFlg,
      gulp.dest('./src/wp/js/')
    ));
});


// images用タスク
gulp.task('image', () => {
  return gulp.src(Cfg.img.src, { since: gulp.lastRun('image') })
    .pipe(gulpPlumber({
      errorHandler: gulpNotify.onError('<%= error.message %>')
    }))
    .pipe(gulpImagemin([
        // gif圧縮
        gulpImagemin.gifsicle({
          optimizationLevel: 3,
        }),
        // jpg圧縮
        gulpImagemin.jpegtran({
          progressive: true,
        }),
        // png圧縮
        gulpImagemin.optipng(),
        // svg圧縮
        gulpImagemin.svgo({
          plugins: [
            {
              removeViewBox: false,
            }
          ]
        })
      ]))
    .pipe(gulp.dest(Cfg.img.dest))
    .pipe(browserSync.reload({ stream: true }))
    .pipe(gulpIf(Cfg.img.wpFlg,
      gulp.dest('./src/wp/img/')
    ));
});


// Sass自動修正
gulp.task('format:sass', () => {
  return gulp.src(Cfg.scss.srcFormat, { base: './' })
    .pipe(gulpPlumber({
      errorHandler: gulpNotify.onError('<%= error.message %>')
    }))
    // プロパティの並び順変更
    .pipe(gulpStylelint({
      config: {
        'extends': 'stylelint-config-recess-order',
      },
      fix: true,
      reporters: [
        { formatter: 'string', console: true }
      ],
    }))
    // リント
    .pipe(gulpStylelint({
      fix: true,
      reporters: [
        { formatter: 'string', console: true }
      ],
    }))
    .pipe(gulp.dest('./'));
});


// JavaScript自動修正
gulp.task('format:js', () => {
  return gulp.src(Cfg.js.src, { base: './' })
    .pipe(gulpPlumber({
      errorHandler: gulpNotify.onError('<%= error.message %>')
    }))
    .pipe(gulpEslint({
      fix: true,
    }))
    .pipe(gulpEslint.format())
    .pipe(gulpEslint.failAfterError())
    .pipe(gulp.dest('./'));
});


gulp.task('watch', () => {
  // 開発サーバー立ち上げ
  browserSync.init({
    server: {
      baseDir: Cfg.server.root,
    },
  });
  gulp.watch(watchFilter(Cfg.duplicate.src), gulp.parallel('duplicate'));
  gulp.watch(watchFilter(Cfg.html.src), gulp.parallel('html'));
  gulp.watch(watchFilter(Cfg.ejs.src), gulp.parallel('ejs'));
  gulp.watch(watchFilter(Cfg.scss.src), gulp.parallel('sass'));
  gulp.watch(watchFilter(Cfg.img.src), gulp.parallel('image'));
  gulp.watch(watchFilter(Cfg.js.src), gulp.parallel('js'));
});

gulp.task('default', gulp.parallel('duplicate', 'html', 'ejs', 'sass', 'js', 'image', 'watch'));
