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

    const [hiei, background] = document.querySelectorAll('img');

    const position = {
        x: GameViewport.WIDTH / 2 - hiei.width / 2,
        y: 130,
    };

    let velocity = 1;

    function frame() {
        position.x += velocity;    // update character's x position

        if(position.x > GameViewport.WIDTH - hiei.width || position.x < 0) velocity = -velocity;     // ensure character does not go off screen

        // c.clearRect(0, 0, GameViewport.WIDTH, GameViewport.HEIGHT);     // clear canvas
        c.drawImage(background, 0, 0);

        // c.strokeStyle = 'yellow';
        // c.moveTo(0, 0);
        // c.lineTo(GameViewport.WIDTH, GameViewport.HEIGHT);
        // c.moveTo(GameViewport.WIDTH, 0);
        // c.lineTo(0, GameViewport.HEIGHT);
        // c.stroke();

        c.drawImage(hiei, position.x, position.y);    // draw character on screen
        window.requestAnimationFrame(frame);    // "animate" character
    }

    window.requestAnimationFrame(frame);
    // console.log(c);
}