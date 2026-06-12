const yusuke = document.querySelector('img[alt="yusuke"]');

const position = {
    x: 80,
    y: 130,
};

let velocity = -1;

export function updateYusuke(c) {
    position.x += velocity;    // update character's x position

    if(position.x > c.canvas.width - yusuke.width || position.x < 0) velocity = -velocity;     // ensure character does not go off screen
}

export function drawYusuke(c) {
    c.drawImage(yusuke, position.x, position.y);    // draw character on screen
}