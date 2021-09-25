// Andrew Barlow
// particle.js
// Emitting CU
// particle class w/ methods for individual particles

class Particle {
    constructor() {

        // randomize position in canvas
        this.position = createVector(
            random(windowWidth),
            random(windowHeight)
        );

        // initialize w/ no movement
        this.velocity = createVector(0, 0);
        this.acceleration = createVector(0, 0);

        // keep track of canvas size locally, to assist responsive scaling
        this.windowHeight = windowHeight;
        this.windowWidth = windowWidth;

        this.radius = 20;
    }

    // responsive to browser size changes
    resize() {
        this.position.set(
            map(this.position.x, 0, this.windowWidth, 0, windowWidth),
            map(this.position.y, 0, this.windowHeight, 0, windowHeight)
        )
        this.windowWidth = windowWidth;
        this.windowHeight = windowHeight;
    }

    // take properties and apply to position
    update() {
        this.edgeCollision();
        // this.friction();
        this.mouseForce();
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
    }

    mouseForce() {
        let mousePosition = createVector(mouseX, mouseY);

        let d = p5.Vector.sub(this.position, mousePosition);
        this.applyForce(d)
    }

    // credit: Daniel Schiffman's Nature of Code
    // https://natureofcode.com/book/chapter-2-forces/
    friction() {
        // not working correctly for some reason
        let friction = this.velocity;
        friction.mult(-1);
        friction.normalize();
        friction.mult(coefficientOfFriction);
        this.applyForce(friction);
    }

    // when edge of browser is crossed, loop over to the other side
    edgeCollision() {
        if (this.position.x < 0) {
            this.position.x = this.windowWidth + this.position.x;
        }
        if (this.position.y < 0) {
            this.position.y = this.windowHeight + this.position.y;
        }
        if (this.position.x > this.windowWidth) {
            this.position.x = this.windowWidth - this.position.x;
        }
        if (this.position.y > this.windowHeight) {
            this.position.y = this.windowHeight - this.position.y;
        }
    }

    applyForce(force) {
        this.acceleration.add(force);
    }

    draw() {
        fill(100, 50);
        noStroke();
        ellipse(this.position.x, this.position.y, this.radius, this.radius);
    }
}