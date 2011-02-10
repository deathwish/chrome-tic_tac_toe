/*
 * Copyright (c) 2011, Lance Cooper (lance.m.cooper@gmail.com)
 * See the included COPYING for licencing information.
 */

//= require <prototype>
//= require "utils"

var BaseController = Class.create({
	initialize: function()
	{
	   this.onComplete = this.onComplete.bind(this);
	   this.listeners = [];
	},
	className: function()
	{
	   for(var prop in window)
	   {
		  if(window.propertyIsEnumerable(prop) && window[prop] == this.constructor)
			 return prop;
	   }
	   return null;
	},
	show: function(el)
	{
	   var callback = arguments[1];
	   var view = this.className().underscore().gsub("_controller", "") + ".html";
	   new Ajax.Updater($(el), Utils.getResourceUrl(view), {
						   onComplete: (function(transport) {
							  this.onComplete(transport);
							  if(callback && callback.onComplete)
								 callback.onComplete(transport);
						   }).bind(this)});
	},
	hide: function()
	{
	   this.listeners.each(function(listener){
			listener.element.stopObserving(listener.event, listener.callback);
	   });
	},
	onComplete: function(transport)
	{
	},
	observe: function(event, callback, element)
	{
	   var el = document;
	   if(element)
		  el = $(element);
	   el.observe(event, callback);
	   this.listeners.push({element: el, event: event, callback: callback});
	}
});