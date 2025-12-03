// Enemy Class

import { Entity } from './Entity.js';
import { CONFIG, COLORS } from '../config.js';

export class Enemy extends Entity {
    constructor(x, y, shape) {
        super(x, y, CONFIG.ENEMY.SIZE, CONFIG.ENEMY.SIZE);
        this.shape = shape; // 'circle', 'square', or 'triangle'
        this.color = CONFIG.ENEMY.COLOR; // Red

        // Set speed based on shape type
        if (shape === 'circle') {
            this.speed = CONFIG.ENEMY.SPEEDS.CIRCLE;
        } else if (shape === 'square') {
            this.speed = CONFIG.ENEMY.SPEEDS.SQUARE;
        } else if (shape === 'triangle') {
            this.speed = CONFIG.ENEMY.SPEEDS.TRIANGLE;
        }

        this.direction = 1; // 1 = right, -1 = left
        this.patrolRange = CONFIG.ENEMY.PATROL_RANGE;
        this.startX = x; // Store starting position for patrol range
        this.alive = true;
    }

    update(deltaTime) {
        if (!this.alive) return;

        this.updateBase();

        // Apply gravity
        this.velocityY += CONFIG.GRAVITY * deltaTime;

        // Patrol movement
        this.velocityX = this.direction * this.speed;

        // Update position
        this.x += this.velocityX * deltaTime;
        this.y += this.velocityY * deltaTime;

        // Check patrol range and reverse direction at boundaries
        if (this.x > this.startX + this.patrolRange) {
            this.direction = -1; // Turn left
            this.x = this.startX + this.patrolRange; // Clamp position
        } else if (this.x < this.startX - this.patrolRange) {
            this.direction = 1; // Turn right
            this.x = this.startX - this.patrolRange; // Clamp position
        }
    }

    render(ctx, camera) {
        if (!this.alive) return;

        ctx.save();
        ctx.fillStyle = this.color;

        // Render based on shape
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
}
