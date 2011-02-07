describe('a result controller', function(){
	var controller;

	beforeEach(function(){
		addContentDiv();
		controller = new ResultController();
	});

	afterEach(function(){
		removeContentDiv();
	});

	it('does not have a game controller', function(){
		expect(controller.gameController()).toBeFalsy();
	});

	['X', 'O'].each(function(piece){
		describe("provided a win by '" + piece  + "'", function(){
			beforeEach(function(){
				controller.setWinner(piece);
			});

			describe('after being shown', function(){
				beforeEach(function(){
					controller.show('content');
					waitsForAjax();
				});

				afterEach(function(){
					controller.hide();
					waitsForAjax();
				});

				it('adds the result_display div', function(){
					expect($('result_display')).not.toBeNull();
				});

				it('displays "The only winning move is not to play."', function(){
					expect($('content').innerHTML).toMatch("The only winning move is not to play.");
				});

				it('displays "Which is apt, since ' + piece + ' has won."', function(){
					expect($('content').innerHTML).toMatch("Which is apt, since " + piece + " has won.");
				});

				describe('when the "new game" link is clicked', function(){
					beforeEach(function(){
						spyOn(controller.gameController(), 'show');
						spyOn(controller, 'hide');
						$('new_game_link').click();
					});

					it('has a game controller', function(){
						expect(controller.gameController()).toBeA(GameController);
					});

					it('hides itself', function(){
						expect(controller.hide).toHaveBeenCalled();
					});

					it('shows the game controller in the content area', function(){
						expect(controller.gameController().show).toHaveBeenCalledWith('content');
					});
				});
			});
		});
	}, this);

	describe('provided a draw', function(){
		describe('after being shown', function(){
			beforeEach(function(){
				controller.show('content');
				waitsForAjax();
			});

			it('displays "And the best you can hope for is a draw."', function(){
				expect($('content').innerHTML).toMatch("And the best you can hope for is a draw.");
			});
		});
	});
});