const hamburgerBtn = document.querySelector('.m-nav-toggle');

const header = document.querySelector('.c-header');

hamburgerBtn.addEventListener('click', function(e) {
  header.classList.toggle('js-m-nav--toggled');
  e.preventDefault();
})
