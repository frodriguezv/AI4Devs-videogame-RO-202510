# Phase 12: Hazards & Game Over Logic

## Objective
Implement spikes, pit detection, checkpoints, goal system, respawn logic, game over screen, and level complete screen.

## Prerequisites
- Phase 11 completed (Visual Effects & Polish)

## Deliverables
- ✅ Spike hazard (16×16 red triangles, -1 heart, knockback)
- ✅ Pit detection (fall below level = respawn)
- ✅ Checkpoint system (gray → cyan when activated)
- ✅ Goal system (requires 3 orbs, green pulsing)
- ✅ Respawn logic with invulnerability
- ✅ Game Over screen with restart button
- ✅ Level Complete screen with play again button
- ✅ Victory condition and bonus points

---

## Implementation Steps

### Step 12.1: Create Spike Class
```javascript
class Spike {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 16;
    this.height = 16;
    this.color = '#C0392B'; // Red
  }

  render(ctx, camera) {
    ctx.save();
    ctx.fillStyle = this.color;
    // Draw triangle pointing up
    ctx.beginPath();
    ctx.moveTo(this.x + this.width / 2, this.y); // Top
    ctx.lineTo(this.x + this.width, this.y + this.height); // Bottom right
    ctx.lineTo(this.x, this.y + this.height); // Bottom left
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  getBounds() {
    return {
      left: this.x,
      right: this.x + this.width,
      top: this.y,
      bottom: this.y + this.height
    };
  }
}
```

### Step 12.2: Create Checkpoint Class
```javascript
class Checkpoint {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 32;
    this.height = 32;
    this.active = false;
    this.inactiveColor = '#555555'; // Gray
    this.activeColor = '#00FFFF'; // Cyan
  }

  activate() {
    if (!this.active) {
      this.active = true;
      // Text effect
      textEffects.push(new TextEffect(
        this.x + this.width / 2,
        this.y,
        'CHECKPOINT!',
        '#00FFFF',
        18,
        0.7
      ));
    }
  }

  render(ctx, camera) {
    ctx.save();
    ctx.fillStyle = this.active ? this.activeColor : this.inactiveColor;
    ctx.fillRect(this.x, this.y, this.width, this.height);

    // Draw "CP" text
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('CP', this.x + this.width / 2, this.y + this.height / 2);
    ctx.restore();
  }

  getBounds() {
    return {
      left: this.x,
      right: this.x + this.width,
      top: this.y,
      bottom: this.y + this.height
    };
  }
}
```

### Step 12.3: Create Goal Class
```javascript
class Goal {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 64;
    this.height = 64;
    this.time = 0;
  }

  update(deltaTime) {
    this.time += deltaTime;
  }

  isActive() {
    return gameState.orbsCollected >= 3;
  }

  render(ctx, camera) {
    ctx.save();

    if (this.isActive()) {
      // Green pulsing
      const pulse = Math.sin(this.time * 2) * 0.2 + 0.8;
      ctx.fillStyle = `rgba(0, 255, 0, ${pulse})`;
      ctx.fillRect(this.x, this.y, this.width, this.height);

      // "GOAL" text
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 16px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('GOAL', this.x + this.width / 2, this.y + this.height / 2);
    } else {
      // Gray semi-transparent
      ctx.fillStyle = 'rgba(100, 100, 100, 0.5)';
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    ctx.restore();
  }

  getBounds() {
    return {
      left: this.x,
      right: this.x + this.width,
      top: this.y,
      bottom: this.y + this.height
    };
  }
}
```

### Step 12.4: Add Hazards and Objects to Level
```javascript
// Update Level.init() to include hazards, checkpoint, and goal
static init() {
  const tiles = [];
  const enemiesData = [];
  const collectibles = [];
  const spikes = [];
  let checkpoint = null;
  let goal = null;

  // ... existing tile and enemy code ...

  Level.placeCollectibles(collectibles);
  Level.placeHazards(spikes);

  // Checkpoint at screen 2 start (x=800, y=518)
  checkpoint = new Checkpoint(800, 518);

  // Goal at screen 3 end (x=2300, y=250)
  goal = new Goal(2300, 250);

  return { tiles, enemiesData, collectibles, spikes, checkpoint, goal };
}

static placeHazards(spikes) {
  // Screen 2: Spike section (3 spikes at x=1380-1412, y=534)
  spikes.push(new Spike(1380, 534));
  spikes.push(new Spike(1396, 534));
  spikes.push(new Spike(1412, 534));
}
```

