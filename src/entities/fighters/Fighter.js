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
        // const [[, , width]] = this.frames.get(`forward-${this.animationFrame}`);

        const [
            [x, y, width, height], 
            [originX, originY],
        ] = this.frames.get(`forward-${this.animationFrame}`);

        // check if the game time value is greater than our local animationTimer value + 60ms delay
        if(time.previous > this.animationTimer + 60) {
            this.animationTimer = time.previous;    // update aminationTimer, preparing for the next animation frame

            this.animationFrame++;  // increment animationFrame index
            if(this.animationFrame > 7) this.animationFrame = 1;    // reset animationFrame index --> results in loop
        }

        this.position.x += this.velocity * time.secondsPassed;    // update character's x position

        if(this.position.x > c.canvas.width - width / 2 || this.position.x < width / 2) this.velocity = -this.velocity;     // ensure character does not go off screen
    }

    drawDebug(c) {
        c.lineWidth = 1;

        // creates cross to locate where origin point is
        c.beginPath();
        c.strokeStyle = 'blue';
        c.moveTo(this.position.x - 5, this.position.y);
        c.lineTo(this.position.x + 4, this.position.y);
        c.moveTo(this.position.x, this.position.y - 5);
        c.lineTo(this.position.x, this.position.y + 4);
        c.stroke();
    }

    draw(c) {
        const [
            [x, y, width, height], 
            [originX, originY],
        ] = this.frames.get(`forward-${this.animationFrame}`);

        // draw character on screen
        c.drawImage(
            this.image,
            x, y, 
            width, height, 
            this.position.x - originX, this.position.y - originY, 
            width, height
        );

        this.drawDebug(c);
    }
}