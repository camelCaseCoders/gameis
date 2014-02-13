(function(key) {
	var Player = window.Player = function(sprite, overlay, controls, level, x, y) {
		GameEntity.call(this, level, x, y, 50, 50);
		this._ = window.underscore(key, {
			controls: new Controls(controls),
			animation: new Animation(new Spritesheet(sprite, 50, 50), 80),
			overlay: new Spritesheet(overlay, 50, 50),
			roation: 0,
			speed: 20,
			runModif: 1.5
		});
	};
	Player.prototype = window.extend(GameEntity);
	Player.prototype.update = function(time, delta) {
		var _ = this._(key);

		var xd = 0, yd = 0, speed = _.speed * delta;
		/*if(_.controls.down('run')) {
			speed *= _.runModif;
			_.animation.setSpeed(50);
		} else {
			_.animation.setSpeed(80);
		}*/
		if(_.controls.down('walk-right')) xd++;
		if(_.controls.down('walk-left')) xd--;
		if(_.controls.down('walk-up')) yd++;
		if(_.controls.down('walk-down')) yd--;
		if(_.controls.down('fire')) {

		}

		if(xd || yd) {
			var sqrt = Math.sqrt(xd * xd + yd * yd);
			xd *= speed / sqrt;
			yd *= speed / sqrt;
		}

		//SET ROTATION AND CHANGE SPRITE
		if(this.move(xd, yd)) {
			_.roation = Math.atan2(xd, yd);
			_.animation.update(time);
		} else {
			_.animation.pause();
		}

	};
	Player.prototype.render = function(ctx) {
		var _ = this._(key);
		ctx.save();
		ctx.translate(this.pos.x, this.pos.y);
		ctx.rotate(_.roation);
		_.animation.render(ctx, 0, -this.width / 2, -this.height / 2);
		_.overlay.drawSprite(ctx, 0, _.animation.currentSprite, -this.width / 2, -this.height / 2);
		ctx.restore();
	};
})({});