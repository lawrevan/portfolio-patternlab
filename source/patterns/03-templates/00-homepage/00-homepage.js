const hamburgerBtn = document.querySelector('.m-nav-toggle');
const header = document.querySelector('.c-header');

if (header) {
  hamburgerBtn.addEventListener('click', function(e) {
    header.classList.toggle('js-m-nav--toggled');
    e.preventDefault();
  })

  mediaCheck({
    media: '(min-width: 768px)',
    // Switch to Desktop Version
    entry: function () {
        header.classList.remove('js-m-nav--toggled');
    },
    // Switch to tablet Version
    // exit: function () {
    //     $body.addClass('tablet-slick');
    // }
  });
}

// Links
const linkWork = document.querySelector('.m-nav__link--work');
const linkAbout = document.querySelector('.m-nav__link--about');
const linkContact = document.querySelector('.m-nav__link--contact');
const scrollDownBtn = document.querySelector(".a-btn--scroll-down");
const scrollUpBtn = document.querySelector(".a-btn--scroll-up");

// Scroll Targets
const sectionWork = document.querySelector('.c-parallax-bgs--top');
const sectionAbout = document.querySelector('.c-about');
const sectionContact = document.querySelector('.c-contact');
const sectionTop = document.querySelector(".t-homesection");

if (linkWork) {
  linkWork.addEventListener("click", scrollDown);
  linkAbout.addEventListener("click", scrollDown);
  linkContact.addEventListener("click", scrollDown);

  function scrollDown(e) {

    e.preventDefault();

    //Closes nav right away
    // header.classList.remove('js-m-nav--toggled')

    //Closes nav with 2 second delay
    if (header.classList.contains('js-m-nav--toggled')) {
      setTimeout(() => {
        header.classList.remove('js-m-nav--toggled')
      }, 2000);
    }

    // target = link text
    let clickedLink = e.target.innerText;

    switch( clickedLink ) {
      case "Work":
        zenscroll.to(sectionWork, 1750);
        break;
      case "About":
        zenscroll.to(sectionAbout, 1750);
        break;
      case "Contact":
        zenscroll.to(sectionContact, 1750);
        break;
      default:
        clickedLink = "Work";
    }
    return clickedLink;
  }
}

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

// Scroll up button
if (scrollUpBtn) {

	scrollUpBtn.addEventListener("click", backToTop);

	function backToTop(){
      zenscroll.to(sectionTop, 1750);
	}
}
