svg4everybody({
  validate: function (src, svg, use) {
    return true;
  }
});

objectFitImages();

if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;
    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}

function stepsList(target, targetClass, listItem, title, titleMod, listItemContent, listItemContentMod, btn, btnMod){
  let listItems = document.querySelectorAll(listItem),
      contents = document.querySelectorAll(listItemContent),
      buttons = document.querySelectorAll(btn),
      titles = document.querySelectorAll(title);

  if(target && target.classList.contains(targetClass)){
    contents.forEach(el =>{ el.classList.remove(listItemContentMod);});
    buttons.forEach(el =>{ el.classList.remove(btnMod);});
    titles.forEach(el =>{ el.classList.remove(titleMod);});

    for(let i = 0; i < listItems.length; i++){
      if(target === listItems[i]){
        titles[i].classList.add(titleMod);
        buttons[i].classList.add(btnMod);
        showEl(contents[i], listItemContentMod);
      }
    }
  }else{
    for(let i = 0; i < contents.length; i++){
      hideEl(contents[i], listItemContentMod);
      titles[i].classList.remove(titleMod);
      buttons[i].classList.remove(btnMod);
    }
  }
}

function video(){
  function findVideos() {
    let videos = document.querySelectorAll('.video');

    for (let i = 0; i < videos.length; i++) {
      setupVideo(videos[i]);
    }
  }

  function setupVideo(video) {
    let link = video.querySelector('.video__link');
    let media = video.querySelector('.video__media');
    let button = video.querySelector('.video__button');
    let id = parseMediaURL(media);

    video.addEventListener('click', () => {
      let iframe = createIframe(id);

      link.remove();
      button.remove();
      video.appendChild(iframe);
    });

    link.removeAttribute('href');
    video.classList.add('video--enabled');
  }

  function parseMediaURL(media) {
    let regexp = /https:\/\/i\.ytimg\.com\/vi\/([a-zA-Z0-9_-]+)\/sddefault\.jpg/i;
    let url = media.src;
    let match = url.match(regexp);

    return match[1];
  }

  function createIframe(id) {
    let iframe = document.createElement('iframe');

    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('allow', 'autoplay');
    iframe.setAttribute('src', generateURL(id));
    iframe.classList.add('video__media');

    return iframe;
  }

  function generateURL(id) {
    let query = '?rel=0&showinfo=0&autoplay=1';

    return 'https://www.youtube.com/embed/' + id + query;
  }

  findVideos();
}

//footer dropdwn
console.log('ok')

function hideEl(el, classMod){
  el.classList.remove(classMod);
}

function showEl(el, classMod){
  el.classList.add(classMod);
}

document.addEventListener('DOMContentLoaded', () => {
  let html = document.querySelector('html');

  html.addEventListener('click', e => {
    let target = e.target;
    stepsList(target, 'steps__list-item', '.steps__list-item', '.steps__list-item-content', 'steps__list-item-content--active', '.steps__text', 'steps__text--show', '.steps__btn-more', 'steps__btn-more--active');

  });

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

  //banner-mobile__slider
  var bannerMobile = new Swiper('.banner-mobile__slider', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 5000,
    },
    pagination: {
      el: '.banner-mobile__pagination',
      clickable: true,
    },
  });
  //production slider
  var production = new Swiper('.production__description', {
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        pagination: {
          el: '.production__photos',
          clickable: true,
          renderBullet: function (index, className) {
            let bullets = document.querySelectorAll('.production__photo');
            bullets.forEach(el=>{el.classList.add(className)});
            return bullets[index].outerHTML;
          }
        },
      },
      768: {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        pagination: {
          el: '.production__photos',
          clickable: true,
          renderBullet: function (index, className) {
            let bullets = document.querySelectorAll('.production__photo');
            bullets.forEach(el=>{el.classList.add(className)});
            return bullets[index].outerHTML;
          }
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      }
    }
  });
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

  video();
});

// process-swiper
// var swiperProcess =  new Swiper('.process__swiper-container', {
//   loop: true,
//   slidesPerView: 3,
// });
