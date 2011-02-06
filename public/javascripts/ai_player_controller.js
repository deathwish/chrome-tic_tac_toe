//= provide "./ai_player"
//= require <prototype>
//= require "base_controller"
//= require "ai_player"

var AIPlayerController = Class.create(BaseController, {
	initialize: function($super, piece)
	{
	   $super();
	   this._player = new AIPlayer(piece);
	   this._piece = piece;
	   this.onMoved = this.onMoved.bind(this);
	},
	player: function()
	{
	   return this._player;
	},
	piece: function()
	{
	   return this.player().piece();
	},
	onComplete: function($super, transport)
	{
	   document.observe('board:moved', this.onMoved);
	},
	onMoved: function(ev)
	{
	   if(this.piece() != ev.memo.piece)
	   {
   		  var board = ev.memo.controller.board();
		  var pt = this.player().move(board);
		  document.fire('board:clicked', {x: pt[0], y: pt[1], controller: ev.memo.controller});
	   }
	}
});