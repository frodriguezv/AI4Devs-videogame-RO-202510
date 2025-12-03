// Camera System

import { CONFIG } from '../config.js';

export class Camera {
    constructor(width, height) {
        this.x = 0;
        this.y = 0;
        this.width = width;
        this.height = height;
        this.levelWidth = CONFIG.LEVEL_WIDTH;
        this.levelHeight = CONFIG.LEVEL_HEIGHT;
        this.shakeIntensity = 0;
        this.shakeDuration = 0;
        this.shakeX = 0;
        this.shakeY = 0;
        this.lerpFactor = CONFIG.CAMERA.LERP_FACTOR; // 10% lerp for smooth following
    }

    follow(target) {
        if (!target) return;

        // Calculate target camera position (center player in viewport)
        const targetX = target.x + target.width / 2 - this.width / 2;
        const targetY = target.y + target.height / 2 - this.height / 2;

        // Smooth lerp to target position
        this.x += (targetX - this.x) * this.lerpFactor;
        this.y += (targetY - this.y) * this.lerpFactor;

        // Clamp to level bounds
        this.x = Math.max(0, Math.min(this.x, this.levelWidth - this.width));
        this.y = Math.max(0, Math.min(this.y, this.levelHeight - this.height));
    }

    shake(intensity, duration) {
        this.shakeIntensity = intensity;
        this.shakeDuration = duration;
    }

    update() {
        // Update shake effect
        if (this.shakeDuration > 0) {
            this.shakeX = (Math.random() - 0.5) * this.shakeIntensity * 2;
            this.shakeY = (Math.random() - 0.5) * this.shakeIntensity * 2;
            this.shakeDuration--;
        } else {
            this.shakeX = 0;
            this.shakeY = 0;
        }
    }

    apply(ctx) {
        // Apply camera transform (translate world by -camera position + shake)
        ctx.translate(-this.x + this.shakeX, -this.y + this.shakeY);
    }

    reset() {
        this.x = 0;
        this.y = 0;
        this.shakeX = 0;
        this.shakeY = 0;
        this.shakeDuration = 0;
    }
}
