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
	self.firstindex		= 0;
	self.second 		= null;
	self.history 		= [ ];	
	self.games        	= [ ];
	self.newGame	  	= null;
	self.tile 		  	= {width: 73, height: 100};

	self.maxX 			= 0;
	self.maxY 			= 0;

	self.socketio 		= null;





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
	 		self.reload();
	 		$state.reload();
	 	},
	 	function(errorPayload) {
	 		console.log("then error");
	 	});
	 }

	 self.fullReload = function() {
	 	self.reload();
	 	$state.reload();
	 };


	/**
	 * Set selected game
	 * @param  {} game 
	 */
	 self.selectGame = function ( game ) {
	 	console.log("Selecting game with id: " + game);
	 	var promise = gameService.get(game);

	 	promise.then(function(payload) {
	 		console.log("Selected game:");
	 		console.log(payload.data);
	 		self.selected = payload.data;
	 		self.loadTiles();
	 		self.enableSocketIO(game);
	 		$state.go('games.details', {gameId: game});
	 	}, function(errorPayload) {
	 		console.log("Could not load game.");
	 	});
	 	

	 	

	 }

	 self.disableSocketIO = function(game) {
	 	var currentUrl = 'http://mahjongmayhem.herokuapp.com?gameId=' + game;

	 	if (self.socketio !== null) {
	 		if (self.socketio.io.uri === currentUrl) {
	 			console.log("Already connected to same uri. Not disconnecting.");
	 			return;
	 		}
	 		// console.log(currentUrl, self.socketio.io.uri);
	 		console.log("Disconnected: " + self.socketio.io.uri);
	 		self.socketio.disconnect();	 
	 	}	 	
	 }

	 self.isAlreadyEnabled = function(game) {
	 	var currentUrl = 'http://mahjongmayhem.herokuapp.com?gameId=' + game;	 	
	 	if (self.socketio !== null) {
	 		if (self.socketio.io.uri === currentUrl) {
	 			console.log("Already connected to same uri. Not disconn.");
	 			return true;
	 		}
	 	}
	 	
	 	return false;
	 };

	 self.enableSocketIO = function(game) {
	 	console.log("Enabling socketio for game id: " + game);
	 	self.disableSocketIO(game);

	 	if (typeof game === 'undefined') {
	 		console.log("Game undefined, stopping.");
	 		return;
	 	}

	 	if (self.isAlreadyEnabled(game)) {
	 		console.log("Not connecting again.");
	 		return;
	 	}	 	
	 	var socketUrl = 'http://mahjongmayhem.herokuapp.com?gameId=' + game;
	 	self.socketio =  io(socketUrl, {'force new connection': true});
	 	console.log("Connected: " + self.socketio.io.uri);
	 	self.socketio.on('start', function() {
	 		console.log("This game has been started!");	
	 		self.selectGame(game);	
	 	});

	 	self.socketio.on('playerJoined', function() {
	 		console.log("A player has joined");
	 		self.selectGame(game);	
	 	});

	 	self.socketio.on('match', function(matchedTiles) {
	 		var tile1 = matchedTiles[0];
	 		var tile2 = matchedTiles[1];

	 		angular.forEach(self.selected.tiles, function(gameTile, key) {
	 			if (gameTile._id == tile1._id) {
	 				gameTile.match = tile1.match;
	 				gameTile.matched = true;
	 			} else if (gameTile._id == tile2._id) {
	 				gameTile.match = tile2.match;
	 				gameTile.matched = true;
	 			}
	 		});
	 		$state.reload();
	 	});

	 	self.socketio.on('end', function() {
	 		console.log("This game has now been ended!");
	 		self.selectGame(game);
	 	});
	 }

	 self.join = function() {
	 	console.log("Joining game...");
	 	if (self.selected) {

	 		var promise = gameService.join(self.selected.id);

	 		promise.then(function(payload) {
	 			console.log("Game joined!");
	 			self.reload();
	 			// $state.reload();
	 		}, function(errorPayload) {
	 			console.log(errorPayload);
	 		});
	 	} else {
	 		console.log("No game selected.");
	 	}	 	
	 }

	 self.leave = function() {
	 	console.log("Leaving game...");
	 	if (self.selected) {
	 		var promise = gameService.leave(self.selected.id);

	 		promise.then(function(payload) {

	 			console.log("Game left");
	 			self.reload();

	 		}, function(errorPayload) {
	 			console.log(errorPayload);
	 		});
	 	} else {
	 		console.log("No game selected.");
	 	}
	 }

	 self.buildGameGrid = function(games) {
	 	var promises = [];
	 	var svgMin = 1;
	 	var svgCount = svgMin;
	 	var maxCount = 16;
	 	for (var i = 0; i < games.length; i++) {
	 		var g = games[i];
	 		g.span = self.gridRowSpan(g);
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
	 self.loadTiles = function() {
	 	console.log(self.selected);
	 	if(self.selected == null || self.selected.state === "open") return;
	 	var promise = gameService.loadTiles(self.selected.id);

	 	promise.then(function(payload) {
	 		if(payload == null) return; 
	 		self.selected.tiles = payload.data;
	 		self.processTiles();
	 	},
	 	function(errorPayload) {
	 		console.log("then error");
	 	});
	 }


	/**
	 * Create Tile variables
	 * @return {[type]} [description]
	 */
	 self.processTiles = function() {

	 	if (self.selected && self.selected.tiles) {
	 		console.log(self.selected);
	 		self.selected.tiles.forEach(function(tile) {
	 			var name = tile.tile.suit.toLowerCase() + "_" + tile.tile.name.toLowerCase();
	 			
	 			for (var i = 0; i < 144; i++) {
	 				if (gameService.tileSet[i] == name) {
	 					tile.sheetX = self.tile.width;
	 					tile.sheetY = (i * self.tile.height);



	 					tile.boardX = (tile.xPos * (self.tile.width/2) ) - (self.tile.width/2);
	 					tile.boardY = (tile.yPos * (self.tile.height/2) ) - (self.tile.height/2);
	 					tile.boardZ = tile.zPos;

	 					if (self.maxX < tile.boardX) {
	 						self.maxX = tile.boardX;
	 					}

	 					if (self.maxY < tile.boardY) {
	 						self.maxY = tile.boardY;
	 					}

	 					// console.log(tile.zPos);
	 					if (tile.match) {
	 						tile.matched = true;
	 					} else {
	 						tile.matched = false;
	 					}
	 					return;
	 				}
	 				

	 			}
	 		});
	 		self.maxY += self.tile.height;
	 	}
	 }

	/**
	 * Add a new game object 
	 * @param int index
	 */
	 self.addItem = function()	{
	 	if(self.newGame == null) return;
	 	if(!self.newGame.layout || !self.newGame.layout ||  !self.newGame.layout) return;
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

			// self.reload();
			self.selectGame(payload.data.id);
			// $state.go('games.details', {gameId: payload.data.id});
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
	 self.gridRowSpan = function(game) {
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
	 	var promise = gameService.loadFromApi();
	 	
	 	promise.then(function(payload) {
	 		self.setGames(self.buildGameGrid(gameService.all()));
	 		if ($stateParams) {
	 			self.selectGame($stateParams.gameId);
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
	 self.showDetails = function() {
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

	 self.compareTiles = function(first, second)	{
	 	var match = false;
	 	if(first != null && first != undefined && second != null && second != undefined)
	 	{
	 		switch(first.tile.suit) {
	 			case "Season":
	 			if(first.tile.suit == second.tile.suit)	{
	 				console.log("We have a match!");
	 				match = true;
	 			}
	 			break;
	 			case "Flower":
	 			if(first.tile.suit == second.tile.suit)	{
	 				console.log("We have a match!");
	 				match = true;
	 			}
	 			break;
	 			default:
	 			if(second.tile.suit == first.tile.suit && second.tile.name == first.tile.name) {
	 				console.log("we have a match");
	 				match = true;
	 			}
	 			break;
	 		}
	 	}
	 	return match;
	 }	

	 self.checkSurroundings = function(tile) {
	 	var left = self.leftHasTile(tile);
	 	var right =   self.rightHasTile(tile);
	 	var top =  self.topHasTile(tile);

	 	// console.log("Has tiles left: ");
	 	// console.log(left);

	 	// console.log("Has tiles right: ");
	 	// console.log(right);

	 	// console.log("Has tiles top: ");
	 	// console.log(top);

	 	if((!left || !right) && !top)
	 	{
	 		//console.log("tile is free");
	 		return true;
	 	}
	 	else
	 	{
	 		//console.log("tile is blocked");
	 		return false;
	 	}
	 }

	 self.leftHasTile = function(tile) {
	 	var result = false;

	 	angular.forEach(self.selected.tiles, function(value, key) {
	 		if (value.matched === false) {
	 			var yPositions = [tile.yPos, tile.yPos-1, tile.yPos+1];

	 			if( tile.xPos -2 === value.xPos && yPositions.indexOf(value.yPos) > -1 && tile.zPos === value.zPos)
	 			{
	 				result = true;
	 			}
	 		}
	 		
	 	});
	 	return result;
	 }

	 self.rightHasTile = function(tile) {
	 	var result = false;

	 	angular.forEach(self.selected.tiles, function(value, key) {
	 		if (value.matched === false) {
	 			var yPositions = [tile.yPos, tile.yPos-1, tile.yPos+1];

	 			if( tile.xPos +2 === value.xPos && yPositions.indexOf(value.yPos) > -1 && tile.zPos === value.zPos)	{
	 				result = true;
	 			}
	 		}
	 		
	 	});

	 	return result;
	 }

	 self.topHasTile = function(tile) {
	 	var result = false;

	 	angular.forEach(self.selected.tiles, function(value, key) {
	 		if (value.matched === false) {
	 			var yPositions = [tile.yPos, tile.yPos-1, tile.yPos+1];
	 			var xPositions = [tile.xPos, tile.xPos-1, tile.xPos+1];
	 			if(yPositions.indexOf(value.yPos) > -1 
	 				&& xPositions.indexOf(value.xPos) > -1 
	 				&& (tile.zPos + 1) === value.zPos ) {
	 				result = true;
	 		}
	 	}

	 });

	 	return result;
	 }

	 self.tileClicked = function(selectedTile) {
	 	console.log(selectedTile);
	 	var clickedTile;
	 	self.selected.tiles.forEach(function(tile) {
	 		if (tile._id === selectedTile._id) {
	 			clickedTile = tile;
	 			return;
	 		}
	 	});

	 	var index = clickedTile._id;

	 	var surroundingCheck = self.checkSurroundings(clickedTile);

	 	var match = false;
	 	if(self.firstClick && surroundingCheck )
	 	{
	 		console.log("first tile selected");
	 		self.firstindex = index;
	 		self.first = clickedTile;
	 		self.firstClick = false;
	 	}
	 	else
	 	{			
	 		if(self.firstindex != index && surroundingCheck)
	 		{		
	 			console.log("second tile selected");		
	 			self.second = clickedTile;
	 			match = self.compareTiles(self.first, self.second);		
	 		}
	 		self.firstindex = 0;
	 		self.firstClick = true;
	 	}

	 	if (match === true) {
	 		self.first.matched = true;
	 		self.second.matched = true;
	 		var promise = gameService.match(self.selected._id, self.first._id, self.second._id);
	 		promise.then(function(payload) {

	 		}, function(errorPayload) {
	 			self.first.matched = false;
	 			self.second.matched = false;
	 			console.log("Tiles zijn niet gematched, waarom weet geen mens.");
	 		});
	 	}
	 }

	 if(self.games.length === 0) {
	 	self.reload();	 
	 }

	 self.findMatch = function() {
	 	var boardHasMatchableTiles = true;

	 	self.first = self.findFreeTile();
	 	self.second = self.findSecondFreeTile(self.first);	 	

	 	console.log(self.first);
	 	console.log(self.second);

	 	if(self.first === undefined)
	 	{
	 		console.log("no more matches possible");
	 		boardHasMatchableTiles = false;
	 	}
	 	if(self.second === undefined && boardHasMatchableTiles)
	 	{
	 		self.history.push(self.first);
	 		console.log(self.history);
	 		self.findMatch();
	 	}
	 	else if (boardHasMatchableTiles)
	 	{
	 		console.log("!!!cheatmatch found!!!");
	 	// 	self.first.matched = true;
			// self.second.matched = true;
			self.hintGlow();
			self.history = [];
		}
		else
		{
			alert("No more possible matches could be found. GAME OVER.");
			console.log("GAME CANNOT BE COMPLETED: no matchable tiles left. Please start a new game!");
		}
	}

	self.findFreeTile = function() {
		var freeTile = undefined;
		self.selected.tiles.forEach(function(tile) {
			if(freeTile === undefined)
			{
				var free = self.checkSurroundings(tile);
				if(free && self.history.indexOf(tile) < 0 && !tile.matched)
				{
					freeTile = tile;
				}
			}
		});
		return freeTile;
	}

	self.findSecondFreeTile = function(first) {
		var freeTile = undefined;
		self.selected.tiles.forEach(function(tile) {
			if(freeTile === undefined)
			{
				var free = self.checkSurroundings(tile);
				if(free && !tile.matched)
				{
					var match = self.compareTiles(first, tile);
					if(tile != first && match)
					{
						freeTile = tile;
					}
				}
			}
		});
		return freeTile;
	}

	self.hintGlow = function() {
		console.log("glowing bright");
		var tile1 = document.getElementById("tile-" + self.first._id);
		var tile2 = document.getElementById("tile-" + self.second._id);

		tile1.classList.add('myPulse');
		tile2.classList.add('myPulse');
		setTimeout(function() {
			tile1.classList.remove('myPulse');
			tile2.classList.remove('myPulse');
		}, 2500);

        // document.getElementById("tile-" + self.first._id).style ["-webkit-animation-duration"] = "1s";
        // document.getElementById("tile-" + self.first._id).style ["animation-duration"] = "1s";
        // document.getElementById("tile-" + self.first._id).style ["animation-iteration-count"] = "3";
        // document.getElementById("tile-" + self.first._id).style ["-webkit-animation-fill-mode"] = "both";
        // document.getElementById("tile-" + self.first._id).style ["animation-fill-mode"] = "both";     
        // document.getElementById("tile-" + self.first._id).style ["-webkit-animation-name"] = "pulse";
        // document.getElementById("tile-" + self.first._id).style ["animation-name"] = "pulse";

        // document.getElementById("tile-" + self.second._id).style ["-webkit-filter"] = "drop-shadow(0px 0px 10px rgba(255,255,0, 1))";
    }

    self.cheat = function() {
    	self.findMatch();
    }

    self.reload();	 	
};
