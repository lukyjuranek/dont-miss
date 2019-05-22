function initButtons() {
	
	// MENU
	
	UI.buttons.menu[0] = new Button("Play", "GAME", width / 2, 2 * (height / 6), 290, 55, function () {
		resetGame();
	});
	UI.buttons.menu[1] = new Button("Tutorial", "TUTORIAL", width / 2, 3 * (height / 6), 290, 55);
	UI.buttons.menu[2] = new Button("Settings", "SETTINGS", width / 2, 4 * (height / 6), 290, 55);
	UI.buttons.menu[3] = new Button("About", "ABOUT", width / 2, 5 * (height / 6), 290, 55);
	UI.buttons.menu[4] = new imgButton(fullscreen, width - 70, height - 70, 50, 50, function () {
		toggleFullscreen();
	});
	UI.buttons.menu[5] = new imgButton(logo, 70, height - 70, 50, 50, function () {
		window.location.href = "http://lukyjuranek.jecool.net"
	});
	UI.buttons.menu[6] = new Button(settings.gameMode, "MENU", 1.3*(width/6), 3.5*(height/6) - 40, 270, 55, function () {
		let changed = false;
		settings.gameModes.forEach((mode, index) => {
			if(settings.gameMode == mode && !changed){
					if(index+1 > settings.gameModes.length-1){
						index -= settings.gameModes.length;
					};
					settings.gameMode = settings.gameModes[index+1];
					this.text = settings.gameMode;
					changed = true;
				};
		});
	});
	
	// GAME_OVER
	UI.buttons.game_over[0] = new Button("Retry", "GAME", width / 2, 4 * (height / 6), 290, 55, function () {
		resetGame();
	});
	UI.buttons.game_over[1] = new Button("Back to menu", "MENU", width / 2, 5 * (height / 6), 290, 55);
	UI.buttons.game_over[2] = UI.buttons.menu[4];
	UI.buttons.game_over[3] = UI.buttons.menu[5];
	
	// SETTINGS
	// UI.buttons.settings[0] = new Button("Play", "GAME", width / 2, 2 * (height / 6), 290, 55);
	// UI.buttons.settings[0].onPress = function () {
		// 	resetGame();
		// }
		let soundEffects = settings.soundEffects ? "ON" : "OFF";
		UI.buttons.settings[0] = new Button("SFX: " + soundEffects, "SETTINGS", width / 2, 2 * (height / 6), 290, 55, function () {
			settings.soundEffects = !settings.soundEffects;
			let soundEffects = settings.soundEffects ? "ON" : "OFF";
			this.text = "SFX: " + soundEffects;
		});
	let music = settings.music ? "ON" : "OFF";
	UI.buttons.settings[1] = new Button("Music: " + music, "SETTINGS", width / 2, 3 * (height / 6), 290, 55, function () {
		settings.music = !settings.music;
		let music = settings.music ? "ON" : "OFF";
		this.text = "Music: " + music;
	});
	let showFPS = settings.showFPS ? "ON" : "OFF";
	UI.buttons.settings[2] = new Button("Show FPS: " + showFPS, "SETTINGS", width / 2, 4 * (height / 6), 290, 55, function () {
		settings.showFPS = !settings.showFPS;
		let showFPS = settings.showFPS ? "ON" : "OFF";
		this.text = "Show FPS: " + showFPS;
	});
	UI.buttons.settings[3] = new Button("Back to menu", "MENU", width / 2, 5 * (height / 6), 290, 55);
	UI.buttons.settings[4] = UI.buttons.menu[4];
	UI.buttons.settings[5] = UI.buttons.menu[5];

	// ABOUT
	UI.buttons.about[0] = new Button("Back to menu", "MENU", width / 2, 5 * (height / 6), 290, 55);
	UI.buttons.about[1] = UI.buttons.menu[4];
	UI.buttons.about[2] = UI.buttons.menu[5];

	// TUTORIAL
	UI.buttons.tutorial[0] = new Button("Back to menu", "MENU", width / 2, 5 * (height / 6), 290, 55);
	UI.buttons.tutorial[1] = UI.buttons.menu[4];
	UI.buttons.tutorial[2] = UI.buttons.menu[5];
}