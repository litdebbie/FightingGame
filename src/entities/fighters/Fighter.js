import { FIGHTER_DIRECTION, FIGHTER_STATE } from '../../constants/fighters.js';
import { STAGE_FLOOR } from '../../constants/stage.js'

export class Fighter {
    constructor(name, x, y, direction) {
        this.name = name;           // name of character
        this.position = { x, y };   // character position
        this.velocity = { x: 0, y: 0 }; // character velocity
        this.initialVelocity ={}        // character initial velocity
        this.direction = direction;    // direction of character (which way they're facing)
        this.gravity = 0;           // gravity

        this.frames = new Map();    // character animation frames
        this.animationFrame = 0;    // index value for which animation frame to display
        this.animationTimer = 0;    // animation timer -> stores the timestamp when the animation from was last changed
        this.animations = {};       // holds all of the animation frames for a specific action/move

        this.image = new Image();   // image of character

        // create fighter state machine
        // each state has:
        //      init() -> called once when entering the state
        //      update() -> called every frame while in the state
        //      validFrom -> contains valid states from which the state can be transitioned from
        this.states = {
            [FIGHTER_STATE.IDLE]: {
                init: this.handleIdleInit.bind(this),
                update: this.handleIdleState.bind(this),
                validFrom: [
                    undefined,
                    FIGHTER_STATE.IDLE, FIGHTER_STATE.WALK_FORWARD, FIGHTER_STATE.WALK_BACKWARD, 
                    FIGHTER_STATE.JUMP_UP, FIGHTER_STATE.JUMP_FORWARD, FIGHTER_STATE.JUMP_BACKWARD
                ],
            },
            [FIGHTER_STATE.WALK_FORWARD]: {
                init: this.handleMoveInit.bind(this),
                update: this.handleMoveState.bind(this),
                validFrom: [FIGHTER_STATE.IDLE, FIGHTER_STATE.WALK_BACKWARD],
            },
            [FIGHTER_STATE.WALK_BACKWARD]: {
                init: this.handleMoveInit.bind(this),
                update: this.handleMoveState.bind(this),
                validFrom: [FIGHTER_STATE.IDLE, FIGHTER_STATE.WALK_FORWARD],
            },
            [FIGHTER_STATE.JUMP_UP]: {
                init: this.handleJumpInit.bind(this),
                update: this.handleJumpState.bind(this),
                validFrom: [FIGHTER_STATE.IDLE],
            },
            [FIGHTER_STATE.JUMP_FORWARD]: {
                init: this.handleJumpInit.bind(this),
                update: this.handleJumpState.bind(this),
                validFrom: [FIGHTER_STATE.IDLE, FIGHTER_STATE.WALK_FORWARD],
            },
            [FIGHTER_STATE.JUMP_BACKWARD]: {
                init: this.handleJumpInit.bind(this),
                update: this.handleJumpState.bind(this),
                validFrom: [FIGHTER_STATE.IDLE, FIGHTER_STATE.WALK_BACKWARD],
            },
        }

        this.changeState(FIGHTER_STATE.IDLE);   // set initial state of character to idle
    }

    // change the fighter's current state
    changeState(newState) {
        // check if the new state is the same as the current state -> if the same, do nothing
        // check if the new state is in the array validFrom -> if new state is NOT in validFrom, do nothing
        if(newState === this.currentState || !this.states[newState].validFrom.includes(this.currentState)) return;
        
        this.currentState = newState;   // update currentState
        this.animationFrame = 0;        // reset animation frame to frame 0

        this.states[this.currentState].init();  // call new state's init function so it can be initialized prior to being executed 
    }

    // ---------------------------------------------------
    // IDLE STATE
    // ---------------------------------------------------

    // called once when fighter enters IDLE state
    handleIdleInit() {
        this.velocity.x = 0;
        this.velocity.y = 0;
    }

    // called every frame while the fighter is idle
    handleIdleState() {

    }

    // ---------------------------------------------------
    // MOVE STATE
    // ---------------------------------------------------

    // called once when fighter enters MOVE state
    handleMoveInit() {
        this.velocity.x = this.initialVelocity.x[this.currentState] ?? 0;
    }

    // called every frame while the fighter is moving
    handleMoveState() {

    }

    // ---------------------------------------------------
    // JUMP STATE
    // ---------------------------------------------------

    // called once when fighter enters JUMP state
    handleJumpInit() {
        this.velocity.y = this.initialVelocity.jump;    // give fighter an initial upward velocity
        this.handleMoveInit();
    }

    // called every frame while the fighter is jumping 
    handleJumpState(time) {
        this.velocity.y += this.gravity * time.secondsPassed;   // apply gravity -> fighter comes back down after jump

        // check if the fighter has fallen below the floor
        if(this.position.y > STAGE_FLOOR) {
            this.position.y = STAGE_FLOOR;  // put the fighter back to the floor position
            this.changeState(FIGHTER_STATE.IDLE);   // jump finished -> set fighter to idle state
        }
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

    updateAnimation(time) {
        const animation = this.animations[this.currentState];
        const [, frameDelay] = animation[this.animationFrame];

        // check if the game time value is greater than our local animationTimer value + 80ms delay
        // check if at least 80 ms have passed since the animation frame was changed
        if(time.previous > this.animationTimer + frameDelay) {
            this.animationTimer = time.previous;    // update aminationTimer, preparing for the next animation frame

            if(frameDelay > 0) this.animationFrame++;  // increment animationFrame index -> go to next animation frame
            if(this.animationFrame >= animation.length) this.animationFrame = 0;    // reset animationFrame index --> results in loop
        }
    }

    update(time, c) {
        this.position.x += (this.velocity.x * this.direction) * time.secondsPassed;    // update character's x position
        this.position.y += this.velocity.y * time.secondsPassed;    // update character's y position

        this.states[this.currentState].update(time, c);     // execute the fighter's current state and execute that state's update function i.e. handle____State(time, c)
        this.updateAnimation(time);         // update the animation
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
        const [frameKey] = this.animations[this.currentState][this.animationFrame];

        // get the current sprite frame
        // this.animations[this.currentState] -> gets the animation associated with the current fighter state
        // [this.animationFrame] -> gets the specific frame we are currently displaying
        // this.frames.get(...) -> gets the sprite information from the frames Map
        const [
            [x, y, width, height], 
            [originX, originY],
        ] = this.frames.get(frameKey);

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