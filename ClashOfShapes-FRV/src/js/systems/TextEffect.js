// Text Effect System

export class TextEffect {
    constructor(x, y, text, color, size, duration) {
        this.x = x;
        this.y = y;
        this.text = text;
        this.color = color;
        this.size = size;
        this.duration = duration;
        this.maxDuration = duration;
        this.velocityY = -50; // Float upward
    }

    update(deltaTime) {
        this.y += this.velocityY * deltaTime;
        this.duration -= deltaTime;
    }

    render(ctx, camera) {
        const alpha = this.duration / this.maxDuration;
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = this.color;
        ctx.font = `bold ${this.size}px Arial`;
        ctx.textAlign = 'center';
        ctx.fillText(this.text, this.x, this.y);
        ctx.restore();
    }

    isDead() {
        return this.duration <= 0;
    }
}
