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

	

	self.selected     = null;
	self.games        = [ ];
	self.selectGame   = selectGame;
	
	self.games = gameService.all();
	if ($stateParams) {
		selectGameById($stateParams.gameId);
	} else {
		self.selected = self.games[0];
	}

	function selectGameById(id) {
		console.log(id);
		self.games.forEach(function(entry, index) {
			console.log(entry);
			if (id == entry.id) {
				self.selected = entry;
				return;
			}
		});
		// self.selectedGame = self.selected;
	}


	function selectGame ( game ) {

		self.selected = angular.isNumber(game) ? $scope.games[game] : game;
	console.log(self.selected);
}


};
