import { Fighter } from './Fighter.js';

export class Hiei extends Fighter {
    constructor(x, y, velocity) {
        super('Hiei', x, y, velocity);

        this.image = document.querySelector('img[alt="hiei"]');
    }
}