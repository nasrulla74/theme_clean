odoo.define('website_hotel_reservation.slideshow', function (require) {
'use strict';

var publicWidget = require('web.public.widget');
var core = require('web.core');
var _t = core._t;

var timeout;

publicWidget.registry.websiteBookingSlideshow = publicWidget.Widget.extend({
    selector: '.slideshowHotels',
    init: function(){
        this._super.apply(this, arguments);
    },
    start: function(){
        this.$el.desoSlide({
            thumbs: this.$el.parent().find('.slideshow_hotels_thumbs li > a'),
            effect: 'none',
            overlay: 'hover',
        });
        return this._super.apply(this, arguments);
    }
});
});