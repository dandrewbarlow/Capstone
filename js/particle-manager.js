// Andrew Barlow
// particle-manager.js
// Emitting CU
// class for managing all particles in the sketch without a bunch of loops in my main sketch
// a bit of an unnecessary abstraction, but what can I say, I like abstraction

class ParticleManager {

    // create n particles
    constructor(n) {
        this.n = n;
        this.particles = [];
        for (let i = 0; i < n; i++) {
            this.particles.push( 
                // randomly placed particle, with no velocity or acceleration
                new Particle(
                createVector(random(windowWidth), random(windowHeight)),
                createVector(0, 0),
                createVector(0, 0)
                ) 
            );
        }

        this.mouse = createVector(mouseX, mouseY);

        // <1, probably <.1, unless you want some fast ass particles
        this.coefficientOfFriction = .1;
    }

    particleTrim() {
        // console.log(this.particles.length);
        while (this.particles.length > this.n) {
            this.particles.shift();
        }
    }

    // spawn one particle, remove one particle
    // perfectly balanced, as all things should be
    spawnParticle(p, v, a) {
        let particle = new Particle(p,v,a);
        this.particles.push(particle);
    }

    // calculates mouse movement between frames
    mouseMovement() {
        let distance = p5.Vector.sub(this.mouse, createVector(mouseX, mouseY));
        // console.log(distance);
        return distance.div(-2);
    }

    // emit particles from mouse
    mouseEmit() {
        let mouseMove = this.mouseMovement();

        // remove the oldest particle
        this.particles.shift();

        // don't do anything while mouse isn't moving
        if (mouseMove.x == 0 && mouseMove.y == 0) {
            return;
        }

        let velocity = createVector(
            mouseMove.x * randomGaussian(1, 1) + randomGaussian(1, 1),
            mouseMove.y * randomGaussian(1, 1) + randomGaussian(1, 1),
        );

        // console.log(velocity);

        for (let i = 0; i < 3; i++) {

            this.spawnParticle(
                createVector(mouseX, mouseY),
                velocity,
                createVector(0, 0)
            );
        }

    }

    // resize all particles
    resize() {
        this.particles.forEach(particle => {
            particle.resize();
        });
    }

    // update each particle, each draw loop. also apply global forces at this level
    update() {
        this.friction();

        this.mouseEmit();
        this.particleTrim();

        this.particles.forEach(particle => {
            particle.update();
        });

        this.mouse.set(mouseX, mouseY);
    }
    
    // apply a uniform force to all particles (e.g. gravity, wind)
    applyForce(force) {
        this.particles.forEach(particle => {
            particle.applyForce(force);
        })
    }

    // calculate & apply friction forces for each particle
    // credit: Daniel Schiffman's Nature of Code
    // https://natureofcode.com/book/chapter-2-forces/
    friction() {
        this.particles.forEach(particle => {
            // way # 1
            // not working very well for some reason
            // i suspect i've accidentally created a side effect somewhere
            // let friction = particle.velocity.copy();
            // friction.mult(-1);
            // friction.normalize();
            // friction.mult(this.coefficientOfFriction);
            // particle.applyForce(friction);

            // way # 2
            particle.velocity.mult(0.9);
        })
    }

    // use mouse input as attractor/repeller
    mouseForce() {
        this.particles.forEach(particle => {
            let mouseForce = p5.Vector.sub(particle.position, createVector(mouseX, mouseY));
            mouseForce.normalize();
            mouseForce.div(2);

            particle.applyForce(mouseForce);
        });
    }

    // draw all particles
    draw() {
        this.particles.forEach(particle => {
            particle.draw();
        })
    }
}