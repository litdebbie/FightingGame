import { Fighter } from './Fighter.js';

export class Yusuke extends Fighter {
    constructor(x, y, velocity) {
        super('Yusuke', x, y, velocity);    // call parent class constructor

        this.image = document.querySelector('img[alt="yusuke"]');

        this.frame = [2, 4, 58, 83];
    }
}