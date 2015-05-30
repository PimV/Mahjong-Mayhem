'use strict';
module.exports = function(constants){
	//http://www.ng-newsletter.com/posts/directives.html
	
	angular.module(constants.appTitle)
	.directive('header', require('./header'))
	.directive('main', require('./main'))
	.directive('gameMenu', require('./gameSidebar'))
	.directive('updateTitle', ['$rootScope', '$timeout',
		function($rootScope, $timeout) {
			return {
				link: function(scope, element) {

					var listener = function(event, toState) {
						var title = (toState.title) ? toState.title : 'Default title';
						$timeout(function() {
							element.text(title);
						},0,false);
					};

					$rootScope.$on('$stateChangeSuccess', listener);
				}
			};
		}
		]
	);
}
