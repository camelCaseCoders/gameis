(function(key) {
	var Weapon = function(owner, color) {
		this.owner = owner;
		this._ = window.underscore(key, {
			overlay: createOverlay(media.bullet, color + ',127'),
			color: color,
			speed: 1000,
			bulletSpeed: 2,
			ready: true
		});
	}
	Weapon.prototype = {
		update: function(time) {
			var _ = this._(key);
			if(!_.ready) {
				_.ready = time - _.lastTime >= _.speed;
			}
		},
		fire: function(time, angle) {
			var _ = this._(key);
			if(_.ready) {
				this.owner.level.addEntity(new Bullet(this.owner.level, this.owner.x, this.owner.y,
					Math.sin(angle) * _.bulletSpeed, Math.cos(angle) * _.bulletSpeed, this.owner, _.overlay));
				_.lastTime = time;
				_.ready = false;
			}
		}
	}
	window.Weapon = Weapon;
})({});