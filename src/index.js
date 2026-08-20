import { BattleBrosGame } from './BattleBrosGame.js';
import { FIGHTER_STATE } from './constants/fighters.js';

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

// wait until the entire HTML page has loaded
window.addEventListener('load',function() {
    populateMoveDropdown();     // populate the dropdown menu

    new BattleBrosGame().start();
});