(function() {
	var GameEntity = function(level, x, y, w, h) {
		Vector.call(this, x, y, w, h)
		this.level = level;
	}
	GameEntity.prototype = window.extend(Vector);
	GameEntity.prototype.update = function(time, delta) {
		var xd = ((Math.random() - 0.5) * 100 * delta), yd = ((Math.random() - 0.5) * 100 * delta);
		this.move(xd, yd);
	};
	GameEntity.prototype.render = function(ctx) {
		/*var r = randomInt(255);
		var g = randomInt(255);
		var b = randomInt(255);
		ctx.fillStyle = 'rgba('+ r +','+ g +','+ b + ',.1)';*/
		ctx.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
	};
	GameEntity.prototype.layer = 'base';
	GameEntity.prototype.move = function(xd, yd) {
		if(xd) {
			this.x += xd;
			if(this.x > this.level.width + this.width / 2 && xd > 0)
				this.x = -this.width / 2;
			if(this.x < -this.width / 2 && xd < 0)
				this.x = this.level.width + this.width / 2;
		}
		if(yd) {
			this.y -= yd;
			if(this.y > this.level.height + this.height / 2 && yd < 0)
				this.y = -this.height / 2;
			if(this.y < -this.width / 2 && yd > 0)
				this.y = this.level.height + this.height / 2;
		}

		return xd || yd;
	};
	window.GameEntity = GameEntity;
})();