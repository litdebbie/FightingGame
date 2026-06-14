export class Fighter {
    constructor(name, x, y, velocity) {
        this.name = name;
        this.image = new Image();
        this.position = { x, y };
        this.velocity = velocity;
    }

    update(secondsPassed, c) {
        this.position.x += this.velocity * secondsPassed;    // update character's x position

        if(this.position.x > c.canvas.width - this.image.width || this.position.x < 0) this.velocity = -this.velocity;     // ensure character does not go off screen
    }

    draw(c) {
        c.drawImage(this.image, this.position.x, this.position.y);    // draw character on screen
    }
}