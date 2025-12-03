// Particle System

export class Particle {
    constructor(x, y, velocityX, velocityY, color, size, lifetime) {
        this.x = x;
        this.y = y;
        this.velocityX = velocityX;
        this.velocityY = velocityY;
        this.color = color;
        this.size = size;
        this.lifetime = lifetime;
        this.maxLifetime = lifetime;
    }

    update(deltaTime) {
        // Apply gravity to particles
        this.velocityY += 300 * deltaTime;

        // Update position
        this.x += this.velocityX * deltaTime;
        this.y += this.velocityY * deltaTime;

        // Decrease lifetime
        this.lifetime -= deltaTime;
    }

    render(ctx, camera) {
        const alpha = this.lifetime / this.maxLifetime;
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
        ctx.restore();
    }

    isDead() {
        return this.lifetime <= 0;
    }
}

export class ParticleSystem {
    constructor() {
        this.particles = [];
    }

    emitRadial(x, y, count, color, speed, lifetime) {
        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 * i) / count;
            const speedVariation = 0.5 + Math.random() * 0.5;
            const velocityX = Math.cos(angle) * speed * speedVariation;
            const velocityY = Math.sin(angle) * speed * speedVariation;
            const size = 2 + Math.random() * 4; // Random size 2-6
            this.particles.push(new Particle(x, y, velocityX, velocityY, color, size, lifetime));
        }
    }

    emit(x, y, count, color, speed, lifetime) {
        // Circular pattern emission (evenly distributed)
        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 * i) / count;
            const velocityX = Math.cos(angle) * speed;
            const velocityY = Math.sin(angle) * speed;
            const size = 2 + Math.random() * 4;
            this.particles.push(new Particle(x, y, velocityX, velocityY, color, size, lifetime));
        }
    }

    update(deltaTime) {
        // Update all particles
        for (const particle of this.particles) {
            particle.update(deltaTime);
        }

        // Remove dead particles
        this.particles = this.particles.filter(p => !p.isDead());
    }

    render(ctx, camera) {
        for (const particle of this.particles) {
            particle.render(ctx, camera);
        }
    }
}
