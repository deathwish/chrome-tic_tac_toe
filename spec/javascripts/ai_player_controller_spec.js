describe('an ai player controller', function(){
	var controller;
	beforeEach(function(){
		controller = new AIPlayerController();
	});

	it('does not have an ai player', function(){
		expect(controller.player()).toBeFalsy();
	});

	it('has a piece', function(){
		expect(controller.piece()).toBeFalsy();
	});

	describe('that has had its piece set', function(){
		beforeEach(function(){
			controller.setPiece('X');
		});

		it('has an ai player', function(){
			expect(controller.player()).toBeA(AIPlayer);
		});

		it('has a piece', function(){
			expect(controller.piece()).toEqual('X');
		});

		it("constructs its player with its piece", function(){
			expect(controller.player().piece()).toEqual('X');
		});

		describe('that has been shown', function(){
			beforeEach(function(){
				addContentDiv();
				controller.show('content');
				waitsForAjax();
			});

			afterEach(function(){
				controller.hide();
				removeContentDiv();
			});

			it('adds the ai_player div', function(){
				expect($('ai_player')).not.toBeNull();
			});

			describe('after receiving a board:moved event', function(){
				var listener;
				var memo;

				beforeEach(function(){
					spyOn(controller.player(), 'move').andReturn([0, 0]);
					listener = jasmine.createSpy();
					document.observe('board:clicked', listener);
					memo = {x: 1,
							y: 1,
							controller: {
							   board: function() {
								  return new Board("    X    ");
							   }
							}
						   };
					spyOn(memo.controller, 'board').andCallThrough();
				});

				afterEach(function(){
					document.stopObserving('board:clicked', listener);
				});

				describe('with the opponents piece', function(){
					beforeEach(function(){
						memo.piece = 'O';
						document.fire('board:moved', memo);
					});

					it('retrieves the board from the controller', function(){
						expect(memo.controller.board).toHaveBeenCalled();
					});

					it('calls the ai players move method with a board', function(){
						expect(controller.player().move.mostRecentCall.args[0]).toBeA(Board);
					});

					it('fires a board:clicked event with the coordinates provided by the ai and the controller', function(){
						expect(listener).toHaveBeenCalled();
						expect(listener.mostRecentCall.args[0].memo.x).toEqual(0);
						expect(listener.mostRecentCall.args[0].memo.y).toEqual(0);
						expect(listener.mostRecentCall.args[0].memo.controller).toEqual(memo.controller);
					});
				});

				describe("with the ai's piece", function(){
					beforeEach(function(){
						memo.piece = 'X';
						document.fire('board:moved', memo);
					});

					it('does not fire a board:clicked event', function(){
						expect(listener).not.toHaveBeenCalled();
					});
				});
			});
		});
	});
});