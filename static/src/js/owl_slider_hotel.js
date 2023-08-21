odoo.define('website_hotel_reservation.owl_slider_hotel', function (require) {
'use strict';

var publicWidget = require('web.public.widget');
var core = require('web.core');
var _t = core._t;

var timeout;

publicWidget.registry.websiteBookingOwlSlider = publicWidget.Widget.extend({
    selector: '.owl-carousel',
    init: function(){
        this._super.apply(this, arguments);
    },
    start: function(){
        this.$el.owlCarousel({
            center: true,
            items:2,
            loop:true,
            margin:10,
            dots: false,
            navText: ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
            responsive:{
                0:{
                        items:1,
                        nav:true
                    },
                    600:{
                        items:1,
                        nav:false
                    },
                    1000:{
                        items:2,
                        nav:true,
                    }
            }
        });
        return this._super.apply(this, arguments);
    }
});
});