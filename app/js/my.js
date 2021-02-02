// BURGER=========================================================/
const menuBurger = document.querySelector('.icon-menu'),
  menuBody = document.querySelector('.menu__body'),
  pageBody = document.querySelector('body');

menuBurger.addEventListener('click', (e) => {
  menuBurger.classList.toggle('active');
  menuBody.classList.toggle('active');
  pageBody.classList.toggle('lock');
});

// TABS ==========================================================/
const productTabs = document.querySelectorAll('.info-product__item'),
  productBlocks = document.querySelectorAll('.info-product__block');

function ClickTab(tabs, blocks) {
  tabs.forEach((tab, i) => {
    tab.addEventListener("click", (e) => {
      e.preventDefault();

      if (!tab.classList.contains('active')) {
        tabs.forEach((tab, i) => {
          tab.classList.remove('active');
          blocks[i].classList.remove('active');
        });

        tab.classList.add('active');
        blocks[i].classList.add('active');
      }
    });
  });
}
ClickTab(productTabs, productBlocks);
document.querySelector('.info-product__item').click();


// IBG ===========================================================/
function ibg() {
  const ibg = document.querySelectorAll(".ibg");
  for (let i = 0; i < ibg.length; i++) {
    if (ibg[i].querySelector('img')) {
      ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
    }
  }
}

ibg();


// QUANTiTY  =====================================================/
const quantityButtons = document.querySelectorAll('.quantity__button');
if (quantityButtons.length > 0) {
  quantityButtons.forEach(quantityButton => {
    quantityButton.addEventListener('click', (e) => {
      let value = parseInt(quantityButton.closest('.quantity').querySelector('input').value);
      if (quantityButton.classList.contains('quantity__button--plus')) {
        value++;
      } else {
        value--;
        if (value < 1) {
          value = 1;
        }
      }
      quantityButton.closest('.quantity').querySelector('input').value = value;
    });
  });
}

// SWIPER ==========================================================/
if (document.querySelector('.main-slider__body')) {
  const mainSlider = new Swiper('.main-slider__body', {
    observer: true,
    observeParents: true,
    slidesPerView: 1,
    spaceBetween: 0,
    // autoHeight: true,
    speed: 800,
    // loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.main-slider__dotts',
      clickable: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        autoHeight: true,
      },
      480: {
        slidesPerView: 2,
      },
      600: {
        slidesPerView: 3,
      },
      768: {
        slidesPerView: 4,
      },
      992: {
        slidesPerView: 5,
      },
    }
  });
}
//add swiper slider images to dotts ================================/
const mainSliderImages = document.querySelectorAll('.main-slider__image'),
  mainSliderDotts = document.querySelectorAll('.main-slider__dotts .swiper-pagination-bullet');

mainSliderImages.forEach((element, i) => {
  const mainSliderImage = element.querySelector('img').getAttribute('src');
  mainSliderDotts[i].style.backgroundImage = `url('${mainSliderImage}')`;
});

// NOUISLIDER ======================================================/
const priceSlider = document.querySelector('.price-filter__slider');

if (priceSlider) {
  noUiSlider.create(priceSlider, {
    start: [0, 99999],
    connect: true,
    tooltips: [wNumb({
      decimals: 0
    }), wNumb({
      decimals: 0
    })],
    range: {
      'min': [0],
      'max': [99999]
    }
  });
  // добавляем значения инпутов на ползунки
  const priceStart = document.getElementById('price-start'),
    priceEnd = document.getElementById('price-end');

  if (priceStart) {
    priceStart.addEventListener('change', function () {
      priceSlider.noUiSlider.set([this.value, null]);
    });
  }

  if (priceEnd) {
    priceEnd.addEventListener('change', function () {
      priceSlider.noUiSlider.set([null, this.value]);
    });
  }

  // добавляем значения ползунков в инпуты
  priceSlider.noUiSlider.on('update', function (values, handle) {

    let value = values[handle];

    if (handle) {
      priceEnd.value = Math.round(value);
    } else {
      priceStart.value = Math.round(value);
    }
  });
}

// show how much categories was selected =========================/
const activeCheckboxes = document.querySelectorAll('.checkbox__input'),
  searchTitle = document.querySelector('.search-page__title');

activeCheckboxes.forEach((element, i) => {
  element.addEventListener('click', (e) => {
    let selectedCategories = 0;
    activeCheckboxes.forEach((element, i) => {
      if (element.type == 'checkbox' && element.checked) {
        selectedCategories++;
      }
    });

    if (selectedCategories === 0) {
      searchTitle.textContent = 'Везде';
    } else if (selectedCategories === 1) {
      searchTitle.textContent = `Выбрано ${selectedCategories} категория`;
    } else if (selectedCategories > 1 && selectedCategories <= 4) {
      searchTitle.textContent = `Выбрано ${selectedCategories} категории`;
    } else if (selectedCategories >= 5) {
      searchTitle.textContent = `Выбрано ${selectedCategories} категорий`;
    }

  });
});

