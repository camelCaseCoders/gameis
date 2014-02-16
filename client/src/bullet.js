(function(key, undefined) {
	var Bullet = window.Bullet = function(level, x, y, xd, yd, owner, overlay) {
		GameEntity.call(this, level, x, y, 30, 30);
		this.owner = owner;
		this.overlay = overlay;
		this.superBullet = typeof owner === 'undefined';

		var speed = 2;
		this._ = window.underscore(key, {
			sprite: imageMerge(media.bullet, overlay),
			xd: xd,
			yd: yd
		});
	}
	Bullet.prototype = window.extend(GameEntity);
	Bullet.prototype.update = function(time, delta) {
		var _ = this._(key);
		this.move(_.xd, _.yd);

		var entities = this.level.entities;
		for(var i in entities) {
			var entity = entities[i];
			if(entity !== this && this.superBullet || (entity !== this.owner && entity.owner !== this.owner)) {
				if(this.distanceTo(entity) < this.width / 2 + entity.width / 2) {
					this.level.removeEntity(this);
					this.level.removeEntity(entity);
					if(this.owner && entity instanceof Bullet && !entity.dead && !entity.superBullet) {
						this.level.addEntity(new Bullet(this.level, this.x, this.y,
						_.xd, _.yd, undefined, imageMerge(this.overlay, entity.overlay)));
						this.dead = true;				
						entity.dead = true;				
					}
				}
			}
		}
	};
	Bullet.prototype.render = function(ctx) {
		var _ = this._(key);
		ctx.drawImage(_.sprite, this.x - this.width / 2, this.y - this.height / 2);
	};
	Bullet.prototype.layer = 'bullet';
})({});