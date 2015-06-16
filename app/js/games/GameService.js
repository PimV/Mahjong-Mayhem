
'use strict';
module.exports = function ($q, $http){
	var service = {};
	service.baseUrl = "http://mahjongmayhem.herokuapp.com";
	service.games = [];
	service.tileSet = [
		['character_1', 'character_2', 'character_3', 'character_4','character_5','character_6','character_7','character_8','character_9','wind_north', 'wind_south', 'wind_east', 'wind_west', 'dragon_green'],
		['bamboo_1', 'bamboo_2', 'bamboo_3', 'bamboo_4','bamboo_5','bamboo_6','bamboo_7','bamboo_8','bamboo_9','season_spring', 'season_summer', 'season_autumn', 'season_winter', 'dragon_red'],
		['circle_1', 'circle_2', 'circle_3', 'circle_4','circle_5','circle_6','circle_7','circle_8','circle_9','flower_bamboo', 'flower_orchid', 'flower_chrysantememum', 'flower_plum', 'dragon_white']
	];

	/**
	 * Create a new Game
	 * @param {} obj Game object
	 * @example
	 * {"templateName": "Ox","minPlayers": 2,"maxPlayers": 32}
	 */
	service.add = function(obj){
		return $http.post(service.baseUrl+'/games', obj)
		.success(function(data,status,headers,config) {
			console.log(data);
		})
		.error(function(data,status,headers,config) {
			console.log(data);
		});
	}
	

	/**
	 * Returns a game object 
	 * @param  string id 
	 * @return {}
	 */
	service.get = function(id){
		if(angular.isNumber(id)){
			return service.games[id];
		} else {
			return null;
		}
	}


	/**
	 * Removes a game from the array
	 * @param  {} item game object
	 */
	service.remove = function(item){
		var index = service.games.indexOf(item);
		service.games.splice(index, 1);
	}


	/**
	 * Returns all loaded game objects
	 * @return {} games collection
	 */
	service.all = function(){
		if (service.games && service.games.length > 0) {
			console.log("sg");
			return service.games;
		} else {
			console.log("sg when");
			return $q.when(service.games).then(function(games) { return games; })
		}
	}


	/**
	 * Use a http request to 
	 * Start a single game
	 * NOTE: There need to be enough players
	 * NOTE: Logged in user is the owner of the game
	 *
	 * 
	 * @param  {[type]} gameId [description]
	 * @return {[type]}        [description]
	 */
	service.start = function(gameId){
		return $http.post(service.baseUrl+'/games/'+gameId+'/start', {})
		.success(function(data,status,headers,config) {
			console.log(data);
		})
		.error(function(data,status,headers,config) {
			console.log(data);
		});
	}


	/**
	 * Use a http request to retrieve 
	 * all game objects from the server
	 * 
	 * @uses $http
	 * @return {} promise
	 */
	service.loadFromApi = function() {
		return $http.get(service.baseUrl+'/games')
		.success(function(data,status,headers,config) {
			service.games = data;
		})
		.error(function(data,status,headers,config) {
			console.log(data);
		});
	}


	/**
	 * Use a http request to retrieve all 
	 * tiles from a single game
	 * @param String gameId
	 * @uses $http
	 * @return {} promise
	 */
	service.loadTiles = function(gameId) {
		return $http.get(service.baseUrl+'/games/' + gameId + '/tiles')
		.success(function(data,status,headers,config) {
			console.log("done");
		})
		.error(function(data,status,headers,config) {
			console.log(data);
		});
	}


	/**
	 * Use a http request to retrieve all 
	 * Players from a single game
	 * 
	 * @param String gameId
	 * @uses $http
	 * @return {} promise
	 */
	service.loadPlayers = function(gameId){
		return $http.get(service.baseUrl+'/games/' + gameId + '/players')
		.success(function(data,status,headers,config) {
			console.log("done");
		})
		.error(function(data,status,headers,config) {
			console.log(data);
		});
	}

	return service;
}
