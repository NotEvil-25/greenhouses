function test(...a) {
  let footer = document.querySelector('.footer');
  a.forEach(el => {
    footer.textContent += el;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  let a = 1;
  let b = 2;
  console.log(`${a} + ${b} = ${a + b}`);
  test(1,2,3,4,5);
});