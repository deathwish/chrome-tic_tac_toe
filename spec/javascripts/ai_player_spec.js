describe('an AI player', function(){
	// a full board, laid out as follows:
	// XO?
	// OXO
	// X?O
	var full_board = new Board();
	full_board.move(0, 0, "X");
	full_board.move(0, 1, "O");
	full_board.move(1, 1, "X");
	full_board.move(1, 0, "O");
	full_board.move(2, 0, "X");
	full_board.move(1, 2, "O");
	full_board.move(2, 2, "X");

	var player;

	describe('playing as "X"', function(){
		beforeEach(function(){
			player = new AIPlayer("X");
		});

		it('reports its piece as "X"', function(){
			expect(player.piece()).toEqual("X");
		});

		it('normalizes "X" to "U"', function(){
			expect(player.normalizePiece("X")).toEqual("U");
		});

		it('normalizes "O" to "T"', function(){
			expect(player.normalizePiece("O")).toEqual("T");
		});

		it('produces a serial form using the selected transform and piece normalization', function(){
			var transform = {t: function(board, x, y) { return [x, y]; }};
			spyOn(transform, 't').andCallThrough();
			spyOn(player, 'normalizePiece').andCallThrough();
			expect(player.serialize(full_board, transform.t)).toEqual("UT TUTU U");
			expect(transform.t).toHaveBeenCalled();
			expect(player.normalizePiece).toHaveBeenCalled();
		});

		it('normalizes no piece placed to " "', function(){
			expect(player.normalizePiece(null)).toEqual(" ");
		});

		it('has an identity transform', function(){
			expect(player.identity(full_board, 1, 0)).toEqual([1, 0]);
		});

		it('has a primary transpose transform', function(){
			expect(player.primaryTranspose(full_board, 1, 0)).toEqual([0, 1]);
			expect(player.primaryTranspose(full_board, 2, 2)).toEqual([2, 2]);
		});

		it('has a secondary transpose transform', function(){
			expect(player.secondaryTranspose(full_board, 0, 0)).toEqual([2, 2]);
			expect(player.secondaryTranspose(full_board, 2, 0)).toEqual([2, 0]);
		});

		it('has a horizontal flip transform', function(){
			expect(player.horizontalFlip(full_board, 0, 0)).toEqual([2, 0]);
			expect(player.horizontalFlip(full_board, 1, 0)).toEqual([1, 0]);
		});

		it('has a vertical flip transform', function(){
			expect(player.verticalFlip(full_board, 0, 0)).toEqual([0, 2]);
			expect(player.verticalFlip(full_board, 0, 1)).toEqual([0, 1]);
		});

		it('should win when provided a board with a win in the first column', function() {
			expect(player.move(new Board('XO XO    '))).toEqual([2, 0]);
			expect(player.move(new Board('   XO XO '))).toEqual([0, 0]);
			expect(player.move(new Board('XO    XO '))).toEqual([1, 0]);
		});
		it('should win when provided a board with a win in the second column', function() {
			expect(player.move(new Board('OX OX    '))).toEqual([2, 1]);
			expect(player.move(new Board('   OX OX '))).toEqual([0, 1]);
			expect(player.move(new Board('OX    OX '))).toEqual([1, 1]);
		});
		it('should win when provided a board with a win in the third column', function() {
			expect(player.move(new Board(' OX OX   '))).toEqual([2, 2]);
			expect(player.move(new Board('    OX OX'))).toEqual([0, 2]);
			expect(player.move(new Board(' OX    OX'))).toEqual([1, 2]);
		});
		it('should win when provided a board with a win in the first row', function() {
			expect(player.move(new Board('XX OO    '))).toEqual([0, 2]);
			expect(player.move(new Board(' XX OO   '))).toEqual([0, 0]);
			expect(player.move(new Board('X XO O   '))).toEqual([0, 1]);
		});
		it('should win when provided a board with a win in the second row', function() {
			expect(player.move(new Board('OO XX    '))).toEqual([1, 2]);
			expect(player.move(new Board(' OO XX   '))).toEqual([1, 0]);
			expect(player.move(new Board('O OX X   '))).toEqual([1, 1]);
		});
		it('should win when provided a board with a win in the third row', function() {
			expect(player.move(new Board('   OO XX '))).toEqual([2, 2]);
			expect(player.move(new Board('    OO XX'))).toEqual([2, 0]);
			expect(player.move(new Board('   O OX X'))).toEqual([2, 1]);
		});
		it('should win when provided a board with a win on the primary diagonal', function() {
			expect(player.move(new Board('XO  XO   '))).toEqual([2, 2]);
			expect(player.move(new Board('   OX  OX'))).toEqual([0, 0]);
			expect(player.move(new Board('XO     OX'))).toEqual([1, 1]);
		});
		it('should win when provided a board with a win on the secondary diagonal', function() {
			expect(player.move(new Board(' OX XO   '))).toEqual([2, 0]);
			expect(player.move(new Board('   OX XO '))).toEqual([0, 2]);
			expect(player.move(new Board(' OX   XO '))).toEqual([1, 1]);
		});

		it('should prevent the opponent from winning when they would win in the first column', function() {
			expect(player.move(new Board('OX O     '))).toEqual([2, 0]);
			expect(player.move(new Board('   O  OX '))).toEqual([0, 0]);
			expect(player.move(new Board('OX    O  '))).toEqual([1, 0]);
		});
		it('should prevent the opponent from winning when they would win in the second column', function() {
			expect(player.move(new Board('XO  O    '))).toEqual([2, 1]);
			expect(player.move(new Board('    O XO '))).toEqual([0, 1]);
			expect(player.move(new Board(' O    XO '))).toEqual([1, 1]);
		});
		it('should prevent the opponent from winning when they would win in the third column', function() {
			expect(player.move(new Board('  O XO   '))).toEqual([2, 2]);
			expect(player.move(new Board('     O XO'))).toEqual([0, 2]);
			expect(player.move(new Board('  O    XO'))).toEqual([1, 2]);
		});
		it('should prevent the opponent from winning when they would win in the first row', function() {
			expect(player.move(new Board('OO X     '))).toEqual([0, 2]);
			expect(player.move(new Board(' OO X    '))).toEqual([0, 0]);
			expect(player.move(new Board('O OX     '))).toEqual([0, 1]);
		});
		it('should prevent the opponent from winning when they would win in the second row', function() {
			expect(player.move(new Board(' X OO    '))).toEqual([1, 2]);
			expect(player.move(new Board('  X OO   '))).toEqual([1, 0]);
			expect(player.move(new Board('X  O O   '))).toEqual([1, 1]);
		});
		it('should prevent the opponent from winning when they would win in the third row', function() {
			expect(player.move(new Board('    X OO '))).toEqual([2, 2]);
			expect(player.move(new Board('     X OO'))).toEqual([2, 0]);
			expect(player.move(new Board('   X  O O'))).toEqual([2, 1]);
		});
		it('should prevent the opponent from winning when they would win on the primary diagonal', function() {
			expect(player.move(new Board('OX  OX   '))).toEqual([2, 2]);
			expect(player.move(new Board('   XO  XO'))).toEqual([0, 0]);
			expect(player.move(new Board('OX     XO'))).toEqual([1, 1]);
		});
		it('should prevent the opponent from winning when they would win on the secondary diagonal', function() {
			expect(player.move(new Board(' XO OX   '))).toEqual([2, 0]);
			expect(player.move(new Board('   XO OX '))).toEqual([0, 2]);
			expect(player.move(new Board(' XO   OX '))).toEqual([1, 1]);
		});

		it('should create a fork if possible', function(){
			expect(player.move(new Board('XO X  O  '))).toEqual([1, 1]);
			expect(player.move(new Board('XO  X   O'))).toEqual([1, 0]);
			expect(player.move(new Board('XXO   O  '))).toEqual([1, 1]);
		});

		it('should prevent the opponent from forking', function(){
			expect(player.move(new Board('OX       '))).toEqual([1, 1]);
		});

		it('should play the center square when available', function(){
			expect(player.move(new Board('O        '))).toEqual([1, 1]);
		});

		it('should play the opposite corner when an opponent is in a corner', function(){
			expect(player.move(new Board('O   X    '))).toEqual([2, 2]);
			expect(player.move(new Board('    X   O'))).toEqual([0, 0]);
			expect(player.move(new Board('    X O  '))).toEqual([0, 2]);
			expect(player.move(new Board('  O X    '))).toEqual([2, 0]);
		});

		it('should play corner squares if open', function(){
			expect(player.move(new Board('OOXXXOO  '))).toEqual([2, 2]);
			expect(player.move(new Board('XO OOXXXO'))).toEqual([0, 2]);
			expect(player.move(new Board('    O    '))).toEqual([0, 0]);
		});

		it('should play side squares if open', function(){
			expect(player.move(new Board('O XOXOXOX'))).toEqual([0, 1]);
			expect(player.move(new Board('XOXOXOO X'))).toEqual([2, 1]);
			expect(player.move(new Board('XOX OXOXO'))).toEqual([1, 0]);
			expect(player.move(new Board('XOXXO OXO'))).toEqual([1, 2]);
		});

		it('returns null when called with a drawn board', function(){
			expect(player.move(new Board('XOXOOXXXO'))).toBeNull();
		});
	});

	describe('playing as "O"', function(){
		beforeEach(function(){
			player = new AIPlayer("O");
		});

		it('reports its piece as "O"', function(){
			expect(player.piece()).toEqual("O");
		});

		it('normalizes "O" to "U"', function(){
			expect(player.normalizePiece("O")).toEqual("U");
		});

		it('normalizes "X" to "T"', function(){
			expect(player.normalizePiece("X")).toEqual("T");
		});
	});
});