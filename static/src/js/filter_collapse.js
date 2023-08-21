odoo.define('website_hotel_reservation.filter_collapse', function (require) {
'use strict';

var publicWidget = require('web.public.widget');
var core = require('web.core');
var _t = core._t;

	publicWidget.registry.FilterCollapse = publicWidget.Widget.extend({
	    selector: '.left-sidebar',
	    events: {
	    	'click .collapse-block-title': 'OnClickCollapseBlockTitle',
	    },
	    init:function(){
	    	this._super.apply(this, arguments);
	    },
	    start: function(){
	        return this._super.apply(this, arguments);
	    },
	    OnClickCollapseBlockTitle: function(ev){
	    	ev.preventDefault;
	        var speed = 300;
	        var thisItem = $(ev.currentTarget).parent(),
	            nextLevel = $(ev.currentTarget).next('.collection-collapse-block-content');
	        if (thisItem.hasClass('open')) {
	            thisItem.removeClass('open');
	            nextLevel.slideUp(speed);
	        }
	        else {
	            thisItem.addClass('open');
	            nextLevel.slideDown(speed);
	        }
	    }
	});

	publicWidget.registry.MobileFilterCollapse = publicWidget.Widget.extend({
	    selector: '.mobile-filter',
	    events: {
	    	'click': 'OnClickMobileFilter',
	    },
	    init:function(){
	    	this._super.apply(this, arguments);
	    },
	    start: function(){
	        return this._super.apply(this, arguments);
	    },
	    OnClickMobileFilter: function(ev){
	    	$('.left-sidebar, .top-filter-section').css("left","-1px");
	    }
	});

	publicWidget.registry.BackFilterCollapse = publicWidget.Widget.extend({
	    selector: '.left-sidebar .back-btn',
	    events: {
	    	'click': 'OnClickBackCollapse',
	    },
	    init:function(){
	    	this._super.apply(this, arguments);
	    },
	    start: function(){
	        return this._super.apply(this, arguments);
	    },
	    OnClickBackCollapse: function(ev){
	    	$('.left-sidebar, .top-filter-section').css("left","-365px");
	    }
	});

	publicWidget.registry.FilterFormBlock = publicWidget.Widget.extend({
	    selector: 'form.filter_form_block',
	    events: {
	    	'change input': 'OnChangeFilter',
	    },
	    init:function(){
	    	this._super.apply(this, arguments);
	    },
	    start: function(){
	        return this._super.apply(this, arguments);
	    },
	    OnChangeFilter: function(ev){
	    	this.$el.submit();
	    }
	});

});