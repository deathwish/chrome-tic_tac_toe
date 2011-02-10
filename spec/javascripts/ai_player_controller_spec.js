describe('an ai player controller', function(){
	var controller;
	var BoardControllerMock;

	beforeEach(function(){
		controller = new AIPlayerController();
		BoardControllerMock = { board: function() { return new Board("    X    "); } };
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

		describe('a call to the move method', function(){
			var board;
			var listener;
			beforeEach(function(){
				listener = jasmine.createSpy();
				spyOn(BoardControllerMock, 'board').andCallThrough();
				document.observe('board:clicked', listener);
			});

			afterEach(function(){
				document.stopObserving('board:clicked', listener);
			});

			describe("on a board with open spaces", function(){
				beforeEach(function(){
					spyOn(controller.player(), 'move').andReturn([0, 0]);
					controller.move(BoardControllerMock);
				});

				it('retrieves the board from the controller', function(){
					expect(BoardControllerMock.board).toHaveBeenCalled();
				});

				it('calls the ai players move method with a board', function(){
					expect(controller.player().move.mostRecentCall.args[0]).toBeA(Board);
				});

			    it('fires a board:clicked event with the coordinates provided by the ai and the controller', function(){
					expect(listener).toHaveBeenCalled();
					expect(listener.mostRecentCall.args[0].memo.x).toEqual(0);
					expect(listener.mostRecentCall.args[0].memo.y).toEqual(0);
					expect(listener.mostRecentCall.args[0].memo.controller).toEqual(BoardControllerMock);
				});
			});

			describe("on a board with no free spaces", function(){
				beforeEach(function(){
					spyOn(controller.player(), 'move').andReturn(null);
					controller.move(BoardControllerMock);
				});
				it('does not fire a board:clicked event', function(){
					expect(listener).not.toHaveBeenCalled();
				});
			});
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
				var memo;
				beforeEach(function(){
					spyOn(controller.player(), 'move').andReturn([0, 0]);
					memo = {x: 1, y: 1, controller: BoardControllerMock };
					spyOn(controller, 'move');
				});

				describe('with the opponents piece', function(){
					beforeEach(function(){
						memo.piece = 'O';
						document.fire('board:moved', memo);
					});

					it('calls move()', function(){
						expect(controller.move).toHaveBeenCalled();
					});
				});

				describe("with the ai's piece", function(){
					beforeEach(function(){
						memo.piece = 'X';
						document.fire('board:moved', memo);
					});

					it('does not call move()', function(){
						expect(controller.move).not.toHaveBeenCalled();
					});
				});
			});
		});
	});
});