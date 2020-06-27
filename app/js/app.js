function test(...a) {
  let footer = document.querySelector('.footer');
  a.forEach(el => {
    footer.textContent += el;
  });
}
svg4everybody({
  validate: function (src, svg, use) {
    return true;
  }
});

document.addEventListener('DOMContentLoaded', () => {
//features slider
  featuresInitSlider();
  window.addEventListener('resize', function(event){
    featuresInitSlider();
  });
  
  function featuresInitSlider (){
    if(document.body.clientWidth < 768){
      var swiperFeatures = new Swiper('.features__swiper-container', {
        spaceBetween: 0,
        slidesPerGroup: 1,
        slidesPerView: 1,
        pagination: {
          el: '.features__swiper-pagination',
          clickable: true,
        },
      });
    }
    if(document.body.clientWidth > 768 ){     
      document.querySelector('.features__swiper-container').classList.remove('.features__swiper-container');
      let featuresWrp = document.querySelectorAll('.features__wrp');
      featuresWrp.forEach(function(item){
        item.classList.remove('swiper-slide');
      })
    }
  }
  //features slider
  var swiperCertificate = new Swiper('.certificate__swiper-container', {
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1,
      },
      540: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
      960: {
        slidesPerView: 4,
      }
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.certificate__swiper-pagination',
    },
  });
});

