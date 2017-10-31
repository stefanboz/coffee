var gulp = require('gulp');
var gulpBabel = require('gulp-babel');

gulp.task('es6', function() {
    gulp.src('js/*.js')
        .pipe(gulpBabel())
        .pipe(gulp.dest('jsoutput'));
});

gulp.task('watch', function() {
    gulp.watch('js/*.js', ['es6']);
});
