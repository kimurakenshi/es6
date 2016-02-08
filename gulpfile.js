var gulp = require("gulp");
var connect = require('gulp-connect');
var rimraf = require('gulp-rimraf');


gulp.task('connect',['clean'], function() {
  connect.server({
   root: 'dist',
   livereload: true
 });
});

gulp.task('watch',['clean'],function () {
  gulp.watch(['./src/*.js'], ['copyjs']);
  gulp.watch('./src/index.html',['copyhtml']);
});


gulp.task('copyhtml',['clean'], function () {
  gulp.src('./src/index.html')
    .pipe(gulp.dest('./dist'))
    .pipe(connect.reload());
});

gulp.task("copyjs",['clean'], function () {
  return gulp.src("src/**/*.js", {base : 'src/'})
      .pipe(gulp.dest('dist'))
      .pipe(connect.reload());
});

gulp.task('clean', function() {
  return gulp.src('./dist', { read: false })
      .pipe(rimraf());
});

gulp.task('default', ['clean','copyhtml','copyjs','connect', 'watch']);
