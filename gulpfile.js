'use stricts';

const gulp = require('gulp');
const sass = require('gulp-sass');
const util = require('gulp-util');
const concat = require('gulp-concat');
/*
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var nodemon = require('gulp-nodemon');
var livereload = require('gulp-livereload');
*/

const env = process.env.ENV || 'development';

const path = {
  SRC_DIR: './src/',
  LIB_DIR: './lib/',
  CONFIG_DIR: './config/'
};

// Sass
gulp.task('sass', () => {
  gulp.src("./clientsrc/sass/**/*scss")
//    .pipe(plumber())
    .pipe(concat('style.scss'))
    .pipe(sass())
//    .pipe(autoprefixer())
    .pipe(gulp.dest("./public/css"))
});

// watch
gulp.task('watch', function() {
  gulp.watch([path.SRC_DIR + 'salesmap/js/*.js', path.SRC_DIR + 'salesmap/css/*.css'], ['salesmap']);
  gulp.watch([path.LIB_DIR + '*.js', path.LIB_DIR + '**/*.js'], ['salesmap', 'articlesCommon']);
});

// default
gulp.task('default', [
  'test'
]);
