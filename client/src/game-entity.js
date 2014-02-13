(function() {
	var GameEntity = window.GameEntity = function(level, x, y, w, h) {
		this.level = level;
		this.pos = new Position(x, y);
		this.width = w;
		this.height = h;
	}
	GameEntity.prototype = {
		update: function(time, delta) {
			var xd = ((Math.random() - 0.5) * 100 * delta), yd = ((Math.random() - 0.5) * 100 * delta);

			this.move(xd, yd);
		},
		render: function(ctx) {
			/*var r = randomInt(255);
			var g = randomInt(255);
			var b = randomInt(255);
			ctx.fillStyle = 'rgba('+ r +','+ g +','+ b + ',.1)';*/
			ctx.fillRect(this.pos.x - this.width / 2, this.pos.y - this.height / 2, this.width, this.height);
		},
		move: function(xd, yd) {
			if(xd) {
				this.pos.x += xd;
				if(this.pos.x > this.level.width + this.width / 2 && xd > 0)
					this.pos.x = -this.width / 2;
				if(this.pos.x < -this.width / 2 && xd < 0)
					this.pos.x = this.level.width + this.width / 2;
			}
			if(yd) {
				this.pos.y -= yd;
				if(this.pos.y > this.level.height + this.height / 2 && yd < 0)
					this.pos.y = -this.height / 2;
				if(this.pos.y < -this.width / 2 && yd > 0)
					this.pos.y = this.level.height + this.height / 2;
			}

			return xd || yd;
		}
	};
})();