import { drawHiei, updateHiei } from './hiei.js';
import { drawBackground } from './stage.js';
import { drawYusuke, updateYusuke} from './yusuke.js'

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

    function frame() {
        updateHiei(c);
        updateYusuke(c);

        drawBackground(c);
        drawHiei(c);
        drawYusuke(c);

        window.requestAnimationFrame(frame);    // "animate" character
    }

    window.requestAnimationFrame(frame);
}