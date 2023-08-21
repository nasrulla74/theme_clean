odoo.define('website_hotel_reservation.guestspicker', function (require) {
'use strict';

var publicWidget = require('web.public.widget');
var core = require('web.core');
var _t = core._t;

var timeout;

publicWidget.registry.websiteGuestpicker = publicWidget.Widget.extend({
    selector: '.eb-guestspicker',
    events: {
        'click .guestspicker': '_on_click_guestpicker',
        'click .plus, .minus': 'guestsPicker',
        'click': 'stopEventPro'
    },
    init: function(){
        this._super.apply(this, arguments);
    },
    start: function(){
        this._super.apply(this, arguments);
        this.guestsSum();
        this.guestsRooms();
        $(window).on('click', function(ev){
            $('.eb-guestspicker').removeClass('active')
        });
    },
    stopEventPro: function(event){
        event.stopPropagation()
    },
    _on_click_guestpicker: function(ev){
        this.$el.toggleClass('active');
        event.preventDefault()
    },
    guestsPicker: function(ev){
        var button = $(ev.target);
        var oldValue = button.parent().find("input").val();
        var max_value = parseFloat(button.parent().find("input").attr('max'));
        var min_value = parseFloat(button.parent().find("input").attr("min"));
        if (button.hasClass('plus') && max_value > 0) {
            if (oldValue < max_value) {
                var newVal = parseFloat(oldValue) + 1
            } else {
                newVal = oldValue
            }
        } else {
            if (oldValue > min_value) {
                var newVal = parseFloat(oldValue) - 1
            } else {
                newVal = min_value
            }
        }
        button.parent().find("input").val(newVal);
        this.guestsSum();
        this.guestsRooms();
        // if ($('form').hasClass('booking-search-form')) {
        //     eagle_booking_filters()
        // }
    },
    guestsSum: function(){
        var guests_button = this.$el.find('.guests-button');
        var arr = this.$el.find('.booking-guests');
        var guests = 0;
        for (var i = 0; i < arr.length; i++) {
            if (parseInt(arr[i].value, 10))
                guests += parseInt(arr[i].value, 10)
        }
        if (guests > 0) {
            var cardQty = this.$el.find(".gueststotal");
            cardQty.html(guests);
        }
        // $("#eagle_booking_guests").val(guests)
    },
    guestsRooms: function(){
        var guestsrooms_button = this.$el.find('.guests-rooms-button');
        var arr = this.$el.find('.booking-guestsrooms');
        var guests = 0;
        for (var i = 0; i < arr.length; i++) {
            if (parseInt(arr[i].value, 10))
                guests += parseInt(arr[i].value, 10)
        }
        if (guests > 0) {
            var cardQty = this.$el.find(".guestsroomstotal");
            cardQty.html(guests);
        }
        // $("#eagle_booking_guests").val(guests)
       
    }
});

});