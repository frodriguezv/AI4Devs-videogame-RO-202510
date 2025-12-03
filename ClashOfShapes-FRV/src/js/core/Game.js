// Main Game Class

import { CONFIG, COLORS } from '../config.js';
import { InputManager } from './InputManager.js';
import { Camera } from './Camera.js';
import { Player } from '../entities/Player.js';
import { Enemy } from '../entities/Enemy.js';
import { SquareEnemy } from '../entities/SquareEnemy.js';
import { CircleEnemy } from '../entities/CircleEnemy.js';
import { TriangleEnemy } from '../entities/TriangleEnemy.js';
import { GroundTile } from '../objects/GroundTile.js';
import { CollisionSystem } from '../systems/CollisionSystem.js';
import { ParticleSystem } from '../systems/ParticleSystem.js';
import { TextEffect } from '../systems/TextEffect.js';
import { Level } from '../level/Level.js';
import { UIManager } from '../ui/UIManager.js';
import { AudioManager } from '../systems/AudioManager.js';
import { InstructionsScreen } from '../ui/InstructionsScreen.js';

export class Game {
    constructor(gameCanvas, uiCanvas) {
        this.gameCanvas = gameCanvas;
        this.uiCanvas = uiCanvas;
        this.ctx = gameCanvas.getContext('2d');
        this.uiCtx = uiCanvas.getContext('2d');

        // Game state
        this.state = {
            paused: false,
            gameOver: false,
            levelComplete: false,
            score: 0,
            health: CONFIG.INITIAL_HEALTH,
            orbsCollected: 0
        };

        // Input
        this.input = new InputManager();

        // Game loop variables
        this.lastFrameTime = 0;
        this.accumulator = 0;

        // Game objects (will be populated in later phases)
        this.player = null;
        this.enemies = [];
        this.tiles = [];
        this.collectibles = [];
        this.spikes = [];
        this.checkpoint = null;
        this.goal = null;
        this.spawnPoint = { x: CONFIG.PLAYER.START_X, y: CONFIG.PLAYER.START_Y };

        // Systems
        this.particleSystem = new ParticleSystem();
        this.camera = new Camera(CONFIG.CANVAS_WIDTH, CONFIG.CANVAS_HEIGHT);
        this.textEffects = [];
        this.uiManager = new UIManager(uiCanvas);
        this.audioManager = new AudioManager();
        this.instructionsScreen = new InstructionsScreen();

        // Show instructions at startup
        this.instructionsScreen.show();

        // Initialize player
        this.initGame();

        console.log('Game initialized');
    }

    initGame() {
        // Create player at starting position (pass particle system and audio manager references)
        this.player = new Player(CONFIG.PLAYER.START_X, CONFIG.PLAYER.START_Y, this.particleSystem, this.audioManager);

        // Initialize complete level using Level class
        const levelData = Level.init();
        this.tiles = levelData.tiles;
        this.collectibles = levelData.collectibles;
        this.spikes = levelData.spikes;
        this.checkpoint = levelData.checkpoint;
        this.goal = levelData.goal;

        // Create enemies from level data with specific enemy types
        this.enemies = [];
        for (const enemyData of levelData.enemiesData) {
            let enemy;
            if (enemyData.shape === 'square') {
                enemy = new SquareEnemy(enemyData.x, enemyData.y, this.player);
            } else if (enemyData.shape === 'circle') {
                enemy = new CircleEnemy(enemyData.x, enemyData.y);
            } else if (enemyData.shape === 'triangle') {
                enemy = new TriangleEnemy(enemyData.x, enemyData.y);
            } else {
                // Fallback to base Enemy class for unknown shapes
                enemy = new Enemy(enemyData.x, enemyData.y, enemyData.shape);
            }
            this.enemies.push(enemy);
        }

        console.log('Game initialized - Player at', CONFIG.PLAYER.START_X, CONFIG.PLAYER.START_Y);
        console.log('Level has', this.tiles.length, 'tiles');
        console.log('Created', this.enemies.length, 'enemies across 3 screens');
        console.log('Placed', this.collectibles.length, 'collectibles');
    }

    async start() {
        console.log('Game starting...');

        // Initialize audio manager
        await this.audioManager.init();

        requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
    }

