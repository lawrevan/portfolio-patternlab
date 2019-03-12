// Scroll down button
const sectionAbout = document.querySelector('.c-about');
const scrollDownBtn = document.querySelector(".a-btn--scroll-down");
const header = document.querySelector(".c-header");


// Scroll Button
if (scrollDownBtn) {
  scrollDownBtn.addEventListener("click", scrollDown);

  function scrollDown(e) {
    if (header.classList.contains('js-m-nav--toggled')) {
      e.preventDefault();
    } else {
      zenscroll.to(sectionAbout, 1750);
    }
  }
}
