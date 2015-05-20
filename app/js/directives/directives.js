'use strict';
module.exports = function(constants){
	//http://www.ng-newsletter.com/posts/directives.html
	
	angular.module(constants.appTitle)
	.directive('header', require('./header'))
	.directive('main', require('./main'))
}
