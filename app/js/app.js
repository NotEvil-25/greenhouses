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

function stepsList(target, targetClass, listItem, title, titleMod, listItemContent, listItemContentMod, btn, btnMod) {
  let listItems = document.querySelectorAll(listItem),
      contents = document.querySelectorAll(listItemContent),
      buttons = document.querySelectorAll(btn),
      titles = document.querySelectorAll(title);

  if (target && target.classList.contains(targetClass)) {
    contents.forEach(el => {
      el.classList.remove(listItemContentMod);
    });
    buttons.forEach(el => {
      el.classList.remove(btnMod);
    });
    titles.forEach(el => {
      el.classList.remove(titleMod);
    });

    for (let i = 0; i < listItems.length; i++) {
      if (target === listItems[i]) {
        titles[i].classList.add(titleMod);
        buttons[i].classList.add(btnMod);
        showEl(contents[i], listItemContentMod);
      }
    }
  } else {
    for (let i = 0; i < contents.length; i++) {
      hideEl(contents[i], listItemContentMod);
      titles[i].classList.remove(titleMod);
      buttons[i].classList.remove(btnMod);
    }
  }
}

function video() {
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

function hideEl(el, classMod) {
  el.classList.remove(classMod);
}

function showEl(el, classMod) {
  el.classList.add(classMod);
}

function feedbackList() {
  let btn = document.querySelector(".feedback__select-btn"),
      selectList = document.querySelector(".feedback__select"),
      selectItem = document.querySelectorAll(".feedback__select-item"),
      selectInput = document.getElementById("select-input");

  if (btn && selectList) {
    btn.addEventListener("click", () => {
      selectList.classList.toggle("feedback__select--open");
      btn.classList.toggle("feedback__select-btn--active");
    });
  }
  if (btn && selectList && selectItem) {
    selectList.addEventListener("click", (e) => {
      let target = e.target;
      if (target && target.classList.contains("feedback__select-item")) {
        btn.classList.remove("feedback__select-btn--active");
        selectList.classList.remove("feedback__select--open");
        for (let i = 0; i < selectItem.length; i++) {
          if (target === selectItem[i])
            selectInput.value = selectItem[i].textContent;
        }
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  let html = document.querySelector('html');

  html.addEventListener('click', e => {
    let target = e.target;
    stepsList(target, 'steps__list-item', '.steps__list-item', '.steps__list-item-content', 'steps__list-item-content--active', '.steps__text', 'steps__text--show', '.steps__btn-more', 'steps__btn-more--active');
    stepsList(target, 'questions__list-item', '.questions__list-item', '.questions__list-item-content', 'questions__list-item-content--active', '.questions__text', 'questions__text--show', '.questions__btn-more', 'questions__btn-more--active');
  });

  feedbackList();

  //features slider


  featuresInitSlider();
  window.addEventListener('resize', function () {
    featuresInitSlider();
  });

  function featuresInitSlider() {
    let featuresWrp = document.querySelectorAll('.features__wrp');
    let featuresContainerDel = document.querySelector('.features__swiper-container--delete');

    if (featuresWrp && featuresContainerDel) {
      if (document.body.clientWidth < 768) {
        featuresContainerDel.classList.add('features__swiper-container');
        featuresWrp.forEach(function (item) {
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
      else if (document.body.clientWidth > 768) {
        featuresContainerDel.classList.remove('`21``__swiper-container');
        featuresWrp.forEach(function (item) {
          item.classList.remove('swiper-slide');
        })
      }
    }
  }

  // let featuresSwiperContainer = document.querySelector('.features__swiper-container');
  // let swiperFeatures;
  //
  // function featuresSlider(){
  //   if(window.innerWidth < 768 && featuresSwiperContainer.dataset.mobile == 'false'){
  //     swiperFeatures = new Swiper('.features__swiper-container', {
  //       spaceBetween: 0,
  //       slidesPerGroup: 1,
  //       slidesPerView: 1,
  //       clickable: false,
  //       breakpoints: {
  //         320: {
  //           clickable: true,
  //         },
  //         540: {
  //           clickable: false,
  //         },
  //       },
  //       pagination: {
  //         el: '.features__swiper-pagination',
  //         clickable: true,
  //       },
  //     });
  //
  //     featuresSwiperContainer.dataset.mobile = 'true';
  //   }
  //
  //   if(window.innerWidth > 768){
  //     featuresSwiperContainer.dataset.mobile = 'false';
  //
  //     if(featuresSwiperContainer.classList.contains('swiper-container-initialized')){
  //       swiperFeatures.destroy();
  //       document.querySelector
  //     }
  //   }
  //
  // }
  //
  // featuresSlider();
  //
  // window.addEventListener('resize', function(){
  //   featuresSlider();
  // });

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
            bullets.forEach(el => {
              el.classList.add(className)
            });
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
            bullets.forEach(el => {
              el.classList.add(className)
            });
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
  //certificate slider
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
  var swiperReviews = new Swiper('.reviews__swiper-container', {

    loop: true,

    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    breakpoints: {
      320: {
        spaceBetween: 30,
        coverflowEffect: {
          rotate: 0,
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

  var processSlider = new Swiper('.process__content', {
    loop: true,
    pagination: {
      el: '.process__pagination'
    },
    navigation: {
      nextEl: '.process__swiper-button-next',
      prevEl: '.process__swiper-button-prev',
    },
    breakpoints: {
      1199: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      991: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      575: {
        slidesPerView: 2,
        spaceBetween: 30,
      }

    },

  });

  video();

  /// drop-down footer

  let buyerToggle = document.querySelector('.footer__nav-title--buyer');
  let productsToggle = document.querySelector('.footer__nav-title--products');
  let listBuyer = document.querySelector('.footer__nav-list--buyer');
  let listProducts = document.querySelector('.footer__nav-list--products');

  buyerToggle.addEventListener('click', showBuyer);
  productsToggle.addEventListener('click', showProducts);

  function showBuyer() {
    listBuyer.classList.toggle('footer__nav-list--active');
  }

  function showProducts() {
    listProducts.classList.toggle('footer__nav-list--active');
  }

// advantages swiper
  function advantagesInitSlider() {
    let advantagesWrp = document.querySelectorAll('.advantages__item');
    let advantagesContainerDel = document.querySelector('.advantages__swiper-container--delete');

    if (advantagesWrp && advantagesContainerDel) {
      if (document.body.clientWidth < 768) {
        advantagesContainerDel.classList.add('advantages__swiper-container');
        advantagesWrp.forEach(function (item) {
          item.classList.add('swiper-slide');
        })
        var swiperAdvantages = new Swiper('.advantages__swiper-container', {
          spaceBetween: 0,
          slidesPerGroup: 2,
          slidesPerView: 2,
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
            el: '.advantages__swiper-pagination',
            clickable: true,
          },
        });
      }
      else if (document.body.clientWidth > 768) {
        advantagesContainerDel.classList.remove('advantages__swiper-container');
        advantagesWrp.forEach(function (item) {
          item.classList.remove('swiper-slide');
        })
      }
    }
  }

  advantagesInitSlider();
  window.addEventListener('resize', function () {
    advantagesInitSlider();
  });


// tabs
  let tab = function () {
    let tabNav = document.querySelectorAll('.tabs__nav-item'),
        tabContent = document.querySelectorAll('.tab'),
        tabName;

    tabNav.forEach(item => {
      item.addEventListener('click', selectTabNav)
    });

    function selectTabNav() {
      tabNav.forEach(item => {
        item.classList.remove('tabs__nav-item--active');
      });
      this.classList.add('tabs__nav-item--active');
      tabName = this.getAttribute('data-tab-name');
      selectTabContent(tabName);
    }

    function selectTabContent(tabName) {
      tabContent.forEach(item => {
        item.classList.contains(tabName) ? item.classList.add('tab--active') : item.classList.remove('tab--active');
      })
    }

  };


  tab();
  buyerToggle.addEventListener('click', showBuyer);
  productsToggle.addEventListener('click', showProducts);

  function showBuyer() {
    listBuyer.classList.toggle('footer__nav-list--active');
  }

  function showProducts() {
    listProducts.classList.toggle('footer__nav-list--active');
  }

  function showText() {
    let btn = document.querySelector(".about-category__btn"),
        text = document.querySelector(".about-category__text");
    if (btn && text) {
      btn.addEventListener("click", () => {
        if (btn.textContent === "Показать все") btn.textContent = "Скрыть";
        else btn.textContent = "Показать все";
        text.classList.toggle("about-category__text--show");
      });
    }
  }

  showText();

  function sortSelect() {
    let placeholder = document.querySelector(".cards__filter-sort-placeholder"),
        selectList = document.querySelector(".cards__filter-sort-names"),
        selectItem = document.querySelectorAll(".cards__filter-sort-name");

    if (placeholder && selectList) {
      html.addEventListener("click", e => {
        if (e.target && e.target.classList.contains("cards__filter-sort-placeholder")) {
          selectList.classList.toggle("cards__filter-sort-names--show");
          placeholder.classList.toggle("cards__filter-sort-placeholder--active");
        }
        else if (!e.target.classList.contains("cards__filter-sort-name--current")) {
          selectList.classList.remove("cards__filter-sort-names--show");
          placeholder.classList.remove("cards__filter-sort-placeholder--active");
        }
      });
      window.addEventListener("scroll", () => {
        selectList.classList.remove("cards__filter-sort-names--show");
        placeholder.classList.remove("cards__filter-sort-placeholder--active");
      });
      selectList.addEventListener("click", e => {
        if (e.target && e.target.classList.contains("cards__filter-sort-name")) {
          if (!e.target.classList.contains("cards__filter-sort-name--current")) {
            selectItem.forEach(el => {
              el.classList.remove("cards__filter-sort-name--current")
            });
            e.target.classList.add("cards__filter-sort-name--current");
            placeholder.textContent = e.target.textContent;
            selectList.classList.remove("cards__filter-sort-names--show");
            placeholder.classList.remove("cards__filter-sort-placeholder--active");
          }
        }
      });
    }
  }

  sortSelect();

  //card slider

  let cardPhotos = new Swiper(".card__imgs-slider", {
    breakpoints: {
      768: {
        direction: 'vertical',
        spaceBetween: 10,
        slidesPerGroup: 1,
        slidesPerView: 4,
        freeMode: true,
        loopedSlides: 5,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        clickable: true,
      }
    }
  });
  let cardPhoto = new Swiper(".card__photo-slider", {
    spaceBetween: 10,
    loopedSlides: 5,
    loop: true,
    slidesPerView: 1,
    thumbs: {
      swiper: cardPhotos,
    },
    navigation: {
      nextEl: '.card__slider-btn--next',
      prevEl: '.card__slider-btn--prev',
    },
    pagination: {
      el: '.card__pagination',
      clickable: true,
    },
  });

  //cards slider
  let cardsSlider = new Swiper(".cards__slider-container", {
    breakpoints: {
      0: {
        spaceBetween: 30,
        loop: true,
        slidesPerView: 1,
        pagination: {
          el: '.cards__slider-pagination',
          clickable: true,
        }
      },
      768: {
        spaceBetween: 30,
        loop: true,
        slidesPerView: 2,
        navigation: {
          nextEl: '.cards__slider-btn--next',
          prevEl: '.cards__slider-btn--prev',
        },
        pagination: {
          el: '.cards__slider-pagination',
          clickable: true,
        }
      },
      991: {
        spaceBetween: 30,
        loop: true,
        slidesPerView: 3,
        navigation: {
          nextEl: '.cards__slider-btn--next',
          prevEl: '.cards__slider-btn--prev',
        },
        pagination: {
          el: '.cards__slider-pagination',
          clickable: true,
        }
      }
    }
  })

  // ****** popups *******
// popup__call --show
// popup__complaint
// popup__done
// popup-request

  function call(){
    let toggleCall = document.querySelector('.toggleCall');
    let popupCall = document.querySelector('.popup__call');
    let closeCall = document.querySelector ('.popup__close--call');
    if(popupCall){
      toggleCall.addEventListener('click', showPopupCall);
      function showPopupCall(){
        popupCall.classList.add('popup__call--show');
      }
      closeCall.addEventListener('click',closePopup )
      function closePopup() {
        popupCall.classList.remove('popup__call--show');
      }
    }
  }
  call();

  function complaint(){
    let toggleComplaint = document.querySelector('.toggleComplaint');
    let popupComplaint = document.querySelector('.popup__complaint');
    let closeComplaint = document.querySelector ('.popup__close--complaint');
    if(popupComplaint){
      toggleComplaint.addEventListener('click', showPopupComplaint);
      function showPopupComplaint(){
        popupComplaint.classList.add('popup__complaint--show');
      }
      closeComplaint.addEventListener('click',closePopup )
      function closePopup() {
        popupComplaint.classList.remove('popup__complaint--show');
      }
    }
  }
  complaint();

  function request(){
    let toggleRequest = document.querySelector('.card__btn-buy');
    let popupRequest = document.querySelector('.popup-request');
    let closeRequest = document.querySelector ('.popup__close--request');
    if(popupRequest){
      toggleRequest.addEventListener('click', showPopupRequest);
      function showPopupRequest(){
        popupRequest.classList.add('popup-request--show');
      }
      closeRequest.addEventListener('click',closePopup );
      function closePopup() {
        popupRequest.classList.remove('popup-request--show');
      }
    }
  }
  request();

  function done() {
    let popupDone = document.querySelector('.popup-done');
    let closeDone = document.querySelector ('.popup__close--done');
    if(popupDone){
      closeDone.addEventListener('click',closePopup );
      function closePopup() {
        popupDone.classList.remove('popup-done--show');
      }
    }
  }
  done()

  $('.more-equipment__icon').hover(function(){
    $(this).find('.tooltip').toggleClass('active');
  });

  //map link


// map
  function mapInit(){
    let map = document.querySelector(".map");
    if(map){
      ymaps.ready(init);

      function init() {
        var myMap = new ymaps.Map('map', {
          center: [55.677689, 37.297060],
          zoom: 15,
          controls: []
        });

        destinations = {
          '1': [55.677718, 37.297028],
          '2': [55.799013, 37.595712],
          '3': [55.805114, 37.601518],
        },

            $('.goto').on('click', function(e){
              e.preventDefault();

              var pos = $(this).data('map');

              console.log(pos);

              // переходим по координатам
              myMap.panTo(destinations[pos], {
                flying: 1
              });
            });


        var myPlacemark = new ymaps.Placemark(destinations['1'], {

        }, {
          iconLayout: 'default#image',
          iconImageHref: '../img/blocks/map/mark-icon.svg',
          iconImageSize: [40,40],
          iconImageOffset: [0, -50],
        });
        var myPlacemark2 = new ymaps.Placemark(destinations['2'], {

        }, {
          iconLayout: 'default#image',
          iconImageHref: '../img/blocks/map/mark-icon.svg',
          iconImageSize: [40,40],
          iconImageOffset: [0, -50],
        });
        var myPlacemark3 = new ymaps.Placemark(destinations['3'], {

        }, {
          iconLayout: 'default#image',
          iconImageHref: '../img/blocks/map/mark-icon.svg',
          iconImageSize: [40,40],
          iconImageOffset: [0, -50],
        });

        myMap.geoObjects
            .add(myPlacemark);
        myMap.geoObjects
            .add(myPlacemark2);
        myMap.geoObjects
            .add(myPlacemark3);
      }
    }
  }

  mapInit();

  $('.header__dropdown-btn').click(function(){
    $('.header__dropdown').toggleClass('open');
  });

  $('.header__dropdown-item .open-child').click(function(){
    $(this).parent().parent().toggleClass('open')
  });



  //Для страница с товаром
  $('.card .card__card-width-btn').click(function(){
    var width = $(this).attr('data-width');
    $(this).parent().find('.card__card-width-btn--active').removeClass('card__card-width-btn--active');
    $(this).addClass('card__card-width-btn--active');
    $(this).parent().parent().parent().find('.card__price').find('.card__prices--active').removeClass('card__prices--active');
    $(this).parent().parent().parent().find('.card__price').find('.card__prices[data-width="'+width+'"]').addClass('card__prices--active');
  });
  //Для маленькой карточки товара
  $('.cards__card .cards__card-width-btn').click(function(){
    var width = $(this).attr('data-width');
    $(this).parent().find('.cards__card-width-btn--active').removeClass('cards__card-width-btn--active');
    $(this).addClass('cards__card-width-btn--active');
    $(this).parent().parent().find('.cards__info-more').find('.cards__card-price--active').removeClass('cards__card-price--active');
    $(this).parent().parent().find('.cards__info-more').find('.cards__card-price[data-width="'+width+'"]').addClass('cards__card-price--active');
  });

  //Для страница с товаром

  $('.price-model .price-model__btns button').click(function(){

    var width = $(this).attr('data-width');

    $(this).parent().find('.card__card-width-btn--active').removeClass('card__card-width-btn--active');

    $(this).addClass('card__card-width-btn--active');

    $(this).parent().parent().parent().find('.table-body__item-wrap-active').removeClass('table-body__item-wrap-active');

    $(this).parent().parent().parent().find('.table-body__item-wrap[data-width="'+width+'"]').addClass('table-body__item-wrap-active');

  });

  function requestt(){

    let toggleRequest = document.querySelector('.more-equipment__bin-icon');

    let popupRequest = document.querySelector('.popup-request');

    let closeRequest = document.querySelector ('.popup__close--request');

    if(popupRequest){

      toggleRequest.addEventListener('click', showPopupRequest);

      function showPopupRequest(){

        popupRequest.classList.add('popup-request--show');

      }

      closeRequest.addEventListener('click',closePopup );

      function closePopup() {

        popupRequest.classList.remove('popup-request--show');

      }

    }

  }

  requestt();

  function call2(){

    let toggleCall = document.querySelector('.header__phone-link');

    let popupCall = document.querySelector('.popup__call');

    let closeCall = document.querySelector ('.popup__close--call');

    if(popupCall){

      toggleCall.addEventListener('click', showPopupCall);

      function showPopupCall(){

        popupCall.classList.add('popup__call--show');

      }

      closeCall.addEventListener('click',closePopup )

      function closePopup() {

        popupCall.classList.remove('popup__call--show');

      }

    }

  }

  call2();

  function done2(){

    $('.popup-done-open').click(function(){

      $('.popup-done').addClass('popup-done--show');

    });

  }

  done2();
});

//scroll
$(window).scroll(function(){
  if (window.innerWidth > 540){
    if ($(window).scrollTop() >= 102) {
      $('.header__bottom-wrp').addClass('fixed');
  }
    else {
        $('.header__bottom-wrp').removeClass('fixed');
    }
  }else{
    if ($(window).scrollTop() >= 0) {
      $('.header__bottom-wrp').addClass('fixed');
  }
    else {
        $('.header__bottom-wrp').removeClass('fixed');
    }
  }
});

 