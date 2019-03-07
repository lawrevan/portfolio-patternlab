const hamburgerBtn = document.querySelector('.c-header__hamburger');

const headerWrapper = document.querySelector('.c-header-wrapper');

hamburgerBtn.addEventListener('click', function(e) {
  headerWrapper.classList.toggle('js-m-nav--toggled');
  e.preventDefault();
})


// toggleClass : function (el, className) {
//         if(this.hasClass(el, className)) {
//             this.removeClass(el, className);
//         } else {
//             this.addClass(el, className);
//         }
//     },
