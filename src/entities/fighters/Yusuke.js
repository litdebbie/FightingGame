import { FIGHTER_STATE } from '../../constants/fighters.js';
import { Fighter } from './Fighter.js';

export class Yusuke extends Fighter {
    constructor(x, y, direction) {
        super('Yusuke', x, y, direction);    // call parent class constructor

        this.image = document.querySelector('img[alt="yusuke"]');   // set image to the Yusuke sprite sheet 

        // a frame takes the form ['name of frame', [[x, y, width, height], [originX, originY]]]
        this.frames = new Map([
            // IDLE
            ['idle-1', [[2, 4, 58, 83], [24, 80]]],     // [1,1]
            ['idle-2', [[62, 6, 59, 81], [24, 76]]],    // [1,2]
            ['idle-3', [[123, 3, 55, 84], [24, 79]]],   // [1,3]

            // move FORWARDS
            ['forward-1', [[2, 4, 58, 83], [24, 80]]],      // [1,1]
            ['forward-2', [[62, 6, 59, 81], [24, 76]]],     // [1,2]
            ['forward-3', [[123, 3, 55, 84], [24, 79]]],    // [1,3]
            ['forward-4', [[64, 89, 48, 87], [17, 81]]],    // [2,2]

            // move BACKWARDS
            ['backward-1', [[2, 4, 58, 83], [24, 80]]],     // [1,1]
            ['backward-2', [[62, 6, 59, 81], [24, 76]]],    // [1,2]
            ['backward-3', [[123, 3, 55, 84], [24, 79]]],   // [1,3]
            ['backward-4', [[64, 89, 48, 87], [17, 81]]],   // [2,2]

            // JUMP UP
            ['jump-up-1', [[214, 314, 54, 59], [22, 52]]],  // [4,4]
            ['jump-up-2', [[180, 2, 43, 85], [21, 74]]],    // [1,4]
            ['jump-up-3', [[239, 212, 47, 60], [23, 47]]],  // [3,5]

            // JUMP FORWARD/BACKWARD
            ['jump-roll-1', [[214, 314, 54, 59], [22, 52]]],  // [4,4]
            ['jump-roll-2', [[180, 2, 43, 85], [21, 74]]],    // [1,4]
            ['jump-roll-3', [[239, 212, 47, 60], [23, 47]]],  // [3,5]
            ['jump-roll-4', [[401, 37, 48, 50], [20, 10]]],   // [1,7]
            ['jump-roll-5', [[344, 25, 55, 62], [32, 28]]],   // [1,6]
            ['jump-roll-6', [[451, 11, 45, 76], [29, 46]]],   // [1,8]
            ['jump-roll-7', [[273, 38, 69, 49], [40, 23]]],   // [1,5]
            ['jump-roll-8', [[549, 28, 49, 59], [21, 53]]],   // [1,10]
        ]);

        // define Yusuke's animations
        this.animations = {
            [FIGHTER_STATE.IDLE]: [
                ['idle-1', 85], ['idle-1', 85], ['idle-2', 85], 
                ['idle-2', 85], ['idle-3', 85], ['idle-3', 85], 
                ['idle-2', 85],
            ],
            [FIGHTER_STATE.WALK_FORWARD]: [
                ['forward-1', 85], ['forward-2', 85], ['forward-3', 85], 
                ['forward-4', 85], ['forward-4', 85], ['forward-3', 85], 
                ['forward-2', 85]
            ],
            [FIGHTER_STATE.WALK_BACKWARD]: [
                ['backward-1', 85], ['backward-2', 85], ['backward-3', 85], 
                ['backward-4', 85], ['backward-4', 85], ['backward-3', 85], 
                ['backward-2', 85]
            ],
            [FIGHTER_STATE.JUMP_UP]: [
                ['jump-up-1', 85], ['jump-up-2', 200], ['jump-up-3', 150], 
                ['jump-up-3', 180], ['jump-up-2', -1],
            ],
            [FIGHTER_STATE.JUMP_FORWARD]: [
                ['jump-roll-1', 200], ['jump-roll-2', 100], ['jump-roll-3', 100], 
                ['jump-roll-4', 100], ['jump-roll-5', 100], ['jump-roll-8', 100],
                ['jump-roll-8', -1],
            ],
            [FIGHTER_STATE.JUMP_BACKWARD]: [
                ['jump-roll-1', 200], ['jump-roll-2', 100], ['jump-roll-3', 100], 
                ['jump-roll-6', 100], ['jump-roll-7', 100], ['jump-roll-8', 100],
                ['jump-roll-8', -1],
            ],
        };

        // set initial velocity -> negative velocity means "move upward" 
        // canvas y coordinates increase downward
        this.initialVelocity = {
            x: {
                [FIGHTER_STATE.WALK_FORWARD]: 100,
                [FIGHTER_STATE.WALK_BACKWARD]: -100,
                [FIGHTER_STATE.JUMP_FORWARD]: 100,
                [FIGHTER_STATE.JUMP_BACKWARD]: -100,
            },
            jump: -450,
        };

        this.gravity = 1000;    // set gravity
    }
}