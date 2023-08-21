odoo.define('website_hotel_reservation.booking_datepicker', function (require) {
'use strict';

var publicWidget = require('web.public.widget');
var core = require('web.core');
var _t = core._t;

var timeout;

publicWidget.registry.websiteBookingDatepicker = publicWidget.Widget.extend({
    selector: '#eagle_booking_datepicker',
    events: {
        'change': '_onCalendar',
        'show.daterangepicker': '_on_show_datepicker',
        'apply.daterangepicker': '_on_apply_daterangepicker'
    },
    init: function(){
        this.eb_calendar_min_date = new Date();
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
        this.eb_calendar_max_date = moment(this.eb_calendar_min_date).add(this.eb_js_settings.eb_calendar_availability_period, 'M').endOf('month');
        this.eagle_booking_date_format = this.eb_js_settings.eagle_booking_date_format.toUpperCase();
        this.eb_signle_room = !1;
        this._super.apply(this, arguments);

    },
    start: function(){
        var self = this;
        var default_date = this.$el.val() || false;
        var eagle_booking_checkin = this.$el.closest('.search-form').find("#eagle_booking_checkin").val() || false;
        var eagle_booking_checkout = this.$el.closest('.search-form').find("#eagle_booking_checkout").val() || false;
        if(!default_date){
            default_date = moment(new Date()).format(self.eagle_booking_date_format) +' TO '+ moment(new Date()).add(1,'days').format(self.eagle_booking_date_format);
            $('#eagle_booking_checkin').val(moment(new Date()).format(self.eagle_booking_date_format));
            $('#eagle_booking_checkout').val(moment(new Date()).add(1,'days').format(self.eagle_booking_date_format));
        }
        // if()
        this.$el.val(default_date);
        
        this.$el.daterangepicker({
            autoUpdateInput: !1,
            autoApply: !0,
            alwaysShowCalendars: !0,
            linkedCalendars: !0,
            startDate: eagle_booking_checkin || moment(new Date()).format(self.eagle_booking_date_format),
            endDate: eagle_booking_checkout || moment(new Date()).add(1,'days').format(self.eagle_booking_date_format),
            isInvalidDate: function(date) {
                if (typeof eb_booked_dates !== 'undefined' && eb_booked_dates != '') {
                    return !!(eb_booked_dates.indexOf(date.format('YYYY/MM/DD')) > -1)
                }
            },
            minDate: self.eb_calendar_min_date,
            maxDate: self.eb_calendar_max_date,
            locale: {
                format: self.eagle_booking_date_format,
                separator: "&#8594;",
                "daysOfWeek": [self.eb_js_settings.eb_calendar_sunday, 
                               self.eb_js_settings.eb_calendar_monday, 
                               self.eb_js_settings.eb_calendar_tuesday, 
                               self.eb_js_settings.eb_calendar_wednesday, 
                               self.eb_js_settings.eb_calendar_thursday, 
                               self.eb_js_settings.eb_calendar_friday, 
                               self.eb_js_settings.eb_calendar_saturday, ],
                "monthNames": [self.eb_js_settings.eb_calendar_january, 
                               self.eb_js_settings.eb_calendar_february, 
                               self.eb_js_settings.eb_calendar_march, 
                               self.eb_js_settings.eb_calendar_april, 
                               self.eb_js_settings.eb_calendar_may, 
                               self.eb_js_settings.eb_calendar_june, 
                               self.eb_js_settings.eb_calendar_july, 
                               self.eb_js_settings.eb_calendar_august, 
                               self.eb_js_settings.eb_calendar_september, 
                               self.eb_js_settings.eb_calendar_october, 
                               self.eb_js_settings.eb_calendar_november, 
                               self.eb_js_settings.eb_calendar_december, ],
                "firstDay": 1
            },

            parentEl: $('footer').last().parent()
        }, function(start, end, label) {
            if(end.format('MM/DD/YYYY') == start.format('MM/DD/YYYY')){
                this.endDate = end.add(1, 'days');
            }
        });
        return this._super.apply(this, arguments);  
    },
    _on_show_datepicker: function(){
        var self = this;
        var live_checkin = $('#eagle_booking_checkin').val();
        var live_checkout = $('#eagle_booking_checkout').val();
        if (live_checkin != '' && live_checkout != '') {
            var eagle_booking_nights_div = $('<div class="booking-nights">' + live_checkin + '&nbsp;' + ' &#8594; ' + '&nbsp' + live_checkout + ' (' + self.eagle_booking_get_nights() + ' ' + self.eb_js_settings.eb_booking_nights + ')</div>');
            $(".booking-nights").remove();
            $(".daterangepicker").append(eagle_booking_nights_div)
        }
        $(document).on('mouseenter', '.start-date', function() {
            live_checkin = $(this).attr('data-date');
            live_checkin = moment(live_checkin, 'MM/DD/YYYY').format(self.eb_js_settings.eagle_booking_date_format.toUpperCase());
            $('#eagle_booking_checkin').val(live_checkin)
        })
        $(document).on('mouseenter', '.in-range', function() {
            live_checkout = $(this).attr('data-date');
            live_checkout = moment(live_checkout, 'MM/DD/YYYY').format(self.eb_js_settings.eagle_booking_date_format.toUpperCase());
            $('#eagle_booking_checkout').val(live_checkout)
        })
        $(document).on('mouseenter', '.start-date, .in-range', function() {
            var eagle_booking_nights_div = $('<div class="booking-nights">' + live_checkin + '&nbsp;' + '&#8594;' + '&nbsp' + live_checkout + ' (' + self.eagle_booking_get_nights() + ' ' + self.eb_js_settings.eb_booking_nights + ')</div>');
            $(".booking-nights").remove();
            $(".daterangepicker").append(eagle_booking_nights_div)
        })
    },
    eagle_booking_get_nights: function(){
        var self = this;
        var eagle_booking_checkin = $('#eagle_booking_checkin').val();
        var eagle_booking_checkout = $('#eagle_booking_checkout').val();
        var eagle_booking_start_date = moment(eagle_booking_checkin, self.eb_js_settings.eagle_booking_date_format.toUpperCase()).format('YYYY-MM-DD');
        var eagle_booking_end_date = moment(eagle_booking_checkout, self.eb_js_settings.eagle_booking_date_format.toUpperCase()).format('YYYY-MM-DD');
        var booking_nights = (new Date(eagle_booking_end_date)) - (new Date(eagle_booking_start_date));
        var eagle_booking_nights_number = booking_nights / (1000 * 60 * 60 * 24);
        if (eagle_booking_nights_number < 0) {
            var eagle_booking_nights_number = '0'
        }
        return eagle_booking_nights_number
    },
    _on_apply_daterangepicker: function(){
        var checkin = this.$el.data('daterangepicker').startDate.format(this.eagle_booking_date_format);
        var checkout = this.$el.data('daterangepicker').endDate.format(this.eagle_booking_date_format);
        this.$el.val(checkin + " " + " " + 'TO' + " " + " " + checkout);
        $('#eagle_booking_checkin').val(checkin);
        $('#eagle_booking_checkout').val(checkout);
        if ($("div").hasClass("search-filters")) {
            // eagle_booking_filters()
        }
        if ($("div").hasClass("search-filters") || $("div").hasClass("calendar")) {
            this.eagle_booking_get_nights()
        }
        if (this.eb_signle_room == !0) {
            var i, eb_booked_date;
            for (i = 0; i < eb_booked_dates.length; i++) {
                eb_booked_date = moment(eb_booked_dates[i]).format('YYYY/MM/DD');
                var checkin_new = this.$el.data('daterangepicker').startDate.format('YYYY-MM-DD');
                var checkout_new = this.$el.data('daterangepicker').endDate.format('YYYY-MM-DD');
                if (moment(eb_booked_date).isBetween(checkin_new, checkout_new)) {
                    this.$el.data('daterangepicker').setStartDate(checkout);
                    this.$el.val("").focus();
                    break
                }
            }
        }
    }
});

});