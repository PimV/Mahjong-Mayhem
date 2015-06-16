'use strict';

/**
* Game Controller
* @param  {[type]} gameService    [description]
* @param  {[type]} $mdSidenav     [description]
* @param  {[type]} $mdBottomSheet [description]
* @param  {[type]} $log           [description]
*/
module.exports = function ( gameService, colorFactory, $scope, $stateParams, $log, $filter, $mdBottomSheet, $state) {

	var self = this;

	self.selected     	= null;
	self.firstClick 	= true;
	self.first 			= null;
	self.second 		= null;

	self.games        	= [ ];
	self.newGame	  	= null;
	self.tile 		  	= {width: 73, height: 90};


	/**
	 * Setter Games
	 * @param {} value
	 */
	self.setGames = function (value){
		self.games = value;
	}


	/**
	 * Getter Games
	 * @return {} self.games
	 */
	self.getGames = function (){
		return self.games;
	}


	/**
	 * Start selected game
	 */
	self.start = function (){
		if(self.selected.state !== "open") return;

		var promise = gameService.start(self.selected.id);

	 	promise.then(function(payload) {
	 		$state.reload();
	 	},
	 	function(errorPayload) {
	 		console.log("then error");
	 	});
	}


	/**
	 * Set selected game
	 * @param  {} game 
	 */
	self.selectedGame = function ( game ) {
	 	self.selected = $filter('filter')(self.getGames(), {id: game})[0];
	 	loadTiles();
	}

	function buildGameGrid(games){
		var promises = [];
		var svgMin = 1;
		var svgCount = svgMin;
		var maxCount = 16;
		for (var i = 0; i < games.length; i++) {
			var g = games[i];
			g.span = gridRowSpan(g);
			g.background = colorFactory.random();
			g.icon = "avatar:svg-"+(svgCount);
			svgCount++;
			svgCount = svgCount > maxCount ? svgMin : svgCount;
			
			promises.push(g);
		};
		
		return games;
	}

	
	/**
	 * Load Tiles from GameService
	 * @uses GameService 
	 */
	function loadTiles() {
		if(self.selected.state === "open") return;
	 	var promise = gameService.loadTiles(self.selected.id);

	 	promise.then(function(payload) { 
	 		self.selected.tiles = payload.data;
	 		processTiles();
	 	},
	 	function(errorPayload) {
	 		console.log("then error");
	 	});
	}


	/**
	 * Create Tile variables
	 * @return {[type]} [description]
	 */
	function processTiles() {

	 	if (self.selected && self.selected.tiles) {
	 		self.selected.tiles.forEach(function(tile) {
	 			var name = tile.tile.suit.toLowerCase() + "_" + tile.tile.name.toLowerCase();
	 			
	 			for (var y = 0; y < 3; y++) {
	 				for (var x = 0; x < 14; x++) {
	 					if (gameService.tileSet[y][x] == name) {
	 						tile.sheetX = -(x * self.tile.width);
	 						tile.sheetY = -(y * self.tile.height);

	 						tile.boardX = (tile.xPos * (self.tile.width/2) ) - (self.tile.width/2);
	 						tile.boardY = (tile.yPos * (self.tile.height/2) ) - (self.tile.height/2);
	 						tile.boardZ = tile.zPos;

	 						return;
	 					}
	 				}	
	 			}
	 		});
	 	}
	}


	/**
	 * Add a new game object 
	 * @param int index
	 */

	self.addItem = function(){
	 	var game = {
	 		templateName: self.newGame.layout,
	 		minPlayers: self.newGame.minPlayers,
	 		maxPlayers: self.newGame.maxPlayers
		};
		//Post the new game
		var promise = gameService.add(game);

		//Wait for the promise
		promise.then(function(payload) {
			//redirect to the new game
			reload();
	 		$state.go('games.details', {gameId: payload.data.id});
	 	},
	 	function(errorPayload) {
	 		console.log("then error");
	 	});
	}


	/**
	 * Define the column and row width of a grid element
	 * @param  {} game Single Game object
	 * @return {row, span}
	 */
	function gridRowSpan(game){
		var span = { row: 1, col: 1 },
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
		}
		
		return span;
	}


	/**
	 * Reload all game items from gameService
	 * @uses gameService 
	 */
	self.reload = function () {
	 	console.log("calling reload");

	 	var promise = gameService.loadFromApi();
	 	
 		promise.then(function(payload) 
 		{
 			self.setGames(buildGameGrid(gameService.all()));
 			if ($stateParams) {
 				self.selectedGame($stateParams.gameId);
 			} else {
 				self.selected = getGames()[0];
 			}
 		},
 		function(errorPayload) {
 			console.log("then error");
 			$log.error('Failure loading games', errorPayload);
 		});
 	}


	/**-
	 * Show $mdBottomSheet
	 * @return {[type]} [description]
	 */
	function showDetails () {
	 	$mdBottomSheet.show({
	 		parent: angular.element(document.getElementById('content')),
	 		templateUrl: 'views/games/games.bottomSheet.html',
	 		controller: ['$mdBottomSheet', DetailsController],
	 		controllerAs: 'vm'
	 	});
	 	function DetailsController($mdBottomSheet){
	 		this.selected = self.selected;
	 		this.close = close;


	 		function close(){
	 			$mdBottomSheet.hide();
	 		}
	 	}
	}

	function compareTiles(first, second)	{
		if(first != null && first != undefined && second != null && second != undefined)
		{
			switch(first.tile.suit) {
			    case "Season":
			    	if(first.tile.suit == second.tile.suit)
			    	{
			    		console.log("We have a match!");
			    	}
			        console.log("Season");
			        break;
			    case "Flower":
			    	if(first.tile.suit == second.tile.suit)
			    	{
			    		console.log("We have a match!");
			    	}
			        console.log("Flower");
			        break;
			    default:
			    	console.log("comparing: ");
			    	console.log(first.tile.suit);
			    	console.log(second.tile.suit);

			    	if(second.tile.suit == first.tile.suit && second.tile.name == first.tile.name)
			        {
			        	console.log("we have a match");
			        }
			        break;
			}

			return true
		}
		else {
			return false;
		}
	}

	self.tileClicked = function (index) {
		console.log('tile clicked: ' + index);

		if(self.firstClick)
		{
			console.log("first click");
			self.first = self.selected.tiles[index-1];
			self.firstClick = false;
		}
		else
		{
			console.log("second click");
			self.second = self.selected.tiles[index-1];
			compareTiles(self.first, self.second);
			self.firstClick = true;
		}
	}	 	

	self.reload();
};
