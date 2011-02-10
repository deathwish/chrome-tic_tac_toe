/*
 * Copyright (c) 2011, Lance Cooper (lance.m.cooper@gmail.com)
 * See the included COPYING for licencing information.
 */

//= provide "./board"
//= require <prototype>
//= require "base_controller"
//= require "board"

var BoardController = Class.create(BaseController, {
	initialize: function($super)
	{
	   $super();
	   this._board = new Board();
	   this.onClick = this.onClick.bind(this);
    },
    board: function()
    {
	   return this._board;
    },
	move: function(x, y, value)
    {
	   if(this.board().move(x, y, value))
	   {
		  var el = $('game_board');
		  var tr = el.down('tr', y);
		  var td = tr.down('td', x);
		  td.update(value);
		  document.fire('board:moved', {piece: value, x: x, y: y, controller: this});
		  var winner = this.board().winner();
		  if(winner)
			 document.fire('board:winner', {piece: winner});
		  else if(this.board().drawn())
		  {
 			 document.fire('board:drawn');
		  }
	   }
    },
    onComplete: function($super, transport)
	{
	   $super(transport);
	   this.observe("click", this.onClick, 'game_board');
	},
	onClick: function(ev)
	{
	   var el = ev.findElement('td');
	   if(el)
	   {
		  var x = el.cellIndex;
		  var y = el.up('tr').rowIndex;
   		  $('game_board').fire('board:clicked', {x: x, y: y, controller: this});
	   }
	}
});