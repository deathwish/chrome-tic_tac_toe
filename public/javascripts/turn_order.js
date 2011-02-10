/*
 * Copyright (c) 2011, Lance Cooper (lance.m.cooper@gmail.com)
 * See the included COPYING for licencing information.
 */

//= require <prototype>

var TurnOrder = Class.create({
	initialize: function()
	{
	   this.turn_count = 0;
	},
	current: function()
	{
	   return this.turn_count % 2 == 0 ? 'X' : 'O';
	},
	turn: function()
	{
	   this.turn_count++;
	}
});