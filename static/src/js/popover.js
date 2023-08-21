odoo.define('website_hotel_reservation.popover', function (require) {
'use strict';

var publicWidget = require('web.public.widget');
var core = require('web.core');
var _t = core._t;

var timeout;

publicWidget.registry.websiteBookingPopover = publicWidget.Widget.extend({
    selector: '[data-toggle="popover"]',
    init: function(){
        this._super.apply(this, arguments);
    },
    start: function(){
        this.$el.popover({
            html: !0,
            offset: '0 10px'
        });
        return this._super.apply(this, arguments);
    }
});

});