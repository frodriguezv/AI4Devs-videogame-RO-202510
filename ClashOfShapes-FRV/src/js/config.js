// Game Configuration Constants

export const CONFIG = {
    // Canvas settings
    CANVAS_WIDTH: 800,
    CANVAS_HEIGHT: 600,

    // Level settings
    LEVEL_WIDTH: 2400,
    LEVEL_HEIGHT: 600,
    TILE_SIZE: 16,

    // Physics settings
    GRAVITY: 900,

    // Player settings
    PLAYER: {
        WALK_SPEED: 120,
        RUN_SPEED: 180,
        JUMP_IMPULSE: -630,                // Increased by 50% from -420 for higher jumps
        FRICTION: 0.8,
        SIZE: 32,
        START_X: 100,
        START_Y: 400,
        START_SHAPE: 'square',
        COLOR: '#4A90E2',
        // Enhanced jump mechanics
        MIN_JUMP_HEIGHT_MULTIPLIER: 0.4,  // Minimum jump is 40% of full jump
        JUMP_HOLD_DURATION: 0.2,           // How long holding affects jump (200ms)
        COYOTE_TIME: 0.1,                  // 100ms grace period after leaving ground
        JUMP_BUFFER_TIME: 0.1              // 100ms buffer window for early jump press
    },

    // Enemy settings
    ENEMY: {
        SIZE: 32,
        COLOR: '#E24A4A',
        PATROL_RANGE: 200,
        SPEEDS: {
            CIRCLE: 60,
            SQUARE: 50,
            TRIANGLE: 70
        }
    },

    // Combat settings
    COMBAT: {
        INVULNERABILITY_DURATION: 1.2,
        RESPAWN_INVULNERABILITY: 2.0,
        SCORE_ENEMY_DEFEAT: 100,
        SCORE_COIN: 10,
        SCORE_LEVEL_COMPLETE: 500,
        SCORE_NO_DEATH_BONUS: 200
    },

    // Camera settings
    CAMERA: {
        LERP_FACTOR: 0.1
    },

    // Game settings
    FIXED_DELTA_TIME: 1 / 60, // 60 FPS
    MAX_DELTA_TIME: 0.1,

    // Initial game state
    INITIAL_HEALTH: 5,
    ORBS_REQUIRED: 3
};

export const COLORS = {
    BACKGROUND: '#1a1a2e',

    // Player colors
    PLAYER_BLUE: '#4A90E2',

    // Enemy colors
    ENEMY_RED: '#E24A4A',

    // Collectible colors
    COIN_YELLOW: '#F4D03F',
    ORB_PURPLE: '#9B59B6',

    // Tile colors
    GROUND_BROWN: '#8B4513',
    PLATFORM_GRAY: '#95A5A6',

    // Hazard colors
    SPIKE_RED: '#C0392B',

    // Checkpoint colors
    CHECKPOINT_INACTIVE: '#555555',
    CHECKPOINT_ACTIVE: '#00FFFF',

    // UI colors
    HEALTH_RED: '#E74C3C',
    UI_WHITE: '#FFFFFF',

    // Particle colors
    PARTICLE_VICTORY: '#E24A4A',
    PARTICLE_DAMAGE: '#E74C3C',
    PARTICLE_CLASH: '#FFFFFF',
    PARTICLE_MORPH: '#4A90E2',

    // Text effect colors
    TEXT_POW: '#FFD700',
    TEXT_SCORE: '#00FF00',
    TEXT_CLASH: '#FFFFFF',
    TEXT_COIN: '#F4D03F',
    TEXT_ORB: '#9B59B6',
    TEXT_CHECKPOINT: '#00FFFF',
    TEXT_GOAL: '#00FF00'
};
