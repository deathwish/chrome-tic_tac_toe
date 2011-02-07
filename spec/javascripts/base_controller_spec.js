describe('the controller base', function(){
	var controller;
	beforeEach(function(){
		controller = new BaseController();
		window.TestController = Class.create(BaseController, {});
		$$('body')[0].insert({bottom: new Element('div', {id: 'content'})});
	});

	afterEach(function(){
	  window.TestController = undefined;
	  $('content').remove();
	});

	describe('the show method', function(){
		beforeEach(function(){
			spyOn(Ajax, 'Updater').andReturn(true);
			spyOn(Utils, 'getResourceUrl').andCallThrough();
			controller.show('content');
		});
		it('should make an AJAX call when show is called', function(){
			expect(Ajax.Updater).toHaveBeenCalled();
		});

		it('should update the element provided', function(){
			expect(Ajax.Updater.mostRecentCall.args[0]).toBeA(Element);
		});

		it('should use getResourceUrl', function(){
			expect(Utils.getResourceUrl).toHaveBeenCalled();
		});

		it('should request base.html', function(){
			expect(Ajax.Updater.mostRecentCall.args[1]).toMatch('base.html');
		});

		it('should pass a callback for onComplete', function(){
			expect(Ajax.Updater.mostRecentCall.args[2]).not.toBeNull();
		});

		describe('of a subclass', function(){
			beforeEach(function(){
				controller = new TestController();
				controller.show('something');
			});

			it('should request test.html', function(){
				expect(Ajax.Updater.mostRecentCall.args[1]).toMatch('test.html');
			});
		});
	});

	describe('hide method', function(){
		it('unregisters all event listeners added with observe', function(){
			  var handler = function(){};
			  spyOn(document, 'stopObserving').andCallThrough();
			  spyOn($('content'), 'stopObserving').andCallThrough();
			  controller.observe('some:event1', handler);
			  controller.observe('some:event2', handler, 'content');
			  controller.hide();
			  expect(document.stopObserving).toHaveBeenCalledWith('some:event1', handler);
			  expect($('content').stopObserving).toHaveBeenCalledWith('some:event2', handler);
		});
	});

	describe('the className method', function(){
		it('should return "BaseController" when called on a BaseController', function(){
			  expect(controller.className()).toEqual("BaseController");
		});
		it('should return "TestController" when called on a TestController', function(){
			  var tc = new TestController();
			  expect(tc.className()).toEqual("TestController");
		});
	});

	describe('the observe method', function(){
		var handler = function(){};

		describe('called without an element', function(){
			beforeEach(function(){
				spyOn(document, 'observe');
				controller.observe('some:event', handler);
			});

			it('observes the provided event on the document', function(){
				expect(document.observe).toHaveBeenCalledWith('some:event', handler);
			});
		});

		describe('called with an element', function(){
			beforeEach(function(){
				spyOn($('content'), 'observe');
				controller.observe('some:event', handler, 'content');
			});

			it('observes the provided event on the element', function(){
				expect($('content').observe).toHaveBeenCalledWith('some:event', handler);
			});
		});
	});
});