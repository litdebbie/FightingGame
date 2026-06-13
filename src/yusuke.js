import { Fighter } from './fighter.js';

export class Yusuke extends Fighter {
    constructor(x, y, velocity) {
        super('Yusuke', x, y, velocity);

        this.image = document.querySelector('img[alt="yusuke"]');
    }
}