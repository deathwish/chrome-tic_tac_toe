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
	   var view = this.className().underscore().gsub("_controller", "") + ".html";
	   new Ajax.Updater($(el), Utils.getResourceUrl(view), {onComplete: this.onComplete});
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