/*
 * Copyright (c) 2011, Lance Cooper (lance.m.cooper@gmail.com)
 * See the included COPYING for licencing information.
 */

//= require <prototype>
//= require "board"

var AIPlayer = Class.create({
	initialize: function(piece)
	{
	   this._piece = piece;
	   this.rules = [
		  // win rules
		  // side row/column
		  { state: /U..U.. ../, x: 2, y: 0 },
		  { state: /U.. ..U../, x: 1, y: 0 },
		  // center row/column
		  { state: /.U..U.. ./, x: 2, y: 1 },
		  { state: /.U.. ..U./, x: 1, y: 1 },
		  // top/bottom row
		  { state: /(\w)\1 ....../, x: 0, y: 2 },
		  // primary diagonal
		  { state: /(\w)...\1... /, x: 2, y: 2 },
		  { state: /(\w)... ...\1/, x: 1, y: 1 },

		  // prevent win rules
		  // side row/column
		  { state: /T..T.. ../, x: 2, y: 0 },
		  { state: /T.. ..T../, x: 1, y: 0 },
		  // center row/column
		  { state: /.T..T.. ./, x: 2, y: 1 },
		  { state: /.T.. ..T./, x: 1, y: 1 },

		  // fork rules
		  { state: /U..U .T../, x: 1, y: 1 },
		  { state: /U.. U...T/, x: 1, y: 0 },

		  // block opponent from forking. don't appear to need any rules for this?
		  // play the center square when available.
		  { state: /.... ..../, x: 1, y: 1 },

		  // play the corner opposite an opposing piece
		  { state: /T....... /, x: 2, y: 2 },

		  // play any corner square
		  { state: / ......../, x: 0, y: 0 },

		  // play any side square
		  { state: /. ......./, x: 0, y: 1 }
	   ];
	   this.transposes = [
		  this.identity,
		  this.horizontalFlip,
		  this.verticalFlip,
		  this.primaryTranspose,
		  this.secondaryTranspose
	   ];
	},
	piece: function()
	{
	   return this._piece;
	},
	move: function(board)
	{
	   for(var i = 0; i < this.rules.length; i++)
	   {
		  for(var j = 0; j < this.transposes.length; j++)
		  {
			 var transpose = this.transposes[j];
			 var bs = this.serialize(board, transpose);
			 var rule = this.rules[i];
			 if(rule.state.match(bs))
				return transpose(board, rule.x, rule.y);
		  }
	   }
	   return null;
	},
	normalizePiece: function(piece)
	{
	   return !piece ? ' ' : this.piece() == piece ? 'U' : 'T';
	},
	serialize: function(board, transpose)
	{
	   var ret = "";
	   for(var i = 0; i < board.rows(); i++)
	   {
		  for(var j = 0; j < board.columns(); j++)
		  {
			 ret += this.getTransposedPiece(board, i, j, transpose);
		  }
	   }
	   return ret;
	},
	getTransposedPiece: function(board, x, y, transpose)
	{
	   var pt = transpose(board, x, y);
	   return this.normalizePiece(board.get(pt[0], pt[1]));
	},
	identity: function(board, x, y)
	{
	   return [x, y];
	},
	primaryTranspose: function(board, x, y)
	{
	   return [y, x];
	},
	secondaryTranspose: function(board, x, y)
	{
	   var diagonal = Math.min(board.rows(), board.columns()) - 1;
	   return [diagonal - y, diagonal - x];
	},
	horizontalFlip: function(board, x, y)
	{
	   return [board.rows() - x - 1, y];
	},
	verticalFlip: function(board, x, y)
	{
	   return [x, board.columns() - y - 1];
	}
});