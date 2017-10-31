var gulp = require('gulp');
var gulpBabel = require('gulp-babel');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('es6', function() {
    gulp.src('js/*.js')
        .pipe(gulpBabel())
        .pipe(gulp.dest('jsoutput'));
});

gulp.task('styles', function() {
    gulp.src('css/*.css')
        .pipe(autoprefixer())
        .pipe(gulp.dest('cssoutput'));
});


gulp.task('watch', function() {
    gulp.watch('css/*.css', ['styles']);
    gulp.watch('js/*.js', ['es6']);
});
