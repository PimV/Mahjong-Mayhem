'use strict';

var name = "games";

// Prepare the 'users' module for subsequent registration of controllers and delegates
angular.module(name, [ 
	'ngMaterial' 
])
.service('gameService', [
	'$q', 
	require('./GameService')
])
.controller('GameController', [
		'gameService', 
		'colorFactory',
		'$scope', 
		'$stateParams', 
		'$log',
		'$q',
		require('./GameController')
	]
);
