document.addEventListener('DOMContentLoaded', () => {
  function test(...a) {
    let header = document.querySelector('.header');
    a.forEach(el => {
      header.textContent += el;
    });
  }
  let a = 1;
  let b = 2;
  console.log(`${a} + ${b} = ${a + b}`);
  test(1,2,3,4,5);
});