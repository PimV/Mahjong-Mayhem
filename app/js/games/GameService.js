(function(){
	'use strict';

	angular.module('games')
	.service('gameService', ['$q', GameService]);

	/**
	 * Users DataService
	 * Uses embedded, hard-coded data model; acts asynchronously to simulate
	 * remote data service call(s).
	 *
	 * @returns {{loadAll: Function}}
	 * @constructor
	 */
	 function GameService($q){
		var games = [
			{
				"layout": "shanghai", // -> 'shanghai'|'snake'|'ox'|'ram'|'dragon'|'rooster'|'monkey'
				"createdOn": Date.now, // date + time
				"startedOn": Date.now, // date + time
				"endedOn": Date.now, // date + time
				"createdBy": {
					"id": "tajreynd", // Avans username
					"name": "Thomas Reynders", // fullname
					"email": "tajreynd@student.avans.nl", // avans e-mail
					"nickname": "ninox" // maybe filled later?
				},
				"minPlayers": 1, // 35 <= x >= 1, Required number of players to start
				"maxPlayers": 4,  // 35 <= x >= 1
				"players": [
					{
						"id": "tajreynd", // Avans username
						"name": "Thomas Reynders", // fullname
						"email": "tajreynd@student.avans.nl", // avans e-mail
						"nickname": "ninox" // maybe filled later?
						// Properties like score and isWinner maybe filled later
					},
					{
						"id": "pimvl", // Avans username
						"name": "Pim Verlangen", // fullname
						"email": "pim@student.avans.nl", // avans e-mail
						"nickname": "The_destoyer" // maybe filled later?
						// Properties like score and isWinner maybe filled later
					}
				],
				"state": "open" // -> 'open'|'playing'|'finished'
			}
		];

		// Promise-based API
		return {
			loadAllGames : function() {
				// Simulate async nature of real remote calls
				return $q.when(games);
			}
		};
	}

})();
