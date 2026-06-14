export class FpsCounter {
    constructor() {
        this.fps = 0;
    }

    update(secondsPassed) {
        this.fps = Math.trunc(1 / secondsPassed);
    }

    draw(c) {
        c.font = "bold 28px Arial";
        c.fillStyle = "black";
        c.textAlign = "center";
        c.fillText(`FPS: ${this.fps}`, c.canvas.width / 2, 30);
    }
}