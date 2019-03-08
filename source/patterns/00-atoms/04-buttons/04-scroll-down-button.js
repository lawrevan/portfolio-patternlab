// Scroll down button
const parallax = document.querySelector('.c-parallax-bgs--top');
const scrollDownBtn = document.querySelector(".a-btn--scroll-down");

if (scrollDownBtn) {

  scrollDownBtn.addEventListener("click", scrollDown);

  function scrollDown() {
    // parallax.scrollIntoView({
    //   behavior: 'smooth'
    // });
    zenscroll.to(parallax, 1750);
  }
}
