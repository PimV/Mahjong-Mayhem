
'use strict';
module.exports = function ($q, $http){
	var service = {};

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
