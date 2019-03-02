class Enemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.speed = 1;
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
		ellipse(0, 0, 20, 20);
		pop();
    }
    move(){
        let a = this.speed * sin(atan2(player.x - this.x, player.y - this.y));
        let b = this.speed * cos(atan2(player.x - this.x, player.y - this.y));
        this.x += a;
        this.y += b;
    }
}