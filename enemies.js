class Enemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.speed = settings.speed;
        this.radius = 10;
    }
    draw(){
        let rotation = -(180 + atan2(player.x - this.x, player.y - this.y));
		push();
		translate(this.x, this.y);
		rotate(rotation);
        stroke(255);
        fill(0);
        line(0, 0, 0, -20);
        ellipseMode(CENTER);
		circle(0, 0, this.radius);
        pop();
        
        // circle(this.x, this.y, this.radius);
    }
    move(){
        let a = this.speed * sin(atan2(player.x - this.x, player.y - this.y));
        let b = this.speed * cos(atan2(player.x - this.x, player.y - this.y));
        this.x += a;
        this.y += b;
    }
    checkPlayerDist(){
        if(dist(player.x, player.y, this.x, this.y) < this.radius + player.radius){
            game_state = "GAME_OVER"
        }
    }
}