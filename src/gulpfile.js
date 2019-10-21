var gulp = require("gulp");
var concat = require("gulp-concat");
var pug = require("gulp-pug");
var sass = require("gulp-sass");
var prefixer = require("gulp-autoprefixer");
var uglify = require("gulp-uglify");

sass.compiler = require("node-sass");

gulp.task("pug", function() {
  return gulp
    .src("./views/index.pug")
    .pipe(pug())
    .pipe(gulp.dest("../dist"));
});

// Compile sass files
gulp.task("sass", function() {
  return (
    gulp
      .src("./styles/main.sass")
      .pipe(sass().on("error", sass.logError))
      .pipe(prefixer())
      .pipe(gulp.dest("../dist/css"))
  );
});

// Compress js files
gulp.task("js", function() {
  return gulp
    .src("./scripts/*.js")
    .pipe(concat("main.js"))
    .pipe(uglify())
    .pipe(gulp.dest("../dist/js"));
});

// Watch files
gulp.task("watch", function() {
  gulp.watch("./views/**/*.pug", gulp.parallel("pug"));
  gulp.watch("./styles/**/*.sass", gulp.parallel("sass"));
  gulp.watch("./scripts/**/*.js", gulp.parallel("js"));
});

gulp.task("default", gulp.series("pug", "sass", "js", "watch"));
