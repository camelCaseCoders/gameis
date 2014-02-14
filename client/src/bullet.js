(function(key) {
	var Bullet = window.Bullet = function(level, x, y, xd, yd, overlay) {
		GameEntity.call(this, level, x, y, 30, 30);
		this._ = window.underscore(key, {
			overlay: overlay,
			xd: xd,
			yd: yd
		});
	}
	Bullet.prototype = window.extend(GameEntity);
	Bullet.prototype.update = function(time, delta) {
		var _ = this._(key);
		this.move(_.xd, _.yd);
	};
	Bullet.prototype.render = function(ctx) {
		var _ = this._(key);
		ctx.drawImage(media.bullet, this.x - this.width / 2, this.y - this.height / 2);
		// ctx.drawImage(_.overlay, this.x - this.width / 2, this.y - this.height / 2);
	};
	Bullet.prototype.layer = 'bullet';
})({});