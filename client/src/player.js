(function(key) {
	var Player = window.Player = function(level, x, y, color, controls) {
		var that = this;
		GameEntity.call(this, level, x, y, 50, 50);
		this._ = window.underscore(key, {
			animation: new Animation(new Spritesheet(media.player, 50, 50), 80),
			overlay: new Spritesheet(createOverlay(media.player, color + ',63'), 50, 50),
			controls: new Controls(controls),
			weapon: new Weapon(that, color),
			// overlay: createOverlay(sprite, color + ',63'),
			rotation: 0,
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

		if(xd || yd) {
			var sqrt = Math.sqrt(xd * xd + yd * yd);
			xd *= speed / sqrt;
			yd *= speed / sqrt;
		}

		//SET ROTATION AND CHANGE SPRITE
		if(this.move(xd, yd)) {
			_.rotation = Math.atan2(xd, yd);
			_.animation.update(time);
		} else {
			_.animation.pause();
		}

		_.weapon.update(time);
		if(_.controls.down('fire')) {
			_.weapon.fire(time, _.rotation);
		}
	};
	Player.prototype.render = function(ctx) {
		var _ = this._(key);
		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.rotate(_.rotation);
		_.animation.render(ctx, 0, -this.width / 2, -this.height / 2);
		_.overlay.drawSprite(ctx, 0, _.animation.currentSprite, -this.width / 2, -this.height / 2);
		// ctx.drawImage(_.overlay, -this.width / 2, -this.height / 2)
		ctx.restore();
	};
})({});