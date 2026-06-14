export class Fighter {
    constructor(name, x, y, velocity) {
        this.name = name;
        this.image = new Image();
        this.frames = new Map();
        this.position = { x, y };
        this.velocity = velocity;
        this.animationFrame = 'forward-1';
    }

    update(secondsPassed, c) {
        const [x, y, width, height] = this.frames.get(this.animationFrame);

        this.position.x += this.velocity * secondsPassed;    // update character's x position

        if(this.position.x > c.canvas.width - width || this.position.x < 0) this.velocity = -this.velocity;     // ensure character does not go off screen
    }

    draw(c) {
        const [x, y, width, height] = this.frames.get(this.animationFrame);

        c.drawImage(this.image, x, y, width, height, this.position.x, this.position.y, width, height);    // draw character on screen
    }
}