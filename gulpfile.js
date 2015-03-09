'use strict';

var NODE_ENV = 'development',
  DEV_PORT = 8080,
  API_PORT = 8081,
  ASSET_URL = '/';

var gulp = require('gulp'),
  jade = require('gulp-jade'),
  less = require('gulp-less'),
  browserify = require('browserify'),
  vinyl = require('vinyl-source-stream'),
  gutil = require('gutil'),
  rename = require('gulp-rename'),
  modRewrite = require('connect-modrewrite'),
  connect = require('gulp-connect'),
  babelify = require('babelify'),
  spawn = require('child_process').spawn;

var apiService;

gulp.task('server', function () {
  if (apiService) {
    apiService.kill();
  }
  apiService = spawn('node', ['server/index.js'], {
    stdio: 'inherit',
    env: {
      NODE_ENV: NODE_ENV,
      API_PORT: API_PORT,
      PATH: process.env.PATH
    }
  }).on('error', function (err) {
    throw err;
  });
  apiService.on('close', function (code) {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...');
    }
  });
})

gulp.task('less', function () {
  return gulp.src('client/index.less')
    .pipe(less({
      compress: false,
      rootpath: ASSET_URL
    }))
    .pipe(rename('bundle.css'))
    .pipe(gulp.dest('build/assets'))
    .on('error', gutil.log);
});

gulp.task('jade', function () {
  return gulp.src('client/index.jade')
    .pipe(jade({
      locals: {
        assetURL: ASSET_URL
      }
    }))
    .pipe(gulp.dest('build'))
    .on('error', gutil.log);
});

gulp.task('browserify', function () {
  browserify()
    .transform(babelify)
    .require('./client/index.js', { entry: true })
    .bundle()
    .pipe(vinyl('client.js'))
    .pipe(gulp.dest('build/assets'))
    .on('error', gutil.log);
});

var defaultTasks = [
  'less',
  'jade',
  'browserify'];

gulp.task('build', defaultTasks);
gulp.task('default', ['build']);

gulp.task('connect', ['build', 'server'], function () {
  connect.server({
    root: 'build',
    port: 8080,
    livereload: true,
    middleware: function () {
      return [modRewrite([
        '^/api/(.*)$ http://localhost:' + API_PORT + '/$1 [P]'
      ])];
    }
  });
});
