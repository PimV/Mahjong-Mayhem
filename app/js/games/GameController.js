'use strict';
/**
* Game Controller
* @param  {[type]} gameService    [description]
* @param  {[type]} $mdSidenav     [description]
* @param  {[type]} $mdBottomSheet [description]
* @param  {[type]} $log           [description]
* @param  {[type]} $q             [description]
*/
module.exports = function ( gameService, colorFactory, $scope, $stateParams, $log, $q) {

	var self = this;

	self.selected     = null;
	self.games        = [ ];
	self.selectGame   = selectGame;
	
	self.games = buildGameGrid(gameService.all());
	if ($stateParams) {
		selectGame($stateParams.gameId);
	} else {
		self.selected = self.games[0];
	}


	function buildGameGrid(games){
		var result = [];
		angular.forEach(games, function(value, key) {
			var g = angular.extend({}, value);
			g.span = gridRowSpan(g);
			g.background = colorFactory.random();
			g.icon = "avatar:svg-"+(key+1);
			console.log(g.background.index);
			this.push(g);
		}, result);
		console.log(result);
		return result;
	}

	/**
	 * Set selected game
	 * @param  {} game 
	 */
	function selectGame ( game ) {
		self.selected = angular.isNumber(parseInt(game)) ? self.games[game-1] : game;
	}

	/**
	 * Add a new game object 
	 * @param int index
	 */
	$scope.addItem = function(index){
		var _id = self.games.length + 1;
		var g = $scope.game;

		console.log($scope, _id);
		console.log($scope.game.title);
		var tmp = self.games;

		tmp.push({
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
		self.games = buildGameGrid(tmp);
	}

	function gridRowSpan(game){
		var span = { row: 1, col: 1 };
		if(game.minPlayers >= 5 || game.maxPlayers >= 10){
			span.col = 2;
		}
		if(game.maxPlayers >= 20){
			span.row = 2;
		}
		
		return span;
	}

};
