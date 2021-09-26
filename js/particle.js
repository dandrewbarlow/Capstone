// Andrew Barlow
// particle.js
// Emitting CU
// particle class w/ methods for individual particles
// assuming mass of 1 to keep simulations simpler

class Particle {

    // create particle in random place, w/ no velocity or acceleration
    constructor(p, v, a) {

        // randomize position in canvas
        this.position = p;

        // initialize w/ no movement
        this.velocity = v;
        this.acceleration = a;

        // keep track of canvas size locally, to assist responsive scaling
        this.windowHeight = windowHeight;
        this.windowWidth = windowWidth;

        this.radius = 20;

        // for creating color based on perlin noise
        this.offset = 0;
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
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.set(0,0);

        this.offset += 0.001;
        // console.log(this);
    }

    // when edge of browser is crossed, loop over to the other side
    edgeCollision() {
        if (this.position.x < 0) {
            this.position.x = this.windowWidth + this.position.x;
            // this.position.x = 0;
            // this.velocity.mult(-1);
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

    calculateColor() {
        let noiseVal = noise(this.position.x, this.position.y, this.offset);
        noiseVal = map(noiseVal, 0, 1, 0, 255);
        let col = color(noiseVal/2, 0, noiseVal, 2200);
        // console.log(col);

        return col;
    }

    draw() {
        fill(this.calculateColor());
        noStroke();

        ellipse(this.position.x, this.position.y, this.radius, this.radius);
    }
}