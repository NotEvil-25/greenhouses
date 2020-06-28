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
  let featuresWrp = document.querySelectorAll('.features__wrp');
  let featuresContainerDel =  document.querySelector('.features__swiper-container--delete');

    if(document.body.clientWidth < 768){
      featuresContainerDel.classList.add('features__swiper-container');
      featuresWrp.forEach(function(item){
        item.classList.add('swiper-slide');
      })
      var swiperFeatures = new Swiper('.features__swiper-container', {
        spaceBetween: 0,
        slidesPerGroup: 1,
        slidesPerView: 1,
        clickable: false,
        breakpoints: {
          320: {
            clickable: true,
          },
          540: {
            clickable: false,
          },
        },
        pagination: {
          el: '.features__swiper-pagination',
          clickable: true,
        },
      });
    }
    else if(document.body.clientWidth > 768 ){ 
      featuresContainerDel.classList.remove('features__swiper-container');
      featuresWrp.forEach(function(item){
        item.classList.remove('swiper-slide');
      })
    }
  }

  //features slider
  var swiperCertificate = new Swiper('.certificate__swiper-container', {
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      540: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      960: {
        slidesPerView: 4,
        spaceBetween: 30,
      }
    },
    loop: true,
    navigation: {
      nextEl: '.certificate__swiper-button-next',
      prevEl: '.certificate__swiper-button-prev',
    },
    pagination: {
      el: '.certificate__swiper-pagination',
    },
  });
  // reviews slider
  var swiperReviews =  new Swiper('.reviews__swiper-container', {
    
    loop: true,
   
    effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      breakpoints:{
        320: {
          spaceBetween: 30,
          coverflowEffect: {
            rotate:0,
            stretch: 0,
            depth: 0,
            modifier: 0,
            slideShadows: false,
          },
        },
        540: {
          coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 200,
            modifier: 1,
            slideShadows: false,
          },
        }
      },
      navigation: {
        nextEl: '.reviews__swiper-button-next',
        prevEl: '.reviews__swiper-button-prev',
      },
      pagination: {
        el: '.reviews__swiper-pagination',
      },
  });
});

