var gulp = require('gulp'),
    babel = require('gulp-babel'),
    rename = require('gulp-rename'),
    plumber = require('gulp-plumber'),
    autoprefixer = require('gulp-autoprefixer'),
    livereload = require('gulp-livereload');
    concat = require('gulp-concat'),
    minifycss = require('gulp-minify-css'),
    notify = require('gulp-notify'),
    sass = require('gulp-ruby-sass'),
    cached = require('gulp-cached'),
    remember = require('gulp-remember'),
    stripDebug = require('gulp-strip-debug');

// Compile sass task
gulp.task('styles', function() {
  return sass('public/common/css/layout.scss', {style: 'expanded'})
    .pipe(autoprefixer('last 2 version'))
    .pipe(cached())
    // .pipe(concat('main.css'))
    // .pipe(minifycss())
    // .pipe(remember())
    .pipe(gulp.dest('dist/css'))
    // .pipe(livereload())
    .pipe(notify({message: 'merge css successfully!'}));
});

gulp.task('strip', function () {
    return gulp.src('dist/**/*.js')
        .pipe(stripDebug())
        .pipe(gulp.dest('dist'));
});

// ES6 to ES5
gulp.task('babel', function() {
  return gulp.src('public/src/js/**/*.js')
    // .pipe(plumber())
    .pipe(cached())
    .pipe(babel({
        'presets': ['es2015', 'stage-0'],
        'plugins': ['transform-es2015-modules-amd']
        // 'plugins': ['transform-es2015-modules-commonjs']
    }))
    .pipe(remember())
    .pipe(livereload())
    .pipe(gulp.dest('public/dist/js'));
});

// Watch task
gulp.task('watch', function() {
  // livereload
  livereload.listen();

  // Watch .scss files change
  gulp.watch('src/**/*.scss', ['styles']);

  // Watch .js files change
  gulp.watch('src/**/*.js', ['babel']);

  // Watch .tpl files change
  gulp.watch('src/**/*.tpl', ['tpl']);

});

// Default task
gulp.task('default', function() {
    gulp.start('watch');
});
