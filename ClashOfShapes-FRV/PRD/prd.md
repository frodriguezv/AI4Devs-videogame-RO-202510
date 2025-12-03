# HTML5 Canvas Platformer PRD – Shape Shifter

## 1. Game Overview
### High Concept
A modern 2D platformer built with plain HTML5 Canvas and JavaScript featuring a unique **Rock-Paper-Scissors shape-morphing mechanic**. The player morphs between Circle, Square, and Triangle shapes to defeat enemies using strategic shape advantages.

### Core Fantasy
Players control a shape-shifting hero who must strategically morph between three forms (Circle, Square, Triangle) to defeat enemies using Rock-Paper-Scissors logic, traverse challenging platforming sections, and reach the goal.

### Genre
2D Platformer / Puzzle / Action

### Target Audience
Casual and mid-core players ages 8–40 who enjoy strategic platformers with puzzle elements.

### Inspirations
- Rock-Paper-Scissors mechanics
- Ikaruga (polarity switching)
- Celeste (tight platforming)
- Geometry Dash (shape-based gameplay)

---

## 2. Tech Stack

### Core Technologies
- **HTML5 Canvas**: 2D rendering context for all game graphics
- **Vanilla JavaScript**: ES6+ for all game logic, no frameworks
- **Web APIs**:
  - Canvas 2D Context for rendering
  - RequestAnimationFrame for game loop
  - Keyboard API for input handling
  - Web Audio API for sound (optional)

### Development Environment
- Modern web browsers with HTML5 Canvas support
- ES6+ JavaScript features (modules, classes, arrow functions)
- No build tools required (can optionally use bundler for modules)

### Architecture Pattern
- **Entity-Component System** approach
- Game loop using requestAnimationFrame
- Custom physics engine (no external libraries)
- State management for game scenes

### Graphics Approach
- Canvas 2D rendering context
- Procedurally drawn shapes using Canvas drawing methods:
  - `fillRect()` for squares/platforms
  - `arc()` for circles
  - `beginPath()` + `lineTo()` for triangles
- No external sprite assets required
- Simple colored geometric shapes

### Deployment
- Web-based deployment (playable in browser)
- No installation required
- Single HTML file with inline CSS and JavaScript
- Canvas size: 800×600 pixels
- Background color: #1a1a2e (dark blue)
- Border: 2px solid #16213e
- Mobile-responsive design considerations (viewport meta tag included)

---

## 3. Game Mechanics

### Core Mechanic: Shape Morphing (Rock-Paper-Scissors)
The player starts as a **Square (Paper)** and can morph between three shapes:

- **Circle (Rock)** 🔴
  - Beats: Triangle (Scissors)
  - Loses to: Square (Paper)
  - Visual: Blue Circle (32×32)

- **Square (Paper)** 🟦
  - Beats: Circle (Rock)
  - Loses to: Triangle (Scissors)
  - Visual: Blue Square (32×32)
  - **Starting shape**

- **Triangle (Scissors)** 🔺
  - Beats: Square (Paper)
  - Loses to: Circle (Rock)
  - Visual: Blue Triangle (32×32)

**Shape Switching**:
- Press **Q** to cycle forward: Square → Circle → Triangle → Square
- Press **E** to cycle backward: Square → Triangle → Circle → Square
- Instant transformation (no cooldown)
- Key press is consumed immediately to prevent continuous switching
- Shape affects collision with enemies only
- Visual feedback: 5 blue sparkle particles emit radially when changing shape

### Player Movement
- **Walk**: 120 px/s
- **Run**: 180 px/s (hold X button while moving)
- **Jump**: Jump impulse of -420 (can only jump when on ground)
- **Friction**: 0.8 multiplier (20% friction) when not pressing movement keys
- **Shape morphing works in air**
- **Player spawn**: Starts at position (100, 400) as Square

### Physics
- **Gravity**: 900 px/s²
- **Jump impulse**: -420 (applied when jump key pressed and on ground)
- **Friction**: 0.8 velocity multiplier (applied when no movement input)
- **Fixed timestep**: 60 FPS physics updates using accumulator pattern
- **Collision resolution**: Uses smallest overlap method for AABB collision

