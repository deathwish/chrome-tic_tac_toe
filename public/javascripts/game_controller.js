//= provide "./game"
//= require <prototype>
//= require "base_controller"
//= require "board_controller"
//= require "turn_order_controller"

var GameController = Class.create(BaseController, {
	initialize: function($super)
	{
	   $super();
	   this._board_controller = new BoardController();
	   this._turn_order_controller = new TurnOrderController();
	   this._ai_player_controller = new AIPlayerController('O');
	},
	boardController: function()
	{
	   return this._board_controller;
	},
	turnOrderController: function()
	{
	   return this._turn_order_controller;
	},
	aiPlayerController: function()
	{
	   return this._ai_player_controller;
	},
	onComplete: function($super, transport)
	{
	   this.boardController().show('board_container');
	   this.turnOrderController().show('turn_container');
	   this.aiPlayerController().show('ai_container');
	}
});