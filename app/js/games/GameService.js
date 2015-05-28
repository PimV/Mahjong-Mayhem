
'use strict';
module.exports = function ($q, $http){
	var service = {};

	service.tileSet = [
		['character_1', 'character_2', 'character_3', 'character_4','character_5','character_6','character_7','character_8','character_9','wind_north', 'wind_south', 'wind_east', 'wind_west', 'dragon_green'],
		['bamboo_1', 'bamboo_2', 'bamboo_3', 'bamboo_4','bamboo_5','bamboo_6','bamboo_7','bamboo_8','bamboo_9','season_spring', 'season_summer', 'season_autumn', 'season_winter', 'dragon_red'],
		['circle_1', 'circle_2', 'circle_3', 'circle_4','circle_5','circle_6','circle_7','circle_8','circle_9','flower_bamboo', 'flower_orchid', 'flower_chrysantememum', 'flower_plum', 'dragon_white']
	];

	service.add = function(obj){
		obj.id = service.games.length + 1;
		service.games.push(obj);
	}

	service.all = function(){
		if (service.games && service.games.length > 0) {
			console.log("sg");
			return service.games;
		} else {
			console.log("sg when");
			return $q.when(service.games).then(function(games) { return games; })
		}
	}

	service.loadFromApi = function() {

		return $http.get('http://mahjongmayhem.herokuapp.com/games')
		.success(function(data,status,headers,config) {
			service.games = data;
		})
		.error(function(data,status,headers,config) {
			console.log(data);
		});
	}

	service.loadTiles = function(gameId) {
		return $http.get('http://mahjongmayhem.herokuapp.com/games/' + gameId + '/tiles')
		.success(function(data,status,headers,config) {
			console.log("done");
		})
		.error(function(data,status,headers,config) {
			console.log(data);
		});
	}

	service.get = function(id){
		if(angular.isNumber(id)){
			return service.games[id];
		} else {
			return null;
		}
	}

	service.remove = function(item){
		var index = service.games.indexOf(item);
		service.games.splice(index, 1);
	}

	return service;
}
