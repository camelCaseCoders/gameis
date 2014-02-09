window.controls = function() {
	//keyboard key
	var key = function(key) {
		return function() {
			return window.keyboard.down(key);
		}
	}
	//mousebutton
	var button = function(button) {
		return function() {
			return window.mouse.down(button);
		}
	}
	var controls = {
		'walk-up': [
			key('up-arrow'),
			key('w')
		],
		'walk-left': [
			key('left-arrow'),
			key('a')
		],
		'walk-right': [
			key('right-arrow'),
			key('d')
		],
		'walk-down': [
			key('down-arrow'),
			key('s')
		],
		'run': key('shift'),
		'fire': button('left')
	};

	return {
		down: function(action) {
			var control = controls[action];
			if(control) {
				if(angular.isArray(control)) {
					for(var i in control) {
						if(control[i]()) return true;
					}
				} else return control();
			}
		},
		set: function() {
			//to be implemented
		}
	};
}();
