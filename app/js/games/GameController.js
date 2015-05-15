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
			if (id == entry.id) {
				self.selected = entry;
				return;
			}
		});
	}


	function selectGame ( game ) {
		self.selected = angular.isNumber(game) ? $scope.games[game] : game;
		console.log(self.selected);
	}


	$scope.addItem = function(index){
		var _id = self.games.length + 1;
		var g = $scope.game;

		console.log($scope, _id);
		console.log($scope.game.title);
		self.games.push({
			id: _id,
			title: g.title,
			layout: g.layout,
			minPlayers: g.minPlayers,
			maxPlayers: g.maxPlayers,
			createdOn: (function(d){ d.setDate(d.getDate()-1); return d})(new Date),
			startedOn: Date.now, // date + time
			createdBy:{

			},
			players: [

			],
			state: "open"
		});
	}

};
