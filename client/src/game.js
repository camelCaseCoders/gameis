var request = Media.request({
	character: Media.loaders.image(Media.dir + 'character.png'),
	smallCharacter: Media.loaders.image(Media.dir + 'favicon.ico'),
	shell: Media.loaders.audio(Media.dir + 'shell.mp3'),
	fire: Media.loaders.audio(Media.dir + 'fire.mp3'),
	player: Media.loaders.spriteSheet(Media.dir + 'player.png', 50, 50)
});
$(document).ready(function() {
	var canvas = document.getElementById('game-canvas'),
		ctx = canvas.getContext('2d');

	request.ready(function(media) {
		var player = {
			x: 100,
			y: 100,
			width: 50,
			height: 50,
			roation: 0,
			speed: 2,
			runModif: 2,
			animspeed: 4,
			currentSprite: media.player.sprites[0][0]
		}
		var ticks = 0;
		function game() {
			//CLEAR
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			//DO SHIT

			//PLAYER MOVEMENT
			var xd = 0, yd = 0, speed = player.speed, animspeed = player.animspeed;
			if(controls.down('run')) {
				speed *= player.runModif;
				animspeed /= player.runModif;
			}
			if(controls.down('walk-right'))
				xd += speed;
			if(controls.down('walk-left'))
				xd -= speed;
			if(controls.down('walk-up'))
				yd += speed;
			if(controls.down('walk-down'))
				yd -= speed;
			if(controls.down('fire')) {
				media.fire.currentTime = 0;
				media.fire.play();
			}

			//SET ROTATION AND CHANGE SPRITE
			var moving = xd || yd;
			if(moving) {
				++ticks;
				player.roation = Math.atan2(xd, yd);
				player.currentSprite = media.player.sprites[0][Math.floor((ticks / animspeed) % 16)];
			}

			//MOVE
			player.x += xd;
			player.y -= yd;

			//CHECKING IF PLAYER IS OUT OF BOUNDS
			if(player.x > canvas.width + player.width / 2 && xd > 0)
				player.x = -player.width / 2;
			if(player.x < -player.width / 2 && xd < 0)
				player.x = canvas.width + player.width / 2;
			if(player.y > canvas.height + player.height / 2 && yd < 0)
				player.y = -player.height / 2;
			if(player.y < -player.width / 2 && yd > 0)
				player.y = canvas.height + player.height / 2;

			//REDRAW

			//ROTATE AND DRAW SPRITE
			ctx.save();
			ctx.translate(player.x, player.y);
			ctx.rotate(player.roation);
			player.currentSprite.draw(ctx, -player.width / 2, -player.height / 2);
			ctx.restore();

			//rect(ctx, -this.pos.w / 2, -this.pos.h / 2, render.w, render.h, alphaColor(255, 0, 0, .3));
			//ctx.fillRect(player.x - player.width / 2, canvas.height - (player.y - player.height / 2), player.width, player.height);
			//ctx.drawImage(media.character, player.x - player.width / 2,
			//canvas.height - (player.y - player.height / 2), player.width, player.height);
		}

		var interval = setInterval(game, 1000 / 60);
	});
	
});