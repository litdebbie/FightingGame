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
        this.animationTimer = 0;    // animation timer -> stores the timestamp when the animation from was last changed
        this.animations = {};       // holds all of the animation frames for a specific action/move

        // create fighter state machine
        // each state has:
        //      init() -> called once when entering the state
        //      update() -> called every frame while in the state
        this.states = {
            [FIGHTER_STATE.IDLE]: {
                init: this.handleIdleInit.bind(this),
                update: this.handleIdleState.bind(this),
            },
            [FIGHTER_STATE.WALK_FORWARD]: {
                init: this.handleWalkForwardInit.bind(this),
                update: this.handleWalkForwardState.bind(this),
            },
            [FIGHTER_STATE.WALK_BACKWARD]: {
                init: this.handleWalkBackwardInit.bind(this),
                update: this.handleWalkBackwardState.bind(this),
            },
        }

        this.changeState(FIGHTER_STATE.IDLE);   // set initial state of character to idle
    }

    // change the fighter's current state
    changeState(newState) {
        this.currentState = newState;   // update currentState
        this.animationFrame = 0;        // reset animation frame to frame 0

        this.states[this.currentState].init();  // call new state's init function so it can be initialized prior to being executed 
    }

    // ---------------------------------------------------
    // IDLE STATE
    // ---------------------------------------------------

    // called once when fighter enters IDLE state
    handleIdleInit() {
        this.velocity = 0;
    }

    // called every frame while the fighter is idle
    handleIdleState() {

    }

    // ---------------------------------------------------
    // WALK FORWARD STATE
    // ---------------------------------------------------

    // called once when fighter enters WALK_FORWARD state
    handleWalkForwardInit() {
        this.velocity = 100 * this.direction;
    }

    // called every frame while the fighter is walking forward
    handleWalkForwardState() {

    }

    // ---------------------------------------------------
    // WALK BACKWARD STATE
    // ---------------------------------------------------

    // called once when fighter enters WALK_BACKWARD state
    handleWalkBackwardInit() {
        this.velocity = -100 * this.direction;
    }

    // called every frame while the fighter is walking backward
    handleWalkBackwardState() {
        
    }

    // constrains characters to the limits of the stage
    updateStageConstraints(c) {
        const WIDTH = 32;   // amount of space to keep between the fighter's position and the edge of the canvas

        // when character hits the right side of the screen, put the fighter back aat the maximum
        // allowed x position
        if(this.position.x > c.canvas.width - WIDTH){
            this.position.x = c.canvas.width - WIDTH;   
        } 

        // when character hits the left side of the screen, put the fighter back aat the minimum
        // allowed x position
        if (this.position.x < WIDTH) {
            this.position.x = WIDTH;
        }
    }

    update(time, c) {
        // check if the game time value is greater than our local animationTimer value + 80ms delay
        // check if at least 80 ms have passed since the animation frame was changed
        if(time.previous > this.animationTimer + 80) {
            this.animationTimer = time.previous;    // update aminationTimer, preparing for the next animation frame

            this.animationFrame++;  // increment animationFrame index -> go to next animation frame
            if(this.animationFrame > 6) this.animationFrame = 0;    // reset animationFrame index --> results in loop
        }

        this.position.x += this.velocity * time.secondsPassed;    // update character's x position

        this.states[this.currentState].update(time, c);     // execute the fighter's current state and execute that state's update function i.e. handle____State(time, c)
        this.updateStageConstraints(c);     // make sure fighters stay within stage limits
    }

    drawDebug(c) {
        c.lineWidth = 1;

        // creates cross to locate where origin point is
        c.beginPath();
        c.strokeStyle = 'blue';

        // draw horizontal line
        c.moveTo(Math.floor(this.position.x) - 4.5, Math.floor(this.position.y));
        c.lineTo(Math.floor(this.position.x) + 4.5, Math.floor(this.position.y));
        
        // draw vertical line
        c.moveTo(Math.floor(this.position.x), Math.floor(this.position.y) - 4.5);
        c.lineTo(Math.floor(this.position.x), Math.floor(this.position.y) + 4.5);
       
        c.stroke();     // actually draw the path on the canvas
    }

    // draw the fighter's current animation frame
    draw(c) {
        // get the current sprite frame
        // this.animations[this.currentState] -> gets the animation associated with the current fighter state
        // [this.animationFrame] -> gets the specific frame we are currently displaying
        // this.frames.get(...) -> gets the sprite information from the frames Map
        const [
            [x, y, width, height], 
            [originX, originY],
        ] = this.frames.get(this.animations[this.currentState][this.animationFrame]);

        c.scale(this.direction, 1);     // apply transformation (scaling transform) -> flip canvas horizontally if needed

        // draw character on screen
        c.drawImage(
            this.image,
            x, y, 
            width, height, 
            Math.floor(this.position.x * this.direction) - originX, Math.floor(this.position.y) - originY, 
            width, height
        );

        c.setTransform(1, 0, 0, 1, 0, 0);   // reset any applied transformations to the context

        this.drawDebug(c);  // draw the cross at the fighter's origin point
    }
}