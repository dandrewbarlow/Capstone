/*
sketch.js
Andrew Barlow
Emitting CU
p5.js sketch for Capstone project promotion using a particle system for interaction

credits:
While this is not my 1st particle system and the hefty majority of it I coded from scratch, my personal knowledge of particle systems I can say is practically entirely learned from Daniel Schiffman's Nature of Code book & youtube series

I've added credits to parts of the code where I needed to reference this material again

https://natureofcode.com/book/
https://youtube.com/playlist?list=PLRqwX-V7Uu6ZV4yEcW3uDwOgGXKUUsPOM
*/


// GLOBALS //////////////////////////////////////////////////

// allows easy canvas manipulation
let canvas;

// single handler for all particles
let particleManager;

// declare how many to render
const particleCount = 50;

const coefficientOfFriction = 1;

// FUNCTIONS //////////////////////////////////////////////////

// responsive resizing of canvas
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    background(0, 255);
    particleManager.resize();
}

// initialization
function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.style('z-index', '-1');

    particleManager = new ParticleManager(particleCount);

    background(0, 255);
    // particleManager.applyForce(createVector(100, 100));
}

// main loop
function draw() {
    background(0, 10);
    particleManager.update();
    particleManager.draw();

}