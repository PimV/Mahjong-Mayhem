'use strict';

var name = "games";

// Prepare the 'users' module for subsequent registration of controllers and delegates
angular.module(name, [ 
	'ngMaterial' 
])
.service('GameService', [
	'$q', 
	'$http',
	require('./GameService')
])
.controller('GameController', [
		'GameService', 
		'colorFactory',
		'$scope', 
		'$stateParams', 
		'$log',
		'$filter',
		'$mdBottomSheet',
		'$state',
		require('./GameController')
	]
);/*
.controller('DetailsController',[ 
		'$mdBottomSheet'
	]
)*/
