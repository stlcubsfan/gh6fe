const gulp = require('gulp');
const conf = require('../conf/gulp.conf');

gulp.task('images', images);

function images() {
  return gulp.src(conf.path.src('img/**'))
    .pipe(gulp.dest('dist/img'));
}
