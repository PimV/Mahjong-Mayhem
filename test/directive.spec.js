
describe("Tile Directive", function() {
	var tileDirective;
	var $compile;
	var $rootScope;

	beforeEach(module('MahjongMayhem'));

	beforeEach(module('views/directives/tile.html'));

	beforeEach(inject(function(_tileDirective_, _$compile_, _$rootScope_){
		tileDirective = _tileDirective_;
		$compile = _$compile_;
		$rootScope = _$rootScope_;
	}));

	it("should have one div", function(){
		var $scope = $rootScope.$new();
		$scope.tile = {
			sheetX:0,
			sheetY:0,
			boardX:10,
			boardY:10,
			boardZ:1
		};

		var element = $compile('<tile></tile>')($scope);
		$scope.$digest();

		expect(element.find('div')).to.have.length(1);
	});

	it("should render the tile directive", function(){
		var expectedText = "[1]";//[{{$index + 1}}]
		var $scope = $rootScope.$new();
		$scope.tile = {
			sheetX:0,
			sheetY:0,
			boardX:10,
			boardY:10,
			boardZ:1
		};
		$scope.tileClicked = function(index) {
			console.log('OnClick was called!');
		};//dit werkt niet


		var element = $compile('<tile></tile>')($scope);
		$scope.$digest();

		element.find('div').triggerHandler('click');

		expect(element.find('div').attr("class")).to.have.string('tile');
		expect(element.html()).to.have.string(expectedText);
	});
});