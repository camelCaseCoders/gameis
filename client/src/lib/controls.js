(function(key) {
	window.key = function(key) {
		return {
			down: function() {
				return keyboard.down(key);
			}
		};
	}
	//mousebutton
	window.button = function(button) {
		return {
			down: function() {
				return mouse.down(button);
			}
		};
	}
	var Controls = window.Controls = function(controls) {
		this._ = window.underscore(key, {
			controls: controls
		});
	};
	Controls.prototype = {
		down: function(action) {
			var _ = this._(key);
			var control = _.controls[action];
			if(control) {
				if(angular.isArray(control)) {
					for(var i in control) {
						if(control[i].down()) return true;
					}
				} else return control.down();
			}
		}
	};
})({});

window.controls = function() {
	var key = function(key) {
		return {
			down: function() {
				return keyboard.down(key);
			}
		};
	}
	//mousebutton
	var button = function(button) {
		return {
			down: function() {
				return mouse.down(button);
			}
		};
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
						if(control[i].down()) return true;
					}
				} else return control.down();
			}
		},
		set: function() {
			//to be implemented
		}
	};
}();