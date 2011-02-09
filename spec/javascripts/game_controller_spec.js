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

	it("has not set the ai player's piece", function(){
		expect(controller.aiPlayerController().piece()).toBeFalsy();
	});

	describe("the setupAI method", function(){
		beforeEach(function(){
			spyOn(controller.aiPlayerController(), 'setPiece');
		});
	});

	describe('the startAI method', function(){
		describe('when the RNG returns < 0.5', function(){
			beforeEach(function(){
				spyOn(Math, 'random').andReturn(0.4);
				spyOn(controller.aiPlayerController(), 'move').andReturn(undefined);
				controller.startAI();
			});

			it('does not tell the ai controller to move', function(){
				expect(controller.aiPlayerController().move).not.toHaveBeenCalledWith(controller.boardController());
			});
		});

		describe('when the RNG returns >= 0.5', function(){
			beforeEach(function(){
				spyOn(Math, 'random').andReturn(0.5);
				spyOn(controller.aiPlayerController(), 'move').andReturn(undefined);
				controller.startAI();
			});

			it('tells the ai controller to move', function(){
				expect(controller.aiPlayerController().move).toHaveBeenCalledWith(controller.boardController());
			});
		});
	});

	describe('that has been shown', function(){
		var bcc;
		var tocc;
		beforeEach(function(){
			spyOn(controller.boardController(), "show").andCallThrough();
			spyOn(controller.turnOrderController(), "show").andCallThrough();
			spyOn(controller.aiPlayerController(), "show").andCallThrough();
			spyOn(controller, 'startAI').andCallThrough();
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
			expect(controller.boardController().show.mostRecentCall.args[0]).toEqual('board_container');
		    });

		it('shows the turn order controller in the turn_container div', function(){
			expect(controller.turnOrderController().show.mostRecentCall.args[0]).toEqual('turn_container');
		});

		it('shows the ai controller in the ai_container div', function(){
			expect(controller.aiPlayerController().show.mostRecentCall.args[0]).toEqual('ai_container');
		});

		it('starts the ai', function(){
			expect(controller.startAI).toHaveBeenCalled();
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