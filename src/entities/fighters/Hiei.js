import { Fighter } from './Fighter.js';

export class Hiei extends Fighter {
    constructor(x, y, velocity) {
        super('Hiei', x, y, velocity);  // call parent class constructor

        this.image = document.querySelector('img[alt="hiei"]');

        this.frames = new Map([
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
        ]);

        this.animations = {
            'walkForwards': ['forward-1', 'forward-2', 'forward-3', 'forward-4', 'forward-5', 'forward-6', 'forward-7'],
            'walkBackwards': ['backward-1', 'backward-2', 'backward-3', 'backward-4', 'backward-5', 'backward-6', 'backward-7'],
        };
    }
}