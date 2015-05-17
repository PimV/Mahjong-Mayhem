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
		self.games.forEach(function(entry, index) {
			if (id == entry.id) {
				self.selected = entry;
				return;
			}
		});
	}


	function selectGame ( game ) {

		self.selected = angular.isNumber(game) ? $scope.games[game] : game;
	}

	self.add = function(title, layout, createdOn, startedOn, endedOn, createdBy, minPlayers, maxPlayers, players, state) {
		var game = {};
		game.title = title;
		game.layout = layout;
		game.createdOn = createdOn;
		game.startedOn = startedOn;
		game.endedOn = endedOn;
		game.createdBy = createdBy;
		game.minPlayers = minPlayers;
		game.maxPlayers = maxPlayers;
		game.players = players;
		game.state = state;

		gameService.add(game);

		// self.games = gameService.all();

		return game;
	}


};
