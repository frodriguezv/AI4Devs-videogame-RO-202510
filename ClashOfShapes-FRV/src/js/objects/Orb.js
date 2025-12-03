// Orb Collectible Class

import { COLORS } from '../config.js';

export class Orb {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 16;
        this.baseY = y; // Store original Y for bobbing
        this.color = COLORS.ORB_PURPLE;
        this.collected = false;
        this.bobSpeed = 1.5; // rad/s (slightly slower than coins)
        this.bobAmplitude = 12; // pixels (bigger amplitude)
        this.bobTime = Math.random() * Math.PI * 2; // Random starting phase
        this.width = this.size;
        this.height = this.size;
    }

    update(deltaTime) {
        if (this.collected) return;

        // Bobbing animation
        this.bobTime += this.bobSpeed * deltaTime;
        this.y = this.baseY + Math.sin(this.bobTime) * this.bobAmplitude;
    }

    render(ctx, camera) {
        if (this.collected) return;

        ctx.save();
        ctx.fillStyle = this.color;

        // Draw orb with glow effect
        ctx.beginPath();
        ctx.arc(this.x + this.size / 2, this.y + this.size / 2, this.size / 2, 0, Math.PI * 2);
        ctx.fill();

        // Inner highlight
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.beginPath();
        ctx.arc(this.x + this.size / 2 - 2, this.y + this.size / 2 - 2, this.size / 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }

    getBounds() {
        return {
            left: this.x,
            right: this.x + this.size,
            top: this.y,
            bottom: this.y + this.size
        };
    }

    onCollect() {
        this.collected = true;
        return {
            type: 'orb',
            points: 0,
            text: 'ORB!',
            color: COLORS.TEXT_ORB
        };
    }
}
