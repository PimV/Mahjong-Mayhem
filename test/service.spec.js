
describe("Game Service test", function() {
	var $httpBackend,
	$controller,
	gameService;

	beforeEach(module('MahjongMayhem'));

	beforeEach(inject(function (_$httpBackend_, _$controller_, _GameService_)
	{
		$controller 		= _$controller_;
		gameService 		= _GameService_;
		$httpBackend 		= _$httpBackend_;
	}));

	

	it('should be an empty array', function (){
		console.log(gameService.games);
		expect(gameService.games).to.have.length(0);
	});
	it('Should return an array of games', function ()
	{
		//gameService.games = testdata;
		//expect(gameService.games).to.have.length(3);
	});
});