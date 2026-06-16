import { FIGHTER_DIRECTION } from '../../constants/fighters.js';

export class Fighter {
    constructor(name, x, y, direction) {
        this.name = name;           // name of character
        this.image = new Image();   // image of character
        this.frames = new Map();    // character animation frames
        this.position = { x, y };   // character position
        this.direction = direction;    // direction of character (which way they're facing)
        this.velocity = 100 * direction;    // character velocity
        this.animationFrame = 0;    // index value for which animation frame to display
        this.animationTimer = 0;    // animation timer
        this.animations = {};       // holds all of the animation frames for a specific action/move
        this.state = this.changeState();    // start character in the 'forwards' state
    }

    // changeState = () => this.velocity * this.direction < 0 ? 'walkBackwards' : 'walkForwards';
    changeState() {
        // velocity & direction are opposite signs -> product is negative
        // character moves in the opposite direction it's facing
        if(this.velocity * this.direction < 0) return 'walkBackwards';  

        // velocity & direction are the same sign -> product is 0 or positive
        // character moves in the same direction it's facing   
        return 'walkForwards';
    }

    update(time, c) {
        const [
            [x, y, width, height], 
            [originX, originY],
        ] = this.frames.get(this.animations[this.state][this.animationFrame]);

        // check if the game time value is greater than our local animationTimer value + 60ms delay
        if(time.previous > this.animationTimer + 80) {
            this.animationTimer = time.previous;    // update aminationTimer, preparing for the next animation frame

            this.animationFrame++;  // increment animationFrame index
            if(this.animationFrame > 6) this.animationFrame = 0;    // reset animationFrame index --> results in loop
        }

        this.position.x += this.velocity * time.secondsPassed;    // update character's x position

        // when character hits the right side of the screen, correctly change the animation 
        // based on the character's direction & velocity
        if(this.position.x > c.canvas.width - width / 2){
            this.velocity = -100; 
            this.state = this.changeState();   
        } 

        // when character hits the left side of the screen, correctly change the animation 
        // based on the character's direction & velocity
        if (this.position.x < width / 2) {
            this.velocity = 100;
            this.state = this.changeState();
        }
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
        ] = this.frames.get(this.animations[this.state][this.animationFrame]);

        c.scale(this.direction, 1);     // apply transformation (scaling transform)

        // draw character on screen
        c.drawImage(
            this.image,
            x, y, 
            width, height, 
            this.position.x * this.direction - originX, this.position.y - originY, 
            width, height
        );

        c.setTransform(1, 0, 0, 1, 0, 0);   // reset any applied transformations to the context

        this.drawDebug(c);
    }
}