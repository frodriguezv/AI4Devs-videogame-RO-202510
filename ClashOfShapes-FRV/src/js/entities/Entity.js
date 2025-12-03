// Entity Base Class

export class Entity {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.velocityX = 0;
        this.velocityY = 0;
        this.onGround = false;
    }

    updateBase() {
        // Reset ground state (will be set by collision detection)
        this.onGround = false;
    }

    update(deltaTime) {
        // Override in subclasses
    }

    render(ctx, camera) {
        // Override in subclasses
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
