!(function (root, factory) {

    'use strict';

    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'));
    } else {
        factory(root.jQuery);
    }
} (this, function ($) {

    'use strict';

    function Copycat(element, target, options) {
        this._options = $.extend({
            scroll: window,
            substractScroll: null,
            handleResize: true
        }, options);

        this._element = $(element);
        this._targetElement = $(target);
        this._scrollElement = $(this._options.scroll);
        this._resizeDelay = parseInt(this._options.handleResize, 10) || 300;

        if (this._options.substractScroll !== null) {
            this._subtractScroll = this._options.substractScroll;
        } else {
            this._subtractScroll = this._scrollElement[0] !== window && !this._element.closest(this._scrollElement).length;
        }

        // Events
        this._onScroll = this._onScroll.bind(this);
        this._onResize = this._onResize.bind(this);
        this._subtractScroll && this._scrollElement.on('scroll', this._onScroll);
        this._options.handleResize && $(window).on('resize', this._onResize);
    }

    // ----------------------------------

    Copycat.prototype.update = function () {
        this._measure();
        this._element.css('transform', '').css(this._targetSize).offset(this._targetOffset);
        this._scrollPos = { top: this._scrollElement.scrollTop() || 0, left: this._scrollElement.scrollLeft() || 0 };

        return this;
    };

    Copycat.prototype.measurements = function () {
        return {
            targetOffset: this._targetOffset,
            myOffset: this._myOffset,
            targetSize: this._targetSize,
            mySize:  this._mySize,
            myTranslate: this._readTranslate()
        };
    };

    Copycat.prototype.destroy = function (keepPosition) {
        // Cancel timeouts
        this._resizeTimeout && clearTimeout(this._resizeTimeout);

        // Clear listeners
        this._scrollElement.off('scroll', this._onScroll);
        $(window).off('resize', this._onResize);

        if (!keepPosition) {
            this._element.css({
                top: '',
                left: '',
                transform: ''
            });
        }

        this._element = this._targetElement = this._scrollElement = null;
    };

    // --------------------

    Copycat.prototype._measure = function () {
        this._mySize = { width: this._element.outerWidth(), height: this._element.outerHeight() };
        this._myOffset = this._element.offset();

        this._targetSize = { width: this._targetElement.width(), height: this._targetElement.height() };
        this._targetOffset = this._targetElement.offset();

        return this;
    };

    Copycat.prototype._readTranslate = function (el) {
        var arr = this._matrixToArray(el.css('transform'));

        return {
            top: arr[5] || 0,
            left: arr[4] || 0
        };
    };

    Copycat.prototype._matrixToArray = function (str) {
        var arr = str.match(/(-?[0-9\.]+)/g) || [];

        return arr.map(function (str) { return Number(str); });
    };

    Copycat.prototype._onScroll = function () {
        var diffTop = this._scrollPos.top - this._scrollElement.scrollTop(),
            diffLeft = this._scrollPos.left - this._scrollElement.scrollLeft();

        this._element.css('transform', 'translate(' + diffLeft + 'px, ' + diffTop + 'px)');
    };

    Copycat.prototype._onResize = function () {
        if (this._resizeTimeout) {
            return;
        }

        this._resizeTimeout = setTimeout(this.update.bind(this), this._resizeDelay);
    };

    // -----------------------------------------------

    $.fn.copycat = function (target, options) {
        var instance;

        if (this.length > 1) {
            throw new Error('Copycat only works on one element');
        }

        instance = this.data('_copy_cat');

        // .copycat('measurements')
        if (target === 'measurements') {
            if (!instance) {
                throw new Error('Copycat was not initialized');
            }

            return instance.measurements();
        }

        // .copycat('update')
        if (target === 'update') {
            if (!instance) {
                throw new Error('Copycat was not initialized');
            }

            instance.update();
        // .copycat('destroy')
        } else if (target === 'destroy') {
            instance && instance.destroy(options);
        // .copycat(target, {})
        } else {
            if (!instance) {
                instance = new Copycat(this, target, options);
                this.data('_copy_cat', this);
            }

            instance.update();
        }

        return this;
    };

    return $;
}));
