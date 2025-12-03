// InstructionsScreen Class - Display game instructions and controls

import { COLORS } from '../config.js';

export class InstructionsScreen {
    constructor() {
        this.visible = false;
        this.alpha = 0;
        this.fadeSpeed = 5;
    }

    show() {
        this.visible = true;
    }

    hide() {
        this.visible = false;
        this.alpha = 0;
    }

    toggle() {
        if (this.visible) {
            this.hide();
        } else {
            this.show();
        }
    }

    update(deltaTime) {
        if (this.visible) {
            // Fade in
            this.alpha = Math.min(1, this.alpha + this.fadeSpeed * deltaTime);
        } else {
            // Fade out
            this.alpha = Math.max(0, this.alpha - this.fadeSpeed * deltaTime);
        }
    }

    render(ctx, canvas) {
        if (this.alpha <= 0) return;

        ctx.save();
        ctx.globalAlpha = this.alpha;

        // Semi-transparent dark overlay
        ctx.fillStyle = 'rgba(26, 26, 46, 0.95)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Title
        ctx.fillStyle = COLORS.UI_WHITE;
        ctx.font = 'bold 32px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('HOW TO PLAY - CLASH OF SHAPES', canvas.width / 2, 50);

        // Draw content in two columns
        const leftX = 80;
        const rightX = 450;
        let y = 100;

        // === LEFT COLUMN ===

        // Controls Section
        this.drawSectionTitle(ctx, 'CONTROLS', leftX, y);
        y += 30;
        ctx.font = '16px Arial';
        ctx.fillStyle = '#FFFFFF';
        ctx.textAlign = 'left';

        ctx.fillText('Move:', leftX, y);
        ctx.fillStyle = '#4ECDC4';
        ctx.fillText('Arrow Keys or WASD', leftX + 80, y);
        y += 25;

        ctx.fillStyle = '#FFFFFF';
        ctx.fillText('Jump:', leftX, y);
        ctx.fillStyle = '#4ECDC4';
        ctx.fillText('Space / W / ↑ / Z', leftX + 80, y);
        y += 20;
        ctx.font = '13px Arial';
        ctx.fillStyle = '#AAA';
        ctx.fillText('(Hold for higher jump)', leftX + 80, y);
        y += 25;

        ctx.font = '16px Arial';
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText('Run:', leftX, y);
        ctx.fillStyle = '#4ECDC4';
        ctx.fillText('Hold X', leftX + 80, y);
        y += 25;

        ctx.fillStyle = '#FFFFFF';
        ctx.fillText('Morph:', leftX, y);
        ctx.fillStyle = '#4ECDC4';
        ctx.fillText('Q (previous) / E (next)', leftX + 80, y);
        y += 40;

        // Combat System Section
        this.drawSectionTitle(ctx, 'COMBAT SYSTEM (Rock-Paper-Scissors)', leftX, y);
        y += 30;

        // Draw combat matchups with colored shapes
        this.drawCombatMatchup(ctx, leftX, y, 'Circle', '#4ECDC4', 'Triangle', '#FFE66D');
        y += 30;
        this.drawCombatMatchup(ctx, leftX, y, 'Triangle', '#FFE66D', 'Square', '#FF6B6B');
        y += 30;
        this.drawCombatMatchup(ctx, leftX, y, 'Square', '#FF6B6B', 'Circle', '#4ECDC4');
        y += 40;

        ctx.font = '14px Arial';
        ctx.fillStyle = '#FFD700';
        ctx.fillText('Match your shape to defeat enemies!', leftX, y);
        y += 40;

        // Objectives Section
        this.drawSectionTitle(ctx, 'OBJECTIVES', leftX, y);
        y += 30;
        ctx.font = '16px Arial';
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText('• Collect all 3 Orbs', leftX, y);
        ctx.fillStyle = '#9B59B6';
        ctx.fillText('🟣', leftX + 180, y);
        y += 25;
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText('• Reach the Goal', leftX, y);
        ctx.fillStyle = '#00FF00';
        ctx.fillText('🏁', leftX + 180, y);
        y += 25;
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText('• Collect Coins for points', leftX, y);
        ctx.fillStyle = '#F4D03F';
        ctx.fillText('💛', leftX + 210, y);

        // === RIGHT COLUMN ===
        y = 100;

        // Enemy Types Section
        this.drawSectionTitle(ctx, 'ENEMY TYPES', rightX, y);
        y += 30;

        // Circle Enemy
        this.drawEnemyInfo(ctx, rightX, y, 'circle', '#4ECDC4', 'CIRCLE (Cyan)',
            'Fast ground patrol', 'Weak to: Square');
        y += 70;

        // Square Enemy
        this.drawEnemyInfo(ctx, rightX, y, 'square', '#FF6B6B', 'SQUARE (Red)',
            'Flying, chases player', 'Weak to: Circle');
        y += 70;

        // Triangle Enemy
        this.drawEnemyInfo(ctx, rightX, y, 'triangle', '#FFE66D', 'TRIANGLE (Yellow)',
            'Jumps randomly', 'Weak to: Triangle');
        y += 80;

        // Health & Scoring Section
        this.drawSectionTitle(ctx, 'HEALTH & SCORING', rightX, y);
        y += 30;
        ctx.font = '16px Arial';
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText('• Start with 5 hearts', rightX, y);
        ctx.fillStyle = '#E74C3C';
        ctx.fillText('❤️', rightX + 190, y);
        y += 25;
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText('• Defeat enemy: +100 pts', rightX, y);
        y += 25;
        ctx.fillText('• Collect coin: +10 pts', rightX, y);
        y += 25;
        ctx.fillText('• Complete level: +500 pts', rightX, y);
        y += 40;

        // Tips Section
        this.drawSectionTitle(ctx, 'PRO TIPS', rightX, y);
        y += 30;
        ctx.font = '14px Arial';
        ctx.fillStyle = '#FFD700';
        ctx.fillText('💡 Study enemy patterns first', rightX, y);
        y += 22;
        ctx.fillText('💡 Morph strategically to counter', rightX, y);
        y += 22;
        ctx.fillText('💡 Hold X to run for longer jumps', rightX, y);
        y += 22;
        ctx.fillText('💡 Watch out for spikes!', rightX, y);

        // Bottom instructions - aligned to left
        ctx.font = 'bold 24px Arial';
        ctx.fillStyle = COLORS.UI_WHITE;
        ctx.textAlign = 'left';
        ctx.fillText('Press SPACE to play', leftX, canvas.height - 30);

        // Hint text for closing
        ctx.font = '16px Arial';
        ctx.fillStyle = '#AAA';
        ctx.fillText('(Press I or ESC to close)', leftX, canvas.height - 10);

        ctx.restore();
    }

