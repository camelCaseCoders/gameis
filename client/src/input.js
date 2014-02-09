(function($window) {

	var keyboard = window.keyboard = function() {
		var keys = {},
			names = {
				'a': 65,
				'w': 87,
				'd': 68,
				's': 83,

				'left-arrow': 37,
				'up-arrow': 38,
				'right-arrow': 39,
				'down-arrow': 40,

				'shift': 16
		};
		$window.keydown(function(e) {
			//temporary solution
			if(e.which == 38 || e.which == 40)
				e.preventDefault();
			keys[e.which] = true;
		})
		.keyup(function(e) {
			keys[e.which] = false;
		})

		return {
			down: function(key) {
				return keys[names[key] || key];
			},
			reset: function() {
				keys = {};
			}
		}
	}();

	var mouse = window.mouse = function() {
		var pos = {}, buttons = {},
			names = {
				'left': 1,
				'middle': 2,
				'right': 3
		};

		$window.mousemove(function(e) {
			pos.x = e.pageX;
			pos.y = e.pageY;
		})
		.mousedown(function(e) {
			buttons[e.which] = true;
		})
		.mouseup(function(e) {
			buttons[e.which] = false;
		});

		return {
			pos: pos,
			down: function(button) {
				return buttons[names[button] || button];
			},
			reset: function() {
				buttons = {};
			}
		}
	}();

	$window.blur(function() {
		keyboard.reset();
		mouse.reset();
	});

})($(window))