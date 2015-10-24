//★使用パッケージ

var gulp = require("gulp"); //gulp
var sass = require("gulp-sass"); //Sassのコンパイル
var autoprefixer = require("gulp-autoprefixer"); //CSSのベンダープレフィックス付与を自動化
var frontnote = require("gulp-frontnote"); //スタイルガイド作成 
var browser = require("browser-sync"); //LiveReload環境構築 ブラウザ更新
var plumber = require("gulp-plumber"); //エラー時にwatchを止めない
var notify  = require("gulp-notify");　//エラーメッセージを表示する
var sourcemaps = require("gulp-sourcemaps"); //sourcemap

//★追加予定
//gulp-imagemin … 画像圧縮
//gulp-sourcemaps … sourcemapを使えるようにする
//gulp-csscomb … CSSプロパティ並び順整理

//html作成にjadeを使う場合は不要かもしれません。
//gulp-ftp
//ftpでファイルをサーバにアップロードしてくれます。


//★タスク

//Sassのコンパイル 
gulp.task("sass", function() {
    gulp.src("stylesheets/**/*scss")
        //.pipe(sass())
     .pipe(plumber({
        errorHandler: notify.onError('Error: <%= error.message %>')  // デスクトップに通知を出すよ    
    }))
        .pipe(gulp.dest("./css"));
});

//CSSのベンダープレフィックス付与を自動化
gulp.task("sass", function() {
    gulp.src("sass/**/*scss")
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest("./css"));
});

//スタイルガイド作成 
gulp.task("sass", function() {
    gulp.src("sass/**/*scss")
        .pipe(frontnote({
            css: '../css/style.css'
        }))
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest("./css"));
});

//ファイル監視
gulp.task("default", function() {
    gulp.watch(["js/**/*.js","!js/min/**/*.js"],["js"]);
    gulp.watch("sass/**/*.scss",["sass"]);
});

//LiveReload環境構築 ブラウザ更新
gulp.task("server", function() {
    browser({
        server: {
            baseDir: "./"
        }
    });
});
gulp.task("js", function() {
    gulp.src(["js/**/*.js","!js/min/**/*.js"])
        .pipe(uglify())
        .pipe(gulp.dest("./js/min"))
        .pipe(browser.reload({stream:true}))
});
 
gulp.task("sass", function() {
    gulp.src("sass/**/*scss")
        .pipe(frontnote())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest("./css"))
        .pipe(browser.reload({stream:true}))
});
 
gulp.task("default",['server'], function() {
    gulp.watch(["js/**/*.js","!js/min/**/*.js"],["js"]);
    gulp.watch("sass/**/*.scss",["sass"]);
});

//エラー時にwatchを止めない
gulp.task("js", function() {
    gulp.src(["js/**/*.js","!js/min/**/*.js"])
        .pipe(plumber())
        .pipe(frontnote({
            css: '../css/style.css'
          }))
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest("./css"))
        .pipe(browser.reload({stream:true}));
});
 

//CSSのベンダープレフィックス付与
gulp.task("sass", function() {
    gulp.src("sass/**/*scss")
        .pipe(plumber())
        .pipe(frontnote())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest("./css"))
        .pipe(browser.reload({stream:true}))
});


//sourcemap
gulp.task("sass", function() {
   gulp.src("sass/**/*scss")
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write("./maps")) // マップファイルを出力するパスを指定します
    .pipe(gulp.dest("./css"));
});