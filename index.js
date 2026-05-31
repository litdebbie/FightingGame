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

    const hiei = document.querySelector('img');

    c.strokeStyle = 'yellow';
    c.moveTo(0, 0);
    c.lineTo(GameViewport.WIDTH, GameViewport.HEIGHT);
    c.moveTo(GameViewport.WIDTH, 0);
    c.lineTo(0, GameViewport.HEIGHT);
    c.stroke();

    c.drawImage(hiei, 0, 0);
    console.log(c);
}