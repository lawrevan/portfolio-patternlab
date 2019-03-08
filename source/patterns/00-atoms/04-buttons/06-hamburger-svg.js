const hamburgerSvg = document.querySelector('.a-btn--hamburger-svg');

if (hamburgerSvg) {
  hamburgerSvg.addEventListener('click', function(){
    this.classList.toggle('js-a-btn--hamburger');
  });
}
