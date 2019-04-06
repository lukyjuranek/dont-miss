function initButtons() {

	// MENU

	UI.buttons.menu[0] = new Button("Play", "GAME", width / 2, 2 * (height / 6), 280, 55, function () {
		resetGame();
	});
	UI.buttons.menu[1] = new Button("Controls", "CONTROLS", width / 2, 3 * (height / 6), 280, 55);
	UI.buttons.menu[2] = new Button("Settings", "SETTINGS", width / 2, 4 * (height / 6), 280, 55);
	UI.buttons.menu[3] = new Button("About", "ABOUT", width / 2, 5 * (height / 6), 280, 55);
	UI.buttons.menu[4] = new imgButton(fullscreen, width - 70, height - 70, 50, 50, function () {
		toggleFullscreen();
	});
	UI.buttons.menu[5] = new imgButton(logo, 70, height - 70, 50, 50, function () {
		window.location.href = "http://lukyjuranek.jecool.net"
	});

	// GAME_OVER
	UI.buttons.game_over[0] = new Button("Retry", "GAME", width / 2, 4 * (height / 6), 280, 55, function () {
		resetGame();
	});
	UI.buttons.game_over[1] = new Button("Back to menu", "MENU", width / 2, 5 * (height / 6), 280, 55);
	UI.buttons.game_over[2] = UI.buttons.menu[4];

	// SETTINGS
	// UI.buttons.settings[0] = new Button("Play", "GAME", width / 2, 2 * (height / 6), 280, 55);
	// UI.buttons.settings[0].onPress = function () {
	// 	resetGame();
	// }
	let soundEffects = settings.soundEffects ? "ON" : "OFF";
	UI.buttons.settings[0] = new Button("SFX: " + soundEffects, "SETTINGS", width / 2, 2 * (height / 6), 280, 55, function () {
		settings.soundEffects = !settings.soundEffects;
		let soundEffects = settings.soundEffects ? "ON" : "OFF";
		this.text = "SFX: " + soundEffects;
	});
	let music = settings.music ? "ON" : "OFF";
	UI.buttons.settings[1] = new Button("Music: " + music, "SETTINGS", width / 2, 3 * (height / 6), 280, 55, function () {
		settings.music = !settings.music;
		let music = settings.music ? "ON" : "OFF";
		this.text = "Music: " + music;
	});
	UI.buttons.settings[3] = new Button("Back to menu", "MENU", width / 2, 5 * (height / 6), 280, 55);
	UI.buttons.settings[4] = UI.buttons.menu[4];
}

function refreshHighScore() {
	try {
		player.high_score = getCookie("high_score");
	} catch (err) {
		console.warn(err.message);
	};

	if (player.score > player.high_score) {
		player.high_score = player.score;
		createCookie("high_score", player.high_score)
	}
}

function spawn() {
	let x = getRndIntBtwnTwoRanges(settings.spawnRange[0], settings.spawnRange[1], width - settings.spawnRange[1], width);
	let y = getRndIntBtwnTwoRanges(settings.spawnRange[0], settings.spawnRange[1], height - settings.spawnRange[1], height);
	let enemy = new Enemy(x, y);
	spawns.push([x, y]);
	// console.log(x+" "+y);
	enemies.push(enemy);
}

function resetGame() {
	enemies = [];
	spawns = [];
	player.x = width / 2;
	player.y = height / 2;
	player.speed = 1;
	player.bullets = 6;
	player.score = 0;
	player.muzzleflashOn = false;
	player.miss = false;
}

function getRndInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRndIntBtwnTwoRanges(min1, max1, min2, max2) {
	let rnd = getRndInt(0, 1);
	if (rnd == 0) {
		return getRndInt(min1, max1);
	} else if (rnd == 1) {
		return getRndInt(min2, max2);
	} else {
		// Error
		console.log("getRndIntegerBtwnTwoRanges(): rnd = " + rnd)
	}
}

