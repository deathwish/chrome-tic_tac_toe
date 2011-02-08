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

	it('has an ai player controller', function(){
		  expect(controller.aiPlayerController()).toBeA(AIPlayerController);
    });

	it('does not have a result controller', function(){
		  expect(controller.resultController()).toBeFalsy();
    });

	it("has the ai player playing 'O'", function(){
		  expect(controller.aiPlayerController().piece()).toEqual('O');
	});

	describe('that has been shown', function(){
		var bcc;
		var tocc;
		beforeEach(function(){
			spyOn(controller.boardController(), "show");
			spyOn(controller.turnOrderController(), "show");
			spyOn(controller.aiPlayerController(), "show");
			addContentDiv();
			controller.show('content');
			waitsForAjax();
		});

		afterEach(function(){
			controller.hide();
			removeContentDiv();
		});

		it('has a result controller', function(){
			expect(controller.resultController()).toBeA(ResultController);
		});

		it('shows the game display', function(){
			expect($('game_display')).not.toBeNull();
			expect($('board_container')).not.toBeNull();
			expect($('turn_container')).not.toBeNull();
			expect($('ai_container')).not.toBeNull();
		});

		it('shows the board controller in the board_container div', function(){
			expect(controller.boardController().show).toHaveBeenCalledWith('board_container');
		});

		it('shows the turn order controller in the turn_container div', function(){
			expect(controller.turnOrderController().show).toHaveBeenCalledWith('turn_container');
		});

		it('shows the ai controller in the ai_container div', function(){
			expect(controller.aiPlayerController().show).toHaveBeenCalledWith('ai_container');
		});

		describe('and been hidden', function(){
			beforeEach(function(){
				spyOn(controller.boardController(), 'hide');
				spyOn(controller.turnOrderController(), 'hide');
				spyOn(controller.aiPlayerController(), 'hide');
				controller.hide();
			});

			it('hides the board controller', function(){
				expect(controller.boardController().hide).toHaveBeenCalled();
			});

			it('hides the turn order controller', function(){
				expect(controller.turnOrderController().hide).toHaveBeenCalled();
			});

			it('hides the ai controller', function(){
				expect(controller.aiPlayerController().hide).toHaveBeenCalled();
			});
		});

		// written against the DOM because there appear to be some spy issues
		// in this context.
		describe('after ending the game', function(){
			describe('with a draw', function(){
				beforeEach(function(){
					document.fire('board:drawn');
					waitsForAjax();
				});

				it('shows the result controller', function(){
					expect($('result_text')).not.toBeNull();
				});

				it('displays a draw', function(){
					expect($('result_text').innerHTML).toMatch('draw');
				});
			});

			describe('with a win by X', function(){
				beforeEach(function(){
					document.fire('board:winner', {piece: 'X'});
					waitsForAjax();
				});

				it('shows the result controller', function(){
					expect($('result_text')).not.toBeNull();
				});

				it('displays X', function(){
					expect($('result_text').innerHTML).toMatch('X');
				});
			});

			describe('with a win by O', function(){
				beforeEach(function(){
					document.fire('board:winner', {piece: 'O'});
					waitsForAjax();
				});

				it('displays O', function(){
					expect($('result_text').innerHTML).toMatch('O');
				});
			});
	   });
	});
});