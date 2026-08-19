import { FIGHTER_STATE } from '../../constants/fighters.js';
import { Fighter } from './Fighter.js';

export class Yusuke extends Fighter {
    constructor(x, y, direction) {
        super('Yusuke', x, y, direction);    // call parent class constructor

        this.image = document.querySelector('img[alt="yusuke"]');   // set image to the Yusuke sprite sheet 

        // a frame takes the form ['name of frame', [[x, y, width, height], [originX, originY]]]
        this.frames = new Map([
            // IDLE
            ['idle-1', [[2, 4, 58, 83], [24, 80]]],
            ['idle-2', [[62, 6, 59, 81], [24, 76]]],
            ['idle-3', [[123, 3, 55, 84], [24, 79]]],

            // move FORWARDS
            ['forward-1', [[2, 4, 58, 83], [24, 80]]],
            ['forward-2', [[62, 6, 59, 81], [24, 76]]],
            ['forward-3', [[123, 3, 55, 84], [24, 79]]],
            ['forward-4', [[64, 89, 48, 87], [17, 81]]],
            ['forward-5', [[64, 89, 48, 87], [17, 81]]],
            ['forward-6', [[123, 3, 55, 84], [24, 79]]],
            ['forward-7', [[62, 6, 59, 81], [24, 76]]],

            // move BACKWARDS
            ['backward-1', [[2, 4, 58, 83], [24, 80]]],
            ['backward-2', [[62, 6, 59, 81], [24, 76]]],
            ['backward-3', [[123, 3, 55, 84], [24, 79]]],
            ['backward-4', [[64, 89, 48, 87], [17, 81]]],
            ['backward-5', [[64, 89, 48, 87], [17, 81]]],
            ['backward-6', [[123, 3, 55, 84], [24, 79]]],
            ['backward-7', [[62, 6, 59, 81], [24, 76]]],
        ]);

        // define Yusuke's animations
        this.animations = {
            [FIGHTER_STATE.IDLE]: ['idle-1', 'idle-1', 'idle-2', 'idle-2', 'idle-3', 'idle-3', 'idle-2'],
            [FIGHTER_STATE.WALK_FORWARD]: ['forward-1', 'forward-2', 'forward-3', 'forward-4', 'forward-5', 'forward-6', 'forward-7'],
            [FIGHTER_STATE.WALK_BACKWARD]: ['backward-1', 'backward-2', 'backward-3', 'backward-4', 'backward-5', 'backward-6', 'backward-7'],
        };
    }
}