odoo.define('website_hotel_reservation.search_bar', function (require) {
'use strict';

var publicWidget = require('web.public.widget');
var core = require('web.core');
var _t = core._t;

var timeout;

	publicWidget.registry.websiteBookingSearchBar = publicWidget.Widget.extend({
    selector: 'form#search-form',
    events: {
        'submit': '_onSubmitForm',
        'click .search_near_me_location': 'search_near_city'
    },
    init: function(){
    	this.eb_js_settings = {"eb_booking_type":"builtin",
        "eagle_booking_date_format":"dd\/mm\/yyyy",
        "eb_custom_date_format":"",
        "eb_terms_conditions":"1",
        "eb_calendar_availability_period":"5",
        "eb_room_slider_autoplay":"1",
        "eagle_booking_price_range_min":"29.9",
        "eagle_booking_price_range_max":"199",
        "eb_decimal_numbers":"0",
        "eagle_booking_price_range_default_min":"1",
        "eagle_booking_price_range_default_max":"700",
        "eb_discount_text":"Discount",
        "eb_price_range_currency":"\u20ac",
        "eb_currency_position":"before",
        "eb_booking_nights":"Booking Nights",
        "eb_calendar_sunday":"Su",
        "eb_calendar_monday":"Mo",
        "eb_calendar_tuesday":"Tu",
        "eb_calendar_wednesday":"We",
        "eb_calendar_thursday":"Th",
        "eb_calendar_friday":"Fr",
        "eb_calendar_saturday":"Sa",
        "eb_calendar_january":"January",
        "eb_calendar_february":"February",
        "eb_calendar_march":"March",
        "eb_calendar_april":"April",
        "eb_calendar_may":"May",
        "eb_calendar_june":"June",
        "eb_calendar_july":"July",
        "eb_calendar_august":"August",
        "eb_calendar_september":"September",
        "eb_calendar_october":"October",
        "eb_calendar_november":"November",
        "eb_calendar_december":"December",
        "eb_magnific_close":"Close (Esc)",
        "eb_magnific_loading":"Loading...",
        "eb_magnific_previous":"Previous (Left arrow key)",
        "eb_magnific_next":"Next (Right arrow key)",
        "eb_magnific_counter":"of"};
    	this._super.apply(this, arguments);
    },
    start: function(){
    	return this._super.apply(this, arguments);	
    }, 
    _onSubmitForm: function(e){
    	var eagle_booking_dates = this.$el.find("#eagle_booking_datepicker");
        if (eagle_booking_dates.val() === '') {
            e.preventDefault();
            eagle_booking_dates.click()
        } else {
            this.eb_button_loading('eb_search_form');
            var eb_booking_type = this.eb_js_settings.eb_booking_type;
            var eb_custom_date_format = this.eb_js_settings.eb_custom_date_format;
            var eb_date_format = this.eb_js_settings.eagle_booking_date_format.toUpperCase();
            var eb_output_checkin = this.$el.find('#eagle_booking_checkin').val();
            var eb_output_checkout = this.$el.find('#eagle_booking_checkout').val();
            if (eb_booking_type === 'builtin') {
                if (this.$el.hasClass('room-booking-form')) {
                    var eb_output_format = 'MM/DD/YYYY'
                } else {
                    var eb_output_format = 'MM-DD-YYYY'
                }
            } else if (eb_booking_type === 'booking') {
                var eb_output_format = 'YYYY-MM-DD'
            } else if (eb_booking_type === 'airbnb') {
                var eb_output_format = 'MM-DD-YYYY'
            } else if (eb_booking_type === 'tripadvisor') {
                var eb_output_format = 'MM-DD-YYYY'
            } else if (eb_booking_type === 'custom') {
                var eb_output_format = eb_custom_date_format
            }
            var eb_output_checkin_formated = moment(eb_output_checkin, eb_date_format).format(eb_output_format);
            var eb_output_checkout_formated = moment(eb_output_checkout, eb_date_format).format(eb_output_format);
            this.$el.find('#eagle_booking_checkin').val(eb_output_checkin_formated);
            this.$el.find('#eagle_booking_checkout').val(eb_output_checkout_formated)
            this.eb_button_loading('eb_search_form', 'hide');
        }
    },
    eb_button_loading: function(eb_button_id, eb_button_action) {
            var eb_button = $('#' + eb_button_id);
            var eb_loader_dom = '<span class="eb-btn-loader"><span class="eb-spinner spinner1"></span><span class="eb-spinner spinner2"></span><span class="eb-spinner spinner3"></span><span class="eb-spinner spinner4"></span><span class="eb-spinner spinner5"></span></span>';
            if (eb_button_action === 'hide') {
                eb_button.find('.eb-btn-loader').remove();
                eb_button.find('.eb-btn-text').show();
                eb_button.css('pointer-events', '');
                eb_button.blur()
            } else {
                eb_button.append(eb_loader_dom);
                eb_button.find('.eb-btn-text').hide();
                eb_button.css('pointer-events', 'none')
            }
            $(window).on("unload", function(e) {
                $(window).unbind('unload')
			    alert("call");
			    console.log("this will be triggered");
			});
    },
    search_near_city: function(){
    	if (navigator.geolocation) {
		    navigator.geolocation.getCurrentPosition(this.showPosition);
		} else {
		    console.log("not support ...")
		}
    },
    showPosition: function(position){
    	var latitude = position.coords.latitude;
    	var longitude = position.coords.longitude;
    }
    
 });


});