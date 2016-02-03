var gulp = require("gulp");
var babel = require("gulp-babel");
var connect = require('gulp-connect');
var rimraf = require('gulp-rimraf');


gulp.task('connect', function() {
  connect.server({
   root: 'dist',
   livereload: true
 });
});

gulp.task('watch', function () {
  gulp.watch(['./src/*.js'], ['copyjs']);
  gulp.watch('./src/index.html',['copyhtml']);
});


gulp.task('copyhtml', function () {
  gulp.src('./src/index.html')
    .pipe(gulp.dest('./dist'))
    .pipe(connect.reload());
});

gulp.task("copyjs", function () {
  return gulp.src("src/**/*.js", {base : 'src/'})
      .pipe(babel({
        presets : ['es2015']
      }))
      .pipe(gulp.dest('dist'))
      .pipe(connect.reload());
});

gulp.task('clean', function() {
  return gulp.src('./dist', { read: false })
      .pipe(rimraf());
});

gulp.task('default', ['clean','copyhtml','copyjs','connect', 'watch']);
