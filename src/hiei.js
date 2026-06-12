const hiei = document.querySelector('img[alt="hiei"]');

const position = {
    x: 80,
    y: 130,
};

let velocity = 1;

export function updateHiei(c) {
    position.x += velocity;    // update character's x position

    if(position.x > c.canvas.width - hiei.width || position.x < 0) velocity = -velocity;     // ensure character does not go off screen
}

export function drawHiei(c) {
    c.drawImage(hiei, position.x, position.y);    // draw character on screen
}