var gulp = require("gulp");
var include = require('gulp-include');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var spritesmith = require('gulp.spritesmith');
var imagemin = require('gulp-imagemin');

gulp.task('include', function(){
  console.log('including pages...');
  gulp.src('src/index.html')
    .pipe(include({
      extensions: 'html',
      includePaths: __dirname + "/src"
    }))
      .on('error', console.log)
    .pipe(gulp.dest('dist/'))
});
gulp.task('js', function(){
  console.log('concatenating js files...');
  gulp.src('src/js/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('dist/'));
  console.log('moving libs...');
  gulp.src('src/lib/*')
    .pipe(gulp.dest('dist/lib/'));
});
gulp.task('sass', function(){
  console.log('concatenating css files...');
  gulp.src('src/css/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(concat('all.css'))
  .pipe(gulp.dest('dist/'));
});
gulp.task('sprite', function(){
  gulp.src('src/imgs/icons/*.png')
    .pipe(spritesmith({
      imgName: 'sprite.png',
      cssName: 'sprite.css'
    }))
    .pipe(gulp.dest('dist/'));
});
gulp.task('imagemin', function(){
  gulp.src('src/imgs/*.png')
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 5})
    ], {
      verbose: true
    }))
    .pipe(gulp.dest('dist/imgs/'));
});
gulp.task('mvimgs', function(){
  gulp.src('src/imgs/*.png')
    .pipe(gulp.dest('dist/imgs/'));
});

gulp.task('watch', function(){
  gulp.watch(['src/index.html', 'src/pages/*.html'], ['include']);
  gulp.watch('src/js/*.js', ['js']);
  gulp.watch('src/css/*.scss', ['sass']);
  gulp.watch('src/imgs/icons/*.png', ['sprite']);
  gulp.watch('src/imgs/*.png', ['mvimgs']);
});
gulp.task('build', ['include', 'js', 'sass', 'sprite', 'imagemin']);