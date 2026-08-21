import { FIGHTER_STATE } from '../../constants/fighters.js';
import { Fighter } from './Fighter.js';

export class Hiei extends Fighter {
    constructor(x, y, direction, playerId) {
        super('Hiei', x, y, direction, playerId);  // call parent class constructor

        this.image = document.querySelector('img[alt="hiei"]');     // set image to the Hiei sprite sheet

        // a frame takes the form ['name of frame', [[x, y, width, height], [originX, originY]]]
        this.frames = new Map([
            // IDLE
            ['idle-1', [[1, 91, 45, 79], [21, 72]]],    // [2,1]
            ['idle-2', [[48, 89, 43, 81], [20, 74]]],   // [2,2]
            ['idle-3', [[93, 93, 44, 77], [21, 70]]],   // [2,3]

            // move FORWARDS
            ['forward-1', [[1, 91, 45, 79], [21, 72]]],     // [2,1]
            ['forward-2', [[48, 89, 43, 81], [20, 74]]],    // [2,2]
            ['forward-3', [[93, 93, 44, 77], [21, 70]]],    // [2,3]
            ['forward-4', [[139, 92, 42, 78], [21, 72]]],   // [2,4]
            ['forward-5', [[183, 91, 44, 79], [23, 74]]],   // [2,5]

            // move BACKWARDS
            ['backward-1', [[1, 91, 45, 79], [21, 72]]],    // [2,1]
            ['backward-2', [[48, 89, 43, 81], [20, 74]]],   // [2,2]
            ['backward-3', [[93, 93, 44, 77], [21, 70]]],   // [2,3]
            ['backward-4', [[139, 92, 42, 78], [21, 72]]],  // [2,4]
            ['backward-5', [[183, 91, 44, 79], [23, 74]]],  // [2,5]

            // JUMP UP
            ['jump-up-1', [[200, 22, 42, 64], [21, 58]]],   // [1,5]
            ['jump-up-2', [[103, 6, 48, 80], [24, 68]]],    // [1,3]
            ['jump-up-3', [[56, 12, 45, 63], [24, 55]]],    // [1,2]

            // JUMP FORWARD/BACKWARD
            ['jump-roll-1', [[200, 22, 42, 64], [21, 58]]],   // [1,5]
            ['jump-roll-2', [[103, 6, 48, 80], [24, 68]]],    // [1,3]
            ['jump-roll-3', [[56, 12, 45, 63], [24, 55]]],    // [1,2]
            ['jump-roll-4', [[188, 583, 48, 28], [20, 9]]],   // [8,5]
            ['jump-roll-5', [[541, 521, 50, 30], [27, 23]]],  // [7,10]
            ['jump-roll-6', [[152, 15, 45, 51], [24, 7]]],    // [1,4]
            ['jump-roll-7', [[1, 20, 53, 43], [25, 25]]],     // [1,1]

            // CROUCH
            ['crouch-1', [[1, 91, 45, 79], [21, 72]]],     // [2,1]
            ['crouch-2', [[374, 106, 42, 64], [22, 57]]],  // [2,9]
            ['crouch-3', [[326, 114, 46, 56], [25, 49]]],  // [2,8]
        ]);

        // define Hiei's animations
        // takes the form:
        // ['name of state']: [
        //      ['name of frame', frameDelay], ..., 
        //      ['name of frame', frameDelay],
        // ]
        this.animations = {
            [FIGHTER_STATE.IDLE]: [
                ['idle-1', 85], ['idle-1', 85], ['idle-2', 85], 
                ['idle-2', 85], ['idle-3', 85], ['idle-3', 85], 
                ['idle-2', 85],
            ],
            [FIGHTER_STATE.WALK_FORWARD]: [
                ['forward-1', 85], ['forward-2', 85], ['forward-3', 85], 
                ['forward-4', 85], ['forward-5', 85], ['forward-5', 85], 
                ['forward-4', 85],
            ],
            [FIGHTER_STATE.WALK_BACKWARD]: [
                ['backward-1', 85], ['backward-2', 85], ['backward-3', 85], 
                ['backward-4', 85], ['backward-5', 85], ['backward-5', 85], 
                ['backward-4', 85],
            ],
            [FIGHTER_STATE.JUMP_UP]: [
                ['jump-up-1', 85], ['jump-up-2', 200], ['jump-up-3', 180], 
                ['jump-up-3', 180], ['jump-up-2', -1],
            ],
            [FIGHTER_STATE.JUMP_FORWARD]: [
                ['jump-roll-1', 200], ['jump-roll-2', 100], ['jump-roll-3', 100], 
                ['jump-roll-4', 100], ['jump-roll-6', 100], ['jump-roll-7', 100],
                ['jump-roll-7', 0],
            ],
            [FIGHTER_STATE.JUMP_BACKWARD]: [
                ['jump-roll-1', 200], ['jump-roll-2', 100], ['jump-roll-3', 100], 
                ['jump-roll-5', 100], ['jump-roll-6', 100], ['jump-roll-7', 100],
                ['jump-roll-7', 0],
            ],
            [FIGHTER_STATE.CROUCH]: [['crouch-3', 0]],
            [FIGHTER_STATE.CROUCH_DOWN]: [
                ['crouch-1', 50], ['crouch-2', 50], ['crouch-3', 50], ['crouch-3', -2],
            ],
            [FIGHTER_STATE.CROUCH_UP]: [
                ['crouch-3', 50], ['crouch-2', 50], ['crouch-1', 50], ['crouch-1', -2],
            ],
        };

        // set initial velocity -> negative velocity means "move upward" 
        // canvas y coordinates increase downward
        this.initialVelocity = {
            x: {
                [FIGHTER_STATE.WALK_FORWARD]: 120,
                [FIGHTER_STATE.WALK_BACKWARD]: -120,
                [FIGHTER_STATE.JUMP_FORWARD]: 120,
                [FIGHTER_STATE.JUMP_BACKWARD]: -120,
            },
            jump: -450,
        };

        this.gravity = 1000;    // set gravity
    }
}