// Ground Tile Class

import { COLORS } from '../config.js';

export class GroundTile {
    constructor(x, y, width = 16, height = 16) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = COLORS.GROUND_BROWN; // Brown
    }

    render(ctx, camera) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
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
