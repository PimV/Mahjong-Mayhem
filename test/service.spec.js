
describe("Game Service injection test", function() {
	var $controller;
	var GameService;

	beforeEach(module('MahjongMayhem'));

	beforeEach(inject(function (_$controller_, _GameService_)
	{
		$controller 		= _$controller_;
		GameService 		= _GameService_;
	}));

	
	it('should have no games', function (){
		expect(GameService.games).to.have.length(0);
	});

	it('should replace the GameService.games', function ()
	{
		//Act
		var expectedLength = 1;
		GameService.games = [
			{
				_id: "id1",
				createdBy: 
				{
					_id: "mmaa.schuurmans@avans.nl",
					name: "Martijn Schuurmans",
					__v: 0,
					id: "mmaa.schuurmans@avans.nl"
				},
				createdOn: "2015-04-30T09:56:43.516Z",
				startedOn: "2015-04-30T09:57:43.516Z",
				endedOn: "2015-04-30T09:58:43.516Z",
				gameTemplate: 
				{
					_id: "shanghai",
					__v: 0,
					id: "shanghai"
				},
				__v: 0,
				players: 
				[
				{
					_id: "mmaa.schuurmans@avans.nl",
					name: "Martijn Schuurmans",
					__v: 0,
					id: "mmaa.schuurmans@avans.nl"
				}
				],
				maxPlayers: 16,
				minPlayers: 2,
				state: "finished",
				id: "id1"
			}
		];

		//Arrange
		var gameController = $controller('GameController', {$scope: {}, gameService: GameService });
		gameController.setGames(GameService.all());		
		var actualGames = gameController.getGames();

		//Assert
		expect(GameService.games).to.have.length(expectedLength);
	});
});