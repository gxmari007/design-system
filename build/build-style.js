'use strict';
const path = require('path');
const gulp = require('gulp');
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-cssmin');
const pkg = require('../package.json');

gulp.task('style', () => {
  return gulp.src(path.join(__dirname, '../src/style/*.less'))
    .pipe(less())
    .pipe(autoprefixer({ browsers: pkg.browserslist }))
    .pipe(cssmin())
    .pipe(gulp.dest('../lib'));
});

gulp.task('default', ['style']);
