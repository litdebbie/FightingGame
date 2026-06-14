import { Fighter } from './Fighter.js';

export class Hiei extends Fighter {
    constructor(x, y, velocity) {
        super('Hiei', x, y, velocity);  // call parent class constructor

        this.image = document.querySelector('img[alt="hiei"]');

        this.frame = [1, 91, 45, 79];
    }
}