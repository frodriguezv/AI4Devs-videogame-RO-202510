// PlayerLimbs Class - Handles Player Arms and Legs

export class PlayerLimbs {
    constructor(player) {
        this.player = player;
        this.armAngle = 0;
        this.legPhase = 0;
        this.animationSpeed = 10;
        this.isMoving = false;
    }

    update(deltaTime) {
        // Check if player is moving
        this.isMoving = Math.abs(this.player.velocityX) > 10;

        if (this.isMoving && this.player.onGround) {
            // Animate limbs when moving on ground
            const speedMultiplier = Math.abs(this.player.velocityX) / this.player.walkSpeed;
            this.armAngle += deltaTime * this.animationSpeed * speedMultiplier;
            this.legPhase += deltaTime * this.animationSpeed * speedMultiplier;
        } else if (this.player.onGround) {
            // Return to idle position smoothly
            this.armAngle *= 0.9;
            this.legPhase *= 0.9;
        }
    }

    draw(ctx) {
        ctx.save();

        // Draw arms behind body
        this.drawArms(ctx);

        ctx.restore();
    }

    drawAfter(ctx) {
        // Draw legs in front of body
        ctx.save();
        this.drawLegs(ctx);
        ctx.restore();
    }

    drawArms(ctx) {
        const centerX = this.player.x + this.player.width / 2;
        const centerY = this.player.y + this.player.height / 2;
        const armLength = this.player.width * 0.4;
        const armWidth = this.player.width * 0.12;

        ctx.fillStyle = this.player.color;
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;

        if (this.player.jumping || !this.player.onGround) {
            // Arms raised when jumping
            this.drawArm(ctx, centerX - this.player.width * 0.3, centerY, armWidth, armLength, -90, 'left');
            this.drawArm(ctx, centerX + this.player.width * 0.3, centerY, armWidth, armLength, -90, 'right');
        } else if (this.isMoving) {
            // Arms swing when moving
            const swingAmount = Math.sin(this.armAngle) * 30;
            this.drawArm(ctx, centerX - this.player.width * 0.3, centerY, armWidth, armLength, swingAmount, 'left');
            this.drawArm(ctx, centerX + this.player.width * 0.3, centerY, armWidth, armLength, -swingAmount, 'right');
        } else {
            // Arms at rest (slight angle)
            this.drawArm(ctx, centerX - this.player.width * 0.3, centerY, armWidth, armLength, 15, 'left');
            this.drawArm(ctx, centerX + this.player.width * 0.3, centerY, armWidth, armLength, 15, 'right');
        }
    }

    drawArm(ctx, x, y, width, length, angle, side) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate((angle * Math.PI) / 180);

        // Draw arm
        ctx.fillStyle = this.player.color;
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;
        ctx.fillRect(-width / 2, 0, width, length);
        ctx.strokeRect(-width / 2, 0, width, length);

        // Draw hand (small circle)
        ctx.fillStyle = this.player.color;
        ctx.beginPath();
        ctx.arc(0, length, width / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.restore();
    }

    drawLegs(ctx) {
        const legWidth = this.player.width * 0.18;
        const legHeight = this.player.height * 0.25;
        const footWidth = this.player.width * 0.2;
        const footHeight = this.player.height * 0.1;

        ctx.fillStyle = this.player.color;
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;

        // Legs start at the bottom of the body (no overlap)
        const legStartY = this.player.y + this.player.height;

        if (this.player.jumping || !this.player.onGround) {
            // Legs bent/tucked when jumping
            const bentLegHeight = legHeight * 0.6;
            this.drawLeg(ctx, this.player.x + this.player.width * 0.35, legStartY,
                        legWidth, bentLegHeight, footWidth, footHeight, 0);
            this.drawLeg(ctx, this.player.x + this.player.width * 0.65, legStartY,
                        legWidth, bentLegHeight, footWidth, footHeight, 0);
        } else if (this.isMoving) {
            // Walking animation
            const leftLegSwing = Math.sin(this.legPhase) * 5;
            const rightLegSwing = Math.sin(this.legPhase + Math.PI) * 5;
            this.drawLeg(ctx, this.player.x + this.player.width * 0.35, legStartY,
                        legWidth, legHeight, footWidth, footHeight, leftLegSwing);
            this.drawLeg(ctx, this.player.x + this.player.width * 0.65, legStartY,
                        legWidth, legHeight, footWidth, footHeight, rightLegSwing);
        } else {
            // Standing still
            this.drawLeg(ctx, this.player.x + this.player.width * 0.35, legStartY,
                        legWidth, legHeight, footWidth, footHeight, 0);
            this.drawLeg(ctx, this.player.x + this.player.width * 0.65, legStartY,
                        legWidth, legHeight, footWidth, footHeight, 0);
        }
    }

    drawLeg(ctx, x, y, width, height, footWidth, footHeight, swingOffset) {
        // Draw leg
        ctx.fillStyle = this.player.color;
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;
        ctx.fillRect(x - width / 2 + swingOffset, y, width, height);
        ctx.strokeRect(x - width / 2 + swingOffset, y, width, height);

        // Draw foot (feet should touch the collision box bottom)
        const footX = x - footWidth / 2 + swingOffset;
        const footY = y + height;

        // Determine foot shape based on player shape
        if (this.player.shape === 'circle') {
            // Circular feet for circle player
            ctx.beginPath();
            ctx.arc(x + swingOffset, footY + footHeight / 2, footHeight, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
        } else if (this.player.shape === 'triangle') {
            // Triangular feet for triangle player
            ctx.beginPath();
            ctx.moveTo(x + swingOffset, footY); // Top
            ctx.lineTo(x + swingOffset + footWidth / 2, footY + footHeight); // Bottom right
            ctx.lineTo(x + swingOffset - footWidth / 2, footY + footHeight); // Bottom left
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        } else {
            // Rectangular feet for square player (default)
            ctx.fillRect(footX, footY, footWidth, footHeight);
            ctx.strokeRect(footX, footY, footWidth, footHeight);
        }
    }
}
