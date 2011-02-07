//= provide "./result"
//= require <prototype>
//= require "base_controller"
//= require "game_controller"

var ResultController = Class.create(BaseController, {
	initialize: function($super)
	{
	   $super();
	   this.onNewGameClick = this.onNewGameClick.bind(this);
	},
	setWinner: function(piece)
	{
	   this._piece = piece;
	},
	gameController: function()
	{
	   return this._gameController;
	},
	onComplete: function($super, transport)
	{
	   $super();
	   var message = "And the best you can hope for is a draw.";
	   if(this._piece)
		  message = 'Which is apt, since ' + this._piece + ' has won.';
	   $('result_text').update(message);
	   this.observe('click', this.onNewGameClick, 'new_game_link');
	   this._gameController = new GameController();
	},
    onNewGameClick: function(ev)
	{
	   this.hide();
	   this.gameController().show('content');
	}
});