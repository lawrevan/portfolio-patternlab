/**
 * Utils
 * This class serves as the home of reusable utilites for the build
 * @type {Window.Class}
 */

var Utils = new Class({
    _nameSpace: 'Utils',
    /**
     * Merge defaults with user options
     *
     * @returns {Object} Merged values of defaults and options
     */
    extend : function() {
        var extended = {};

        for(var key in arguments) {
            var argument = arguments[key];
            for (var prop in argument) {
                if (Object.prototype.hasOwnProperty.call(argument, prop)) {
                    extended[prop] = argument[prop];
                }
            }
        }

        return extended;
    },

    /**
     * Check is there is an existing class to an element
     *
     * @param el
     * @param className
     * @returns {boolean}
     */
    hasClass : function (el, className) {
        if (el.classList)
            return el.classList.contains(className);
        else
            return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
    },

    /**
     * Add class to an element
     *
     * @param el
     * @param className
     */
    addClass: function (el, className) {
        if (el.classList)
            el.classList.add(className);
        else if (!this.hasClass(el, className)) el.className += " " + className
    },

    /**
     * Removes class to an element
     * @param el
     * @param className
     */
    removeClass : function (el, className) {
        if (el.classList)
            el.classList.remove(className);
        else if (this.hasClass(el, className)) {
            var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
            el.className=el.className.replace(reg, ' ');
        }
    },

    /**
     * Toggles a class to an element
     * @param el
     * @param className
     */
    toggleClass : function (el, className) {
        if(this.hasClass(el, className)) {
            this.removeClass(el, className);
        } else {
            this.addClass(el, className);
        }
    },


    /**
     *  Get siblings of an elemnt
     * @param elem
     * @returns {Array}
     */
    getSiblings : function (elem) {
        var siblings = [];
        var sibling = elem.parentNode.firstChild;
        for ( ; sibling; sibling = sibling.nextSibling ) {
            if ( sibling.nodeType === 1 && sibling !== elem ) {
                siblings.push( sibling );
            }
        }
        return siblings;
    },

    /**
     * Throttling function callbacks to fire at a given timeout.
     * Useful for event tracking (such as scrolling or resizing)
     * to prevent firing callback every 1ms.
     *
     * @param fn
     * @param threshold
     * @param scope
     * @returns {Function}
     */
    throttle : function(fn, threshold, scope) {
        var last, deferTimer;
        threshold || (threshold = 250);
        return function() {
            var context = scope || this;
            var now = +new Date, args = arguments;

            if (last && now < last + threshold) {
                // hold on to it
                clearTimeout(deferTimer);
                deferTimer = setTimeout(function () {
                    last = now;
                    fn.apply(context, args);
                }, threshold);
            } else {
                last = now;
                fn.apply(context, args);
            }
        };
    },

    /**
     *
     * @param el
     * @returns {{x: number, y: number}}
     */

    getPosition  : function (el) {
        var xPos = 0;
        var yPos = 0;

        while (el) {
            if (el.tagName == "BODY") {
                // deal with browser quirks with body/window/document and page scroll
                var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
                var yScroll = el.scrollTop || document.documentElement.scrollTop;

                xPos += (el.offsetLeft - xScroll + el.clientLeft);
                yPos += (el.offsetTop - yScroll + el.clientTop);
            } else {
                // for all other non-BODY elements
                xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
                yPos += (el.offsetTop - el.scrollTop + el.clientTop);
            }

            el = el.offsetParent;
        }
        return {
            x: xPos,
            y: yPos
        };
    },

    getOffset : function getOffset(el) {
        var el = el.getBoundingClientRect(),
            wTop = window.pageYOffset || document.documentElement.scrollTop,
            wleft= window.pageXOffset || document.documentElement.scrollLeft;


        return {
            left: el.left + wleft,
            top: el.top + wTop
        }
    },

    isInViewport : function (el) {
        var bounding = el.getBoundingClientRect();

        return (
            bounding.top >= 0 &&
            bounding.left >= 0 &&
            bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
});
