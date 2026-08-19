import { Hiei } from './entities/fighters/Hiei.js';
import { Yusuke } from './entities/fighters/Yusuke.js';
import { Stage } from './entities/Stage.js';
import { FpsCounter } from './entities/FpsCounter.js';
import { STAGE_FLOOR } from './constants/stage.js';
import { FIGHTER_DIRECTION, FIGHTER_STATE } from './constants/fighters.js';

// populate the dropdown menu in the HTML
function populateMoveDropdown() {
    const dropdown = document.getElementById('state-dropdown');

    // add elements to the dropdown menu
    Object.entries(FIGHTER_STATE).forEach(([, value]) => {
        const option = document.createElement('option');    // create a new <option> element
        option.setAttribute('value', value);    // set the option's value
        option.innerText = value;   // set the text displayed to the user
        dropdown.appendChild(option);   // add the optiont to the dropdown menu
    });
}

// handle the form used to change the fighter states
function handleFormSubmit(event, fighters) {
    event.preventDefault();     // prevent normal behavior of browser reloading and have our JavaScript handle the form submission

    // find all checked inputs inside the submitted form and store as array
    const selectedCheckboxes = Array
    .from(event.target.querySelectorAll('input:checked'))
    .map(checkbox => checkbox.value);

    const options = event.target.querySelector('select');   // find the <select> element in the submitted form

    // loop through every fighter in our fighters array
    fighters.forEach(fighter => {
        // check if fighter's name is selected -> change the selected fighter's state
        if(selectedCheckboxes.includes(fighter.name)) fighter.changeState(options.value);
    });
}

// wait until the entire HTML page has loaded
window.addEventListener('load',function() {
    populateMoveDropdown();     // populate the dropdown menu

    // set up the HTML canvas
    const canvas = document.querySelector('canvas');    // get the canvas element on the page
    const c = canvas.getContext('2d');      // get the 2D drawaing context
    c.imageSmoothingEnabled = false;    // disable image smoothing to make images look sharper and pixelated (retro effect)

    // create fighters
    const fighters = [
        new Hiei(70, STAGE_FLOOR, FIGHTER_DIRECTION.RIGHT),
        new Yusuke(310, STAGE_FLOOR, FIGHTER_DIRECTION.LEFT),
    ];
    
    // declare all game entities (Fighter object(s) and Stage object)
    const entities = [
        new Stage(),
        ...fighters,
        new FpsCounter(),
    ];

    // keeps track of time passed between frames to update characters
    let frameTime = {
        previous: 0,
        secondsPassed: 0,
    };

    // main game loop
    function frame(time) {
        window.requestAnimationFrame(frame);    // ask the browser to call frame() again on the next animation frame -> creates game loop

        // calculate how much time has passed since the previous frame (calculate elapsed time)
        frameTime = {
            // get time passed in seconds -> save the current time
            secondsPassed: Math.min((time - frameTime.previous) / 1000, 0.1),
            previous: time,
        }

        // update the background and characters'state on screen (update all entities)
        for (const entity of entities) {
            entity.update(frameTime, c);
        }

        // draw background and characters on screen (draw all entities)
        for (const entity of entities) {
            entity.draw(c);
        }
    }

    this.document.addEventListener('submit', (event) => handleFormSubmit(event, fighters));     // handles form submissions
    
    // sechedules the first call to frame()
    // frame() will then schedule the next frame, which schedules the next frame, and so on
    // -> results in game loop 
    window.requestAnimationFrame(frame);
});