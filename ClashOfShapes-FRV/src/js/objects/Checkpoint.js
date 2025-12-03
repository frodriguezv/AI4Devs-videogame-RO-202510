// Checkpoint Class

import { COLORS } from '../config.js';

export class Checkpoint {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 32;
        this.height = 32;
        this.active = false;
        this.inactiveColor = COLORS.CHECKPOINT_INACTIVE;
        this.activeColor = COLORS.CHECKPOINT_ACTIVE;
    }

    activate() {
        if (!this.active) {
            this.active = true;
            return true; // Return true if this was first activation
        }
        return false;
    }

    render(ctx, camera) {
        ctx.save();
        ctx.fillStyle = this.active ? this.activeColor : this.inactiveColor;
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Draw "CP" text
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('CP', this.x + this.width / 2, this.y + this.height / 2);
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
