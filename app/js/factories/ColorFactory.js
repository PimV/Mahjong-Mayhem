'use strict';
/**
 * Color Factory
 * 
 */
module.exports = function ($mdColorPalette){
	var factory = {};
	
	factory.colors = [
		"red",
		"pink",
		"purple",
		"deep-purple",
		"indigo",
		"blue",
		"light-blue",
		"cyan",
		"teal",
		"green",
		"light-green",
		"lime",
		"yellow",
		"amber",
		"orange",
		"deep-orange",
		"brown",
		"grey",
		"blue-grey"
	];
	
	factory.random = function(){
		return factory.color(factory.colors[Math.floor(Math.random()*factory.colors.length)]);
	};

	/**
	 * Return or bake color 
	 * @param  String IndexOf factory.colors[]
	 * @return {}   Object color()
	 * usage : var red = factory.color('red').toRGB();
	 */
	factory.color = function(index)
	{
		var value = $mdColorPalette[index]['400'].value;
		var toRGB = function( color ){
			return 'rgb('+value[0]+', '+value[1]+', '+value[2]+');';
		};
		var c = {
			index: index,
			value: value,
			rgb: toRGB()
		};
		return c;
	}
	
	return factory;
}
