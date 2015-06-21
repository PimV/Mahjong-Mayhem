module.exports = function(){
	return {
		restrict: 'E',
	    // templateUrl:'views/directives/tile.html',
	    link: function(scope, element, attrs) {
	    	var tile = scope.tile;

	    	var tileWidth = 73;
	    	var tileHeight = 100;

	    	var style = "width: " + tileWidth + 'px;';
	    	style += "height: " + tileHeight + 'px;';
	    	style += "background: " + 'url(/assets/spritesdsmall.png) ' + tile.sheetX + 'px ' + -tile.sheetY + 'px;';
	    	style += "transform-style: " + 'preserve-3d;';
	    	style += "-webkit-transform-style: " + 'preserve-3d;';
	    	style += "-webkit-backface-visibility: " + 'hidden;';
	    	style += "background-size: " + 'cover;';
	    	style += "-webkit-transform: " + 'translate3d(' + tile.boardX + 'px, ' + tile.boardY + 'px, ' + tile.boardZ + 'px);';
	    	style += "transform: " + 'translate3d(' + tile.boardX + 'px, ' + tile.boardY + 'px, ' + tile.boardZ + 'px);';
	    	style += "z-index: " + tile.boardZ;

	    	if (tile.hint === true) {
	    		style += "border-style: solid;";
	    		style += "border-width: 5px;";
	    	}

	    	attrs.$set('style', style);
	    	attrs.$set('class', 'tile');
	    	attrs.$set('id',  'tile-' + tile._id);


	    }
	}
}