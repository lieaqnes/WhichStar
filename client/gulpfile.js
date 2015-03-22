'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('clean', require('del').bind(null, ['.tmp', 'dist']));

gulp.task('styles', function() {
  return gulp.src('app/styles/*.sass')
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      outputStyle: 'nested', // libsass doesn't support expanded yet
      precision: 10,
      includePaths: ['.'],
      onError: console.error.bind(console, 'Sass error:')
    }))
    .pipe($.postcss([
      require('autoprefixer-core')({browsers: ['last 1 version']})
    ]))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/styles'))
    .pipe(reload({stream: true}));
});

gulp.task('html', ['styles'], function() {
  var assets = $.useref.assets({searchPath: ['.tmp', 'app']});

  return gulp.src('app/*.html')
    .pipe(assets)
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.csso()))
    .pipe(assets.restore())
    .pipe($.useref())
    //.pipe($.if('*.html', $.minifyHtml({conditionals: true, loose: true})))
    .pipe(gulp.dest('dist'));
});
gulp.task('js', function() {
  return gulp.src('**/*.js')
    .pipe($.uglify())
    .pipe(gulp.dest('dist/styles'));
});


gulp.task('jshint', function() {
  return gulp.src('app/scripts/**/*.js')
    .pipe(reload({stream: true, once: true}))
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});

gulp.task('serve', ['html'], function() {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['app', '.tmp'],
      routes: {
        '/bower_components': 'bower_components',
        '../.tmp/styles': 'styles'
      }
    }
  });
  // watch for changes
  gulp.watch([
    'app/*.html',
    'app/js/**/*.js',
    'app/img/**/*'
  ]).on('change', reload);

  gulp.watch('app/styles/**/*.scss', ['styles']);
});

gulp.task('build', ['html'], function() {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('serve:dist', function() {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['dist']
    }
  });

    // watch for changes
  gulp.watch([
    'app/*.html',
    'app/js/**/*.js',
    'app/img/**/*'
  ]).on('change', reload);

  gulp.watch('app/styles/**/*.scss', ['styles']);
});

gulp.task('default', ['clean'], function() {
  gulp.start('build');
});

