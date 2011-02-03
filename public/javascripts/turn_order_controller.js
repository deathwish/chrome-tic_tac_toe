//= provide "./turn_order"
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
	onComplete: function($super, transport)
	{
	   $super(transport);
	   document.observe('board:moved', this.onMove);
	   document.observe('board:clicked', this.onBoardClicked);
	},
	onMove: function(ev)
	{
	   this.turnOrder().turn();
	},
	onBoardClicked: function(ev)
	{
	   ev.memo.controller.move(ev.memo.x, ev.memo.y, this.turnOrder().current());
	}
});