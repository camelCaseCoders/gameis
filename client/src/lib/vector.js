(function() {
	var Vector = function(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	};
	Vector.prototype = {
		distanceTo: function(other) {
			var xDiff = this.x - other.x;
			var yDiff = this.y - other.y;
			return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
		}
	};
	window.Vector = Vector;
})();