// IS-MOBILE =====================================================/
const isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  }
};
//isMobile.any()


// ТАЙМЕР ========================================================/
// задаем дату окончания
const deadline = '2021-05-20';
// функция расчета временных промежутков
function getTimeRemaining(endtime) {
  const t = Date.parse(endtime) - Date.parse(new Date()),
    days = Math.floor(t / (1000 * 60 * 60 * 24)),
    hours = Math.floor((t / (1000 * 60 * 60) % 24)),
    minutes = Math.floor((t / 1000 / 60) % 60),
    seconds = Math.floor((t / 1000) % 60);
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds,
  };
}
// добавляем ноль к однозначным числам
function getZero(num) {
  if (num >= 0 && num < 10) {
    return `0${num}`;
  } else {
    return num;
  }
}

// передаем значения на страницу
function setClock(selector, endtime) {
  const timer = document.querySelector(selector),
    days = timer.querySelector('#days'),
    hours = timer.querySelector('#hours'),
    minutes = timer.querySelector('#minutes'),
    seconds = timer.querySelector('#seconds'),
    timeInterval = setInterval(updateClock, 1000);

  // запуск функции вручную, что бы не ждать секунду и не было мигания
  updateClock();

  function updateClock() {
    const t = getTimeRemaining(endtime);
    days.innerHTML = getZero(t.days);
    hours.innerHTML = getZero(t.hours);
    minutes.innerHTML = getZero(t.minutes);
    seconds.innerHTML = getZero(t.seconds);

    if (t.total <= 0) {
      clearInterval(timeInterval);
    }
  }
}
setClock('.timer', deadline);

// МОДАЛЬНОЕ ОКНО ================================================/
const modal = document.querySelector('.modal'),
  modalTrigger = document.querySelectorAll('[data-modal]'),
  modalClose = document.querySelector('[data-close]');



// функция открытия модального окна
function openModal() {
  modal.classList.toggle('show');
  document.body.style.overflow = 'hidden';
  clearInterval(modalTimerId);
}

// открываем окно по нажатию на кнопку
modalTrigger.forEach(button => {
  button.addEventListener('click', openModal);
});

// функция закрытия модального окна
function closeModal() {
  modal.classList.toggle('show');
  document.body.style.overflow = '';
}
// закрываем по нажатию на крестик
modalClose.addEventListener('click', closeModal);

// закрываем по нажатию на подложку
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});
// закрываем по нажатию на escape
document.addEventListener('keydown', (e) => {
  if (e.code === "Escape" && modal.classList.contains('show')) {
    closeModal();
  }
});

// показываем модальное окно по таймеру
const modalTimerId = setTimeout(openModal, 3000);

// показываем модальное окно когда пользователь долистал до конца страницы
// pageYOffset - прокручанная часть
// clientHeight - видимая часть без прокрутки
// scrollHeight - высотка прокрутки всего сайта
function showModalByScroll() {
  if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
    openModal();
    // удаляем событие после однократного исполнения
    window.removeEventListener('scroll', showModalByScroll);
  }
}

window.addEventListener('scroll', showModalByScroll);

// АКТИВНЫЕ ЛИНКИ ПО УРОВНЮ СКРОЛА ===============================/
const sections = document.querySelectorAll('section[id]');


window.addEventListener('scroll', scrollActive);

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    const sectionId = current.getAttribute('id');

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelector(`.nav__menu a[href*=${sectionId}]`).classList.add('active');
    } else {
      document.querySelector(`.nav__menu a[href*=${sectionId}]`).classList.remove('active');
    }
  });
}

// ПЛАВНЫЙ СКРОЛ =================================================/
const body = document.body,
  scrollWrap = document.getElementsByClassName("smooth-scroll-wrapper")[0],
  height = scrollWrap.getBoundingClientRect().height - 1,
  speed = 0.04;

var offset = 0;

body.style.height = Math.floor(height) + "px";

function smoothScroll() {
  offset += (window.pageYOffset - offset) * speed;

  var scroll = "translateY(-" + offset + "px) translateZ(0)";
  scrollWrap.style.transform = scroll;

  callScroll = requestAnimationFrame(smoothScroll);
}

smoothScroll();

// FANCY BBURGER BUTTON =================================================/
const btn = document.querySelector(".fancy-burger");

btn.addEventListener("click", () => {
  btn.querySelectorAll("span").forEach((span) => span.classList.toggle("open"));
});