var $, gulp, pngquant, bulkSass;
gulp = require('gulp');
pngquant = require('imagemin-pngquant');
$ = require('gulp-load-plugins')();
bulkSass = require('gulp-sass-bulk-import');


//gulp-webserver【1】LiveReload環境構築
gulp.task('webserver', function () {
  return gulp.src('./docs/').pipe($.webserver({
    host: '0.0.0.0',
    livereload: true,
    open: 'http://localhost:8000/'
  }));
});

//  gulp-file-include【2】HTMLインクルード
//  gulp-htmlmin【3】HTML圧縮
gulp.task('html', function () {
  return gulp.src(['./src/template/**/*.html', '!./src/template/_**/*.html'])
    .pipe($.plumber({
      errorHandler: $.notify.onError('<%= error.message %>')
    }))
    .pipe($.fileInclude({
      prefix: '@@',
      basepath: './src/template/_include/'
    }))
  .pipe(gulp.dest('./docs/'));
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
      browsers: ['last 2 versions', 'ie 9', 'android 4.4']
    }))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest("./docs/css"));
});

//gulp-cssmin【4】css圧縮
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
gulp.task('cssmin', function () {
  gulp.src('./docs/**/style.css')
    .pipe(cssmin())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('/docs/'));
});

//gulp-uglify【6】JavaScript圧縮
var uglify = require("gulp-uglify");
gulp.task("js", function () {
  gulp.src(["./src/js/**/*.js", "!./src/js/vendor/*.js"])
    .pipe(uglify())
    .pipe(gulp.dest("./docs/js"));
  gulp.src(["./src/js/vendor/*.js"])
    .pipe(uglify({
      preserveComments: 'license'
    }))
    .pipe(gulp.dest("./docs/js/vendor"));
});

//gulp-imagemin【7】img圧縮
gulp.task('image', function () {
  return gulp.src('./src/img/**/*').pipe($.imagemin({
    progressive: true,
    interlaced: true,
    use: [pngquant()]
  })).pipe(gulp.dest('./docs/img/'));
});

gulp.task('watch', function () {
  gulp.watch('./src/template/**/*.html', ['html']);
  gulp.watch('./src/img/**/*', ['image']);
  gulp.watch('./src/css/**/*.scss', ['sass']);
  gulp.watch(["./src/js/**/*.js", "!./docs/js/**/*.js"], ["js"]);
});

gulp.task('default', ['webserver', 'html', 'sass', 'cssmin', 'js', 'image', 'watch']);