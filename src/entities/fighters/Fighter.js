import { FIGHTER_DIRECTION, FIGHTER_STATE } from '../../constants/fighters.js';

export class Fighter {
    constructor(name, x, y, direction) {
        this.name = name;           // name of character
        this.image = new Image();   // image of character
        this.frames = new Map();    // character animation frames
        this.position = { x, y };   // character position
        this.direction = direction;    // direction of character (which way they're facing)
        this.velocity = 0;    // character velocity
        this.animationFrame = 0;    // index value for which animation frame to display
        this.animationTimer = 0;    // animation timer
        this.animations = {};       // holds all of the animation frames for a specific action/move

        this.states = {
            [FIGHTER_STATE.WALK_FORWARD]: {
                init: this.handleWalkForwardInit.bind(this),
                update: this.handleWalkForwardState.bind(this),
            },
            [FIGHTER_STATE.WALK_BACKWARD]: {
                init: this.handleWalkBackwardInit.bind(this),
                update: this.handleWalkBackwardState.bind(this),
            },
        }

        this.changeState(FIGHTER_STATE.WALK_BACKWARD);   // set initial state of character
    }

    changeState(newState) {
        this.currentState = newState;   // update currentState
        this.animationFrame = 0;        // reset animation frame

        this.states[this.currentState].init();  // call new state's init function so it can be initialized prior to being executed 
    }

    handleWalkForwardInit() {
        this.velocity = 100 * this.direction;
    }

    handleWalkForwardState() {

    }

    handleWalkBackwardInit() {
        this.velocity = -100 * this.direction;
    }

    handleWalkBackwardState() {
        
    }

    // constrains characters to the limits of the stage
    updateStageConstraints(c) {
        const WIDTH = 32;

        // when character hits the right side of the screen, correctly change the animation 
        // based on the character's direction & velocity
        if(this.position.x > c.canvas.width - WIDTH){
            this.position.x = c.canvas.width - WIDTH;   
        } 

        // when character hits the left side of the screen, correctly change the animation 
        // based on the character's direction & velocity
        if (this.position.x < WIDTH) {
            this.position.x = WIDTH;
        }
    }

    update(time, c) {
        // check if the game time value is greater than our local animationTimer value + 60ms delay
        if(time.previous > this.animationTimer + 80) {
            this.animationTimer = time.previous;    // update aminationTimer, preparing for the next animation frame

            this.animationFrame++;  // increment animationFrame index
            if(this.animationFrame > 6) this.animationFrame = 0;    // reset animationFrame index --> results in loop
        }

        this.position.x += this.velocity * time.secondsPassed;    // update character's x position

        this.states[this.currentState].update(time, c);     // execute the state
        this.updateStageConstraints(c);
    }

    drawDebug(c) {
        c.lineWidth = 1;

        // creates cross to locate where origin point is
        c.beginPath();
        c.strokeStyle = 'blue';
        c.moveTo(Math.floor(this.position.x) - 4.5, Math.floor(this.position.y));
        c.lineTo(Math.floor(this.position.x) + 4.5, Math.floor(this.position.y));
        c.moveTo(Math.floor(this.position.x), Math.floor(this.position.y) - 4.5);
        c.lineTo(Math.floor(this.position.x), Math.floor(this.position.y) + 4.5);
        c.stroke();
    }

    draw(c) {
        const [
            [x, y, width, height], 
            [originX, originY],
        ] = this.frames.get(this.animations[this.currentState][this.animationFrame]);

        c.scale(this.direction, 1);     // apply transformation (scaling transform)

        // draw character on screen
        c.drawImage(
            this.image,
            x, y, 
            width, height, 
            Math.floor(this.position.x * this.direction) - originX, Math.floor(this.position.y) - originY, 
            width, height
        );

        c.setTransform(1, 0, 0, 1, 0, 0);   // reset any applied transformations to the context

        this.drawDebug(c);
    }
}