### Combat System (Rock-Paper-Scissors)

**Winning Match** (Player shape beats enemy shape):
- Enemy defeated instantly (marked as not alive)
- +100 points
- No damage taken
- **Visual Feedback**:
  - "POW!" text appears at enemy position (24px, yellow #FFD700, 0.5s duration)
  - "+100" score text appears at enemy position with -20px Y offset (18px, green #00FF00, 0.6s duration)
  - 10 red particles (#E24A4A) explode outward from enemy center in circular pattern (0.5s lifetime)
  - Player bounce-back: velocityX = 100 (direction away from enemy), velocityY = -200
  - Camera shake: intensity 4, duration 2 frames

**Losing Match** (Enemy shape beats player shape):
- Player takes 1 heart damage
- Player knocked back: velocityX = -200 (direction away from enemy), velocityY = -200
- Enemy survives
- **Visual Feedback**:
  - 10 red sparkle particles (#E74C3C) emit radially from player center (0.3s lifetime, 150 speed)
  - Camera shake: intensity 6, duration 3 frames
  - Player flashes (50% alpha when invulnerable, toggles every frame)
  - 1.2 seconds invulnerability (player flashing)

**Same Shape** (Draw):
- No damage to either
- Player bounces back: velocityX = 100 (direction away from enemy), velocityY = -200
- Enemy bounces back: velocityX = -100 (direction away from player), velocityY = -200
- Enemy survives
- Can retry with different shape
- **Visual Feedback**:
  - "CLASH!" text appears at collision midpoint (18px, white #FFFFFF, 0.3s duration)
  - 5 white particles (#FFFFFF) emit at collision point (0.5s lifetime, 50 speed)

**Invulnerability**: 
- 1.2 seconds after taking damage (player flashes with 50% alpha)
- 2 seconds after respawning at checkpoint (player flashes with 50% alpha)
- During invulnerability, player cannot take damage

### Collectibles
- **Coins**: +10 points
  - Yellow circles (16×16, color #F4D03F)
  - Bobbing animation (sin wave, 2 rad/s, ±20px amplitude)
  - "+10" text effect appears when collected (16px, yellow, 0.5s duration)
- **Orbs**: Level progression item (need 3 to unlock goal)
  - Purple circles (16×16, color #9B59B6)
  - Bobbing animation (sin wave, 2 rad/s, ±20px amplitude)
  - "ORB!" text effect appears when collected (18px, purple, 0.7s duration)
  - When 3rd orb collected: "GOAL ACTIVATED!" text appears at goal position (24px, green, 1s duration)

### Scoring System
- Enemy defeated: +100 points
- Coin collected: +10 points
- Level complete: +500 points
- No death bonus: +200 points

### Health & Game Over
- **5 Hearts** (Health Bar displayed in UI)
- Lose 1 heart when hit by wrong shape enemy
- Lose 1 heart from hazards (spikes, pits)
- Game Over when all hearts lost (health reaches 0)
- Respawn at last checkpoint with full health (5 hearts)
- After respawn: 2 seconds invulnerability
- Game Over screen shows final score with "Restart" button
  - Restart button resets all game state, reinitializes level, resets camera
  - Hides game over screen and resumes gameplay
- Level Complete screen shows final score with "Play Again" button
  - Play Again button resets all game state, reinitializes level, resets camera
  - Hides level complete screen and resumes gameplay
- Both screens use dark overlay (rgba(0,0,0,0.7)) and are hidden by default

---

## 3a. Visual Effects & Polish

### Particle Effects

**Victory Particles** (Winning match):
- 10 small particles
- Color: Red (#E24A4A) matching enemy
- Explode outward from enemy center in circular pattern (evenly distributed angles)
- Speed: 100 px/s
- Lifetime: 0.5 seconds
- Gravity: 300 px/s² applied to particles
- Size: Random 2-6 pixels

**Damage Particles** (Losing match):
- 10 red sparkle particles (#E74C3C)
- Emit from player center
- Radial burst pattern (random angles)
- Speed: 150 px/s (with random variation 0.5-1.0 multiplier)
- Lifetime: 0.3 seconds
- Gravity: 300 px/s² applied to particles
- Size: Random 2-6 pixels

**Collision Spark** (Draw):
- 5 white particles (#FFFFFF)
- At collision midpoint between player and enemy
- Speed: 50 px/s
- Lifetime: 0.5 seconds
- Gravity: 300 px/s² applied to particles
- Size: Random 2-6 pixels

### Text Effects

**"POW!" Text** (Winning match):
- Appears at enemy position (centered)
- Large bold text (24px)
- Yellow color (#FFD700)
- Fades out over 0.5 seconds
- Floats upward at -50 px/s
- Alpha fades from 1.0 to 0.0

**"CLASH!" Text** (Draw):
- Appears at collision midpoint between player and enemy
- Medium text (18px)
- White color (#FFFFFF)
- Floats upward at -50 px/s
- Fades out over 0.3 seconds

**Score Popup** (Enemy defeat):
- "+100" text
- Appears at enemy position with -20px Y offset
- Green color (#00FF00)
- 18px font size
- Floats upward at -50 px/s
- Fades out over 0.6 seconds

**Additional Text Effects**:
- Coin collection: "+10" text (16px, yellow #F4D03F, 0.5s)
- Orb collection: "ORB!" text (18px, purple #9B59B6, 0.7s)
- Checkpoint activation: "CHECKPOINT!" text (18px, cyan #00FFFF, 0.7s)
- Goal activation: "GOAL ACTIVATED!" text (24px, green #00FF00, 1s)

### Camera Effects

**Damage Shake** (Losing match):
- Duration: 3 frames (at 60fps)
- Intensity: 6 pixels offset
- Pattern: Random horizontal and vertical offset each frame
- Returns to smooth follow after duration expires

**Victory Shake** (Winning match):
- Duration: 2 frames (at 60fps)
- Intensity: 4 pixels offset
- Pattern: Random horizontal and vertical offset each frame

**Victory Freeze**: Not implemented

### Shape Morph Effect

**When changing shapes (Q/E pressed)**:
- 5 blue sparkle particles (#4A90E2) emit radially from player center
- Speed: 100 px/s (with random variation 0.5-1.0 multiplier)
- Lifetime: 0.3 seconds
- Gravity: 300 px/s² applied to particles
- Size: Random 2-6 pixels

---

## 3. Camera & UI

### Camera
- Smooth follow with 10% lerp (0.1)
- Follows player in both X and Y axes
- Centers player in viewport (targetX = player.x - width/2, targetY = player.y - height/2)
- Clamped to level bounds (0 to levelWidth - cameraWidth, 0 to levelHeight - cameraHeight)
- Shake effect: Random offset applied during shake duration
- Camera transform applied via ctx.translate(-camera.x + shakeX, -camera.y + shakeY)

### UI/HUD
- **Separate UI Canvas**: Overlay canvas (800×600) for UI elements
- **Health Bar**: 5 Hearts (top-left, starting at x=20, y=20)
  - Filled hearts: Red (#E74C3C) for active health
  - Empty hearts: Red outline for lost health
  - Heart shape drawn using bezier curves
- **Score**: "Score: X" (bold 20px, white, top-left at y=60)
- **Orbs Collected**: "Orbs: X/3" (bold 20px, white, top-left at y=90)
- **Current Shape Indicator**: 
  - "Shape:" label (bold 20px, white, top-left at y=120)
  - Shape icon (20×20, blue #4A90E2) at x=90, y=100
  - Shape name text (16px, white) showing "Circle (Rock)", "Square (Paper)", or "Triangle (Scissors)" at x=120, y=115

### Screens
- **Pause Screen**: 
  - Dark overlay (rgba(0,0,0,0.5))
  - "PAUSED" text (bold 40px, white, centered)
  - "Press ESC to resume" (20px, white, centered below)
- **Game Over Screen**: 
  - Dark overlay (rgba(0,0,0,0.7))
  - "Game Over" heading (24px, white)
  - "Final Score: X" text
  - "Restart" button (blue #4A90E2, hover #3a7bc8)
- **Level Complete Screen**: 
  - Dark overlay (rgba(0,0,0,0.7))
  - "Level Complete!" heading (24px, white)
  - "Final Score: X" text
  - "Play Again" button (blue #4A90E2, hover #3a7bc8)

---

## 4. Enemies

All enemies have one of three shapes and follow Rock-Paper-Scissors rules.

### Enemy Types by Shape

**Circle Enemies (Rock)** 🔴
- **Visual**: Red Circle (32×32)
- **Behavior**: Walks left-right at 60 px/s
- **Beats**: Triangle players
- **Loses to**: Square players
- **Patrol range**: 200 px

**Square Enemies (Paper)** 🟥
- **Visual**: Red Square (32×32)
- **Behavior**: Walks left-right at 50 px/s
- **Beats**: Circle players
- **Loses to**: Triangle players
- **Patrol range**: 200 px

**Triangle Enemies (Scissors)** 🔺
- **Visual**: Red Triangle (32×32)
- **Behavior**: Walks left-right at 70 px/s
- **Beats**: Square players
- **Loses to**: Circle players
- **Patrol range**: 200 px

**Enemy Distribution**: Level contains mix of all three shapes to encourage constant shape-shifting

---

## 5. Environment Rules

### Platforms & Terrain
- **Ground tiles**: Brown rectangles (16×16)
- **Platforms**: Gray rectangles (16×16)
- **Collision**: Standard solid tiles

### Hazards
- **Pits**: 
  - Falling below level height (y > levelHeight) = lose 1 heart, respawn at checkpoint
  - Respawn restores full health (5 hearts) and sets 2s invulnerability
- **Spikes**: 
  - Red triangular shapes (16×16, color #C0392B)
  - 1 heart damage on touch
  - Knockback: velocityX = 200 (away from spike), velocityY = -300
  - Triggers damage particles and camera shake

### Collectibles Placement
- **Coins**: Yellow circles (16×16, color #F4D03F) scattered throughout level
- **Orbs**: Purple circles (16×16, color #9B59B6) - need 3 total to unlock goal
- Placed in challenging locations to encourage exploration
- All collectibles have bobbing animation (sin wave movement)

### Checkpoints
- **Visual**: 32×32 rectangle
  - Inactive: Gray (#555555)
  - Active: Cyan (#00FFFF)
  - "CP" text (bold 12px, white, centered)
- **Behavior**: 
  - Activates on player collision (one-time)
  - Sets player respawn position
  - Shows "CHECKPOINT!" text effect when activated
- **Location**: Screen 2 start (x=800, y=518)

### Goal
- **Visual**: 64×64 rectangle
  - Inactive: Gray semi-transparent (rgba(100,100,100,0.5))
  - Active: Green pulsing (rgba(0,255,0, pulse)) where pulse = sin(time*2) * 0.2 + 0.8
  - "GOAL" text (bold 16px, white, centered) when active
- **Behavior**: 
  - Requires 3 orbs collected to activate
  - Shows "GOAL ACTIVATED!" text when 3rd orb collected
  - Level complete when player touches active goal
  - Awards +500 points for completion
  - Awards +200 bonus points if player has full health (no death bonus)
- **Location**: Screen 3 end (x=2300, y=250)

---

## 6. Level Design

### Single Level: "Shape Shifter Challenge"

**Theme**: Abstract geometric world

**Level Length**:
- Horizontally scrollable
- **3 screens wide** (2400 pixels total width at 800px viewport)
- Player scrolls right through 2 full screens before reaching goal area

**Level Structure**:
- **Screen 1** (0-800px): Tutorial section
  - Introduces basic movement
  - First enemies (1 of each shape)
  - Easy platforming
  - 1 Orb placement

- **Screen 2** (800-1600px): Challenge section
  - More enemies (mixed shapes)
  - Platforming challenges
  - 1 Checkpoint at screen start
  - 1 Orb placement

- **Screen 3** (1600-2400px): Final section
  - Highest difficulty
  - Enemy gauntlet (all three shapes)
  - 1 Orb placement
  - Goal at end (requires 3 orbs to activate)

**Difficulty Curve**: Easy → Medium → Hard

---

# 7. Detailed Level Layout

## "Shape Shifter Challenge" - Complete Layout

### Screen 1: Tutorial (0-800px)
```
[Start - Player spawns as Square]

  Flat ground ────────  Platform  ────────
                      Small gap

  Circle Enemy →  ←  Square Enemy  →  ← Triangle Enemy
     (60px/s)         (50px/s)          (70px/s)

  Coins: ○ ○ ○ ○ ○

  ORB #1 [Purple] - On elevated platform

────────────────────────────────────────────
```

### Screen 2: Challenge (800-1600px)
```
[CHECKPOINT]

  Platform jumping section:
    ┌──┐      ┌──┐      ┌──┐
    │  │      │  │      │  │
  ──┘  └──  ──┘  └──  ──┘  └──

  Mixed enemies:
  Circle → ← Square → ← Triangle → ← Circle

  Spike hazard: ▲ ▲ ▲ (must jump over)

  ORB #2 [Purple] - After spike section

────────────────────────────────────────────
```

### Screen 3: Final Gauntlet (1600-2400px)
```
  Enemy gauntlet section:

  Upper platform: Triangle → ← Square →
  Lower ground:   Circle → ← Triangle →

  (Player must shape-shift rapidly)

  Pit section: ═══════ [must jump]

  Final platform sequence:
    ┌─┐  ┌─┐  ┌─┐
  ──┘ └──┘ └──┘ └──

  ORB #3 [Purple] - On final platform

  [GOAL] - Unlocks when 3 orbs collected
```

### Enemy Count
- **Screen 1**: 1 Circle, 1 Square, 1 Triangle (3 total)
- **Screen 2**: 2 Circle, 1 Square, 1 Triangle (4 total)
- **Screen 3**: 1 Circle, 1 Square, 2 Triangle (4 total)
- **Total**: 4 Circle enemies, 3 Square enemies, 3 Triangle enemies = **10 enemies**

### Collectibles
- **3 Orbs** (required for goal)
  - Orb 1: Screen 1, elevated platform (x=650, y=300)
  - Orb 2: Screen 2, after spike section (x=1500, y=450)
  - Orb 3: Screen 3, final platform (x=2320, y=300)
- **18 Coins** (scattered throughout)
  - Screen 1: 5 coins
  - Screen 2: 5 coins
  - Screen 3: 8 coins
- **1 Checkpoint** (at screen 2 start, x=800, y=518)

---

# 8. Audio

### Music
- Background music: Optional electronic/chiptune loop using Web Audio API
- Or silent for now

### SFX List (Optional - Web Audio API)
- Jump
- Shape morph
- Enemy defeat
- Coin collect
- Damage taken
- Level complete

---

# 9. Engineering Requirements (HTML5 + JavaScript)

### File Structure
**Current Implementation**: Single HTML file containing all game logic
```
  index.html              # Complete game implementation in single file
    - HTML structure with 2 canvas elements (gameCanvas, ui)
    - Inline CSS styling
    - Inline JavaScript with all game classes and logic
    - Game loop, physics, rendering, UI all in one file
```

**Note**: The game is implemented as a single HTML file for simplicity. All classes, systems, and logic are contained within the `<script>` tag in index.html.

### Core Architecture

#### Game Loop
```javascript
// RequestAnimationFrame-based game loop with fixed timestep
let lastFrameTime = 0;
let accumulator = 0;
const fixedDeltaTime = 1 / 60; // 60 FPS physics

function gameLoop(timestamp) {
  const deltaTime = lastFrameTime ? (timestamp - lastFrameTime) / 1000 : 0;
  lastFrameTime = timestamp;

  // Accumulate time for fixed timestep
  accumulator += deltaTime;

  // Update physics with fixed timestep
  while (accumulator >= fixedDeltaTime) {
    update(fixedDeltaTime);
    accumulator -= fixedDeltaTime;
  }

  // Render
  render();

  requestAnimationFrame(gameLoop);
}
```

#### Canvas Setup (index.html)
```html
<div id="gameContainer">
  <canvas id="gameCanvas" width="800" height="600"></canvas>
  <canvas id="ui" width="800" height="600"></canvas>
  <!-- Game Over and Level Complete screens -->
</div>
<script>
  // All game code inline in single script tag
</script>
```

#### Entity Base Class
```javascript
class Entity {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.velocityX = 0;
    this.velocityY = 0;
  }

  update(deltaTime) { /* Override */ }
  render(ctx, camera) { /* Override */ }
}
```

#### Physics Engine
- Custom AABB (Axis-Aligned Bounding Box) collision detection
- Gravity application: 900 px/s² applied to velocityY each frame
- Velocity integration: position += velocity * deltaTime
- Collision resolution: Uses smallest overlap method
  - Calculates overlap on all 4 sides (left, right, top, bottom)
  - Resolves collision based on smallest overlap
  - Sets appropriate velocity to 0 and adjusts position
  - Sets onGround = true when collision resolved from top
- All entities (player, enemies) use same physics system
- Entities have updateBase() method that resets onGround each frame

#### Shape Drawing (Canvas 2D API)
```javascript
// Circle (32×32)
ctx.beginPath();
ctx.arc(x + width/2, y + height/2, width/2, 0, Math.PI * 2);
ctx.fill();

// Square (32×32)
ctx.fillRect(x, y, width, height);

// Triangle (32×32, pointing up)
ctx.beginPath();
ctx.moveTo(x + width/2, y);
ctx.lineTo(x + width, y + height);
ctx.lineTo(x, y + height);
ctx.closePath();
ctx.fill();
```

#### Input Handling
```javascript
class InputManager {
  constructor() {
    this.keys = {};
    window.addEventListener('keydown', (e) => {
      this.keys[e.key.toLowerCase()] = true;
      // Prevent default for game keys
      if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', ' ', 'z', 'x', 'q', 'e'].includes(e.key.toLowerCase())) {
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
}
```

#### Camera System
```javascript
class Camera {
  constructor(width, height) {
    this.x = 0;
    this.y = 0;
    this.width = width;
    this.height = height;
    this.shakeIntensity = 0;
    this.shakeDuration = 0;
    this.shakeX = 0;
    this.shakeY = 0;
  }

  follow(target, lerp = 0.1) {
    const targetX = target.x - this.width / 2;
    const targetY = target.y - this.height / 2;
    this.x += (targetX - this.x) * lerp;
    this.y += (targetY - this.y) * lerp;
    // Clamp to level bounds
    this.x = Math.max(0, Math.min(levelWidth - this.width, this.x));
    this.y = Math.max(0, Math.min(levelHeight - this.height, this.y));
    // Apply shake
    if (this.shakeDuration > 0) {
      this.shakeX = (Math.random() - 0.5) * this.shakeIntensity;
      this.shakeY = (Math.random() - 0.5) * this.shakeIntensity;
      this.shakeDuration--;
    } else {
      this.shakeX = 0;
      this.shakeY = 0;
    }
  }

  shake(intensity, duration) {
    this.shakeIntensity = intensity;
    this.shakeDuration = duration;
  }

  apply(ctx) {
    ctx.translate(-this.x + this.shakeX, -this.y + this.shakeY);
  }
}
```

### Level Data Format
**Current Implementation**: Level data created procedurally in Level.init() method, not from JSON.

Level structure:
- Tiles: Array of GroundTile objects (16×16 brown rectangles)
- Entities: Array of Enemy objects with shape and position
- Collectibles: Array of Coin and Orb objects
- Hazards: Array of Spike objects
- Checkpoints: Array of Checkpoint objects
- Goal: Single Goal object

Level dimensions:
- Width: 2400 pixels
- Height: 600 pixels
- Tile size: 16×16 pixels

### State Management
```javascript
const gameState = {
  currentScene: 'menu', // 'menu', 'game', 'gameOver'
  score: 0,
  health: 5,
  orbsCollected: 0,
  levelWidth: 2400,
  levelHeight: 600,
  tileSize: 16,
  gravity: 900,
  paused: false,
  gameOver: false,
  levelComplete: false
};
```

### Additional Systems

#### Particle System
- Particle class with position, velocity, color, lifetime
- Particles have gravity (300 px/s²) and fade out based on lifetime
- ParticleSystem manages array of particles
- Methods: emit() for circular pattern, emitRadial() for random radial pattern
- Particles filtered out when lifetime expires

#### Text Effect System
- TextEffect class with position, text, color, size, duration
- Floats upward at -50 px/s
- Fades out based on duration (alpha = duration / maxDuration)
- Array of text effects updated and rendered each frame
- Effects removed when duration expires

#### Level System
- Level class with init() method that creates all level content
- Returns object with: player, tiles, entities, collectibles, hazards, checkpoints, goal
- Level data created procedurally (not from JSON)
- Player spawns at (100, 400)

#### Rendering Order
1. Clear canvas with background color (#1a1a2e)
2. Save canvas context state
3. Apply camera transform
4. Render tiles (ground/platforms)
5. Render checkpoints
6. Render goal
7. Render hazards (spikes)
8. Render collectibles (coins/orbs)
9. Render entities (enemies)
10. Render player
11. Render particles
12. Render text effects
13. Restore canvas context state
14. Render UI (on separate UI canvas, no camera transform)

**Note**: Game starts immediately when page loads (no menu screen currently implemented)

---

# 10. Success Metrics
- 60 FPS stable (requestAnimationFrame)
- Shape morphing is responsive and intuitive
- Rock-Paper-Scissors mechanic is clear and telegraphed
- Level difficulty ramps across 3 screens
- Fun factor validated via playtesting
- Player understands mechanic within first screen
- Smooth camera follow with no jitter
- Collision detection is accurate and consistent

---

# 11. Appendix

### Graphics Specifications
**Player Shapes** (32×32, Blue):
- Circle: Blue circle (Rock) - `ctx.arc()` with fill color `#4A90E2`
- Square: Blue square (Paper) - `ctx.fillRect()` with fill color `#4A90E2`
- Triangle: Blue triangle (Scissors) - `ctx.beginPath()` with fill color `#4A90E2`

**Enemy Shapes** (32×32, Red):
- Circle: Red circle (Rock) - fill color `#E24A4A`
- Square: Red square (Paper) - fill color `#E24A4A`
- Triangle: Red triangle (Scissors) - fill color `#E24A4A`

**Items** (16×16):
- Coin: Yellow circle - fill color `#F4D03F`
- Orb: Purple circle - fill color `#9B59B6`
- Heart: Red heart shape - fill color `#E74C3C`

**Tiles** (16×16):
- Ground: Brown rectangle - fill color `#8B4513`
- Platform: Gray rectangle - fill color `#95A5A6`
- Spike: Red triangle - fill color `#C0392B`

All graphics drawn using Canvas 2D Context API

### Input Controls
- **Arrow Left/Right** or **A/D**: Move left/right
- **Arrow Up** or **W** or **Z** or **Space**: Jump (only when on ground)
- **X**: Run (hold while moving to increase speed from 120 to 180 px/s)
- **Q**: Cycle shapes forward (Square → Circle → Triangle → Square)
- **E**: Cycle shapes backward (Square → Triangle → Circle → Square)
- **ESC**: Toggle pause (pauses/unpauses game, shows pause overlay)

**Input Notes**:
- Keys are case-insensitive (converted to lowercase)
- Game keys prevent default browser behavior
- Shape switching keys (Q/E) are consumed immediately to prevent continuous switching
- Jump only works when player.onGround is true

### Browser Compatibility
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers with Canvas support

### Performance Optimization
- Fixed timestep physics (60 FPS) with accumulator pattern
- Particles filtered out when lifetime expires (automatic cleanup)
- Text effects removed when duration expires (automatic cleanup)
- Separate UI canvas for HUD (doesn't require camera transform)
- Canvas state saved/restored around camera transform
- Use `requestAnimationFrame` for smooth rendering
- Entities marked as `alive = false` when defeated (skipped in update/render)

**Note**: Camera culling and object pooling not currently implemented but could be added for optimization.

---

_End of PRD_
