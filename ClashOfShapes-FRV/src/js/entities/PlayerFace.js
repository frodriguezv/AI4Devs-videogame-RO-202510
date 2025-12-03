// PlayerFace Class - Handles Player Facial Features

export class PlayerFace {
    constructor(player) {
        this.player = player;
        this.eyeOffsetY = -player.height * 0.15;
        this.leftEyeOffsetX = -player.width * 0.2;
        this.rightEyeOffsetX = player.width * 0.2;
        this.blinkTimer = 0;
        this.blinkInterval = 3000 + Math.random() * 2000; // 3-5 seconds
        this.isBlinking = false;
        this.expression = 'normal'; // normal, happy, surprised, determined
    }

    update(deltaTime) {
        // Update blink animation
        this.blinkTimer += deltaTime * 1000;
        if (this.blinkTimer >= this.blinkInterval) {
            this.isBlinking = true;
            if (this.blinkTimer >= this.blinkInterval + 150) { // Blink for 150ms
                this.isBlinking = false;
                this.blinkTimer = 0;
                this.blinkInterval = 3000 + Math.random() * 2000;
            }
        }

        // Determine expression based on player state
        if (this.player.invulnerable && this.player.invulnerabilityTimer > 0.5) {
            this.expression = 'surprised';
        } else if (Math.abs(this.player.velocityX) > this.player.walkSpeed) {
            this.expression = 'determined';
        } else {
            this.expression = 'normal';
        }
    }

    draw(ctx) {
        const centerX = this.player.x + this.player.width / 2;
        const centerY = this.player.y + this.player.height / 2;
        const eyeOffsetY = centerY + this.eyeOffsetY;

        // Draw eyes based on shape
        if (this.player.shape === 'square') {
            this.drawSquareEyes(ctx, centerX, eyeOffsetY);
        } else if (this.player.shape === 'circle') {
            this.drawCircleEyes(ctx, centerX, eyeOffsetY);
        } else if (this.player.shape === 'triangle') {
            this.drawTriangleEyes(ctx, centerX, eyeOffsetY);
        }

        // Draw mouth based on expression
        this.drawMouth(ctx, centerX, centerY);
    }

    drawSquareEyes(ctx, centerX, eyeOffsetY) {
        const eyeSize = this.player.width * 0.12;
        const leftEyeX = centerX + this.leftEyeOffsetX;
        const rightEyeX = centerX + this.rightEyeOffsetX;

        if (!this.isBlinking) {
            // Draw open eyes
            ctx.fillStyle = '#FFFFFF';
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 1;

            // Left eye
            ctx.fillRect(leftEyeX - eyeSize / 2, eyeOffsetY - eyeSize / 2, eyeSize, eyeSize);
            ctx.strokeRect(leftEyeX - eyeSize / 2, eyeOffsetY - eyeSize / 2, eyeSize, eyeSize);

            // Right eye
            ctx.fillRect(rightEyeX - eyeSize / 2, eyeOffsetY - eyeSize / 2, eyeSize, eyeSize);
            ctx.strokeRect(rightEyeX - eyeSize / 2, eyeOffsetY - eyeSize / 2, eyeSize, eyeSize);

            // Pupils
            ctx.fillStyle = '#000000';
            const pupilSize = eyeSize * 0.4;
            const pupilOffsetX = this.getPupilOffset();

            ctx.fillRect(leftEyeX - pupilSize / 2 + pupilOffsetX, eyeOffsetY - pupilSize / 2, pupilSize, pupilSize);
            ctx.fillRect(rightEyeX - pupilSize / 2 + pupilOffsetX, eyeOffsetY - pupilSize / 2, pupilSize, pupilSize);
        } else {
            // Draw closed eyes (horizontal lines)
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(leftEyeX - eyeSize / 2, eyeOffsetY);
            ctx.lineTo(leftEyeX + eyeSize / 2, eyeOffsetY);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(rightEyeX - eyeSize / 2, eyeOffsetY);
            ctx.lineTo(rightEyeX + eyeSize / 2, eyeOffsetY);
            ctx.stroke();
        }
    }

    drawCircleEyes(ctx, centerX, eyeOffsetY) {
        const eyeSize = this.player.width * 0.12;
        const leftEyeX = centerX + this.leftEyeOffsetX;
        const rightEyeX = centerX + this.rightEyeOffsetX;

        if (!this.isBlinking) {
            // Draw open eyes
            ctx.fillStyle = '#FFFFFF';
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 1;

            // Left eye
            ctx.beginPath();
            ctx.arc(leftEyeX, eyeOffsetY, eyeSize, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            // Right eye
            ctx.beginPath();
            ctx.arc(rightEyeX, eyeOffsetY, eyeSize, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            // Pupils
            ctx.fillStyle = '#000000';
            const pupilSize = eyeSize * 0.5;
            const pupilOffsetX = this.getPupilOffset();

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

    drawTriangleEyes(ctx, centerX, eyeOffsetY) {
        const eyeSize = this.player.width * 0.1;
        const leftEyeX = centerX + this.leftEyeOffsetX;
        const rightEyeX = centerX + this.rightEyeOffsetX;

        if (!this.isBlinking) {
            // Draw open eyes
            ctx.fillStyle = '#FFFFFF';
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 1;

            // Left eye
            ctx.beginPath();
            ctx.arc(leftEyeX, eyeOffsetY, eyeSize, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            // Right eye
            ctx.beginPath();
            ctx.arc(rightEyeX, eyeOffsetY, eyeSize, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            // Pupils
            ctx.fillStyle = '#000000';
            const pupilSize = eyeSize * 0.5;
            const pupilOffsetX = this.getPupilOffset();

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

    getPupilOffset() {
        // Move pupils based on horizontal velocity
        const maxOffset = this.player.width * 0.03;
        if (this.player.velocityX > 0) {
            return maxOffset;
        } else if (this.player.velocityX < 0) {
            return -maxOffset;
        }
        return 0;
    }

    drawMouth(ctx, centerX, centerY) {
        const mouthOffsetY = centerY + this.player.height * 0.15;
        const mouthWidth = this.player.width * 0.3;

        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;

        if (this.expression === 'happy') {
            // Smile
            ctx.beginPath();
            ctx.arc(centerX, mouthOffsetY - mouthWidth / 4, mouthWidth / 2, 0, Math.PI);
            ctx.stroke();
        } else if (this.expression === 'surprised') {
            // Open mouth (circle)
            ctx.beginPath();
            ctx.arc(centerX, mouthOffsetY, mouthWidth / 3, 0, Math.PI * 2);
            ctx.stroke();
        } else if (this.expression === 'determined') {
            // Straight line (determined)
            ctx.beginPath();
            ctx.moveTo(centerX - mouthWidth / 2, mouthOffsetY);
            ctx.lineTo(centerX + mouthWidth / 2, mouthOffsetY);
            ctx.stroke();
        } else {
            // Normal (slight smile)
            ctx.beginPath();
            ctx.arc(centerX, mouthOffsetY - mouthWidth / 6, mouthWidth / 2, 0, Math.PI, false);
            ctx.stroke();
        }
    }

    setExpression(expression) {
        this.expression = expression;
    }
}
