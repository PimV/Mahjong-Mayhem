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

	it("should filter on state 'open' ", function(done){
		// Filters zijn het gemakkelijkst te testen omdat ze jouw zelf gemaakte functie returnen.
		var result = stateFilter(input, states.open);

		expect(result).to.have.length(1);
		expect(result[0].id).to.equal(1);

		done();
	});

	it("should filter on state 'playing' ", function(done){
		// Filters zijn het gemakkelijkst te testen omdat ze jouw zelf gemaakte functie returnen.
		var result = stateFilter(input, states.playing);

		expect(result).to.have.length(1);
		expect(result[0].id).to.equal(2);

		done();
	});

	it("should filter on state 'finished' ", function(done){
		// Filters zijn het gemakkelijkst te testen omdat ze jouw zelf gemaakte functie returnen.
		var result = stateFilter(input, states.finished);

		expect(result).to.have.length(1);
		expect(result[0].id).to.equal(3);

		done();
	});

	it("should return the previous input ", function(done){
		// Filters zijn het gemakkelijkst te testen omdat ze jouw zelf gemaakte functie returnen.
		var result = stateFilter(input, states.none);

		expect(result).to.equal(input);

		done();
	});
});