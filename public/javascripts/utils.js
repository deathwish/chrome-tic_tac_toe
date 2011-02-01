var Utils = {
   getResourceUrl: function(res)
   {
	  if(chrome && chrome.extension && chrome.extension.getURL)
		 return chrome.extension.getURL(res);
	  return document.location.protocol + '//' + document.location.host + '/' + res;
   }
};