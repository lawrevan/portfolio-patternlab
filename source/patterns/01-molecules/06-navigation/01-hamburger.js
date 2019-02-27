const hamburgerBtn = document.querySelector('.m-hamburger');

const headerWrapper = document.querySelector('.c-header-wrapper');

hamburgerBtn.addEventListener('click', function() {
  headerWrapper.classList.toggle('js-m-nav--toggled');
  e.preventDefault();
})
