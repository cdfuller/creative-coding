var gulp = require('gulp');
var connect = require('gulp-connect');

var paths = {
  scripts: {
    src: 'src/**/*.js',
    dest: 'build/',
  },
  html: {
    src: 'src/**/*.html',
    dest: 'build/',
  }
}

gulp.task('html', function() {
  return gulp.src(paths.html.src)
  .pipe(gulp.dest(paths.html.dest))
  .pipe(connect.reload());
})

gulp.task('js', function() {
  return gulp.src(paths.scripts.src)
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(connect.reload());
})

gulp.task('connect', function() {
  connect.server({
    livereload: true,
    root: 'build/',
  })
})

gulp.task('watch', function() {
  gulp.watch(paths.scripts.src, ['js']);
  gulp.watch(paths.html.src, ['html']);
})

gulp.task('default', ['html', 'js', 'connect', 'watch']);
0