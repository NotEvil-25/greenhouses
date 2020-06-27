"use strict";

function test() {
  var footer = document.querySelector('.footer');

  for (var _len = arguments.length, a = new Array(_len), _key = 0; _key < _len; _key++) {
    a[_key] = arguments[_key];
  }

  a.forEach(function (el) {
    footer.textContent += el;
  });
}

svg4everybody({
  validate: function validate(src, svg, use) {
    return true;
  }
});
document.addEventListener('DOMContentLoaded', function () {
  //features slider
  featuresInitSlider();
  window.addEventListener('resize', function (event) {
    featuresInitSlider();
  });

  function featuresInitSlider() {
    if (document.body.clientWidth < 768) {
      var swiperFeatures = new Swiper('.features__swiper-container', {
        spaceBetween: 0,
        slidesPerGroup: 1,
        slidesPerView: 1,
        pagination: {
          el: '.features__swiper-pagination',
          clickable: true
        }
      });
    }

    if (document.body.clientWidth > 768) {
      document.querySelector('.features__swiper-container').classList.remove('.features__swiper-container');
      var featuresWrp = document.querySelectorAll('.features__wrp');
      featuresWrp.forEach(function (item) {
        item.classList.remove('swiper-slide');
      });
    }
  } //features slider


  var swiperCertificate = new Swiper('.certificate__swiper-container', {
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1
      },
      540: {
        slidesPerView: 2
      },
      768: {
        slidesPerView: 3
      },
      960: {
        slidesPerView: 4
      }
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    pagination: {
      el: '.certificate__swiper-pagination'
    }
  });
});