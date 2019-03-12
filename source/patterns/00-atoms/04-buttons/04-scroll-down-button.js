// Scroll down button
const parallax = document.querySelector('.c-parallax-bgs--top');
const scrollDownBtn = document.querySelector(".a-btn--scroll-down");
const header = document.querySelector(".c-header");

if (scrollDownBtn) {
  scrollDownBtn.addEventListener("click", scrollDown);

  function scrollDown(e) {
    // parallax.scrollIntoView({
    //   behavior: 'smooth'
    // });
    if (header.classList.contains('js-m-nav--toggled')) {
      e.preventDefault();
    } else {
      zenscroll.to(parallax, 1750);
    }
  }
}
