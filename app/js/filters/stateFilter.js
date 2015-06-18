module.exports = function(){
	return function (input, sort) {
		var out = [];
		
		if(sort == null){
			return input;
		}

		angular.forEach(input, function(value){
			if(value.state === sort){
				out.push(value);
			}
		});
		return out;
	};
}
