svg4everybody({
  validate: function (src, svg, use) {
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

  })
});