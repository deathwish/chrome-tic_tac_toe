describe('a new Board', function(){
   var board;
   beforeEach(function(){
      board = new Board();
   });

   it('should not have a winner', function(){
      expect(board.winner()).toBeNull();
   });

   it('should have 3 rows', function(){
      expect(board.rows()).toEqual(3);
   });

   it('should have 3 columns', function(){
      expect(board.columns()).toEqual(3);
   });

   for(var i = 0; i < 3; i++)
   {
	  for(var j = 0; j < 3; j++)
	  {
		 (function(){
			 // closure loop indices.
			 var x = i;
			 var y = j;
			 var position = '(' + x + ', ' + y + ')';
   			 it('should not have a piece at ' + position , function(){
				   expect(board.get(x, y)).toBeNull();
				});

   			 it('should allow an "X" to be placed at ' + position, function(){
				   expect(board.move(x, y, "X")).toBeTruthy();
				});

   			 it('should allow an "O" to be placed at ' + position, function(){
				   expect(board.move(x, y, "O")).toBeTruthy();
				});

   			 it('should not allow a "J" to be placed at ' + position, function(){
				   expect(board.move(x, y, "J")).toBeFalsy();
				});

			 it('should have an "X" at ' + position  + ' after placing an "X" at ' + position, function(){
				   board.move(x, y, "X");
				   expect(board.get(x, y)).toEqual('X');
				});

			 it('should not allow an "X" at ' + position  + ' after placing an "X" at ' + position, function(){
				   board.move(x, y, "X");
				   expect(board.move(x, y, "X")).toBeFalsy();
				});
		  })();
	  }
   }

   it('should not allow an "X" to be placed at (3, 3)', function(){
      	 expect(board.move(3, 3, "X")).toBeFalsy();
   });

   it('should have undefined for the piece value at (3, 3)', function(){
      	 expect(board.get(3, 3)).toEqual(undefined);
   });

   it('should not allow two "X" moves in a row', function(){
		 board.move(0, 0, "X");
		 expect(board.move(0, 1, "X")).toBeFalsy();
   });

   function place_X_on(x, y)
   {
	  expect(board.move(x, y, "X")).toBeTruthy();
   }

   function place_O_on(x, y)
   {
	  expect(board.move(x, y, "O")).toBeTruthy();
   }

   for(var j = 0; j < 3; j++)
   {
	  (function(){
		 var y = j;
		 var y_o = y == 0 ? 2 : 0;
		 it('should have a winner after placing a horizontal sequence in row ' + y, function(){
			   place_X_on(0, y);
			   place_O_on(0, y_o);
			   place_X_on(1, y);
			   place_O_on(1, y_o);
			   place_X_on(2, y);
			   expect(board.winner()).toEqual('X');
			});
	  })();
   }

   for(var i = 0; i < 3; i++)
   {
	  (function(){
		 var x = i;
		 var x_o = x == 0 ? 2 : 0;
		 it('should have a winner after placing a vertical sequence in column ' + x, function(){
			   place_X_on(x, 0);
			   place_O_on(x_o, 0);
			   place_X_on(x, 1);
			   place_O_on(x_o, 1);
			   place_X_on(x, 2);
			   expect(board.winner()).toEqual('X');
			});
	  })();
   }

   it('should have a winner after placing along the primary diagonal', function(){
		 place_X_on(0, 0);
		 place_O_on(0, 2);
		 place_X_on(1, 1);
		 place_O_on(2, 0);
		 place_X_on(2, 2);
		 expect(board.winner()).toEqual('X');
   });

   it('should have a winner after placing along the secondary diagonal', function(){
		 place_X_on(2, 0);
		 place_O_on(0, 0);
		 place_X_on(1, 1);
		 place_O_on(2, 2);
		 place_X_on(0, 2);
		 expect(board.winner()).toEqual('X');
   });

   describe('constructed with an existing state', function(){
		it('should load the provided state', function(){
			board = new Board('X OXOX   ');
			expect(board.get(0, 0)).toEqual('X');
			expect(board.get(0, 1)).toBeNull();
			expect(board.get(0, 2)).toEqual('O');
			expect(board.get(1, 0)).toEqual('X');
			expect(board.get(1, 1)).toEqual('O');
			expect(board.get(1, 2)).toEqual('X');
			expect(board.get(2, 0)).toBeNull();
			expect(board.get(2, 1)).toBeNull();
			expect(board.get(2, 2)).toBeNull();
		});
   });
});
