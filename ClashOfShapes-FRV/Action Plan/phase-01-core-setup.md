# Phase 1: Core Setup & Game Loop

## Objective
Establish the professional project structure with organized folders, HTML structure, CSS styling, game loop implementation, and input management.

## Prerequisites
- None (this is the first phase)

## Deliverables
- ✅ Professional folder structure created
- ✅ HTML file with dual canvas setup
- ✅ Separate CSS files for styling
- ✅ Modular JavaScript architecture
- ✅ RequestAnimationFrame game loop with fixed timestep
- ✅ InputManager module for keyboard handling
- ✅ Game configuration file
- ✅ Main entry point with game initialization

---

## Implementation Steps

### Step 1.1: Create Project Folder Structure
Create the following directory structure:

```
src/
├── index.html
├── css/
│   ├── main.css
│   └── ui.css
├── js/
│   ├── main.js
│   ├── config.js
│   ├── core/
│   │   ├── Game.js
│   │   └── InputManager.js
│   ├── entities/
│   ├── systems/
│   ├── objects/
│   ├── level/
│   ├── ui/
│   └── utils/
└── assets/
    └── .gitkeep
```

**Command to create folders** (run in project root):
```bash
mkdir -p src/css src/js/core src/js/entities src/js/systems src/js/objects src/js/level src/js/ui src/js/utils src/assets
touch src/assets/.gitkeep
```

---

### Step 1.2: Create index.html

**File**: `src/index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Shape Shifter - Rock Paper Scissors Platformer</title>

    <!-- CSS -->
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="css/ui.css">
</head>
<body>
    <div id="gameContainer">
        <canvas id="gameCanvas" width="800" height="600"></canvas>
        <canvas id="ui" width="800" height="600"></canvas>

        <!-- Game Over Screen -->
        <div id="gameOverScreen" class="overlay-screen">
            <div class="screen-content">
                <h1>Game Over</h1>
                <p>Final Score: <span id="finalScore">0</span></p>
                <button id="restartButton" class="game-button">Restart</button>
            </div>
        </div>

        <!-- Level Complete Screen -->
        <div id="levelCompleteScreen" class="overlay-screen">
            <div class="screen-content">
                <h1>Level Complete!</h1>
                <p>Final Score: <span id="completeScore">0</span></p>
                <button id="playAgainButton" class="game-button">Play Again</button>
            </div>
        </div>
    </div>

    <!-- JavaScript Modules (ES6 modules) -->
    <script type="module" src="js/main.js"></script>
</body>
</html>
```

---

### Step 1.3: Create main.css

**File**: `src/css/main.css`

```css
/* Main Game Styles */

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    font-family: 'Arial', sans-serif;
    color: #ffffff;
}

#gameContainer {
    position: relative;
    width: 800px;
    height: 600px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
}

#gameCanvas {
    position: absolute;
    top: 0;
    left: 0;
    background-color: #1a1a2e;
    border: 2px solid #16213e;
    display: block;
}

#ui {
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
    display: block;
}

/* Overlay Screens */
.overlay-screen {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    z-index: 100;
}

.overlay-screen.active {
    display: flex;
}

.screen-content {
    margin: auto;
    text-align: center;
    padding: 40px;
    background: rgba(26, 26, 46, 0.9);
    border-radius: 10px;
    border: 2px solid #4A90E2;
}

.screen-content h1 {
    font-size: 36px;
    margin-bottom: 20px;
    color: #ffffff;
}

.screen-content p {
    font-size: 24px;
    margin-bottom: 30px;
    color: #cccccc;
}

.game-button {
    background: #4A90E2;
    color: white;
    border: none;
    padding: 15px 40px;
    font-size: 20px;
    cursor: pointer;
    border-radius: 5px;
    transition: background 0.3s ease;
    font-weight: bold;
}

.game-button:hover {
    background: #3a7bc8;
}

.game-button:active {
    transform: scale(0.98);
}
```

---

### Step 1.4: Create ui.css

**File**: `src/css/ui.css`

```css
/* UI/HUD Styles */

/* This file is for future UI styling if needed */
/* Most UI rendering happens on canvas, but we can add CSS for HTML overlays here */

.overlay-screen {
    font-family: 'Arial', sans-serif;
}

/* Pause screen styles (if needed) */
.pause-overlay {
    background: rgba(0, 0, 0, 0.5);
}
```

---

### Step 1.5: Create config.js

**File**: `src/js/config.js`

```javascript
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
        JUMP_IMPULSE: -420,
        FRICTION: 0.8,
        SIZE: 32,
        START_X: 100,
        START_Y: 400,
        START_SHAPE: 'square',
        COLOR: '#4A90E2'
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
```

---

### Step 1.6: Create InputManager.js

**File**: `src/js/core/InputManager.js`

```javascript
// Input Management System

export class InputManager {
    constructor() {
        this.keys = {};
        this.initEventListeners();
    }

    initEventListeners() {
        window.addEventListener('keydown', (e) => {
            this.keys[e.key.toLowerCase()] = true;

            // Prevent default for game keys
            const gameKeys = [
                'arrowup', 'arrowdown', 'arrowleft', 'arrowright',
                ' ', 'w', 'a', 's', 'd', 'z', 'x', 'q', 'e', 'escape'
            ];

            if (gameKeys.includes(e.key.toLowerCase())) {
                e.preventDefault();
            }
        });

        window.addEventListener('keyup', (e) => {
            this.keys[e.key.toLowerCase()] = false;
        });
    }

    isKeyPressed(key) {
        return this.keys[key.toLowerCase()] || false;
    }

    resetKey(key) {
        this.keys[key.toLowerCase()] = false;
    }
}
```

---

### Step 1.7: Create Game.js

