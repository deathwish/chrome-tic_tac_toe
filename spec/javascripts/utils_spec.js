describe("the utility module", function(){
   describe("the getResourceUrl method", function(){
	   describe("when called from a web page", function(){
			it("should contain the url of the page", function(){
				expect(Utils.getResourceUrl("someresource.html")).toMatch(document.location.host);
			});

			it("should contain the resource requested", function(){
				expect(Utils.getResourceUrl("someresource.html")).toMatch("someresource.html");
			});

			it("should contain the protocol used", function(){
				expect(Utils.getResourceUrl("someresource.html")).toMatch(document.location.protocol);
			});
       });
	   describe("when called from a chrome extension", function(){
			beforeEach(function(){
				chrome = {
				   extension: {
					  getURL: function(res) {
						 return "chrome-extension://asdf/" + res;
					  }
				   }
				};
			});

			afterEach(function(){
				chrome = undefined;
			});

			it("should call chrome.extension.getURL", function(){
				  spyOn(chrome.extension, "getURL");
				  Utils.getResourceUrl("someresource.html");
				  expect(chrome.extension.getURL).toHaveBeenCalledWith("someresource.html");
			});
       });
   });
});