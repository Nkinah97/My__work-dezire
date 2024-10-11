const { src, dest, watch, parallel, series } = require('gulp');
const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;
const del = require('del');
const cache = require('gulp-cache');

let autoprefixer, imagemin;

async function loadModules() {
  autoprefixer = (await import('gulp-autoprefixer')).default;
  imagemin = (await import('gulp-imagemin')).default;
}

function browsersync() {
  browserSync.init({
    server: {
      baseDir: './'
    },
    scrollProportionally: true,
    scrollRestoreTechnique: 'cookie',
  });
}

function cleanDist() {
  return del('dist');
}

async function images() {
  await loadModules();
  return src('images/**/*')
    .pipe(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.mozjpeg({ quality: 75, progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 }),
      imagemin.svgo({
        plugins: [
          { removeViewBox: true },
          { cleanupIDs: false }
        ]
      })
    ]))
    .pipe(dest('dist/images'));
}

async function scripts() {
  await loadModules();
  return src([
    'node_modules/jquery/dist/jquery.js',
    'node_modules/mixitup/dist/mixitup.js',
    'js/main.js', 
  ], { allowEmpty: true })
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('js'))
    .pipe(browserSync.stream());
}

async function styles() {
  await loadModules();
  return src('scss/style.scss')
    .pipe(scss({ outputStyle: 'compressed' }))
    .pipe(concat('style.min.css'))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 10 versions'],
      grid: true
    }))
    .pipe(dest('css'))
    .pipe(browserSync.stream());
}

function build() {
  return src([
    'css/style.min.css',
    'fonts/**/*',
    'js/main.min.js',
    '*.html'
  ], { base: '.' })
    .pipe(dest('dist'));
}

function watching() {
  watch(['scss/**/*.scss'], styles);
  watch(['js/**/*.js', '!js/main.min.js'], scripts);
  watch(['*.html']).on('change', browserSync.reload);
}

function clearCache(done) {
  return cache.clearAll(done);
}

exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.images = images;
exports.cleanDist = cleanDist;
exports.clearCache = clearCache;

exports.build = series(cleanDist, images, build);
exports.default = parallel(styles, scripts, browsersync, watching);
