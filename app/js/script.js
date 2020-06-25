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

document.addEventListener('DOMContentLoaded', function () {
  var a = 1;
  var b = 2;
  console.log("".concat(a, " + ").concat(b, " = ").concat(a + b));
  test(1, 2, 3, 4, 5);
});