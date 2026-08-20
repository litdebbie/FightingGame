import { Hiei } from './entities/fighters/Hiei.js';
import { Yusuke } from './entities/fighters/Yusuke.js';
import { Stage } from './entities/Stage.js';
import { FpsCounter } from './entities/FpsCounter.js';
import { STAGE_FLOOR } from './constants/stage.js';
import { FIGHTER_DIRECTION } from './constants/fighters.js';

export class BattleBrosGame {
    constructor() {
        this.c = this.getContext();
        // create fighters
        this.fighters = [
            new Hiei(70, STAGE_FLOOR, FIGHTER_DIRECTION.RIGHT),
            new Yusuke(310, STAGE_FLOOR, FIGHTER_DIRECTION.LEFT),
        ];
        
        // declare all game entities (Fighter object(s) and Stage object)
        this.entities = [
            new Stage(),
            ...this.fighters,
            new FpsCounter(),
        ];

        // keeps track of time passed between frames to update characters
        this.frameTime = {
            previous: 0,
            secondsPassed: 0,
        };
    }

    getContext() {
        // set up the HTML canvas
        const canvas = document.querySelector('canvas');    // get the canvas element on the page
        const c = canvas.getContext('2d');      // get the 2D drawaing context

        c.imageSmoothingEnabled = false;    // disable image smoothing to make images look sharper and pixelated (retro effect)

        return c;
    }

    update() {
        // update the background and characters'state on screen (update all entities)
        for (const entity of this.entities) {
            entity.update(this.frameTime, this.c);
        }
    }

    draw() {
        // draw background and characters on screen (draw all entities)
        for (const entity of this.entities) {
            entity.draw(this.c);
        }
    }

    // main game loop
    frame(time) {
        window.requestAnimationFrame(this.frame.bind(this));    // ask the browser to call frame() again on the next animation frame -> creates game loop

        // calculate how much time has passed since the previous frame (calculate elapsed time)
        this.frameTime = {
            // get time passed in seconds -> save the current time
            secondsPassed: Math.min((time - this.frameTime.previous) / 1000, 0.1),
            previous: time,
        }

        this.update();
        this.draw();
    }

    // handle the form used to change the fighter states
    handleFormSubmit(event) {
        event.preventDefault();     // prevent normal behavior of browser reloading and have our JavaScript handle the form submission

        // find all checked inputs inside the submitted form and store as array
        const selectedCheckboxes = Array
        .from(event.target.querySelectorAll('input:checked'))
        .map(checkbox => checkbox.value);

        const options = event.target.querySelector('select');   // find the <select> element in the submitted form

        // loop through every fighter in our fighters array
        this.fighters.forEach(fighter => {
            // check if fighter's name is selected -> change the selected fighter's state
            if(selectedCheckboxes.includes(fighter.name)) fighter.changeState(options.value);
        });
    }

    start() {
        document.addEventListener('submit', this.handleFormSubmit.bind(this));     // handles form submissions
    
        // sechedules the first call to frame()
        // frame() will then schedule the next frame, which schedules the next frame, and so on
        // -> results in game loop 
        window.requestAnimationFrame(this.frame.bind(this));
    }
}