var gulp = require('gulp'),
  concat = require('gulp-concat'),
  del = require('del');

gulp.task('build', function () {
  gulp.src(['src/index.js', 'src/controllers/*.js', 'src/directives/*.js'])
    .pipe(concat('src/app.js'))
    .pipe(gulp.dest('.'))
})

// gulp.task('clean', function (cb) {
//   del(['dist'], cb);
// });
