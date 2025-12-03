// Player Class

import { Entity } from './Entity.js';
import { CONFIG, COLORS } from '../config.js';

export class Player extends Entity {
    constructor(x, y, particleSystem) {
        super(x, y, CONFIG.PLAYER.SIZE, CONFIG.PLAYER.SIZE);
        this.shape = CONFIG.PLAYER.START_SHAPE; // Starting shape: 'circle', 'square', or 'triangle'
        this.color = CONFIG.PLAYER.COLOR; // Blue
        this.walkSpeed = CONFIG.PLAYER.WALK_SPEED;
        this.runSpeed = CONFIG.PLAYER.RUN_SPEED;
        this.invulnerable = false;
        this.invulnerabilityTimer = 0;
        this.particleSystem = particleSystem; // Reference to particle system
    }

    cycleShapeForward() {
        const shapes = ['square', 'circle', 'triangle'];
        const currentIndex = shapes.indexOf(this.shape);
        const nextIndex = (currentIndex + 1) % shapes.length;
        this.shape = shapes[nextIndex];
        this.onShapeMorph();
    }

    cycleShapeBackward() {
        const shapes = ['square', 'circle', 'triangle'];
        const currentIndex = shapes.indexOf(this.shape);
        const prevIndex = (currentIndex - 1 + shapes.length) % shapes.length;
        this.shape = shapes[prevIndex];
        this.onShapeMorph();
    }

    onShapeMorph() {
        // Emit 5 blue sparkle particles radially
        const centerX = this.x + this.width / 2;
        const centerY = this.y + this.height / 2;
        if (this.particleSystem) {
            this.particleSystem.emitRadial(centerX, centerY, 5, COLORS.PARTICLE_MORPH, 100, 0.3);
        }
        console.log(`Morphed to ${this.shape}`);
    }

    update(deltaTime, input) {
        this.updateBase();

        // Shape morphing (Q and E keys)
        if (input.isKeyPressed('q')) {
            this.cycleShapeForward();
            input.resetKey('q'); // Consume key press to prevent continuous switching
        }

        if (input.isKeyPressed('e')) {
            this.cycleShapeBackward();
            input.resetKey('e'); // Consume key press to prevent continuous switching
        }

        // Handle horizontal movement
        let targetSpeed = 0;
        const isRunning = input.isKeyPressed('x');
        const moveSpeed = isRunning ? this.runSpeed : this.walkSpeed;

        // Left movement
        if (input.isKeyPressed('arrowleft') || input.isKeyPressed('a')) {
            targetSpeed = -moveSpeed;
        }
        // Right movement
        if (input.isKeyPressed('arrowright') || input.isKeyPressed('d')) {
            targetSpeed = moveSpeed;
        }

        // Apply movement
        if (targetSpeed !== 0) {
            this.velocityX = targetSpeed;
        } else {
            // Apply friction when not moving
            this.velocityX *= CONFIG.PLAYER.FRICTION;
        }

        // Update horizontal position
        this.x += this.velocityX * deltaTime;

        // Jump (only when on ground)
        if ((input.isKeyPressed('arrowup') || input.isKeyPressed('w') ||
             input.isKeyPressed('z') || input.isKeyPressed(' ')) && this.onGround) {
            this.velocityY = CONFIG.PLAYER.JUMP_IMPULSE; // Jump impulse
            // Reset keys to prevent continuous jumping
            input.resetKey('arrowup');
            input.resetKey('w');
            input.resetKey('z');
            input.resetKey(' ');
        }

        // Apply gravity
        this.velocityY += CONFIG.GRAVITY * deltaTime;

        // Update vertical position
        this.y += this.velocityY * deltaTime;

        // Keep player within level bounds (horizontal)
        this.x = Math.max(0, Math.min(this.x, CONFIG.LEVEL_WIDTH - this.width));

        // Update invulnerability timer
        if (this.invulnerable) {
            this.invulnerabilityTimer -= deltaTime;
            if (this.invulnerabilityTimer <= 0) {
                this.invulnerable = false;
            }
        }
    }

    render(ctx, camera) {
        ctx.save();

        // Flash effect when invulnerable
        if (this.invulnerable && Math.floor(Date.now() / 100) % 2 === 0) {
            ctx.globalAlpha = 0.5;
        }

        ctx.fillStyle = this.color;

        // Render based on current shape
        if (this.shape === 'circle') {
            // Draw circle
            ctx.beginPath();
            ctx.arc(this.x + this.width / 2, this.y + this.height / 2, this.width / 2, 0, Math.PI * 2);
            ctx.fill();
        } else if (this.shape === 'square') {
            // Draw square
            ctx.fillRect(this.x, this.y, this.width, this.height);
        } else if (this.shape === 'triangle') {
            // Draw triangle (pointing up)
            ctx.beginPath();
            ctx.moveTo(this.x + this.width / 2, this.y); // Top point
            ctx.lineTo(this.x + this.width, this.y + this.height); // Bottom right
            ctx.lineTo(this.x, this.y + this.height); // Bottom left
            ctx.closePath();
            ctx.fill();
        }

        ctx.restore();
    }

    setInvulnerable(duration) {
        this.invulnerable = true;
        this.invulnerabilityTimer = duration;
    }
}
