'use strict';

function Routes($stateProvider, $locationProvider, $urlRouterProvider) {
	//Enable HTML5 mode
	$locationProvider.html5Mode(true);

	$stateProvider
		.state('authcallback', {
			url: '/authcallback?username&token',
			controller: 'AuthController',
			templateUrl: 'views/games/games.list.html',
			title: 'Auth'
		})
		.state('home', {
			url: '/',
			controller: 'GameController as vm',
			templateUrl: 'views/games/games.list.html',
			title: 'Home'
		});
		$stateProvider.state('games', {
			abstract: true,
          	url: '/games',
    		templateUrl: 'views/games/games.html',
          	controller: 'GameController as vm',
          	title: 'Game'
      	})
		.state('games.list', {
			url: '/',
			templateUrl: 'views/games/games.list.html',
			controller: 'GameController as vm',
			title: 'Games'
		})
		.state('games.create', {
			url: '/create',
			templateUrl: 'views/games/games.create.html',
			controller: 'GameController as vm',
			title: 'Create Game'
		})
		.state('games.details', {
			url: '/:gameId',
			templateUrl: 'views/games/games.details.html',
	        controller: 'GameController as vm',
	        title: 'Game Details'
		})
		.state('users', {
			abstract: true,
          	url: '/users',
    		templateUrl: 'views/users/users.html',
          	controller: 'UserController as vm_users',
          	title: 'User'
      	})
		.state('users.list', {
			url: '',
			templateUrl: 'views/users/users.list.html',
			controller: 'UserController as vm_users',
			title: 'Users'
		})
		.state('users.create', {
			url: '/create',
			templateUrl: 'views/users/users.create.html',
			controller: 'UserController as vm_users',
			title: 'Create User' 
		})
		.state('users.details', {
			url: '/:userId',
			templateUrl: 'views/users/users.detail.html',
	        controller: 'UserController as vm_users',
	        title: 'User Details'
		});

	
	$urlRouterProvider.otherwise('/');
}

module.exports = Routes;