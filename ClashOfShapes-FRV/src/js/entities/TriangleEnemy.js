// TriangleEnemy Class - Jumping Enemy with Random Mini-Jumps

import { Enemy } from './Enemy.js';
import { CONFIG } from '../config.js';

export class TriangleEnemy extends Enemy {
    constructor(x, y) {
        super(x, y, 'triangle');
        this.color = CONFIG.ENEMY.COLORS.TRIANGLE;
        this.speed = CONFIG.ENEMY.SPEEDS.TRIANGLE;
        this.direction = 1; // 1 for right, -1 for left
        this.canFly = false;

        // Jump properties
        this.jumpTimer = 0;
        this.jumpInterval = this.getRandomJumpInterval();
        this.isGrounded = false;

        // Visual features
        this.eyeBlinkTimer = 0;
        this.eyeBlinkInterval = 3000 + Math.random() * 2000; // 3-5 seconds
        this.isBlinking = false;
        this.legPhase = 0;
        this.armPhase = 0;
        this.animationSpeed = 10;
        this.squashStretch = 1.0; // For squash and stretch effect

        // Debug logging
        this.debugFrameCount = 0;
        console.log(`[TriangleEnemy] Created at (${x}, ${y}), jumpInterval: ${this.jumpInterval}ms`);
    }

    getRandomJumpInterval() {
        // Random interval between min and max
        return CONFIG.ENEMY.TRIANGLE_JUMP.MIN_JUMP_INTERVAL +
               Math.random() * (CONFIG.ENEMY.TRIANGLE_JUMP.MAX_JUMP_INTERVAL - CONFIG.ENEMY.TRIANGLE_JUMP.MIN_JUMP_INTERVAL);
    }

    getRandomJumpForce() {
        // Random jump force between min and max
        return CONFIG.ENEMY.TRIANGLE_JUMP.MIN_JUMP_FORCE +
               Math.random() * (CONFIG.ENEMY.TRIANGLE_JUMP.MAX_JUMP_FORCE - CONFIG.ENEMY.TRIANGLE_JUMP.MIN_JUMP_FORCE);
    }

    performMiniJump() {
        console.log(`[TriangleEnemy] performMiniJump called - isGrounded: ${this.isGrounded}, onGround: ${this.onGround}`);
        if (this.isGrounded) {
            const jumpForce = this.getRandomJumpForce();
            this.velocityY = jumpForce;
            this.isGrounded = false;
            this.jumpTimer = 0;
            this.jumpInterval = this.getRandomJumpInterval();
            this.squashStretch = 1.3; // Stretch when jumping
            console.log(`[TriangleEnemy] ✓ JUMP EXECUTED! velocityY: ${jumpForce}, next interval: ${this.jumpInterval}ms`);
        } else {
            console.log(`[TriangleEnemy] ✗ JUMP BLOCKED - isGrounded: ${this.isGrounded}, onGround: ${this.onGround}`);
        }
    }

