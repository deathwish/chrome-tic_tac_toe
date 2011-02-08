//= require <prototype>

var Board = Class.create({
   initialize: function()
   {
	  this.board = new Array(this.rows());
	  for(var i = 0; i < this.board.length; i++)
	  {
 		 this.board[i] = new Array(this.columns());
		 for(var j = 0; j < this.board[i].length; j++)
			this.board[i][j] = null;
	  }
	  if(arguments[0])
	  {
		 for(var i = 0; i < this.rows(); i++)
		 {
			for(var j = 0; j < this.columns(); j++)
			{
			   var piece = arguments[0][i * 3 + j];
			   if(piece != ' ')
				  this.board[j][i] = piece;
			}
		 }
	  }
	  this.last_piece = null;
   },

   winner: function()
   {
	  // check for a horizontal win.
	  for(var y = 0; y < this.rows(); y++)
		 if(this.get(0, y) && this.get(0, y) == this.get(1, y) && this.get(1, y) == this.get(2, y))
			return this.get(0, y);

	  // check for a vertical win.
	  for(var x = 0; x < this.columns(); x++)
		 if(this.get(x, 0) && this.get(x, 0) == this.get(x, 1) && this.get(x, 1) == this.get(x, 2))
			return this.get(x, 0);

	  // primary diagonal
	  var dia_count = Math.min(this.rows(), this.columns());
	  var first_cell = this.get(0, 0);
	  for(var j = 1; j < dia_count; j++)
		 if(first_cell != this.get(j, j))
			 first_cell = null;
	  if(first_cell)
		 return first_cell;

	  // secondary diagonal
	  first_cell = this.get(0, dia_count - 1);
	  for(var j = 1; j < dia_count; j++)
		 if(first_cell != this.get(j, dia_count - 1 - j))
			return null;

	  return first_cell;
   },

   drawn: function()
   {
	  if(this.winner())
		 return false;
	  for(var i = 0; i < this.rows(); i++)
		 for(var j = 0; j < this.columns(); j++)
			if(this.get(i, j) == null)
			   return false;
	  return true;
   },

   rows: function()
   {
	  return 3;
   },

   columns: function()
   {
	  return 3;
   },

   __areInBounds: function(x, y)
   {
	  return y < this.rows() && x < this.columns();
   },

   get: function(x, y)
   {
	  if(this.__areInBounds(x, y))
		 return this.board[y][x];
	  return undefined;
   },

   move: function(x, y, value)
   {
	  if(this.__areInBounds(x, y) &&
		 (value == 'X' || value == 'O') &&
		 this.get(x, y) == null &&
		this.last_piece != value)
	  {
		 this.board[y][x] = this.last_piece = value;
		 return true;
	  }
	  return false;
   }
});
