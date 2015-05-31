'use strict';
var name = "nav";
// Prepare the 'users' module for subsequent registration of controllers and delegates
angular.module(name, [ 
	'ngMaterial' 
])
.controller('NavController', [
		'$mdSidenav',
		require('./NavController')
	]
);
