// tabs ==========================================================/
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


// ibg ===========================================================/
function ibg() {
  const ibg = document.querySelectorAll(".ibg");
  for (let i = 0; i < ibg.length; i++) {
    if (ibg[i].querySelector('img')) {
      ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
    }
  }
}

ibg();


// quantity  =====================================================/
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

// isMobile ======================================================/
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