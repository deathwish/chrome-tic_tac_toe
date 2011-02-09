//= provide "./turn_order"
//= require <prototype>
//= require "base_controller"
//= require "turn_order"

var TurnOrderController = Class.create(BaseController, {
	initialize: function($super)
	{
	   $super();
	   this._turnOrder = new TurnOrder();
	   this.onMove = this.onMove.bind(this);
	   this.onBoardClicked = this.onBoardClicked.bind(this);
	},
	turnOrder: function()
	{
	   return this._turnOrder;
	},
	__updateTurnDisplay: function()
	{
	   $('turn_order').update(this.turnOrder().current() + "'s turn.");
	},
	onComplete: function($super, transport)
	{
	   $super(transport);
	   this.observe('board:moved', this.onMove);
	   this.observe('board:clicked', this.onBoardClicked);
	   this.__updateTurnDisplay();
	},
	onMove: function(ev)
	{
	   this.turnOrder().turn();
	   this.__updateTurnDisplay();
	},
	onBoardClicked: function(ev)
	{
	   ev.memo.controller.move(ev.memo.x, ev.memo.y, this.turnOrder().current());
	}
});