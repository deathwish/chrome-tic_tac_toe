//= require <prototype>
//= require "utils"

var BaseController = Class.create({
	initialize: function()
	{
	   this.onComplete = this.onComplete.bind(this);
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
	onComplete: function(transport)
	{
	}
});