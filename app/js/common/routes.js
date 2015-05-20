'use strict';

function Routes($stateProvider, $locationProvider, $urlRouterProvider) {
	//Enable HTML5 mode
	//$locationProvider.html5Mode(true);
	/*$urlRouterProvider.when('/',[
		'$routeParams',
		//'AuthController'
		require('../auth/AuthController')
	]);*/
	$urlRouterProvider.when('/authcallback', ['$state', function($state){
		console.log("AUTH");
		$state.go('auth');
	}]);
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
		})
		.state('auth',{
			url: '/authcallback?username&token',
			controller: 'AuthController'
		});
	
	$urlRouterProvider.otherwise('/');
}

module.exports = Routes;