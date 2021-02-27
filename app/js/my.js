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
const timer = (container, deadline) => {

  // Задаем дедлайн и получаем сколько времени осталось до конца
  const getTimerRemaining = (endTime) => {

    // разница между дедлайном и текущей датой
    const t = Date.parse(endTime) - Date.parse(new Date()),

      // считаем количество дней, часов, минут, секунд, которые непобходимо отобразить
      seconds = Math.floor((t / 1000) % 60),
      minutes = Math.floor((t / 1000 / 60) % 60),
      hours = Math.floor((t / (1000 * 60 * 60)) % 24),
      days = Math.floor((t / (1000 * 60 * 60 * 24)));

    // возвращаем обьект с полученными значениями
    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  };

  // вспомогательная функция которая добавляем 0 перед значением, если оно меньше 10
  const addZero = (num) => {
    if (num <= 9) {
      return '0' + num;
    } else {
      return num;
    }
  };

  // помещаем определенное значение в определенный элемент на странице
  const setClock = (selector, endTime) => {
    const timer = document.querySelector(selector),
      days = timer.querySelector('#days'),
      hours = timer.querySelector('#hours'),
      minutes = timer.querySelector('#minutes'),
      seconds = timer.querySelector('#seconds'),
      // запускаем посекундное обновление таймера
      timeInterval = setInterval(updateClock, 1000);

    //обновляем таймер, и скрываем данные из верстки при первом запуске
    updateClock();

    // функция для setInterval
    function updateClock() {

      // узнаем сколько времени осталось до конца (получаем обьект)
      const t = getTimerRemaining(endTime);

      // записываем значения из обьекта на страницу
      days.textContent = addZero(t.days);
      hours.textContent = addZero(t.hours);
      minutes.textContent = addZero(t.minutes);
      seconds.textContent = addZero(t.seconds);

      // останавливаем таймер если дедлайн прошел
      if (t.total <= 0) {
        days.textContent = '00';
        hours.textContent = '00';
        minutes.textContent = '00';
        seconds.textContent = '00';

        clearInterval(timeInterval);
      }
    }
  };
  // Вызываем setClock
  setClock(container, deadline);
};
// задаем дату окончания
const deadline = '2021-05-20';
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


// OPEN BY SCROLL =======================================================/
function openByScroll(selector) {
  window.addEventListener('scroll', () => {
    let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);

    if (!btnPressed && (window.pageYOffset + document.documentElement.clientHeight >= scrollHeight)) {
      document.querySelector(selector).click();
    }
  });
}

// CONTACT FORM =========================================================/
function contactForm() {
  const form = document.getElementById('form');

  form.addEventListener('submit', formSend);

  async function formSend(e) {
    e.preventDefault();

    let error = formValidate(form);

    let formData = new FormData(form);

    if (error === 0) {
      let response = await fetch('sendmail.php', {
        method: 'POST',
        body: formData
      });
      if (response.ok) {
        let result = await response.json();
        alert(result.message);
        form.reset();
      } else {
        alert('Что-то пошло не так');
      }
    } else {
      alert('Заполните обязательные поля');
    }
  }

  function formValidate(form) {
    let error = 0;

    let formReq = document.querySelectorAll('._req');
    for (let index = 0; index < formReq.length; index++) {
      const input = formReq[index];
      formRemoveError(input);

      if (input.classList.contains('_email')) {

        if (emailTest(input)) {

          formAddError(input);
          error++;
        }

      } else if (input.getAttribute('type') === 'checkbox' && input.checked === false) {
        formAddError(input);
        error++;
      } else {
        if (input.value === '') {
          formAddError(input);
          error++;
        }
      }
    }
    return error;
  }

  function formAddError(input) {
    input.parentElement.classList.add('_error');
    input.classList.add('_error');
  }

  function formRemoveError(input) {
    input.parentElement.classList.remove('_error');
    input.classList.remove('_error');
  }

  function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
  }

}
contactForm();


// CALC MARGIN =========================================================/
const margin = calcMargin();
document.body.style.marginRight = `${margin}px`;

function calcMargin() {
  let div = document.createElement('div');

  div.style.width = '50px';
  div.style.height = '50px';
  div.style.overflowY = 'scroll';
  div.style.visibility = 'hidden';

  document.body.appendChild(div);
  let scrollWidth = div.offsetWidth - div.clientWidth;
  div.remove();

  return scrollWidth;

}