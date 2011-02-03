describe('the application class', function(){
	var app;
	beforeEach(function(){
		app = new Application();
	});

	it('has a game controller', function(){
		expect(app.gameController()).toBeA(GameController);
	});

	describe('after being booted', function(){
		beforeEach(function(){
			spyOn(app.gameController(), "show");
			app.boot();
		});

		it('shows the game controller', function(){
			expect(app.gameController().show).toHaveBeenCalledWith('content');
		});
	});
});