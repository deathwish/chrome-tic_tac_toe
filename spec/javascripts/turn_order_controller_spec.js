describe('a turn order controller', function(){
	var controller;
	beforeEach(function(){
		controller = new TurnOrderController();
	});

	it('should have a turn order', function(){
		expect(controller.turnOrder()).toBeA(TurnOrder);
	});

	describe('that has been shown', function(){
		beforeEach(function(){
			addContentDiv();
			controller.show('content');
			waitsForAjax();
		});

		afterEach(function(){
			removeContentDiv();
		});

		it("shows the turn order display.", function(){
			expect($('turn_order')).not.toBeNull();
		});

		describe("and received a board:moved event", function(){
			beforeEach(function(){
				spyOn(controller.turnOrder(), "turn");
				document.fire("board:moved", {});
			});

			it("moves the turn order", function(){
				expect(controller.turnOrder().turn).toHaveBeenCalled();
			});
		});

		describe("and received a board:clicked event", function(){
			var board_controller;
			beforeEach(function(){
				board_controller = {
				   move: function(x, y, value){ return true; }
				};
				spyOn(board_controller, "move");
				document.fire("board:clicked", {x: 0, y: 1, controller: board_controller});
			});

			it("makes a move on the board with the current piece", function(){
				expect(board_controller.move).toHaveBeenCalledWith(0, 1, "X");
			});
		});
	});
});