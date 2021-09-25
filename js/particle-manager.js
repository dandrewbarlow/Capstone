// Andrew Barlow
// particle-manager.js
// Emitting CU
// class for managing all particles in the sketch without a bunch of loops in my main sketch
// a bit of an unnecessary abstraction, but what can I say, I like abstraction

class ParticleManager {

    // create n particles
    constructor(n) {
        this.particles = [];
        for (let i = 0; i < n; i++) {
            this.particles.push( new Particle() );
        }

        // <1, probably <.1, unless you want some fast ass particles
        this.coefficientOfFriction = .1;
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
        this.mouseForce();

        this.particles.forEach(particle => {
            particle.update();
        })
    }
    
    // apply a uniform force to all particles (e.g. gravity)
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
            // not working very well for some reason
            let friction = particle.velocity.copy();
            friction.mult(-1);
            // friction.normalize();
            friction.mult(this.coefficientOfFriction);
            particle.applyForce(friction);
        })
    }

    // use mouse input as attractor/repeller
    mouseForce() {
        this.particles.forEach(particle => {
            let mouseForce = p5.Vector.sub(particle.position, createVector(mouseX, mouseY));
            mouseForce.normalize();
            mouseForce.div(10);

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