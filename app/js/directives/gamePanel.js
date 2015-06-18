module.exports = function(){
	return {
		restrict: 'A',
	    replace: true,
	    controller: 'GameController as gc',
	    
	    templateUrl:'views/partials/game.panel.html'
	};
}