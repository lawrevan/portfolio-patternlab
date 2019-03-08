// Scroll up button
const scrollUpBtn = document.querySelector(".a-btn--scroll-up");
const pageTop = document.querySelector(".t-homepage");

if (scrollUpBtn) {

	scrollUpBtn.addEventListener("click", backToTop);

	function backToTop(){
	    // window.scrollTo({ top: 0, behavior: 'smooth' });
      zenscroll.to(pageTop, 1750);
	}
}
