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
    }

    // resize all particles
    resize() {
        this.particles.forEach(particle => {
            particle.resize();
        });
    }

    update() {
        this.particles.forEach(particle => {
            particle.update();
        })
    }
    
    applyForce(force) {
        this.particles.forEach(particle => {
            particle.applyForce(force);
        })
    }
    // draw all particles
    draw() {
        this.particles.forEach(particle => {
            particle.draw();
        })
    }
}