    drawSectionTitle(ctx, title, x, y) {
        ctx.font = 'bold 20px Arial';
        ctx.fillStyle = '#4A90E2';
        ctx.textAlign = 'left';
        ctx.fillText(title, x, y);

        // Underline
        ctx.strokeStyle = '#4A90E2';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x, y + 5);
        ctx.lineTo(x + ctx.measureText(title).width, y + 5);
        ctx.stroke();
    }

    drawCombatMatchup(ctx, x, y, shape1, color1, shape2, color2) {
        // First shape
        ctx.fillStyle = color1;
        this.drawMiniShape(ctx, x + 20, y, shape1);
        ctx.font = '16px Arial';
        ctx.fillStyle = '#FFFFFF';
        ctx.textAlign = 'left';
        ctx.fillText(shape1, x + 50, y + 5);

        // Arrow
        ctx.fillStyle = '#00FF00';
        ctx.font = 'bold 18px Arial';
        ctx.fillText('→', x + 130, y + 5);

        // Second shape
        ctx.fillStyle = color2;
        this.drawMiniShape(ctx, x + 165, y, shape2);
        ctx.font = '16px Arial';
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText(shape2, x + 195, y + 5);
    }

    drawMiniShape(ctx, x, y, shape) {
        const size = 15;
        ctx.beginPath();

        if (shape.toLowerCase() === 'circle') {
            ctx.arc(x, y, size / 2, 0, Math.PI * 2);
        } else if (shape.toLowerCase() === 'square') {
            ctx.rect(x - size / 2, y - size / 2, size, size);
        } else if (shape.toLowerCase() === 'triangle') {
            ctx.moveTo(x, y - size / 2);
            ctx.lineTo(x + size / 2, y + size / 2);
            ctx.lineTo(x - size / 2, y + size / 2);
            ctx.closePath();
        }

        ctx.fill();
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1;
        ctx.stroke();
    }

    drawEnemyInfo(ctx, x, y, shape, color, name, behavior, weakness) {
        // Draw enemy shape
        ctx.fillStyle = color;
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;

        if (shape === 'circle') {
            ctx.beginPath();
            ctx.arc(x + 15, y + 15, 15, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
        } else if (shape === 'square') {
            ctx.fillRect(x, y, 30, 30);
            ctx.strokeRect(x, y, 30, 30);
        } else if (shape === 'triangle') {
            ctx.beginPath();
            ctx.moveTo(x + 15, y);
            ctx.lineTo(x + 30, y + 30);
            ctx.lineTo(x, y + 30);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        }

        // Enemy info text
        ctx.font = 'bold 16px Arial';
        ctx.fillStyle = color;
        ctx.textAlign = 'left';
        ctx.fillText(name, x + 40, y + 12);

        ctx.font = '14px Arial';
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText(behavior, x + 40, y + 30);

        ctx.fillStyle = '#FFD700';
        ctx.font = '13px Arial';
        ctx.fillText(weakness, x + 40, y + 48);
    }
}
