
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

	it("should render the tile directive", function(){
		var $scope = $rootScope.$new();
		
	});
});