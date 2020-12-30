// jshint ignore: start

// задаем пути и переменные

const distFolder = require('path').basename(__dirname),
       srcFolder = '#src',
       fs = require('fs');

const path = {
  build: {
    html:  `${distFolder}/`,
    css:   `${distFolder}/css/`,
    js:    `${distFolder}/js/`,
    img:   `${distFolder}/img/`,
    fonts: `${distFolder}/fonts/`,
  },
  src: {
    html: [`${srcFolder}/*.html`, `!${srcFolder}/_*.html`],
    css:   `${srcFolder}/scss/style.scss`,
    js:    `${srcFolder}/js/main.js`,
    img:   `${srcFolder}/img/**/*.{jpg,png,svg,gif,ico,webp}`,
    fonts: `${srcFolder}/fonts/*.ttf`,
  },
  watch: {
    html:  `${srcFolder}/**/*.html`,
    css:   `${srcFolder}/scss/**/*.scss`,
    js:    `${srcFolder}/js/**/*.js`,
    img:   `${srcFolder}/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp}`,
  },
  clean: `./${distFolder}/`
}

// Определяем константы Gulp
const {src, dest} = require('gulp'),
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
             webp = require('gulp-webp'),
         webphtml = require('gulp-webp-html'),
          webpcss = require('gulp-webp-css'),
        svgSprite = require('gulp-svg-sprite'),
         ttf2woff = require('gulp-ttf2woff'),
        ttf2woff2 = require('gulp-ttf2woff2'),
           fonter = require('gulp-fonter');

	// Подключаем Browsersync
function browsersync() {
	browserSync.init({ 
    server: { baseDir: `./${distFolder}/` }, 
    port: 8000,
    // browser: 'opera',
    reloadDelay: 1000,
		notify: false
	})
}
  // Подключаем html файлы
function html() {
  return src(path.src.html)
    .pipe(fileInclude())
    .pipe(webphtml())
    .pipe(dest(path.build.html))
    .pipe(browserSync.stream())
}
  // Подключаем стили
function styles() {
  return src(path.src.css)
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
    })
  )
  .pipe(webpcss())
  .pipe(dest(path.build.css))
  .pipe(cleanCss())
  .pipe(rename({
    extname: '.min.css'
    })
  )
  .pipe(dest(path.build.css))
  .pipe(browserSync.stream())
}

  // Подключаем js файлы
function scripts() {
  return src(path.src.js)
  .pipe(fileInclude({
    prefix: '//@',
    basepath: '@file'
    })
  )
  .pipe(dest(path.build.js))
  .pipe(uglify())
  .pipe(rename({
    extname: '.min.js'
    })
  )
  .pipe(dest(path.build.js))
  .pipe(browserSync.stream())
}

  // Подключаем изображения
function images() {
  return src(path.src.img)
  .pipe(webp({
      quality: 70
    })
  )
  .pipe(dest(path.build.img))
  .pipe(src(path.src.img))
  .pipe(imagemin({
    progressive: true,
    svgoPlugins: [{ removeViewBox: false }],
    interlaced: true,
    optimizationLevel: 3 // уровень сжатия 0 до 7 
    })
  )
  .pipe(dest(path.build.img))
  .pipe(browserSync.stream())
}

// функция обработчик шрифтов
function fonts(){
  src(path.src.fonts)
  .pipe(ttf2woff())
  .pipe(dest(path.build.fonts));
  return src(path.src.fonts)
  .pipe(ttf2woff2())
  .pipe(dest(path.build.fonts));
}

// конверитуер otf в ttf (по необходимости) - gulp otf2ttf 
gulp.task('otf2ttf', function(){
  return gulp.src([`${srcFolder}/fonts/*.otf`])
    .pipe(fonter({
        formats: ['ttf']
    }))
    .pipe(dest(`${srcFolder}/fonts/`));
})

//  svg иконки (по необходимости) - gulp svgSprite
gulp.task('svgSprite', function() {
  return gulp.src([`${srcFolder}/iconsprite/*.svg`])
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: '../icons/icons.svg',  // имя файла 
          example: true
        }
      },
    }
    ))
    .pipe(dest(path.build.img))
})

// подключаем шрифты к файлу стилей
function fontsStyle() {
  let fileContent = fs.readFileSync(`${srcFolder}/scss/fonts.scss`);
  if (fileContent == '') {
   fs.writeFile(`${srcFolder}/scss/fonts.scss`, '', cb);
   return fs.readdir(path.build.fonts, function (err, items) {
     if (items) {
        let c_fontname;
        for (let i = 0; i < items.length; i++) {
          let fontname = items[i].split('.');
          fontname = fontname[0];
          if (c_fontname != fontname) {
            fs.appendFile(`${srcFolder}/scss/fonts.scss`, '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
          }
          c_fontname = fontname;
         }
      }
    })
  }
}
  function cb() { }

//  функция call back
function cb(){

}


  // Подключаем слежку за файлами
function watchFiles() {
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.css], styles);
  gulp.watch([path.watch.js], scripts);
  gulp.watch([path.watch.img], images);
}

  // удаляем дистрибутив
function clean() {
  return del(path.clean);
}

  
  // Создаём новый таск "build"
const build = gulp.series(clean, gulp.parallel(scripts, styles, html, images, fonts), fontsStyle)

	// Мониторим файлы
const watch = gulp.parallel(build, watchFiles, browsersync);

  // Экспорт функции в таск
exports.fontsStyle = fontsStyle;
exports.fonts      = fonts;
exports.images     = images;
exports.scripts    = scripts;
exports.styles     = styles;
exports.html       = html;
exports.build      = build;
exports.watch      = watch;
exports.default    = watch;
