var terrain, hat, gun, muzzleflash, bullet; 
var empty, shot;
var width, height, tmX, tmY;
let enemies = [];
let spawns = [];
var game_state = "MENU";
let spawnRange = [0, 180];

var buttons = [];

// TODO: 
// -buttons hover
// -edit revolver
// -shooting behind
// -find better terrain texture
// -multikill

// Not sure if done
// -add random spawn
// -ammo

function setup() {
	createCanvas(displayWidth, windowHeight-100);
	background(0);
	angleMode(DEGREES);
	imageMode(CENTER);
	player.x = width / 2;
	player.y = height / 2;
	setInterval(spawn, 2000); // spawn enemy every 5 seconds	
	checkboxAreas = createCheckbox('Visible spawn areas', false);
	checkboxSpawns = createCheckbox('Visible spawns', false);
	buttons[0] = new Button("Play", "GAME", width/2, 200, 150, 50);
	buttons[1] = new Button("Settings", "SETTINGS", width/2, 300, 150, 50);
	buttons[2] = new Button("About", "ABOUT", width/2, 400, 150, 50);

}

function preload() {
	// GPX
	terrain = loadImage('img/terrain.jpg');
	hat = loadImage('img/hat.png');
	gun = loadImage('img/gun.png');
	muzzleflash = loadImage('img/muzzleflash.png');
	bullet = loadImage('img/bullet.png');
	// Sounds
	empty = loadSound('sounds/empty.wav');
	shot = loadSound('sounds/shot.wav');
}

function draw_game() {
	background(0);
	drawTerrain();
	
	enemies.forEach(enemy => {
		enemy.move();
		enemy.draw();
	});
	
	player.control();
	player.draw();
	if(player.muzzleflashOn){
		player.drawMuzzleFlash();
	};


	// Draw spawns
	if(checkboxSpawns.checked()){
		spawns.forEach(spawn => {
			ellipse(spawn[0], spawn[1], 5, 5)
		});
	};
	// Draw spawn areas
	if(checkboxAreas.checked()){
		drawSpawnAreas();
	};

	drawCrosshairs();
	drawBullets();

	textSize(32);
	text(player.score, width-50, 40)

	if(player.bullets == 0){
		player.bullets = -1;
		setTimeout(()=>{player.bullets = 6}, 2000)
		console.log("reset");
	};
	// let rotation = atan2(mouseX - player.x, mouseY - player.y);
	// let a = sin(rotation)*1000;
	// let b = cos(rotation)*1000;
	// line(player.x, player.y, player.x + a, player.y + b);
	// console.log(pDistance(mouseX, mouseY, player.x, player.y, player.x + a, player.y + b));

}

function draw_menu(){
	background(0);	
	textAlign(CENTER, CENTER);
	textSize(50);
	fill(255);
	noStroke();
	text("Don't miss!!!", width/2, 100);
	
	buttons.forEach(button => {
		button.draw();
	})

	drawCrosshairs();
}

function draw(){
	if(game_state == "MENU"){
		draw_menu();
	} else if(game_state == "GAME"){
		draw_game();
	} else if(game_state == "SETTINGS"){
		debugger;
	} else {
		debugger;
	}
}