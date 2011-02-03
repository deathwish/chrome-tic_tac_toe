describe('a game controller', function(){
	var controller;
	beforeEach(function(){
		controller = new GameController();
	});

	it('has a board controller', function(){
		  expect(controller.boardController()).toBeA(BoardController);
    });

	it('has a turn order controller', function(){
		  expect(controller.turnOrderController()).toBeA(TurnOrderController);
    });

	describe('that has been shown', function(){
		var bcc;
		var tocc;
		beforeEach(function(){
			spyOn(controller.boardController(), "show");
			spyOn(controller.turnOrderController(), "show");
			addContentDiv();
			controller.show('content');
			waitsForAjax();
		});

		afterEach(function(){
			removeContentDiv();
		});

		it('shows the game display', function(){
			expect($('game_display')).not.toBeNull();
		});

		it('shows the board controller in the board_container div', function(){
			expect(controller.boardController().show).toHaveBeenCalledWith('board_container');
		});

		it('shows the turn order controller in the turn_container div', function(){
			expect(controller.turnOrderController().show).toHaveBeenCalledWith('turn_container');
		});

	});
});