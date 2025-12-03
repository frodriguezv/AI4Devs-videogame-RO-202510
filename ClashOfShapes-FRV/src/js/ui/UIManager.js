// UI Manager - Handles all HUD rendering

import { COLORS } from '../config.js';

export class UIManager {
    constructor(uiCanvas) {
        this.ctx = uiCanvas.getContext('2d');
        this.canvas = uiCanvas;
    }

    render(gameState, player) {
        // Clear UI canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Render health bar
        this.renderHealthBar(gameState.health);

        // Render score
        this.renderScore(gameState.score);

        // Render orbs collected
        this.renderOrbs(gameState.orbsCollected);

        // Render shape indicator
        if (player) {
            this.renderShapeIndicator(player.shape);
        }
    }

    renderHealthBar(health) {
        const heartSize = 20;
        const heartSpacing = 25;
        const heartY = 20;

        for (let i = 0; i < 5; i++) {
            const heartX = 20 + i * heartSpacing;
            const filled = i < health;
            this.drawHeart(heartX, heartY, heartSize, filled);
        }
    }

    drawHeart(x, y, size, filled) {
        this.ctx.save();

        if (filled) {
            this.ctx.fillStyle = COLORS.HEALTH_RED;
        } else {
            this.ctx.strokeStyle = COLORS.HEALTH_RED;
            this.ctx.lineWidth = 2;
        }

        // Draw heart shape using bezier curves
        this.ctx.beginPath();
        this.ctx.moveTo(x + size / 2, y + size / 4);

        // Left curve
        this.ctx.bezierCurveTo(
            x + size / 2, y,
            x, y,
            x, y + size / 4
        );
        this.ctx.bezierCurveTo(
            x, y + size / 2,
            x + size / 2, y + (3 * size) / 4,
            x + size / 2, y + size
        );

        // Right curve
        this.ctx.bezierCurveTo(
            x + size / 2, y + (3 * size) / 4,
            x + size, y + size / 2,
            x + size, y + size / 4
        );
        this.ctx.bezierCurveTo(
            x + size, y,
            x + size / 2, y,
            x + size / 2, y + size / 4
        );

        this.ctx.closePath();

        if (filled) {
            this.ctx.fill();
        } else {
            this.ctx.stroke();
        }

        this.ctx.restore();
    }

    renderScore(score) {
        this.ctx.save();
        this.ctx.fillStyle = COLORS.UI_WHITE;
        this.ctx.font = 'bold 20px Arial';
        this.ctx.fillText(`Score: ${score}`, 20, 70);
        this.ctx.restore();
    }

    renderOrbs(orbsCollected) {
        this.ctx.save();
        this.ctx.fillStyle = COLORS.UI_WHITE;
        this.ctx.font = 'bold 20px Arial';
        this.ctx.fillText(`Orbs: ${orbsCollected}/3`, 20, 100);
        this.ctx.restore();
    }

    renderShapeIndicator(shape) {
        this.ctx.save();

        // Label
        this.ctx.fillStyle = COLORS.UI_WHITE;
        this.ctx.font = 'bold 20px Arial';
        this.ctx.fillText('Shape:', 20, 130);

        // Draw shape icon
        const shapeIconX = 95;
        const shapeIconY = 110;
        const shapeIconSize = 20;
        this.ctx.fillStyle = COLORS.PLAYER_BLUE;

        if (shape === 'circle') {
            this.ctx.beginPath();
            this.ctx.arc(shapeIconX + shapeIconSize / 2, shapeIconY + shapeIconSize / 2, shapeIconSize / 2, 0, Math.PI * 2);
            this.ctx.fill();
        } else if (shape === 'square') {
            this.ctx.fillRect(shapeIconX, shapeIconY, shapeIconSize, shapeIconSize);
        } else if (shape === 'triangle') {
            this.ctx.beginPath();
            this.ctx.moveTo(shapeIconX + shapeIconSize / 2, shapeIconY);
            this.ctx.lineTo(shapeIconX + shapeIconSize, shapeIconY + shapeIconSize);
            this.ctx.lineTo(shapeIconX, shapeIconY + shapeIconSize);
            this.ctx.closePath();
            this.ctx.fill();
        }

        // Shape name text
        this.ctx.fillStyle = COLORS.UI_WHITE;
        this.ctx.font = '16px Arial';
        let shapeName = '';
        if (shape === 'circle') shapeName = 'Circle (Rock)';
        else if (shape === 'square') shapeName = 'Square (Paper)';
        else if (shape === 'triangle') shapeName = 'Triangle (Scissors)';
        this.ctx.fillText(shapeName, 125, 125);

        this.ctx.restore();
    }
}
