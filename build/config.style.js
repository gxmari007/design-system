const path = require('path');
const gulp = require('gulp');
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-cssmin');
const browsers = require('../package.json').browserslist;

gulp.task('compile-less', () => {
  return gulp.src(path.join(__dirname, '../src/style/*.less'))
    .pipe(less({ javascriptEnabled: true }))
    .pipe(autoprefixer({ browsers }))
    .pipe(cssmin())
    .pipe(gulp.dest('../lib/theme-default'));
});

gulp.task('default', ['compile-less']);
