"use strict";

svg4everybody({
  validate: function validate(src, svg, use) {
    return true;
  }
});

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

function hideEl(el, classMod) {
  el.classList.remove(classMod);
}

function showEl(el, classMod) {
  el.classList.add(classMod);
}

document.addEventListener('DOMContentLoaded', function () {
  var html = document.querySelector('html');
  html.addEventListener('click', function (e) {
    var target = e.target;
    stepsList(target, 'steps__list-item', '.steps__list-item', '.steps__list-item-content', 'steps__list-item-content--active', '.steps__text', 'steps__text--show', '.steps__btn-more', 'steps__btn-more--active');
  });
});