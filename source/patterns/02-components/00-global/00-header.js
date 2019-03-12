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
