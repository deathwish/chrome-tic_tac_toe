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

	it("should be back to 'X' after two turns have beentaken", function(){
		turn_order.turn();
		turn_order.turn();
		expect(turn_order.current()).toEqual('X');
	});
});