// В свайпер передавать тот класс которому указываем __swiper (родитель слайдов)
let sliders = document.querySelectorAll('.__swiper');
if (sliders) {
  for (let index = 0; index < sliders.length; index++) {
    let slider = sliders[index];
    if (!slider.classList.contains('swiper-build')) {
      let sliderItems = slider.children;
      if (sliderItems) {
        for (let index = 0; index < sliderItems.length; index++) {
          let el = sliderItems[index];
          el.classList.add('swiper-slide');
        }
      }
      let sliderContent = slider.innerHTML;
      let sliderWrapper = document.createElement('div');
      sliderWrapper.classList.add('swiper-wrapper');
      sliderWrapper.innerHTML = sliderContent;
      slider.innerHTML = '';
      slider.appendChild(sliderWrapper);
      slider.classList.add('swiper-bild');
    }
    if (slider.classList.contains('__gallery')) {
      //slider.data('lightGallery').destroy(true);
    }
  }
  slidersBuildCallback();

}


function slidersBuildCallback() {}