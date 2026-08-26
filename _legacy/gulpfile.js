const path = require('path');
const through = require('through2');
const { spawn } = require('child_process');
const { src, dest, lastRun, series, parallel, watch, task } = require('gulp');
const stylelint = require('stylelint');
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').create();
const gulpChanged = require('gulp-changed');
const gulpIf = require('gulp-if');
const gulpPlumber = require('gulp-plumber');
const gulpProgeny = require('gulp-progeny');
const gulpRename = require('gulp-rename');
const gulpHtmlmin = require('gulp-htmlmin');
const gulpEjs = require('gulp-ejs');
const gulpSass = require('gulp-sass')(require('sass'));
const gulpSassGlob = require('gulp-sass-glob');
const gulpPostcss = require('gulp-postcss');
const postcssCsso = require('postcss-csso');
const gulpEslint = require('gulp-eslint7');
const gulpRollupEach = require('gulp-rollup-each');
const rollup = require('rollup');
const replace = require('@rollup/plugin-replace');
const eslint = require('@rollup/plugin-eslint');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const { babel } = require('@rollup/plugin-babel');
const { terser } = require('rollup-plugin-terser');
const gulpImagemin = require('gulp-imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const postcssScss = require('postcss-scss');
const postcssAspectRatioPolyfill = require('postcss-aspect-ratio-polyfill');
const postcssCssVariables = require('postcss-css-variables');
const postcssReporter = require('postcss-reporter');
const Cfg = require('./gulp.config.js');
const gulpPlumberOptions = {
  errorHandler: function errorHandler() {
    this.emit('end');
  },
};

// 無加工複製
task('duplicate:sub1', () => {
  return src(Cfg.duplicate.src, { since: lastRun('duplicate:sub1') })
    .pipe(gulpChanged(Cfg.duplicate.dest))
    .pipe(dest(Cfg.duplicate.dest));
});
task('duplicate:sub2', () => {
  return src(Cfg.duplicate.wpSrc, { since: lastRun('duplicate:sub2') })
    .pipe(gulpIf(Cfg.duplicate.wpFlg, gulpChanged('./src/wp/')))
    .pipe(gulpIf(Cfg.duplicate.wpFlg, dest('./src/wp/')));
});
task('duplicate', parallel('duplicate:sub1', 'duplicate:sub2'));

// EJS用タスク
task('ejs', () => {
  return (
    src(Cfg.ejs.src, { since: lastRun('ejs') })
      .pipe(gulpPlumber(gulpPlumberOptions))
      .pipe(
        gulpEslint({
          useEslintrc: false,
          overrideConfig: {
            root: true,
            env: {
              es6: true,
            },
            parserOptions: {
              ecmaVersion: 2020,
            },
            extends: ['eslint:recommended', 'plugin:lodash-template/base'],
            overrides: [
              {
                files: ['*.ejs'],
                processor: 'lodash-template/html',
                parserOptions: {
                  templateSettings: {
                    evaluate: '(?:(?:<%_)|(?:<%(?!%)))([\\s\\S]*?)[_\\-]?%>',
                    interpolate: '<%-([\\s\\S]*?)[_\\-]?%>',
                    escape: '<%=([\\s\\S]*?)[_\\-]?%>',
                  },
                },
              },
            ],
            settings: {
              'lodash-template/globals': ['include'],
            },
            rules: {
              'no-undef': 0,
            },
          },
        }),
      )
      .pipe(gulpEslint.format())
      .pipe(
        gulpProgeny({
          extension: 'ejs',
          regexp: /^\s*<%\-\s*include\s*\(['"]([^'"]+)['"]/,
        }),
      )
      .pipe(
        through.obj((chunk, enc, callback) => {
          if (path.basename(chunk.path).startsWith('_')) {
            // console.log(chunk.path, '[SKIP]');
            chunk = null;
          } else {
            // console.log(chunk.path);
          }
          callback(null, chunk);
        }),
      )
      .pipe(gulpEjs({}, { async: false }))
      .pipe(gulpRename({ extname: Cfg.ejs.suffix }))
      .pipe(gulpIf(Cfg.ejs.minFlg, gulpHtmlmin({ collapseWhitespace: true })))
      // ベースネームの最後に.phpがある場合は拡張子を変更
      .pipe(
        gulpRename((path) => {
          const basename = path.basename.match(/^(.+)(\.php)$/);
          if (basename !== null) {
            [, path.basename, path.extname] = basename;
          }
        }),
      )
      .pipe(dest(Cfg.ejs.dest))
      .pipe(browserSync.reload({ stream: true }))
  );
});

// SCSS用タスク
task('sass', () => {
  return (
    src(Cfg.scss.src, { sourcemaps: Cfg.scss.mapFlg })
      .pipe(gulpPlumber(gulpPlumberOptions))
      // リント
      .pipe(
        gulpPostcss([stylelint(), postcssReporter({ clearReportedMessages: true })], {
          syntax: postcssScss,
        }),
      )
      // sassGlobで"object"をディレクトリごとscss内でimport出来るように設定
      .pipe(gulpSassGlob())
      // sassコンパイル
      // オプションで吐き出す形式を設定
      .pipe(
        gulpSass.sync({ outputStyle: Cfg.scss.outputStyle }).on(
          'error',
          gulpSass.logError,
        ),
      )
      .pipe(
        gulpPostcss([
          postcssAspectRatioPolyfill(),
          postcssCssVariables(),
          // prefixを自動付与
          autoprefixer(Cfg.scss.autoprefixer),
          // プロパティの並び順変更
          stylelint({
            config: {
              extends: 'stylelint-config-recess-order',
              quiet: true,
              defaultSeverity: 'warning',
            },
            fix: true,
          }),
          Cfg.scss.minFlg && postcssCsso({ restructure: false }),
          postcssReporter({ clearReportedMessages: true }),
        ]),
      )
      .pipe(
        gulpIf(
          Cfg.scss.minFlg,
          // 圧縮後のファイルに.minのサフィックス付与
          gulpRename({
            suffix: '.min',
          }),
        ),
      )
      .pipe(
        dest(Cfg.scss.dest, {
          sourcemaps: Cfg.scss.mapFlg ? Cfg.scss.sourceMaps : false,
        }),
      )
      .pipe(browserSync.reload({ stream: true }))
      .pipe(gulpIf(Cfg.scss.wpFlg, dest('./src/wp/css/')))
  );
});

// JavaScript用タスク
task('js', () => {
  return src(Cfg.js.entry, { sourcemaps: Cfg.js.mapFlg })
    .pipe(gulpPlumber(gulpPlumberOptions))
    .pipe(
      gulpRollupEach(
        {
          plugins: [
            replace({
              preventAssignment: false,
              'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            }),
            eslint(),
            nodeResolve(),
            commonjs(),
            babel({
              babelHelpers: 'runtime',
              exclude: /node_modules\/(?!(dom7|swiper|vue-runtime-helpers)\/).*/,
              skipPreflightCheck: true,
            }),
            Cfg.js.minFlg &&
              terser({
                output: {
                  comments: /^\**!|@preserve|@license|@cc_on/,
                },
              }),
          ],
        },
        {
          format: 'iife',
        },
        rollup,
      ),
    )
    .pipe(
      gulpIf(
        Cfg.js.minFlg,
        gulpRename({
          suffix: '.min',
        }),
      ),
    )
    .pipe(
      dest(Cfg.js.dest, {
        sourcemaps: Cfg.js.mapFlg ? Cfg.js.sourceMaps : false,
      }),
    )
    .pipe(browserSync.reload({ stream: true }))
    .pipe(gulpIf(Cfg.js.wpFlg, dest('./src/wp/js/')));
});

// images用タスク
task('image', () => {
  return src(Cfg.img.src, { since: lastRun('image') })
    .pipe(gulpPlumber(gulpPlumberOptions))
    .pipe(gulpChanged(Cfg.img.dest))
    .pipe(
      gulpImagemin([
        // gif圧縮
        gulpImagemin.gifsicle({
          optimizationLevel: 3,
        }),
        // jpg圧縮
        imageminJpegtran({
          progressive: true,
        }),
        // png圧縮
        gulpImagemin.optipng(),
        // svg圧縮
        gulpImagemin.svgo({
          plugins: [
            {
              removeViewBox: false,
            },
          ],
        }),
      ]),
    )
    .pipe(dest(Cfg.img.dest))
    .pipe(browserSync.reload({ stream: true }))
    .pipe(gulpIf(Cfg.img.wpFlg, dest('./src/wp/img/')));
});

// Sass自動修正
task('format:sass', (callback) => {
  spawn('npm', ['run', 'format:css'], { stdio: 'inherit' }).on('close', () => {
    callback();
  });
});

// JavaScript自動修正
task('format:js', (callback) => {
  spawn('npm', ['run', 'format:js'], { stdio: 'inherit' }).on('close', () => {
    callback();
  });
});

task('watch', () => {
  // 開発サーバー立ち上げ
  browserSync.init({
    server: {
      baseDir: Cfg.server.root,
    },
  });
  watch(Cfg.duplicate.src, parallel('duplicate'));
  watch(Cfg.ejs.src, parallel('ejs'));
  watch(Cfg.scss.src, parallel('sass'));
  watch(Cfg.img.src, parallel('image'));
  watch(Cfg.js.src, parallel('js'));
});

task('build', parallel('duplicate', 'ejs', 'sass', 'js', 'image'));
task('dev', series('build', 'watch'));
task('default', parallel('dev'));
