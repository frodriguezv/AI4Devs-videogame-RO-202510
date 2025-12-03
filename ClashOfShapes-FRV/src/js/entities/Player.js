// Player Class

import { Entity } from './Entity.js';
import { CONFIG, COLORS } from '../config.js';
import { PlayerFace } from './PlayerFace.js';
import { PlayerLimbs } from './PlayerLimbs.js';

export class Player extends Entity {
    constructor(x, y, particleSystem, audioManager) {
        super(x, y, CONFIG.PLAYER.SIZE, CONFIG.PLAYER.SIZE);
        this.shape = CONFIG.PLAYER.START_SHAPE; // Starting shape: 'circle', 'square', or 'triangle'
        this.color = CONFIG.PLAYER.COLOR; // Blue
        this.walkSpeed = CONFIG.PLAYER.WALK_SPEED;
        this.runSpeed = CONFIG.PLAYER.RUN_SPEED;
        this.invulnerable = false;
        this.invulnerabilityTimer = 0;
        this.particleSystem = particleSystem; // Reference to particle system
        this.audioManager = audioManager; // Reference to audio manager

        // Enhanced jump mechanics properties
        this.jumping = false;              // For variable jump height
        this.jumpHoldTime = 0;             // For variable jump height
        this.coyoteTimer = 0;              // For coyote time
        this.wasOnGround = false;          // For coyote time
        this.jumpBufferTimer = 0;          // For jump buffer

        // Visual features
        this.face = new PlayerFace(this);
        this.limbs = new PlayerLimbs(this);
    }

    cycleShapeForward() {
        const shapes = ['square', 'circle', 'triangle'];
        const currentIndex = shapes.indexOf(this.shape);
        const nextIndex = (currentIndex + 1) % shapes.length;
        this.shape = shapes[nextIndex];
        this.onShapeMorph();
    }

    cycleShapeBackward() {
        const shapes = ['square', 'circle', 'triangle'];
        const currentIndex = shapes.indexOf(this.shape);
        const prevIndex = (currentIndex - 1 + shapes.length) % shapes.length;
        this.shape = shapes[prevIndex];
        this.onShapeMorph();
    }

    onShapeMorph() {
        // Emit 5 blue sparkle particles radially
        const centerX = this.x + this.width / 2;
        const centerY = this.y + this.height / 2;
        if (this.particleSystem) {
            this.particleSystem.emitRadial(centerX, centerY, 5, COLORS.PARTICLE_MORPH, 100, 0.3);
        }
        console.log(`Morphed to ${this.shape}`);
    }

