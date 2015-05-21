'use strict';

function Routes($stateProvider, $locationProvider, $urlRouterProvider, $routeProvider) {
	//Enable HTML5 mode
	$locationProvider.html5Mode(true);
	/*$urlRouterProvider.when('/',[
		'$routeParams',
		//'AuthController'
		require('../auth/AuthController')
	]);*/
	/*$urlRouterProvider.when('/authcallback?username&token', ['$state', '$stateParams', function($state, $stateParams){
		console.log("AUTH", $state.parrams);
		var username = $state.params.username;
		console.log($stateParams);
		$state.go('auth', {username: 'appel', token: 'null'});
	}]);*/
	$routeProvider.when("/authcallback", {
		controller: "AuthController"
	});
	$stateProvider
		.state('home', {
			url: '',
			controller: 'GameController as vm',
			templateUrl: 'views/games/games.list.html',
			title: 'Home'
		})
		.state('games', {
			abstract: true,
          	url: '/games',
    		templateUrl: 'views/games/games.html',
          	controller: 'GameController as vm'
      	})
		.state('games.list', {
			url: '/',
			templateUrl: 'views/games/games.list.html',
			controller: 'GameController as vm'
		})
		.state('games.create', {
			url: '/create',
			templateUrl: 'views/games/games.create.html',
			controller: 'GameController as vm'
		})
		.state('games.details', {
			url: '/{gameId:[0-9]{1,4}}',
			templateUrl: 'views/games/games.details.html',
	        controller: 'GameController as vm'
		});

	
	$urlRouterProvider.otherwise('/');
}

module.exports = Routes;