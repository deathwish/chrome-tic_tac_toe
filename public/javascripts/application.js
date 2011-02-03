//= provide "./application"
//= require <prototype>
//= require "game_controller"

var Application = Class.create({
	initialize: function()
	{
	   this._game_controller = new GameController();
	},
	gameController: function()
	{
	   return this._game_controller;
	},
	boot: function()
	{
	   this.gameController().show('content');
	}
});

