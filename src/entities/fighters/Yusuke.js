import { Fighter } from './Fighter.js';

export class Yusuke extends Fighter {
    constructor(x, y, velocity) {
        super('Yusuke', x, y, velocity);    // call parent class constructor

        this.image = document.querySelector('img[alt="yusuke"]');

        this.frames = new Map([
            ['forward-1', [[2, 4, 58, 83], [24, 80]]],
            ['forward-2', [[62, 6, 59, 81], [24, 76]]],
            ['forward-3', [[123, 3, 55, 84], [24, 79]]],
            ['forward-4', [[180, 2, 55, 85], [20, 74]]],
            ['forward-5', [[180, 2, 55, 85], [20, 74]]],
            ['forward-6', [[123, 3, 55, 84], [24, 79]]],
            ['forward-7', [[62, 6, 59, 81], [24, 76]]],
        ]);
    }
}