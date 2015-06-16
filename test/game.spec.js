
describe('GameController test1', function() {

	var scope;
	var gameController;
	var gameService;
	var httpBackend;

	beforeEach(module('MahjongMayhem'));

	beforeEach(inject(function($rootScope, $controller, $httpBackend, $injector) {
		// The scope for the controller
		scope = $rootScope.$new();
		// Get the service which will be injected
		gameService = $injector.get('GameService');
		gameService.add = function(obj){
			gameService.games.push(obj);			
		}
		
		// For mocking the backend
		httpBackend = $httpBackend;

		gameController = $controller('GameController', {$scope: scope, gameService: gameService});
	}));

	it('should contain no games', function() {
		expect(gameController.games.length).to.equal(0);
	});
	it('should add a game', function () {
		
	});
	it('should select increase the row-span', function () {
		var expected = {row: 1, col: 3};
		var game = {
			title: "test",
			layout: "dragon",
			minPlayers: 1,
			maxPlayers: 11
		};

	});



	//it('should add game', function() {
		//var games = gameController.getGames();
		// /console.log(gameController.getGames());

		/*var currentLength = gameController.games.length;
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
		expect(gameController.games.length).to.equal(expectedLength);*/
	//});

	/*it('should add game (stub)', function() {
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
});*/
});