    gameLoop(timestamp) {
        // Calculate delta time
        const deltaTime = this.lastFrameTime
            ? (timestamp - this.lastFrameTime) / 1000
            : 0;
        this.lastFrameTime = timestamp;

        // Cap delta time to prevent spiral of death
        const cappedDeltaTime = Math.min(deltaTime, CONFIG.MAX_DELTA_TIME);

        // Accumulate time for fixed timestep
        this.accumulator += cappedDeltaTime;

        // Update physics with fixed timestep
        while (this.accumulator >= CONFIG.FIXED_DELTA_TIME) {
            this.update(CONFIG.FIXED_DELTA_TIME);
            this.accumulator -= CONFIG.FIXED_DELTA_TIME;
        }

        // Render
        this.render();

        // Continue loop
        requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
    }

    update(deltaTime) {
        // Update instructions screen
        this.instructionsScreen.update(deltaTime);

        // Handle instructions toggle (I key or ESC when instructions are showing)
        if (this.input.isKeyPressed('i')) {
            this.instructionsScreen.toggle();
            this.input.resetKey('i');
            if (this.instructionsScreen.visible) {
                this.state.paused = true;
            } else {
                this.state.paused = false;
            }
        }

        // Handle ESC - close instructions if visible, otherwise pause
        if (this.input.isKeyPressed('escape')) {
            if (this.instructionsScreen.visible) {
                this.instructionsScreen.hide();
                this.state.paused = false;
            } else {
                this.state.paused = !this.state.paused;
            }
            this.input.resetKey('escape');
        }

        // Handle SPACE to start playing (close instructions)
        if (this.instructionsScreen.visible && this.input.isKeyPressed(' ')) {
            this.instructionsScreen.hide();
            this.state.paused = false;
            this.input.resetKey(' ');
        }

        // Handle restart (R key)
        if ((this.state.gameOver || this.state.levelComplete) && this.input.isKeyPressed('r')) {
            this.reset();
            this.input.resetKey('r');
            return;
        }

        // Don't update if paused, game over, or instructions showing
        if (this.state.paused || this.state.gameOver || this.state.levelComplete || this.instructionsScreen.visible) {
            return;
        }

        // Update player
        if (this.player) {
            this.player.update(deltaTime, this.input);

            // Reset onGround before collision detection
            this.player.onGround = false;

            // Check collisions with tiles
            for (const tile of this.tiles) {
                if (CollisionSystem.checkCollision(this.player, tile)) {
                    CollisionSystem.resolveCollision(this.player, tile);
                }
            }
        }

        // Update enemies
        for (const enemy of this.enemies) {
            // Pass player reference for SquareEnemy (flying enemy)
            if (enemy instanceof SquareEnemy) {
                enemy.update(deltaTime, this.player);
            } else {
                enemy.update(deltaTime);
            }

            // Check enemy collisions with tiles (except for flying enemies)
            if (!enemy.canFly) {
                for (const tile of this.tiles) {
                    if (CollisionSystem.checkCollision(enemy, tile)) {
                        CollisionSystem.resolveCollision(enemy, tile);
                    }
                }
            }
        }

        // Check player-enemy combat collisions
        if (this.player && !this.player.invulnerable) {
            for (const enemy of this.enemies) {
                if (enemy.alive && CollisionSystem.checkCollision(this.player, enemy)) {
                    this.handleCombat(this.player, enemy);
                }
            }
        }

        // Update collectibles
        for (const collectible of this.collectibles) {
            collectible.update(deltaTime);

            // Check collection
            if (!collectible.collected && this.player && CollisionSystem.checkCollision(this.player, collectible)) {
                this.handleCollection(collectible);
            }
        }

        // Update goal
        if (this.goal) {
            this.goal.update(deltaTime, this.state.orbsCollected);
        }

        // Check hazards (spikes)
        if (this.player && !this.player.invulnerable) {
            for (const spike of this.spikes) {
                if (CollisionSystem.checkCollision(this.player, spike)) {
                    this.handleHazardDamage();
                }
            }
        }

        // Check pit detection
        if (this.player && this.player.y > CONFIG.LEVEL_HEIGHT) {
            this.handleHazardDamage();
        }

        // Check checkpoint
        if (this.checkpoint && this.player && CollisionSystem.checkCollision(this.player, this.checkpoint)) {
            const activated = this.checkpoint.activate();
            if (activated) {
                this.audioManager.play('checkpoint');
                this.spawnPoint = { x: this.checkpoint.x, y: this.checkpoint.y };
                this.textEffects.push(new TextEffect(
                    this.checkpoint.x + 16,
                    this.checkpoint.y,
                    'CHECKPOINT!',
                    COLORS.TEXT_CHECKPOINT,
                    18,
                    0.7
                ));
                console.log('Checkpoint activated!');
            }
        }

        // Check goal
        if (this.goal && this.player && this.goal.isActive(this.state.orbsCollected) &&
            CollisionSystem.checkCollision(this.player, this.goal)) {
            this.handleLevelComplete();
        }

        // Update particle system
        if (this.particleSystem) {
            this.particleSystem.update(deltaTime);
        }

        // Update text effects
        for (const effect of this.textEffects) {
            effect.update(deltaTime);
        }
        this.textEffects = this.textEffects.filter(e => !e.isDead());

        // Update camera to follow player
        if (this.camera && this.player) {
            this.camera.follow(this.player);
            this.camera.update();
        }
    }

