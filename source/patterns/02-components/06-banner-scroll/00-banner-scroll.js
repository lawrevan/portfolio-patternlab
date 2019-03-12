var Gorilla = {};
(function() {
    Gorilla.Utils = new Utils();
})();

/**
 * Allows to add namespace on events to we can add and remove them easily
 * @type {{on(*, *=, *=): *, off(*): *}}
 */
var events = {
    on: function (event, cb, opts){
        if( !this.namespaces ) {  // save the namespaces on the DOM element itself
            this.namespaces = {};
        }


        this.namespaces[event] = cb;
        var options = opts || false;

        this.addEventListener( event.split('.')[0], cb, options );
        return this;
    },
    off: function (event) {
        if(typeof this.namespaces !== 'undefined') {
            this.removeEventListener( event.split('.')[0], this.namespaces[event] );
            delete this.namespaces[event];
            return this;
        }

    }
};

// Extend the DOM with these above custom methods
window.on = document.on = Element.prototype.on = events.on;
window.off = document.off = Element.prototype.off = events.off;

/**
 * Component
 * This is a brief description of the component's usage/existenence.
 * @see http://classjs.readthedocs.io/en/latest/
 * @type {Window.Class}
 */
var BannerScroll = new Class({
    _nameSpace: 'BannerScroll',

    /**
     * Default Options
     */
    defaults: {
        slidesSelector: 'c-banner-scroll__item',
        slideFixedSelector: 'c-banner-scroll--bg-fixed',
        slideBackgroundSelector: 'c-banner-scroll__item-background',
        slides: null,
        slideMainHeder: null,
        initialImageWidth: 0,
        mobileBreakpoint: 991,
        headerTopPos : 'auto',
        headerLeftPos : 'auto'

    },

    /**
     * Initialization of the component
     * @param el
     * @param options
     */
    initialize: function (el, options) {
        var _self = this;

        _self.opts = Gorilla.Utils.extend(_self.defaults, options || {});
        _self.el = el;

        _self.opts.slideMainHeder =  _self.el.querySelectorAll('.c-banner-scroll__header')[0];
        _self.opts.slides = _self.el.querySelectorAll('.' + _self.opts.slidesSelector);
        _self.opts.initialImageWidth = _self.opts.slides[0].querySelector('.' + _self.opts.slideBackgroundSelector).clientWidth;


        Respond.to({
            'media': 'screen and (max-width: ' + _self.opts.mobileBreakpoint + 'px)',
            'namespace': 'Responsive-' + _self.opts.mobileBreakpoint + '-' + _self._nameSpace,
            'fallback': 'else',
            'if': function () {
                // Remove events on Mobile
                window.off('scroll.BannerScroll');
                window.off('resize.BannerScroll');

                Gorilla.Utils.removeClass(_self.el, _self.opts.slideFixedSelector);
                _self.updateHeader(0, true);
            },
            'else': function () {
                //desktop
                _self._bindEvents();
            }
        });
    },

    /**
     * Handle the binding of events
     * @private
     */
    _bindEvents: function () {
        var _self = this,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        _self.checkPosition(scrollTop);

        window.on('scroll.BannerScroll', Gorilla.Utils.throttle(function (e) {
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            _self.checkPosition(scrollTop);
        }, 10));

        window.on('resize.BannerScroll', Gorilla.Utils.throttle(function (e) {
            Gorilla.Utils.removeClass(_self.el, _self.opts.slideFixedSelector);
            _self.resetSlides(-1);
            _self.opts.initialImageWidth = _self.opts.slides[0].querySelector('.' + _self.opts.slideBackgroundSelector).clientWidth;
            _self.updateImage(true, true);

            // Update header location
            if (Gorilla.Utils.hasClass(_self.el, _self.opts.slideFixedSelector)) {
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

                _self.updateHeader(scrollTop, false);
            }

        }, 40));

    },

    /**
     * Check Position of Elements
     *
     * @param scrollTop
     */
    checkPosition: function (scrollTop) {
        var _self = this,
            offset = 150,
            lastSlidePosition = Gorilla.Utils.getOffset(_self.opts.slides[_self.opts.slides.length - 1]);

        //Set image fixed if the banner is inview
        if (scrollTop >= Gorilla.Utils.getOffset(_self.el).top && scrollTop <= lastSlidePosition.top) {
            Gorilla.Utils.addClass(_self.el, _self.opts.slideFixedSelector);
            Gorilla.Utils.addClass(_self.el, _self.opts.slideFixedSelector + '-header');
            _self.updateImage(false, false);
            _self.updateHeader(scrollTop, false);

            Gorilla.Utils.removeClass(_self.el, 'c-banner-scroll--scrolled-below');

        } else {
            Gorilla.Utils.removeClass(_self.el, _self.opts.slideFixedSelector);
            _self.resetSlides(-1);
            _self.updateImage(true, false);

            if (scrollTop <= Gorilla.Utils.getOffset(_self.el).top || scrollTop > lastSlidePosition.top + offset) {
                Gorilla.Utils.removeClass(_self.el, _self.opts.slideFixedSelector + '-header');
            }

            // Window scroll is below banner container
            if (scrollTop > lastSlidePosition.top + (offset - 50)) {
                Gorilla.Utils.addClass(_self.el, 'c-banner-scroll--scrolled-below');
            } else {
                _self.updateHeader(0, true);
            }
        }

        if (Gorilla.Utils.hasClass(_self.el, _self.opts.slideFixedSelector)) {
            // Check if totally above or totally below viewport
            var index = 0;

            for (var i = 0; i < _self.opts.slides.length; i++) {

                var contentDiv = _self.opts.slides[i].querySelectorAll('.c-banner-scroll__item-inner')[0],
                    slideContentPos = Gorilla.Utils.getOffset(contentDiv);

                if ((slideContentPos.top + (contentDiv.clientHeight / 2)) >= scrollTop) {
                    index = i;
                    break;
                }
            }

            _self.resetSlides(index);
            Gorilla.Utils.addClass(_self.opts.slides[index], 'active');
        }
    },

    updateHeader: function (scrollTop, isReset) {
        var _self = this,
            contentDiv = _self.opts.slides[0].querySelectorAll('.c-banner-scroll__item-inner')[0],
            slideContentPos = Gorilla.Utils.getOffset(contentDiv);

        _self.opts.headerTopPos = (Gorilla.Utils.getOffset(_self.opts.slideMainHeder).top - scrollTop) + 'px';
        _self.opts.headerLeftPos = slideContentPos.left + 'px';

        if (isReset) {
            _self.opts.slideMainHeder.querySelector('.shade').style.height = 'auto';

            return false;
        }

        _self.opts.slideMainHeder.querySelector('.shade').style.height = _self.opts.headerTopPos;

    },

    /**
     * Remove active states of slides
     * @param index
     */
    resetSlides: function (index) {
        var _self = this;

        for (var ii = 0; ii < _self.opts.slides.length; ii++) {
            if (ii !== index) {
                Gorilla.Utils.removeClass(_self.opts.slides[ii], 'active');
            }
        }
    },

    /**
     * Update the image style properties
     *
     * @param isReset
     * @param isWindowResize
     */
    updateImage: function (isReset, isWindowResize) {
        var _self = this;

        for (var i = 0; i < _self.opts.slides.length; i++) {
            var leftPos = Gorilla.Utils.getOffset(_self.opts.slides[i]).left,
                imageMaxWidth = _self.opts.initialImageWidth + 'px';

            if (isReset) {
                if (!isWindowResize) {
                    leftPos = 0;
                }

                imageMaxWidth = 'none';
                leftPos = 0;
            }

            _self.opts.slides[i].querySelector('.' + _self.opts.slideBackgroundSelector).style.left = leftPos + 'px';
            _self.opts.slides[i].querySelector('.' + _self.opts.slideBackgroundSelector).style.maxWidth = imageMaxWidth;

        }
    }

});

/**
 * Instantiates instance of component based selector convention
 */
setTimeout(function() {
    var component = document.querySelectorAll('[data-block="banner-scroll"]');
    for (var i = 0; i < component.length; i++) {
        new BannerScroll(component[i], JSON.parse(component[i].getAttribute('data-options')));
    }

}, 3000);
