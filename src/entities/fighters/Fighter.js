export class Fighter {
    constructor(name, x, y, velocity) {
        this.name = name;
        this.image = new Image();
        this.frames = new Map();
        this.position = { x, y };
        this.velocity = velocity;
        this.animationFrame = 1;
        this.animationTimer = 0;
    }

    update(time, c) {
        const [x, y, width, height] = this.frames.get(`forward-${this.animationFrame}`);

        // check if the game time value is greater than our local animationTimer value + 60ms delay
        if(time.previous > this.animationTimer + 60) {
            this.animationTimer = time.previous;    // update aminationTimer, preparing for the next animation frame

            this.animationFrame++;  // increment animationFrame index
            if(this.animationFrame > 5) this.animationFrame = 1;    // reset animationFrame index --> results in loop
        }

        this.position.x += this.velocity * time.secondsPassed;    // update character's x position

        if(this.position.x > c.canvas.width - width || this.position.x < 0) this.velocity = -this.velocity;     // ensure character does not go off screen
    }

    draw(c) {
        const [x, y, width, height] = this.frames.get(`forward-${this.animationFrame}`);

        c.drawImage(this.image, x, y, width, height, this.position.x, this.position.y, width, height);    // draw character on screen
    }
}