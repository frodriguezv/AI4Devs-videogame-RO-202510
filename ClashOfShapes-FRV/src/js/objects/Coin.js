// Coin Collectible Class

import { COLORS } from '../config.js';

export class Coin {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 16;
        this.baseY = y; // Store original Y for bobbing
        this.color = COLORS.COIN_YELLOW;
        this.collected = false;
        this.bobSpeed = 2; // rad/s
        this.bobAmplitude = 8; // pixels
        this.bobTime = Math.random() * Math.PI * 2; // Random starting phase
        this.width = this.size;
        this.height = this.size;
        this.points = 10;
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
        ctx.beginPath();
        ctx.arc(this.x + this.size / 2, this.y + this.size / 2, this.size / 2, 0, Math.PI * 2);
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
            type: 'coin',
            points: this.points,
            text: '+10',
            color: COLORS.TEXT_COIN
        };
    }
}
