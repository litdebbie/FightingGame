export class Stage {
    constructor() {
        this.image = document.querySelector('img[alt="background"]');
    }

    draw(c) {
        c.drawImage(this.image, 0, 0);
    }
}