**File**: `src/js/core/Game.js`

```javascript
// Main Game Class

import { CONFIG } from '../config.js';
import { InputManager } from './InputManager.js';

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

        console.log('Game initialized');
    }

    start() {
        console.log('Game starting...');
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
        // Handle pause toggle
        if (this.input.isKeyPressed('escape')) {
            this.state.paused = !this.state.paused;
            this.input.resetKey('escape');
        }

        // Don't update if paused or game over
        if (this.state.paused || this.state.gameOver || this.state.levelComplete) {
            return;
        }

        // Game updates will be added in later phases
    }

    render() {
        // Clear canvases
        this.ctx.fillStyle = CONFIG.COLORS?.BACKGROUND || '#1a1a2e';
        this.ctx.fillRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);
        this.uiCtx.clearRect(0, 0, this.uiCanvas.width, this.uiCanvas.height);

        // Rendering will be added in later phases

        // Render pause screen if paused
        if (this.state.paused) {
            this.renderPauseScreen();
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
        this.uiCtx.fillText('PAUSED', this.uiCanvas.width / 2, this.uiCanvas.height / 2 - 20);

        this.uiCtx.font = '20px Arial';
        this.uiCtx.fillText('Press ESC to resume', this.uiCanvas.width / 2, this.uiCanvas.height / 2 + 20);

        this.uiCtx.restore();
    }

    reset() {
        // Reset game state
        this.state.paused = false;
        this.state.gameOver = false;
        this.state.levelComplete = false;
        this.state.score = 0;
        this.state.health = CONFIG.INITIAL_HEALTH;
        this.state.orbsCollected = 0;

        // Reset will be fully implemented in later phases
        console.log('Game reset');
    }
}
```

---

### Step 1.8: Create main.js (Entry Point)

**File**: `src/js/main.js`

```javascript
// Main Entry Point

import { Game } from './core/Game.js';

// Wait for DOM to be fully loaded
window.addEventListener('load', () => {
    console.log('DOM loaded, initializing game...');

    // Get canvas elements
    const gameCanvas = document.getElementById('gameCanvas');
    const uiCanvas = document.getElementById('ui');

    if (!gameCanvas || !uiCanvas) {
        console.error('Canvas elements not found!');
        return;
    }

    // Create game instance
    const game = new Game(gameCanvas, uiCanvas);

    // Setup restart button handlers
    const restartButton = document.getElementById('restartButton');
    const playAgainButton = document.getElementById('playAgainButton');
    const gameOverScreen = document.getElementById('gameOverScreen');
    const levelCompleteScreen = document.getElementById('levelCompleteScreen');

    restartButton.addEventListener('click', () => {
        gameOverScreen.classList.remove('active');
        game.reset();
    });

    playAgainButton.addEventListener('click', () => {
        levelCompleteScreen.classList.remove('active');
        game.reset();
    });

    // Store game instance globally for debugging (optional)
    window.game = game;

    // Start the game
    game.start();

    console.log('Game started successfully!');
});
```

---

## Testing Checklist

### Folder Structure Tests
- [ ] `src/` directory created
- [ ] All subdirectories exist (css, js/core, js/entities, etc.)
- [ ] All files created in correct locations

### Visual Tests
- [ ] Canvas displays with correct size (800×600)
- [ ] Background color is dark blue (#1a1a2e)
- [ ] Border is visible on game canvas
- [ ] Page centered and styled correctly
- [ ] Gradient background on body

### Functional Tests
- [ ] Game loop runs without errors
- [ ] Browser console shows initialization messages
- [ ] No console errors
- [ ] Pressing ESC toggles pause screen
- [ ] Pause screen displays correctly with overlay
- [ ] Game keys don't scroll the page

### Module Loading Tests
- [ ] ES6 modules load correctly
- [ ] No CORS errors (serve from local server if needed)
- [ ] Config constants accessible
- [ ] InputManager detects key presses (test with console.log)

### Performance Tests
- [ ] Game loop runs smoothly
- [ ] No visible lag or stuttering
- [ ] Browser doesn't freeze

---

## Code Quality Checklist
- [ ] All files in correct directories
- [ ] ES6 module syntax used correctly (import/export)
- [ ] Code is properly formatted and indented
- [ ] Clear separation of concerns (config, core, etc.)
- [ ] Comments explain purpose of each file

---

## Success Criteria
- ✅ Professional folder structure created
- ✅ index.html with dual canvas and overlay screens
- ✅ Separate CSS files (main.css, ui.css)
- ✅ config.js with all game constants
- ✅ InputManager.js module functional
- ✅ Game.js with game loop and fixed timestep
- ✅ main.js entry point working
- ✅ ES6 modules loading correctly
- ✅ Game loop running at 60 FPS
- ✅ Pause functionality working
- ✅ No console errors

---

## Common Issues & Solutions

### Issue: ES6 modules not loading (CORS error)
**Solution**: Serve the game from a local server. Use one of these:
- Python: `python -m http.server 8000` (then open http://localhost:8000/src/)
- Node.js: `npx http-server src -p 8000`
- VS Code: Use "Live Server" extension

### Issue: Canvas not displaying
**Solution**: Check that canvas elements have width/height attributes in HTML, not just CSS

### Issue: Keys scrolling the page
**Solution**: Verify preventDefault is called for game keys in InputManager

### Issue: Game loop not running
**Solution**: Check browser console for errors. Verify main.js loads as module (type="module")

### Issue: Import statements fail
**Solution**: Ensure all imports have .js extension and correct relative paths

---

## Next Phase
Once Phase 1 is complete and tested, proceed to:
**[Phase 2: Player Entity & Basic Movement](./phase-02-player-movement.md)**
