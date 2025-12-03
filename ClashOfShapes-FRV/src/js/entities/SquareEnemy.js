// SquareEnemy Class - Flying Enemy with 2D Movement

import { Enemy } from './Enemy.js';
import { CONFIG } from '../config.js';

export class SquareEnemy extends Enemy {
    constructor(x, y, player) {
        super(x, y, 'square');
        this.color = CONFIG.ENEMY.COLORS.SQUARE;
        this.speed = CONFIG.ENEMY.SPEEDS.SQUARE;
        this.player = player; // Reference to player for chase behavior
        this.canFly = true;
        this.detectionRange = CONFIG.ENEMY.SQUARE_FLY.DETECTION_RANGE;
        this.chaseSpeed = CONFIG.ENEMY.SQUARE_FLY.CHASE_SPEED;

        // Visual features
        this.eyeBlinkTimer = 0;
        this.eyeBlinkInterval = 3000 + Math.random() * 2000; // 3-5 seconds
        this.isBlinking = false;
        this.armAngle = 0;
        this.wingFlap = 0;

        // Flying behavior
        this.hoverOffset = Math.random() * Math.PI * 2; // Random starting phase for hover
        this.hoverSpeed = 2; // Speed of hovering sine wave
        this.hoverAmplitude = 10; // Pixels up/down for hover effect
    }

    update(deltaTime, player) {
        if (!this.alive) return;

        // Update player reference if provided
        if (player) {
            this.player = player;
        }

        // Update animations
        this.updateAnimations(deltaTime);

        // Flying AI: Can move freely in 2D space
        if (this.player) {
            const dx = (this.player.x + this.player.width / 2) - (this.x + this.width / 2);
            const dy = (this.player.y + this.player.height / 2) - (this.y + this.height / 2);
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.detectionRange && distance > 0) {
                // Chase player directly through the air
                this.velocityX = (dx / distance) * this.chaseSpeed;
                this.velocityY = (dy / distance) * this.chaseSpeed;
            } else {
                // Hover in place with sine wave motion
                this.hoverOffset += this.hoverSpeed * deltaTime;
                this.velocityX = Math.cos(this.hoverOffset) * 20;
                this.velocityY = Math.sin(this.hoverOffset) * this.hoverAmplitude;
            }
        } else {
            // No player reference, just hover
            this.hoverOffset += this.hoverSpeed * deltaTime;
            this.velocityX = Math.cos(this.hoverOffset) * 20;
            this.velocityY = Math.sin(this.hoverOffset) * this.hoverAmplitude;
        }

        // Update position (flying, no gravity)
        this.x += this.velocityX * deltaTime;
        this.y += this.velocityY * deltaTime;

        // Keep within level bounds
        this.x = Math.max(0, Math.min(this.x, CONFIG.LEVEL_WIDTH - this.width));
        this.y = Math.max(0, Math.min(this.y, CONFIG.LEVEL_HEIGHT - this.height));
    }

    updateAnimations(deltaTime) {
        // Wing flap animation
        this.wingFlap += deltaTime * 10;
        this.armAngle = Math.sin(this.wingFlap) * 30; // Wings flap up and down

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

        // Draw body (square)
        ctx.fillStyle = this.color;
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeRect(this.x, this.y, this.width, this.height);

        // Draw arms (wings for flying)
        this.drawWings(ctx);

        // Draw legs
        this.drawLegs(ctx);

        // Draw eyes
        this.drawEyes(ctx);

        ctx.restore();
    }

    drawWings(ctx) {
        const centerX = this.x + this.width / 2;
        const centerY = this.y + this.height / 2;
        const wingLength = this.width * 0.5;
        const wingWidth = this.width * 0.15;

        ctx.fillStyle = this.color;
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;

        // Left wing
        ctx.save();
        ctx.translate(this.x, centerY);
        ctx.rotate((this.armAngle * Math.PI) / 180);
        ctx.fillRect(-wingLength, -wingWidth / 2, wingLength, wingWidth);
        ctx.strokeRect(-wingLength, -wingWidth / 2, wingLength, wingWidth);
        ctx.restore();

        // Right wing
        ctx.save();
        ctx.translate(this.x + this.width, centerY);
        ctx.rotate((-this.armAngle * Math.PI) / 180);
        ctx.fillRect(0, -wingWidth / 2, wingLength, wingWidth);
        ctx.strokeRect(0, -wingWidth / 2, wingLength, wingWidth);
        ctx.restore();
    }

    drawLegs(ctx) {
        const legWidth = this.width * 0.18;
        const legHeight = this.height * 0.25;
        const footWidth = this.width * 0.2;
        const footHeight = this.height * 0.1;

        ctx.fillStyle = this.color;
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;

        // Legs start at the bottom of the body (no overlap)
        const legStartY = this.y + this.height;

        // Left leg
        const leftLegX = this.x + this.width * 0.35 - legWidth / 2;
        ctx.fillRect(leftLegX, legStartY, legWidth, legHeight);
        ctx.strokeRect(leftLegX, legStartY, legWidth, legHeight);
        // Left foot (square shaped)
        ctx.fillRect(leftLegX - (footWidth - legWidth) / 2, legStartY + legHeight, footWidth, footHeight);
        ctx.strokeRect(leftLegX - (footWidth - legWidth) / 2, legStartY + legHeight, footWidth, footHeight);

        // Right leg
        const rightLegX = this.x + this.width * 0.65 - legWidth / 2;
        ctx.fillRect(rightLegX, legStartY, legWidth, legHeight);
        ctx.strokeRect(rightLegX, legStartY, legWidth, legHeight);
        // Right foot (square shaped)
        ctx.fillRect(rightLegX - (footWidth - legWidth) / 2, legStartY + legHeight, footWidth, footHeight);
        ctx.strokeRect(rightLegX - (footWidth - legWidth) / 2, legStartY + legHeight, footWidth, footHeight);
    }

    drawEyes(ctx) {
        const eyeSize = this.width * 0.15;
        const eyeOffsetY = this.y + this.height * 0.3;
        const leftEyeX = this.x + this.width * 0.3;
        const rightEyeX = this.x + this.width * 0.7;

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

            // Pupils
            ctx.fillStyle = '#000000';
            const pupilSize = eyeSize * 0.5;
            ctx.beginPath();
            ctx.arc(leftEyeX, eyeOffsetY, pupilSize, 0, Math.PI * 2);
            ctx.fill();

            ctx.beginPath();
            ctx.arc(rightEyeX, eyeOffsetY, pupilSize, 0, Math.PI * 2);
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