    update(deltaTime, input) {
        // Note: Don't call updateBase() here - let collision system manage onGround state

        // Update visual features
        this.face.update(deltaTime);
        this.limbs.update(deltaTime);

        // Shape morphing (Q and E keys)
        if (input.isKeyPressed('q')) {
            this.cycleShapeForward();
            input.resetKey('q'); // Consume key press to prevent continuous switching
        }

        if (input.isKeyPressed('e')) {
            this.cycleShapeBackward();
            input.resetKey('e'); // Consume key press to prevent continuous switching
        }

        // Handle horizontal movement
        let targetSpeed = 0;
        const isRunning = input.isKeyPressed('x');
        const moveSpeed = isRunning ? this.runSpeed : this.walkSpeed;

        // Left movement
        if (input.isKeyPressed('arrowleft') || input.isKeyPressed('a')) {
            targetSpeed = -moveSpeed;
        }
        // Right movement
        if (input.isKeyPressed('arrowright') || input.isKeyPressed('d')) {
            targetSpeed = moveSpeed;
        }

        // Apply movement
        if (targetSpeed !== 0) {
            this.velocityX = targetSpeed;
        } else {
            // Apply friction when not moving
            this.velocityX *= CONFIG.PLAYER.FRICTION;
        }

        // Update horizontal position
        this.x += this.velocityX * deltaTime;

        // === ENHANCED JUMP MECHANICS ===

        // 1. Track coyote time (grace period after leaving ground)
        if (this.onGround) {
            this.coyoteTimer = CONFIG.PLAYER.COYOTE_TIME;
            this.wasOnGround = true;
        } else if (this.wasOnGround && this.coyoteTimer > 0) {
            this.coyoteTimer -= deltaTime;
            if (this.coyoteTimer <= 0) {
                this.wasOnGround = false;
            }
        }

        // 2. Detect jump input
        const jumpKeys = ['arrowup', 'w', 'z', ' '];
        const jumpPressed = jumpKeys.some(key => input.isKeyPressed(key));

        // DEBUG: Log when any jump key is pressed
        if (jumpPressed) {
            const pressedKeys = jumpKeys.filter(key => input.isKeyPressed(key));
            console.log(`[JUMP DEBUG] Keys pressed: ${pressedKeys.join(', ')}`);
        }

        // 3. Update jump buffer timer
        if (this.jumpBufferTimer > 0) {
            this.jumpBufferTimer -= deltaTime;
        }

        // 4. Set jump buffer when jump key is pressed (and not already buffered)
        if (jumpPressed && !this.jumping && this.jumpBufferTimer <= 0) {
            this.jumpBufferTimer = CONFIG.PLAYER.JUMP_BUFFER_TIME;
            console.log(`[JUMP DEBUG] Buffer set: ${this.jumpBufferTimer.toFixed(3)}s`);
        }

        // 5. Check if player can jump (on ground or coyote time active)
        const canJump = this.onGround || (this.coyoteTimer > 0 && this.wasOnGround);

        // DEBUG: Log jump conditions
        if (jumpPressed || this.jumpBufferTimer > 0) {
            console.log(`[JUMP DEBUG] onGround: ${this.onGround}, jumping: ${this.jumping}, buffer: ${this.jumpBufferTimer.toFixed(3)}, canJump: ${canJump}, coyoteTimer: ${this.coyoteTimer.toFixed(3)}`);
        }

        // 6. Start jump (with buffered input)
        if (this.jumpBufferTimer > 0 && canJump && !this.jumping) {
            this.velocityY = CONFIG.PLAYER.JUMP_IMPULSE;
            this.jumping = true;
            this.jumpHoldTime = 0;
            this.jumpBufferTimer = 0;
            this.coyoteTimer = 0;
            this.wasOnGround = false;

            // Play jump sound
            if (this.audioManager) {
                this.audioManager.play('jump');
            }

            console.log(`[JUMP DEBUG] ✓ JUMP STARTED! velocityY: ${this.velocityY}`);
        }

        // 7. Variable jump height - continue jump while holding
        if (this.jumping && jumpPressed && this.jumpHoldTime < CONFIG.PLAYER.JUMP_HOLD_DURATION) {
            this.jumpHoldTime += deltaTime;
            // Apply upward force while holding
            this.velocityY += CONFIG.PLAYER.JUMP_IMPULSE * 0.15 * deltaTime;
            console.log(`[JUMP DEBUG] Holding jump: holdTime=${this.jumpHoldTime.toFixed(3)}s, velocityY=${this.velocityY.toFixed(1)}`);
        }

        // 8. Variable jump height - release jump early
        if (this.jumping && !jumpPressed) {
            // Apply minimum jump height multiplier
            if (this.velocityY < 0) {
                const oldVelocity = this.velocityY;
                this.velocityY *= CONFIG.PLAYER.MIN_JUMP_HEIGHT_MULTIPLIER;
                console.log(`[JUMP DEBUG] Jump released early: ${oldVelocity.toFixed(1)} → ${this.velocityY.toFixed(1)}`);
            }
            this.jumping = false;
        }

        // 9. Stop jump when landing
        if (this.onGround && this.jumping) {
            this.jumping = false;
            this.jumpHoldTime = 0;
            console.log(`[JUMP DEBUG] Landed - jump state reset`);
        }

        // 10. Reset jump keys only when on ground to prevent continuous jumping
        if (this.onGround && jumpPressed) {
            console.log(`[JUMP DEBUG] Resetting jump keys (on ground)`);
            jumpKeys.forEach(key => input.resetKey(key));
        }

        // Apply gravity
        this.velocityY += CONFIG.GRAVITY * deltaTime;

        // Update vertical position
        this.y += this.velocityY * deltaTime;

        // Keep player within level bounds (horizontal)
        this.x = Math.max(0, Math.min(this.x, CONFIG.LEVEL_WIDTH - this.width));

        // Update invulnerability timer
        if (this.invulnerable) {
            this.invulnerabilityTimer -= deltaTime;
            if (this.invulnerabilityTimer <= 0) {
                this.invulnerable = false;
            }
        }
    }

    render(ctx, camera) {
        ctx.save();

        // Flash effect when invulnerable
        if (this.invulnerable && Math.floor(Date.now() / 100) % 2 === 0) {
            ctx.globalAlpha = 0.5;
        }

        // Draw limbs behind body
        this.limbs.draw(ctx);

        ctx.fillStyle = this.color;
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;

        // Render body based on current shape
        if (this.shape === 'circle') {
            // Draw circle
            ctx.beginPath();
            ctx.arc(this.x + this.width / 2, this.y + this.height / 2, this.width / 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
        } else if (this.shape === 'square') {
            // Draw square
            ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.strokeRect(this.x, this.y, this.width, this.height);
        } else if (this.shape === 'triangle') {
            // Draw triangle (pointing up)
            ctx.beginPath();
            ctx.moveTo(this.x + this.width / 2, this.y); // Top point
            ctx.lineTo(this.x + this.width, this.y + this.height); // Bottom right
            ctx.lineTo(this.x, this.y + this.height); // Bottom left
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        }

        // Draw face on top of body
        this.face.draw(ctx);

        // Draw legs in front
        this.limbs.drawAfter(ctx);

        ctx.restore();
    }

    setInvulnerable(duration) {
        this.invulnerable = true;
        this.invulnerabilityTimer = duration;
    }
}
