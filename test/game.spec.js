// require('angular/angular');

describe('GameController test1', function() {

	var scope;
	var gameController;
	var gameService;

	beforeEach(module('MahjongMayhem'));

	beforeEach(inject(function($rootScope, $controller, $injector) {
		scope = $rootScope.$new();

		gameService = $injector.get('gameService');
		gameController = $controller('gameController', {$scope: scope});

	}));

	it('should contain something', function() {
		expect(gameController.games.length).to.equal(2);
	});

	it('should add game', function() {
		var currentLength = gameController.games.length;
		var expectedLength = currentLength + 1;

		var expectedId = 3;
		var expectedTitle = "AVANS GAME 3";
		var expectedLayout = "snake";
		var expectedCreatedOn = (function(d){ d.setDate(d.getDate()-10); return d})(new Date);
		var expectedStartedOn = (function(d){ d.setDate(d.getDate()-5); return d})(new Date);
		var expectedEndedOn = (function(d){ d.setDate(d.getDate()-2); return d})(new Date);
		var expectedCreatedBy = {
			id: "rmbverla",
			name: "Pim Verlangen",
			email: "rmbverla@student.avans.nl",
			nickname: "PimV"
		};
		var expectedMinPlayers = 2;
		var expectedMaxPlayers = 5;
		var expectedPlayers = [];
		var expectedState = "finished";

		var actual = gameController.add(
			expectedTitle,
			expectedLayout,
			expectedCreatedOn,
			expectedStartedOn,
			expectedEndedOn,
			expectedCreatedBy,
			expectedMinPlayers,
			expectedMaxPlayers,
			expectedPlayers,
			expectedState);

		//Check added game's properties
		expect(actual.title).to.equal(expectedTitle);
		expect(actual.layout).to.equal(expectedLayout);
		expect(actual.createdOn).to.equal(expectedCreatedOn);
		expect(actual.startedOn).to.equal(expectedStartedOn);
		expect(actual.endedOn).to.equal(expectedEndedOn);
		expect(actual.createdBy).to.equal(expectedCreatedBy);
		expect(actual.minPlayers).to.equal(expectedMinPlayers);
		expect(actual.maxPlayers).to.equal(expectedMaxPlayers);
		expect(actual.players).to.equal(expectedPlayers);
		expect(actual.state).to.equal(expectedState);

		//Check if game added to controller
		expect(gameController.games.length).to.equal(expectedLength);
	});

it('should add game (stub)', function() {
	var currentLength = gameController.games.length;
	var expectedLength = currentLength + 1;

	var expectedId = 3;
	var expectedTitle = "AVANS GAME 3";
	var expectedLayout = "snake";
	var expectedCreatedOn = (function(d){ d.setDate(d.getDate()-10); return d})(new Date);
	var expectedStartedOn = (function(d){ d.setDate(d.getDate()-5); return d})(new Date);
	var expectedEndedOn = (function(d){ d.setDate(d.getDate()-2); return d})(new Date);
	var expectedCreatedBy = {
		id: "rmbverla",
		name: "Pim Verlangen",
		email: "rmbverla@student.avans.nl",
		nickname: "PimV"
	};
	var expectedMinPlayers = 2;
	var expectedMaxPlayers = 5;
	var expectedPlayers = [];
	var expectedState = "finished";

	gameService.add = sinon.stub();
	gameService.add.withArgs({
		title: expectedTitle,
		layout: expectedLayout,
		createdOn: expectedCreatedOn,
		startedOn: expectedStartedOn,
		endedOn: expectedEndedOn,
		createdBy: expectedCreatedBy,
		minPlayers: expectedMinPlayers,
		maxPlayers: expectedMaxPlayers,
		players: expectedPlayers,
		state: expectedState
	}).returns({
		id: expectedId,
		title: expectedTitle,
		layout: expectedLayout,
		createdOn: expectedCreatedOn,
		startedOn: expectedStartedOn,
		endedOn: expectedEndedOn,
		createdBy: expectedCreatedBy,
		minPlayers: expectedMinPlayers,
		maxPlayers: expectedMaxPlayers,
		players: expectedPlayers,
		state: expectedState
	});

	var actual = gameController.add(
		expectedTitle,
		expectedLayout,
		expectedCreatedOn,
		expectedStartedOn,
		expectedEndedOn,
		expectedCreatedBy,
		expectedMinPlayers,
		expectedMaxPlayers,
		expectedPlayers,
		expectedState);

	expect(actual.title).to.equal(expectedTitle);
	expect(actual.layout).to.equal(expectedLayout);
	expect(actual.createdOn).to.equal(expectedCreatedOn);
	expect(actual.startedOn).to.equal(expectedStartedOn);
	expect(actual.endedOn).to.equal(expectedEndedOn);
	expect(actual.createdBy).to.equal(expectedCreatedBy);
	expect(actual.minPlayers).to.equal(expectedMinPlayers);
	expect(actual.maxPlayers).to.equal(expectedMaxPlayers);
	expect(actual.players).to.equal(expectedPlayers);
	expect(actual.state).to.equal(expectedState);

	//Chec kif gameService.add has only been called once (because of stub);
	assert(gameService.add.calledOnce);
});
});

