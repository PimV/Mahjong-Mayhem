'use strict';

var name = "auth";

// Prepare the 'users' module for subsequent registration of controllers and delegates
angular.module(name, [ 
	'ngMaterial' 
])
.controller('AuthController', [
		'$scope', 
		'$stateParams', 
		'$state',
		require('./AuthController')
	]
);