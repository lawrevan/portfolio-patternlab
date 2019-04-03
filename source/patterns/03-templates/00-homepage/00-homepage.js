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
        entry: function() {
            header.classList.remove('js-m-nav--toggled');
        },
        // Switch to tablet Version
        // exit: function () {
        //     $body.addClass('tablet-slick');
        // }
    });
}
// Nav + Social + Scroll Btn
const navGroup = document.querySelector('.m-stars__content');

// Links
const linkWork = document.querySelector('.m-nav__link--work');
const linkAbout = document.querySelector('.m-nav__link--about');
const linkContact = document.querySelector('.m-nav__link--contact');
const scrollDownBtn = document.querySelector(".a-btn--scroll-down");
const scrollUpBtn = document.querySelector(".a-btn--scroll-up");

// Scroll Targets
const sectionParallax = document.querySelector('.c-parallax-bgs--top');
const sectionAbout = document.querySelector('.m-about');
const sectionWork = document.querySelector('.c-banner-scroll');
const sectionContact = document.querySelector('.js-contact-section');
const sectionTop = document.querySelector(".t-homesection");


//About Content
const aboutBtnClose = document.querySelector('.m-about__close');

const aboutContent = document.querySelector('.m-star-wars__content');



if (linkWork) {
    linkWork.addEventListener("click", scrollDown);
    linkAbout.addEventListener("click", scrollDown);
    linkContact.addEventListener("click", scrollDown);

    function scrollDown(e) {

        e.preventDefault();

        //Closes nav right away
        header.classList.remove('js-m-nav--toggled')

        //Closes nav with 2 second delay
        // if (header.classList.contains('js-m-nav--toggled')) {
        //     setTimeout(() => {
        //         header.classList.remove('js-m-nav--toggled')
        //     }, 2000);
        // }

        // target = link text
        let clickedLink = e.target.innerText;

        switch (clickedLink) {
            case "About":

            //     zenscroll.to(sectionAbout, 1750);
            //     break;

            header.classList.add('js-about-active');
            break;

            case "Work":
                zenscroll.to(sectionWork, 1750);
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

// Clicking About section pauses star wars text animation
sectionAbout.addEventListener('click', () => {
    if (header.classList.contains('js-about-active')) {
        header.classList.toggle('js-about-paused');
    }
});
// Listen for star wars text animation end to display nav
aboutContent.addEventListener('animationend', closeAbout);
// Close About by Clicking X
aboutBtnClose.addEventListener('click', closeAbout);

function closeAbout() {
    header.classList.remove('js-about-paused');
    header.classList.remove('js-about-active');
}

// Scroll Button
if (scrollDownBtn) {

    scrollDownBtn.addEventListener("click", scrollDown);

    function scrollDown(e) {
        if (header.classList.contains('js-m-nav--toggled')) {
            e.preventDefault();
        } else {
            zenscroll.to(sectionParallax, 1750);
        }
    }
}

// Scroll up button
if (scrollUpBtn) {

    scrollUpBtn.addEventListener("click", backToTop);

    function backToTop() {
        zenscroll.to(sectionTop, 1750);
    }
}
