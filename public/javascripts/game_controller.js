//= provide "./game"
//= require <prototype>
//= require "base_controller"
//= require "board_controller"
//= require "turn_order_controller"
//= require "result_controller"

var GameController = Class.create(BaseController, {
	initialize: function($super)
	{
	   $super();
	   this._board_controller = new BoardController();
	   this._turn_order_controller = new TurnOrderController();
	   this._ai_player_controller = new AIPlayerController();
	   this.onWinner = this.onWinner.bind(this);
	   this.onDrawn = this.onDrawn.bind(this);
	   this.startAI = this.startAI.bind(this);
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
	resultController: function()
	{
	   return this._result_controller;
	},
	setupAI: function()
	{
	},
	// fires a move off of the ai if it is playing first. must be called after
	// board controller has been initialized.
	// TODO: figure out if this should be coordinated elsewhere, such as with
	// the turn order and board.
	startAI: function()
	{
	   this._ai_player_controller.setPiece(Math.random() >= 0.5 ? 'X' : 'O');
	   if(this.aiPlayerController().piece() == this.turnOrderController().turnOrder().current())
		  this.aiPlayerController().move(this.boardController());
	},
	onComplete: function($super, transport)
	{
	   this.boardController().show('board_container', { onComplete: (function(){
		 this.turnOrderController().show('turn_container', { onComplete: (function(){
			this.aiPlayerController().show('ai_container', { onComplete: (function(){
				this.startAI();
				this.observe('board:winner', this.onWinner);
				this.observe('board:drawn', this.onDrawn);
				this._result_controller = new ResultController();
			}).bind(this)});
		 }).bind(this)});
	   }).bind(this)
	  });
	},
	onWinner: function(ev)
	{
	   this.hide();
	   this.resultController().setWinner(ev.memo.piece);
	   this.showResult();
	},
	onDrawn: function(ev)
	{
	   this.hide();
	   this.showResult();
	},
	showResult: function()
	{
	   this.resultController().show('content');
	},
	hide: function($super)
	{
	   $super();
	   this.boardController().hide();
	   this.turnOrderController().hide();
	   this.aiPlayerController().hide();
	}
});