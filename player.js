const player = {
	x: 0,
	y: 0,
	speed: settings.speed,
	bullets: 6,
	score: 0,
	muzzleflashOn: false,
	miss: false,
	shoot() {
		// Set muzzle player.muzzleflashOn to true for 100ms

		if (this.bullets <= 0) {
			empty.setVolume(0.1);
			empty.play();
		} else {
			this.bullets -= 1;

			this.muzzleflashOn = true;
			setTimeout(() => {
				this.muzzleflashOn = false
			}, 100);

			if (settings.soundEffects == true) {
				shot.setVolume(0.1);
				shot.play();
			};

			let rotation = atan2(mouseX - player.x, mouseY - player.y);
			let a = sin(rotation) * 1000;
			let b = cos(rotation) * 1000;
			// Draws bullet trajectory
			// line(player.x, player.y, player.x + a, player.y + b);

			this.miss = true;
			enemies.forEach((enemy, index) => {
				if (pDistance(enemy.x, enemy.y, player.x, player.y, player.x + a, player.y + b) <= enemy.radius) {
					player.score++;
					this.miss = false;
					delete enemies[index];
				};
			});

			if (this.miss) {
				game_state = "GAME_OVER"
			};
		};

	},
	reload: function () {
		this.bullets = -1;
		setTimeout(() => {
			this.bullets = 6
			this.reloading = false;
		}, 2000)
		if (settings.soundEffects) {
			reload.setVolume(0.1);
			reload.play();
		};
		console.log("reload");
	},
	draw: function () {
		let rotation = -(180 + atan2(mouseX - this.x, mouseY - this.y));
		// let rotation = 0;
		push();
		translate(this.x, this.y);
		rotate(rotation);
		stroke(255);
		image(gun, 0, -40, 80, 60)
		image(hat, 0, 0, 50, 50);
		pop();
	},
	control: function () {
		// TODO: two buttons at once problem
		let a = this.speed * sin(45); // X-axis
		let b = this.speed * cos(45); // Y-asix

		if (keyIsDown(87) && keyIsDown(65)) { // WA
			this.x -= a;
			this.y -= b;
		} else if (keyIsDown(65) && keyIsDown(83)) { //AS
			this.x -= a;
			this.y += b;
		} else if (keyIsDown(83) && keyIsDown(68)) { //SD
			this.x += a;
			this.y += b;
		} else if (keyIsDown(68) && keyIsDown(87)) { //DW
			this.x += a;
			this.y -= b;
		} else if (keyIsDown(87)) { //W 87
			this.y -= this.speed;
			// if(key == "w" && !keyIsDown(65) && !keyIsDown(83) && !keyIsDown(68)){
			// 	this.y -= this.speed;
			// } else if(key == "w" && keyIsDown(65) && !keyIsDown(83) && !keyIsDown(68)) {
			// 	let a = this.speed * sin(45);
			// 	let b = this.speed * cos(45);
			// 	console.log(a*a+b*b);
			// 	this.x += a;
			// 	this.y -= b;
			// }
		} else if (keyIsDown(65)) { //A
			this.x -= this.speed;
		} else if (keyIsDown(83)) { //S
			this.y += this.speed;
		} else if (keyIsDown(68)) { //D
			this.x += this.speed;
		};

		if (keyIsDown(82)) {
			if (!this.reloading && this.bullets != 6) {
				this.reloading = true;
				this.reload();
			};
		};
	},
	drawMuzzleFlash: function () {
		let rotation = -(180 + atan2(mouseX - this.x, mouseY - this.y));
		push();
		translate(this.x, this.y);
		rotate(rotation);
		image(muzzleflash, 0, -100, 80, 80)
		pop();
	}
}