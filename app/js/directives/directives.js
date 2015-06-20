'use strict';
module.exports = function(constants){
	//http://www.ng-newsletter.com/posts/directives.html
	
	angular.module(constants.appTitle)
	.directive('header', require('./header'))
	.directive('main', require('./main'))
	.directive('gamePanel', require('./gamePanel'))
	.directive('tile', require('./tile'))
	.directive('matchedTile', require('./matchedTile'))
	.directive('updateTitle', ['$rootScope', '$timeout', require('./updateTitle')])
	.directive('gameMenu', require('./gameSidebar'));
}
