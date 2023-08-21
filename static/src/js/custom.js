odoo.define('website_hotel_reservation.custom', function (require) {
'use strict';

var publicWidget = require('web.public.widget');
var core = require('web.core');
var _t = core._t;

publicWidget.registry.websiteBookingHotelInfo = publicWidget.Widget.extend({
    selector: '.hotel_booking_info_page',
    events: {
        'DOMMouseScroll': 'onScrolling',
        'mousewheel': 'onScrolling',
        'click #searchBar ul.nav a[href^="#"]': 'OnClickSearchBar'
    },
    init: function(){
        this._super.apply(this, arguments);
    },
    start: function(){
        this.bg_images();
        this.zoom_gallary();
        this.slick_slider();
        return this._super.apply(this, arguments);
        // this.$el.bind('scroll', this.onScrolling);
        // this.$el.bind('scroll', this, onScrolling);
    },
    bg_images:function(){
        this.$el.find('.bg-top').parent().addClass('b-top');
        this.$el.find('.bg-bottom').parent().addClass('b-bottom');
        this.$el.find('.bg-center').parent().addClass('b-center');
        this.$el.find('.bg-left').parent().addClass('b-left');
        this.$el.find('.bg-right').parent().addClass('b-right');
        this.$el.find('.bg_size_content').parent().addClass('bg_size_content');
        this.$el.find('.bg-img').parent().addClass('bg-size');
        this.$el.find(".bg-img.blur-up" ).parent().addClass('blur-up lazyload');
        this.$el.find('.bg-img').each(function () {
            var el = $(this),
            src = el.attr('src'),
            parent = el.parent();
            parent.css({
                'background-image': 'url(' + src + ')',
                'background-size': 'cover',
                'background-position': 'center',
                'background-repeat': 'no-repeat',
                'display': 'block'
            });
            el.hide();
        });
    },
    zoom_gallary: function(){
        this.$el.find('.zoom-gallery').magnificPopup({
            delegate: 'a',
            type: 'image',
            closeOnContentClick: false,
            closeBtnInside: false,
            mainClass: 'mfp-with-zoom mfp-img-mobile',
            image: {
                verticalFit: true,
                titleSrc: function(item) {
                    return item.el.attr('title') + ' &middot;';
                }
            },
            gallery: {
                enabled: true
            },
            zoom: {
                enabled: true,
                duration: 300, // don't foget to change the duration also in CSS
                opener: function(element) {
                    return element.find('img');
                }
            }

        });
    },
    slick_slider: function(){
        this.$el.find('.slide-1').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            fade: true,
        });
    },
    onScrolling: function(){
        var contentwidth = jQuery(window).width();
        // console.log('==eleme===', $(event.target).position().top);
        if(contentwidth > 767){

            if ($('.o_header_standard').hasClass('o_header_is_scrolled')) {
                this.$el.find('#searchBar').addClass('sticky');
                this.$el.find('#searchBar').css({
                    'top': String($('.o_header_standard').position().top + 56)+'px',
                    'right': '15px',
                    'left': 'inherit'
                });
            }else{
                this.$el.find('#searchBar').removeClass('sticky');
                this.$el.find('#searchBar').removeAttr('style');
            }
        }
        this.onScrollingTab();
    },
    OnClickSearchBar: function(ev){
        var self = this;
            ev.preventDefault();
            $('body,html').animate({
                scrollTop: $(ev.target.hash).position().top + 420,
            }, 500, function() {
                self.onScrollingTab();
            } );
            
    },
    onScrollingTab: function(){
        var scrollLink = $('#searchBar ul.nav a[href^="#"]');
        var scrollbarLocation = $(window).scrollTop()
        scrollLink.each(function(index, el) {

            var sectionOffset = $(el.hash).offset().top - 215;

            if ( sectionOffset <= scrollbarLocation ) {
                $(el).parent().addClass('active');
                $(el).parent().siblings().removeClass('active');
            }
        });
    }

});

});
