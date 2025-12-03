// CircleEnemy Class - Fast Ground Enemy with Horizontal-Only Movement

import { Enemy } from './Enemy.js';
import { CONFIG } from '../config.js';

export class CircleEnemy extends Enemy {
    constructor(x, y) {
        super(x, y, 'circle');
        this.color = CONFIG.ENEMY.COLORS.CIRCLE;
        this.speed = CONFIG.ENEMY.SPEEDS.CIRCLE;
        this.direction = 1; // 1 for right, -1 for left
        this.canFly = false;

        // Visual features
        this.eyeBlinkTimer = 0;
        this.eyeBlinkInterval = 3000 + Math.random() * 2000; // 3-5 seconds
        this.isBlinking = false;
        this.legPhase = 0;
        this.armPhase = 0;
        this.animationSpeed = 15; // Faster animation for faster enemy
    }

    update(deltaTime) {
        if (!this.alive) return;

        this.updateBase();

        // Update animations
        this.updateAnimations(deltaTime);

        // Fast horizontal-only movement
        this.velocityX = this.speed * this.direction;

        // Apply gravity (for ground contact)
        this.velocityY += CONFIG.GRAVITY * deltaTime;

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

        // Keep within level bounds
        this.x = Math.max(0, Math.min(this.x, CONFIG.LEVEL_WIDTH - this.width));
    }

    updateAnimations(deltaTime) {
        // Running animation (legs and arms move faster than walk)
        if (Math.abs(this.velocityX) > 0) {
            this.legPhase += deltaTime * this.animationSpeed;
            this.armPhase += deltaTime * this.animationSpeed;
        }

        // Eye blink animation
        this.eyeBlinkTimer += deltaTime * 1000;
        if (this.eyeBlinkTimer >= this.eyeBlinkInterval) {
            this.isBlinking = true;
            if (this.eyeBlinkTimer >= this.eyeBlinkInterval + 150) { // Blink for 150ms
                this.isBlinking = false;
                this.eyeBlinkTimer = 0;
                this.eyeBlinkInterval = 3000 + Math.random() * 2000;
            }
        }
    }

    render(ctx, camera) {
        if (!this.alive) return;

        ctx.save();

        // Draw body (circle)
        ctx.fillStyle = this.color;
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(this.x + this.width / 2, this.y + this.height / 2, this.width / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Draw arms
        this.drawArms(ctx);

        // Draw legs (behind body for circles)
        this.drawLegs(ctx);

        // Draw eyes
        this.drawEyes(ctx);

        ctx.restore();
    }

    drawArms(ctx) {
        const centerX = this.x + this.width / 2;
        const centerY = this.y + this.height / 2;
        const radius = this.width / 2;
        const armLength = this.width * 0.35;
        const armWidth = this.width * 0.12;
        const swingAmount = Math.sin(this.armPhase) * 25; // Degrees

        ctx.fillStyle = this.color;
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;

        // Arms attach at the sides of circle, slightly below center
        // Angle from horizontal (small angle to position slightly below center)
        const armAttachAngle = 0.35; // radians (~20 degrees below horizontal)

        // Left arm - attach to left side of circle
        const leftArmX = centerX - radius * Math.cos(armAttachAngle);
        const leftArmY = centerY + radius * Math.sin(armAttachAngle);

        ctx.save();
        ctx.translate(leftArmX, leftArmY);
        ctx.rotate((swingAmount * Math.PI) / 180);
        ctx.fillRect(-armWidth / 2, 0, armWidth, armLength);
        ctx.strokeRect(-armWidth / 2, 0, armWidth, armLength);
        // Hand
        ctx.beginPath();
        ctx.arc(0, armLength, armWidth / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        // Right arm - attach to right side of circle
        const rightArmX = centerX + radius * Math.cos(armAttachAngle);
        const rightArmY = centerY + radius * Math.sin(armAttachAngle);

        ctx.save();
        ctx.translate(rightArmX, rightArmY);
        ctx.rotate((-swingAmount * Math.PI) / 180);
        ctx.fillRect(-armWidth / 2, 0, armWidth, armLength);
        ctx.strokeRect(-armWidth / 2, 0, armWidth, armLength);
        // Hand
        ctx.beginPath();
        ctx.arc(0, armLength, armWidth / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }

    drawLegs(ctx) {
        const legWidth = this.width * 0.18;
        const legHeight = this.height * 0.25;
        const footRadius = this.width * 0.1;

        // Calculate leg positions with running animation
        const leftLegSwing = Math.sin(this.legPhase) * 8;
        const rightLegSwing = Math.sin(this.legPhase + Math.PI) * 8;

        ctx.fillStyle = this.color;
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;

        // Legs start at the bottom of the body (no overlap)
        const legStartY = this.y + this.height;

        // Left leg
        const leftLegX = this.x + this.width * 0.35 - legWidth / 2 + leftLegSwing;
        ctx.fillRect(leftLegX, legStartY, legWidth, legHeight);
        ctx.strokeRect(leftLegX, legStartY, legWidth, legHeight);
        // Left foot (circular)
        ctx.beginPath();
        ctx.arc(leftLegX + legWidth / 2, legStartY + legHeight + footRadius, footRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Right leg
        const rightLegX = this.x + this.width * 0.65 - legWidth / 2 + rightLegSwing;
        ctx.fillRect(rightLegX, legStartY, legWidth, legHeight);
        ctx.strokeRect(rightLegX, legStartY, legWidth, legHeight);
        // Right foot (circular)
        ctx.beginPath();
        ctx.arc(rightLegX + legWidth / 2, legStartY + legHeight + footRadius, footRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    }

    drawEyes(ctx) {
        const eyeSize = this.width * 0.12;
        const eyeOffsetY = this.y + this.height * 0.4;
        const leftEyeX = this.x + this.width * 0.35;
        const rightEyeX = this.x + this.width * 0.65;

        // Determine eye look direction based on movement
        const pupilOffsetX = this.direction * eyeSize * 0.3;

        if (!this.isBlinking) {
            // Draw open eyes
            // White of eye
            ctx.fillStyle = '#FFFFFF';
            ctx.beginPath();
            ctx.arc(leftEyeX, eyeOffsetY, eyeSize, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 1;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(rightEyeX, eyeOffsetY, eyeSize, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            // Pupils (looking in direction of movement)
            ctx.fillStyle = '#000000';
            const pupilSize = eyeSize * 0.5;
            ctx.beginPath();
            ctx.arc(leftEyeX + pupilOffsetX, eyeOffsetY, pupilSize, 0, Math.PI * 2);
            ctx.fill();

            ctx.beginPath();
            ctx.arc(rightEyeX + pupilOffsetX, eyeOffsetY, pupilSize, 0, Math.PI * 2);
            ctx.fill();
        } else {
            // Draw closed eyes (horizontal lines)
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(leftEyeX - eyeSize, eyeOffsetY);
            ctx.lineTo(leftEyeX + eyeSize, eyeOffsetY);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(rightEyeX - eyeSize, eyeOffsetY);
            ctx.lineTo(rightEyeX + eyeSize, eyeOffsetY);
            ctx.stroke();
        }
    }
}
