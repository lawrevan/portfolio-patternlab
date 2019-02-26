const hamburgerBtn1 = document.querySelector('.a-btn--menu-1');
const hamburgerBtn2 = document.querySelector('.a-btn--menu-2');
const hamburgerBtn3 = document.querySelector('.a-btn--menu-3');
const hamburgerBtn4 = document.querySelector('.a-btn--menu-4');

hamburgerBtn1.addEventListener('click', toggleClass);
hamburgerBtn2.addEventListener('click', toggleClass);
hamburgerBtn3.addEventListener('click', toggleClass);
hamburgerBtn4.addEventListener('click', toggleClass);

function toggleClass() {
  this.classList.toggle('js-a-btn--menu-open');
}
