// Scroll down button
const about = document.querySelector('.c-about');
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
      zenscroll.to(about, 1750);
    }
  }
}
