const path = require('path')
const gulp = require('gulp')
const less = require('gulp-less')
const autoprefixer = require('gulp-autoprefixer')
const cleanCSS = require('gulp-clean-css')
const rename = require('gulp-rename')
const pkg = require('../package.json')

gulp.task('css', () => {
  gulp.src(path.join(__dirname, '../src/styles/index.less'))
    .pipe(less())
    .pipe(autoprefixer({
      browsers: pkg.browserslist
    }))
    .pipe(cleanCSS())
    .pipe(rename('coview.css'))
    .pipe(gulp.dest(path.join(__dirname, '../lib/styles')));
})

gulp.task('fonts', () => {
  gulp.src(path.join(__dirname, '../src/styles/fonts/*.*'))
    .pipe(gulp.dest(path.join(__dirname, '../lib/styles/fonts')))
})

gulp.task('default', ['css', 'fonts'])
