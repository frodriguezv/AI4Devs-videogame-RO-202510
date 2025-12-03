// Goal Class

export class Goal {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 64;
        this.height = 64;
        this.time = 0;
    }

    update(deltaTime, orbsCollected) {
        this.time += deltaTime;
    }

    isActive(orbsCollected) {
        return orbsCollected >= 3;
    }

    render(ctx, camera, orbsCollected) {
        ctx.save();

        if (this.isActive(orbsCollected)) {
            // Green pulsing
            const pulse = Math.sin(this.time * 2) * 0.2 + 0.8;
            ctx.fillStyle = `rgba(0, 255, 0, ${pulse})`;
            ctx.fillRect(this.x, this.y, this.width, this.height);

            // "GOAL" text
            ctx.fillStyle = '#FFFFFF';
            ctx.font = 'bold 16px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('GOAL', this.x + this.width / 2, this.y + this.height / 2);
        } else {
            // Gray semi-transparent
            ctx.fillStyle = 'rgba(100, 100, 100, 0.5)';
            ctx.fillRect(this.x, this.y, this.width, this.height);

            // "Need 3 Orbs" text
            ctx.fillStyle = '#FFFFFF';
            ctx.font = 'bold 10px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('Need', this.x + this.width / 2, this.y + this.height / 2 - 8);
            ctx.fillText('3 Orbs', this.x + this.width / 2, this.y + this.height / 2 + 8);
        }

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
