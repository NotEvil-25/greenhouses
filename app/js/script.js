"use strict";

svg4everybody({
  validate: function validate(src, svg, use) {
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
  var listItems = document.querySelectorAll(listItem),
      contents = document.querySelectorAll(listItemContent),
      buttons = document.querySelectorAll(btn),
      titles = document.querySelectorAll(title);

  if (target && target.classList.contains(targetClass)) {
    contents.forEach(function (el) {
      el.classList.remove(listItemContentMod);
    });
    buttons.forEach(function (el) {
      el.classList.remove(btnMod);
    });
    titles.forEach(function (el) {
      el.classList.remove(titleMod);
    });

    for (var i = 0; i < listItems.length; i++) {
      if (target === listItems[i]) {
        titles[i].classList.add(titleMod);
        buttons[i].classList.add(btnMod);
        showEl(contents[i], listItemContentMod);
      }
    }
  } else {
    for (var _i = 0; _i < contents.length; _i++) {
      hideEl(contents[_i], listItemContentMod);

      titles[_i].classList.remove(titleMod);

      buttons[_i].classList.remove(btnMod);
    }
  }
}

function video() {
  function findVideos() {
    var videos = document.querySelectorAll('.video');

    for (var i = 0; i < videos.length; i++) {
      setupVideo(videos[i]);
    }
  }

  function setupVideo(video) {
    var link = video.querySelector('.video__link');
    var media = video.querySelector('.video__media');
    var button = video.querySelector('.video__button');
    var id = parseMediaURL(media);
    video.addEventListener('click', function () {
      var iframe = createIframe(id);
      link.remove();
      button.remove();
      video.appendChild(iframe);
    });
    link.removeAttribute('href');
    video.classList.add('video--enabled');
  }

  function parseMediaURL(media) {
    var regexp = /https:\/\/i\.ytimg\.com\/vi\/([a-zA-Z0-9_-]+)\/sddefault\.jpg/i;
    var url = media.src;
    var match = url.match(regexp);
    return match[1];
  }

  function createIframe(id) {
    var iframe = document.createElement('iframe');
    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('allow', 'autoplay');
    iframe.setAttribute('src', generateURL(id));
    iframe.classList.add('video__media');
    return iframe;
  }

  function generateURL(id) {
    var query = '?rel=0&showinfo=0&autoplay=1';
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
  var btn = document.querySelector(".feedback__select-btn"),
      selectList = document.querySelector(".feedback__select"),
      selectItem = document.querySelectorAll(".feedback__select-item"),
      selectInput = document.getElementById("select-input");

  if (btn && selectList) {
    btn.addEventListener("click", function () {
      selectList.classList.toggle("feedback__select--open");
      btn.classList.toggle("feedback__select-btn--active");
    });
  }

  if (btn && selectList && selectItem) {
    selectList.addEventListener("click", function (e) {
      var target = e.target;

      if (target && target.classList.contains("feedback__select-item")) {
        btn.classList.remove("feedback__select-btn--active");
        selectList.classList.remove("feedback__select--open");

        for (var i = 0; i < selectItem.length; i++) {
          if (target === selectItem[i]) selectInput.value = selectItem[i].textContent;
        }
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', function () {
  var html = document.querySelector('html');
  html.addEventListener('click', function (e) {
    var target = e.target;
    stepsList(target, 'steps__list-item', '.steps__list-item', '.steps__list-item-content', 'steps__list-item-content--active', '.steps__text', 'steps__text--show', '.steps__btn-more', 'steps__btn-more--active');
  });
  feedbackList(); //features slider

  featuresInitSlider();
  window.addEventListener('resize', function () {
    featuresInitSlider();
  });

  function featuresInitSlider() {
    var featuresWrp = document.querySelectorAll('.features__wrp');
    var featuresContainerDel = document.querySelector('.features__swiper-container--delete');

    if (featuresWrp && featuresContainerDel) {
      if (document.body.clientWidth < 768) {
        featuresContainerDel.classList.add('features__swiper-container');
        featuresWrp.forEach(function (item) {
          item.classList.add('swiper-slide');
        });
        var swiperFeatures = new Swiper('.features__swiper-container', {
          spaceBetween: 0,
          slidesPerGroup: 1,
          slidesPerView: 1,
          clickable: false,
          breakpoints: {
            320: {
              clickable: true
            },
            540: {
              clickable: false
            }
          },
          pagination: {
            el: '.features__swiper-pagination',
            clickable: true
          }
        });
      } else if (document.body.clientWidth > 768) {
        featuresContainerDel.classList.remove('`21``__swiper-container');
        featuresWrp.forEach(function (item) {
          item.classList.remove('swiper-slide');
        });
      }
    }
  } // let featuresSwiperContainer = document.querySelector('.features__swiper-container');
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
          renderBullet: function renderBullet(index, className) {
            var bullets = document.querySelectorAll('.production__photo');
            bullets.forEach(function (el) {
              el.classList.add(className);
            });
            return bullets[index].outerHTML;
          }
        }
      },
      768: {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        pagination: {
          el: '.production__photos',
          clickable: true,
          renderBullet: function renderBullet(index, className) {
            var bullets = document.querySelectorAll('.production__photo');
            bullets.forEach(function (el) {
              el.classList.add(className);
            });
            return bullets[index].outerHTML;
          }
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  }); //certificate slider

  var swiperCertificate = new Swiper('.certificate__swiper-container', {
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 10
      },
      540: {
        slidesPerView: 3,
        spaceBetween: 10
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 20
      },
      960: {
        slidesPerView: 4,
        spaceBetween: 30
      }
    },
    loop: true,
    navigation: {
      nextEl: '.certificate__swiper-button-next',
      prevEl: '.certificate__swiper-button-prev'
    },
    pagination: {
      el: '.certificate__swiper-pagination'
    }
  }); // reviews slider

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
          slideShadows: false
        }
      },
      540: {
        coverflowEffect: {
          rotate: 0,
          stretch: 0,
          depth: 200,
          modifier: 1,
          slideShadows: false
        }
      }
    },
    navigation: {
      nextEl: '.reviews__swiper-button-next',
      prevEl: '.reviews__swiper-button-prev'
    },
    pagination: {
      el: '.reviews__swiper-pagination'
    }
  });
  var processSlider = new Swiper('.process__content', {
    loop: true,
    pagination: {
      el: '.process__pagination'
    },
    navigation: {
      nextEl: '.process__swiper-button-next',
      prevEl: '.process__swiper-button-prev'
    },
    breakpoints: {
      1199: {
        slidesPerView: 3,
        spaceBetween: 30
      },
      991: {
        slidesPerView: 3,
        spaceBetween: 30
      },
      575: {
        slidesPerView: 2,
        spaceBetween: 30
      }
    }
  });
  video(); /// drop-down footer

  var buyerToggle = document.querySelector('.footer__nav-title--buyer');
  var productsToggle = document.querySelector('.footer__nav-title--products');
  var listBuyer = document.querySelector('.footer__nav-list--buyer');
  var listProducts = document.querySelector('.footer__nav-list--products');
  buyerToggle.addEventListener('click', showBuyer);
  productsToggle.addEventListener('click', showProducts);

  function showBuyer() {
    listBuyer.classList.toggle('footer__nav-list--active');
  }

  function showProducts() {
    listProducts.classList.toggle('footer__nav-list--active');
  } // advantages swiper


  function advantagesInitSlider() {
    var advantagesWrp = document.querySelectorAll('.advantages__item');
    var advantagesContainerDel = document.querySelector('.advantages__swiper-container--delete');

    if (advantagesWrp && advantagesContainerDel) {
      if (document.body.clientWidth < 768) {
        advantagesContainerDel.classList.add('advantages__swiper-container');
        advantagesWrp.forEach(function (item) {
          item.classList.add('swiper-slide');
        });
        var swiperAdvantages = new Swiper('.advantages__swiper-container', {
          spaceBetween: 0,
          slidesPerGroup: 2,
          slidesPerView: 2,
          clickable: false,
          breakpoints: {
            320: {
              clickable: true
            },
            540: {
              clickable: false
            }
          },
          pagination: {
            el: '.advantages__swiper-pagination',
            clickable: true
          }
        });
      } else if (document.body.clientWidth > 768) {
        advantagesContainerDel.classList.remove('advantages__swiper-container');
        advantagesWrp.forEach(function (item) {
          item.classList.remove('swiper-slide');
        });
      }
    }
  }

  advantagesInitSlider();
  window.addEventListener('resize', function () {
    advantagesInitSlider();
  }); // tabs

  var tab = function tab() {
    var tabNav = document.querySelectorAll('.tabs__nav-item'),
        tabContent = document.querySelectorAll('.tab'),
        tabName;
    tabNav.forEach(function (item) {
      item.addEventListener('click', selectTabNav);
    });

    function selectTabNav() {
      tabNav.forEach(function (item) {
        item.classList.remove('tabs__nav-item--active');
      });
      this.classList.add('tabs__nav-item--active');
      tabName = this.getAttribute('data-tab-name');
      selectTabContent(tabName);
    }

    function selectTabContent(tabName) {
      tabContent.forEach(function (item) {
        item.classList.contains(tabName) ? item.classList.add('tab--active') : item.classList.remove('tab--active');
      });
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
    var btn = document.querySelector(".about-category__btn"),
        text = document.querySelector(".about-category__text");

    if (btn && text) {
      btn.addEventListener("click", function () {
        if (btn.textContent === "Показать все") btn.textContent = "Скрыть";else btn.textContent = "Показать все";
        text.classList.toggle("about-category__text--show");
      });
    }
  }

  showText();

  function sortSelect() {
    var placeholder = document.querySelector(".cards__filter-sort-placeholder"),
        selectList = document.querySelector(".cards__filter-sort-names"),
        selectItem = document.querySelectorAll(".cards__filter-sort-name");

    if (placeholder && selectList) {
      html.addEventListener("click", function (e) {
        if (e.target && e.target.classList.contains("cards__filter-sort-placeholder")) {
          selectList.classList.toggle("cards__filter-sort-names--show");
          placeholder.classList.toggle("cards__filter-sort-placeholder--active");
        } else if (!e.target.classList.contains("cards__filter-sort-name--current")) {
          selectList.classList.remove("cards__filter-sort-names--show");
          placeholder.classList.remove("cards__filter-sort-placeholder--active");
        }
      });
      window.addEventListener("scroll", function () {
        selectList.classList.remove("cards__filter-sort-names--show");
        placeholder.classList.remove("cards__filter-sort-placeholder--active");
      });
      selectList.addEventListener("click", function (e) {
        if (e.target && e.target.classList.contains("cards__filter-sort-name")) {
          if (!e.target.classList.contains("cards__filter-sort-name--current")) {
            selectItem.forEach(function (el) {
              el.classList.remove("cards__filter-sort-name--current");
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

  sortSelect(); //card slider

  var cardPhotos = new Swiper(".card__imgs-slider", {
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
        clickable: true
      }
    }
  });
  var cardPhoto = new Swiper(".card__photo-slider", {
    spaceBetween: 10,
    loopedSlides: 5,
    loop: true,
    slidesPerView: 1,
    thumbs: {
      swiper: cardPhotos
    },
    navigation: {
      nextEl: '.card__slider-btn--next',
      prevEl: '.card__slider-btn--prev'
    },
    pagination: {
      el: '.card__pagination',
      clickable: true
    }
  }); //cards slider

  var cardsSlider = new Swiper(".cards__slider-container", {
    breakpoints: {
      0: {
        spaceBetween: 30,
        loop: true,
        slidesPerView: 1,
        pagination: {
          el: '.cards__slider-pagination',
          clickable: true
        }
      },
      768: {
        spaceBetween: 30,
        loop: true,
        slidesPerView: 2,
        navigation: {
          nextEl: '.cards__slider-btn--next',
          prevEl: '.cards__slider-btn--prev'
        },
        pagination: {
          el: '.cards__slider-pagination',
          clickable: true
        }
      },
      991: {
        spaceBetween: 30,
        loop: true,
        slidesPerView: 3,
        navigation: {
          nextEl: '.cards__slider-btn--next',
          prevEl: '.cards__slider-btn--prev'
        },
        pagination: {
          el: '.cards__slider-pagination',
          clickable: true
        }
      }
    }
  });
}); // ****** popups *******
// popup__call --show
// popup__complaint 
// popup__done 
// popup-request

function call() {
  var toggleCall = document.querySelector('.toggleCall');
  var popupCall = document.querySelector('.popup__call');
  var closeCall = document.querySelector('.popup__close--call');

  if (popupCall) {
    var showPopupCall = function showPopupCall() {
      popupCall.classList.add('popup__call--show');
    };

    var closePopup = function closePopup() {
      popupCall.classList.remove('popup__call--show');
    };

    toggleCall.addEventListener('click', showPopupCall);
    closeCall.addEventListener('click', closePopup);
  }
}

call();

function complaint() {
  var toggleComplaint = document.querySelector('.toggleComplaint');
  var popupComplaint = document.querySelector('.popup__complaint');
  var closeComplaint = document.querySelector('.popup__close--complaint');

  if (popupComplaint) {
    var showPopupComplaint = function showPopupComplaint() {
      popupComplaint.classList.add('popup__complaint--show');
    };

    var closePopup = function closePopup() {
      popupComplaint.classList.remove('popup__complaint--show');
    };

    toggleComplaint.addEventListener('click', showPopupComplaint);
    closeComplaint.addEventListener('click', closePopup);
  }
}

complaint();

function request() {
  var toggleRequest = document.querySelector('.certificate__title');
  var popupRequest = document.querySelector('.popup-request');
  var closeRequest = document.querySelector('.popup__close--request');

  if (popupRequest) {
    var showPopupRequest = function showPopupRequest() {
      popupRequest.classList.add('popup-request--show');
    };

    var closePopup = function closePopup() {
      popupRequest.classList.remove('popup-request--show');
    };

    toggleRequest.addEventListener('click', showPopupRequest);
    closeRequest.addEventListener('click', closePopup);
  }
}

request();

function done() {
  var toggleDone = document.querySelector('.cards__title');
  var popupDone = document.querySelector('.popup-done');
  var closeDone = document.querySelector('.popup__close--done');

  if (popupDone) {
    var showPopupRequest = function showPopupRequest() {
      popupDone.classList.add('popup-done--show');
    };

    var closePopup = function closePopup() {
      popupDone.classList.remove('popup-done--show');
    };

    toggleDone.addEventListener('click', showPopupRequest);
    closeDone.addEventListener('click', closePopup);
  }
}

done(); //map link
// map 

let map = document.getElementById("map");
if(map){
  ymaps.ready(init);
}

function init() {
  var myMap = new ymaps.Map('map', {
    center: [55.677689, 37.297060],
    zoom: 15,
    controls: []
  });
  destinations = {
    '1': [55.677718, 37.297028],
    '2': [55.799013, 37.595712],
    '3': [55.805114, 37.601518]
  }, $('.goto').on('click', function (e) {
    e.preventDefault();
    var pos = $(this).data('map');
    console.log(pos); // переходим по координатам

    myMap.panTo(destinations[pos], {
      flying: 1
    });
  });
  var myPlacemark = new ymaps.Placemark(destinations['1'], {}, {
    iconLayout: 'default#image',
    iconImageHref: '../img/blocks/map/mark-icon.svg',
    iconImageSize: [40, 40],
    iconImageOffset: [0, -50]
  });
  var myPlacemark2 = new ymaps.Placemark(destinations['2'], {}, {
    iconLayout: 'default#image',
    iconImageHref: '../img/blocks/map/mark-icon.svg',
    iconImageSize: [40, 40],
    iconImageOffset: [0, -50]
  });
  var myPlacemark3 = new ymaps.Placemark(destinations['3'], {}, {
    iconLayout: 'default#image',
    iconImageHref: '../img/blocks/map/mark-icon.svg',
    iconImageSize: [40, 40],
    iconImageOffset: [0, -50]
  });
  myMap.geoObjects.add(myPlacemark);
  myMap.geoObjects.add(myPlacemark2);
  myMap.geoObjects.add(myPlacemark3);
}