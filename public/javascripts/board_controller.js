//= provide "./board"
//= require "board"

var BoardController = Class.create({
	initialize: function()
	{
	   this._board = new Board();
	   this.onComplete = this.onComplete.bind(this);
	   this.onClick = this.onClick.bind(this);
    },
    show: function(el)
    {
	   new Ajax.Updater($(el), Utils.getResourceUrl('board.html'), {onComplete: this.onComplete});
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
	   }
    },
    onComplete: function(ev)
	{
	   $('game_board').observe("click", this.onClick);
	},
	onClick: function(ev)
	{
	   var el = ev.findElement('td');
	   if(el)
	   {
		  var x = el.cellIndex;
		  var y = el.up('tr').rowIndex;
   		  $('game_board').fire('board:clicked', {x: x, y: y});
	   }
	}
});