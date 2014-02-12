(function(key) {
	var Player = window.Player = function(sprite, controls, level, x, y) {
		Entity.call(this, level, x, y, 50, 50);
		this._ = window.underscore(key, {
			controls: new Controls(controls),
			animation: new Animation(sprite, 80),
			roation: 0,
			speed: 15,
			runModif: 1.5,
		});
	};
	Player.prototype = window.extend(Entity);
	Player.prototype.update = function(time, delta) {
		var _ = this._(key);

		var xd = 0, yd = 0, speed = _.speed * delta;
		if(_.controls.down('run')) {
			speed *= _.runModif;
			_.animation.setSpeed(50);
		} else {
			_.animation.setSpeed(80);
		}
		if(_.controls.down('walk-right'))
			xd += speed;
		if(_.controls.down('walk-left'))
			xd -= speed;
		if(_.controls.down('walk-up'))
			yd += speed;
		if(_.controls.down('walk-down'))
			yd -= speed;
		if(_.controls.down('fire')) {
		/*	media.fire.pause();
			media.fire.currentTime = 0;
			media.fire.play();*/
		}

		//SET ROTATION AND CHANGE SPRITE
		var moving = xd || yd;
		if(moving) {
			_.roation = Math.atan2(xd, yd);
			_.animation.update(time);
		} else {
			_.animation.pause();
		}

		//MOVE
		this.pos.x += xd;
		this.pos.y -= yd;

		//CHECKING IF PLAYER IS OUT OF BOUNDS
		if(this.pos.x > this.level.width + this.width / 2 && xd > 0)
			this.pos.x = -this.width / 2;
		if(this.pos.x < -this.width / 2 && xd < 0)
			this.pos.x = this.level.width + this.width / 2;
		if(this.pos.y > this.level.height + this.height / 2 && yd < 0)
			this.pos.y = -this.height / 2;
		if(this.pos.y < -this.width / 2 && yd > 0)
			this.pos.y = this.level.height + this.height / 2;

	};
	Player.prototype.render = function(ctx) {
		var _ = this._(key);
		ctx.save();
		ctx.translate(this.pos.x, this.pos.y);
		ctx.rotate(_.roation);
		_.animation.render(ctx, 0, -this.width / 2, -this.height / 2);
		ctx.restore();
	};
})({});