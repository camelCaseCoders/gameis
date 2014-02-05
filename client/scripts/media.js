var Media = function() {
	var listeners = [],
		loaders = [];

	return {
		ready: function(callback) {
			listeners.push(callback);
		},
		load: function(loader) {
			loaders.push();
			return this;
		},
		start: function() {

		}
	};
}();