const { src, dest, parallel, series } = require('gulp');
const gulp = require('gulp');
const del = require('del');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const svgSprite = require('gulp-svg-sprite');
const svgmin = require('gulp-svgmin');
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const browsersync = require('browser-sync').create();

function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "dist"
    },
    port: 3000
  });
  done();
}

function html(){
  return src('app/**.html')
      .pipe(dest('dist/'))
      .pipe(browsersync.stream());
}

function css(){
  return src('app/scss/*.scss')
      .pipe(sass())
      .pipe(cleanCSS())
      .pipe(autoprefixer())
      .pipe(dest('app/css/'))
      .pipe(dest('dist/css'))
      .pipe(browsersync.stream());
}

function clean(){
  return del('dist');
}

function spriteSvg(){
  return src('app/img/svg/*.svg')
      .pipe(svgmin({
        js2svg: {
          pretty: true
        }
      }))
      .pipe(svgSprite({
        mode: {
          symbol: {
            sprite: "../sprite.svg"
          }
        }
      }))
      .pipe(dest('dist/img/'));
}

function images(){
  return src('app/img/**/*.{png,jpg,jpeg}')
      .pipe(cache(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.mozjpeg({quality: 75, progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
      ])))
      .pipe(dest('dist/img'));
}

function fonts(){
  return src('app/fonts/**.{eot,woff,woff2}')
      .pipe(dest('dist/fonts/'));
}


function watchFiles(){
  gulp.watch('app/*.html', html);
  gulp.watch('app/scss/**/*.scss', css);
  gulp.watch('app/img/**/*.{png,jpg,jpeg}', images);
  gulp.watch('app/img/svg/**.svg', spriteSvg);
}

const build = series(clean, parallel(html, css, spriteSvg, images, fonts));
const watchProject = parallel(build, watchFiles, browserSync);

exports.html = html;
exports.spriteSvg = spriteSvg;
exports.images = images;
exports.fonts = fonts;
exports.css = css;
exports.watchFiles = watchFiles;
exports.clean = clean;
exports.watchProject = watchProject;
exports.build = build;
exports.default = watchProject;