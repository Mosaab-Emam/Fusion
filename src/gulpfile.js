var gulp = require("gulp");
var concat = require("gulp-concat");
var pug = require("gulp-pug");
var sass = require("gulp-sass");
var prefixer = require("gulp-autoprefixer");
var uglify = require("gulp-uglify");
var connect = require('gulp-connect');

sass.compiler = require("node-sass");

gulp.task("pug", function() {
  return gulp
    .src("./views/index.pug")
    .pipe(pug())
    .pipe(gulp.dest("../dist"))
    .pipe(connect.reload());
});

// Compile sass files
gulp.task("sass", function() {
  return (
    gulp
      .src("./styles/main.sass")
      .pipe(sass().on("error", sass.logError))
      .pipe(prefixer())
      .pipe(gulp.dest("../dist/css"))
      .pipe(connect.reload())
  );
});

// Compress js files
gulp.task("js", function() {
  return gulp
    .src("./scripts/*.js")
    .pipe(concat("main.js"))
    .pipe(uglify())
    .pipe(gulp.dest("../dist/js"))
    .pipe(connect.reload());
});

// Watch files
gulp.task("watch", function(cb) {
  gulp.watch("./views/**/*.pug", gulp.parallel("pug"));
  gulp.watch("./styles/**/*.sass", gulp.parallel("sass"));
  gulp.watch("./scripts/**/*.js", gulp.parallel("js"));
  cb();
});

gulp.task('connect', function(cb) {
  connect.server({
    root: '../dist',
    livereload: true
  });
  cb();
});

gulp.task("default", gulp.series("pug", "sass", "js", "connect", "watch"));
