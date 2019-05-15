class Powerup {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 32;
        this.height = 32;
        this.radius = 16;
    }
    draw(){
        noStroke();
        rectMode(CENTER);
        fill(255);
        
        image(speedup, this.x, this.y, 32, 32);
    }
    activate(){
        player.speed *= 2;
        powerup.setVolume(0.1);
        powerup.play();
        
        objects.push({draw: ()=>{
            textAlign(CENTER, CENTER);
            textSize(settings.textSize*20);
            fill(255);
            noStroke();
            text("2x speed", width / 2, 1*(height/6));
        }});
        setTimeout(()=>{
            objects = objects.slice(1);
        }, 1000);

        setTimeout(()=>{
            if(game_state="GAME"){ //Prevents sound if dead
                powerupoff.setVolume(0.1);
                powerupoff.play();
                player.speed /= 2;
            };
        }, 5000);
    }
}