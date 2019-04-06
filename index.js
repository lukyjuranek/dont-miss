var terrain, hat, gun, muzzleflash, bullet;
var empty, shot;
var width, height, tmX, tmY;
let enemies = [];
let spawns = [];
var game_state = "MENU";

let fps = 0;

const UI = {
	buttons: {
		menu: [],
		game_over: [],
		settings: []
	}
}

function setup() {
	createCanvas(displayWidth, windowHeight);
	background(0);
	angleMode(DEGREES);
	imageMode(CENTER);
	frameRate(60);
	textFont(PressStart2P);

	// checkboxAreas = createCheckbox('Visible spawn areas', false);
	// checkboxSpawns = createCheckbox('Visible spawns', false);
	
	initButtons();
	
	setInterval(spawn, 1000/settings.spawnSpeed); // spawn enemy every x seconds	

	setInterval(() => {
		fps = frameRate();
		refreshHighScore();
	}, 500)

}

function preload() {
	// GPX
	plank = loadImage('img/plank.png');
	fullscreen = loadImage('img/fullscreen.png');
	logo = loadImage('img/logo.png');
	terrain = loadImage('img/beachsand.jpg');
	hat = loadImage('img/hat.png');
	gun = loadImage('img/gun.png');
	muzzleflash = loadImage('img/muzzleflash.png');
	bullet = loadImage('img/bullet.png');
	// Sounds
	empty = loadSound('sounds/empty.wav');
	shot = loadSound('sounds/shot.wav');
	reload = loadSound('sounds/reload.wav');

	PressStart2P = loadFont('fonts/PressStart2P.ttf');
}

function draw_game() {
	background(0);
	drawTerrain();

	enemies.forEach(enemy => {
		enemy.move();
		enemy.draw();
		enemy.checkPlayerDist();
	});

	player.control();
	player.draw();

	// // Draw spawns
	// if (checkboxSpawns.checked()) {
	// 	spawns.forEach(spawn => {
	// 		ellipse(spawn[0], spawn[1], 5, 5)
	// 	});
	// };
	// // Draw spawn areas
	// if (checkboxAreas.checked()) {
	// 	drawSpawnAreas();
	// };

	drawCrosshairs();
	drawBullets();
	drawFrameRate();

	textSize(32);
	text(player.score, width - 50, 40)

	if (player.bullets == 0) {
		player.reload();
	};
}

function draw_menu() {
	background(0);
	textAlign(CENTER, CENTER);
	textSize(50);
	fill(255);
	noStroke();
	text("Don't miss!!!", width / 2, 1*(height/6));

	UI.buttons.menu.forEach(button => {
		button.draw();
	});

	drawCrosshairs();
}

function draw_settings() {
	background(0);
	textAlign(CENTER, CENTER);
	textSize(40);
	fill(255);
	noStroke();
	text("Settings", width / 2, 1*(height/6));

	UI.buttons.settings.forEach(button => {
		button.draw();
	});

	drawCrosshairs();
}

function draw_game_over() {
	background(0);
	textAlign(CENTER, CENTER);
	textSize(40);
	fill(255);
	noStroke();
	if (player.miss) {
		text("You missed!!!", width / 2, 1*(height/6));
	} else {
		text("You died!!!", width / 2, 1*(height/6));
	}
	textSize(20);
	text("Score: " + player.score, width / 2, 2*(height/6));
	textSize(15);
	text("High score: " + player.high_score, width / 2, 3*(height/6));
	UI.buttons.game_over.forEach(button => {
		button.draw();
	})
}

function draw() {
	var t0 = performance.now();
	if (game_state == "MENU") {
		draw_menu();
	} else if (game_state == "GAME") {
		draw_game();
	} else if (game_state == "GAME_OVER") {
		draw_game_over();
	} else if (game_state == "CONTROLS") {
		game_state = "MENU";
	} else if (game_state == "SETTINGS") {
		draw_settings();
	} else if (game_state == "ABOUT") {
		game_state = "MENU";
	} else {
		debugger;
	}

	var t1 = performance.now();
	// console.log((t1 - t0));
}