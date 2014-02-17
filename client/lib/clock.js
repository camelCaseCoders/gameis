window.clock = (function() {
	var stack = [];
	return {
		log: function() {
			stack.push(Date.now());
		},
		elapsed: function() {
			return(Date.now() - stack.pop());
		},
		get: function(fn) {
			var then = Date.now();
			fn();
			return Date.now() - then;
		}
	};
})();
