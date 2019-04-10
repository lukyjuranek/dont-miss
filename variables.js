var terrain, hat, gun, muzzleflash, bullet;
var empty, shot;
var width, height, tmX, tmY;
let enemies = [];
let spawns = [];
var game_state = "MENU";
var wave = 1;

let fps = 0;

const UI = {
	buttons: {
		menu: [],
		game_over: [],
		settings: []
	}
}

const settings = {
	speed: 1,
	soundEffects: true,
	music: true,
	fullscreen: false,
	spawnSpeed: 2,
	spawnRange: [0, 100],
	gameMode: "CLASSIC",
	gameModes: ["CLASSIC", "SPEEDY"]
}