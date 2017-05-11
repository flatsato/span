var $, gulp, pngquant, bulkSass;
gulp = require('gulp');
pngquant = require('imagemin-pngquant');
$ = require('gulp-load-plugins')();
bulkSass = require('gulp-sass-bulk-import');

//    gulp-webserver【1】LiveReload環境構築
//    gulp-file-include【2】HTMLインクルード
//    gulp-htmlmin【2】HTML圧縮
//    gulp-sass【3】sass
//    gulp-autoprefixer【4】autoprefixer追加
//    gulp-cssmin【5】css圧縮
//    gulp-uglify【6】JavaScript圧縮
//    gulp-imagemin【7】img圧縮
//    gulp-sourcemaps 【9】sourcemap作成
//    gulp.spritesmith【10】sprite画像

//    gulp
//    gulp-sass Sassコンパイル
//    gulp-notify エラーを通知
//    gulp-load-plugins パッケージを読み込み
//    gulp-plumber エラーが出たときにgulpを終了させない
//    gulp-rename
//    imagemin-pngquant png圧縮
//    gulp-sass-bulk-import sass import 一括読み込み

//gulp-webserver【1】LiveReload環境構築
gulp.task('webserver', function () {
  return gulp.src('./dist/').pipe($.webserver({
    host: '0.0.0.0',
    livereload: true,
    open: 'http://localhost:8000/'
  }));
});

//gulp-file-include【2】HTMLインクルード、圧縮
var htmlmin = require('gulp-htmlmin');
gulp.task('html', function () {
  return gulp.src(['./src/template/**/*.html', '!./src/template/_**/*.html'])
  .pipe($.plumber({
    errorHandler: $.notify.onError('<%= error.message %>')
  }))
  .pipe($.fileInclude({
    prefix: '@@',
    basepath: './src/template/_include/'
  }))
  .pipe(gulp.dest('./src/_html-original/')) //HTML圧縮前ファイルを保存
  .pipe(htmlmin({                           //HTML圧縮
    collapseWhitespace: true
  }))
  .pipe(gulp.dest('./dist/'));
});

//gulp-autoprefixer【3】autoprefixer追加
//gulp-sourcemaps 【8】sourcemap作成
var autoprefixer = require("gulp-autoprefixer"),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps');
gulp.task("sass", function () {
  gulp.src("./src/css/**/*scss")
    .pipe(bulkSass())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'ie 9', 'android 4.0']
    }))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest("./dist/css"));
});

//gulp-cssmin【4】css圧縮
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
gulp.task('cssmin', function () {
  gulp.src('./dist/**/style.css')
    .pipe(cssmin())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist'));
});

//gulp-uglify【6】JavaScript圧縮
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

//gulp-imagemin【7】img圧縮
gulp.task('image', function () {
  return gulp.src('./src/img/**/*').pipe($.imagemin({
    progressive: true,
    interlaced: true,
    use: [pngquant()]
  })).pipe(gulp.dest('./dist/img/'));
});

//gulp.spritesmith【10】sprite画像
//http://blog.e-riverstyle.com/2014/02/gulpspritesmithcss-spritegulp.html
// Android 4.2〜対応とするため SPのspriteは無し
var spritesmith = require('gulp.spritesmith');
gulp.task('sprite', function () {
  var spriteData = gulp.src('./src/img/sprite/*.png') //スプライトにする画像達
    .pipe(spritesmith({
      imgName: 'sprite.png', //スプライトの画像
      cssName: '_sprite.scss', //生成されるscss
      imgPath: '../img/sprite.png', //生成されるscssに記載されるパス
      cssFormat: 'scss', //フォーマット
      cssVarMap: function (sprite) {
        sprite.name = 'sprite-' + sprite.name; //VarMap(生成されるScssにいろいろな変数の一覧を生成)
      }
    }));
  spriteData.img.pipe(gulp.dest('./dist/img/')); //imgNameで指定したスプライト画像の保存先
  spriteData.css.pipe(gulp.dest('./src/css/')); //cssNameで指定したcssの保存先
});

gulp.task('default', function () {
  gulp.run('sprite');
});

gulp.task('watch', function () {
  gulp.watch('./src/template/**/*.html', ['html']);
  gulp.watch('./src/img/**/*', ['image']);
  gulp.watch('./src/css/**/*.scss', ['sass']);
  gulp.watch(["./src/js/**/*.js", "!./dist/js/**/*.js"], ["js"]);
});

gulp.task('default', ['webserver', 'html', 'sass', 'cssmin', 'js', 'image', 'sprite', 'watch']);