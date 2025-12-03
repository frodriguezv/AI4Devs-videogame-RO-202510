// Spike Hazard Class

import { COLORS } from '../config.js';

export class Spike {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 16;
        this.height = 16;
        this.color = COLORS.SPIKE_RED;
    }

    render(ctx, camera) {
        ctx.save();
        ctx.fillStyle = this.color;
        // Draw triangle pointing up
        ctx.beginPath();
        ctx.moveTo(this.x + this.width / 2, this.y); // Top
        ctx.lineTo(this.x + this.width, this.y + this.height); // Bottom right
        ctx.lineTo(this.x, this.y + this.height); // Bottom left
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    getBounds() {
        return {
            left: this.x,
            right: this.x + this.width,
            top: this.y,
            bottom: this.y + this.height
        };
    }
}