function drawCrosshairs() {
	stroke(255, 0, 0);
	noFill();
	line(mouseX - 20, mouseY, mouseX + 20, mouseY);
	line(mouseX, mouseY - 20, mouseX, mouseY + 20);
	ellipse(mouseX, mouseY, 15, 15);
	ellipse(mouseX, mouseY, 30, 30);
	fill(255, 0, 0);
	ellipse(mouseX, mouseY, 3, 3);
}

function drawBullets() {
	let y = 50;
	for (let i = 0; i < player.bullets; i++) {
		image(bullet, width - y, height - 50, 70, 70);
		y += 30;
	}
}

function drawSpawnAreas() {
	stroke(0);
	noFill();
	rectMode(CORNER);

	let w = settings.spawnRange[1] - settings.spawnRange[0];
	let h = settings.spawnRange[1] - settings.spawnRange[0];
	rect(settings.spawnRange[0], settings.spawnRange[0], w, h);
	rect(width - settings.spawnRange[1], settings.spawnRange[0], w, h);
	rect(settings.spawnRange[0], height - settings.spawnRange[1], w, h);
	rect(width - settings.spawnRange[1], height - settings.spawnRange[1], w, h);
}

function drawFrameRate() {
	fill(255);
	stroke(0);
	textSize(20);
	text(fps.toFixed(0), 30, 30);
}

function mousePressed() {
	if (game_state == "MENU") {
		UI.buttons.menu.forEach(button => {
			if (button.isMouseOnButton()) {
				button.press()
			}
		});
	} else if (game_state == "GAME") {
		player.shoot();
	} else if (game_state == "SETTINGS") {
		UI.buttons.settings.forEach(button => {
			if (button.isMouseOnButton()) {
				button.press()
			}
		});
	} else if (game_state == "GAME_OVER") {
		UI.buttons.game_over.forEach(button => {
			if (button.isMouseOnButton()) {
				button.press()
			}
		});
	}
}

function toggleFullscreen() {
	var elem = document.documentElement;

	if (settings.fullscreen) {
		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.mozCancelFullScreen) {
			/* Firefox */
			document.mozCancelFullScreen();
		} else if (document.webkitExitFullscreen) {
			/* Chrome, Safari and Opera */
			document.webkitExitFullscreen();
		} else if (document.msExitFullscreen) {
			/* IE/Edge */
			document.msExitFullscreen();
		};

		settings.fullscreen = false;
	} else {
		if (elem.requestFullscreen) {
			elem.requestFullscreen();
		} else if (elem.mozRequestFullScreen) {
			/* Firefox */
			elem.mozRequestFullScreen();
		} else if (elem.webkitRequestFullscreen) {
			/* Chrome, Safari & Opera */
			elem.webkitRequestFullscreen();
		} else if (elem.msRequestFullscreen) {
			/* IE/Edge */
			elem.msRequestFullscreen();
		};

		settings.fullscreen = true;
	}

	setTimeout(() => {
		resizeCanvas(displayWidth, windowHeight);
		initButtons();
	}, 200);

}


function pDistance(x, y, x1, y1, x2, y2) {

	var A = x - x1;
	var B = y - y1;
	var C = x2 - x1;
	var D = y2 - y1;

	var dot = A * C + B * D;
	var len_sq = C * C + D * D;
	var param = -1;
	if (len_sq != 0) //in case of 0 length line
		param = dot / len_sq;

	var xx, yy;

	if (param < 0) {
		xx = x1;
		yy = y1;
	} else if (param > 1) {
		xx = x2;
		yy = y2;
	} else {
		xx = x1 + param * C;
		yy = y1 + param * D;
	}

	var dx = x - xx;
	var dy = y - yy;
	return Math.sqrt(dx * dx + dy * dy);
}


const settings = {
	speed: 1,
	soundEffects: true,
	music: true,
	fullscreen: false,
	spawnSpeed: 2,
	spawnRange: [0, 100]
}