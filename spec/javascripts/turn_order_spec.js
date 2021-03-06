/*
 * Copyright (c) 2011, Lance Cooper (lance.m.cooper@gmail.com)
 * See the included COPYING for licencing information.
 */

describe('turn order', function(){
	var turn_order;
	beforeEach(function(){
		turn_order = new TurnOrder();
	});

	it("should start with 'X'", function(){
		expect(turn_order.current()).toEqual('X');
	});

	it("should be changed to 'O' after a turn is taken", function(){
		turn_order.turn();
		expect(turn_order.current()).toEqual('O');
	});

	it("should return to 'X' after two turns have been taken", function(){
		turn_order.turn();
		turn_order.turn();
		expect(turn_order.current()).toEqual('X');
	});
});
