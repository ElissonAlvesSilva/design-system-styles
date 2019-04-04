const gulp = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const tildeImporter = require('node-sass-tilde-importer');
const postcss = require('gulp-postcss');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const cleanCss = require('gulp-clean-css');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');

// Build dist/css/design-system-styles.css
gulp.task('build-css', () => {
  gulp.src(['./scss/design-system-styles.scss'])
    .pipe(sass({
      importer: tildeImporter
    }).on('error', sass.logError))
    .pipe(postcss([
      autoprefixer,
      precss(),
    ]))
    .pipe(gulp.dest('./dist/css'))
    .pipe(sourcemaps.init())
    .pipe(cleanCss())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css'));
});

// Copy && build from node_modules to dist
gulp.task('build-js', () => {
  gulp.src([
    './node_modules/jquery/dist/jquery.min.js',
    './node_modules/prismjs/prism.js',
    './node_modules/prismjs/plugins/unescaped-markup/prism-unescaped-markup.min.js',
    './node_modules/prismjs/plugins/normalize-whitespace/prism-normalize-whitespace.min.js',
    './node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
    './js/design-system.js',
  ])
  .pipe(concat('design-system.min.js'))
  .pipe(gulp.dest('dist/js'));
});

// Generate /dist
gulp.task('build', [
  'build-css',
  'build-js',
]);

gulp.task('default', [
  'build',
]);