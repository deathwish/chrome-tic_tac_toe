//= provide "./ai_player"
//= require <prototype>
//= require "base_controller"
//= require "ai_player"

var AIPlayerController = Class.create(BaseController, {
	initialize: function($super)
	{
	   $super();
	   this.onMoved = this.onMoved.bind(this);
	},
	player: function()
	{
	   return this._player;
	},
	piece: function()
	{
	   return  this.player() ? this.player().piece() : null;
	},
	setPiece: function(piece)
	{
	   this._player = new AIPlayer(piece);
	},
	move: function(controller)
	{
   	   var board = controller.board();
	   var pt = this.player().move(board);
	   document.fire('board:clicked', {x: pt[0], y: pt[1], controller: controller});
	},
	onComplete: function($super, transport)
	{
	   this.observe('board:moved', this.onMoved);
	},
	onMoved: function(ev)
	{
	   if(this.piece() != ev.memo.piece)
		  this.move(ev.memo.controller);
	}
});