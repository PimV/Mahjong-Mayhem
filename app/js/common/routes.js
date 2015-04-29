'use strict';

function Routes($stateProvider, $locationProvider, $urlRouterProvider) {
	//Enable HTML5 mode
	$locationProvider.html5Mode(true);

	$stateProvider
		.state('home', {
			url: '/',
			controller: 'GameController as vm',
			templateUrl: 'views/games/games.list.html',
			title: 'Home'
		})
		.state('games', {
			// With abstract set to true, that means this state can not be explicitly activated.
        	// It can only be implicitly activated by activating one of its children.
			abstract: true,
			// This abstract state will prepend '/games' onto the urls of all its children.
          	url: '/games',
    		templateUrl: 'views/games/games.html',
          	controller: 'GameController as vm'
      	})
		.state('games.list', {
			url: '',
			templateUrl: 'views/games/games.list.html',
			controller: 'GameController as vm',
			parent: 'games'
		})
		.state('games.details', {
			url: '/{gameId:[0-9]{1,4}}',
			templateUrl: 'views/games/games.details.html',
			
			parent: 'games',
			controller: function($scope, $stateParams){
				console.log($scope);
	        	$scope.game = $scope.games[$stateParams.id];
	        }
		});

	$urlRouterProvider.otherwise('/');
}

module.exports = Routes;