    render() {
        // Clear canvases
        this.ctx.fillStyle = COLORS.BACKGROUND;
        this.ctx.fillRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);
        this.uiCtx.clearRect(0, 0, this.uiCanvas.width, this.uiCanvas.height);

        this.ctx.save();

        // Apply camera transform (following + shake)
        if (this.camera) {
            this.camera.apply(this.ctx);
        }

        // Render tiles
        for (const tile of this.tiles) {
            tile.render(this.ctx);
        }

        // Render spikes
        for (const spike of this.spikes) {
            spike.render(this.ctx, this.camera);
        }

        // Render checkpoint
        if (this.checkpoint) {
            this.checkpoint.render(this.ctx, this.camera);
        }

        // Render goal
        if (this.goal) {
            this.goal.render(this.ctx, this.camera, this.state.orbsCollected);
        }

        // Render collectibles
        for (const collectible of this.collectibles) {
            collectible.render(this.ctx, this.camera);
        }

        // Render enemies
        for (const enemy of this.enemies) {
            enemy.render(this.ctx);
        }

        // Render player
        if (this.player) {
            this.player.render(this.ctx);
        }

        // Render particles
        if (this.particleSystem) {
            this.particleSystem.render(this.ctx);
        }

        // Render text effects
        for (const effect of this.textEffects) {
            effect.render(this.ctx, this.camera);
        }

        this.ctx.restore();

        // Render UI (HUD)
        if (this.uiManager) {
            this.uiManager.render(this.state, this.player);
        }

        // Render pause screen if paused
        if (this.state.paused) {
            this.renderPauseScreen();
        }

        // Render game over screen
        if (this.state.gameOver) {
            this.renderGameOverScreen();
        }

        // Render level complete screen
        if (this.state.levelComplete) {
            this.renderLevelCompleteScreen();
        }

