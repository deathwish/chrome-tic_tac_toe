/*
 * Copyright (c) 2011, Lance Cooper (lance.m.cooper@gmail.com)
 * See the included COPYING for licencing information.
 */

var Utils = {
   getResourceUrl: function(res)
   {
	  if(chrome && chrome.extension && chrome.extension.getURL)
		 return chrome.extension.getURL(res);
	  return document.location.protocol + '//' + document.location.host + '/' + res;
   }
};