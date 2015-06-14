module.exports = function($rootScope, $timeout) {
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
};