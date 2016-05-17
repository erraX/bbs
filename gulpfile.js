var gulp = require('gulp'),
    babel = require('gulp-babel'),
    concat = require('gulp-concat'),
    minifycss = require('gulp-minify-css'),
    notify = require('gulp-notify'),
    sass = require('gulp-sass'),
    clean = require('gulp-clean'),
    cached = require('gulp-cached'),
    remember = require('gulp-remember'),
    stripDebug = require('gulp-strip-debug');

// Compile sass task
gulp.task('sass', function() {
    return gulp.src('public/src/css/**/*.scss')
              .pipe(sass({
                    includePaths: ['public/src/css']
              }).on('error', sass.logError))
              .pipe(minifycss())
              .pipe(gulp.dest('public/dist/css'));
});

gulp.task('clean', function () {
	return gulp.src('public/dist', {read: false})
		.pipe(clean());
});

gulp.task('strip', function () {
    return gulp.src('dist/**/*.js')
                .pipe(stripDebug())
                .pipe(gulp.dest('dist'));
});

// ES6 to ES5
gulp.task('babel', function() {
    return gulp.src('public/src/js/**/*.js')
                .pipe(cached())
                .pipe(babel({
                    'presets': ['es2015', 'stage-0'],
                    'plugins': ['transform-es2015-modules-amd']
                }))
                .pipe(remember())
                .pipe(gulp.dest('public/dist/js'));
});

// Watch task
gulp.task('watch', function() {
    // // Watch .scss files change
    gulp.watch('public/src/**/*.scss', ['sass']);

    // // Watch .js files change
    gulp.watch('public/src/**/*.js', ['babel']);
});

// Default task
gulp.task('default', function() {
    gulp.start('clean', 'sass', 'babel', 'watch');
});
