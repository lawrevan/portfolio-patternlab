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
    // Switch to Mobile Version
    // exit: function () {
    //     $body.addClass('tablet-slick');
    // }
  });
}
