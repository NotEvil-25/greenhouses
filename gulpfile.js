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
const rename = require("gulp-rename");
const browsersync = require('browser-sync').create();
const babel = require("gulp-babel");
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');

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

function js(){
  return src("app/js/app.js")
      .pipe(babel())
      .pipe(rename('script.js'))
      .pipe(dest("app/js/"))
}

function concatJs() {
  return src([
      'app/libs/svg4everybody/svg4everybody.min.js',
      'app/libs/object-fit/ofi.min.js',
      'app/libs/swiper/js/swiper.min.js',
      'app/js/script.js' // Всегда в конце
  ])
      .pipe(concat('script.js'))
      .pipe(uglify()) // Минимизировать весь js (на выбор)
      .pipe(dest('dist/js'))
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
  return del(['dist', 'app/js/script.js', 'app/css']);
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
  return src('app/img/blocks/**/**.{png,jpg,jpeg}')
      .pipe(cache(imagemin([
        imagemin.mozjpeg({quality: 75, progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
      ])))
      .pipe(dest('dist/img/blocks/'));
}

function favicon() {
  return src('app/img/favicon.ico')
      .pipe(dest('dist/img'));
}

function svg(){
  return src('app/img/blocks/**/*.svg')
      .pipe(cache(imagemin([
        imagemin.svgo({
          plugins: [
            {removeViewBox: true},
            {cleanupIDs: false}
          ]
        })
      ])))
      .pipe(dest('dist/img/blocks/'))
}

function fonts(){
  return src('app/fonts/**.{eot,woff,woff2}')
      .pipe(dest('dist/fonts/'));
}


function watchFiles(){
  gulp.watch('app/*.html', html);
  gulp.watch('app/scss/**/*.scss', css);
  gulp.watch('app/img/blocks/**/**.{png,jpg,jpeg,ico}', images);
  gulp.watch('app/img/svg/', spriteSvg);
  gulp.watch('app/js/app.js', series(js, concatJs));
}

const build = series(clean, parallel(html, css, series(js,concatJs), favicon, spriteSvg, images, svg, fonts));
const watchProject = series(build,parallel(watchFiles, browserSync));

exports.html = html;
exports.js = js;
exports.concatJs = concatJs;
exports.spriteSvg = spriteSvg;
exports.images = images;
exports.fonts = fonts;
exports.css = css;
exports.watchFiles = watchFiles;
exports.clean = clean;
exports.favicon = favicon;
exports.svg = svg;
exports.watchProject = watchProject;
exports.build = build;
exports.default = watchProject;