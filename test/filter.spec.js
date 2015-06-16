describe("Game state Filter", function() {
	var stateFilter;

	var states = {
		open: 'open',
		playing: 'playing',
		finished: 'finished',
		none: null
	};

	var input = [
		{
			id: 1,
			state: 'open'
		},
		{
			id: 2,
			state: 'playing'
		},
		{
			id: 3,
			state: 'finished'
		},
	];

	beforeEach(module('MahjongMayhem'));

	beforeEach(inject(function($injector){
		stateFilter = $injector.get('$filter')('stateFilter');
	}));

	it("should filter on state 'open'", function(done){
		//Act
		var result = stateFilter(input, states.open);
		
		//Assert
		expect(result).to.have.length(1);
		expect(result[0].id).to.equal(1);

		done();
	});

	it("should filter on state 'playing'", function(done){
		//Act
		var result = stateFilter(input, states.playing);
		//Assert
		expect(result).to.have.length(1);
		expect(result[0].id).to.equal(2);

		done();
	});

	it("should filter on state 'finished'", function(done){
		//Act
		var result = stateFilter(input, states.finished);

		//Assert
		expect(result).to.have.length(1);
		expect(result[0].id).to.equal(3);

		done();
	});

	it("should return the previous input", function(done){
		//Act
		var result = stateFilter(input, states.none);

		//Assert
		expect(result).to.equal(input);

		done();
	});
});