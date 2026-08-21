import { Control, controls } from "./constants/control.js";
import { FIGHTER_DIRECTION } from "./constants/fighters.js";

const heldKeys = new Set();     // keeps track of keys that are currently being held down

// called when user PRESSES a key down
function handleKeyDown(event) {
    event.preventDefault();     // prevents the browser from performing its normal action for a key
    heldKeys.add(event.code);   // add the key's code to the Set
}

// called when user RELEASES a key
function handleKeyUp(event) {
    event.preventDefault();         // prevents the browser from performing its normal action for a key
    heldKeys.delete(event.code);    // remove the key's code from the Set
}

// set up keyboard event listeners
export function registerKeyboardEvents() {
    window.addEventListener('keydown', handleKeyDown);  // listen for key being pressed down
    window.addEventListener('keyup', handleKeyUp);      // listen for key being released
}

export const isKeyDown = (code) => heldKeys.has(code);  // check if a particular key is being held down
export const isKeyUp = (code) => !heldKeys.has(code);   // check if a particular key is NOT being held down

export const isLeft = (id) => isKeyDown(controls[id].keyboard[Control.LEFT]);       // check if "left" key is being held down
export const isRight = (id) => isKeyDown(controls[id].keyboard[Control.RIGHT]);     // check if "right" key is being held down
export const isUp = (id) => isKeyDown(controls[id].keyboard[Control.UP]);           // check if "up" key is being held down
export const isDown = (id) => isKeyDown(controls[id].keyboard[Control.DOWN]);       // check if "down" key is being held down

// check is fighter is moving forward based on the direction they are facing
// if fighter is facing RIGHT -> the "right" key will move the fighter forward
// if fighter is NOT facing RIGHT -> the "left" key will move the fighter forward
export const isForward = (id, direction) => direction === FIGHTER_DIRECTION.RIGHT ? isRight(id):isLeft(id);

// check is fighter is moving backward based on the direction they are facing
// if fighter is facing LEFT -> the "right" key will move the fighter backward
// if fighter is NOT facing LEFT -> the "left" key will move the fighter backward
export const isBackward = (id, direction) => direction === FIGHTER_DIRECTION.LEFT ? isRight(id):isLeft(id);