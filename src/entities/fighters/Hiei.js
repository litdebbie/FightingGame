import { FIGHTER_STATE } from '../../constants/fighters.js';
import { Fighter } from './Fighter.js';

export class Hiei extends Fighter {
    constructor(x, y, direction) {
        super('Hiei', x, y, direction);  // call parent class constructor

        this.image = document.querySelector('img[alt="hiei"]');     // set image to the Hiei sprite sheet

        // a frame takes the form ['name of frame', [[x, y, width, height], [originX, originY]]]
        this.frames = new Map([
            // IDLE
            ['idle-1', [[1, 91, 45, 79], [21, 72]]],
            ['idle-2', [[48, 89, 43, 81], [20, 74]]],
            ['idle-3', [[93, 93, 44, 77], [21, 70]]],

            // move FORWARDS
            ['forward-1', [[1, 91, 45, 79], [21, 72]]],
            ['forward-2', [[48, 89, 43, 81], [20, 74]]],
            ['forward-3', [[93, 93, 44, 77], [21, 70]]],
            ['forward-4', [[139, 92, 42, 78], [21, 72]]],
            ['forward-5', [[183, 91, 44, 79], [23, 74]]],
            ['forward-6', [[183, 91, 44, 79], [23, 74]]],
            ['forward-7', [[139, 92, 42, 78], [21, 72]]],

            // move BACKWARDS
            ['backward-1', [[1, 91, 45, 79], [21, 72]]],
            ['backward-2', [[48, 89, 43, 81], [20, 74]]],
            ['backward-3', [[93, 93, 44, 77], [21, 70]]],
            ['backward-4', [[139, 92, 42, 78], [21, 72]]],
            ['backward-5', [[183, 91, 44, 79], [23, 74]]],
            ['backward-6', [[183, 91, 44, 79], [23, 74]]],
            ['backward-7', [[139, 92, 42, 78], [21, 72]]],

            // JUMP UP
            ['jump-up-1', [[103, 6, 48, 80], [24, 68]]],
        ]);

        // define Hiei's animations
        this.animations = {
            [FIGHTER_STATE.IDLE]: ['idle-1', 'idle-1', 'idle-2', 'idle-2', 'idle-3', 'idle-3', 'idle-2'],
            [FIGHTER_STATE.WALK_FORWARD]: ['forward-1', 'forward-2', 'forward-3', 'forward-4', 'forward-5', 'forward-6', 'forward-7'],
            [FIGHTER_STATE.WALK_BACKWARD]: ['backward-1', 'backward-2', 'backward-3', 'backward-4', 'backward-5', 'backward-6', 'backward-7'],
            [FIGHTER_STATE.JUMP_UP]: ['jump-up-1'],
        };

        // set initial velocity -> negative velocity means "move upward" 
        // canvas y coordinates increase downward
        this.initialVelocity = {
            jump: -420,
        };

        this.gravity = 1000;    // set gravity
    }
}