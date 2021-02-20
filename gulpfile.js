// jshint ignore: start

// задаем пути и переменные
const distFolder = require('path').basename(__dirname),
  srcFolder = 'app',
  fileswatch = 'html,htm,txt,json,md,woff2';

const path = {
  build: {
    html: `${distFolder}/`,
    css: `${distFolder}/css/`,
    js: `${distFolder}/js/`,
    img: `${distFolder}/img/`,
    fonts: `${distFolder}/fonts/`,
  },
  src: {
    html: [`${srcFolder}/*.html`, `!${srcFolder}/_*.html`],
    css: `${srcFolder}/styles/{style.scss,*.css}`,
    js: `${srcFolder}/js/{app.js,libs.js}`,
    img: `${srcFolder}/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp}`,
    fonts: `${srcFolder}/fonts/*.ttf`,
  },
  watch: {
    html: `${srcFolder}/**/*.html`,
    css: `${srcFolder}/styles/**/*.scss`,
    js: `${srcFolder}/js/**/*.js`,
    img: `${srcFolder}/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp}`,
  },
  clean: `./${distFolder}/`
};

// Подключаем пакеты из модулей
const {
  src,
  dest
} = require('gulp'),
  gulp = require('gulp'),
  browserSync = require('browser-sync').create(),
  fileInclude = require('gulp-file-include'),
  del = require('del'),
  scss = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  groupMedia = require('gulp-group-css-media-queries'),
  cleanCss = require('gulp-clean-css'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify-es').default,
  imagemin = require('gulp-imagemin'),
  pngquant = require('imagemin-pngquant'),
  webp = require('gulp-webp'),
  webphtml = require('gulp-webp-html'),
  webpcss = require('gulp-webp-css'),
  ttf2woff = require('gulp-ttf2woff'),
  ttf2woff2 = require('gulp-ttf2woff2'),
  plumber = require('gulp-plumber'),
  notify = require("gulp-notify"),
  fs = require('fs');

// Подключаем Browsersync
const browsersync = () => {
  browserSync.init({
    server: {
      baseDir: `./${distFolder}/`
    },
    port: 3000,
    browser: 'firefox',
    reloadDelay: 1000,
    notify: false,
  });
};

// Подключаем html файлы
const html = () => {
  return src(path.src.html)
    .pipe(fileInclude())
    .pipe(webphtml())
    .pipe(dest(path.build.html))
    .pipe(browserSync.stream());
};

// Подключаем стили
const styles = () => {
  return src(path.src.css)
    .pipe(plumber({
      errorHandler: notify.onError((err) => {
        return {
          title: 'style',
          message: err.message
        };
      })
    }))
    .pipe(
      scss({
        outputStyle: 'expanded'
      })
    )
    .pipe(groupMedia())
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 5 versions'],
      grid: true,
      cascade: true
    }))
    .pipe(webpcss())
    .pipe(dest(path.build.css))
    .pipe(cleanCss())
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(dest(path.build.css))
    .pipe(browserSync.stream());
};

// Подключаем js файлы
const scripts = () => {
  return src(path.src.js)
    .pipe(fileInclude({
      prefix: '//@',
      basepath: '@file'
    }))
    .pipe(dest(path.build.js))
    .pipe(uglify())
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(dest(path.build.js))
    .pipe(browserSync.stream());
};

// Подключаем изображения
const images = () => {
  return src(path.src.img)
    .pipe(webp({
      quality: 70
    }))
    .pipe(dest(path.build.img))
    .pipe(src(path.src.img))
    .pipe(imagemin([
      imagemin.gifsicle({
        interlaced: true
      }),
      imagemin.mozjpeg({
        quality: 75,
        progressive: true
      }),
      pngquant({
        quality: [0.7, 0.9],
        speed: 1,
        floyd: 1
      }),
      imagemin.svgo({
        plugins: [{
          removeViewBox: false
        }]
      })
    ]))
    .pipe(dest(path.build.img))
    .pipe(browserSync.stream());
};

// функция обработчик шрифтов
const fonts = () => {
  src(path.src.fonts)
    .pipe(ttf2woff())
    .pipe(dest(path.build.fonts));
  return src(path.src.fonts)
    .pipe(ttf2woff2())
    .pipe(dest(path.build.fonts));
};

// call back функция для fontsStyle
const cb = () => {};

// подключаем шрифты к файлу стилей
const fontsStyle = () => {
  let fileContent = fs.readFileSync(`${srcFolder}/styles/fonts.scss`);
  if (fileContent == '') {
    fs.writeFile(`${srcFolder}/styles/fonts.scss`, '', cb);
    return fs.readdir(path.build.fonts, function (err, items) {
      if (items) {
        let c_fontname;
        for (let i = 0; i < items.length; i++) {
          let fontname = items[i].split('.');
          fontname = fontname[0];
          let font = fontname.split('-')[0];
          if (c_fontname != fontname) {
            fs.appendFile(`${srcFolder}/styles/fonts.scss`, `@include font("${font}", "${fontname}", "400", "normal");\r\n`, cb);
          }
          c_fontname = fontname;
        }
      }
    });
  }
};

// Подключаем слежку за файлами
const watchFiles = () => {
  gulp.watch([path.watch.html], {
    usePolling: true
  }, html);
  gulp.watch([path.watch.css], {
    usePolling: true
  }, styles);
  gulp.watch([path.watch.js], {
    usePolling: true
  }, scripts);
  gulp.watch([path.watch.img], {
    usePolling: true
  }, (images)).on('change', browserSync.reload);
  gulp.watch(`${distFolder}/**/*.{${fileswatch}}`, {
    usePolling: true
  }).on('change', browserSync.reload);
};

// удаляем дистрибутив
const clean = () => {
  return del(path.clean);
};

// Создаём таск "build"
const build = gulp.series(clean, gulp.parallel(scripts, styles, html, images, fonts), fontsStyle);

// Мониторим файлы
const watch = gulp.parallel(build, watchFiles, browsersync);

// Экспорт функций в таск
exports.fontsStyle = fontsStyle;
exports.fonts = fonts;
exports.images = images;
exports.scripts = scripts;
exports.styles = styles;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;