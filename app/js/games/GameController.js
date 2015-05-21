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
	
	reload();

	if ($stateParams) {
		selectGame($stateParams.gameId);
	} else {
		self.selected = self.games[0];
	}


	function buildGameGrid(games){
		var promises = [];
		for (var i = 0; i < games.length; i++) {
			var g = games[i];
			g.span = gridRowSpan(g);
			g.background = colorFactory.random();
			g.icon = "avatar:svg-"+(i+1);
			promises.push(g);
		};
		
		return games;
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
	self.addItem = function(index){
		var _id = self.games.length + 1;
		var newGame = $scope.game;

		var game = {
			id: _id,
			title: newGame.title,
			layout: newGame.layout,
			minPlayers: newGame.minPlayers,
			maxPlayers: newGame.maxPlayers,
			createdOn: (function(d){ d.setDate(d.getDate()-1); return d})(new Date),
			endedOn: null,
			startedOn: Date.now, // date + time
			createdBy:{ },
			players: [ ],
			state: "open"
		};
		gameService.add(game);

		reload();
	}

	function gridRowSpan(game){
		var span = { row: 2, col: 2 },
			col = function(){
				span.col += 1;
			},
			row = function(){
				span.row +=1;
			};
		if(game.minPlayers >= 4 || game.maxPlayers >= 10){
			col();
		}
		if(game.maxPlayers >= 20){
			row();
		}
		if(game.maxPlayers >= 30){
			row();
			col();
		}
		
		return span;
	}

	/**
	 * Reload all game items from gameService
	 * @uses gameService 
	 */
	function reload(){
		self.games = buildGameGrid(gameService.all());
	}

};
