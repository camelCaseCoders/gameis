(function(key, undefined) {
	var Animation = window.Animation = function(sheet, speed) {
		this._ = window.underscore(key, {
			sheet: sheet,
			speed: speed,
			spareTime: 0
		});
		this.currentSprite = 0;
	};
	Animation.prototype = {
		pause: function() {
			this._(key).lastTime = undefined;
		},
		update: function(time) {
			var _ = this._(key);
			if(_.lastTime) _.spareTime += time - _.lastTime;
			var steps = Math.floor(_.spareTime / _.speed)
			if(steps > 0) {
				_.spareTime -= steps * _.speed;
				this.currentSprite = (this.currentSprite + steps) % _.sheet.length;
			}
			_.lastTime = time;
			return this;
		},
		render: function(ctx, sy, dx, dy) {
			var _ = this._(key);
			_.sheet.drawSprite(ctx, sy, this.currentSprite, dx, dy);
		},
		setSpeed: function(speed) {
			this._(key).speed = speed;
		}
	};
})({});

/*API 

var anim = new Animation(Spritesheet, speed;
anim.update(time);
anim.render(ctx, sy, dx, dy);

*/