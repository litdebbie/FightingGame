const background = document.querySelector('img[alt="background"]');

export function drawBackground(c) {
    c.drawImage(background, 0, 0);
}