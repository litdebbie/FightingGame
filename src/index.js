import { Hiei } from './entities/fighters/Hiei.js';
import { Yusuke } from './entities/fighters/Yusuke.js';
import { Stage } from './entities/Stage.js';
import { FpsCounter } from './entities/FpsCounter.js';

const GameViewport = {
    WIDTH: 384,
    HEIGHT: 224,
};

window.addEventListener('load',function() {
    const canvas = document.querySelector('canvas');
    const c = canvas.getContext('2d');

    // set canvas width and height
    canvas.width = GameViewport.WIDTH;
    canvas.height = GameViewport.HEIGHT;

    // declare Fight object(s) and Stage object
    const entities = [
        new Stage(),
        new Hiei(80, 130, 100),
        new Yusuke(150, 130, -100),
        new FpsCounter(),
    ];

    // keep track of time
    let previousTime = 0;
    let secondsPassed = 0;

    function frame(time) {
        window.requestAnimationFrame(frame);    // request frame from browser

        // update time keeper
        secondsPassed = Math.min((time - previousTime) / 1000, 0.1);
        previousTime = time;

        // update the characters' state on screen
        for (const entity of entities) {
            entity.update(secondsPassed, c);
        }

        // draw characters and background on screen
        for (const entity of entities) {
            entity.draw(c);
        }
    }

    window.requestAnimationFrame(frame);
});