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
	},
	boardController: function()
	{
	   return this._board_controller;
	},
	turnOrderController: function()
	{
	   return this._turn_order_controller;
	},
	onComplete: function($super, transport)
	{
	   this.boardController().show('board_container');
	   this.turnOrderController().show('turn_container');
	}
});