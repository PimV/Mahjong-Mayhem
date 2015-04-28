
'use strict';
module.exports = function ($q){
	var service = {};

	service.games = [
		{
			"title": "AVANS GAME 1", //zelf erbij gezet (pim), wellicht handig?
			"layout": "shanghai", // -> 'shanghai'|'snake'|'ox'|'ram'|'dragon'|'rooster'|'monkey'
			"createdOn": (function(d){ d.setDate(d.getDate()-1); return d})(new Date), // date + time
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
		},
		{
			"title": "AVANS GAME 2",
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
					"id": "danieleb", // Avans username
					"name": "Daniel Eijkelenboom", // fullname
					"email": "daniel@student.avans.nl", // avans e-mail
					"nickname": "The_Noob" // maybe filled later?
					// Properties like score and isWinner maybe filled later
				}
				],
			"state": "open" // -> 'open'|'playing'|'finished'
		}
	];

	service.add = function(obj){
		service.games.push(obj);
    }

    service.get = function(){
		return $q.when(service.games);
    }

    service.remove = function(item){
		var index = service.games.indexOf(item);
		service.games.splice(index, 1);
    }
    
	return service;
}
