module.exports = function(){
	return {
		restrict: 'E',
		replace: true,
	    controller: 'GameController as vm',
	    templateUrl:'views/partials/menu.main.html'
	};
}