### Step 12.5: Update initGame() to Include New Objects
```javascript
let spikes = [];
let checkpoint = null;
let goal = null;
let lastCheckpointPos = { x: 100, y: 400 }; // Starting position

function initGame() {
  // Create player
  player = new Player(100, 400);

  // Initialize level
  const levelData = Level.init();
  tiles = levelData.tiles;
  collectibles = levelData.collectibles;
  spikes = levelData.spikes;
  checkpoint = levelData.checkpoint;
  goal = levelData.goal;

  // Create enemies
  enemies = [];
  for (const enemyData of levelData.enemiesData) {
    enemies.push(new Enemy(enemyData.x, enemyData.y, enemyData.shape, enemyData.speed));
  }

  // Reset checkpoint
  lastCheckpointPos = { x: 100, y: 400 };
  if (checkpoint) checkpoint.active = false;

  // Create systems
  particleSystem = new ParticleSystem();
  camera = new Camera(800, 600, gameState.levelWidth, gameState.levelHeight);
  textEffects = [];

  // Reset game state
  gameState.score = 0;
  gameState.health = 5;
  gameState.orbsCollected = 0;
  gameState.paused = false;
  gameState.gameOver = false;
  gameState.levelComplete = false;
}
```

### Step 12.6: Implement Hazard and Object Logic in Update
```javascript
function update(deltaTime) {
  // Handle pause
  if (input.isKeyPressed('escape')) {
    gameState.paused = !gameState.paused;
    input.resetKey('escape');
  }

  if (gameState.paused || gameState.gameOver || gameState.levelComplete) return;

  // Update player
  if (player) {
    player.update(deltaTime);

    // Collision with tiles
    for (const tile of tiles) {
      if (checkCollision(player, tile)) {
        resolveCollision(player, tile);
      }
    }

    // Collision with spikes
    if (!player.invulnerable) {
      for (const spike of spikes) {
        if (checkCollision(player, spike)) {
          gameState.health--;
          player.setInvulnerable(1.2);

          // Knockback
          const directionX = player.x < spike.x ? -1 : 1;
          player.velocityX = directionX * 200;
          player.velocityY = -300;

          // Damage particles
          particleSystem.emitRadial(player.x + 16, player.y + 16, 10, '#E74C3C', 150, 0.3);

          // Camera shake
          camera.shake(6, 3);

          if (gameState.health <= 0) {
            handlePlayerDeath();
          }
        }
      }
    }

    // Collision with checkpoint
    if (checkpoint && checkCollision(player, checkpoint)) {
      if (!checkpoint.active) {
        checkpoint.activate();
        lastCheckpointPos = { x: checkpoint.x, y: checkpoint.y };
      }
    }

    // Collision with goal
    if (goal && goal.isActive() && checkCollision(player, goal)) {
      handleLevelComplete();
    }

    // Pit detection (fall below level)
    if (player.y > gameState.levelHeight) {
      handlePlayerDeath();
    }
  }

  // Update enemies
  for (const enemy of enemies) {
    enemy.update(deltaTime);
    for (const tile of tiles) {
      if (checkCollision(enemy, tile)) {
        resolveCollision(enemy, tile);
      }
    }
  }

  // Check player-enemy collisions
  for (const enemy of enemies) {
    if (enemy.alive && player && checkCollision(player, enemy) && !player.invulnerable) {
      handleCombat(player, enemy);
    }
  }

  // Update collectibles
  for (const collectible of collectibles) {
    collectible.update(deltaTime);
    if (!collectible.collected && player && checkCollision(player, collectible)) {
      collectible.onCollect(player);

      // Check if goal should be activated
      if (gameState.orbsCollected === 3 && goal) {
        textEffects.push(new TextEffect(
          goal.x + goal.width / 2,
          goal.y,
          'GOAL ACTIVATED!',
          '#00FF00',
          24,
          1.0
        ));
      }
    }
  }

  // Update goal
  if (goal) {
    goal.update(deltaTime);
  }

  // Update particle system
  if (particleSystem) {
    particleSystem.update(deltaTime);
  }

  // Update text effects
  for (const effect of textEffects) {
    effect.update(deltaTime);
  }
  textEffects = textEffects.filter(e => !e.isDead());

  // Update camera
  if (camera && player) {
    camera.follow(player);
    camera.update();
  }
}
```

### Step 12.7: Implement Death and Respawn Logic
```javascript
function handlePlayerDeath() {
  gameState.health = 5; // Restore full health
  player.x = lastCheckpointPos.x;
  player.y = lastCheckpointPos.y;
  player.velocityX = 0;
  player.velocityY = 0;
  player.setInvulnerable(2.0); // 2 seconds invulnerability after respawn
}
```

### Step 12.8: Implement Level Complete Logic
```javascript
function handleLevelComplete() {
  gameState.levelComplete = true;

  // Add level complete bonus
  gameState.score += 500;

  // No death bonus if full health
  if (gameState.health === 5) {
    gameState.score += 200;
  }
}
```

