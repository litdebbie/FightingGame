import { BattleBrosGame } from './BattleBrosGame.js';

// wait until the entire HTML page has loaded
window.addEventListener('load',function() {
    new BattleBrosGame().start();
});