import init, { get_earth_time, get_moon_time } from './pkg/rust_wasm.js';

const sun = new Image();
const moon = new Image();
const earth = new Image();

async function start() {
    await init();

    sun.src = "canvas_sun.png";
    moon.src = "canvas_moon.png";
    earth.src = "canvas_earth.png";
    window.requestAnimationFrame(draw);
}

function draw() {
    const size = Math.min(innerWidth, innerHeight);
    const width = size;
    const height = size;
    const arbit = width / 3;
    const canvas = document.getElementById("canvas");
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");

    ctx.globalCompositeOperation = "destination-over";
    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = "rgb(0 0 0 / 40%)";
    ctx.strokeStyle = "rgb(0 153 255 / 40%)";
    ctx.save();

    ctx.translate(width / 2, height / 2);

    const now = Date.now();

    ctx.rotate(get_earth_time(now));
    ctx.translate(arbit, 0);
    ctx.fillRect(0, -12, 40, 24);
    ctx.drawImage(earth, -12, -12);

    ctx.rotate(get_moon_time(now));
    ctx.translate(0, 28.5);
    ctx.drawImage(moon, -3.5, -3.5);

    ctx.restore();

    ctx.beginPath();
    ctx.arc(width / 2, height / 2, arbit, 0, Math.PI * 2, false);
    ctx.stroke();

    ctx.drawImage(sun, 0, 0, width, height);

    window.requestAnimationFrame(draw);
}

start();