        // Render instructions screen (on top of everything)
        if (this.instructionsScreen) {
            this.instructionsScreen.render(this.uiCtx, this.uiCanvas);
        }
    }

    renderPauseScreen() {
        this.uiCtx.save();

        // Dark overlay
        this.uiCtx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        this.uiCtx.fillRect(0, 0, this.uiCanvas.width, this.uiCanvas.height);

        // Pause text
        this.uiCtx.fillStyle = '#FFFFFF';
        this.uiCtx.font = 'bold 40px Arial';
        this.uiCtx.textAlign = 'center';
        this.uiCtx.fillText('PAUSED', this.uiCanvas.width / 2, this.uiCanvas.height / 2 - 40);

        this.uiCtx.font = '20px Arial';
        this.uiCtx.fillText('Press ESC to resume', this.uiCanvas.width / 2, this.uiCanvas.height / 2);

        this.uiCtx.font = '18px Arial';
        this.uiCtx.fillStyle = '#4ECDC4';
        this.uiCtx.fillText('Press I for instructions', this.uiCanvas.width / 2, this.uiCanvas.height / 2 + 30);

        this.uiCtx.restore();
    }

    renderGameOverScreen() {
        this.uiCtx.save();

        // Dark overlay
        this.uiCtx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.uiCtx.fillRect(0, 0, this.uiCanvas.width, this.uiCanvas.height);

        // Game Over text
        this.uiCtx.fillStyle = '#E74C3C';
        this.uiCtx.font = 'bold 60px Arial';
        this.uiCtx.textAlign = 'center';
        this.uiCtx.fillText('GAME OVER', this.uiCanvas.width / 2, this.uiCanvas.height / 2 - 60);

        // Final Score
        this.uiCtx.fillStyle = '#FFFFFF';
        this.uiCtx.font = '30px Arial';
        this.uiCtx.fillText(`Final Score: ${this.state.score}`, this.uiCanvas.width / 2, this.uiCanvas.height / 2);

        // Instructions
        this.uiCtx.font = '20px Arial';
        this.uiCtx.fillText('Press R to Restart', this.uiCanvas.width / 2, this.uiCanvas.height / 2 + 50);

        this.uiCtx.restore();
    }

    renderLevelCompleteScreen() {
        this.uiCtx.save();

        // Dark overlay
        this.uiCtx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.uiCtx.fillRect(0, 0, this.uiCanvas.width, this.uiCanvas.height);

        // Level Complete text
        this.uiCtx.fillStyle = '#00FF00';
        this.uiCtx.font = 'bold 50px Arial';
        this.uiCtx.textAlign = 'center';
        this.uiCtx.fillText('LEVEL COMPLETE!', this.uiCanvas.width / 2, this.uiCanvas.height / 2 - 80);

        // Final Score
        this.uiCtx.fillStyle = '#FFFFFF';
        this.uiCtx.font = '30px Arial';
        this.uiCtx.fillText(`Final Score: ${this.state.score}`, this.uiCanvas.width / 2, this.uiCanvas.height / 2 - 20);

        // Stats
        this.uiCtx.font = '20px Arial';
        this.uiCtx.fillText(`Health Remaining: ${this.state.health}`, this.uiCanvas.width / 2, this.uiCanvas.height / 2 + 20);
        this.uiCtx.fillText(`Orbs Collected: ${this.state.orbsCollected}/3`, this.uiCanvas.width / 2, this.uiCanvas.height / 2 + 50);

        // Instructions
        this.uiCtx.fillText('Press R to Play Again', this.uiCanvas.width / 2, this.uiCanvas.height / 2 + 90);

        this.uiCtx.restore();
    }

    getCombatResult(playerShape, enemyShape) {
        // Returns: 'win', 'lose', or 'draw'
        if (playerShape === enemyShape) {
            return 'draw';
        }

        // Circle (Rock) beats Triangle (Scissors)
        if (playerShape === 'circle' && enemyShape === 'triangle') return 'win';

        // Square (Paper) beats Circle (Rock)
        if (playerShape === 'square' && enemyShape === 'circle') return 'win';

        // Triangle (Scissors) beats Square (Paper)
        if (playerShape === 'triangle' && enemyShape === 'square') return 'win';

        // All other cases are losses
        return 'lose';
    }

    handleCombat(player, enemy) {
        const result = this.getCombatResult(player.shape, enemy.shape);

        // Calculate collision point
        const collisionX = (player.x + enemy.x) / 2 + 16;
        const collisionY = (player.y + enemy.y) / 2 + 16;

        if (result === 'win') {
            // Player wins - enemy defeated
            enemy.alive = false;
            this.state.score += CONFIG.COMBAT.SCORE_ENEMY_DEFEAT;

            // Play POW sound
            this.audioManager.play('pow');

            // Text effects
            this.textEffects.push(new TextEffect(enemy.x + 16, enemy.y + 16, 'POW!', COLORS.TEXT_POW, 24, 0.5));
            this.textEffects.push(new TextEffect(enemy.x + 16, enemy.y - 4, '+100', COLORS.TEXT_SCORE, 18, 0.6));

            // Victory particles (10 red particles from enemy center)
            this.particleSystem.emit(enemy.x + 16, enemy.y + 16, 10, COLORS.PARTICLE_VICTORY, 100, 0.5);

            // Player bounce-back
            const directionX = player.x < enemy.x ? -1 : 1;
            player.velocityX = directionX * 100;
            player.velocityY = -200;

            // Camera shake
            this.camera.shake(4, 2);

            console.log(`Victory! ${player.shape} beats ${enemy.shape}`);

        } else if (result === 'lose') {
            // Player loses - take damage
            this.state.health--;
            player.setInvulnerable(CONFIG.COMBAT.INVULNERABILITY_DURATION);

            // Play damaged sound
            this.audioManager.play('damaged');

            // Damage particles (10 red sparkles from player center)
            this.particleSystem.emitRadial(player.x + 16, player.y + 16, 10, COLORS.PARTICLE_DAMAGE, 150, 0.3);

            // Player knockback
            const directionX = player.x < enemy.x ? -1 : 1;
            player.velocityX = directionX * 200;
            player.velocityY = -200;

            // Camera shake
            this.camera.shake(6, 3);

            console.log(`Damage! ${enemy.shape} beats ${player.shape}. Health: ${this.state.health}`);

            // Check game over
            if (this.state.health <= 0) {
                this.state.gameOver = true;
                this.audioManager.play('gameOver');
                console.log('Game Over!');
            }

        } else {
            // Draw - both bounce back
            this.audioManager.play('clash');

            this.textEffects.push(new TextEffect(collisionX, collisionY, 'CLASH!', COLORS.TEXT_CLASH, 18, 0.3));

            // Collision sparks (5 white particles)
            this.particleSystem.emitRadial(collisionX, collisionY, 5, COLORS.PARTICLE_CLASH, 50, 0.5);

            // Both bounce back
            const directionX = player.x < enemy.x ? -1 : 1;
            player.velocityX = directionX * 100;
            player.velocityY = -200;
            enemy.velocityX = -directionX * 100;
            enemy.velocityY = -200;

            console.log(`Draw! Both are ${player.shape}`);
        }
    }

    handleCollection(collectible) {
        const result = collectible.onCollect();

        // Create text effect
        this.textEffects.push(new TextEffect(
            collectible.x + collectible.size / 2,
            collectible.y,
            result.text,
            result.color,
            result.type === 'orb' ? 18 : 16,
            result.type === 'orb' ? 0.7 : 0.5
        ));

        if (result.type === 'coin') {
            // Play coin pickup sound
            this.audioManager.play('pickupCoin');

            // Add points
            this.state.score += result.points;
            console.log(`Coin collected! +${result.points} points. Total: ${this.state.score}`);
        } else if (result.type === 'orb') {
            // Play orb pickup sound
            this.audioManager.play('pickupOrb');

            // Increment orbs collected
            this.state.orbsCollected++;
            console.log(`Orb collected! (${this.state.orbsCollected}/3)`);

            // If all 3 orbs collected, show goal activation message
            if (this.state.orbsCollected === 3) {
                this.textEffects.push(new TextEffect(
                    this.player.x + 16,
                    this.player.y - 20,
                    'GOAL ACTIVATED!',
                    COLORS.TEXT_GOAL,
                    20,
                    1.0
                ));
                console.log('All orbs collected! Goal activated!');
            }
        }
    }

    handleHazardDamage() {
        // Take damage
        this.state.health--;
        this.player.setInvulnerable(CONFIG.COMBAT.RESPAWN_INVULNERABILITY);

        // Play damaged sound
        this.audioManager.play('damaged');

        console.log(`Hazard damage! Health: ${this.state.health}`);

        // Respawn at spawn point
        this.player.x = this.spawnPoint.x;
        this.player.y = this.spawnPoint.y;
        this.player.velocityX = 0;
        this.player.velocityY = 0;

        // Check game over
        if (this.state.health <= 0) {
            this.state.gameOver = true;
            this.audioManager.play('gameOver');
            console.log('Game Over!');
        }
    }

    handleLevelComplete() {
        // Play level complete sound
        this.audioManager.play('levelComplete');

        // Calculate bonus points
        const timeBonus = 0; // Could add time tracking
        const healthBonus = this.state.health * 50;
        const noDeathBonus = this.state.health === CONFIG.INITIAL_HEALTH ? CONFIG.COMBAT.SCORE_NO_DEATH_BONUS : 0;
        const levelBonus = CONFIG.COMBAT.SCORE_LEVEL_COMPLETE;

        this.state.score += levelBonus + healthBonus + noDeathBonus;
        this.state.levelComplete = true;

        console.log('Level Complete!');
        console.log(`Final Score: ${this.state.score}`);
    }

    reset() {
        // Reset game state
        this.state.paused = false;
        this.state.gameOver = false;
        this.state.levelComplete = false;
        this.state.score = 0;
        this.state.health = CONFIG.INITIAL_HEALTH;
        this.state.orbsCollected = 0;

        // Reinitialize game objects
        this.initGame();

        console.log('Game reset');
    }
}
