'use strict';
/**
* Game Controller
* @param  {[type]} gameService    [description]
* @param  {[type]} $mdSidenav     [description]
* @param  {[type]} $mdBottomSheet [description]
* @param  {[type]} $log           [description]
* @param  {[type]} $q             [description]
*/
module.exports = function ( gameService, $scope, $stateParams, $log, $q) {

	var self = this;

	console.log($stateParams);

	self.selected     = null;
	self.games        = [ ];
	self.selectGame   = selectGame;
	
	gameService
	.all()
	.then( function( games ) {
		self.games    = [].concat(games);
		self.selected = games[0];
		$scope.games = self.games;
	});


	function selectGame ( game ) {

		self.selected = angular.isNumber(game) ? $scope.games[game] : game;
		$scope.selectedGame = self.selected;
		console.log(self.selected);
	}
	
	
};
