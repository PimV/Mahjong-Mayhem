'use strict';

function Routes($stateProvider, $locationProvider, $urlRouterProvider) {
	//Enable HTML5 mode
	$locationProvider.html5Mode(true);

	$stateProvider
		.state('login', {
			url: 'http://mahjongmayhem.herokuapp.com/auth/avans?callbackUrl=http://angular.local/authcallback'
		})
		.state('authcallback', {
			url: '/authcallback?username&token',
			controller: 'AuthController',
			templateUrl: 'views/games/games.list.html',
			title: 'Auth'
		})
		.state('home', {
			url: '/',
			templateUrl: 'views/games/games.list.html',
			title: 'Home'
		});


	$stateProvider.state('games', {
			abstract: true,
          	url: '/games',
    		templateUrl: 'views/games/games.html',
          	title: 'Game'
      	})
		.state('games.list', {
			url: '/',
			templateUrl: 'views/games/games.list.html',
			title: 'Games'
		})
		.state('games.create', {
			url: '/create',
			templateUrl: 'views/games/games.create.html',
			title: 'Create Game'
		})
		.state('games.details', {
			url: '/:gameId',
			templateUrl: 'views/games/games.details.html',
	        title: 'Game Details'
		});

	
	$urlRouterProvider.otherwise('/');
}

module.exports = Routes;