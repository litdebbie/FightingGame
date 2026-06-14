import { Fighter } from './Fighter.js';

export class Hiei extends Fighter {
    constructor(x, y, velocity) {
        super('Hiei', x, y, velocity);  // call parent class constructor

        this.image = document.querySelector('img[alt="hiei"]');

        this.frames = new Map([
            ['forward-1', [1, 91, 45, 79]],
            ['forward-2', [48, 89, 43, 81]],
            ['forward-3', [93, 93, 44, 77]],
            ['forward-4', [139, 92, 42, 78]],
            ['forward-5', [183, 91, 44, 79]],
        ]);
    }
}