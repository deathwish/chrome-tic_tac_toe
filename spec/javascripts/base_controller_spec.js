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

	describe('the className method', function(){
		it('should return "BaseController" when called on a BaseController', function(){
			  expect(controller.className()).toEqual("BaseController");
		});
		it('should return "TestController" when called on a TestController', function(){
			  var tc = new TestController();
			  expect(tc.className()).toEqual("TestController");
		});
	});
});