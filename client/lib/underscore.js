window.underscore = function(key, privates) {
	return function(k) {
		if(k === key) return privates;
	}
};