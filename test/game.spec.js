// require('angular/angular');

describe('GameController test1', function() {

	var scope;
	var gameController;
	var gameService;

	beforeEach(module('MahjongMayhem'));

	beforeEach(inject(function($rootScope, $controller, $injector) {
		scope = $rootScope.$new();

		gameService = $injector.get('GameService');
		gameController = $controller('GameController', {$scope: scope});

	}));

	it('should contain something', function() {
		expect(gameController.games.length).to.equal(2);
	});

	it('should add game', function() {
		var currentLength = gameController.games.length;
		var expectedLength = currentLength + 1;

		var expectedId = expectedLength;
		var expectedTitle = "AVANS GAME 3";
		var expectedLayout = "snake";
		var expectedMinPlayers = 2;
		var expectedMaxPlayers = 5;

		var game = {
			title: expectedTitle,
			layout: expectedLayout,
			minPlayers: expectedMinPlayers,
			maxPlayers: expectedMaxPlayers
		};

		scope.game = game;
		var actual = gameController.addItem(game);

		//Check added game's properties
		expect(actual.id).to.equal(expectedId);
		expect(actual.title).to.equal(expectedTitle);
		expect(actual.layout).to.equal(expectedLayout);
		expect(actual.minPlayers).to.equal(expectedMinPlayers);
		expect(actual.maxPlayers).to.equal(expectedMaxPlayers);

		//Check if game added to controller
		expect(gameController.games.length).to.equal(expectedLength);
	});

	it('should add game (stub)', function() {
		var currentLength = gameController.games.length;
		var expectedLength = currentLength + 1;

		var expectedId = 3;
		var expectedTitle = "AVANS GAME 3";
		var expectedLayout = "snake";
		var expectedMinPlayers = 2;
		var expectedMaxPlayers = 5;
		var expectedState = "open";
		var expectedPlayers = [];
		var expectedCreatedBy = {};

		gameService.add = sinon.stub();
		gameService.add.withArgs().returns({
			id: expectedId,
			title: expectedTitle,
			layout: expectedLayout,
			createdBy: expectedCreatedBy,
			minPlayers: expectedMinPlayers,
			maxPlayers: expectedMaxPlayers,
			players: expectedPlayers,
			state: expectedState
		});

		var game = {
			title: expectedTitle,
			layout: expectedLayout,
			minPlayers: expectedMinPlayers,
			maxPlayers: expectedMaxPlayers
		};

		scope.game = game;
		var actual = gameController.addItem(game);

	//Check added game's properties to expected props
	expect(actual.title).to.equal(expectedTitle);
	expect(actual.layout).to.equal(expectedLayout);
	expect(actual.createdBy.length).to.equal(expectedCreatedBy.length);
	expect(actual.minPlayers).to.equal(expectedMinPlayers);
	expect(actual.maxPlayers).to.equal(expectedMaxPlayers);
	expect(actual.players.length).to.equal(expectedPlayers.length);
	expect(actual.state).to.equal(expectedState);

	//Chec kif gameService.add has only been called once (because of stub);
	assert(gameService.add.calledOnce);
});
});

