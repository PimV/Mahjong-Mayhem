
describe('Stubbing and mocking the backend', function() {
	var $controller;
	var $httpBackend;
	var GameService;
	var baseURL;
	var createController;
	var gameResponse = {
		id: "id1",
		createdBy: 
		{
			name: "Thomas Reynders",
		},
		gameTemplate: 
		{
			id: "shanghai"
		},
		maxPlayers: 16,
		minPlayers: 2,
		state: 'open'
	};
	beforeEach(module('MahjongMayhem'));

	beforeEach(inject(function(_$controller_, _$httpBackend_, _GameService_) {
		$controller = _$controller_;
		GameService = _GameService_;
		$httpBackend = _$httpBackend_;
		baseURL = GameService.baseUrl;
		createController = function() {
			return $controller('GameController', {$scope: {}, gameService: GameService });
		};

		$httpBackend.when('GET', baseURL+'/games')
            .respond(gameResponse);
	}));
	/*afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});*/


	it('should fetch all games', function(){
		//Given
		var expectedCode = 200;
		var controller = createController();

		$httpBackend.expectGET(baseURL+'/games')
			.respond(200, {status : 200});
		$httpBackend
			.expectGET('views/games/games.list.html')
			.respond(200, {});

		//When
		controller.reload();
		$httpBackend.flush();
		
		//Assert
		expect(controller.getGames()).to.have.length.greaterThan(0);
	});

	it('Should replace gameController.addItem() and not calling gameService.add', function() { 
		//GIVEN
		var gameController = createController();
		GameService.add = sinon.stub();

		//WHEN
		gameController.addItem();

		//THEN
		assert(GameService.add.notCalled);
	});

	it('Should replace gameController.addItem() and not calling gameService.add', function() { 
		//GIVEN
		var gameController = createController();
		var expectedCode = 'WEBS6';
		var expectedError = 'Person not found';

		var newGame = {
			layout: "Ox",
			minPlayers: 1,
			maxPlayers: 10,
		};
		gameController.newGame = newGame;

		GameService.add = sinon.stub();
		$httpBackend
			.expectPOST(baseURL +'/games', { code: expectedCode })
			.respond(404, { err: expectedError });
			
		//WHEN
		gameController.addItem();
		$httpBackend.flush(); // Voer synchroon uit ipv asynchroon
		//THEN
		assert(GameService.add.calledOnce);
	});
	
});

