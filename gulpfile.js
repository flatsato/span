var $, gulp, pngquant;
gulp = require('gulp');
pngquant = require('imagemin-pngquant');
$ = require('gulp-load-plugins')();

//    gulp-webserver【1】LiveReload環境構築
//    gulp-file-include【2】HTMLファイルをインクルード
//    gulp-autoprefixer【3】Sass、autoprefixer追加
//    gulp-cssmin【4】CSS圧縮
//    gulp-uglify【5】JavaScript圧縮
//    gulp-imagemin【6】img圧縮
//    gulp-sourcemaps 【8】sourcemap作成

//    gulp-sass【last】Sassコンパイル
//    gulp-notify エラーが出たときに通知を出す
//    gulp-load-plugins パッケージを読み込み
//    gulp-plumber エラーが出たときにgulpを終了させない

//追加予定

//    gulp-prettify HTML整形


//gulp-webserver【1】LiveReload環境構築
gulp.task('webserver', function () {
  return gulp.src('./dist/').pipe($.webserver({
    host: '0.0.0.0',
    livereload: true,
    open: 'http://localhost:8000/'
  }));
});

//gulp-file-include【2】HTMLファイルをインクルード
gulp.task('html', function () {
  return gulp.src(['./src/template/**/*.html', '!./src/template/_**/*.html']).pipe($.plumber({
    errorHandler: $.notify.onError('<%= error.message %>')
  })).pipe($.fileInclude({
    prefix: '@@',
    basepath: './src/template/_include/'
  })).pipe(gulp.dest('./dist/'));
});

//gulp-autoprefixer【3】Sass、autoprefixer追加
var autoprefixer = require("gulp-autoprefixer");
gulp.task("auto", function () {
  gulp.src("./src/scss/**/*scss")
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'ie 10', 'android 4.0']
    }))
    .pipe(gulp.dest("./dist/css"));
});

//gulp-cssmin【4】css圧縮
var gulp = require('gulp');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');

gulp.task('cssmin', function () {
  gulp.src('./dist/**/*.css')
    .pipe(cssmin())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist'));
});

//【5】JavaScript圧縮
var uglify = require("gulp-uglify");

gulp.task("js", function () {
  gulp.src(["./src/js/**/*.js", "!./src/js/vendor/*.js"])
    .pipe(uglify())
    .pipe(gulp.dest("./dist/js"));
  gulp.src(["./src/js/vendor/*.js"])
    .pipe(uglify({
      preserveComments: 'license'
    }))
    .pipe(gulp.dest("./dist/js/vendor"));
});

//【6】 画像容量圧縮
gulp.task('image', function () {
  return gulp.src('./src/img/**/*').pipe($.imagemin({
    progressive: true,
    interlaced: true,
    use: [pngquant()]
  })).pipe(gulp.dest('./dist/img/'));
});

//【7】 HTML minify
var minifyHTML = require('gulp-minify-html');

gulp.task('minify-html', function() {
 return gulp.src('./src/template/*.html')
 .pipe(minifyHTML({ empty: true }))
 .pipe(gulp.dest('./dist/'));
});

//gulp-sourcemaps 【8】sourcemap作成
var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', function () {
  return gulp.src('./src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/css/'));
});


gulp.task('watch', function () {
  gulp.watch('./src/template/**/*.html', ['html']);
  gulp.watch('./src/template/**/*.html', ['minify-html']);
  gulp.watch('./src/img/**/*', ['image']);
  gulp.watch('./src/scss/**/*.scss', ['sass']);
  gulp.watch('./src/scss/**/*.scss', ['auto']);
  gulp.watch(["./src/js/**/*.js", "!./dist/js/**/*.js"], ["js"]);
});

gulp.task('default', ['html', 'auto', 'image', 'webserver', 'js', 'watch']);