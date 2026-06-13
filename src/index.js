import { Hiei } from './entities/fighters/Hiei.js';
import { Yusuke } from './entities/fighters/Yusuke.js';
import { Stage } from './entities/Stage.js';

const GameViewport = {
    WIDTH: 384,
    HEIGHT: 224,
};

window.onload = function() {
    const canvas = document.querySelector('canvas');
    const c = canvas.getContext('2d');

    // set canvas width and height
    canvas.width = GameViewport.WIDTH;
    canvas.height = GameViewport.HEIGHT;

    const hiei = new Hiei(80, 130, 1);
    const yusuke = new Yusuke(80, 130, -1);
    const stage = new Stage();

    function frame() {
        // update the characters' state on screen
        hiei.update(c);
        yusuke.update(c);

        // draw characters and background on screen
        stage.draw(c);
        hiei.draw(c);
        yusuke.draw(c);

        window.requestAnimationFrame(frame);    // "animate" character
    }

    window.requestAnimationFrame(frame);
}