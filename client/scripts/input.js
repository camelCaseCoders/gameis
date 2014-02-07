var Input = function() {
	var keys = {};
	$(window).keydown(function(e) {
		//temporary solution
		if(e.keyCode == 38 || e.keyCode == 40)
			e.preventDefault();
		keys[e.keyCode] = true;
	}).keyup(function(e) {
		keys[e.keyCode] = false;
	});
	return {
		keys: {
			'left-arrow': 37,
			'up-arrow': 38,
			'right-arrow': 39,
			'down-arrow': 40,
		},
		keydown: function(key) {
			return keys[key];
		}
	}
}();

