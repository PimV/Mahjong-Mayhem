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

	self.selected     = null;
	self.games        = [ ];
	self.newGame	  = null;
	self.reload 	  = reload;
	self.selectGame   = selectGame;
	self.loadTiles 	  = loadTiles;
	self.tile 		  = {width: 73, height: 90};
	self.reload();

	/**
	 * Setter Games
	 * @param {} value
	 */
	function setGames(value){
		self.games = value;
	}

	/**
	 * Getter Games
	 * @return {} self.games
	 */
	function getGames(){
		return self.games;
	}

	/**
	 * Set selected game
	 * @param  {} game 
	 */
	function selectGame ( game ) {
	 	self.selected = $filter('filter')(getGames(), {id: game})[0];
	 	console.log(self.selected.players);
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
	 	var promise = gameService.loadTiles(self.selected.id);

	 	promise.then(function(payload) { 
	 		self.selected.tiles = payload.data;
	 		console.log(self.selected.tiles);
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
	self.addItem = function(index){
	 	
	 	console.log(self.newGame, $scope);
	 	var game = {
	 		layout: self.newGame.layout,
	 		minPlayers: self.newGame.minPlayers,
	 		maxPlayers: self.newGame.maxPlayers
		};
		var result = gameService.add(game);
		console.log(result);
		//$state.go('lab-details', {id: id});
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
	 function reload() {
	 	console.log("calling reload");

	 	var promise = gameService.loadFromApi();
	 	
 		promise.then(function(payload) 
 		{
 			setGames(buildGameGrid(gameService.all()));

 			if ($stateParams) {
 				selectGame($stateParams.gameId);
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
};
