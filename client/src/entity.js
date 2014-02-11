(function() {
	var Entity = window.Entity = function(level, x, y, w, h) {
		this.level = level;
		this.pos = new Position(x, y);
		this.width = w;
		this.height = h;
	}
	Entity.prototype = {
		update: function(time, delta) {
			var xd = ((Math.random() - 0.5) * 100 * delta), yd = ((Math.random() - 0.5) * 100 * delta);

			this.pos.x += xd;
			this.pos.y -= yd;

			if(this.pos.x > this.level.width + this.width / 2 && xd > 0)
				this.pos.x = -this.width / 2;
			if(this.pos.x < -this.width / 2 && xd < 0)
				this.pos.x = this.level.width + this.width / 2;
			if(this.pos.y > this.level.height + this.height / 2 && yd < 0)
				this.pos.y = -this.height / 2;
			if(this.pos.y < -this.width / 2 && yd > 0)
				this.pos.y = this.level.height + this.height / 2;
		},
		render: function(ctx) {
			ctx.fillRect(this.pos.x - this.width / 2, this.pos.y - this.height / 2, this.width, this.height);
		}
	};
})();