    update(deltaTime) {
        if (!this.alive) return;

        // Store previous ground state BEFORE updateBase resets it
        const wasOnGroundLastFrame = this.onGround;

        this.updateBase();

        // Debug logging every 60 frames (approximately 1 second)
        this.debugFrameCount++;
        if (this.debugFrameCount % 60 === 0) {
            console.log(`[TriangleEnemy Debug] Frame: ${this.debugFrameCount}, wasOnGround: ${wasOnGroundLastFrame}, onGround: ${this.onGround}, isGrounded: ${this.isGrounded}, velocityY: ${this.velocityY.toFixed(2)}, jumpTimer: ${this.jumpTimer.toFixed(0)}ms / ${this.jumpInterval.toFixed(0)}ms, y: ${this.y.toFixed(1)}`);
        }

        // Update animations
        this.updateAnimations(deltaTime);

        // Horizontal movement continues as normal
        this.velocityX = this.direction * this.speed;

        // Apply gravity
        this.velocityY += CONFIG.GRAVITY * deltaTime;

        // Update position
        this.x += this.velocityX * deltaTime;
        this.y += this.velocityY * deltaTime;

        // Check if grounded using the previous frame's onGround state
        if (wasOnGroundLastFrame && this.velocityY >= 0) {
            this.isGrounded = true;
            this.squashStretch = 0.85; // Squash when landing
            if (this.debugFrameCount % 60 === 0) {
                console.log(`[TriangleEnemy] Set isGrounded = true (was grounded & velocityY >= 0)`);
            }
        } else {
            this.isGrounded = false;
        }

        // Return squash/stretch to normal
        this.squashStretch += (1.0 - this.squashStretch) * deltaTime * 10;

        // Random mini-jump timer (only count when grounded)
        if (this.isGrounded) {
            this.jumpTimer += deltaTime * 1000;
            if (this.jumpTimer >= this.jumpInterval) {
                console.log(`[TriangleEnemy] Jump timer reached! ${this.jumpTimer.toFixed(0)} >= ${this.jumpInterval.toFixed(0)}`);
                this.performMiniJump();
            }
        } else {
            if (this.debugFrameCount % 60 === 0) {
                console.log(`[TriangleEnemy] NOT grounded, jump timer paused at ${this.jumpTimer.toFixed(0)}ms`);
            }
        }

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
        // Walking animation - animate whenever moving
        if (Math.abs(this.velocityX) > 0) {
            const speedMultiplier = Math.abs(this.velocityX) / this.speed;
            this.legPhase += deltaTime * this.animationSpeed * speedMultiplier;
            this.armPhase += deltaTime * this.animationSpeed * speedMultiplier;
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

        // Apply squash and stretch
        const centerX = this.x + this.width / 2;
        const centerY = this.y + this.height / 2;
        ctx.translate(centerX, centerY);
        ctx.scale(1 / this.squashStretch, this.squashStretch);
        ctx.translate(-centerX, -centerY);

        // Draw body (triangle)
        ctx.fillStyle = this.color;
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(this.x + this.width / 2, this.y); // Top point
        ctx.lineTo(this.x + this.width, this.y + this.height); // Bottom right
        ctx.lineTo(this.x, this.y + this.height); // Bottom left
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Draw arms
        this.drawArms(ctx);

        // Draw legs
        this.drawLegs(ctx);

        // Draw eyes
        this.drawEyes(ctx);

        ctx.restore();
    }

    drawArms(ctx) {
        const centerY = this.y + this.height * 0.5;
        const armLength = this.width * 0.35;
        const armWidth = this.width * 0.12;
        const swingAmount = Math.sin(this.armPhase) * 30; // Increased swing for more visible animation

        ctx.fillStyle = this.color;
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;

        // Left arm
        ctx.save();
        ctx.translate(this.x + this.width * 0.25, centerY);
        ctx.rotate((swingAmount * Math.PI) / 180);
        ctx.fillRect(-armWidth / 2, 0, armWidth, armLength);
        ctx.strokeRect(-armWidth / 2, 0, armWidth, armLength);
        // Hand (triangular)
        ctx.beginPath();
        ctx.moveTo(0, armLength); // Top
        ctx.lineTo(-armWidth / 2, armLength + armWidth); // Bottom left
        ctx.lineTo(armWidth / 2, armLength + armWidth); // Bottom right
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        // Right arm
        ctx.save();
        ctx.translate(this.x + this.width * 0.75, centerY);
        ctx.rotate((-swingAmount * Math.PI) / 180);
        ctx.fillRect(-armWidth / 2, 0, armWidth, armLength);
        ctx.strokeRect(-armWidth / 2, 0, armWidth, armLength);
        // Hand (triangular)
        ctx.beginPath();
        ctx.moveTo(0, armLength); // Top
        ctx.lineTo(-armWidth / 2, armLength + armWidth); // Bottom left
        ctx.lineTo(armWidth / 2, armLength + armWidth); // Bottom right
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }

    drawLegs(ctx) {
        const legWidth = this.width * 0.18;
        const legHeight = this.height * 0.25;
        const footWidth = this.width * 0.2;
        const footHeight = this.height * 0.1;

        // Calculate leg positions with walking animation (increased swing for more visible animation)
        const leftLegSwing = this.isGrounded ? Math.sin(this.legPhase) * 8 : 0;
        const rightLegSwing = this.isGrounded ? Math.sin(this.legPhase + Math.PI) * 8 : 0;

        ctx.fillStyle = this.color;
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;

        // Legs start at the bottom of the body (no overlap)
        const legStartY = this.y + this.height;

        // Left leg
        const leftLegX = this.x + this.width * 0.35 - legWidth / 2 + leftLegSwing;
        ctx.fillRect(leftLegX, legStartY, legWidth, legHeight);
        ctx.strokeRect(leftLegX, legStartY, legWidth, legHeight);
        // Left foot (triangular)
        ctx.beginPath();
        ctx.moveTo(leftLegX + legWidth / 2, legStartY + legHeight); // Top center
        ctx.lineTo(leftLegX + legWidth / 2 + footWidth / 2, legStartY + legHeight + footHeight); // Bottom right
        ctx.lineTo(leftLegX + legWidth / 2 - footWidth / 2, legStartY + legHeight + footHeight); // Bottom left
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Right leg
        const rightLegX = this.x + this.width * 0.65 - legWidth / 2 + rightLegSwing;
        ctx.fillRect(rightLegX, legStartY, legWidth, legHeight);
        ctx.strokeRect(rightLegX, legStartY, legWidth, legHeight);
        // Right foot (triangular)
        ctx.beginPath();
        ctx.moveTo(rightLegX + legWidth / 2, legStartY + legHeight); // Top center
        ctx.lineTo(rightLegX + legWidth / 2 + footWidth / 2, legStartY + legHeight + footHeight); // Bottom right
        ctx.lineTo(rightLegX + legWidth / 2 - footWidth / 2, legStartY + legHeight + footHeight); // Bottom left
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }

    drawEyes(ctx) {
        const eyeSize = this.width * 0.1;
        const eyeOffsetY = this.y + this.height * 0.35;
        const leftEyeX = this.x + this.width * 0.35;
        const rightEyeX = this.x + this.width * 0.65;

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
