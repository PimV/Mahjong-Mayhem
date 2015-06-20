module.exports = function(){
	return {
		restrict: 'E',
		link: function(scope, element, attrs) {
			var tile = scope.tile;

			var tileWidth = 73;
			var tileHeight = 100;

			var style = "width: " + tileWidth + 'px;';
			style += "height: " + tileHeight + 'px;';
			style += "background: " + 'url(/assets/spritesdsmall.png) ' + tile.sheetX + 'px ' + tile.sheetY + 'px;';
			style += "transform-style: " + 'preserve-3d;';
			style += "-webkit-transform-style: " + 'preserve-3d;';
			style += "-webkit-backface-visibility: " + 'hidden;';
			style += "background-size: " + 'cover;';
			style += "display: table-cell;";
			style += "float: left;";

			attrs.$set('style', style);

			// attrs.$set('width', tileWidth + 'px');
			// attrs.$set('height', tileHeight + 'px');
			// attrs.$set('background', 'url(/assets/spritesdsmall.png) ' + tile.sheetX + 'px ' + tile.sheetY + 'px');
			// attrs.$set('transform-style', 'preserve-3d');
			// attrs.$set('webkit-transform-style', 'preserve-3d');
			// attrs.$set('webkit-backface-visibility', 'hidden');
			// attrs.$set('background-size', 'cover');

            // var fullPathUrl = "http://.../";
            // if(element[0].tagName === "A") {
            //     attrs.$set('href',fullPathUrl + attrs.fullPath);
            // } else {
            //     attrs.$set('src',fullPathUrl + attrs.fullPath);
            // }
        }
    };
}