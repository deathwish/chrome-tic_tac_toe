/*
 * Copyright (c) 2011, Lance Cooper (lance.m.cooper@gmail.com)
 * See the included COPYING for licencing information.
 */

describe("a board controller", function(){
   var controller;
   beforeEach(function(){
      controller = new BoardController();
	  addContentDiv();
   });

   afterEach(function(){
	  removeContentDiv();
   });

   it('should show the board after being shown.', function(){
		 controller.show('content');
		 waitsForAjax();
		 runs(function(){
			expect($('game_board')).not.toBeNull();
		 });
   });

   it("should have a board", function(){
		 expect(controller.board()).not.toBeNull();
		 expect(controller.board()).toBeA(Board);
   });

   describe("that has been shown", function(){
		beforeEach(function(){
			runs(function(){
				controller.show('content');
			});
			waitsForAjax();
		});

		afterEach(function(){
			controller.hide();
		});

		describe('after successfully placing a piece', function(){
			var listener;
			beforeEach(function(){
				listener = jasmine.createSpy();
				spyOn(controller.board(), 'move').andReturn(true);
				document.observe('board:moved', listener);
				controller.move(0, 0, 'X');
			});

			afterEach(function(){
				document.stopObserving('board:moved', listener);
			});

			it('should fire a board:moved event', function(){
				expect(listener).toHaveBeenCalled();
			});

			it('should report the piece that was placed', function(){
				expect(listener.mostRecentCall.args[0].memo.piece).toEqual('X');
			});

			it('should report the position that was occupied', function(){
				var ev = listener.mostRecentCall.args[0];
				expect(ev.memo.x).toEqual(0);
				expect(ev.memo.y).toEqual(0);
			});

			it('should provide a reference to itself', function(){
				var ev = listener.mostRecentCall.args[0];
				expect(ev.memo.controller).toEqual(controller);
			});

			it("should update the display", function(){
			  runs(function(){
				var el = $('game_board').down('tr', 0).down('td', 0);
				expect(el.innerHTML).toEqual("X");
			});
		});
		});

		describe('after unsuccessfully placing a piece', function(){
			var listener;
			beforeEach(function(){
				listener = jasmine.createSpy();
				spyOn(controller.board(), 'move').andReturn(false);
				document.observe('board:moved', listener);
				controller.move(0, 0, 'X');
			});

			afterEach(function(){
				document.stopObserving('board:moved', listener);
			});

			it('should not fire an event', function(){
				expect(listener).not.toHaveBeenCalled();
			});

			it("should not update the display", function(){
			  runs(function(){
				var el = $('game_board').down('tr', 0).down('td', 0);
				expect(el.innerHTML).not.toEqual("X");
			  });
			});
		});

		describe('after making a winning move', function(){
			var listener;
			beforeEach(function(){
				listener = jasmine.createSpy();
				spyOn(controller.board(), 'winner').andReturn('X');
				document.observe('board:winner', listener);
				controller.move(0, 0, 'O');
			});

			afterEach(function(){
				document.stopObserving('board:winner', listener);
			});

			it('fires a board:winner event', function(){
				expect(listener).toHaveBeenCalled();
			});

			it("provides the winner in the event", function(){
				expect(listener.mostRecentCall.args[0].memo.piece).toEqual('X');
			});
		});

		describe('after making a drawing move', function(){
			var listener;
			beforeEach(function(){
				listener = jasmine.createSpy();
				spyOn(controller.board(), 'drawn').andReturn(true);
				document.observe('board:drawn', listener);
				controller.move(0, 0, 'O');
			});

			afterEach(function(){
				document.stopObserving('board:drawn', listener);
			});

			it('fires a board:drawn event', function(){
				expect(listener).toHaveBeenCalled();
			});
		});

		it("does not update the display when a move is made on another board", function(){
			  runs(function(){
				(new Board()).move(0, 0, "X");
				var el = $('game_board').down('tr', 0).down('td', 0);
				expect(el.innerHTML).not.toEqual("X");
			  });
		});

		describe("after having one of its cells clicked", function(){
			var listener;
			beforeEach(function(){
				listener = jasmine.createSpy();
				document.observe('board:clicked', listener);
				$('game_board').down('tr', 0).down('td', 0).click();
			});

			afterEach(function(){
				document.stopObserving('board:clicked', listener);
			});

			it("dispatches a board:clicked event", function(){
				runs(function(){
					expect(listener).toHaveBeenCalled();
			    });
			});

			it("provides the coordinates of the cell in an event", function(){
				runs(function(){
					var ev = listener.mostRecentCall.args[0];
					expect(ev.memo.x).toEqual(0);
					expect(ev.memo.y).toEqual(0);
			    });
			});

			it("provides a reference to itself", function(){
				runs(function(){
					var ev = listener.mostRecentCall.args[0];
					expect(ev.memo.controller).toEqual(controller);
			    });
			});
		});
   });
});