### Step 12.9: Create Game Over and Level Complete Screens (HTML)
```html
<!-- Add to HTML body, after canvas elements -->
<div id="gameOverScreen" style="display: none;">
  <div style="background: rgba(0,0,0,0.7); position: absolute; top: 0; left: 0; width: 800px; height: 600px; display: flex; flex-direction: column; justify-content: center; align-items: center;">
    <h1 style="color: white; font-size: 24px;">Game Over</h1>
    <p style="color: white; font-size: 18px;">Final Score: <span id="finalScore">0</span></p>
    <button id="restartButton" style="background: #4A90E2; color: white; border: none; padding: 10px 20px; font-size: 18px; cursor: pointer; border-radius: 5px;">Restart</button>
  </div>
</div>

<div id="levelCompleteScreen" style="display: none;">
  <div style="background: rgba(0,0,0,0.7); position: absolute; top: 0; left: 0; width: 800px; height: 600px; display: flex; flex-direction: column; justify-content: center; align-items: center;">
    <h1 style="color: white; font-size: 24px;">Level Complete!</h1>
    <p style="color: white; font-size: 18px;">Final Score: <span id="completeScore">0</span></p>
    <button id="playAgainButton" style="background: #4A90E2; color: white; border: none; padding: 10px 20px; font-size: 18px; cursor: pointer; border-radius: 5px;">Play Again</button>
  </div>
</div>
```

### Step 12.10: Add Screen Display Logic
```javascript
// Add event listeners after initGame()
document.getElementById('restartButton').addEventListener('click', () => {
  document.getElementById('gameOverScreen').style.display = 'none';
  initGame();
});

document.getElementById('playAgainButton').addEventListener('click', () => {
  document.getElementById('levelCompleteScreen').style.display = 'none';
  initGame();
});

// Show screens in render() or update()
function render() {
  // ... existing render code ...

  // Show game over screen
  if (gameState.gameOver) {
    document.getElementById('finalScore').textContent = gameState.score;
    document.getElementById('gameOverScreen').style.display = 'block';
  }

  // Show level complete screen
  if (gameState.levelComplete) {
    document.getElementById('completeScore').textContent = gameState.score;
    document.getElementById('levelCompleteScreen').style.display = 'block';
  }
}
```

### Step 12.11: Render Hazards and Objects
```javascript
// In render() function, add after tiles:
for (const spike of spikes) {
  spike.render(ctx, camera);
}

if (checkpoint) {
  checkpoint.render(ctx, camera);
}

if (goal) {
  goal.render(ctx, camera);
}
```

---

## Testing Checklist

### Spike Hazard Tests
- [ ] Spikes render as red triangles (16×16)
- [ ] 3 spikes placed in Screen 2
- [ ] Touching spike causes -1 heart damage
- [ ] Spike collision triggers knockback
- [ ] Spike collision triggers damage particles
- [ ] Spike collision triggers camera shake
- [ ] Player becomes invulnerable for 1.2s after spike hit

### Pit Detection Tests
- [ ] Falling below y=600 triggers respawn
- [ ] Player respawns at last checkpoint
- [ ] Player health restored to 5 on respawn
- [ ] Player gets 2s invulnerability after respawn

### Checkpoint Tests
- [ ] Checkpoint renders as gray 32×32 square with "CP" text
- [ ] Checkpoint turns cyan when activated
- [ ] "CHECKPOINT!" text appears when activated
- [ ] Checkpoint only activates once
- [ ] Respawn position set to checkpoint location

### Goal Tests
- [ ] Goal renders as gray semi-transparent when locked
- [ ] Goal turns green pulsing when 3 orbs collected
- [ ] "GOAL" text appears when active
- [ ] "GOAL ACTIVATED!" text appears when 3rd orb collected
- [ ] Touching active goal completes level
- [ ] Cannot touch goal before collecting all orbs

### Respawn Tests
- [ ] Death from pit respawns at checkpoint
- [ ] Death from spike damage (0 health) respawns at checkpoint
- [ ] Respawn restores full health (5 hearts)
- [ ] Respawn gives 2s invulnerability
- [ ] Player flashes during post-respawn invulnerability

### Level Complete Tests
- [ ] Level completes when touching active goal
- [ ] +500 points awarded for completion
- [ ] +200 bonus points if full health
- [ ] Level Complete screen appears
- [ ] Final score displayed correctly
- [ ] Play Again button resets game

### Game Over Tests
- [ ] Game over when health reaches 0
- [ ] Game Over screen appears
- [ ] Final score displayed
- [ ] Restart button resets game

---

## Success Criteria
- ✅ Spike hazards functional with damage and knockback
- ✅ Pit detection with respawn system
- ✅ Checkpoint system with activation
- ✅ Goal system requiring 3 orbs
- ✅ Goal pulsing animation
- ✅ Respawn logic with full health and invulnerability
- ✅ Game Over screen with restart
- ✅ Level Complete screen with play again
- ✅ Victory bonuses (+500 level, +200 no death)
- ✅ All text effects for checkpoint and goal

---

## Next Phase
Once Phase 12 is complete and tested, proceed to:
**[Phase 13: Testing & Bug Fixes](./phase-13-testing-bugfixes.md)**
