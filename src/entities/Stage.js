export class Stage {
    constructor() {
        this.image = document.querySelector('img[alt="background"]');
    }

    update(secondsPassed) {
        
    }

    draw(c) {
        c.drawImage(this.image, 0, 0);
    }
}