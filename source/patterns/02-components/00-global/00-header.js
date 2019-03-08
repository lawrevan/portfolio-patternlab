const hamburgerBtn = document.querySelector('.m-nav-toggle');

const header = document.querySelector('.c-header');

if ( hamburgerBtn ) {
  hamburgerBtn.addEventListener('click', function(e) {
    header.classList.toggle('js-m-nav--toggled');
    e.preventDefault();
  })
}



// toggleClass : function (el, className) {
//         if(this.hasClass(el, className)) {
//             this.removeClass(el, className);
//         } else {
//             this.addClass(el, className);
//         }
//     },
