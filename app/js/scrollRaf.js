function scrollWithRaf() {
  // ищем все ссылки которые начинаются с #
  const links = document.querySelectorAll('[href^="#"]'),
    speed = 0.2;

  // перебираем все ссылки и вешаем обработчики событий
  links.forEach(link => {
    link.addEventListener('click', function (event) {
      event.preventDefault();

      let widthTop = document.documentElement.scrollTop,
        hash = this.hash,
        toBlock = document.querySelector(hash).getBoundingClientRect().top,
        start = null;

      requestAnimationFrame(step);

      // проверяем первый ли раз запускается анимация (условие выполнится 1 раз)
      function step(time) {
        if (start === null) {
          start = time;
        }

        let progress = time - start,
          // количество пикселей на которое необходимо пролистать в течении анимации
          r = (toBlock < 0 ? Math.max(widthTop - progress / speed, widthTop + toBlock) : Math.min(widthTop + progress / speed, widthTop + toBlock));

        document.documentElement.scrollTo(0, r);

        // остановка анимации (мы долистали до нужного эмелемента по пикселям)
        if (r != widthTop + toBlock) {
          requestAnimationFrame(step);
        } else {
          location.hash = hash;
        }
      }
    });
  });
}
scrollWithRaf();