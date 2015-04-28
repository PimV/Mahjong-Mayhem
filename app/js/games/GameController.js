'use strict';
/**
* Game Controller
* @param  {[type]} gameService    [description]
* @param  {[type]} $mdSidenav     [description]
* @param  {[type]} $mdBottomSheet [description]
* @param  {[type]} $log           [description]
* @param  {[type]} $q             [description]
*/
module.exports = function ( gameService, $mdSidenav, $mdBottomSheet, $log, $q) {

	var self = this;

	self.selected     = null;
	self.games        = [ ];
	self.selectGame   = selectGame;
	self.toggleList   = toggleGamesList;

	gameService
	.get()
	.then( function( games ) {
		self.games    = [].concat(games);
		self.selected = games[0];
	});


	function toggleGamesList() {
		var pending = $mdBottomSheet.hide() || $q.when(true);

		pending.then(function(){
			$mdSidenav('left').toggle();
		});
	}


	function selectGame ( game ) {
		self.selected = angular.isNumber(game) ? $scope.games[game] : game;
		self.toggleList();
	}

};
